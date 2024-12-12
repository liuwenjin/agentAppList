<template>
  <div class="flashcardsContent" :style="style">
    <div v-if="status === 0" class="titlePageItem">
      <h3 class="ellipsis cardTitleItem" :title="content.title || content.name">
        {{ $t("flashcards") }}: {{ content.title || content.name }}
      </h3>
      <div class="countInfoArea">
        <span class="countItem"
          >{{ $t("totalCards") }}: {{ countInfo.total }}</span
        >
        <span class="countItem"
          >{{ $t("notLearned") }}: {{ countInfo.notLearned }}</span
        >
        <span class="countItem"
          >{{ $t("unfamiliar") }}: {{ countInfo.unfamiliar }}</span
        >
        <el-button
          @click="resetStudyData()"
          text
          :title="$t('confirmReset')"
          class="resetBtn"
          ><i class="bi bi-arrow-repeat"></i>
          {{ $t("confirmReset") }}</el-button
        >
      </div>
      <div class="studyOptionArea">
        <div class="buttonItemList">
          <p v-if="countInfo.notLearned !== 0">
            <el-button type="primary" @click="startSduty(0)">{{
              $t("studtyAllCards")
            }}</el-button>
          </p>
          <p v-else>
            <el-button @click="recoverStudy()" type="primary">{{
              $t("reviewAllCards")
            }}</el-button>
          </p>
          <p>
            <el-button
              :disabled="
                countInfo.notLearned === 0 ||
                countInfo.notLearned === countInfo.total
              "
              @click="startSduty(2)"
              >{{ $t("studtyNotLearned") }}</el-button
            >
          </p>
          <p>
            <el-button
              :disabled="countInfo.unfamiliar === 0"
              @click="startSduty(1)"
              type="warning"
              >{{ $t("studtyUnfamiliar") }}</el-button
            >
          </p>
        </div>
      </div>
    </div>
    <div v-if="status === 1" class="cardPageItem">
      <div class="topInfoArea">
        <span class="progressInfoItem"
          >{{ $t("progress") }}: <span>{{ this.index + 1 }}</span> /
          <span>{{ this.content.list.length }}</span></span
        >
        <span class="backToHome"
          ><el-button text @click="backToHome()">{{
            $t("back")
          }}</el-button></span
        >
      </div>
      <div class="contentBodyItem">
        <div
          v-if="mode === 'answer'"
          class="questionItem"
          v-html="content.list[index].question"
        ></div>
        <div :class="{ flipped: isFlipped }" class="contentInfo card">
          <div
            v-if="mode === 'question'"
            class="card-front"
            v-html="content.list[index]['question']"
          ></div>
          <div
            v-if="mode === 'answer'"
            class="card-back"
            v-html="content.list[index]['answer']"
          ></div>
        </div>
      </div>
      <div class="cardSwitchOptions">
        <el-button
          @click="switchCardMode('answer')"
          v-if="mode === 'question'"
          >{{ $t("unfamiliar") }}</el-button
        >
        <el-button @click="switchNextCard()">{{
          $t("nextQuestion")
        }}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  beforeMount() {
    this.initListData();
  },
  data() {
    return {
      index: 0,
      status: 0,
      aiAdapter: {},
      documentMeta: {},
      mode: "question",
      style: null,
      content: {},
      isFlipped: false,
    };
  },
  mounted() {},
  computed: {
    countInfo() {
      let total = 0;
      let notLearned = 0;
      let unfamiliar = 0;
      this.content.children = this.content.children || [];
      for (let i = 0; i < this.content.children.length; i++) {
        let arr = this.content.children[i].cards;
        for (let j = 0; j < arr.length; j++) {
          total++;
          if (!arr[j].time) {
            notLearned++;
          }
          if (arr[j].unfamiliar) {
            unfamiliar++;
          }
        }
      }
      return {
        total: total,
        notLearned: notLearned,
        unfamiliar: unfamiliar,
      };
    },
  },
  methods: {
    backToHome() {
      this.status = 0;
    },
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
    resetStudyData() {
      this.content.children = this.content.children || [];
      for (let i = 0; i < this.content.children.length; i++) {
        let arr = this.content.children[i].cards;
        for (let j = 0; j < arr.length; j++) {
          delete arr[j].time;
          delete arr[j].unfamiliar;
        }
      }
    },
    recoverStudy() {
      this.resetStudyData();
      this.startSduty(0);
    },
    startSduty(flag) {
      this.initListData(flag);
      this.$nextTick(() => {
        this.index = 0;
        this.status = 1;
        setTimeout(() => {
          this.setLearnedTime();
          if (this.mode === "question") {
            this.setUnfamiliar(false);
          }
        }, 1000);
      });
    },
    switchCardMode(mode) {
      this.mode = mode || "question";
      this.setLearnedTime();
      this.flipCard();
      if (mode === "answer") {
        this.setUnfamiliar(true);
      }
      //Todo: save content!
      webCpu.mitt.emit("saveContent", {
        data: [
          {
            content: this.content,
          },
        ],
        toIndex: 0,
      });
    },
    setUnfamiliar(flag) {
      let list = this.content.list || [];
      if (list.length === 0) {
        return false;
      }
      let item = list[this.index];
      let pos = item.pos || [0, 0];
      this.content.children[pos[0]].cards[pos[1]].unfamiliar = flag;
    },
    setLearnedTime() {
      let list = this.content.list || [];
      if (list.length === 0) {
        return false;
      }
      let item = list[this.index];
      let pos = item.pos || [0, 0];
      this.content.children[pos[0]].cards[pos[1]].time = new Date().getTime();
    },
    switchNextCard() {
      let list = this.content.list || [];
      if (list.length === 0) {
        return false;
      }
      let max = list.length;
      this.setLearnedTime();

      let index = this.index + 1;
      if (index < max) {
        this.index = index;
        this.mode = "question";
        this.isFlipped = false;
      } else {
        this.$message({
          type: "success",
          message: this.$t("congratulations"),
        });
        this.status = 0;
        this.index = 0;
      }

      if (this.mode === "question") {
        this.setUnfamiliar(false);
      }

      //Todo: save content!
      webCpu.mitt.emit("saveContent", {
        data: [
          {
            content: this.content,
          },
        ],
        toIndex: 0,
      });
    },
    initListData(flag) {
      this.content.list = [];
      let arr = this.content.children || [];
      for (let i = 0; i < arr.length; i++) {
        let topic = arr[i].name;
        let cards = arr[i].cards.map((item, index) => {
          item.topic = topic;
          item.pos = [i, index];
          return item;
        });
        for (let j = 0; j < cards.length; j++) {
          // flag = 0: 所有
          if (flag === 0) {
            this.content.list.push(cards[j]);
          }
          // flag = 1: 不熟悉
          else if (flag === 1 && cards[j].unfamiliar) {
            this.content.list.push(cards[j]);
          }
          // flag = 2: 未学习
          else if (flag === 2 && !cards[j].time) {
            this.content.list.push(cards[j]);
          } else {
            continue;
          }
        }
      }
      console.log("this.content.list", this.content.list);
    },
  },
};
</script>
<style scoped>
.flashcardsContent {
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-repeat: repeat;
  color: #2f2a76;
  text-shadow: -1px 1px rgba(47, 42, 118, 0.3);
}

