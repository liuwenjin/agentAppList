transweb_agents({
    agentList: [{
        "name": 'knowledgeChinese',
        "appType": 'single',
        "resolution": [1200, 1200],
        "dataShare": true,
        "meta": {
            "label": '初中语文智能出题',
            "description": '智能出题、专业讲解，错题变成新起点，一步步提升成绩。',
            "slogan": '语文备考小帮手：AI 测评与错题诊断系统',
            "slogan1": '覆盖核心考点 · 提升应试技巧 · 全面巩固语文基础',
            "buttonText": '开始出题',
            "confirmTips": 'AI 智能生成，预计 30 秒内完成',
            "scanQrTips": '扫码检测，开启你的自我成长之旅！',
            "inputPlaceholder": '请输入初中语文知识点范围描述'
        },
        "appPrompts": function() {
            return `# 任务目标：
    你是一位专注于初中语文科目出题与错题解析的AI教学助手。你的任务是根据指定的教材内容、知识点或考试大纲，为学生生成测试题，并在学生作答后，对他们答错的题目提供详细的答案解析和讲解。请严格按照以下要求执行：
    
    1. 适用范围与难度
    适用对象：初中学生，涵盖初一至初三各年级的语文内容。
    难度分级：题目难度适中，既包括基础知识题，也涵盖提升题，确保全面考查学生的语文能力。
    
    2. 知识点覆盖
    内容范围：根据指定的教材章节或知识点，如字词句的正确使用、成语运用、古诗文背诵与理解、现代文阅读与分析、作文写作技巧等。
    重点突出：特别强调常见考点和易错点，确保试题能够有效检测学生对相关知识的掌握情况。
    
    3. 答案与解析
    标准答案：为每道题目提供正确答案，确保与教材和教学要求一致。
    错题解析：
    错误选项分析：针对选择题，逐一分析错误选项，说明其错误原因和易混淆之处。
    解题思路：详细讲解正确答案的解题步骤和逻辑，帮助学生理解解题方法。
    知识点回顾：在解析中复习相关知识点，强化学生对概念的理解和记忆。
    常见错误：指出学生可能犯的常见错误，并提供避免这些错误的建议。
    
    4. 语言与表达
    清晰简洁：使用简明易懂的语言，确保学生能够轻松理解题目和解析内容。
    逻辑严谨：确保题目设置合理，解析条理清晰，步骤完整。
    示例丰富：在必要时提供具体例子，帮助学生更好地理解复杂概念或难点。
    
    5. 规范与准确性
    内容准确：确保所有题目和解析内容的准确性，不含有误导性信息。
    格式统一：保持题目和答案的格式一致，便于学生阅读和使用。
    文化与背景：在涉及古诗文或文化知识时，确保背景信息的准确性和权威性。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析知识点范围描述的主旨、所包含的知识点列表，以及每个知识点的下一级相关知识点列表，以 JSON 格式呈现。
    - 为最后一级的每个知识点，生成 3 道中低难度的单项选择题，并附上正确选项极其说明。

    #### JSON结构如下：
      - 'name': 表示内容的主旨标题;
      - 'children': 一个数组，列出二级主题，每个主题的字段包括：
         - 'name': 关键要点；
         - 'questions': 一个数组，包含测试题，每道题的字段包括：
            - 'name': 题目的描述
            - 'choices': 一个数组，包含备选项。
            - 'answer': 题目的正确选项编号。
            - 'reason': 正确选项的原因说明
     
      示例输出：
\`\`\`
      {
        "name": "主旨标题",
        "children": [
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          }
        ]
      }
\`\`\`
  ### 答案输出约束
    - 仅输出 JSON 不包含任何额外说明或文字。
    - questions中的问题(问题题干避免使用“哪些”)，只有一个正确答案，且存在于相应的choices中。
    - questions中问题的正确选项编号，从 0 开始（对应choices数组的索引从0开始）。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
		- 键值内部出现任何双引号字符。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
        },
        "dataFormat": 'json',
        "jsonToFragments": function(json) {
            let getQuestions = function(json, qMap) {
                if (json.questions) {
                    json.questions.map(item => {
                        let k = json.parent + "_" + json.name;
                        item.point = k;
                        qMap[k] = qMap[k] || [];
                        qMap[k].push(item);
                    })
                }
                if (json.children) {
                    for (let i = 0; i < json.children.length; i++) {
                        let tData = json.children[i];
                        tData.parent = json.name;
                        getQuestions(tData, qMap);
                    }
                }
            }
            let fragments = [];
            let tRoot = json;

            tRoot.symbol =
                'image://data:image/png;base64,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';

            tRoot.symbolSize = 70;
            tRoot.label = {
                fontSize: 40,
                distance: 30,
                color: "#2f2a76"
            }
            for (let i = 0; i < tRoot.children.length; i++) {
                let item = tRoot.children[i];
                if (!item.questions || item.questions.length === 0) {
                    item.symbolRotate = -35;
                    item.label = {
                        distance: 5,
                        color: "#2f2a76"
                    };
                    item.symbol =
                        'path://M780.43 157.55c-4.628-6.106-11.954-9.456-19.623-8.974-7.61 0.482-14.482 4.799-18.286 11.417-66.223 115.861-151.982 155.787-227.634 191.001-49.525 23.059-96.297 44.838-131.139 84.339-38.849 44.102-56.965 103.651-56.965 187.252 0 32.033 2.668 67.531 8.005 107.287-99.959 24.025-186.797 10.193-186.797 10.193v91.014c111.489 0 204.009-26.239 271.451-54.581 44.186-16.753 83.175-39.103 117.536-64.774 3.949-2.951 6.077-4.629 6.162-4.713 165.644-127.758 219.147-330.971 219.147-330.971 0 217.181-158.401 405.542-360.591 472.987 62.192 19.794 119.952 28.539 172.203 26.097 58.669-2.782 110.693-19.537 154.624-49.951 93.513-64.605 147.158-189.837 147.158-343.495 0-124.239-35.639-245.412-95.273-324.158l0.023 0.028zM780.403 157.523z'

                }
            }

            let mindmapItem = {
                className: "EchartsItem",
                dsl: {
                    option: {
                        series: {
                            layout: "orthogonal",
                            orient: "LR",
                            symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z",
                            symbolSize: 30,
                            itemStyle: {
                                color: "#398246"
                            },
                            label: {
                                color: "#2f2a76"
                            },
                            lineStyle: {
                                width: 1,
                                color: '#398246'
                            },
                            leaves: {
                                symbolRotate: 0,
                                itemStyle: {
                                    color: "#398246"
                                },
                                lineStyle: {
                                    width: 1,
                                    color: '#398246'
                                },
                                label: {
                                    color: "#2f2a76"
                                },
                                symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"
                            }
                        }
                    },
                    type: "tree",
                    data: [tRoot],
                    promise: {
                        afterRender: function(c, d, t) {
                            t.chart.on("click", function(param) {
                                let content = param.treeAncestors.map(item => {
                                    let value = item.name.replace(
                                        /\[.*?\]/g, "");
                                    return value;
                                });
                                content = content.reverse();
                                content = content.join(".");
                                content = content.replace(/^\./, '');
                                webCpu.mitt.emit("entryText", content);
                            })
                        }
                    }
                },
            };

            item = {
                title: json.name,
                dsl: [mindmapItem],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#F8F9FA"
                }
            });

            let qMap = {};
            getQuestions(tRoot, qMap);
            let qArr = [];
            for (let k in qMap) {
                for (let i = 0; i < qMap[k].length; i++) {
                    qArr.push(qMap[k][i])
                }
            }
            let testApp = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/testApp.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        qMap: qMap,
                        list: qArr
                    }
                }
            }

            item = {
                title: "",
                dsl: [testApp],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#f2f2f2"
                }
            });

            let lightedTree = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/lightedTree.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        content: {
                            dsl: [WebTool.copyObject(mindmapItem)]
                        },
                        list: []
                    }
                }
            }

            item = {
                title: "",
                dsl: [lightedTree],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#fff"
                }
            });

            return fragments;

        },
        "url": 'https://transweb.cn/bucket/personal/1714628260/layout/knowledgeTree.vue',
        "className": 'ElementVueItem',
        "cardName": 'knowledgeTreeCard',
        "dsl": {
            "style": {
                "padding": '0px'
            }
        }
    }, {
        "name": 'knowledgeMathematics',
        "appType": 'single',
        "resolution": [1200, 1200],
        "dataShare": true,
        "meta": {
            "label": '初中数学智能出题',
            "description": '智能出题、专业讲解，错题变成新起点，一步步提升成绩。',
            "slogan": '数学备考小帮手：AI 测评与错题诊断系统',
            "slogan1": '覆盖核心考点 · 提升应试技巧 · 全面巩固数学基础',
            "buttonText": '开始出题',
            "confirmTips": 'AI 智能生成，预计 30 秒内完成',
            "scanQrTips": '扫码检测，开启你的自我成长之旅！',
            "inputPlaceholder": '请输入初中数学知识点范围描述'
        },
        "appPrompts": function() {
            return `# 任务目标：
    你是一位专注于初中数学科目出题与错题解析的AI教学助手。你的任务是根据指定的教材内容、知识点或考试大纲，为学生生成测试题，并在学生作答后，对他们答错的题目提供详细的答案解析和讲解。请严格按照以下要求执行：
    
    1. 适用范围与难度
    适用对象：初中学生，涵盖初一至初三各年级的数学内容。
    难度分级：题目难度适中，包含基础题、提高题和综合应用题，确保全面考查学生的数学能力。
    
    2. 知识点覆盖
    内容范围：根据指定的教材章节或知识点，如代数（方程与不等式）、几何（图形与性质）、函数、统计与概率、数与式、图形的变换等。
    重点突出：特别强调常见考点和易错点，确保试题能够有效检测学生对相关知识的掌握情况。
    
    3. 答案与解析
    标准答案：为每道题目提供正确答案，确保与教材和教学要求一致。
    错题解析：
    错误选项分析：针对选择题，逐一分析错误选项，说明其错误原因和易混淆之处。
    解题思路：详细讲解正确答案的解题步骤和逻辑，帮助学生理解解题方法。
    知识点回顾：在解析中复习相关知识点，强化学生对概念的理解和记忆。
    常见错误：指出学生可能犯的常见错误，并提供避免这些错误的建议。
    
    4. 语言与表达
    清晰简洁：使用简明易懂的语言，确保学生能够轻松理解题目和解析内容。
    逻辑严谨：确保题目设置合理，解析条理清晰，步骤完整。
    示例丰富：在必要时提供具体例子，帮助学生更好地理解复杂概念或难点。
    
    5. 规范与准确性
    内容准确：确保所有题目和解析内容的准确性，不含有误导性信息。
    格式统一：保持题目和答案的格式一致，便于学生阅读和使用。
    符号规范：数学符号使用规范，公式书写正确，图形绘制清晰。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析知识点范围描述的主旨、所包含的知识点列表，以及每个知识点的下一级相关知识点列表，以 JSON 格式呈现。
    - 为最后一级的每个知识点，生成 3 道中低难度的单项选择题，并附上正确选项极其说明。

    #### JSON结构如下：
      - 'name': 表示内容的主旨标题;
      - 'children': 一个数组，列出知识点列表，每个主题的字段包括：
         - 'name': 所属知识点；
         - 'questions': 一个数组，包含测试题，每道题的字段包括：
            - 'name': 题目的描述
            - 'choices': 一个数组，包含备选项。
            - 'answer': 题目的正确选项编号。
            - 'reason': 正确选项的原因说明
     
      示例输出：
\`\`\`
      {
        "name": "主旨标题",
        "children": [
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          }
        ]
      }
\`\`\`
  ### 答案输出约束
    - 仅输出 JSON 不包含任何额外说明或文字。
    - questions中的问题(问题题干避免使用“哪些”)，只有一个正确答案，且存在于相应的choices中。
    - questions中问题的正确选项编号，从 0 开始（对应choices数组的索引从0开始）。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
		- 键值内部出现任何双引号字符。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
        },
        "dataFormat": 'json',
        "jsonToFragments": function(json) {
            let getQuestions = function(json, qMap) {
                if (json.questions) {
                    json.questions.map(item => {
                        let k = json.parent + "_" + json.name;
                        item.point = k;
                        qMap[k] = qMap[k] || [];
                        qMap[k].push(item);
                    })
                }
                if (json.children) {
                    for (let i = 0; i < json.children.length; i++) {
                        let tData = json.children[i];
                        tData.parent = json.name;
                        getQuestions(tData, qMap);
                    }
                }
            }
            let fragments = [];
            let tRoot = json;

            tRoot.symbol =
                'image://data:image/png;base64,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';

            tRoot.symbolSize = 70;
            tRoot.label = {
                fontSize: 40,
                distance: 30,
                color: "#2f2a76"
            }
            for (let i = 0; i < tRoot.children.length; i++) {
                let item = tRoot.children[i];
                if (!item.questions || item.questions.length === 0) {
                    item.symbolRotate = -35;
                    item.label = {
                        distance: 5,
                        color: "#2f2a76"
                    };
                    item.symbol =
                        'path://M780.43 157.55c-4.628-6.106-11.954-9.456-19.623-8.974-7.61 0.482-14.482 4.799-18.286 11.417-66.223 115.861-151.982 155.787-227.634 191.001-49.525 23.059-96.297 44.838-131.139 84.339-38.849 44.102-56.965 103.651-56.965 187.252 0 32.033 2.668 67.531 8.005 107.287-99.959 24.025-186.797 10.193-186.797 10.193v91.014c111.489 0 204.009-26.239 271.451-54.581 44.186-16.753 83.175-39.103 117.536-64.774 3.949-2.951 6.077-4.629 6.162-4.713 165.644-127.758 219.147-330.971 219.147-330.971 0 217.181-158.401 405.542-360.591 472.987 62.192 19.794 119.952 28.539 172.203 26.097 58.669-2.782 110.693-19.537 154.624-49.951 93.513-64.605 147.158-189.837 147.158-343.495 0-124.239-35.639-245.412-95.273-324.158l0.023 0.028zM780.403 157.523z'

                }
            }

            let mindmapItem = {
                className: "EchartsItem",
                dsl: {
                    option: {
                        series: {
                            layout: "orthogonal",
                            orient: "LR",
                            symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z",
                            symbolSize: 30,
                            itemStyle: {
                                color: "#398246"
                            },
                            label: {
                                color: "#2f2a76"
                            },
                            lineStyle: {
                                width: 1,
                                color: '#398246'
                            },
                            leaves: {
                                symbolRotate: 0,
                                itemStyle: {
                                    color: "#398246"
                                },
                                lineStyle: {
                                    width: 1,
                                    color: '#398246'
                                },
                                label: {
                                    color: "#2f2a76"
                                },
                                symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"
                            }
                        }
                    },
                    type: "tree",
                    data: [tRoot],
                    promise: {
                        afterRender: function(c, d, t) {
                            t.chart.on("click", function(param) {
                                let content = param.treeAncestors.map(item => {
                                    let value = item.name.replace(
                                        /\[.*?\]/g, "");
                                    return value;
                                });
                                content = content.reverse();
                                content = content.join(".");
                                content = content.replace(/^\./, '');
                                webCpu.mitt.emit("entryText", content);
                            })
                        }
                    }
                },
            };

            item = {
                title: json.name,
                dsl: [mindmapItem],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#F8F9FA"
                }
            });

            let qMap = {};
            getQuestions(tRoot, qMap);
            let qArr = [];
            for (let k in qMap) {
                for (let i = 0; i < qMap[k].length; i++) {
                    qArr.push(qMap[k][i])
                }
            }
            let testApp = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/testApp.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        qMap: qMap,
                        list: qArr
                    }
                }
            }

            item = {
                title: "",
                dsl: [testApp],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#f2f2f2"
                }
            });

            let lightedTree = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/lightedTree.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        content: {
                            dsl: [WebTool.copyObject(mindmapItem)]
                        },
                        list: []
                    }
                }
            }

            item = {
                title: "",
                dsl: [lightedTree],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#fff"
                }
            });

            return fragments;

        },
        "url": 'https://transweb.cn/bucket/personal/1714628260/layout/knowledgeTree.vue',
        "className": 'ElementVueItem',
        "cardName": 'knowledgeTreeCard',
        "dsl": {
            "style": {
                "padding": '0px'
            }
        }
    }, {
        "name": 'knowledgeEnglish',
        "appType": 'single',
        "resolution": [1200, 1200],
        "dataShare": true,
        "meta": {
            "label": '初中英语智能出题',
            "description": '智能出题、专业讲解，错题变成新起点，一步步提升成绩。',
            "slogan": '英语备考小帮手：AI 测评与错题诊断系统',
            "slogan1": '覆盖核心考点 · 提升应试技巧 · 全面巩固英语基础',
            "buttonText": '开始出题',
            "confirmTips": 'AI 智能生成，预计 30 秒内完成',
            "scanQrTips": '扫码检测，开启你的自我成长之旅！',
            "inputPlaceholder": '请输入初中英语知识点范围描述'
        },
        "appPrompts": function() {
            return `# 任务目标：
    你是一位专注于初中英语科目出题与错题解析的AI教学助手。你的任务是根据指定的教材内容、知识点或考试大纲，为学生生成测试题，并在学生作答后，对他们答错的题目提供详细的答案解析和讲解。请严格按照以下要求执行：
    
    1. 适用范围与难度
    适用对象：初中学生，涵盖初一至初三各年级的英语内容。
    难度分级：题目难度适中，包含基础题、提高题和综合应用题，确保全面考查学生的英语能力。
    
    2. 知识点覆盖
    内容范围：根据指定的教材章节或知识点，如语法（时态、被动语态、条件句等）、词汇（高频词汇、短语搭配）、阅读理解（主旨大意、细节理解、推理判断）、写作技巧（段落结构、常用表达）、听力理解（如适用）等。
    重点突出：特别强调常见考点和易错点，确保试题能够有效检测学生对相关知识的掌握情况。
    
    3. 答案与解析
    标准答案：为每道题目提供正确答案，确保与教材和教学要求一致。
    错题解析：
    错误选项分析：针对选择题，逐一分析错误选项，说明其错误原因和易混淆之处。
    解题思路：详细讲解正确答案的解题步骤和逻辑，帮助学生理解解题方法。
    知识点回顾：在解析中复习相关知识点，强化学生对概念的理解和记忆。
    常见错误：指出学生可能犯的常见错误，并提供避免这些错误的建议。
    
    4. 语言与表达
    清晰简洁：使用简明易懂的语言，确保学生能够轻松理解题目和解析内容。
    逻辑严谨：确保题目设置合理，解析条理清晰，步骤完整。
    示例丰富：在必要时提供具体例子，帮助学生更好地理解复杂概念或难点。
    
    5. 规范与准确性
    内容准确：确保所有题目和解析内容的准确性，不含有误导性信息。
    格式统一：保持题目和答案的格式一致，便于学生阅读和使用。
    语言规范：确保英语题目和选项的语法、拼写正确，避免出现错误。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析知识点范围描述的主旨、所包含的知识点列表，以及每个知识点的下一级相关知识点列表，以 JSON 格式呈现。
    - 为最后一级的每个知识点，生成 3 道中低难度的单项选择题，并附上正确选项极其说明。

    #### JSON结构如下：
      - 'name': 表示内容的主旨标题;
      - 'children': 一个数组，列出二级主题，每个主题的字段包括：
         - 'name': 关键要点；
         - 'questions': 一个数组，包含测试题，每道题的字段包括：
            - 'name': 题目的描述
            - 'choices': 一个数组，包含备选项。
            - 'answer': 题目的正确选项编号。
            - 'reason': 正确选项的原因说明
     
      示例输出：
\`\`\`
      {
        "name": "主旨标题",
        "children": [
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          }
        ]
      }
\`\`\`
  ### 答案输出约束
    - 仅输出 JSON 不包含任何额外说明或文字。
    - questions中的问题(问题题干避免使用“哪些”)，只有一个正确答案，且存在于相应的choices中。
    - questions中问题的正确选项编号，从 0 开始（对应choices数组的索引从0开始）。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
		- 键值内部出现任何双引号字符。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
        },
        "dataFormat": 'json',
        "jsonToFragments": function(json) {
            let getQuestions = function(json, qMap) {
                if (json.questions) {
                    json.questions.map(item => {
                        let k = json.parent + "_" + json.name;
                        item.point = k;
                        qMap[k] = qMap[k] || [];
                        qMap[k].push(item);
                    })
                }
                if (json.children) {
                    for (let i = 0; i < json.children.length; i++) {
                        let tData = json.children[i];
                        tData.parent = json.name;
                        getQuestions(tData, qMap);
                    }
                }
            }
            let fragments = [];
            let tRoot = json;

            tRoot.symbol =
                'image://data:image/png;base64,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';

            tRoot.symbolSize = 70;
            tRoot.label = {
                fontSize: 40,
                distance: 30,
                color: "#2f2a76"
            }
            for (let i = 0; i < tRoot.children.length; i++) {
                let item = tRoot.children[i];
                if (!item.questions || item.questions.length === 0) {
                    item.symbolRotate = -35;
                    item.label = {
                        distance: 5,
                        color: "#2f2a76"
                    };
                    item.symbol =
                        'path://M780.43 157.55c-4.628-6.106-11.954-9.456-19.623-8.974-7.61 0.482-14.482 4.799-18.286 11.417-66.223 115.861-151.982 155.787-227.634 191.001-49.525 23.059-96.297 44.838-131.139 84.339-38.849 44.102-56.965 103.651-56.965 187.252 0 32.033 2.668 67.531 8.005 107.287-99.959 24.025-186.797 10.193-186.797 10.193v91.014c111.489 0 204.009-26.239 271.451-54.581 44.186-16.753 83.175-39.103 117.536-64.774 3.949-2.951 6.077-4.629 6.162-4.713 165.644-127.758 219.147-330.971 219.147-330.971 0 217.181-158.401 405.542-360.591 472.987 62.192 19.794 119.952 28.539 172.203 26.097 58.669-2.782 110.693-19.537 154.624-49.951 93.513-64.605 147.158-189.837 147.158-343.495 0-124.239-35.639-245.412-95.273-324.158l0.023 0.028zM780.403 157.523z'

                }
            }

            let mindmapItem = {
                className: "EchartsItem",
                dsl: {
                    option: {
                        series: {
                            layout: "orthogonal",
                            orient: "LR",
                            symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z",
                            symbolSize: 30,
                            itemStyle: {
                                color: "#398246"
                            },
                            label: {
                                color: "#2f2a76"
                            },
                            lineStyle: {
                                width: 1,
                                color: '#398246'
                            },
                            leaves: {
                                symbolRotate: 0,
                                itemStyle: {
                                    color: "#398246"
                                },
                                lineStyle: {
                                    width: 1,
                                    color: '#398246'
                                },
                                label: {
                                    color: "#2f2a76"
                                },
                                symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"
                            }
                        }
                    },
                    type: "tree",
                    data: [tRoot],
                    promise: {
                        afterRender: function(c, d, t) {
                            t.chart.on("click", function(param) {
                                let content = param.treeAncestors.map(item => {
                                    let value = item.name.replace(
                                        /\[.*?\]/g, "");
                                    return value;
                                });
                                content = content.reverse();
                                content = content.join(".");
                                content = content.replace(/^\./, '');
                                webCpu.mitt.emit("entryText", content);
                            })
                        }
                    }
                },
            };

            item = {
                title: json.name,
                dsl: [mindmapItem],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#F8F9FA"
                }
            });

            let qMap = {};
            getQuestions(tRoot, qMap);
            let qArr = [];
            for (let k in qMap) {
                for (let i = 0; i < qMap[k].length; i++) {
                    qArr.push(qMap[k][i])
                }
            }
            let testApp = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/testApp.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        qMap: qMap,
                        list: qArr
                    }
                }
            }

            item = {
                title: "",
                dsl: [testApp],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#f2f2f2"
                }
            });

            let lightedTree = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/lightedTree.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        content: {
                            dsl: [WebTool.copyObject(mindmapItem)]
                        },
                        list: []
                    }
                }
            }

            item = {
                title: "",
                dsl: [lightedTree],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#fff"
                }
            });

            return fragments;

        },
        "url": 'https://transweb.cn/bucket/personal/1714628260/layout/knowledgeTree.vue',
        "className": 'ElementVueItem',
        "cardName": 'knowledgeTreeCard',
        "dsl": {
            "style": {
                "padding": '0px'
            }
        }
    }, {
        "name": 'knowledgePhysics',
        "appType": 'single',
        "resolution": [1200, 1200],
        "dataShare": true,
        "meta": {
            "label": '初中物理智能出题',
            "description": '智能出题、专业讲解，错题变成新起点，一步步提升成绩。',
            "slogan": '物理备考小帮手：AI 测评与错题诊断系统',
            "slogan1": '覆盖核心考点 · 提升应试技巧 · 全面巩固物理基础',
            "buttonText": '开始出题',
            "confirmTips": 'AI 智能生成，预计 30 秒内完成',
            "scanQrTips": '扫码检测，开启你的自我成长之旅！',
            "inputPlaceholder": '请输入初中物理知识点范围描述'
        },
        "appPrompts": function() {
            return `# 任务目标：
    你是一位专注于初中物理科目出题与错题解析的AI教学助手。你的任务是根据指定的教材内容、知识点或考试大纲，为学生生成测试题，并在学生作答后，对他们答错的题目提供详细的答案解析和讲解。请严格按照以下要求执行：

1. 适用范围与难度
适用对象：初中学生，涵盖初一至初三各年级的物理内容。
难度分级：题目难度适中，包含基础题、提高题和综合应用题，确保全面考查学生的物理能力。

2. 知识点覆盖
内容范围：根据指定的教材章节或知识点，如力与运动、能量与功、热学、电学、光学、声学等。
重点突出：特别强调常见考点和易错点，确保试题能够有效检测学生对相关知识的掌握情况。

3. 答案与解析
标准答案：为每道题目提供正确答案，确保与教材和教学要求一致。
错题解析：
错误选项分析：针对选择题，逐一分析错误选项，说明其错误原因和易混淆之处。
解题思路：详细讲解正确答案的解题步骤和逻辑，帮助学生理解解题方法。
知识点回顾：在解析中复习相关知识点，强化学生对概念的理解和记忆。
常见错误：指出学生可能犯的常见错误，并提供避免这些错误的建议。

4. 语言与表达
清晰简洁：使用简明易懂的语言，确保学生能够轻松理解题目和解析内容。
逻辑严谨：确保题目设置合理，解析条理清晰，步骤完整。
示例丰富：在必要时提供具体例子，帮助学生更好地理解复杂概念或难点。

5. 规范与准确性
内容准确：确保所有题目和解析内容的准确性，不含有误导性信息。
格式统一：保持题目和答案的格式一致，便于学生阅读和使用。
符号规范：物理符号使用规范，公式书写正确，图形绘制清晰（如适用）。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析知识点范围描述的主旨、所包含的知识点列表，以及每个知识点的下一级相关知识点列表，以 JSON 格式呈现。
    - 为最后一级的每个知识点，生成 3 道中低难度的单项选择题，并附上正确选项极其说明。

    #### JSON结构如下：
      - 'name': 表示内容的主旨标题;
      - 'children': 一个数组，列出二级主题，每个主题的字段包括：
         - 'name': 关键要点；
         - 'questions': 一个数组，包含测试题，每道题的字段包括：
            - 'name': 题目的描述
            - 'choices': 一个数组，包含备选项。
            - 'answer': 题目的正确选项编号。
            - 'reason': 正确选项的原因说明
     
      示例输出：
\`\`\`
      {
        "name": "主旨标题",
        "children": [
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          }
        ]
      }
\`\`\`
  ### 答案输出约束
    - 仅输出 JSON 不包含任何额外说明或文字。
    - questions中的问题(问题题干避免使用“哪些”)，只有一个正确答案，且存在于相应的choices中。
    - questions中问题的正确选项编号，从 0 开始（对应choices数组的索引从0开始）。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
		- 键值内部出现任何双引号字符。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
        },
        "dataFormat": 'json',
        "jsonToFragments": function(json) {
            let getQuestions = function(json, qMap) {
                if (json.questions) {
                    json.questions.map(item => {
                        let k = json.parent + "_" + json.name;
                        item.point = k;
                        qMap[k] = qMap[k] || [];
                        qMap[k].push(item);
                    })
                }
                if (json.children) {
                    for (let i = 0; i < json.children.length; i++) {
                        let tData = json.children[i];
                        tData.parent = json.name;
                        getQuestions(tData, qMap);
                    }
                }
            }
            let fragments = [];
            let tRoot = json;

            tRoot.symbol =
                'image://data:image/png;base64,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';

            tRoot.symbolSize = 70;
            tRoot.label = {
                fontSize: 40,
                distance: 30,
                color: "#2f2a76"
            }
            for (let i = 0; i < tRoot.children.length; i++) {
                let item = tRoot.children[i];
                if (!item.questions || item.questions.length === 0) {
                    item.symbolRotate = -35;
                    item.label = {
                        distance: 5,
                        color: "#2f2a76"
                    };
                    item.symbol =
                        'path://M780.43 157.55c-4.628-6.106-11.954-9.456-19.623-8.974-7.61 0.482-14.482 4.799-18.286 11.417-66.223 115.861-151.982 155.787-227.634 191.001-49.525 23.059-96.297 44.838-131.139 84.339-38.849 44.102-56.965 103.651-56.965 187.252 0 32.033 2.668 67.531 8.005 107.287-99.959 24.025-186.797 10.193-186.797 10.193v91.014c111.489 0 204.009-26.239 271.451-54.581 44.186-16.753 83.175-39.103 117.536-64.774 3.949-2.951 6.077-4.629 6.162-4.713 165.644-127.758 219.147-330.971 219.147-330.971 0 217.181-158.401 405.542-360.591 472.987 62.192 19.794 119.952 28.539 172.203 26.097 58.669-2.782 110.693-19.537 154.624-49.951 93.513-64.605 147.158-189.837 147.158-343.495 0-124.239-35.639-245.412-95.273-324.158l0.023 0.028zM780.403 157.523z'

                }
            }

            let mindmapItem = {
                className: "EchartsItem",
                dsl: {
                    option: {
                        series: {
                            layout: "orthogonal",
                            orient: "LR",
                            symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z",
                            symbolSize: 30,
                            itemStyle: {
                                color: "#398246"
                            },
                            label: {
                                color: "#2f2a76"
                            },
                            lineStyle: {
                                width: 1,
                                color: '#398246'
                            },
                            leaves: {
                                symbolRotate: 0,
                                itemStyle: {
                                    color: "#398246"
                                },
                                lineStyle: {
                                    width: 1,
                                    color: '#398246'
                                },
                                label: {
                                    color: "#2f2a76"
                                },
                                symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"
                            }
                        }
                    },
                    type: "tree",
                    data: [tRoot],
                    promise: {
                        afterRender: function(c, d, t) {
                            t.chart.on("click", function(param) {
                                let content = param.treeAncestors.map(item => {
                                    let value = item.name.replace(
                                        /\[.*?\]/g, "");
                                    return value;
                                });
                                content = content.reverse();
                                content = content.join(".");
                                content = content.replace(/^\./, '');
                                webCpu.mitt.emit("entryText", content);
                            })
                        }
                    }
                },
            };

            item = {
                title: json.name,
                dsl: [mindmapItem],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#F8F9FA"
                }
            });

            let qMap = {};
            getQuestions(tRoot, qMap);
            let qArr = [];
            for (let k in qMap) {
                for (let i = 0; i < qMap[k].length; i++) {
                    qArr.push(qMap[k][i])
                }
            }
            let testApp = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/testApp.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        qMap: qMap,
                        list: qArr
                    }
                }
            }

            item = {
                title: "",
                dsl: [testApp],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#f2f2f2"
                }
            });

            let lightedTree = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/lightedTree.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        content: {
                            dsl: [WebTool.copyObject(mindmapItem)]
                        },
                        list: []
                    }
                }
            }

            item = {
                title: "",
                dsl: [lightedTree],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#fff"
                }
            });

            return fragments;

        },
        "url": 'https://transweb.cn/bucket/personal/1714628260/layout/knowledgeTree.vue',
        "className": 'ElementVueItem',
        "cardName": 'knowledgeTreeCard',
        "dsl": {
            "style": {
                "padding": '0px'
            }
        }
    }, {
        "name": 'knowledgeChemistry',
        "appType": 'single',
        "resolution": [1200, 1200],
        "dataShare": true,
        "meta": {
            "label": '初中化学智能出题',
            "description": '智能出题、专业讲解，错题变成新起点，一步步提升成绩。',
            "slogan": '化学备考小帮手：AI 测评与错题诊断系统',
            "slogan1": '覆盖核心考点 · 提升应试技巧 · 全面巩固化学基础',
            "buttonText": '开始出题',
            "confirmTips": 'AI 智能生成，预计 30 秒内完成',
            "scanQrTips": '扫码检测，开启你的自我成长之旅！',
            "inputPlaceholder": '请输入初中化学知识点范围描述'
        },
        "appPrompts": function() {
            return `# 任务目标：
    你是一位专注于初中化学科目出题与错题解析的AI教学助手。你的任务是根据指定的教材内容、知识点或考试大纲，为学生生成测试题，并在学生作答后，对他们答错的题目提供详细的答案解析和讲解。请严格按照以下要求执行：
    
    1. 适用范围与难度
    适用对象：初中学生，涵盖初一至初三各年级的化学内容。
    难度分级：题目难度适中，包含基础题、提高题和综合应用题，确保全面考查学生的化学能力。
    
    2. 知识点覆盖
    内容范围：根据指定的教材章节或知识点，如物质的分类、化学方程式、酸碱中和、金属与非金属的性质、氧化还原反应、溶液与浓度、化学实验操作等。
    重点突出：特别强调常见考点和易错点，确保试题能够有效检测学生对相关知识的掌握情况。
    
    3. 答案与解析
    标准答案：为每道题目提供正确答案，确保与教材和教学要求一致。
    错题解析：
    错误选项分析：针对选择题，逐一分析错误选项，说明其错误原因和易混淆之处。
    解题思路：详细讲解正确答案的解题步骤和逻辑，帮助学生理解解题方法。
    知识点回顾：在解析中复习相关知识点，强化学生对概念的理解和记忆。
    常见错误：指出学生可能犯的常见错误，并提供避免这些错误的建议。
    
    4. 语言与表达
    清晰简洁：使用简明易懂的语言，确保学生能够轻松理解题目和解析内容。
    逻辑严谨：确保题目设置合理，解析条理清晰，步骤完整。
    示例丰富：在必要时提供具体例子，帮助学生更好地理解复杂概念或难点。
    
    5. 规范与准确性
    内容准确：确保所有题目和解析内容的准确性，不含有误导性信息。
    格式统一：保持题目和答案的格式一致，便于学生阅读和使用。
    符号规范：化学符号使用规范，化学方程式书写正确，实验步骤描述清晰（如适用）。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析知识点范围描述的主旨、所包含的知识点列表，以及每个知识点的下一级相关知识点列表，以 JSON 格式呈现。
    - 为最后一级的每个知识点，生成 3 道中低难度的单项选择题，并附上正确选项极其说明。

    #### JSON结构如下：
      - 'name': 表示内容的主旨标题;
      - 'children': 一个数组，列出二级主题，每个主题的字段包括：
         - 'name': 关键要点；
         - 'questions': 一个数组，包含测试题，每道题的字段包括：
            - 'name': 题目的描述
            - 'choices': 一个数组，包含备选项。
            - 'answer': 题目的正确选项编号。
            - 'reason': 正确选项的原因说明
     
      示例输出：
\`\`\`
      {
        "name": "主旨标题",
        "children": [
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          }
        ]
      }
\`\`\`
  ### 答案输出约束
    - 仅输出 JSON 不包含任何额外说明或文字。
    - questions中的问题(问题题干避免使用“哪些”)，只有一个正确答案，且存在于相应的choices中。
    - questions中问题的正确选项编号，从 0 开始（对应choices数组的索引从0开始）。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
		- 键值内部出现任何双引号字符。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
        },
        "dataFormat": 'json',
        "jsonToFragments": function(json) {
            let getQuestions = function(json, qMap) {
                if (json.questions) {
                    json.questions.map(item => {
                        let k = json.parent + "_" + json.name;
                        item.point = k;
                        qMap[k] = qMap[k] || [];
                        qMap[k].push(item);
                    })
                }
                if (json.children) {
                    for (let i = 0; i < json.children.length; i++) {
                        let tData = json.children[i];
                        tData.parent = json.name;
                        getQuestions(tData, qMap);
                    }
                }
            }
            let fragments = [];
            let tRoot = json;

            tRoot.symbol =
                'image://data:image/png;base64,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';

            tRoot.symbolSize = 70;
            tRoot.label = {
                fontSize: 40,
                distance: 30,
                color: "#2f2a76"
            }
            for (let i = 0; i < tRoot.children.length; i++) {
                let item = tRoot.children[i];
                if (!item.questions || item.questions.length === 0) {
                    item.symbolRotate = -35;
                    item.label = {
                        distance: 5,
                        color: "#2f2a76"
                    };
                    item.symbol =
                        'path://M780.43 157.55c-4.628-6.106-11.954-9.456-19.623-8.974-7.61 0.482-14.482 4.799-18.286 11.417-66.223 115.861-151.982 155.787-227.634 191.001-49.525 23.059-96.297 44.838-131.139 84.339-38.849 44.102-56.965 103.651-56.965 187.252 0 32.033 2.668 67.531 8.005 107.287-99.959 24.025-186.797 10.193-186.797 10.193v91.014c111.489 0 204.009-26.239 271.451-54.581 44.186-16.753 83.175-39.103 117.536-64.774 3.949-2.951 6.077-4.629 6.162-4.713 165.644-127.758 219.147-330.971 219.147-330.971 0 217.181-158.401 405.542-360.591 472.987 62.192 19.794 119.952 28.539 172.203 26.097 58.669-2.782 110.693-19.537 154.624-49.951 93.513-64.605 147.158-189.837 147.158-343.495 0-124.239-35.639-245.412-95.273-324.158l0.023 0.028zM780.403 157.523z'

                }
            }

            let mindmapItem = {
                className: "EchartsItem",
                dsl: {
                    option: {
                        series: {
                            layout: "orthogonal",
                            orient: "LR",
                            symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z",
                            symbolSize: 30,
                            itemStyle: {
                                color: "#398246"
                            },
                            label: {
                                color: "#2f2a76"
                            },
                            lineStyle: {
                                width: 1,
                                color: '#398246'
                            },
                            leaves: {
                                symbolRotate: 0,
                                itemStyle: {
                                    color: "#398246"
                                },
                                lineStyle: {
                                    width: 1,
                                    color: '#398246'
                                },
                                label: {
                                    color: "#2f2a76"
                                },
                                symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"
                            }
                        }
                    },
                    type: "tree",
                    data: [tRoot],
                    promise: {
                        afterRender: function(c, d, t) {
                            t.chart.on("click", function(param) {
                                let content = param.treeAncestors.map(item => {
                                    let value = item.name.replace(
                                        /\[.*?\]/g, "");
                                    return value;
                                });
                                content = content.reverse();
                                content = content.join(".");
                                content = content.replace(/^\./, '');
                                webCpu.mitt.emit("entryText", content);
                            })
                        }
                    }
                },
            };

            item = {
                title: json.name,
                dsl: [mindmapItem],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#F8F9FA"
                }
            });

            let qMap = {};
            getQuestions(tRoot, qMap);
            let qArr = [];
            for (let k in qMap) {
                for (let i = 0; i < qMap[k].length; i++) {
                    qArr.push(qMap[k][i])
                }
            }
            let testApp = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/testApp.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        qMap: qMap,
                        list: qArr
                    }
                }
            }

            item = {
                title: "",
                dsl: [testApp],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#f2f2f2"
                }
            });

            let lightedTree = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/lightedTree.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        content: {
                            dsl: [WebTool.copyObject(mindmapItem)]
                        },
                        list: []
                    }
                }
            }

            item = {
                title: "",
                dsl: [lightedTree],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#fff"
                }
            });

            return fragments;

        },
        "url": 'https://transweb.cn/bucket/personal/1714628260/layout/knowledgeTree.vue',
        "className": 'ElementVueItem',
        "cardName": 'knowledgeTreeCard',
        "dsl": {
            "style": {
                "padding": '0px'
            }
        }
    }, {
        "name": 'knowledgeHistory',
        "appType": 'single',
        "resolution": [1200, 1200],
        "dataShare": true,
        "meta": {
            "label": '初中历史智能出题',
            "description": '智能出题、专业讲解，错题变成新起点，一步步提升成绩。',
            "slogan": '历史备考小帮手：AI 测评与错题诊断系统',
            "slogan1": '覆盖核心考点 · 提升应试技巧 · 全面巩固历史基础',
            "buttonText": '开始出题',
            "confirmTips": 'AI 智能生成，预计 30 秒内完成',
            "scanQrTips": '扫码检测，开启你的自我成长之旅！',
            "inputPlaceholder": '请输入初中历史知识点范围描述'
        },
        "appPrompts": function() {
            return `# 任务目标：
    你是一位专注于初中历史科目出题与错题解析的AI教学助手。你的任务是根据指定的教材内容、知识点或考试大纲，为学生生成测试题，并在学生作答后，对他们答错的题目提供详细的答案解析和讲解。请严格按照以下要求执行：
    
    1. 适用范围与难度
    适用对象：初中学生，涵盖初一至初三各年级的历史内容。
    难度分级：题目难度适中，包含基础题、提高题和综合应用题，确保全面考查学生的历史知识与理解能力。
    
    2. 知识点覆盖
    内容范围：根据指定的教材章节或知识点，如古代文明、近代历史事件、世界大战、重要历史人物、中国历史重要事件与时期等。
    重点突出：特别强调常见考点和易错点，确保试题能够有效检测学生对相关知识的掌握情况。
    
    3. 答案与解析
    标准答案：为每道题目提供正确答案，确保与教材和教学要求一致。
    错题解析：
    错误选项分析：针对选择题，逐一分析错误选项，说明其错误原因和易混淆之处。
    解题思路：详细讲解正确答案的解题步骤和逻辑，帮助学生理解解题方法。
    知识点回顾：在解析中复习相关知识点，强化学生对概念的理解和记忆。
    常见错误：指出学生可能犯的常见错误，并提供避免这些错误的建议。
    
    4. 语言与表达
    清晰简洁：使用简明易懂的语言，确保学生能够轻松理解题目和解析内容。
    逻辑严谨：确保题目设置合理，解析条理清晰，步骤完整。
    示例丰富：在必要时提供具体例子，帮助学生更好地理解复杂概念或难点。
    
    5. 规范与准确性
    内容准确：确保所有题目和解析内容的准确性，不含有误导性信息。
    格式统一：保持题目和答案的格式一致，便于学生阅读和使用。
    时间线与事件：在涉及时间轴或历史事件时，确保时间和事件描述的准确性。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析知识点范围描述的主旨、所包含的知识点列表，以及每个知识点的下一级相关知识点列表，以 JSON 格式呈现。
    - 为最后一级的每个知识点，生成 3 道中低难度的单项选择题，并附上正确选项极其说明。

    #### JSON结构如下：
      - 'name': 表示内容的主旨标题;
      - 'children': 一个数组，列出二级主题，每个主题的字段包括：
         - 'name': 关键要点；
         - 'questions': 一个数组，包含测试题，每道题的字段包括：
            - 'name': 题目的描述
            - 'choices': 一个数组，包含备选项。
            - 'answer': 题目的正确选项编号。
            - 'reason': 正确选项的原因说明
     
      示例输出：
\`\`\`
      {
        "name": "主旨标题",
        "children": [
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          }
        ]
      }
\`\`\`
  ### 答案输出约束
    - 仅输出 JSON 不包含任何额外说明或文字。
    - questions中的问题(问题题干避免使用“哪些”)，只有一个正确答案，且存在于相应的choices中。
    - questions中问题的正确选项编号，从 0 开始（对应choices数组的索引从0开始）。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
		- 键值内部出现任何双引号字符。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
        },
        "dataFormat": 'json',
        "jsonToFragments": function(json) {
            let getQuestions = function(json, qMap) {
                if (json.questions) {
                    json.questions.map(item => {
                        let k = json.parent + "_" + json.name;
                        item.point = k;
                        qMap[k] = qMap[k] || [];
                        qMap[k].push(item);
                    })
                }
                if (json.children) {
                    for (let i = 0; i < json.children.length; i++) {
                        let tData = json.children[i];
                        tData.parent = json.name;
                        getQuestions(tData, qMap);
                    }
                }
            }
            let fragments = [];
            let tRoot = json;

            tRoot.symbol =
                'image://data:image/png;base64,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';

            tRoot.symbolSize = 70;
            tRoot.label = {
                fontSize: 40,
                distance: 30,
                color: "#2f2a76"
            }
            for (let i = 0; i < tRoot.children.length; i++) {
                let item = tRoot.children[i];
                if (!item.questions || item.questions.length === 0) {
                    item.symbolRotate = -35;
                    item.label = {
                        distance: 5,
                        color: "#2f2a76"
                    };
                    item.symbol =
                        'path://M780.43 157.55c-4.628-6.106-11.954-9.456-19.623-8.974-7.61 0.482-14.482 4.799-18.286 11.417-66.223 115.861-151.982 155.787-227.634 191.001-49.525 23.059-96.297 44.838-131.139 84.339-38.849 44.102-56.965 103.651-56.965 187.252 0 32.033 2.668 67.531 8.005 107.287-99.959 24.025-186.797 10.193-186.797 10.193v91.014c111.489 0 204.009-26.239 271.451-54.581 44.186-16.753 83.175-39.103 117.536-64.774 3.949-2.951 6.077-4.629 6.162-4.713 165.644-127.758 219.147-330.971 219.147-330.971 0 217.181-158.401 405.542-360.591 472.987 62.192 19.794 119.952 28.539 172.203 26.097 58.669-2.782 110.693-19.537 154.624-49.951 93.513-64.605 147.158-189.837 147.158-343.495 0-124.239-35.639-245.412-95.273-324.158l0.023 0.028zM780.403 157.523z'

                }
            }

            let mindmapItem = {
                className: "EchartsItem",
                dsl: {
                    option: {
                        series: {
                            layout: "orthogonal",
                            orient: "LR",
                            symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z",
                            symbolSize: 30,
                            itemStyle: {
                                color: "#398246"
                            },
                            label: {
                                color: "#2f2a76"
                            },
                            lineStyle: {
                                width: 1,
                                color: '#398246'
                            },
                            leaves: {
                                symbolRotate: 0,
                                itemStyle: {
                                    color: "#398246"
                                },
                                lineStyle: {
                                    width: 1,
                                    color: '#398246'
                                },
                                label: {
                                    color: "#2f2a76"
                                },
                                symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"
                            }
                        }
                    },
                    type: "tree",
                    data: [tRoot],
                    promise: {
                        afterRender: function(c, d, t) {
                            t.chart.on("click", function(param) {
                                let content = param.treeAncestors.map(item => {
                                    let value = item.name.replace(
                                        /\[.*?\]/g, "");
                                    return value;
                                });
                                content = content.reverse();
                                content = content.join(".");
                                content = content.replace(/^\./, '');
                                webCpu.mitt.emit("entryText", content);
                            })
                        }
                    }
                },
            };

            item = {
                title: json.name,
                dsl: [mindmapItem],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#F8F9FA"
                }
            });

            let qMap = {};
            getQuestions(tRoot, qMap);
            let qArr = [];
            for (let k in qMap) {
                for (let i = 0; i < qMap[k].length; i++) {
                    qArr.push(qMap[k][i])
                }
            }
            let testApp = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/testApp.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        qMap: qMap,
                        list: qArr
                    }
                }
            }

            item = {
                title: "",
                dsl: [testApp],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#f2f2f2"
                }
            });

            let lightedTree = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/lightedTree.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        content: {
                            dsl: [WebTool.copyObject(mindmapItem)]
                        },
                        list: []
                    }
                }
            }

            item = {
                title: "",
                dsl: [lightedTree],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#fff"
                }
            });

            return fragments;

        },
        "url": 'https://transweb.cn/bucket/personal/1714628260/layout/knowledgeTree.vue',
        "className": 'ElementVueItem',
        "cardName": 'knowledgeTreeCard',
        "dsl": {
            "style": {
                "padding": '0px'
            }
        }
    }, {
        "name": 'knowledgeGeography',
        "appType": 'single',
        "resolution": [1200, 1200],
        "dataShare": true,
        "meta": {
            "label": '初中地理智能出题',
            "description": '智能出题、专业讲解，错题变成新起点，一步步提升成绩。',
            "slogan": '地理备考小帮手：AI 测评与错题诊断系统',
            "slogan1": '覆盖核心考点 · 提升应试技巧 · 全面巩固地理基础',
            "buttonText": '开始出题',
            "confirmTips": 'AI 智能生成，预计 30 秒内完成',
            "scanQrTips": '扫码检测，开启你的自我成长之旅！',
            "inputPlaceholder": '请输入初中地理知识点范围描述'
        },
        "appPrompts": function() {
            return `# 任务目标：
    你是一位专注于初中地理科目出题与错题解析的AI教学助手。你的任务是根据指定的教材内容、知识点或考试大纲，为学生生成测试题，并在学生作答后，对他们答错的题目提供详细的答案解析和讲解。请严格按照以下要求执行：
    
    1. 适用范围与难度
    适用对象：初中学生，涵盖初一至初三各年级的地理内容。
    难度分级：题目难度适中，包含基础题、提高题和综合应用题，确保全面考查学生的地理知识与理解能力。
    
    2. 知识点覆盖
    内容范围：根据指定的教材章节或知识点，如自然地理（地形、气候、水文）、人文地理（人口、经济、文化）、区域地理（中国地理、世界地理）、环境与可持续发展等。
    重点突出：特别强调常见考点和易错点，确保试题能够有效检测学生对相关知识的掌握情况。
    
    3. 答案与解析
    标准答案：为每道题目提供正确答案，确保与教材和教学要求一致。
    错题解析：
    错误选项分析：针对选择题，逐一分析错误选项，说明其错误原因和易混淆之处。
    解题思路：详细讲解正确答案的解题步骤和逻辑，帮助学生理解解题方法。
    知识点回顾：在解析中复习相关知识点，强化学生对概念的理解和记忆。
    常见错误：指出学生可能犯的常见错误，并提供避免这些错误的建议。
    
    4. 语言与表达
    清晰简洁：使用简明易懂的语言，确保学生能够轻松理解题目和解析内容。
    逻辑严谨：确保题目设置合理，解析条理清晰，步骤完整。
    示例丰富：在必要时提供具体例子，帮助学生更好地理解复杂概念或难点。
    
    5. 规范与准确性
    内容准确：确保所有题目和解析内容的准确性，不含有误导性信息。
    格式统一：保持题目和答案的格式一致，便于学生阅读和使用。
    地图与图示：在涉及地图题或图示题时，确保地图标注准确、图示清晰。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析知识点范围描述的主旨、所包含的知识点列表，以及每个知识点的下一级相关知识点列表，以 JSON 格式呈现。
    - 为最后一级的每个知识点，生成 3 道中低难度的单项选择题，并附上正确选项极其说明。

    #### JSON结构如下：
      - 'name': 表示内容的主旨标题;
      - 'children': 一个数组，列出二级主题，每个主题的字段包括：
         - 'name': 关键要点；
         - 'questions': 一个数组，包含测试题，每道题的字段包括：
            - 'name': 题目的描述
            - 'choices': 一个数组，包含备选项。
            - 'answer': 题目的正确选项编号。
            - 'reason': 正确选项的原因说明
     
      示例输出：
\`\`\`
      {
        "name": "主旨标题",
        "children": [
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          }
        ]
      }
\`\`\`
  ### 答案输出约束
    - 仅输出 JSON 不包含任何额外说明或文字。
    - questions中的问题(问题题干避免使用“哪些”)，只有一个正确答案，且存在于相应的choices中。
    - questions中问题的正确选项编号，从 0 开始（对应choices数组的索引从0开始）。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
		- 键值内部出现任何双引号字符。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
        },
        "dataFormat": 'json',
        "jsonToFragments": function(json) {
            let getQuestions = function(json, qMap) {
                if (json.questions) {
                    json.questions.map(item => {
                        let k = json.parent + "_" + json.name;
                        item.point = k;
                        qMap[k] = qMap[k] || [];
                        qMap[k].push(item);
                    })
                }
                if (json.children) {
                    for (let i = 0; i < json.children.length; i++) {
                        let tData = json.children[i];
                        tData.parent = json.name;
                        getQuestions(tData, qMap);
                    }
                }
            }
            let fragments = [];
            let tRoot = json;

            tRoot.symbol =
                'image://data:image/png;base64,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';

            tRoot.symbolSize = 70;
            tRoot.label = {
                fontSize: 40,
                distance: 30,
                color: "#2f2a76"
            }
            for (let i = 0; i < tRoot.children.length; i++) {
                let item = tRoot.children[i];
                if (!item.questions || item.questions.length === 0) {
                    item.symbolRotate = -35;
                    item.label = {
                        distance: 5,
                        color: "#2f2a76"
                    };
                    item.symbol =
                        'path://M780.43 157.55c-4.628-6.106-11.954-9.456-19.623-8.974-7.61 0.482-14.482 4.799-18.286 11.417-66.223 115.861-151.982 155.787-227.634 191.001-49.525 23.059-96.297 44.838-131.139 84.339-38.849 44.102-56.965 103.651-56.965 187.252 0 32.033 2.668 67.531 8.005 107.287-99.959 24.025-186.797 10.193-186.797 10.193v91.014c111.489 0 204.009-26.239 271.451-54.581 44.186-16.753 83.175-39.103 117.536-64.774 3.949-2.951 6.077-4.629 6.162-4.713 165.644-127.758 219.147-330.971 219.147-330.971 0 217.181-158.401 405.542-360.591 472.987 62.192 19.794 119.952 28.539 172.203 26.097 58.669-2.782 110.693-19.537 154.624-49.951 93.513-64.605 147.158-189.837 147.158-343.495 0-124.239-35.639-245.412-95.273-324.158l0.023 0.028zM780.403 157.523z'

                }
            }

            let mindmapItem = {
                className: "EchartsItem",
                dsl: {
                    option: {
                        series: {
                            layout: "orthogonal",
                            orient: "LR",
                            symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z",
                            symbolSize: 30,
                            itemStyle: {
                                color: "#398246"
                            },
                            label: {
                                color: "#2f2a76"
                            },
                            lineStyle: {
                                width: 1,
                                color: '#398246'
                            },
                            leaves: {
                                symbolRotate: 0,
                                itemStyle: {
                                    color: "#398246"
                                },
                                lineStyle: {
                                    width: 1,
                                    color: '#398246'
                                },
                                label: {
                                    color: "#2f2a76"
                                },
                                symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"
                            }
                        }
                    },
                    type: "tree",
                    data: [tRoot],
                    promise: {
                        afterRender: function(c, d, t) {
                            t.chart.on("click", function(param) {
                                let content = param.treeAncestors.map(item => {
                                    let value = item.name.replace(
                                        /\[.*?\]/g, "");
                                    return value;
                                });
                                content = content.reverse();
                                content = content.join(".");
                                content = content.replace(/^\./, '');
                                webCpu.mitt.emit("entryText", content);
                            })
                        }
                    }
                },
            };

            item = {
                title: json.name,
                dsl: [mindmapItem],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#F8F9FA"
                }
            });

            let qMap = {};
            getQuestions(tRoot, qMap);
            let qArr = [];
            for (let k in qMap) {
                for (let i = 0; i < qMap[k].length; i++) {
                    qArr.push(qMap[k][i])
                }
            }
            let testApp = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/testApp.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        qMap: qMap,
                        list: qArr
                    }
                }
            }

            item = {
                title: "",
                dsl: [testApp],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#f2f2f2"
                }
            });

            let lightedTree = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/lightedTree.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        content: {
                            dsl: [WebTool.copyObject(mindmapItem)]
                        },
                        list: []
                    }
                }
            }

            item = {
                title: "",
                dsl: [lightedTree],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#fff"
                }
            });

            return fragments;

        },
        "url": 'https://transweb.cn/bucket/personal/1714628260/layout/knowledgeTree.vue',
        "className": 'ElementVueItem',
        "cardName": 'knowledgeTreeCard',
        "dsl": {
            "style": {
                "padding": '0px'
            }
        }
    }, {
        "name": 'knowledgePolitics',
        "appType": 'single',
        "resolution": [1200, 1200],
        "dataShare": true,
        "meta": {
            "label": '初中思想政治智能出题',
            "description": '智能出题、专业讲解，错题变成新起点，一步步提升成绩。',
            "slogan": '思想政治备考小帮手：AI 测评与错题诊断系统',
            "slogan1": '覆盖核心考点 · 提升应试技巧 · 全面巩固思想政治基础',
            "buttonText": '开始出题',
            "confirmTips": 'AI 智能生成，预计 30 秒内完成',
            "scanQrTips": '扫码检测，开启你的自我成长之旅！',
            "inputPlaceholder": '请输入初中思想政治知识点范围描述'
        },
        "appPrompts": function() {
            return `# 任务目标：
    你是一位专注于初中思想政治科目出题与错题解析的AI教学助手。你的任务是根据指定的教材内容、知识点或考试大纲，为学生生成测试题，并在学生作答后，对他们答错的题目提供详细的答案解析和讲解。请严格按照以下要求执行：
    
    1. 适用范围与难度
    适用对象：初中学生，涵盖初一至初三各年级的思想政治内容。
    难度分级：题目难度适中，包含基础题、提高题和综合应用题，确保全面考查学生的思想政治素养与理解能力。
    
    2. 知识点覆盖
    内容范围：根据指定的教材章节或知识点，如公民基本权利与义务、宪法与法律、社会主义核心价值观、历史与现实中的政治现象、社会问题与解决方案等。
    重点突出：特别强调常见考点和易错点，确保试题能够有效检测学生对相关知识的掌握情况。
    
    3. 答案与解析
    标准答案：为每道题目提供正确答案，确保与教材和教学要求一致。
    错题解析：
    错误选项分析：针对选择题，逐一分析错误选项，说明其错误原因和易混淆之处。
    解题思路：详细讲解正确答案的解题步骤和逻辑，帮助学生理解解题方法。
    知识点回顾：在解析中复习相关知识点，强化学生对概念的理解和记忆。
    常见错误：指出学生可能犯的常见错误，并提供避免这些错误的建议。
    
    4. 语言与表达
    清晰简洁：使用简明易懂的语言，确保学生能够轻松理解题目和解析内容。
    逻辑严谨：确保题目设置合理，解析条理清晰，步骤完整。
    示例丰富：在必要时提供具体例子，帮助学生更好地理解复杂概念或难点。
    
    5. 规范与准确性
    内容准确：确保所有题目和解析内容的准确性，不含有误导性信息。
    格式统一：保持题目和答案的格式一致，便于学生阅读和使用。
    政策与法律：在涉及宪法、法律等内容时，确保信息的权威性和准确性。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析知识点范围描述的主旨、所包含的知识点列表，以及每个知识点的下一级相关知识点列表，以 JSON 格式呈现。
    - 为最后一级的每个知识点，生成 3 道中低难度的单项选择题，并附上正确选项极其说明。

    #### JSON结构如下：
      - 'name': 表示内容的主旨标题;
      - 'children': 一个数组，列出二级主题，每个主题的字段包括：
         - 'name': 关键要点；
         - 'questions': 一个数组，包含测试题，每道题的字段包括：
            - 'name': 题目的描述
            - 'choices': 一个数组，包含备选项。
            - 'answer': 题目的正确选项编号。
            - 'reason': 正确选项的原因说明
     
      示例输出：
\`\`\`
      {
        "name": "主旨标题",
        "children": [
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  },
                  {
                  "name": "测试题目描述",
                  "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                  "answer": 正确选项,
                  "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          },
          {
            "name": "二级主题",
            "children": [
              {
                "name": "主题的要点1",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点2",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              },
              {
                "name": "主题的要点3",
                "questions": [{
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  },
                  {
                    "name": "测试题目描述",
                    "choices": ["选项xx", "选项xx", "选项xx",  "选项xx"],
                    "answer": 正确选项,
                    "reason": "正确选项的说明"
                  }
                ]
              }
            ]
          }
        ]
      }
\`\`\`
  ### 答案输出约束
    - 仅输出 JSON 不包含任何额外说明或文字。
    - questions中的问题(问题题干避免使用“哪些”)，只有一个正确答案，且存在于相应的choices中。
    - questions中问题的正确选项编号，从 0 开始（对应choices数组的索引从0开始）。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
		- 键值内部出现任何双引号字符。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
        },
        "dataFormat": 'json',
        "jsonToFragments": function(json) {
            let getQuestions = function(json, qMap) {
                if (json.questions) {
                    json.questions.map(item => {
                        let k = json.parent + "_" + json.name;
                        item.point = k;
                        qMap[k] = qMap[k] || [];
                        qMap[k].push(item);
                    })
                }
                if (json.children) {
                    for (let i = 0; i < json.children.length; i++) {
                        let tData = json.children[i];
                        tData.parent = json.name;
                        getQuestions(tData, qMap);
                    }
                }
            }
            let fragments = [];
            let tRoot = json;

            tRoot.symbol =
                'image://data:image/png;base64,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';

            tRoot.symbolSize = 70;
            tRoot.label = {
                fontSize: 40,
                distance: 30,
                color: "#2f2a76"
            }
            for (let i = 0; i < tRoot.children.length; i++) {
                let item = tRoot.children[i];
                if (!item.questions || item.questions.length === 0) {
                    item.symbolRotate = -35;
                    item.label = {
                        distance: 5,
                        color: "#2f2a76"
                    };
                    item.symbol =
                        'path://M780.43 157.55c-4.628-6.106-11.954-9.456-19.623-8.974-7.61 0.482-14.482 4.799-18.286 11.417-66.223 115.861-151.982 155.787-227.634 191.001-49.525 23.059-96.297 44.838-131.139 84.339-38.849 44.102-56.965 103.651-56.965 187.252 0 32.033 2.668 67.531 8.005 107.287-99.959 24.025-186.797 10.193-186.797 10.193v91.014c111.489 0 204.009-26.239 271.451-54.581 44.186-16.753 83.175-39.103 117.536-64.774 3.949-2.951 6.077-4.629 6.162-4.713 165.644-127.758 219.147-330.971 219.147-330.971 0 217.181-158.401 405.542-360.591 472.987 62.192 19.794 119.952 28.539 172.203 26.097 58.669-2.782 110.693-19.537 154.624-49.951 93.513-64.605 147.158-189.837 147.158-343.495 0-124.239-35.639-245.412-95.273-324.158l0.023 0.028zM780.403 157.523z'

                }
            }

            let mindmapItem = {
                className: "EchartsItem",
                dsl: {
                    option: {
                        series: {
                            layout: "orthogonal",
                            orient: "LR",
                            symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z",
                            symbolSize: 30,
                            itemStyle: {
                                color: "#398246"
                            },
                            label: {
                                color: "#2f2a76"
                            },
                            lineStyle: {
                                width: 1,
                                color: '#398246'
                            },
                            leaves: {
                                symbolRotate: 0,
                                itemStyle: {
                                    color: "#398246"
                                },
                                lineStyle: {
                                    width: 1,
                                    color: '#398246'
                                },
                                label: {
                                    color: "#2f2a76"
                                },
                                symbol: "path://M512 64c-247.039484 0-448 200.960516-448 448S264.960516 960 512 960 960 759.039484 960 512 759.039484 64 512 64zM512 832.352641c-26.496224 0-48.00043-21.504206-48.00043-48.00043 0-26.496224 21.504206-48.00043 48.00043-48.00043s48.00043 21.504206 48.00043 48.00043S538.496224 832.352641 512 832.352641zM600.576482 505.184572c-27.839699 27.808735-56.575622 56.544658-56.575622 82.368284l0 54.112297c0 17.664722-14.336138 32.00086-32.00086 32.00086s-32.00086-14.336138-32.00086-32.00086l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.887273 52.67249-52.639806 52.67249-73.984034 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385C672.00086 433.791157 635.680581 470.080473 600.576482 505.184572z"
                            }
                        }
                    },
                    type: "tree",
                    data: [tRoot],
                    promise: {
                        afterRender: function(c, d, t) {
                            t.chart.on("click", function(param) {
                                let content = param.treeAncestors.map(item => {
                                    let value = item.name.replace(
                                        /\[.*?\]/g, "");
                                    return value;
                                });
                                content = content.reverse();
                                content = content.join(".");
                                content = content.replace(/^\./, '');
                                webCpu.mitt.emit("entryText", content);
                            })
                        }
                    }
                },
            };

            item = {
                title: json.name,
                dsl: [mindmapItem],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#F8F9FA"
                }
            });

            let qMap = {};
            getQuestions(tRoot, qMap);
            let qArr = [];
            for (let k in qMap) {
                for (let i = 0; i < qMap[k].length; i++) {
                    qArr.push(qMap[k][i])
                }
            }
            let testApp = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/testApp.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        qMap: qMap,
                        list: qArr
                    }
                }
            }

            item = {
                title: "",
                dsl: [testApp],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#f2f2f2"
                }
            });

            let lightedTree = {
                url: "https://transweb.cn/bucket/personal/1714628260/layout/lightedTree.vue",
                className: "ElementVueItem",
                dsl: {
                    data: {
                        content: {
                            dsl: [WebTool.copyObject(mindmapItem)]
                        },
                        list: []
                    }
                }
            }

            item = {
                title: "",
                dsl: [lightedTree],
            };

            fragments.push({
                content: item,
                style: {
                    backgroundColor: "#fff"
                }
            });

            return fragments;

        },
        "url": 'https://transweb.cn/bucket/personal/1714628260/layout/knowledgeTree.vue',
        "className": 'ElementVueItem',
        "cardName": 'knowledgeTreeCard',
        "dsl": {
            "style": {
                "padding": '0px'
            }
        }
    }]
})