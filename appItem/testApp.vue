<template>
  <div class="childAppContent" :style="style">
    <div class="questionInfoArea">
      <div class="stepInfoArea">
        {{ $t("lightProgress") }} (总题数: {{ list.length }}):
        <el-progress
          style="transform: scale(0.8)"
          type="circle"
          :percentage="Number(((count / list.length) * 100).toFixed(1))"
        ></el-progress>
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
      <div class="qustionContentItem">
        <div class="questionTitleArea" v-if="list[index] && show">
          <h3 style="width: 100%;" :title="list[index].name" from="title">
            <span>{{ index + 1 }}. </span>
            <span
              >{{ list[index].name
              }}<slot v-if="list[index].type"
                >({{ list[index].type }})</slot
              ></span
            >
          </h3>
        </div>
        <div v-if="list[index]" class="questionItemArea">
          <slot
            v-if="
              list[index].choices &&
              list[index].choices.length !== 0 &&
              (list[index].type === '单选题' || list[index].type === '多选题')
            "
          >
            <div
              :selected="
                list[index].selected && list[index].selected.indexOf(d) !== -1
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
                    list[index].selected.indexOf(d) !== -1
                  "
                >
                  <i class="bi bi-check-lg"></i>
                </slot>
                <slot v-else>{{ indexArray[i] }}) </slot>
              </span>
              <span class="choiceInfoItem">{{ d }}</span>
            </div>
          </slot>
          <div v-else class="inputContentArea">
            <el-input
              :type="list[index].type === '简答题' ? 'textarea' : ''"
              @change="handleInputChange(list[index])"
              placeholder="请输入你的回答"
              v-model="list[index].inputContent"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      indexArray: ["A", "B", "C", "D", "E"],
      index: 0,
      style: null,
      qMap: {},
      result: {},
      list: [],
      show: true,
      evaluatePrompt: `
      ## 任务概述：
        你是一名全科目的高级教师，请解读 JSON 结构的答卷内容，评估答卷内容(context 上下文)中每道题的答题内容，为每道题打分，并给出打分理由和题目讲解； 请将结果以 JSON 结构形式返回。
        JSON 结构的答卷内容是一个数组，每个数组元素的格式如下：
          - question: 字符串，题目描述
          - type: 字符串，题目类型，可以是'填空题'或'简答题'
          - _score: {{full_score}} 数字，满分的分值
          - correct: "{{correct_answer}}" ，正确的标准回答内容
          - answer: "{{student_answer}}" ，学员的回答内容

        JSON 结构的评分结果内容是一个数组，
        填空题的情况每个数组元素的格式如下：
          - question: 字符串，题目描述
          - score:  数字，打分结果分数
          - answer: 字符串，学员的回答内容
          - evaluate: 字符串，评分依据以及题目讲解

        简答题的情况每个数组元素的格式如下：
          - question: 字符串，题目描述
          - score:  数字，打分结果分数
          - answer: 字符串，学员的回答内容
          - evaluate: 字符串，评分依据以及题目讲解
          - accuracy: 数字，准确性得分
          - accuracyEvaluate: 准确性评分依据
          - completeness: 数字，完整性得分
          - completenessEvaluate: 完整性评分依据
          - clarity: 数字，清晰度得分
          - clarityEvaluate: 清晰度评分依据
        
       ### 填空题的打分规则
        1. 如果学员的回答内容完全正确（与正确答案完全匹配），给出满分{{full_score}}。
        2. 如果学员的回答内容部分正确（例如：仅答对了某个关键点或某个部分），按比例扣分。例如，答案部分正确时，给出{{partial_score}}分。
        3. 如果学员的回答内容完全错误（与正确答案没有任何匹配或回答严重错误），给出0分，并简要解释正确答案。
        请提供具体的分数以及简要的讲解，解释评分依据。

       ### 简答题的打分规则
        根据学生的回答和正确答案的匹配程度，按以下维度进行评分：
        1. **准确性**（最大得分：{{accuracy}}）：学生的回答是否正确？是否有误导性内容？
        2. **完整性**（最大得分：{{completeness}}）：学生是否回答了所有关键部分？是否遗漏了重要信息？
        3. **清晰度**（最大得分：{{clarity}}）：学生的回答是否清晰、条理性强？
        请根据每个维度给出相应的分数，并提供总分。最后，请简要讲解评分依据，指出学生的优势与不足，并给出改进建议。

        ### 答卷内容的示例：
        \`\`\`
        [{
          "question": "光合作用的主要产物是什么？",
          "type": "填空题",
          "_score": 5,
          "correct": "葡萄糖和氧气",
          "answer": "葡萄糖"
        }, {
          "question": "请简述光合作用的过程。",
          "type": "简答题",
          "_score": 10,
          "correct": "光合作用是植物通过叶绿体吸收阳光，利用阳光能量将二氧化碳和水转化为葡萄糖和氧气的过程。光合作用包括光反应和暗反应，光反应需要阳光，而暗反应则不需要阳光。",
          "answer": "光合作用是植物用阳光做食物的过程。它将二氧化碳和水转化为葡萄糖和氧气。"
        }]
        \`\`\`

        ### 评分结果的示例：
        \`\`\`
        [{
          "question": "光合作用的主要产物是什么？",
          "type": "填空题",
          "score":  3,
          "answer": "葡萄糖和氧气",
          "evaluate": "学生正确提到葡萄糖是光合作用的产物，但遗漏了氧气。由于部分正确，因此扣除2分，得3分。光合作用的主要产物不仅是葡萄糖，还包括氧气。"
        }, {
          "question": "请简述光合作用的过程。",
          "type": "简答题题",
          "score":  8,
          "answer": "光合作用是植物用阳光做食物的过程。它将二氧化碳和水转化为葡萄糖和氧气。",
          "evaluate": "学生的回答准确但不完整。下次可以进一步补充光合作用的具体步骤，提到光反应和暗反应的区别以及光合作用发生的环境。可以改进表达，使其更具条理性。",
          "accuracy": 4,
          "accuracyEvaluate": "学生正确指出了光合作用的主要过程，即植物用阳光将二氧化碳和水转化为葡萄糖和氧气。",
          "completeness": 3,
          "completenessEvaluate": "学生没有提到光合作用的两个主要反应：光反应和暗反应，以及阳光是否参与光反应的细节。",
          "clarity": 1,
          "clarityEvaluate": "表达简单，但可以更详细地解释光合作用的具体过程，尤其是光反应和暗反应。"
        }]
        \`\`\`
      `,
    };
  },
  mounted() {
    this.$nextTick(() => {
      MathJax.typesetPromise();
    });
  },
  computed: {
    count() {
      let count = 0;
      this.list.map((item) => {
        if (typeof item.selected !== "undefined" || item.inputContent) {
          count++;
        }
      });
      return count;
    },
  },
  methods: {
    //统计所有考题总分
    countAnswerInfo() {
      let count = 0;
      let value = 0;
      let _score = 0;
      let score = 0;
      let answers = [];
      for (let k in this.qMap) {
        let arr = this.qMap[k];
        let sInfo = this.countKnowledgeScore(arr);
        if (sInfo.score === sInfo._score) {
          value++;
        }
        count += sInfo.count; //知识点下，答对的题目数
        for (let i = 0; i < arr.length; i++) {
          let d = arr[i];
          d.point = k;
          d.kIndex = i;
          answers.push(d);
        }
        _score += sInfo._score;
        score += sInfo.score;
      }
      this.qMap = this.qMap || {};
      return {
        value: value, //得满分的知识点数
        max: Object.keys(this.qMap || {}).length, //知识点总数
        _score: _score, //总分值
        score: score, //实际得分
        answers: answers, //所有题目数据，含答题内容
        count: count, //答对的题目数
      };
    },
    //知识点的总分
    countKnowledgeScore(arr) {
      let ret = {
        score: 0,
        _score: 0,
        max: arr.length,
        count: 0,
      };
      let _self = this;
      arr.map((item) => {
        _self.countNodeScore(item);
        ret.score += item.score;
        ret._score += item._score;
        if (item.score === item._score) {
          ret.count++;
        }
      });
      return ret;
    },
    checkInputContent(d) {
      d.inputContent = d.inputContent || "";
      let arr = d.inputContent.split(/[\;\,\、\；\，]/);
      d._score = d._score || 5;
      if (d.type === "简答题") {
        d._score = 10;
      }
      d.score = 0;
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
        if (
          arr[i] &&
          d.answer.findIndex((item) =>
            new RegExp(arr[i], "i").test(item.text || item)
          ) !== -1
        ) {
          d.score += d._score / arr.length;
        }
      }
      return d;
    },
    //给考题评分
    countNodeScore(d) {
      d.selected = d.selected || [];
      if (d.type === "单选题" && d.choices[d.answer[0]] === d.selected[0]) {
        d._score = d._score || 1;
        d.score = d._score;
      } else if (
        d.type === "多选题" &&
        d.answer.length === d.selected.length &&
        this.checkMultipleChoice(d)
      ) {
        d._score = d._score || 2;
        d.score = d._score;
      } else if (d.type === "填空题" || d.type === "简答题") {
        this.checkInputContent(d);
      } else {
        d._score = d._score || d.type === "多选题" ? 2 : 1;
        d.score = 0;
      }
      return d;
    },
    checkMultipleChoice(d) {
      let t = true;
      for (let i = 0; i < d.selected.length; i++) {
        let v = d.selected[i];
        let index = d.choices.indexOf(v);
        d.answer = d.answer.map((item) => {
          return Number(item);
        });
        t = d.answer.indexOf(index) !== -1;
        if (!t) {
          break;
        }
      }
      return t;
    },
    updateScoreInfo(arr, json) {
      for (let i = 0; i < json.length; i++) {
        let item = arr[i];
        let index = item.index;
        let point = item.point;
        let d = this.qMap[point][index];
        d.score = json[i].score;
        d.evaluate = json[i].evaluate;
        if (d.type === "简答题") {
          d.accuracy = json[i].accuracy;
          d.accuracyEvaluate = json[i].accuracyEvaluate;
          d.completeness = json[i].completeness;
          d.completenessEvaluate = json[i].completenessEvaluate;
          d.clarity = json[i].clarity;
          d.clarityEvaluate = json[i].clarityEvaluate;
        }
      }
    },
    evaluateScore(callback) {
      let query = {};
      let arr = [];
      let result = this.countAnswerInfo();
      let answers = result.answers || [];
      for (let i = 0; i < answers.length; i++) {
        let item = answers[i];
        if (item.type === "填空题" || item.type === "简答题") {
          arr.push({
            question: item.name,
            type: item.type,
            point: item.point,
            index: item.kIndex,
            _score: item._score || (item.type === "填空题" ? 5 : 10),
            correct: item.answer,
            answer: item.inputContent,
          });
        }
      }

      query.content = this.evaluatePrompt;
      query.context = JSON.stringify(arr);

      let meta = this.documentMeta || {};
      query.fromAccount = meta.fromAccount || "";
      query.rootAccount = meta.rootAccount || "";
      this.aiAdapter.aigcText(query, (tData) => {
        if (tData.ret === 0) {
          let json = WebTool.transformContent(tData.usage.result);
          console.log("evaluate result:", json);
          this.updateScoreInfo(arr, json);
          if (typeof callback === "function") {
            callback(json);
          }
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
      });
    },
    handleInputChange(item) {
      let k = item.point;
      let arr = this.qMap[k] || [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === item.name) {
          arr[i].inputContent = item.inputContent;
        }
      }
    },
    handleSelectItem: function (i) {
      let item = this.list[this.index];
      item.selected = item.selected || [];
      let selected = item.choices[i];
      if (item.type === "多选题") {
        let index = item.selected.indexOf(selected);
        if (index === -1) {
          item.selected.push(selected);
        } else {
          item.selected.splice(index, 1);
        }
      } else {
        item.selected = [selected];
      }
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
      // MathJax.clear();
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        this.$nextTick(()=>{
          MathJax.typesetPromise();
        });
      });
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
  padding: 40px 50px 10px 50px;
  text-shadow: -1px 1px rgba(47, 42, 118, 0.3);
}

.childAppContent .questionInfoArea {
  float: left;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.childAppContent .questionInfoArea .questionTitleArea {
  display: inline-block;
  width: 100%;
  margin-bottom: 30px;
  border-bottom: none !important;
}

.childAppContent .questionInfoArea .questionTitleArea h3 {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 60px;
  border-top: solid 1px #ddd;
  padding-top: 20px;
  text-align: left;
}

.childAppContent .questionInfoArea .questionTitleArea h3 span {
  display: inline;
}

.stepInfoArea {
  padding: 30px 0px;
  font-size: 40px;
}

.questionItemArea {
  float: left;
  position: relative;
  width: 100%;
}

.qustionContentItem {
  float: left;
  position: relative;
  width: 100%;
  height: calc(100% - 210px);
  overflow: auto;
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
  width: 75px;
  height: 75px;
  border-radius: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.switchButtonList {
  margin-top: 25px;
  float: right;
}

.inputContentArea .el-input,
.inputContentArea .el-textarea {
  transform: scale(3);
  transform-origin: 0 0;
  width: 33.33%;
}

.el-progress__text {
  font-size: 24px !important;
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