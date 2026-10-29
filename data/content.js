// All page text lives here. Edit this file to update the site; components only lay it out.
// Keep every number tied to a repository or document you can show.

export const person = {
  name: "Asif Habilov",
  first: "Asif",
  last: "Habilov",
  role: "Machine learning engineer in training",
  focus: "Computer vision · forecasting · data pipelines",
  intro:
    "Final-year Computer Science student in Baku. I build ML systems end to end, from raw data to a model people can actually use.",
  location: "Baku, Azerbaijan · UTC+4",
  email: "asif.habilov@gmail.com",
  github: "https://github.com/Manheim666",
  // linkedin: "https://www.linkedin.com/in/YOUR-HANDLE",
  status: "Open to internships and junior roles, remote or Baku",
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

export const stats = [
  { value: 95.25, decimals: 2, suffix: "/100", label: "University average after three years" },
  { value: 151545, decimals: 0, suffix: "", label: "Images in the dataset I built for Bee-A-Hero" },
  { value: 0.989, decimals: 3, suffix: "", label: "Macro-F1 on fastener defects" },
  { value: 58, decimals: 0, suffix: "", label: "Ironhack labs and assessments completed" },
];

export const path = [
  {
    when: "2023 – 2027",
    title: "BSc Computer Science, Baku State University",
    text: "English-taught, state-funded. Average 95.25/100. Graduating July 2027.",
  },
  {
    when: "Feb – Jul 2026",
    title: "Data + AI Bootcamp, Ironhack",
    text: "20 weeks: statistics, ML, deep learning, MLOps, LLMs and RAG.",
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
