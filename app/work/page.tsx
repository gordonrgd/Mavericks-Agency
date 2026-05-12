"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import AnimatedSection from "@/components/animated-section"
import { useLanguage } from "@/contexts/language-context"
import { getProjects } from "@/lib/utils"

export default function WorkPage() {
  const { t } = useLanguage()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Return loading state during SSR to prevent hydration issues
  if (!isMounted) {
    return (
      <div className="pt-16 md:pt-20 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight">{t("work.title")}</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{t("common.loading")}</p>
          </div>
        </div>
      </div>
    )
  }
  
  return <WorkPageContent />
}

function WorkPageContent() {
  const { t, language } = useLanguage()
  const projects = getProjects(language)

  return (
    <div className="pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight">{t("work.title")}</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{t("work.subtitle")}</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <Link href={`/work/${project.id}`} className="group block">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                      {project.tag}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
