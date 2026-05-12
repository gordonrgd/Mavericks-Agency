"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { imagePaths } from "@/lib/image-paths"

export default function ProjectPage() {
  const params = useParams()
  const { t } = useLanguage()
  const projectId = params.id as string

  return (
    <div className="pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/work"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t("work.projectDetails.backToWork")}
        </Link>

        {/* Gestion dynamique pour les projets */}
        {projectId === "1" ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.homepageProject1.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.homepageProject1.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.homepageProject1.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.homepageProject1.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={imagePaths.work.project1.main}
                alt={t("work.projectDetails.homepageProject1.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject1.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject1.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject1.solution")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject1.results")}</p>
            </div>
          </>
        ) : projectId === "2" ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.homepageProject2.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.homepageProject2.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.homepageProject2.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.homepageProject2.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={imagePaths.work.project2.main}
                alt={t("work.projectDetails.homepageProject2.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject2.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject2.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject2.solution")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject2.results")}</p>
            </div>
          </>
        ) : projectId === "3" ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.homepageProject3.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.homepageProject3.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.homepageProject3.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.homepageProject3.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={imagePaths.work.project3.main}
                alt={t("work.projectDetails.homepageProject3.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject3.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject3.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject3.solution")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.homepageProject3.results")}</p>
            </div>
          </>
        ) : projectId === "7" ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.project7.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.project7.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.project7.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.project7.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={imagePaths.work.project7.main}
                alt={t("work.projectDetails.project7.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.project7.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project7.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project7.solution")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project7.results")}</p>
            </div>
          </>
        ) : projectId === "8" ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.project8.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.project8.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.project8.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.project8.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={imagePaths.work.project8.main}
                alt={t("work.projectDetails.project8.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.project8.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project8.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project8.solution")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project8.results")}</p>
            </div>
          </>
        ) : projectId === "9" ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.project9.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.project9.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.project9.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.project9.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={imagePaths.work.project9.main}
                alt={t("work.projectDetails.project9.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.project9.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project9.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project9.solution")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project9.results")}</p>
            </div>
          </>
        ) : projectId === "10" ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.project10.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.project10.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.project10.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.project10.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={imagePaths.work.project10.main}
                alt={t("work.projectDetails.project10.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.project10.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project10.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project10.solution")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project10.results")}</p>
            </div>
          </>
        ) : projectId === "11" ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.project11.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.project11.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.project11.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.project11.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={imagePaths.work.project11.main}
                alt={t("work.projectDetails.project11.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.project11.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project11.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project11.solution")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project11.results")}</p>
            </div>
          </>
        ) : projectId === "12" ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.project12.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.project12.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.project12.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.project12.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src={imagePaths.work.project12.main}
                alt={t("work.projectDetails.project12.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.project12.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project12.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project12.solution")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project12.results")}</p>
            </div>
          </>
        ) : (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("work.projectDetails.project1.title")}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">{t("work.projectDetails.client")}:</span>{" "}
                  {t("work.projectDetails.project1.client")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.type")}:</span>{" "}
                  {t("work.projectDetails.project1.type")}
                </div>
                <div>
                  <span className="font-semibold">{t("work.projectDetails.year")}:</span>{" "}
                  {t("work.projectDetails.project1.year")}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt={t("work.projectDetails.project1.title")}
                width={800}
                height={600}
                className="w-full rounded-lg"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-600 leading-relaxed">{t("work.projectDetails.project1.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.challenge")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project1.challenge")}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.solution")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project1.solution")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt={`${t("work.projectDetails.project1.title")} - Image 2`}
                width={600}
                height={400}
                className="w-full rounded-lg"
              />
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt={`${t("work.projectDetails.project1.title")} - Image 3`}
                width={600}
                height={400}
                className="w-full rounded-lg"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("work.projectDetails.results")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("work.projectDetails.project1.results")}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
