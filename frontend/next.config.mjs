/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com'], // Permitir imágenes desde Google Cloud Storage
    },
    reactStrictMode: true, // Habilitar el modo estricto de React
};

export default nextConfig;