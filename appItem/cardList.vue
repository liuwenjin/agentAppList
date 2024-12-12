<template>
  <div class="pptAppContent" :style="style">
    <div
      v-if="fullScreenFlag && content.iframe && content.iframe.length !== 0"
      :style="{ height: '100%', width: '100%' }"
      class="mainContentArea"
    >
      <iframe
        :src="content.iframe[0]"
        frameborder="no"
        style="width: 100%; height: 100%"
      ></iframe>
    </div>
    <div
      class="contentInfoArea"
      :column="column"
      v-else
      :line="line"
      :moreText="textInfoCount > spiteNumber ? true : false"
      :style="
        line === 0 && !(content.iframe && content.iframe.length !== 0)
          ? { display: 'flex', 'align-items': 'center' }
          : ''
      "
    >
      <span class="titleItemArea" :notSingle="content.list.length !== 0"
        ><h1
          class="ellipsis"
          :title="content.title"
          from="title"
          v-if="content.title"
          v-html="content.title"
        ></h1>
      </span>
      <div
        v-if="!fullScreenFlag && content.iframe && content.iframe.length !== 0"
        :style="{ height: content.title ? 'calc( 100% - 185px )' : '100%' }"
        class="mainContentArea iframeItemArea"
      >
        <iframe
          :src="content.iframe[0]"
          frameborder="no"
          :style="{ height: '100%', width: '100%' }"
        ></iframe>
      </div>
      <div
        v-else-if="line !== 0"
        :style="{
          height: content.title ? 'calc( 100% - 220px )' : '100%',
          marginTop: '40px',
        }"
        class="mainContentArea"
      >
        <span
          :style="{
            float: textFloat,
          }"
          :withKeywords="content.keywords && content.keywords.length !== 0"
          class="textInfoContainer"
          v-if="content.list && content.list.length !== 0"
        >
          <div class="textInfoArea" v-if="content.list.length < spiteNumber">
            <div class="textItemArea">
              <div
                v-for="(d, index) in content.list"
                :key="index"
                :index="index"
                class="listInfoItem"
              >
                <span class="iconItem">{{ icons[index % icons.length] }}</span>
                <p
                  :index="index"
                  class="listItemText"
                  from="list"
                  :tabindex="index"
                  v-html="d.content"
                ></p>
              </div>
            </div>
          </div>
          <div class="textInfoArea" v-else>
            <div
              class="textItemArea"
              :style="{
                width: content.list.length > spiteNumber ? '50%' : '100%',
                display: 'inline-block',
                float: 'left',
                paddingRight:
                  content.list.length > spiteNumber ? '20px' : '0px',
              }"
            >
              <div
                v-for="(d, index) in content.list.slice(
                  0,
                  Math.max(spiteNumber, Math.ceil(content.list.length / 2))
                )"
                :key="index"
                :index="index"
                class="listInfoItem"
              >
                <span class="iconItem">{{ icons[index % icons.length] }}</span>
                <p
                  :index="index"
                  class="listItemText"
                  :tabindex="index"
                  from="list"
                  v-html="d.content"
                ></p>
              </div>
            </div>
            <div
              class="textItemArea"
              v-if="content.list.length > spiteNumber"
              :style="{
                width: content.list.length > spiteNumber ? '50%' : '100%',
                display: 'inline-block',
                float: 'left',
                paddingLeft: '20px',
                borderLeft: 'solid 1px rgba(200, 200, 200, 0.4)',
              }"
            >
              <div
                v-for="(d, index) in content.list.slice(
                  Math.max(spiteNumber, Math.ceil(content.list.length / 2)),
                  content.list.length
                )"
                :key="index"
                :index="
                  Math.max(spiteNumber, Math.ceil(content.list.length / 2)) +
                  index
                "
                class="listInfoItem"
              >
                <span class="iconItem">{{ icons[index % icons.length] }}</span>
                <p
                  :index="
                    Math.max(spiteNumber, Math.ceil(content.list.length / 2)) +
                    index
                  "
                  class="listItemText"
                  from="list"
                  v-html="d.content"
                ></p>
              </div>
            </div>
          </div>
        </span>
        <div
          :style="{
            float: textFloat === 'left' ? 'right' : 'left',
            paddingLeft:
              textFloat === 'left' && content.list.length !== 0
                ? '20px'
                : '0px',
            paddingRight:
              textFloat === 'left' || content.list.length === 0
                ? '0px'
                : '20px',
          }"
          v-if="content.image && content.image.length !== 0"
          class="imageInfoArea"
        >
          <slot v-for="(item, index) in content.image">
            <el-image
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-teleported="!fullScreenFlag"
              :preview-src-list="content.image"
              :initial-index="index"
              :style="{ width: 100 / content.image.length + '%' }"
              v-if="content.image[0]"
              fit="contain"
              :src="item"
            ></el-image>
          </slot>
        </div>
        <div
          :style="{
            float: textFloat === 'left' ? 'right' : 'left',
            paddingLeft:
              textFloat === 'left' && content.list.length !== 0
                ? '20px'
                : '0px',
            paddingRight:
              textFloat === 'left' || content.list.length === 0
                ? '0px'
                : '20px',
          }"
          v-if="content.dsl && content.dsl.length !== 0"
          class="dslInfoArea"
        >
          <div
            class="dslInfoItem"
            :style="{ width: 100 / content.dsl.length + '%' }"
            :key="index"
            v-plugin="{ app: d }"
            v-for="(d, index) in content.dsl"
          ></div>
        </div>
      </div>
    </div>
    <span
      class="keywordsArea"
      v-if="content.keywords && content.keywords.length !== 0"
      >Keywords: <span style="">{{ content.keywords.join(" / ") }}</span></span
    >
  </div>
