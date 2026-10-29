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
    "Outside of tech, I make music. I founded Harmony, a rock band, and play rhythm guitar in it.",
  ],
  facts: [
    { k: "Major", v: "BSc Computer Science" },
    { k: "University", v: "Baku State University" },
    { k: "GPA", v: "95.25 / 100" },
    { k: "Graduation", v: "July 2027" },
    { k: "Based in", v: "Baku, Azerbaijan" },
    { k: "Languages", v: "Azerbaijani (native), English (C1)" },
    { k: "Interests", v: "Computer vision, applied ML, environmental and agricultural data" },
    { k: "Open to", v: "Internships and junior roles, remote or Baku" },
  ],
};

const projectList = [
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
  {
    id: "cmi",
    index: "04",
    title: "Internet-use risk",
    tagline: "Screening children for problematic internet use",
    image: "/assets/img/cmi-results.webp",
    fit: "contain",
    imageAlt: "Confusion matrix of predicted versus true severity, next to a bar chart of the most important features: internet hours by age, age and sleep disturbance score.",
    summary:
      "Kaggle Child Mind Institute competition. Predicts a child's severity index from physical, fitness, sleep and screen-time data, so screening doesn't depend on a long clinical questionnaire. A LightGBM, XGBoost and CatBoost ensemble with cut-offs tuned for quadratic weighted kappa.",
    role: "Solo project. Wrist-sensor summaries were tested and did not improve validation, so the simpler model was kept.",
    metrics: [
      { value: 0.452, decimals: 3, label: "QWK, nested CV" },
      { value: 2736, decimals: 0, label: "Children" },
      { value: 3, decimals: 0, label: "Boosting models" },
    ],
    stack: ["LightGBM", "XGBoost", "CatBoost", "Polars", "scikit-learn"],
    links: [{ label: "Code", href: "https://github.com/Manheim666/problematic-internet-use" }],
  },
  {
    id: "cassava",
    index: "05",
    title: "Cassava disease",
    tagline: "Diagnosing crop disease from farmers' phone photos",
    image: "/assets/img/cassava-results.webp",
    fit: "contain",
    imageAlt: "Ten cassava leaf photos, two per class, each correctly classified, next to a confusion matrix of the five classes.",
    summary:
      "Kaggle Cassava Leaf Disease competition. Identifies four cassava diseases, or a healthy plant, from ordinary phone photos taken by farmers in Uganda. ConvNeXt-Small fine-tuned at 384 px with label smoothing for noisy labels, trained on a Kaggle GPU.",
    role: "Solo project. The hardest case is bacterial blight versus healthy leaves; the README shows where the model fails.",
    metrics: [
      { value: 0.896, decimals: 3, label: "Holdout accuracy" },
      { value: 0.81, decimals: 2, label: "Macro-F1" },
      { value: 5, decimals: 0, label: "Classes" },
    ],
    stack: ["PyTorch", "timm", "ConvNeXt", "Kaggle GPU"],
    links: [{ label: "Code", href: "https://github.com/Manheim666/cassava-leaf-disease" }],
  },
];

const pathNewestFirst = [
  {
    when: "2023 – 2027",
    title: "BSc Computer Science, Baku State University",
    text: "State-funded place. GPA 95.25/100. Graduating July 2027.",
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
  // Short names for the scrolling band under the About section
  marquee: ["Python", "SQL", "PyTorch", "Computer vision", "Gradient boosting", "OpenCV", "YOLO", "scikit-learn", "Forecasting", "Deep learning"],
  groups: [
    { title: "Programming", items: ["Python", "SQL"] },
    { title: "Machine learning", items: ["Supervised and unsupervised learning", "Gradient boosting models (XGBoost, LightGBM, CatBoost)", "Random forests and ensembles", "Time-series forecasting", "Hyperparameter tuning with Optuna"] },
    { title: "Deep learning and vision", items: ["PyTorch", "CNNs and RNNs", "Object detection and tracking (YOLO, BoT-SORT)", "OpenCV image processing", "Transfer learning"] },
    { title: "Data and visualisation", items: ["pandas and NumPy", "scikit-learn", "Plotly and Folium", "Matplotlib"] },
  ],
  learning: ["SHAP and explainable AI", "RAG and LLM applications", "TensorFlow"],
};

// Display order and numbering for projects (computer vision first)
export const projects = ["bee", "cassava", "fire", "screw", "cmi"]
  .map((id) => projectList.find((p) => p.id === id))
  .map((p, i) => ({ ...p, index: String(i + 1).padStart(2, "0") }));

// Timeline in the order time passes: degree start, internship, then the 2026 programmes
export const path = [0, 4, 3, 2, 1].map((i) => pathNewestFirst[i]);

// Site is served from https://manheim666.github.io/asifhabilov/ ; prefix local asset paths
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p) => (p.startsWith("/") ? BASE + p : p);
