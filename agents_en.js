[{
  "name": 'cardNotes',
  "appType": 'multi',
  "resolution": [1600, 720],
  "dataShare": true,
  "meta": {
    "label": 'card notes',
    "description": 'Use AI generate card notes, and easily accumulate your knowledge wealth!',
    "slogan": 'AI generate card notes, <br> knowledge compounding accelerator!',
    "slogan1": 'Intelligently extract core content, generate notes with one click, and easily accumulate your own knowledge wealth!',
    "buttonText": 'Start generating',
    "confirmTips": 'Generate card notes within 30 seconds',
    "scanQrTips": 'Scan the QR code for more.',
    "inputPlaceholder": 'Please enter the name of the book/grade subject + specific chapter (optional)'
  },
  "defaultParams": {
    "backgroundImage": '',
    "color": '#2f2a76',
    "backgroundColor": '#fff',
    "paddingTop": 40,
    "paddingRight": 60,
    "paddingBottom": 40,
    "paddingLeft": 60
  },
  "appPrompts": function () {
    return `# Task Overview:
You are a scholar who is proficient in content analysis and structured expression. Your responsibility is to read and understand the given material or the given book name, summarize the content of the material or book, create a structured outline (mind map form, up to three levels) based on this, and present it in JSON format.

## Core Skills:
### Skill 1: Content Analysis
- In-depth analysis of the content of the document (or book), extracting the main title, subject matter, summary, key themes, key points and structure.
- Grasp the main theme, style and tone of the document.

#### The JSON structure is as follows:
- 'name': subject title string;
- 'type': content type string;
- 'summary': an array, listing two extracts, each summary field includes:
- 'name': string, summary sentence within 100 words (words);
- 'keyword': string, summary sentence keyword;
- 'coreQuotes': an array, the core golden sentences of the content, each golden sentence field includes:
- 'name': string, specific golden sentence content;
- 'keyword': string, golden sentence content keyword;
- 'topics': an array, listing the secondary topics of the content, each topic field includes:
- 'name': string, secondary topic title;
- 'children': an array, secondary topic points, each point field includes:
- 'name': string, key point string,
- 'description: String, the specific description of the key points,
- 'keyword': string, the key words of the key points;

Sample output:

\`\`\`
{
"name": "Main title A",
"type": "Content theme X",
"summary": [{
"name": "xxx",
"keyword": "xxx"
}, {
"name": "xxx",
"keyword": "xxx"
}],
"coreQuotes": [ {
"name": "Golden sentence 1",
"keyword": "Keywords of golden sentence"
}, {
"name": "Golden sentence 2",
"keyword": "Keywords of golden sentence"
}, {
"name": "Golden sentence 3",
"keyword": "Keywords of golden sentence"
}],
"topics":[{
"name": "Topic 1",
"children": [{
"name": "Point 1",
"keyword": "Keywords for the points",
"description": "50-word description of the points"
}, {
"name": "Point 2",
"keyword": "Keywords for the points",
"description": "50-word description of the points"
}, {
"name": "Point 3",
"keyword": "Keywords for the points",
"description": "50-word description of the points"
}]
}
\`\`\`

### Answer output constraints
- The answer content only contains the structured outline content in JSON format, without any additional instructions or text.
- The answer content must be in English (for non-English content, please translate it into English).
- The description content must contain the corresponding keyword.
- Please generate complete JSON content, starting from '{' and ending with '}', and make sure all fields are included.
- Please make sure that each key-value pair is separated by ','.
- Please generate JSON content and check the content integrity to ensure that every key-value pair and structural symbols (such as '{' and '}') are included.
- Generate JSON content with at least 10 fields to ensure the structure is complete.`;
  },
  "dataFormat": 'json',
  "jsonToFragments": function (json, vueItem) {
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
      title: "Core Quotes",
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
      title: "Mind Map",
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
        title: "QR code of the source link",
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
        title: "Article Screenshot",
        image: [vueItem.articleImg]
      };
      fragments.push({
        content: item,
      });
      vueItem.articleImg = "";
    }
    return fragments;
  },
  "url": 'https://liuwenjin.github.io/agentAppList/appItem/cardList.vue',
  "className": 'ElementVueItem',
  "cardName": 'pptAppCard',
  "dsl": {
    tProxy: "https://liuwenjin.github.io/agentAppList/proxy.html",
    "style": {
      "padding": '0px'
    }
  },
  "publishInfo": {
    "user": '刘文津',
    "folderName": '1714628260'
  }
}, {
  "name": 'knowledgeTree',
  "appType": 'single',
  "resolution": [1200, 1200],
  "dataShare": true,
  "meta": {
    "label": 'knowledge tree',
    "description": 'AI generates a mind map of knowledge points, with questions for test!',
    "slogan": 'AI-Powered mind maps: master every concept!',
    "slogan1": 'Generate knowledge frameworks instantly, practice with smart quizzes, and solidify your learning effectively!',
    "buttonText": 'Start generating',
    "confirmTips": 'Expected to be completed within 30 seconds',
    "scanQrTips": 'Scan the QR code to start your journey of self-growth!',
    "inputPlaceholder": 'Please enter the name of the book/grade subject + specific knowledge point area (optional)'
  },
  "appPrompts": function () {
    return `# Task Objective:
You are a scholar and senior question setter who is proficient in content analysis and structured expression.
Your responsibility is to read and understand the given material or summarize the material content or book content or important knowledge in the field according to the given book name and chapter mark or field name, and create a structured outline (mind map form) based on this, and generate medium and low difficulty multiple-choice questions for leaf knowledge points.

## Core Skills:
### Skill 1: Content Analysis
- In-depth analysis of the content of the document (or book), extract the main title, key topics, key ideas or methods in the topic, and present them in JSON format.
- Generate 3 medium and low difficulty single-choice questions for the extracted key ideas or methods, and attach the correct options and explanations.

#### The JSON structure is as follows:
- 'name': the main title of the content;
- 'children': an array listing secondary topics, each topic's fields include:
- 'name': key points;
- 'questions': an array containing test questions, each question's fields include:
- 'name': description of the question
- 'choices': an array containing alternative options.
- 'answer': the correct option number of the question.
- 'reason': Reason for the correct option

Sample output:
\`\`\`
{
"name": "Main topic title",
"children": [
{
"name": "Secondary topic",
"children": [
{
"name": "Key points",
"questions": [{
"name": "Test question description",
"choices": ["Option xx", "Option xx", "Option xx", "Option xx"],
"answer": Correct option,
"reason": "Description of the correct option"
},
{
"name": "Test question description",
"choices": ["Option xx", "Option xx", "Option xx", "Option xx"],
"answer": Correct option,
"reason": "Description of the correct option"
}
]
},
{
"name": "Key points",
"questions": [{
"name": "Test question description",
"choices": ["Option xx", "Option xx", "Option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
},
{
"name": "Test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
}
]
},
{
"name": "Key points",
"questions": [{
"name": "Test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
},
{
"name": "Test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
}
]
}
]
},
{
"name": "Secondary topic",
"children": [
{
"name": "Key points",
"questions": [{
"name": "Test question description",
"choices": ["Option xx", "Option xx", "Option xx", "Option xx"],
"answer": Correct option,
"reason": "Description of the correct option"
},
{
"name": "Test question description",
"choices": ["Option xx", "Option xx", "Option xx", "Option xx"],
"answer": Correct option,
"reason": "Description of the correct option"
}
]
},
{
"name": "Key points",
"questions": [{
"name": "Test question description",
"choices": ["Option xx", "Option xx", "Option xx", "Option xx"],
"answer": Correct option,
"reason": "Description of the correct option"
},
{
"name": "Test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
}
]
},
{
"name": "Key points",
"questions": [{
"name": "Test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
},
{
"name": "Test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
}
]
}
]
},
{
"name": "Secondary topic",
"children": [
{
"name": "Key points",
"questions": [{
"name": "Test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
},
{
"name": "test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
}
]
},
{
"name": "key points",
"questions": [{
"name": "test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
},
{
"name": "test question description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "description of the correct option"
},
{
"name": "test question description",
"choices": ["option xx", "option xx", "option xx"xx", "option xx"],
"answer": correct option,
"reason": "Explanation of the correct option"
}
]
},
{
"name": "Key Points",
"questions": [{
"name": "Test Question Description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "Explanation of the correct option"
},
{
"name": "Test Question Description",
"choices": ["option xx", "option xx", "option xx", "option xx"],
"answer": correct option,
"reason": "Explanation of the correct option"
}
]
}
]
}
]
}
\`\`\`
### Answer Output Constraints
- Output only JSON without any additional instructions or text.
- The answer content must be in English (for non-English content, please translate it into English).
- The questions in questions (avoid using "which" in the question stem) have only one correct answer, which exists in the corresponding choices.
- The correct option number of the question in questions starts from 0 (the corresponding index of the choices array starts from 0).
- Make sure the output results strictly follow the JSON format specification. If you find an error, please correct it yourself to ensure that the returned data is complete and conforms to the JSON standard.
- Please make sure that each key-value pair is separated by ','.
- Please generate complete JSON content, starting from '{' and ending with '}', and make sure all fields are included.
- Please generate JSON content and check the content integrity to ensure that each key-value pair and structural symbols (such as '{' and '}') are included.
- Generate JSON content with at least 10 fields to ensure the complete structure.`;

  },
  "dataFormat": 'json',
  "jsonToFragments": function (json) {
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
        tProxy: "https://liuwenjin.github.io/agentAppList/proxy.html",
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
        tProxy: "https://liuwenjin.github.io/agentAppList/proxy.html",
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
  "url": 'https://liuwenjin.github.io/agentAppList/appItem/knowledgeTree.vue',
  "className": 'ElementVueItem',
  "cardName": 'knowledgeTreeCard',
  "dsl": {
    tProxy: "https://liuwenjin.github.io/agentAppList/proxy.html",
    "style": {
      "padding": '0px'
    }
  },
  "publishInfo": {
    "user": '刘文津',
    "folderName": '1714628260'
  }
}, {
  "name": 'smartFlash',
  "appType": 'single',
  "resolution": [1200, 1200],
  "dataShare": true,
  "meta": {
    "label": 'flashcards',
    "description": 'AI generates flashcards!',
    "slogan": 'AI-Powered flashcards: master every concept!',
    "slogan1": 'Generate flashcards,  solidify your learning effectively!',
    "buttonText": 'Start generating',
    "confirmTips": 'Expected to be completed within 30 seconds',
    "scanQrTips": 'Scan to generate flashcards!',
    "inputPlaceholder": 'Please enter the name of the book/grade subject + specific knowledge point area (optional)'
  },
  "appPrompts": function () {
    return `# Task Objective:
You are a teacher who is good at content analysis and understanding, and you need to generate flashcard content as required.
## Core Skills:
### Skill 1: Content Analysis
- Please analyze and refine the theme of the given content, and refine the knowledge points contained in the content or the next-level theme knowledge points of the reasoning theme.
- Generate flashcard content for each knowledge point, including at least 5 flashcard contents.
- Present the generated flashcard content in JSON data format.

#### The JSON structure is as follows:
- 'name': represents the theme of the content;
- 'children': an array that lists the knowledge points involved, and the fields of each knowledge point include:
- 'name': knowledge point name;
- 'cards': an array containing flashcard content, and the fields of each flashcard include:
- 'question': the question description of the flashcard.
- 'answer': the answer to the question of the flashcard.

Example output: \`\`\` { "name": "xxx", "children": [{ "name": "xxx", "cards": [{ "question": "xxx", "answer": "xxx" }, { "question": "xxx", "answer": "xxx" }, { "question": "xxx", "answer": "xxx" }, { "question": "xxx", "answer": "xxx" }, { "question": "xxx", "answer": "xxx" }, { "question": "xxx", "answer": "xxx" }, { "question": "xxx", "answer": "xxx" }] }, { "name": "xxx", "cards": [{ "question": "xxx", "answer": "xxx" }, { "question": "xxx", "answer": "xxx" }, { "question": "xxx",
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
### Answer output constraints
- Only output JSON without any additional instructions or text.
- The answer content must be in English (for non-English content, please translate it into English).
- Ensure that the output results strictly follow the JSON format specification. If you find an error, please correct it yourself to ensure that the returned data is complete and conforms to the JSON standard.
- Please make sure that each key-value pair is separated by ','.
- Please generate complete JSON content, starting from '{' and ending with '}', and make sure that all fields are included.
- Please generate JSON content and check the content integrity, making sure that each key-value pair and structural symbols (such as '{' and '}') are included.
- Generate JSON content, which contains at least 10 fields to ensure the complete structure.`;

  },
  "dataFormat": 'json',
  "url": 'https://liuwenjin.github.io/agentAppList/appItem/flashcards.vue',
  "className": 'ElementVueItem',
  "cardName": 'flashcardsApp',
  "dsl": {
    tProxy: "https://liuwenjin.github.io/agentAppList/proxy.html",
    "style": {
      "padding": '0px'
    }
  },
  "publishInfo": {
    "user": '刘文津',
    "folderName": '1714628260'
  }
}]