/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        optimizeCss: true,
        optimizePackageImports: [
            'framer-motion',
            'lottie-react',
            'react-spinners',
            'react-circle'
        ],

    },
    compress: true,
    
};

export default nextConfig;
