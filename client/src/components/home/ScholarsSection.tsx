import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";
import { User, ArrowRight, Shield } from "lucide-react";
import { Scholar } from "@shared/schema";

export default function ScholarsSection() {
  const { t, language } = useLanguage();
  const { data: scholars, isLoading, error } = useQuery<Scholar[]>({
    queryKey: ['/api/scholars'],
  });
  
  return (
    <section id="scholars" className="py-16 bg-light islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            {t("Learn from Authentic Salafi Scholars", "تعلم من علماء السلف الأصيلين")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t(
              "Our content is based on teachings from recognized Saudi Salafi scholars with proper verification and authentication.",
              "يستند محتوانا إلى تعاليم من علماء السلف السعوديين المعترف بهم مع التحقق والمصادقة المناسبة."
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <Skeleton className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-6 w-48 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                
                <Skeleton className="h-24 w-full mb-4" />
                
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-3 text-center">
              <p className="text-red-500">{t("Failed to load scholars", "فشل تحميل العلماء")}</p>
            </div>
          ) : (
            scholars?.map((scholar) => (
              <div key={scholar.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <User className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {language === "en" ? scholar.name : scholar.name_ar}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === "en" ? scholar.title : scholar.title_ar}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {language === "en" ? scholar.bio : scholar.bio_ar}
                </p>
                
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                  <Link href={`/scholars#scholar-${scholar.id}`}>
                    <a className="text-primary font-medium flex items-center hover:underline">
                      <span>{t("View his teachings", "عرض تعاليمه")}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        
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
                <Shield className="text-primary mr-2 h-4 w-4" />
                <span>
                  {t("Our content review team includes qualified Islamic scholars", "يضم فريق مراجعة المحتوى لدينا علماء إسلاميين مؤهلين")}
                </span>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Link href="/scholars">
                <a className="bg-primary hover:bg-[#0A6E43] text-white px-6 py-3 rounded-md font-medium transition">
                  {t("Learn about our process", "تعرف على عمليتنا")}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
