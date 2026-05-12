import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { imagePaths } from "./image-paths"
import { translations } from "./translations"

/**
 * Combine class names using clsx and tailwind-merge
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Types pour les projets
export interface Project {
  id: number
  title: string
  tag: string
  image: string
  description: string
}

export type Language = 'fr' | 'en' | 'es'

/**
 * Récupère tous les projets avec leurs traductions et images
 * @param language - Langue des traductions
 * @returns Liste des projets
 */
export function getProjects(language: Language = 'fr'): Project[] {
  const t = translations[language]
  
  return [
    {
      id: 7,
      title: t.work.projectDetails.project7.title,
      tag: t.work.projectDetails.project7.type,
      image: "/images/work/analyse_personnalisee_2025-06.jpg",
      description: t.work.projectDetails.project7.description,
    },
    {
      id: 8,
      title: t.work.projects.vue_24h.title,
      tag: t.work.projects.vue_24h.tag,
      image: imagePaths.work.project8.main,
      description: t.work.projects.vue_24h.description,
    },
    {
      id: 9,
      title: t.work.projects.periode_sur_mesure.title,
      tag: t.work.projects.periode_sur_mesure.tag,
      image: imagePaths.work.project9.main,
      description: t.work.projects.periode_sur_mesure.description,
    },
    {
      id: 10,
      title: t.work.projects.rapport_sur_mesure.title,
      tag: t.work.projects.rapport_sur_mesure.tag,
      image: imagePaths.work.project10.main,
      description: t.work.projects.rapport_sur_mesure.description,
    },
    {
      id: 11,
      title: t.work.projects.synthese_mensuelle.title,
      tag: t.work.projects.synthese_mensuelle.tag,
      image: imagePaths.work.project11.main,
      description: t.work.projects.synthese_mensuelle.description,
    },
    {
      id: 12,
      title: t.work.projects.intervalle_sur_mesure.title,
      tag: t.work.projects.intervalle_sur_mesure.tag,
      image: imagePaths.work.project12.main,
      description: t.work.projects.intervalle_sur_mesure.description,
    },
  ]
}

/**
 * Récupère les 3 premiers projets pour la homepage
 * @param language - Langue des traductions
 * @returns Liste des 3 premiers projets
 */
export function getSelectedProjects(language: Language = 'fr'): Project[] {
  return getProjects(language).slice(0, 3)
}

/**
 * Récupère des projets spécifiques pour la homepage
 * @param language - Langue des traductions
 * @returns Liste des projets homepage
 */
export function getHomepageProjects(language: Language = 'fr'): Project[] {
  const t = translations[language]
  return [
    {
      id: 1,
      title: t.work.homepageProjects.project1.title,
      tag: t.work.homepageProjects.project1.tag,
      image: "/images/work/analyse_sur_mesure_2025-06.jpg",
      description: t.work.homepageProjects.project1.description,
    },
    {
      id: 2,
      title: t.work.homepageProjects.project2.title,
      tag: t.work.homepageProjects.project2.tag,
      image: "/images/work/performance_24h_2025-03-19.png",
      description: t.work.homepageProjects.project2.description,
    },
    {
      id: 3,
      title: t.work.homepageProjects.project3.title,
      tag: t.work.homepageProjects.project3.tag,
      image: "/images/work/repartition_revenus_2025-06.jpg",
      description: t.work.homepageProjects.project3.description,
    },
  ]
}
