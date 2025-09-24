/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Allows production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allows production builds to complete even if there are type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
