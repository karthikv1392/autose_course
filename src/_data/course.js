export default {
  code: "TBA",
  credits: "2",
  ltp: "1–0–2",
  intake: "30",
  instructor: "Karthik Vaidhyanathan",
  prerequisite:
    "Design and Analysis of Software Systems (mandatory); Software Engineering or relevant software engineering background (desired).",
  outcomes: [
    {
      code: "CO1",
      text: "Understand the principles of Agentic AI and their application to software engineering workflows."
    },
    {
      code: "CO2",
      text: "Design AI-assisted workflows and agent-centric solutions for software engineering activities."
    },
    {
      code: "CO3",
      text: "Apply open-source models, agentic frameworks, and orchestration strategies to automate software engineering and operations tasks."
    },
    {
      code: "CO4",
      text: "Critically evaluate AI-generated software artifacts for reliability, performance, trustworthiness, and sustainability."
    },
    {
      code: "CO5",
      text: "Deploy and assess AI-assisted software engineering solutions across development and operational workflows."
    }
  ],
  units: [
    {
      number: "01",
      title: "Foundations of Agentic AI",
      summary:
        "AI agents, reasoning and planning, memory, tool use and MCP, AI-native software engineering workflows, open-source models, and frameworks."
    },
    {
      number: "02",
      title: "Agentic Requirements Engineering",
      summary:
        "Specification-driven development: eliciting intent, turning it into clear and testable specifications, and using agents to preserve traceability through implementation."
    },
    {
      number: "03",
      title: "AI-assisted Software Architecture",
      summary:
        "Architecture knowledge management, ADRs, MCP for architecture tasks, views and viewpoints, architecture evaluation, and architecture copilots."
    },
    {
      number: "04",
      title: "Code Generation and Maintenance",
      summary:
        "The anatomy of a coding agent, repository-aware generation, agent efficiency, green-field and brown-field work, refactoring, and legacy systems."
    },
    {
      number: "05",
      title: "Evaluation of AI-assisted SE",
      summary:
        "Artifact evaluation, trustworthiness, sustainability, workflow benchmarks, maintainability, human oversight, governance, and human–automation trade-offs."
    },
    {
      number: "06",
      title: "Agentic Testing and Autonomous CloudOps",
      summary:
        "Test generation, testing generated artifacts, issue resolution agents, deployment pipelines, agentic root-cause analysis, and autonomous CloudOps."
    },
    {
      number: "07",
      title: "Emerging Directions",
      summary:
        "Runtime self-adaptation, adaptive orchestration, AI-native IDEs, self-coding information systems, and future directions in AI-assisted software engineering."
    }
  ],
  tutorials: {
    count: "4",
    text: "Hands-on tutorials using open-source agentic harnesses and copilots, with a graded activity in each session.",
    sessions: [
      { number: "01", title: "Agentic harness anatomy", focus: "Models, tools, memory, orchestration, and MCP." },
      { number: "02", title: "Requirements and traceability", focus: "Turning conversations into inspectable requirements workflows." },
      { number: "03", title: "Repository-aware coding", focus: "Working with code-generation agents in a real repository." },
      { number: "04", title: "Testing and evaluation", focus: "Probing generated artifacts and making evidence visible." }
    ]
  },
  assessment: [
    { item: "Class activities", detail: "4 activities", weight: "20%" },
    { item: "Take-home assignments", detail: "2 assignments", weight: "20%" },
    { item: "Course project and presentations", detail: "Team-based", weight: "60%" }
  ],
  references: [
    {
      author: "Hassan, E. A.",
      year: "2026",
      title: "Agentic Software Engineering",
      note: "Online book",
      url: "https://agenticse-book.github.io/"
    },
    {
      author: "Weyns, D.",
      year: "2020",
      title: "An Introduction to Self-adaptive Systems: A Contemporary Software Engineering Perspective",
      note: "John Wiley & Sons"
    },
    {
      author: "Alammar, J. and Grootendorst, M.",
      year: "2024",
      title: "Hands-on Large Language Models: Language Understanding and Generation",
      note: "O'Reilly Media"
    },
    {
      author: "Taibi, D. et al.",
      year: "2026",
      title: "A Research Agenda on Agents and Software Engineering: Outcomes from the Rio A2SE Seminar",
      note: "arXiv preprint arXiv:2605.11720",
      url: "https://arxiv.org/abs/2605.11720"
    },
    {
      author: "SA4S @ SERC",
      year: "—",
      title: "Software Architecture for Sustainability research group",
      note: "Research group website",
      url: "https://sa4s-serc.github.io/"
    }
  ]
};
