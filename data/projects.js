export const projects = [
  {
    slug: "lifetimeart",
    title: "LifetimeArt",
    kind: "Website, take-home assignment",
    summary: "A landing page for a renovation business, built from a Figma design with GSAP animations.",
    stack: "React, Next.js, Tailwind CSS, GSAP",
    cover: { type: "image", src: "/images/lifetimeart.png", alt: "LifetimeArt landing page", width: 2520, height: 872 },
    hero: { type: "video", src: "/videos/lifetimeart-desktop.mp4", alt: "LifetimeArt on desktop" },
    links: [
      { label: "Open the live site", href: "https://lifetimeart-stefanus.vercel.app/" },
      { label: "Source on GitHub", href: "https://github.com/StefanusTitan/lifetime-art" },
    ],
    sections: [
      {
        heading: "The brief",
        body: [
          "Build a landing page for a home renovation business from a Figma design, as close to the design as possible, with animations that still feel smooth on a phone.",
        ],
      },
      {
        heading: "What I built",
        list: [
          "Matched the Figma design at desktop, tablet and phone sizes",
          "Scroll animations with GSAP, kept light so they don't stutter on phones",
          "A gallery of past jobs and a contact section",
          "Deployed on Vercel",
        ],
      },
    ],
    gallery: [
      { type: "video", src: "/videos/lifetimeart-desktop.mp4", alt: "LifetimeArt on desktop" },
      { type: "video", src: "/videos/lifetimeart-tablet.mp4", alt: "LifetimeArt on tablet" },
      { type: "video", src: "/videos/lifetimeart-mobile.mp4", alt: "LifetimeArt on a phone" },
    ],
  },
  {
    slug: "melanoma-classification",
    title: "Melanoma classification",
    kind: "Research project",
    summary: "Spotting melanoma in skin lesion photos with MobileNetV2 and an SVM.",
    stack: "Python, TensorFlow, scikit-learn",
    cover: { type: "image", src: "/images/melanoma.png", alt: "Melanoma classifier interface", width: 732, height: 763 },
    links: [{ label: "Source on GitHub", href: "https://github.com/StefanusTitan/MobileNetV2-SVM-for-Melanoma-Classification" }],
    sections: [
      {
        heading: "The idea",
        body: [
          "Fine-tuning a whole CNN is slow and easy to overfit on a small medical dataset. So this uses a pretrained MobileNetV2 just to turn each image into features, and trains an SVM on those features instead. It's quicker to train, and each half can be swapped out on its own.",
        ],
      },
      {
        heading: "Method",
        list: [
          "Resize, normalize and augment the dermoscopic images",
          "Take embeddings from MobileNetV2's penultimate layer",
          "Train linear and RBF-kernel SVMs, tuning C and gamma with cross-validation",
          "Pick the model that catches the most melanomas without too many false alarms, since missing one is much worse than a second look",
        ],
      },
      {
        heading: "Results",
        body: [
          "It caught most of the melanoma cases, trained a lot faster than fine-tuning the whole network, and the model is small enough to run on an ordinary machine.",
        ],
      },
    ],
    gallery: [
      { type: "image", src: "/images/project1/ui_3.png", alt: "Classifier interface, upload step", width: 694, height: 1213 },
      { type: "image", src: "/images/project1/ui_4.png", alt: "Classifier interface, result", width: 710, height: 1200 },
      { type: "image", src: "/images/project1/linear_svm_recall.png", alt: "Recall of the linear SVM across C values", width: 2967, height: 1768 },
      { type: "image", src: "/images/project1/rbf_recall_heatmap.png", alt: "Recall heatmap of the RBF SVM across C and gamma", width: 3000, height: 2400 },
    ],
  },
  {
    slug: "todo-app",
    title: "To-do app",
    kind: "Full-stack app",
    summary: "Task lists with accounts, built with a Next.js frontend, an Express API and MariaDB.",
    stack: "Next.js, React, Express, Sequelize, MariaDB",
    cover: { type: "image", src: "/images/todo.jpg", alt: "To-do app screens", width: 1556, height: 1401 },
    links: [{ label: "Source on GitHub", href: "https://github.com/StefanusTitan/todo-app" }],
    sections: [
      {
        heading: "What it does",
        body: [
          "Sign up, then create, edit, complete and delete tasks. Everything is stored per account, so tasks are there when you come back.",
        ],
      },
      {
        heading: "How it's built",
        list: [
          "A Next.js and React frontend talking to an Express REST API",
          "Sequelize models on MariaDB",
          "Authenticated sessions, so each person only sees their own tasks",
        ],
      },
    ],
    gallery: [
      { type: "image", src: "/images/todo/todo-1.png", alt: "Sign in", width: 1008, height: 1073 },
      { type: "image", src: "/images/todo/todo-2.png", alt: "Create an account", width: 884, height: 880 },
      { type: "image", src: "/images/todo/todo-3.png", alt: "Task list", width: 2552, height: 1314 },
      { type: "image", src: "/images/todo/todo-4.png", alt: "About page", width: 2552, height: 1314 },
      { type: "image", src: "/images/todo/todo-5.png", alt: "Profile", width: 2552, height: 1314 },
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