</template>
<script>
export default {
  beforeMount() {},
  data() {
    return {
      style: null,
      icons: ["🔹", "💡", "🎯", "📌", "🔒", "🚨", "◉"],
      textLength: 0,
      spiteNumber: 15,
      fullScreenFlag: false,
      content: {
        title: "",
        list: [],
        iframe: "",
        keywords: [],
        image: [],
        p: [],
        ul: [],
        ol: [],
      },
    };
  },
  computed: {
    textInfoCount() {
      let count = 0;
      let arr = this.content.list || [];
      let _self = this;
      arr.map((item) => {
        if (item.content.length > _self.textLength) {
          _self.textLength = item.content.length;
        }
        let t = Math.ceil(item.content.length / 16);
        count += t;
      });
      return count;
    },
    textFloat() {
      let ret = "left";
      let count = 0;
      for (let i = 0; i < this.index; i++) {
        if (!this.context[i]) {
          continue;
        }
        this.context[i].content =
          this.context[i].content || this.context[i] || {};
        this.context[i].content.image = this.context[i].content.image || [];
        this.context[i].content.dsl = this.context[i].content.dsl || [];
        let t =
          this.context[i].content.image.length +
          this.context[i].content.dsl.length;
        if (t === 1) {
          count++;
        }
      }
      if (count % 2 === 0) {
        ret = "left";
      } else {
        ret = "right";
      }

      return ret;
    },
    line() {
      let ret = 0;
      this.content.list = this.content.list || [];
      this.content.image = this.content.image || [];
      this.content.dsl = this.content.dsl || [];
      if (this.content.list && this.content.list.length !== 0) {
        ret += 1;
      }
      if (
        ret !== 0 &&
        (this.content.image.length > 1 || this.content.dsl.length > 1)
      ) {
        ret += 1;
      } else if (
        ret === 0 &&
        (this.content.image.length !== 0 || this.content.dsl.length !== 0)
      ) {
        ret += 1;
      }
      return ret;
    },
    column() {
      let ret = 0;
      this.content.list = this.content.list || [];
      this.content.image = this.content.image || [];
      this.content.dsl = this.content.dsl || [];
      if (this.content.list && this.content.list.length !== 0) {
        ret += 1;
      }
      if (this.content.image.length === 1 || this.content.dsl.length === 1) {
        ret += 1;
      }
      return ret;
    },
  },
  beforeMount() {
    this.content.list = this.content.list || [];
    this.content.image = this.content.image || [];
    this.content.dsl = this.content.dsl || [];
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
        if (param.instance.colorStyle !== "light") {
          if (app.className === "EchartsItem") {
            app.dsl.option = {
              legend: {
                textStyle: {
                  color: "f2f2f2",
                },
              },
              xAxis: {
                splitLine: {
                  lineStyle: {
                    color: _self.style.color || "#444",
                  },
                },
              },
              yAxis: {
                splitLine: {
                  lineStyle: {
                    color: _self.style.color || "#444",
                  },
                },
              },
            };
            if (app.dsl.type === "pie") {
              app.dsl.option = {
                legend: {
                  textStyle: {
                    color: "f2f2f2",
                  },
                },
              };
            }
          } else if (
            app.className === "ElementVueItem" &&
            app.url.search("dataTable") !== -1
          ) {
            app.dsl.data.contextStyle = _self.style;
            app.dsl.data = app.dsl.data || {};
            app.dsl.data.height = el.clientHeight;
            app.dsl.data.maxHeight = el.clientHeight;
            // app.dsl.data.tableStyle = {
            //   background: "rgba(0, 0, 0, 0.4)",
            //   color: "f2f2f2"
            // }
          } else {
          }
        }

        webCpu.updateView(el, app);
      },
    },
  },
  methods: {
    checkContent() {},
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
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  padding: 40px 60px;
  color: #2f2a76;
  text-shadow: -1px 1px rgba(47, 42, 118, 0.3);
  letter-spacing: 2px;
}

