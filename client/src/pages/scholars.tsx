import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { Scholar } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AdvertisementBanner } from "@/components/ui/advertisement-banner";
import { User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ScholarsPage() {
  const { t, language } = useLanguage();
  const { data: scholars, isLoading, error } = useQuery<Scholar[]>({
    queryKey: ['/api/scholars'],
  });

  return (
    <>
      <Helmet>
        <title>{t("Authentic Salafi Scholars - Hajj & Umrah Guidance", "علماء السلف الأصيلين - إرشادات الحج والعمرة")}</title>
        <meta 
          name="description" 
          content={t(
            "Our content is based on teachings from recognized Saudi Salafi scholars with proper verification and authentication.",
            "يستند محتوانا إلى تعاليم من علماء السلف السعوديين المعترف بهم مع التحقق والمصادقة المناسبة."
          )}
        />
      </Helmet>

      <div className="bg-[#0A6E43] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {t("Learn from Authentic Salafi Scholars", "تعلم من علماء السلف الأصيلين")}
          </h1>
          <p className="max-w-3xl mx-auto text-lg">
            {t(
              "Our content is based on teachings from recognized Saudi Salafi scholars with proper verification and authentication.",
              "يستند محتوانا إلى تعاليم من علماء السلف السعوديين المعترف بهم مع التحقق والمصادقة المناسبة."
            )}
          </p>
        </div>
      </div>

      <AdvertisementBanner location="banner" />

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <Skeleton className="h-6 w-48 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-10 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-xl">{t("Failed to load scholars", "فشل تحميل العلماء")}</p>
            <p className="text-gray-500 mt-2">{t("Please try again later", "يرجى المحاولة مرة أخرى لاحقًا")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholars?.map((scholar) => (
              <Card key={scholar.id}>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                      <User className="text-primary text-2xl" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold">
                        {language === "en" ? scholar.name : scholar.name_ar}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-300">
                        {language === "en" ? scholar.title : scholar.title_ar}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {language === "en" ? scholar.bio : scholar.bio_ar}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {scholar.expertise.map((exp, index) => (
                      <Badge key={index} variant="outline">{exp}</Badge>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4">
                    <a href="#" className="text-primary font-medium flex items-center hover:underline">
                      <span>{t("View his teachings", "عرض تعاليمه")}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">
                {t("Scholarly Authentication Process", "عملية المصادقة العلمية")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t(
                  "All content on our platform undergoes a rigorous verification process to ensure it aligns with authentic Salafi teachings and has proper references from reliable sources.",
                  "يخضع جميع المحتوى على منصتنا لعملية تحقق صارمة للتأكد من توافقه مع تعاليم السلف الأصيلة ولديه مراجع مناسبة من مصادر موثوقة."
                )}
              </p>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg className="text-primary mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>
                  {t("Our content review team includes qualified Islamic scholars", "يضم فريق مراجعة المحتوى لدينا علماء إسلاميين مؤهلين")}
                </span>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <a href="#" className="bg-primary hover:bg-[#0A6E43] text-white px-6 py-3 rounded-md font-medium transition">
                {t("Learn about our process", "تعرف على عمليتنا")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
