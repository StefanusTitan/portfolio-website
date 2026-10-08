/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Old URLs from the previous version of the site.
  async redirects() {
    return [
      { source: "/about", destination: "/#background", permanent: true },
      { source: "/certifications", destination: "/#background", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/projects/project1", destination: "/projects/melanoma-classification", permanent: true },
      { source: "/projects/project2", destination: "/projects/todo-app", permanent: true },
      { source: "/projects/project3", destination: "/projects/lifetimeart", permanent: true },
    ];
  },
};
