import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, ChevronRight } from "lucide-react";
import { UmrahGuide } from "@shared/schema";

export default function UmrahSection() {
  const { t, language } = useLanguage();
  const { data: guides, isLoading, error } = useQuery<UmrahGuide[]>({
    queryKey: ['/api/umrah-guides'],
  });
  
  return (
    <section id="umrah" className="py-16 bg-light islamic-pattern">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("Complete Umrah Guide", "دليل العمرة الكامل")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-7 w-24 mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-24 mt-4" />
              </div>
            ))
          ) : error ? (
            <div className="col-span-4 text-center text-red-500">
              {t("Failed to load Umrah guides", "فشل تحميل أدلة العمرة")}
            </div>
          ) : (
            guides?.slice(0, 4).map((guide, index) => (
              <div key={guide.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <span className="text-xs bg-secondary bg-opacity-20 text-secondary px-2 py-1 rounded">
                    {t("Essential", "أساسي")}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "en" ? guide.title : guide.title_ar}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {language === "en" ? guide.description : guide.description_ar}
                </p>
                <div className="flex items-center text-sm">
                  <CheckCircle className="text-primary mr-2 h-4 w-4" />
                  <span>{t("Reference", "المرجع")}: {guide.reference}</span>
                </div>
                <div className="mt-4">
                  <Link href={`/umrah/${guide.id}`}>
                    <a className="text-sm text-primary font-medium flex items-center">
                      <span>{t("Learn more", "تعلم المزيد")}</span>
                      <ChevronRight className="ml-1 text-xs" />
                    </a>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/umrah">
            <a className="inline-block bg-primary hover:bg-[#0A6E43] text-white px-6 py-3 rounded-md font-medium transition">
              {t("View detailed Umrah guide", "عرض دليل العمرة المفصل")}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
