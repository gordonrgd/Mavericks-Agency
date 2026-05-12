// Centralisation des chemins d'images pour faciliter la maintenance
export const imagePaths = {
  // Logo
  logo: {
    main: "/images/logo/mavericks-logo.png",
    white: "/images/logo/mavericks-logo-white.png",
    dark: "/images/logo/mavericks-logo-dark.png",
    favicon: "/images/logo/favicon.ico",
  },

  // Images de la page d'accueil
  home: {
    hero: "/images/home/hero-background.jpg",
    testimonial: "/images/home/testimonial-sarah.jpg",
    approach: {
      strategy: "/images/home/strategy-icon.svg",
      content: "/images/home/content-icon.svg",
      growth: "/images/home/growth-icon.svg",
    },
  },

  // Portfolio/Travaux
  work: {
    project1: {
      main: "/images/work/analyse_sur_mesure_2025-06.jpg",
      gallery: ["/images/work/analyse_sur_mesure_2025-06.jpg"],
    },
    project2: {
      main: "/images/work/performance_24h_2025-03-19.png",
      gallery: ["/images/work/performance_24h_2025-03-19.png"],
    },
    project3: {
      main: "/images/work/repartition_revenus_2025-06.jpg",
      gallery: ["/images/work/repartition_revenus_2025-06.jpg"],
    },
    project7: {
      main: "/images/work/analyse_sur_mesure_2025-06.jpg",
      gallery: ["/images/work/analyse_sur_mesure_2025-06.jpg"],
    },
    project8: {
      main: "/images/work/vue_24h_2025-03-19.png",
      gallery: ["/images/work/vue_24h_2025-03-19.png"],
    },
    project9: {
      main: "/images/work/periode_sur_mesure_2025-02.png",
      gallery: ["/images/work/periode_sur_mesure_2025-02.png"],
    },
    project10: {
      main: "/images/work/rapport_sur_mesure_2025-06.png",
      gallery: ["/images/work/rapport_sur_mesure_2025-06.png"],
    },
    project11: {
      main: "/images/work/synthese_mensuelle_2025-07.png",
      gallery: ["/images/work/synthese_mensuelle_2025-07.png"],
    },
    project12: {
      main: "/images/work/intervalle_sur_mesure_2025-04.png",
      gallery: ["/images/work/intervalle_sur_mesure_2025-04.png"],
    },
    // Ajoutez d'autres projets selon vos besoins
  },

  // Témoignages et clients
  testimonials: {
    sarah: "/images/testimonials/samantra-profile.webp",
    client2: "/images/testimonials/client-2-profile.jpg",
    client3: "/images/testimonials/client-3-profile.jpg",
  },

  // Logos de clients (anonymisés)
  clients: {
    creator1: "/images/clients/creator-1-logo.png",
    creator2: "/images/clients/creator-2-logo.png",
    creator3: "/images/clients/creator-3-logo.png",
    creator4: "/images/clients/creator-4-logo.png",
    creator5: "/images/clients/creator-5-logo.png",
  },

  // Images pour les réseaux sociaux
  social: {
    ogImage: "/images/social/og-image.jpg",
    twitterCard: "/images/social/twitter-card.jpg",
  },

  // Icônes et illustrations
  icons: {
    target: "/images/icons/target.svg",
    lightbulb: "/images/icons/lightbulb.svg",
    trendingUp: "/images/icons/trending-up.svg",
    heart: "/images/icons/heart.svg",
    eye: "/images/icons/eye.svg",
  },

  // Images de fond et textures
  backgrounds: {
    hero: "/images/backgrounds/hero-gradient.jpg",
    section: "/images/backgrounds/section-pattern.svg",
    testimonial: "/images/backgrounds/testimonial-bg.jpg",
  },
}

// Type pour TypeScript
export type ImagePath = typeof imagePaths
