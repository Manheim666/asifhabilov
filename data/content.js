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
  cv: "/assets/Asif_Habilov_CV.pdf",
  github: "https://github.com/Manheim666",
  linkedin: "https://www.linkedin.com/in/asif-habilov-a6a0a2399/",
  status: "Available remotely or in Baku",
  // Optional free key from https://web3forms.com (sent to this inbox). Empty = FormSubmit delivers to the email above.
  web3formsKey: "c03f8a1a-0b3c-4e07-a114-fd3447ded8b6",
};

export const about = {
  lead: "I work on computer vision and machine learning, using field photos, satellite images and weather data.",
  goal: "Building reliable computer vision systems for environmental monitoring.",
  music: "Founder and rhythm guitarist of Harmony, a rock band.",
  facts: [
    { k: "Major", v: "BSc Computer Science" },
    { k: "University", v: "Baku State University" },
    { k: "GPA", v: "95.25 / 100" },
    { k: "Graduation", v: "July 2027" },
    { k: "Based in", v: "Baku, Azerbaijan" },
    { k: "Languages", v: "Azerbaijani (native), English (C1 · IELTS 8.0)" },
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
      "Counts insect visits to flowers in orchard video. YOLO26 detects flowers and five insect classes, and BoT-SORT tracks them. A visit counts after two seconds on a flower.",
    role: "Team project, main contributor (142 of 179 commits): data pipeline, detection and tracking engine, FastAPI back end.",
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
      "Forecasts fire risk for 16 cities from ERA5 weather and NASA FIRMS fire records. 184 features and 14 models compared. The final CatBoost model is tuned with Optuna, calibrated and explained with SHAP. The dashboard updates daily.",
    role: "Team of five. My part: data ingestion, the fire classifier and its calibration, the shared Python module.",
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
      "Fine-tuned ConvNeXt-Tiny on six classes and compared it with a classical OpenCV baseline. Grad-CAM shows the model looks at the part, not the background.",
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
    fit: "contain",
    summary:
      "Kaggle competition from the Child Mind Institute: predicting a child's severity index from physical, fitness, sleep and screen-time data. Two blended ensembles of LightGBM, XGBoost and CatBoost, with cut-offs tuned for quadratic weighted kappa.",
    role: "Solo project. Wrist-sensor features did not improve validation and were left out.",
    metrics: [
      { value: 0.46, decimals: 2, label: "QWK, nested CV" },
      { value: 2736, decimals: 0, label: "Children" },
      { value: 3, decimals: 0, label: "Boosting models" },
    ],
    stack: ["LightGBM", "XGBoost", "CatBoost", "Polars", "scikit-learn"],
    links: [
      { label: "Code", href: "https://github.com/Manheim666/problematic-internet-use" },
      { label: "Notebook", href: "https://github.com/Manheim666/problematic-internet-use/blob/master/problematic_internet_use.ipynb" },
    ],
  },
  {
    id: "cassava",
    index: "05",
    title: "Cassava disease",
    tagline: "Diagnosing crop disease from farmers' phone photos",
    fit: "contain",
    summary:
      "Kaggle competition: identifying four cassava diseases or a healthy plant from farmers' phone photos in Uganda. An ensemble of ConvNeXt-Small and EfficientNetV2-S, trained with label smoothing for noisy labels.",
    role: "Solo project. Hardest case: bacterial blight versus healthy leaves.",
    metrics: [
      { value: 0.899, decimals: 3, label: "Holdout accuracy" },
      { value: 0.82, decimals: 2, label: "Macro-F1" },
      { value: 5, decimals: 0, label: "Classes" },
    ],
    stack: ["PyTorch", "timm", "ConvNeXt", "EfficientNetV2", "Kaggle GPU"],
    links: [
      { label: "Code", href: "https://github.com/Manheim666/cassava-leaf-disease" },
      { label: "Notebook", href: "https://github.com/Manheim666/cassava-leaf-disease/blob/master/cassava_leaf_disease.ipynb" },
    ],
  },
  {
    id: "wheat",
    index: "06",
    title: "Wheat heads",
    tagline: "Counting wheat heads in field photos from seven research sites",
    fit: "contain",
    summary:
      "Kaggle competition: detecting wheat heads in dense field photos from seven research sites. YOLO26-m trained at 1024 px and scored with the competition metric, implemented from scratch.",
    role: "Solo project. Hardest case: ripe, densely packed wheat from the Arvalis sites.",
    metrics: [
      { value: 0.70, decimals: 2, label: "mAP, IoU 0.50–0.75" },
      { value: 7, decimals: 0, label: "Research sites" },
      { value: 147793, decimals: 0, label: "Labelled heads" },
    ],
    stack: ["PyTorch", "YOLO26", "Ultralytics", "OpenCV", "Kaggle GPU"],
    links: [
      { label: "Code", href: "https://github.com/Manheim666/global-wheat-detection" },
      { label: "Notebook", href: "https://github.com/Manheim666/global-wheat-detection/blob/main/global_wheat_detection.ipynb" },
    ],
  },
  {
    id: "dota",
    index: "07",
    title: "Aerial objects",
    tagline: "Rotated boxes around ships, planes and vehicles in satellite images",
    image: "/assets/img/dota-obb.webp",
    fit: "contain",
    imageAlt: "Two aerial images with rotated boxes: a marina where every moored boat and pier is outlined, and a sports club with tennis courts, a pool and parked cars.",
    summary:
      "Oriented detection of 15 object classes in DOTA-v1 aerial images. YOLO26-m with an oriented-box head, trained from COCO weights for 10 hours on a Kaggle GPU on 1024 px tiles.",
    role: "Solo project. Scored on the official validation split. Weakest classes: bridges and helicopters.",
    metrics: [
      { value: 0.818, decimals: 3, label: "mAP50, oriented boxes" },
      { value: 15, decimals: 0, label: "Object classes" },
      { value: 55653, decimals: 0, label: "Val objects scored" },
    ],
    stack: ["PyTorch", "YOLO26-OBB", "Ultralytics", "OpenCV", "Kaggle GPU"],
    links: [
      { label: "Code", href: "https://github.com/Manheim666/DOTA-Object-Detection" },
      { label: "Notebook", href: "https://github.com/Manheim666/DOTA-Object-Detection/blob/main/dota_oriented_detection.ipynb" },
    ],
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
  groups: [
    { title: "Programming", tools: ["Python", "SQL", "FastAPI"] },
    { title: "Deep learning and vision", tools: ["PyTorch", "YOLO", "OpenCV", "timm", "BoT-SORT"], also: "CNNs and RNNs, transfer learning, object detection and tracking." },
    { title: "Machine learning", tools: ["scikit-learn", "XGBoost", "LightGBM", "CatBoost", "Optuna"], also: "Supervised and unsupervised learning, random forests and ensembles, time-series forecasting." },
    { title: "Data and visualisation", tools: ["pandas", "Polars", "NumPy", "Plotly", "Folium", "Matplotlib"] },
  ],
  learning: ["SHAP", "RAG and LLMs", "TensorFlow"],
};

// Each project's colour in the Work strips and its panel. All clear 4.5:1 with black text.
export const accents = { bee: "#f2c14e", cassava: "#6fd6a0", wheat: "#dccb7a", dota: "#7db8f0", fire: "#f2a65a", screw: "#b9a6f5", cmi: "#5fd0c5" };

// Display order and numbering for projects (computer vision first)
export const projects = ["bee", "cassava", "wheat", "dota", "fire", "screw", "cmi"]
  .map((id) => projectList.find((p) => p.id === id))
  .map((p, i) => ({ ...p, index: String(i + 1).padStart(2, "0") }));

// Timeline in the order time passes: degree start, internship, then the 2026 programmes
export const path = [0, 4, 3, 2, 1].map((i) => pathNewestFirst[i]);

// Site is served from https://manheim666.github.io/asifhabilov/ ; prefix local asset paths
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p) => (p.startsWith("/") ? BASE + p : p);

