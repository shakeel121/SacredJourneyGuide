import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";
import { MasjidGuide } from "@shared/schema";

export default function MasjidSection() {
  const { t, language } = useLanguage();
  const { data: guides, isLoading, error } = useQuery<MasjidGuide[]>({
    queryKey: ['/api/masjid-guides'],
  });
  
  return (
    <section id="masjid" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            {t("Masjid e Nabawi Virtual Tour", "جولة افتراضية في المسجد النبوي")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t(
              "Explore the Prophet's Mosque with our detailed virtual guide. Learn about the history, significance, and proper etiquettes for visiting this sacred site.",
              "استكشف المسجد النبوي مع دليلنا الافتراضي المفصل. تعرف على التاريخ والأهمية وآداب الزيارة المناسبة لهذا الموقع المقدس."
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-3 text-center">
              <p className="text-red-500">{t("Failed to load Masjid guides", "فشل تحميل أدلة المسجد")}</p>
            </div>
          ) : (
            guides?.slice(0, 3).map((guide) => (
              <div key={guide.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                {guide.image_url && (
                  <img 
                    src={guide.image_url}
                    alt={language === "en" ? guide.title : guide.title_ar}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === "en" ? guide.title : guide.title_ar}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {language === "en" ? guide.description : guide.description_ar}
                  </p>
                  <div className="flex items-center text-sm mb-4">
                    <MapPin className="text-primary mr-2 h-4 w-4" />
                    <span>{language === "en" ? guide.location : guide.location_ar}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full">
                      {guide.category}
                    </span>
                    <Link href={`/masjid#guide-${guide.id}`}>
                      <a className="text-primary font-medium">
                        {t("View details", "عرض التفاصيل")}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
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
              <Link href="/masjid">
                <a className="bg-primary hover:bg-[#0A6E43] text-white px-6 py-3 rounded-md font-medium transition flex items-center">
                  <span>{t("Read Full Guide", "قراءة الدليل الكامل")}</span>
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
