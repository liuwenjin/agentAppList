<template>
  <div class="pptAppContent" :style="style">
    <div class="contentInfoArea">
      <span v-if="content.title" class="titleItemArea"
        ><h1
          class="ellipsis"
          :title="content.title"
          from="title"
          v-html="content.title"
        ></h1>
      </span>
      <div
        :style="{
          height: content.title ? 'calc( 100% - 134px )' : '100%',
          paddingBottom: index !== 2 ? '' : '0px',
        }"
        class="mainContentArea"
      >
        <div class="dslInfoArea">
          <div
            class="dslInfoItem"
            :key="index"
            v-plugin="{ app: d }"
            v-for="(d, index) in content.dsl"
          ></div>
        </div>
        <div class="confirmOptionsArea exportHiddenItem" v-if="index !== 2">
          <el-button
            v-if="index === 1"
            @click="handleClickBack()"
            class="backBtn"
            text
            type="info"
            size="large"
            ><i class="bi bi-chevron-double-left"></i
            >{{ $t("back") }}</el-button
          >
          <el-button
            @click="handleLightTree(1)"
            class="lightTreeBtn exportHiddenItem"
            size="large"
            :disabled="loadingStatus"
            :loading="loadingStatus"
            type="success"
            >{{ buttonLabel }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  beforeMount() {},
  data() {
    return {
      index: Number(WebTool.urlQuery(location.href, "cardIndex") || "0"),
      buttonText: [
        webCpu.messages[lang].lightTree,
        webCpu.messages[lang].confirmSubmit,
        webCpu.messages[lang].moreInfo,
      ],
      buttonLabel: "",
      aiAdapter: {},
      documentMeta: {},
      loadingStatus: false,
      style: null,
      content: {
        title: "",
        list: [],
        iframe: "",
        image: [],
        p: [],
        ul: [],
        ol: [],
      },
    };
  },
  beforeMount() {
    this.content.dsl = this.content.dsl || [];
    if (this.index === 2) {
      let qMap = this.context[2].qMap;
      let treeData = this.content.dsl[0].dsl.data[0];
      if (!treeData) {
        treeData = this.content.dsl[0].dsl.data.content.dsl[0].dsl.data[0];
      }
      this.content.dsl[0].dsl.data.qMap = qMap;
      this.updateLightData(qMap, treeData);
    }
    this.buttonLabel = this.buttonText[this.index];
  },
  directives: {
    plugin: {
      mounted: function (el, param) {
        var app = param.value.app;
        delete app.card;
        app = WebTool.copyObject(app);
        app.style = app.style || {};
        app.style.width = "100%";
        app.style.height = "100%";
        let _self = param.instance;
        app.dsl.contextStyle = _self.style;
        app.dsl.data = app.dsl.data || {};
        app.dsl.data.documentMeta = _self.documentMeta || {};
        app.dsl.data.aiAdapter = _self.aiAdapter || {};
        app.dsl.data.context = _self.context;
        webCpu.updateView(el, app);
        _self.currentApp = app;
      },
    },
  },
  mounted() {
    if (this.index === 2 && !this.context[2].qMap) {
      webCpu.mitt.emit("switchViewer", 0);
    } else if (this.index !== 2 && this.checkLightStatus()) {
      let meta = this.documentMeta || {};
      if (
        meta.folderName === localStorage.folderName ||
        meta.rootAccount === localStorage.folderName
      ) {
        webCpu.mitt.emit("switchViewer", 2);
      } else {
        webCpu.mitt.emit("switchViewer", 1);
      }
    }
  },
  methods: {
    checkLightStatus() {
      let ret = false;
      let meta = this.documentMeta || {};
      if (
        this.context[2] &&
        this.context[2].qMap &&
        (meta.folderName === localStorage.folderName ||
          meta.rootAccount === localStorage.folderName)
      ) {
        ret = true;
      }
      return ret;
    },

    handleClickBack() {
      webCpu.mitt.emit("switchViewer", 0);
    },
    updateLightData(qMap, json) {
      json.value = true;
      let k = json.parent + "_" + json.name;
      if (json.name && qMap && qMap[k]) {
        let tArr = qMap[k];
        for (let i = 0; i < tArr.length; i++) {
          json.value =
            json.value && tArr[i].selected === tArr[i].choices[tArr[i].answer];
        }
      } else {
        delete json.value;
      }
      if (json.children) {
        for (let j = 0; j < json.children.length; j++) {
          let item = json.children[j];
          item.parent = json.name;
          this.updateLightData(qMap, item);
        }
      }
    },
    confirmSubmit() {
      if (localStorage.folderName) {
        let vueItem = this.currentApp.card.task.vueItem;
        this.loadingStatus = true;
        this.buttonLabel = webCpu.messages[lang].examScoring;
        vueItem.evaluateScore((tData) => {
          this.context[2].qMap = vueItem.qMap;
          delete this.context[2].analysisText;
          this.loadingStatus = false;
          this.buttonLabel = this.buttonText[this.index];
          webCpu.mitt.emit("saveContent", {
            data: this.context,
            toIndex: 2,
          });
        });
      } else {
        this.$message({
          type: "warning",
          message: webCpu.messages[lang].submitNeedLogin,
        });
      }
    },
    handleLightTree(v) {
      if (this.index == 0) {
        if (this.checkLightStatus()) {
          this.$message({
            type: "success",
            message: webCpu.messages[lang].lightedTips,
          });
          webCpu.mitt.emit("switchViewer", 2);
        } else {
          webCpu.mitt.emit("switchViewer", 1);
        }
      } else if (this.index == 1) {
        let vueItem = this.currentApp.card.task.vueItem;
        if (vueItem.count !== vueItem.list.length) {
          this.$confirm(
            lang === "zh"
              ? "还有题目未回答，确定要提交吗？"
              : "There are still questions unanswered, are you sure you want to submit?",
            webCpu.messages[lang].confirmDialogTitle,
            {
              confirmButtonText: webCpu.messages[lang].confirmYes,
              cancelButtonText: webCpu.messages[lang].confirmNo,
              type: "warning",
            }
          ).then(() => {
            this.confirmSubmit();
          });
        } else {
          this.$confirm(
            lang === "zh"
              ? "提交后无法再修改，确定要提交吗？"
              : "You cannot modify it after submitting. Are you sure you want to submit?",
            webCpu.messages[lang].confirmDialogTitle,
            {
              confirmButtonText: webCpu.messages[lang].confirmYes,
              cancelButtonText: webCpu.messages[lang].confirmNo,
              type: "warning",
            }
          ).then(() => {
            this.confirmSubmit();
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.pptAppContent {
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-repeat: repeat;
  color: #2f2a76;
  text-shadow: -1px 1px rgba(47, 42, 118, 0.3);
  box-shadow: 5px 5px 5px #333;
}

.pptAppContent .contentInfoArea {
  float: left;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.pptAppContent .contentInfoArea .titleItemArea {
  display: inline-block;
  width: 100%;
  border-bottom: solid 1px #ddd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 30px;
}

.pptAppContent .contentInfoArea h1 {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 60px;
  padding: 30px;
  margin-bottom: 0px;
  text-align: center;
}

.mainContentArea {
  float: left;
  position: relative;
  width: 100%;
  padding-bottom: 100px;
}

.confirmOptionsArea {
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: inline-block;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-top: solid 1px #ddd;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.lightTreeBtn {
  max-width: 350px;
  width: 90%;
  height: 70px;
  font-size: 30px;
}

.lightTreeBtn,
.viewSuggestionsBtn {
  border-radius: 5px;
  background: linear-gradient(90deg, #4a90e2, #357abd);
  box-shadow: 1px 1px #053388, 2px 2px #053388, 3px 3px #053388;
  border: none;
  font-weight: bold;
}

.lightTreeBtn:hover,
.viewSuggestionsBtn:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
  background: linear-gradient(90deg, #357abd, #4a90e2);
}

.CardItem[cardName="resultAnalysisDialog"] .leftEmptyArea {
  color: #5a9cf8 !important;
  border-right: none;
}

.dslInfoArea {
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-block;
  float: left;
  overflow: hidden;
}

.confirmOptionsArea .backBtn {
  position: absolute;
  left: 5px;
  top: 20px;
  font-weight: 900;
  transform: scale(1.5);
  transform-origin: 0 0;
}

.dslInfoItem {
  position: relative;
  display: inline-block;
  float: left;
  height: 100%;
  width: 100%;
  /* border: solid 5px rgba(200, 200, 200, 0.2); */
}

.dslInfoItem .MarkdownArticle h1,
.dslInfoItem .MarkdownArticle h2,
.dslInfoItem .MarkdownArticle h3 {
  font-size: 50px;
}
.dslInfoItem .MarkdownArticle h4 {
  font-size: 40px;
}

.dslInfoItem .MarkdownArticle p,
.dslInfoItem .MarkdownArticle ul,
.dslInfoItem .MarkdownArticle ol {
  font-size: 30px;
  font-weight: normal;
}
.dslInfoItem .CardItem_mask {
  border-radius: 10px;
  overflow: hidden;
}
</style>
