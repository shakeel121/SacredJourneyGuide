import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { HajjGuide } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentSection } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AdvertisementBanner } from "@/components/ui/advertisement-banner";
import { CheckCircle, BookOpen, Users } from "lucide-react";

export default function HajjGuidePage() {
  const { t, language } = useLanguage();
  const { data: guides, isLoading, error } = useQuery<HajjGuide[]>({
    queryKey: ['/api/hajj-guides'],
  });

  return (
    <>
      <Helmet>
        <title>{t("Hajj Guide - Authentic Steps & Rituals", "دليل الحج - خطوات ومناسك أصيلة")}</title>
        <meta 
          name="description" 
          content={t(
            "Learn the complete Hajj rituals following the authentic Sunnah with step-by-step guidance from Saudi Salafi scholars.",
            "تعلم مناسك الحج الكاملة باتباع السنة الأصيلة مع التوجيه خطوة بخطوة من علماء السلف السعوديين."
          )}
        />
      </Helmet>

      <div className="bg-[#0A6E43] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("Virtual Hajj Guide", "دليل الحج الافتراضي")}</h1>
          <p className="max-w-3xl mx-auto text-lg">
            {t(
              "Learn the complete Hajj rituals following the authentic Sunnah with step-by-step guidance from Saudi Salafi scholars.",
              "تعلم مناسك الحج الكاملة باتباع السنة الأصيلة مع التوجيه خطوة بخطوة من علماء السلف السعوديين."
            )}
          </p>
        </div>
      </div>

      <AdvertisementBanner location="banner" />

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3].map((i) => (
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
            <p className="text-red-500 text-xl">{t("Failed to load Hajj guides", "فشل تحميل أدلة الحج")}</p>
            <p className="text-gray-500 mt-2">{t("Please try again later", "يرجى المحاولة مرة أخرى لاحقًا")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {guides?.map((guide) => (
              <Card key={guide.id} className="overflow-hidden">
                <CardHeader className="bg-light islamic-pattern dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">
                        {language === "en" ? guide.title : guide.title_ar}
                      </CardTitle>
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
