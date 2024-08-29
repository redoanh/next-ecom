/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = {
//      webpack: (config) => {
//        config.resolve.alias.canvas = false;

//        return config;
//      },
//     }

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