.titlePageItem {
  position: relative;
  width: 100%;
  height: 100%;
}

.cardTitleItem {
  font-size: 50px;
  width: 100%;
  text-align: center;
  padding: 40px 0px;
  margin-top: 20px;
  border-bottom: solid 1px #999;
}

.countInfoArea {
  padding-top: 30px;
  text-align: center;
}

.countInfoArea .countItem {
  display: inline-block;
  font-size: 30px;
}
.countInfoArea .countItem:nth-child(2) {
  margin: 0px 20px;
}

.resetBtn {
  font-size: 20px;
  margin-top: -13px;
  margin-left: 30px;
  vertical-align: middle;
}

.studyOptionArea {
  height: calc(100% - 180px);
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.studyOptionArea .el-button {
  width: 300px;
  margin-top: 40px;
  transform: scale(2);
}

.cardPageItem {
  position: relative;
  height: 100%;
}

.contentBodyItem {
  position: relative;
  height: calc(100% - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.topInfoArea {
  position: absolute;
  top: 0px;
  width: 100%;
  padding: 10px 0px;
  z-index: 10;
}

.progressInfoItem {
  float: left;
  padding: 5px;
  margin-left: 20px;
}
.backToHome {
  float: right;
  margin-right: 20px;
}

.questionItem {
  position: absolute;
  top: 50px;
  text-align: center;
  font-size: 30px;
}

.contentInfo {
  width: 90%;
  height: calc(100% - 320px);
  background-color: #fff;
  font-size: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px;
  border-radius: 15px;
}

.cardSwitchOptions {
  text-align: center;
}
.cardSwitchOptions .el-button {
  font-size: 14px;
  transform: scale(2);
}
.cardSwitchOptions .el-button:nth-child(2) {
  margin-left: 120px;
}

.card {
  width: 90%;
  height: calc(100% - 320px);
  position: relative;
  perspective: 1000px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px;
  font-size: 70px;
}

.card-back {
  transform: rotateY(180deg);
}
</style>