.pptAppContent .contentInfoArea {
  float: left;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.pptAppContent .contentInfoArea .titleItemArea {
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 30px;
  border: solid 1px transparent;
}

.pptAppContent .contentInfoArea .titleItemArea[notSingle="true"]:after {
  position: absolute;
  content: "";
  left: 0px;
  bottom: -20px;
  width: 100%;
  height: 0px;
  border-top: solid 1px #ddd;
}

.pptAppContent .contentInfoArea h1 {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 8px;
  font-size: 70px;
  text-align: center;
  line-height: 1.5;
  font-weight: 900;
}

.mainContentArea {
  float: left;
  position: relative;
  width: 100%;
}

.el-row {
  position: relative;
  width: 100%;
}

.imageInfoArea,
.textInfoContainer,
.dslInfoArea {
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-block;
  float: left;
  overflow: hidden;
}

.textInfoContainer {
  padding-left: 0px;
}

.keywordsArea {
  position: absolute;
  left: 0px;
  padding: 5px 0px;
  border-top: solid 1px #ddd;
  width: 100%;
  bottom: 0px;
  text-align: center;
}

.contentInfoArea[column="2"] .imageInfoArea,
.contentInfoArea[column="2"] .dslInfoArea {
  padding-left: 20px;
  overflow: hidden;
}

.contentInfoArea[column="2"] .imageInfoArea,
.contentInfoArea[column="2"] .dslInfoArea,
.contentInfoArea[column="2"] .textInfoContainer {
  width: 50%;
}

.contentInfoArea[column="2"][moreText="true"] .textInfoContainer {
  width: 50%;
}

.contentInfoArea[column="2"][moreText="true"] .imageInfoArea,
.contentInfoArea[column="2"][moreText="true"] .dslInfoArea {
  width: 50%;
}

.contentInfoArea[line="2"] .imageInfoArea,
.contentInfoArea[line="2"] .dslInfoArea,
.contentInfoArea[line="2"] .textInfoContainer {
  height: 50%;
}

.contentInfoArea[line="2"] .imageInfoArea,
.contentInfoArea[line="2"] .dslInfoArea {
  padding-top: 20px;
  padding-left: 0px;
}

.textInfoArea {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  font-size: 50px;
}

.listInfoItem {
  position: relative;
}

.listItemText {
  line-height: 1.5;
  text-indent: 45px;
}
.iconItem {
  position: absolute;
  left: 0px;
  top: 0px;
}

/* .listItemText::before {
  content: '❖';
  position: absolute;
  font-size: 45px;
  width: 15px;
  height: 15px;
  top: 0px;
  left: -40px;
  border-width: 0px;
  border-style: solid;
  border-color: transparent transparent transparent black;
} */

.textInfoArea > div,
.textInfoArea > p {
  word-wrap: break-word;
  word-break: break-all;
}

.textItemArea p {
  padding-left: 8px;
  line-height: 80px;
}

.dslInfoItem {
  position: relative;
  display: inline-block;
  float: left;
  height: 100%;
  /* border: solid 5px rgba(200, 200, 200, 0.2); */
}

.mainContentArea .el-image {
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(200, 200, 200, 0.2);
  border: solid 5px rgba(200, 200, 200, 0.2);
}

.el-image-viewer__mask {
  background-color: rgba(245, 245, 245, 0.98);
  border-radius: 10px;
  opacity: 1;
}
</style>