// Numbers below come straight from each project's results/metrics.json, not typed from memory.
export const evidence = {
  cassava: {
    classes: ["Bacterial blight", "Brown streak", "Green mottle", "Mosaic", "Healthy"],
    matrix: [[155, 20, 5, 8, 30], [23, 356, 13, 15, 31], [6, 10, 391, 52, 18], [8, 13, 36, 2560, 14], [40, 28, 23, 40, 385]],
  },
  cmi: {
    classes: ["None", "Mild", "Moderate", "Severe"],
    matrix: [[1190, 301, 100, 3], [318, 254, 149, 9], [90, 129, 143, 16], [2, 4, 20, 8]],
  },
  wheatSites: [
    ["rres_1", 0.8251], ["inrae_1", 0.8034], ["ethz_1", 0.7577], ["usask_1", 0.6897],
    ["arvalis_3", 0.6889], ["arvalis_1", 0.6187], ["arvalis_2", 0.5017],
  ],
  dota: [
    ["Plane", 0.9824], ["Ship", 0.9736], ["Tennis court", 0.9504], ["Large vehicle", 0.9075], ["Harbor", 0.8902],
    ["Storage tank", 0.8821], ["Baseball diamond", 0.843], ["Small vehicle", 0.8295], ["Basketball court", 0.8196],
    ["Ground track field", 0.7829], ["Roundabout", 0.7758], ["Swimming pool", 0.7185], ["Soccer ball field", 0.6596],
    ["Bridge", 0.6333], ["Helicopter", 0.6223],
  ],
};
