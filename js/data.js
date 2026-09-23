/* ============================================================
   数据文件：个人信息 + 项目数据（来源：profile.md）
   新增项目：复制一条记录、修改内容、把 layout 设为
   feature（特写通栏）/ split-left（文字左图右）/
   split-right（图左文字右）/ offset（错位小图）之一即可。
   ============================================================ */

const profile = {
  name: "小明",
  email: "xiaoming@example.com",
  bio: [
    "我是一名软件工程专业在读学生，目前主要关注<strong>AI 辅助开发</strong>与<strong>大语言模型技术</strong>，平时主要使用 Python、Java 和 TypeScript 进行项目开发。",
    "我在持续学习前后端开发、数据可视化和 AI 应用构建，并把它们用进实际项目：从校园二手交易平台「拾光集市」，到基于大语言模型的课程问答助手「课语通」。",
    "欢迎通过页面下方的联系方式与我交流。"
  ],
  skills: [
    { name: "AI 辅助开发", detail: "当前主要关注的技术方向" },
    { name: "大语言模型应用", detail: "有基于大语言模型 API、RAG 与向量检索的项目实践" },
    { name: "Python · Java · TypeScript", detail: "日常项目开发使用的主要编程语言" },
    { name: "HTML/CSS · 数据可视化", detail: "持续学习前后端开发与数据可视化" }
  ],
  links: [
    { label: "GitHub", url: "https://github.com/xiaoming-dev" },
    { label: "个人主页", url: "https://xiaoming.dev" },
    { label: "微信号：xiaoming" },
    { label: "所在地：中国·广州" }
  ]
};

const projects = [
  {
    layout: "feature",
    name: "轻记账",
    category: "微信小程序",
    date: "2025.04",
    stack: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    intro: "面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
    image: "assets/images/project-1.svg",
    alt: "轻记账小程序界面插画"
  },
  {
    layout: "split-right",
    name: "拾光集市",
    category: "Web 应用",
    date: "2025.09",
    stack: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    intro: "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    image: "assets/images/project-2.svg",
    alt: "拾光集市校园二手交易平台界面插画"
  },
  {
    layout: "split-left",
    name: "城市脉搏",
    category: "数据可视化",
    date: "2026.03",
    stack: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    intro: "城市实时交通与天气数据可视化大屏，集中展示交通、天气和城市运行信息。通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。",
    image: "assets/images/project-3.svg",
    alt: "城市脉搏数据可视化大屏插画"
  },
  {
    layout: "offset",
    name: "课语通",
    category: "AI 应用",
    date: "2026.07",
    stack: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    intro: "基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    image: "assets/images/project-4.svg",
    alt: "课语通课程问答助手界面插画"
  }
];
