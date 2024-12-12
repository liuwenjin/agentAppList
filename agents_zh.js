[{
  name: "cardNotes",
  appType: "multi",
  resolution: [1600, 720],
  dataShare: true,
  meta: {
    label: "卡片笔记",
    description: "用 AI 提炼重点，生成卡片笔记，轻松积累你的知识财富！",
    slogan: "AI 生成卡片笔记，知识复利加速器!",
    slogan1: "智能提炼核心内容，一键生成笔记，轻松积累属于你的知识财富！",
    buttonText: "开始生成卡片笔记",
    confirmTips: "AI 智能生成，预计 30 秒内完成",
    scanQrTips: "查看更多内容，请扫描二维码。",
    inputPlaceholder: "请输入书籍/年级科目名称 + 具体章节(可选)",
  },
  defaultParams: {
    backgroundImage: "",
    color: "#2f2a76",
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingRight: 60,
    paddingBottom: 40,
    paddingLeft: 60,
  },
  appPrompts: function () {
    return `# 任务概述：
    你是一位精通内容分析与结构化表达的学者。你的职责是阅读并理解给定材料或者按给定书籍名称，总结材料内容或书籍内容，基于此创建一个结构化的大纲（思维导图形式，最多三个层级），并使用 JSON 格式呈现。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析文档（或书籍）内容，提炼主旨标题、题材、摘要、关键主题、要点和结构。
    - 把握文档的主旨、风格和语调。

    #### JSON结构如下：
      - 'name': 主旨标题字符串;
      - 'type': 内容的题材类型字符串;
      - 'summary': 一个数组，列出提炼的两段摘要，每个摘要的字段包括：
          - 'name': 字符串，100字(词)以内的摘要句；
          - 'keyword': 字符串，摘要句的关键词；
      - 'coreQuotes': 一个数组, 内容的核心金句，每个金句的字段包括：
          - 'name': 字符串, 具体金句内容；
          - 'keyword': 字符串, 金句内容的关键词；
      - 'topics': 一个数组，列出内容的二级主题，每个主题的字段包括：
          - 'name': 字符串，二级主题的标题；
          - 'children': 一个数组，二级主题的要点，每个要点的字段包括：
              - 'name': 字符串，要点字符串，
              - 'description: 字符串，要点的具体描述内容，
              - 'keyword': 字符串, 要点内容的关键词；
           

    示例输出：

      \`\`\`
      {
        "name": "主旨标题A",
        "type": "内容题材类X",
        "summary": [{
            "name": "xxx",
            "keyword": "xxx"
          }, {
            "name": "xxx",
            "keyword": "xxx"
          }],
        "coreQuotes": [ {
            "name": "金句一",
            "keyword": "金句的关键词"
          }, {
            "name": "金句二",
            "keyword": "金句的关键词"
          }, {
            "name": "金句三",
            "keyword": "金句的关键词"
          }],
        "topics":[{
            "name": "主题一",
            "children": [{
              "name": "要点一",
              "keyword": "要点的关键词",
              "description": "要点的50字(词)描述"
            }, {
              "name": "要点二",
              "keyword": "要点的关键词",
              "description": "要点的50字(词)描述"
            }, {
              "name": "要点三",
              "keyword": "要点的关键词",
              "description": "要点的50字(词)描述"
            }]
      }
      \`\`\`

  ### 答案输出约束
    - 回答内容只包含 JSON 格式的结构化大纲内容，不包含任何额外说明或文字。
    - 回答内容需要是中文(对非中文内容，请翻译成中文)。
    - description 内容必须包含相应的 keyword。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请确保每一个键值对之间都有','分开。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
  },
  dataFormat: "json",
  jsonToFragments: function (json, vueItem) {
    let fragments = [];
    let keywords = [];
    let item = {
      title: json.name,
      list: json.summary.map((d) => {
        keywords.push(d.keyword);
        return {
          type: "text",
          content: d.name
        };
      }),
      keywords: []
    };
    item.keywords = JSON.parse(JSON.stringify(keywords));
    // 标题和摘要
    fragments.push({
      content: item,
    });

    json.coreQuotes = json.coreQuotes || [];
    keywords = [];
    item = {
      title: "核心金句",
      list: json.coreQuotes.map((d) => {
        keywords.push(d.keyword);
        return {
          type: "text",
          content: d.name,
        };
      }),
      keywords: []
    };
    item.keywords = JSON.parse(JSON.stringify(keywords));
    // 核心金句
    fragments.push({
      content: item,
    });

    let tRoot = {
      children: json.topics || []
    };
    tRoot.name = json.name;

    let mindmapItem = {
      className: "EchartsItem",
      dsl: {
        type: "tree",
        data: [tRoot],
      },
    };

    item = {
      title: "思维导图",
      dsl: [mindmapItem],
    };

    // 思维导图
    fragments.push({
      content: item,
    });

    let arr = json.topics;

    for (let i = 0; i < arr.length; i++) {
      let temp = arr[i];
      temp.children = temp.children || [];
      keywords = [];
      item = {
        title: temp.name,
        list: temp.children.map((d) => {
          let desc = d.description.replace(/\n/g, ";");
          d.name = d.name.replace(/。|\.$/, '');
          keywords.push(d.keyword);
          return {
            type: "text",
            content: `<strong>${d.name}</strong>: ${desc}`,
            key: d.name,
            value: desc,
            keyword: d.keyword
          };
        }),
      };
      item.keywords = JSON.parse(JSON.stringify(keywords));
      // 核心主题
      fragments.push({
        content: item,
      });
    }
    // 二维码
    if (vueItem.contentUrl) {
      let resolution = vueItem.currentApp.resolution || vueItem.resolution;
      let size = Math.min(resolution[0] - 80, resolution[1] - 220);
      item = {
        title: "内容源链接的二维码",
        dsl: [{
          url: "/plugins/elementVueItem/pageCard.vue",
          className: "ElementVueItem",
          dsl: {
            data: {
              cardStyle: {
                backgroundColor: "transparent",
                textAlign: "center",
              },
              info: {
                source: vueItem.contentUrl,
              },
              optionMap: {
                source: {
                  style: {
                    width: size + "px",
                    height: size + "px",
                    border: "solid 20px #fff",
                    borderRadius: "10px",
                    display: "inline-block",
                  },
                },
              },
              config: [{
                prop: "source",
                type: "qrCode",
              }, ],
            },
            promise: {
              beforeRender: function (c, d, t) {
                let mySize = 300;
                t.data.optionMap.source.width = mySize + "px";
                t.data.optionMap.source.height = mySize + "px";
              },
            },
          },
        }, ],
      };

      // 二维码
      fragments.push({
        content: item,
      });
      vueItem.contentUrl = "";
    }

    // article img
    if (vueItem.articleImg) {
      item = {
        title: "文章截图",
        image: [vueItem.articleImg]
      };
      fragments.push({
        content: item,
      });
      vueItem.articleImg = "";
    }
    return fragments;
  },
  url: "https://liuwenjin.github.io/agentAppList/appItem/cardList.vue",
  className: "ElementVueItem",
  cardName: "pptAppCard",
  dsl: {
    proxy: false,
    style: {
      padding: "0px"
    },
  },
}, {
  name: "knowledgeTree",
  appType: "single",
  resolution: [1200, 1200],
  dataShare: true,
  meta: {
    label: "知识树",
    description: "用 AI 画思维导图，还能智能出题，帮你牢牢记住每个知识点！",
    slogan: "AI 智绘思维导图，帮你学懂每个知识点！",
    slogan1: "自动生成知识框架，智能出题强化记忆，让学习更高效、更扎实！",
    buttonText: "开始生成知识树",
    confirmTips: "AI 智能生成，预计 30 秒内完成",
    scanQrTips: "扫码检测，开启你的自我成长之旅！",
    inputPlaceholder: "请输入书籍/年级科目名称 + 具体知识点范围描述(可选)",
  },
  appPrompts: function () {
    return `# 任务目标：
    你是一位精通内容分析与结构化表达的学者兼资深出题老师。
    你的职责是阅读并理解给定材料或者按给定书籍名称及章节标示或领域名称，按照提示要求，总结材料内容或书籍内容或领域重要知识，基于此创建一个结构化的大纲（思维导图形式）， 并为叶子知识点生成中低难度的选择题。

    ## 核心技能：
    ### 技能 1：内容解析
    - 深入分析文档（或书籍）内容，提炼主旨标题、关键主题、主题中的关键观点或方法，以 JSON 格式呈现。
    - 为提炼的关键观点或方法，生成 3 道中低难度的单项选择题，并附上正确选项极其说明。

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
    - 仅输出 JSON  不包含任何额外说明或文字。
    - 回答内容需要是中文(对非中文内容，请翻译成中文)。
    - questions中的问题(问题题干避免使用“哪些”)，只有一个正确答案，且存在于相应的choices中。
    - questions中问题的正确选项编号，从 0 开始（对应choices数组的索引从0开始）。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
  },
  dataFormat: "json",
  jsonToFragments: function (json) {
    let getQuestions = function (json, qMap) {
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

    tRoot.symbol = 'image://data:image/png;base64,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';

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
        item.symbol = 'path://M780.43 157.55c-4.628-6.106-11.954-9.456-19.623-8.974-7.61 0.482-14.482 4.799-18.286 11.417-66.223 115.861-151.982 155.787-227.634 191.001-49.525 23.059-96.297 44.838-131.139 84.339-38.849 44.102-56.965 103.651-56.965 187.252 0 32.033 2.668 67.531 8.005 107.287-99.959 24.025-186.797 10.193-186.797 10.193v91.014c111.489 0 204.009-26.239 271.451-54.581 44.186-16.753 83.175-39.103 117.536-64.774 3.949-2.951 6.077-4.629 6.162-4.713 165.644-127.758 219.147-330.971 219.147-330.971 0 217.181-158.401 405.542-360.591 472.987 62.192 19.794 119.952 28.539 172.203 26.097 58.669-2.782 110.693-19.537 154.624-49.951 93.513-64.605 147.158-189.837 147.158-343.495 0-124.239-35.639-245.412-95.273-324.158l0.023 0.028zM780.403 157.523z'

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
      url: "https://liuwenjin.github.io/agentAppList/appItem/testApp.vue",
      className: "ElementVueItem",
      dsl: {
        proxy: false,
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
      url: "https://liuwenjin.github.io/agentAppList/appItem/lightedTree.vue",
      className: "ElementVueItem",
      dsl: {
        proxy: false,
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
  url: "https://liuwenjin.github.io/agentAppList/appItem/knowledgeTree.vue",
  className: "ElementVueItem",
  cardName: "knowledgeTreeCard",
  dsl: {
    proxy: false,
    style: {
      padding: "0px"
    },
  },
}, {
  name: "smartFlash",
  appType: "single",
  resolution: [1200, 1200],
  dataShare: true,
  meta: {
    label: "抽认卡",
    description: "用 AI 生成抽认卡！",
    slogan: "AI 生成抽认卡，帮你学懂每个知识点！",
    slogan1: "自动生成抽认卡，让学习更高效、更扎实！",
    buttonText: "开始生成抽认卡",
    confirmTips: "AI 智能生成，预计 30 秒内完成",
    scanQrTips: "扫一扫，查看和使用所有卡片！",
    inputPlaceholder: "请输入书籍/年级科目名称 + 具体知识点范围描述(可选)",
  },
  appPrompts: function () {
    return `# 任务目标：
    你是一名擅长内容分析理解的老师，需要按要求生成抽认卡内容。
    ## 核心技能：
    ### 技能 1：内容解析
    - 请分析提炼给定内容的主题，并提炼内容包含的知识要点或推理主题的下一级主题知识要点。
    - 为每个知识要点生成抽认卡内容，至少包含5张抽认卡内容。
    - 以 JSON 数据格式呈现所生成的抽认卡内容。

    #### JSON结构如下：
      - 'name': 表示内容的主题;
      - 'children': 一个数组，列出所涉及的知识点，每个知识点的字段包括：
         - 'name': 知识点名称；
         - 'cards': 一个数组，包含抽认卡内容，每张抽认卡的字段包括：
            - 'question': 抽认卡的问题描述。
            - 'answer': 抽认卡的问题答案。
     
    示例输出：
\`\`\`
  { 
    "name": "xxx",
    "children": [{
      "name": "xxx",
      "cards": [{
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }]
    }, {
      "name": "xxx",
      "cards": [{
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }]
    }, {
      "name": "xxx",
      "cards": [{
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }, {
        "question": "xxx",
        "answer": "xxx"
      }]
    }]
  }  
\`\`\`
  ### 答案输出约束
    - 仅输出 JSON  不包含任何额外说明或文字。
    - 回答内容需要是中文(对非中文内容，请翻译成中文)。
    - 确保输出结果，严格遵循JSON格式规范。如果发现错误，请自行修正，确保返回的数据完整且符合 JSON 标准。
    - 请确保每一个键值对之间都有','分开。
    - 请生成完整的 JSON 内容，从 '{' 开始到 '}' 结束，并确保包含所有字段。
    - 请生成 JSON 内容并检查内容完整性，确保每一个键值对和结构符号（如 '{' 和 '}'）都包括在内。
    - 生成 JSON 内容，其中至少包含 10 个字段，以保证结构完整。
`;
  },
  dataFormat: "json",
  url: 'https://liuwenjin.github.io/agentAppList/appItem/flashcards.vue',
  className: "ElementVueItem",
  cardName: "flashcardsApp",
  dsl: {
    proxy: false,
    style: {
      padding: "0px"
    },
  },
}]