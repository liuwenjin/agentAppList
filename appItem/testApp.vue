<template>
  <div class="childAppContent" :style="style">
    <div class="contentInfoArea">
      <div class="stepInfoArea">
        {{ $t("lightProgress") }}: {{ count }}/{{ list.length }}
        <span class="switchButtonList">
          <el-button
            :disabled="index === 0"
            @click="switchQuestionItem(-1)"
            type="info"
            plain
            round
            ><i class="bi bi-chevron-left"></i
            >{{ $t("lastQuestion") }}</el-button
          >
          <el-button
            :disabled="index === list.length - 1"
            @click="switchQuestionItem(1)"
            type="primary"
            plain
            round
            >{{ $t("nextQuestion") }}<i class="bi bi-chevron-right"></i
          ></el-button>
        </span>
      </div>
      <span class="titleItemArea" v-if="list[index]"
        ><h3 :title="list[index].name" from="title">
          <span>{{ index + 1 }}. </span>
          <span>{{ list[index].name }}</span>
        </h3>
      </span>
      <div v-if="list[index]" class="questionInfoArea">
        <div
          :selected="
            list[index].selected &&
            (list[index].selected === d.name || list[index].selected === d)
          "
          @click="handleSelectItem(i, index)"
          class="choiceItem"
          v-for="(d, i) in list[index].choices"
          :key="i"
        >
          <span class="indexItem">
            <slot
              v-if="
                list[index].selected &&
                (list[index].selected === d.name || list[index].selected === d)
              "
            >
              <i class="bi bi-check-lg"></i>
            </slot>
            <slot v-else>{{ i + 1 }}</slot>
          </span>
          <span class="choiceInfoItem">{{ d.name || d }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  beforeMount() {
    this.updateParentName();
  },
  data() {
    return {
      index: 0,
      style: null,
      qMap: {},
      list: [],
    };
  },
  beforeMount() {},
  computed: {
    count() {
      let count = 0;
      this.list.map((item) => {
        if (typeof item.selected !== "undefined") {
          count++;
        }
      });
      return count;
    },
  },
  methods: {
    handleSelectItem: function (i) {
      let item = this.list[this.index];
      item.selected = item.choices[i].name || item.choices[i];
      let k = item.point;
      let arr = this.qMap[k] || [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === item.name) {
          arr[i].selected = item.selected;
        }
      }
    },
    switchQuestionItem(v) {
      let t = this.index + v;
      if (t < 0) {
        t = 0;
      }
      if (t > this.list.length - 1) {
        t = this.list.length - 1;
      }
      this.index = t;
    },
  },
};
</script>

<style scoped>
.childAppContent {
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
  color: #2f2a76;
  font-size: 60px;
  padding: 40px 50px;
  text-shadow: -1px 1px rgba(47, 42, 118, 0.3);
}

.childAppContent .contentInfoArea {
  float: left;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.childAppContent .contentInfoArea .titleItemArea {
  display: inline-block;
  width: 100%;
  margin-bottom: 30px;
}

.childAppContent .contentInfoArea h3 {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 60px;
  border-top: solid 1px #ddd;
  padding-top: 20px;
  text-align: left;
}

.stepInfoArea {
  padding: 30px 0px;
  font-size: 40px;
}

.questionInfoArea {
  float: left;
  position: relative;
  width: 100%;
  height: calc(100% - 330px);
}

.choiceItem {
  padding: 30px 20px;
  margin-bottom: 30px;
  border: solid 1px #999;
  border-radius: 10px;
  line-height: 1;
  cursor: pointer;
}

.choiceItem:hover {
  background: #ddd;
}

.choiceItem[selected="true"] {
  background: #333;
  color: #fff;
}

.choiceItem > span {
  vertical-align: middle;
  line-height: 60px;
  display: inline-block;
  width: calc(100% - 100px);
}

.choiceItem span.indexItem {
  background: #222;
  width: 75px;
  height: 75px;
  color: #fff;
  border-radius: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.choiceItem[selected="true"] > .span.indexItem {
  color: #333 !important;
  background: #fff !important;
}

.switchButtonList {
  margin-top: -5px;
  float: right;
}

.switchButtonList .el-button {
  font-weight: 900;
  transform: scale(2);
}

.switchButtonList .el-button:nth-child(1) {
  margin-right: 90px;
}

.switchButtonList .el-button:nth-child(2) {
  margin-right: 45px;
}
</style>
