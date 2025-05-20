import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { UmrahGuide } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentSection } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AdvertisementBanner } from "@/components/ui/advertisement-banner";
import { CheckCircle, BookOpen, Users } from "lucide-react";

export default function UmrahGuidePage() {
  const { t, language } = useLanguage();
  const { data: guides, isLoading, error } = useQuery<UmrahGuide[]>({
    queryKey: ['/api/umrah-guides'],
  });

  return (
    <>
      <Helmet>
        <title>{t("Umrah Guide - Authentic Steps & Rituals", "دليل العمرة - خطوات ومناسك أصيلة")}</title>
        <meta 
          name="description" 
          content={t(
            "Step-by-step comprehensive Umrah guide with authentic references from verified Salafi scholars. Learn all required rituals and practices.",
            "دليل العمرة الشامل خطوة بخطوة مع مراجع أصيلة من علماء السلف المعتمدين. تعلم جميع المناسك والممارسات المطلوبة."
          )}
        />
      </Helmet>

      <div className="bg-[#0A6E43] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("Complete Umrah Guide", "دليل العمرة الكامل")}</h1>
          <p className="max-w-3xl mx-auto text-lg">
            {t(
              "Step-by-step guide to performing Umrah according to the authentic Sunnah with proper references.",
              "دليل خطوة بخطوة لأداء العمرة وفقًا للسنة الأصيلة مع المراجع المناسبة."
            )}
          </p>
        </div>
      </div>

      <AdvertisementBanner location="banner" />

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-48 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-xl">{t("Failed to load Umrah guides", "فشل تحميل أدلة العمرة")}</p>
            <p className="text-gray-500 mt-2">{t("Please try again later", "يرجى المحاولة مرة أخرى لاحقًا")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {guides?.map((guide) => (
              <Card key={guide.id} className="overflow-hidden">
                <CardHeader className="bg-light islamic-pattern dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {guide.order}
                        </div>
                        <CardTitle className="text-2xl">
                          {language === "en" ? guide.title : guide.title_ar}
                        </CardTitle>
                      </div>
                      <CardDescription className="mt-2 text-base">
                        {language === "en" ? guide.description : guide.description_ar}
                      </CardDescription>
                    </div>
                    {guide.is_essential && (
                      <span className="text-xs bg-secondary bg-opacity-20 text-secondary px-2 py-1 rounded">
                        {t("Essential", "أساسي")}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList>
                      <TabsTrigger value="content">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {t("Guide Content", "محتوى الدليل")}
                      </TabsTrigger>
                      <TabsTrigger value="reference">
                        <Users className="h-4 w-4 mr-2" />
                        {t("Reference", "المرجع")}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="mt-4">
                      <div className="space-y-6">
                        {(language === "en" ? guide.content : guide.content_ar).sections.map((section: ContentSection, index: number) => (
                          <div key={index}>
                            <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
                            {index < (language === "en" ? guide.content : guide.content_ar).sections.length - 1 && (
                              <Separator className="mt-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="reference" className="mt-4">
                      <div className="flex items-start">
                        <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5" />
                        <div>
                          <p className="font-medium">{t("Scholarly Reference", "المرجع العلمي")}</p>
                          <p className="text-gray-600 dark:text-gray-300">{guide.reference}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
