import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { MasjidGuide } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentSection } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AdvertisementBanner } from "@/components/ui/advertisement-banner";
import { MapPin, BookOpen, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MasjidGuidePage() {
  const { t, language } = useLanguage();
  const { data: guides, isLoading, error } = useQuery<MasjidGuide[]>({
    queryKey: ['/api/masjid-guides'],
  });

  return (
    <>
      <Helmet>
        <title>{t("Masjid e Nabawi Guide - Virtual Tour & Information", "دليل المسجد النبوي - جولة افتراضية ومعلومات")}</title>
        <meta 
          name="description" 
          content={t(
            "Explore the Prophet's Mosque with our detailed virtual guide. Learn about the history, significance, and proper etiquettes for visiting this sacred site.",
            "استكشف المسجد النبوي مع دليلنا الافتراضي المفصل. تعرف على التاريخ والأهمية وآداب الزيارة المناسبة لهذا الموقع المقدس."
          )}
        />
      </Helmet>

      <div className="bg-[#0A6E43] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("Masjid e Nabawi Virtual Tour", "جولة افتراضية في المسجد النبوي")}</h1>
          <p className="max-w-3xl mx-auto text-lg">
            {t(
              "Explore the Prophet's Mosque with our detailed virtual guide. Learn about the history, significance, and proper etiquettes for visiting this sacred site.",
              "استكشف المسجد النبوي مع دليلنا الافتراضي المفصل. تعرف على التاريخ والأهمية وآداب الزيارة المناسبة لهذا الموقع المقدس."
            )}
          </p>
        </div>
      </div>

      <AdvertisementBanner location="banner" />

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-7 w-48 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-xl">{t("Failed to load Masjid guides", "فشل تحميل أدلة المسجد")}</p>
            <p className="text-gray-500 mt-2">{t("Please try again later", "يرجى المحاولة مرة أخرى لاحقًا")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {guides?.map((guide) => (
                <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition">
                  {guide.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={guide.image_url}
                        alt={language === "en" ? guide.title : guide.title_ar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {language === "en" ? guide.title : guide.title_ar}
                    </CardTitle>
                    <CardDescription>
                      {language === "en" ? guide.description : guide.description_ar}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm mb-4">
                      <MapPin className="text-primary mr-2 h-4 w-4" />
                      <span>{language === "en" ? guide.location : guide.location_ar}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-primary bg-opacity-10 text-primary border-none">
                      {guide.category}
                    </Badge>
                    
                    <button 
                      onClick={() => document.getElementById(`guide-${guide.id}`)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-primary font-medium hover:underline"
                    >
                      {t("View details", "عرض التفاصيل")}
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="space-y-8">
              {guides?.map((guide) => (
                <section key={guide.id} id={`guide-${guide.id}`} className="scroll-mt-20">
                  <Card>
                    <CardHeader className="bg-light islamic-pattern dark:bg-gray-800">
                      <CardTitle className="text-2xl">
                        {language === "en" ? guide.title : guide.title_ar}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {language === "en" ? guide.description : guide.description_ar}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Tabs defaultValue="content">
                        <TabsList>
                          <TabsTrigger value="content">
                            <BookOpen className="h-4 w-4 mr-2" />
                            {t("Details", "التفاصيل")}
                          </TabsTrigger>
                          <TabsTrigger value="location">
                            <MapPin className="h-4 w-4 mr-2" />
                            {t("Location", "الموقع")}
                          </TabsTrigger>
                          <TabsTrigger value="reference">
                            <Info className="h-4 w-4 mr-2" />
                            {t("Reference", "المرجع")}
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="content" className="mt-4">
                          <div className="space-y-4">
                            {(language === "en" ? guide.content : guide.content_ar).sections.map((section: ContentSection, index: number) => (
                              <div key={index} className="mb-4">
                                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="location" className="mt-4">
                          <div className="flex items-center mb-4">
                            <MapPin className="text-primary mr-2 h-5 w-5" />
                            <span className="font-medium">{language === "en" ? guide.location : guide.location_ar}</span>
                          </div>
                          <Badge>{guide.category}</Badge>
                        </TabsContent>
                        <TabsContent value="reference" className="mt-4">
                          <p className="font-medium">{t("Reference", "المرجع")}:</p>
                          <p className="text-gray-600 dark:text-gray-300">{guide.reference}</p>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </section>
              ))}
            </div>

            <div className="mt-10 bg-light rounded-lg p-6 dark:bg-gray-800">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t("Etiquettes of Visiting Masjid e Nabawi", "آداب زيارة المسجد النبوي")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(
                      "Learn the proper Islamic etiquettes when visiting the Prophet's Mosque, including the correct manner to greet the Prophet ﷺ and his companions.",
                      "تعرف على آداب الإسلام الصحيحة عند زيارة المسجد النبوي، بما في ذلك الطريقة الصحيحة للسلام على النبي ﷺ وأصحابه."
                    )}
                  </p>
                  <div className="mt-4 flex items-center">
                    <svg className="text-primary opacity-50 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span className="text-sm italic">
                      {t("Based on authentic teachings from Saudi scholars", "بناءً على تعاليم أصيلة من علماء سعوديين")}
                    </span>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <a href="#" className="bg-primary hover:bg-[#0A6E43] text-white px-6 py-3 rounded-md font-medium transition flex items-center">
                    <span>{t("Read Full Guide", "قراءة الدليل الكامل")}</span>
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
