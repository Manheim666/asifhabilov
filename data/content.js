// All page text lives here. Edit this file to update the site; components only lay it out.
// Keep every number tied to a repository or document you can show.

export const person = {
  name: "Asif Habilov",
  first: "Asif",
  last: "Habilov",
  role: "Junior machine learning engineer",
  focus: "Computer vision · forecasting · data pipelines",
  intro:
    "Final-year Computer Science student in Baku. I build ML systems end to end, from raw data to a model people can actually use.",
  location: "Baku, Azerbaijan · UTC+4",
  email: "asif.habilov@gmail.com",
  github: "https://github.com/Manheim666",
  // linkedin: "https://www.linkedin.com/in/YOUR-HANDLE",
  status: "Open to internships and junior roles, remote or Baku",
};

export const about = {
  paragraphs: [
    "I’m a final-year Computer Science student at Baku State University, in the Faculty of Applied Mathematics and Cybernetics. I’m drawn to problems where the data comes from the real world, from cameras, satellites and field sensors, and has to be understood and cleaned before any model can use it.",
    "My main interests are computer vision and applied machine learning, especially for environmental and agricultural problems. I like the careful parts of the work: validating honestly, choosing thresholds that match the real cost of a mistake, and writing down where a model still fails.",
    "Away from the code, I work well in small teams. Two of my main projects were team efforts, and during my bootcamp I often stayed after class to help classmates find bugs in their work. A summer of IT support at a government ministry taught me to explain technical problems simply to non-technical colleagues.",
  ],
  facts: [
    { k: "Major", v: "BSc Computer Science (English-taught)" },
    { k: "University", v: "Baku State University" },
    { k: "GPA", v: "95.25 / 100" },
    { k: "Graduation", v: "July 2027" },
    { k: "Based in", v: "Baku, Azerbaijan · open to remote" },
    { k: "Languages", v: "Azerbaijani (native), English (C1)" },
    { k: "Interests", v: "Computer vision, applied ML, environmental and agricultural data" },
    { k: "Looking for", v: "Internships and junior roles in data science, ML or computer vision" },
  ],
};

export const projects = [
  {
    id: "bee",
    index: "01",
    title: "Bee-A-Hero",
    tagline: "Counting pollinator visits from orchard video",
    image: "/assets/img/bee-flower-landing.webp",
    imageAlt:
      "A honeybee on a purple thistle flower, with a blue tracking box on the bee and a green box on the flower.",
    summary:
      "YOLO26 detectors for flowers and five insect classes, BoT-SORT tracking, and a visit only counts after two seconds on a flower, so each bee is counted once.",
    role: "Team project · main contributor (142 of 179 commits): data pipeline, detection and tracking engine, FastAPI back end.",
    metrics: [
      { value: 0.808, decimals: 3, label: "Flower mAP@0.5" },
      { value: 0.669, decimals: 3, label: "Insect mAP@0.5" },
      { value: 151545, decimals: 0, label: "Labelled images" },
    ],
    stack: ["PyTorch", "YOLO", "BoT-SORT", "OpenCV", "FastAPI", "React"],
    links: [{ label: "Code", href: "https://github.com/Manheim666/Bee-A-Hero" }],
  },
  {
    id: "fire",
    index: "02",
    title: "Wildfire risk",
    tagline: "30-day fire-risk forecasts for 16 Azerbaijani cities",
    image: "/assets/img/wildfire-dashboard.webp",
    imageAlt: "The WildFire dashboard with today's fire risk for Baku, a 30-day outlook and a risk map.",
    summary:
      "ERA5 weather and NASA FIRMS satellite fires, 184 engineered features, 14 models compared. CatBoost tuned with Optuna, calibrated and explained with SHAP. The live dashboard refreshes daily.",
    role: "Team of five · I built the data ingestion, the fire classifier and its calibration, and the shared Python module.",
    metrics: [
      { value: 0.89, decimals: 2, label: "ROC-AUC, 2025 test" },
      { value: 0.8, decimals: 2, label: "Recall on fire days" },
      { value: 16, decimals: 0, label: "Cities covered" },
    ],
    stack: ["pandas", "CatBoost", "Optuna", "SHAP", "Folium", "GitHub Actions"],
    links: [
      { label: "Live dashboard", href: "https://manheim666.github.io/Wildfire/" },
      { label: "Code", href: "https://github.com/Manheim666/Wildfire" },
    ],
  },
  {
    id: "screw",
    index: "03",
    title: "Defect inspection",
    tagline: "Sorting good and defective fasteners",
    image: "/assets/img/screw-gradcam.webp",
    imageAlt: "Six screws, nuts and washers with Grad-CAM heatmaps over each part, all classified correctly.",
    summary:
      "A ConvNeXt-Tiny fine-tuned on six classes, compared against a classical OpenCV baseline. Grad-CAM confirms the model looks at the part, not the background.",
    role: "Solo project.",
    metrics: [
      { value: 0.989, decimals: 3, label: "Test macro-F1" },
      { value: 0.41, decimals: 2, label: "OpenCV baseline" },
      { value: 450, decimals: 0, label: "Held-out images" },
    ],
    stack: ["PyTorch", "timm", "OpenCV", "scikit-learn"],
    links: [{ label: "Code", href: "https://github.com/Manheim666/Screw" }],
  },
];

export const path = [
  {
    when: "2023 – 2027",
    title: "BSc Computer Science, Baku State University",
    text: "English-taught, state-funded place. GPA 95.25/100. Graduating July 2027.",
  },
  {
    when: "Feb – Jul 2026",
    title: "Data + AI Bootcamp, Ironhack",
    text: "Statistics, machine learning, deep learning, MLOps, LLMs and RAG.",
  },
  {
    when: "Feb – Jun 2026",
    title: "AI Engineering Programme, Ministry of Defence Industry",
    text: "Computer vision and autonomous systems. Certificate of Distinction.",
  },
  {
    when: "Feb – May 2026",
    title: "Generative AI, Holberton School Baku",
    text: "LLMs, multimodal models and AI application development.",
  },
  {
    when: "Jun – Aug 2025",
    title: "IT & Data Intern, Ministry of Ecology and Natural Resources",
    text: "Cleaned and validated environmental datasets for ministry reports.",
  },
];

export const skills = {
  core: ["Python", "PyTorch", "YOLO", "OpenCV", "scikit-learn", "CatBoost", "XGBoost", "Optuna", "SHAP", "pandas", "FastAPI", "Docker", "Git", "Linux"],
  learning: ["SQL window functions", "Kubernetes", "TensorFlow"],
};
