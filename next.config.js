/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Habilita la exportación estática
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  // Optimización de imágenes para exportación estática
  images: {
    unoptimized: true, // Requerido para output: 'export'
  },
  // Optimización de producción
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
