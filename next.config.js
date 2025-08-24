module.exports = {
  reactStrictMode: true,
  // Add ESLint build option from the docs. This lets production builds
  // complete even if ESLint reports errors during build.
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["your-image-domain.com"], // Replace with your image domain if needed
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
