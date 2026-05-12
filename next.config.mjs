/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration ESLint
  // En production, on vérifie les erreurs pour garantir la qualité du code
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
    // En développement, on peut ignorer pour accélérer les builds
    // En production, les erreurs ESLint bloqueront le build
  },
  
  // Configuration TypeScript
  // En production, on vérifie les erreurs pour garantir la qualité du code
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
    // En développement, on peut ignorer pour accélérer les builds
    // En production, les erreurs TypeScript bloqueront le build
  },
  
  // VPS : images non optimisées par Next (pas de serveur dédié). Mettre false si hébergement type Vercel.
  images: {
    unoptimized: process.env.IMAGE_UNOPTIMIZED !== 'false',
    formats: ['image/webp', 'image/avif'],
  },
  
  // Optimisations de performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Configuration de compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
    ]
  },
}

export default nextConfig
