<template>
  <div class="childAppContent" :style="style">
    <div class="contentInfoArea">
      <div class="lightedInfo">
        <div class="pageHeader">
          <span class="treeNameSpan" style="float: left"
            >{{ $t("knowledgeTree") }}:
            <span
              class="ellipsis"
              style="max-width: 400px; margin-top: -4px"
              :title="root.name"
              >{{ root.name }}</span
            ></span
          >
          <span class="submitterSpan" style="float: right"
            >{{ $t("submitter") }}: {{ documentMeta.userName || "匿名" }}
            <span style="margin-left: 20px"
              >{{ submitTime }}: <span>{{ time }}</span></span
            ></span
          >
        </div>
        <div class="resultInfoArea">
          <span
            class="resultTipsArea"
            v-if="needed !== count.value"
            v-html="resultTips"
          ></span>
          <span v-else>{{ $t("successTips") }}</span>
          <span class="scoreInfoItem">{{ scoreTips + ": " + count.score }} ( {{ totalTips + ": " + count.sum }} )</span>
          <el-button
            @click="viewSuggestions()"
            type="primary"
            size="large"
            :disabled="loadingStatus"
            :loading="loadingStatus"
            class="viewSuggestionsBtn exportHiddenItem"
          >
            <slot v-if="context[2] && context[2].analysisText">{{
              viewResult
            }}</slot>
            <slot v-else
              ><el-icon
                v-if="!loadingStatus"
                style="margin-right: 5px"
                :size="25"
                ><magic-stick /></el-icon
              >{{ viewerBtn }}</slot
            >
          </el-button>
          <span
            v-if="!(context[2] && context[2].analysisText)"
            class="pointsCostTips exportHiddenItem"
            >{{ $t("pointsCostTips") }}</span
          >
        </div>
      </div>
      <div class="myContentArea">
        <div class="dslInfoArea" v-if="content.dsl && content.dsl.length !== 0">
          <div
            class="dslInfoItem"
            :key="index"
            v-plugin="{ app: d }"
            v-for="(d, index) in content.dsl"
          ></div>
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
      index: 0,
      style: null,
      viewerBtn: lang === "zh" ? "结果分析" : "Result Analysis",
      viewResult: lang === "zh" ? "查看详情" : "Check Details",
      submitTime: lang === "zh" ? "时间" : "Time",
      scoreTips: lang === "zh" ? "你的得分": "Your Score",
      totalTips: lang === "zh" ? "总分":"Total",
      content: {
        title: "",
        dsl: [],
      },
      debugText: `
{
  "reviews": [
    "你的答卷整体表现非常优秀，能够准确理解文本中的关键要素。",
    "在涉及家庭背景和教育的重要性时，你的回答展现了深入的理解和思考。"
  ],
  "explanations": [
    {
      "name": "主角的父亲在教育上的态度是怎样的？",
      "answer": "希望她能成为医生",
      "selected": "不关心她的未来",
      "content": "你在这道题中选择了不关心她的未来，这与原文不符。实际上，主角的父亲希望她能成为医生，这反映了他对她未来的期望和关心。因此，你可以回顾一下相关段落，理解父亲的期望如何影响了主角的职业选择。"
    }
  ],
  "suggestions": [
    {
      "title": "仔细审题，理解细节",
      "description": "在回答问题时，尤其是在涉及人物关系和态度的问题上，建议你更加关注文本中的具体描述。可以尝试在答题前快速回顾相关段落，以确保你对人物的理解准确无误。"
    },
    {
      "title": "增强对文本的整体把握",
      "description": "在理解文本时，建议你提升对整体情节和角色关系的把握能力。可以采取做笔记的方式，总结每个角色的特点和影响，这样在答题时能更清晰地记住关键信息。"
    }
  ],
  "summary": [
    "你在此次答卷中表现出色，绝大多数答案都正确，显示了你对文本的良好理解。",
    "通过对错题的分析和建议，相信你能在今后的学习中进一步提升自己的答题能力。"
  ]
}

`,
      loadingStatus: false,
      suggestionsPrompt:
        lang === "zh"
          ? `
      你是一名全科目的高级教师，请分析 JSON 结构的答卷内容(context上下文里内容)，给出比较积极中肯的点评，并针对答卷内容给出循序渐进地提升建议。回答内容需要是中文(对非中文内容，请翻译成中文)
      JSON结构的字段含义如下：
      - 'score', 学员的总得分,
      - 'total', 试卷的总分,
      - 'anwsers': 记录问题信息和学员回答信息的数组, 每个元素的字段包括：
          - 'name': 字符串，题目的描述
          - 'type': 枚举类型，题目的类型可以为'单选题', '多选题', '填空题', '主观题'
          - 'knowledgePoint': 题目考察的知识点。
          - 'choices': 一个数组，包含备选项。
          - 'answer': 数字，题目的正确选项的编号。
          - 'selected': 字符串，答卷中选项的内容。
          - 'reason': 字符串，正确选项的原因说明(非学员的回答)。
          - 'score': 数字，学员在该题上的得分。
          - '_score': 数字，该题的分值，缺省时为 1。
      
      点评和提升建议以 JSON 数据结构的形式给出，其结构的字段含义如下：
      - 'reviews', 一个数组，包含点评内容，内容为字符串。
      - 'explanations', 一个数组，包含对错题（上下文中 anwsers里score为0的项）的讲解内容，讲解内容包含如下几个字段:
          - 'name': 字符串，题目的描述;
          - 'answer': 字符串，正确选项的具体内容;
          - 'selected': 字符串，学员选项内容，如果没有，输出为"未作答";
          - 'content': 字符串，错题分析内容，分析学员选项和正确选项内容之间的差异，以及正确选项内容成立的原因。
      - 'suggestions', 一个数组，包含多个建议内容，建议内容包含如下几个字段：
          - 'title', 字符串，建议的要点内容, 在 30 字(词)以内；
          - 'description', 字符串，建议的详述内容，在 200 字(词)以内；
      - 'summary', 一个数组，包含对点评和建议内容的总结内容，内容为字符串。
      
      结果示例：
      \`\`\`
      {
        "reviews": [
          "xxx...",
          "xxx..."
        ],
        "explanations": [{
          "name": "xxx...",
          "answer": "xxx...",
          "selected": "xxx...",
          "content": "xxx..."
        }],
        "suggestions": [{
          "title": "xxx...",
          "description": "xxx..."
        }, {
          "title": "xxx...",
          "description": "xxx..."
        }],
        "summary": [
          "xxx...",
          "xxx..."
        ],
      }
      \`\`\`
      `
          : `
        You are a senior teacher of all subjects. Please analyze the answer sheet content (content in the context) of the JSON structure, give relatively positive and pertinent comments, and give step-by-step suggestions for improving the answer sheet content.The answer content needs to be in English (for non-English content, please translate it into English).
The meanings of the fields in the JSON structure are as follows:
- 'score', the total score of the student,
- 'total', the total score of the test paper,
- 'anwsers': an array that records the question information and the student's answer information, and the fields of each element include:
- 'name': string, description of the question
- 'type': enumeration type, the type of the question can be 'single choice question', 'multiple choice question', 'fill in the blank question', 'subjective question'
- 'knowledgePoint': the knowledge point tested by the question.
- 'choices': an array containing alternative options.
- 'answer': a number, the number of the correct option of the question.
- 'selected': a string, the content of the option in the answer sheet.
- 'reason': string, explanation of the reason for the correct answer (not the student's answer).
- 'score': number, the student's score on the question.
- '_score': number, the score of the question, default is 1.

Comments and suggestions for improvement are given in the form of a JSON data structure, the fields of which have the following meanings:
- 'reviews', an array containing the comments, which are strings.
- 'explanations', an array containing the explanations of the correct and wrong questions (items with a score of 0 in the answers in the context), the explanations contain the following fields:
- 'name': string, description of the question;
- 'answer': string, the specific content of the correct answer;
- 'selected': string, the content of the student's answer, if not, the output is "not answered";
- 'content': string, the analysis of the wrong answer, analyzing the difference between the student's answer and the correct answer, and the reason why the correct answer is valid.
- 'suggestions', an array containing multiple suggestions, the suggestions contain the following fields:
- 'title', a string, the key points of the suggestion, within 30 words;
- 'description', a string, the detailed description of the suggestion, within 200 words;
- 'summary', an array containing the summary of the comments and suggestions, the content is a string.

Example of results: \`\`\` { "reviews": [ "xxx...", "xxx..." ], "explanations": [{ "name": "xxx...", "answer": "xxx...", "selected": "xxx...", "content": "xxx..." }], "suggestions": [{ "title": "xxx...", "description": "xxx..." }, { "title": "xxx...", "description": "xxx..." }], "summary": [ "xxx...", "xxx..." ], } \`\`\`
      `,
      qMap: {},
      analysisText: "",
      list: [],
      result: {},
      aiAdapter: {},
      context: [],
      documentMeta: {},
    };
  },
  beforeMount() {
    let node = this.content.dsl[0].dsl.data[0];
    this.checkResult(node);
    this.result = this.countResult();
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
        webCpu.updateView(el, app);
        _self.currentApp = app;
      },
    },
  },
  computed: {
    root() {
      return this.content.dsl[0].dsl.data[0];
    },
    time() {
      let date = new Date(this.documentMeta.time);
      return date.toLocaleString();
    },
    needed() {
      return Object.keys(this.qMap || {}).length;
    },
    resultTips() {
      let str = WebTool.bindData(
        this.$t("resultTips"),
        {
          count: this.count.value,
          max: Object.keys(this.qMap || {}).length,
        },
        null,
        true
      );
      return `<span class="resultLabelItem">${this.$t(
        "resultLabel"
      )}:</span> ${str}`;
    },
    count() {
      let count = 0;
      let score = 0;
      let sum = 0;
      for (let k in this.qMap) {
        let arr = this.qMap[k];
        let check = true;
        arr.map((item) => {
          sum += item.choices[item.answer]._score || 1;
          if (
            item.selected ===
            (item.choices[item.answer].name || item.choices[item.answer])
          ) {
            score += item.choices[item.answer]._score || 1;
          }
          check =
            check &&
            item.selected ===
              (item.choices[item.answer].name || item.choices[item.answer]);
        });
        if (check) {
          count++;
        }
      }
      return {
        value: count,
        sum: sum,
        score: score,
      };
    },
  },
  methods: {
    setNodeSymbol(node) {
      if (node.questions) {
        let count = node.count;
        let max = node.questions.length;
        let color = "#FF4500";
        if (max == count) {
          //答对所有题目
          node.symbol =
            "path://M502.784 660.48c-8.192 1.536-57.856 50.688-74.24 43.52-14.336-5.632 8.192-56.832-4.096-73.728-12.288-16.896-106.496 0.512-141.824 17.408-34.816 16.896-91.648 62.976-111.616 124.416-19.456 60.416-17.408 125.952 17.408 155.136 34.816 29.696 86.016 3.072 86.016 3.072s0.512 73.216 47.616 83.456c46.08 10.24 137.728-14.848 183.296-87.04 45.568-71.68 33.792-185.856 25.6-223.232-8.704-37.888-19.968-44.544-28.16-43.008zM909.312 638.976c-58.88-50.176-243.712-89.6-271.36-70.656-28.16 19.456 16.896 66.048 2.56 73.728-13.312 8.192-49.152-31.232-62.976-26.112-13.312 5.632-32.768 116.224-6.656 184.32 26.112 68.608 124.416 172.544 190.976 142.336 66.56-30.208 57.856-83.968 57.856-83.968s90.624 20.48 123.904-35.84c34.304-55.808 11.776-144.384-34.304-183.808zM594.432 434.688c11.776 9.216 56.32-10.752 67.584 0.512 10.752 11.776-58.368 46.592-37.376 73.216 20.992 25.6 192 43.008 264.192 14.848 65.024-25.088 123.392-88.576 111.616-165.376-10.24-64-101.888-80.896-101.888-80.896s23.04-70.144-30.72-96.768c-94.72-47.616-164.352 30.72-208.384 101.888-39.424 62.976-76.8 143.872-65.024 152.576zM524.8 9.728c-65.536-15.872-115.2 71.168-115.2 71.168s-65.536-11.776-108.544 28.672c-52.736 48.64-41.472 119.808 9.728 186.88 45.568 58.88 118.784 107.52 131.584 101.376 12.8-6.656 11.776-54.272 26.112-58.88 15.36-5.12 23.04 69.12 55.808 60.928 32.768-8.192 115.2-152.576 116.224-227.84 2.048-67.072-36.352-143.36-115.712-162.304zM227.84 637.44c73.216-20.992 164.352-48.128 164.864-73.728 0.512-24.576-76.8-38.4-70.144-68.096 4.096-14.848 78.848-3.072 83.968-35.328 4.608-24.576-53.248-92.16-127.488-129.024-61.952-30.72-163.328-48.128-207.872 16.896-37.376 54.272 0.512 114.176 0.512 114.176s-65.024 50.688-46.592 105.984c21.504 66.56 119.808 93.184 202.752 69.12z";
        } else if (count) {
          //有答对题目
          color = "#1E90FF";
          node.symbol =
            "path://M626.915 506.525z m28.242-295.422c-37.145-57.099-75.006-107.854-35.098-161.985-42.876-10.029-77.156 17.088-82.068 53.415-69.89 34.178-48.4 91.277-34.177 145.511 35.712 17.191 72.141 49.322 97.11 87.184 9.311 14.94 18.623 29.982 22.819 45.638 7.163 22.82 2.865 32.848 0.102 58.532 0 5.73 3.581 19.238 4.298 27.117 2.149 5.014 3.581 10.642 4.297 14.224 0.717 10.744-2.148 19.237-5.73 25.684 18.522-15.656 41.34-32.847 47.685-59.248 2.865-11.46 6.447-20.67 7.88-29.266 8.493-31.415 19.237-29.266 24.251-68.458 8.698-54.029-22-94.756-51.369-138.348zM482.53 236.686c0.717-12.178-37.963-97.826 31.313-138.45-67.844-49.323-168.535 11.255-160.553 89.025 27.014-24.15 83.5-4.81 129.24 49.425z m140.804 271.988z m0 0c2.15-5.014 3.582-10.642 2.865-19.954 0.717-5.014-2.148-12.074-4.297-18.521-2.15-6.447-3.582-14.94-3.582-23.536-1.432-7.163-0.716-13.61-0.716-20.67 0.716-12.177 0-22.82-4.298-35.713-17.191-54.234-80.02-114.3-125.761-125.659-73.677-83.602-119.315-72.244-145.716-54.439-23.536-12.177-79.305 0.614-102.738 38.476 84.933-0.716 123.613 190.638 186.545 236.276 54.336 38.578 71.425 24.354 112.05 37.964 35.61 8.596 62.01-2.047 85.648-14.224z m13.098 55.36c2.252-12.28 9.824-21.898 13.815-29.164 11.46-23.944 35.2-55.973 33.768-82.988-9.619 35.201-39.09 70.914-88.923 81.658-19.647 3.99-45.434 6.958-69.89-6.651 21.386 18.828 47.377 22.717 90.253 39.806l11.768-1.433c87.593 201.484-2.865 379.434-2.865 379.434 123.408-177.13 45.229-326.94 8.697-380.15l3.377-0.512z";
        } else {
          //未答对一道题
          node.symbolRotate = 0;
          color = "#2f2a76";
          node.symbol =
            "path://M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m225.745455 820.130909a29.090909 29.090909 0 0 1-39.563637 6.050909 309.992727 309.992727 0 0 0-369.803636 0 29.090909 29.090909 0 0 1-34.909091-46.545454 368.64 368.64 0 0 1 439.389091 0 29.090909 29.090909 0 0 1 4.887273 40.494545z";
        }

        node.itemStyle = {
          color: color,
        };
        node.label = {
          color: color,
        };
        node.symbolSize = 30;
      }
    },
    displaySuggestions(text) {
      text = text || this.context[2].analysisText;
      let app = {
        className: "MarkdownArticle",
        dsl: {
          style: {
            padding: "30px 60px",
            borderRadius: "10px",
            overflow: "auto",
            background: "#fff",
          },
          data: text,
        },
      };
      let _self = this;
      let callback = function () {
        let str = _self.analysisText.replace(/\n\r/g, "\r\n");
        WebTool.copyString(str);
        _self.$message({
          type: "success",
          message: webCpu.messages[lang].copySuccessTips,
        });
      };
      let callback1 = function (e) {
        delete _self.context[2].analysisText;
        webCpu.CardItem.dismissMask(_self._parent.card);
        _self.viewSuggestions();
      };
      webCpu.CardItem.renderCardDialog(
        this._parent.card,
        app,
        {
          dialogName: "resultAnalysisDialog",
          title: webCpu.messages[lang].resultAnalysis,
          titleStyle: {
            background: "var(--el-color-primary-light-9)",
            color: "var(--el-color-primary)",
          },
          closeType: "back",
          // closeCallback: callback,
          menu: [
            {
              label: `<span style='font-size: 14px; padding: 0px 10px;'>${webCpu.messages[lang].copyBtn}</span>`,
              action: callback,
            },
            {
              label: `<span style='font-size: 14px; padding: 0px 10px;'>${webCpu.messages[lang].regenerateContent}</span>`,
              action: callback1,
            },
          ],
        },
        {
          borderRadius: "10px",
        }
      );
    },
    transformJson(json) {
      let t =
        lang === "zh"
          ? `### ${
              this.documentMeta.userName || "匿名"
            }的结果分析<span style="font-size: 20px;">(知识树# ${
              this.root.name
            })</span> \n\r`
          : `### Result Analysis of [ ${
              this.documentMeta.userName || "匿名"
            } ]<span style="font-size: 20px;">( Knowledge Tree# ${
              this.root.name
            } )</span> \n\r`;

      this.analysisText = t;
      let str = t;
      let item = "";
      for (let i = 0; i < json.reviews.length; i++) {
        item = json.reviews[i];
        str += item + "\n\r";
        this.analysisText += item + "\n\r";
      }

      if (json.explanations.length !== 0) {
        t =
          lang === "zh" ? "#### 答题分析 \n\r" : "#### Question Analysis \n\r";
        str += t;
        this.analysisText += t;
        for (let i = 0; i < json.explanations.length; i++) {
          item = json.explanations[i];
          let t = `**${i + 1}. ${item.name}**\n\r`;
          str += t;
          this.analysisText += t;

          t = `- **${lang === "zh" ? "你的答案：" : "Your Answer:"}** ${
            item.selected
          }\n\r`;
          str += t;
          this.analysisText += t;

          t = `- **${lang === "zh" ? "正确答案：" : "Right Answer:"}** ${
            item.answer
          }\n\r`;
          str += t;
          this.analysisText += t;

          t = `- **${lang === "zh" ? "答案分析：" : "Answer Analysis"}**\n\r ${
            item.content
          }\n\r`;
          str += t;
          this.analysisText += t;
        }
      }

      if (json.suggestions && json.suggestions.length !== 0) {
        t = lang === "zh" ? "#### 提升建议 \n\r" : "#### Suggestions \n\r";
        str += t;
        this.analysisText += t;
        for (let i = 0; i < json.suggestions.length; i++) {
          item = json.suggestions[i];
          let t = "- **" + item.title + "** \n\r";
          str += t;
          this.analysisText += t;
          t = item.description + " \n\r";
          str += t;
          this.analysisText += t;
        }
      }

      t = lang === "zh" ? "#### 总结 \n\r" : "#### Summary \n\r";
      str += t;
      this.analysisText += t;
      for (let i = 0; i < json.summary.length; i++) {
        item = json.summary[i];
        str += item + "\n\r";
        this.analysisText += item + "\n\r";
      }
      return str;
    },
    viewSuggestions() {
      let query = {};
      query.content = this.suggestionsPrompt;
      query.context = JSON.stringify(this.result);
      this.loadingStatus = true;
      let debugMode = WebTool.urlQuery(location.href, "debugMode");
      let str = "";
      let json = {};
      if (this.context[2] && this.context[2].analysisText) {
        str = WebTool.fromBase64(this.context[2].analysisText);
        this.displaySuggestions(str);
        this.loadingStatus = false;
        return true;
      }
      if (debugMode) {
        json = WebTool.transformContent(this.debugText);
        str = this.transformJson(json);

        this.displaySuggestions(str);
        this.loadingStatus = false;
      } else {
        let meta = this.documentMeta || {};
        query.fromAccount = meta.fromAccount || "";
        query.rootAccount = meta.rootAccount || "";
        this.aiAdapter.aigcText(query, (tData) => {
          if (tData.ret === 0) {
            json = WebTool.transformContent(tData.usage.result);
            str = this.transformJson(json);
            this.displaySuggestions(str);
            this.context[2].analysisText = WebTool.toBase64(str);
            webCpu.mitt.emit("saveContent", {
              data: this.context,
              toIndex: 2,
            });
          } else if (tData.ret === 2) {
            this.$message({
              type: "warning",
              message: webCpu.messages[lang].notEnoughPoints,
            });
          } else {
            this.$message({
              type: "warning",
              message: webCpu.messages[lang].noRights,
            });
          }
          this.loadingStatus = false;
        });
      }
    },
    countResult() {
      let result = {
        score: 0,
        total: 0,
        answers: [],
      };
      for (let k in this.qMap) {
        let arr = this.qMap[k];
        for (let i = 0; i < arr.length; i++) {
          let d = arr[i];
          d.knowledgePoint = k;
          result.answers.push(d);
          result.score += d.score;
          result.total += d._score || 1;
        }
      }
      return result;
    },
    checkResult(node) {
      let count = 0;
      let max = 0;
      if (node && node.questions && node.questions.length !== 0) {
        let arr = node.questions;
        for (let i = 0; i < arr.length; i++) {
          let k = node.parent + "_" + node.name;
          if (!this.qMap || !this.qMap[k]) {
            continue;
          }
          let d = this.qMap[k][i];

          d.type = d.type || "单选题";
          if (
            (d.choices[d.answer].name || d.choices[d.answer]) === d.selected
          ) {
            count++;
            d.score = d._score || 1;
            d.feedback = "正确!" + d.reason;
          } else {
            d.score = 0;
            d.feedback = "错误!" + d.reason;
          }
        }
        node.max = arr.length;
        node.count = count;
        node.name = `[${node.count}/${node.max}] ${node.name}`;
        this.setNodeSymbol(node);
      } else if (node.children && node.children.length !== 0) {
        for (let j = 0; j < node.children.length; j++) {
          let item = node.children[j];
          item.parent = node.name;
          this.checkResult(item);
        }
      } else {
      }
      return {
        count: count,
        max: max,
      };
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
  padding: 20px 30px;
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

.pageHeader {
  position: absolute;
  top: -5px;
  left: 0px;
  width: 100%;
  font-size: 20px;
  font-weight: normal;
  color: #aaa;
  text-shadow: none;
}

.lightedInfo {
  padding: 30px 0px;
  font-size: 40px;
  border-bottom: solid 1px #ddd;
}

.lightedInfo .resultLabelItem {
  color: #666;
}

.viewSuggestionsBtn {
  float: right;
  font-size: 20px;
  margin-top: 5px;
  margin-right: 5px;
}

.myContentArea {
  float: left;
  position: relative;
  width: 100%;
  height: calc(100% - 130px);
}

.choiceItem {
  padding: 30px 20px;
  margin-bottom: 30px;
  border: solid 1px #999;
  border-radius: 10px;
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
  height: 60px;
  display: inline-block;
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

.resultTipsArea {
  display: inline-block;
}

.pointsCostTips {
  position: absolute;
  right: 0px;
  font-size: 14px;
  top: 90px;
  color: #999;
}

.scoreInfoItem {
  position: absolute;
  left: 0px;
  font-size: 14px;
  top: 90px;
  color: #999;
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
