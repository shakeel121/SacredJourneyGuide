import { useLanguage } from "@/hooks/use-language";
import { useAdvertisements } from "@/hooks/use-advertisement";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdSection() {
  const { t } = useLanguage();
  const { data: advertisements, isLoading, error } = useAdvertisements("homepage");
  
  if (isLoading) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {t("Sponsored Content", "المحتوى المدعوم")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("Our verified partners offering Hajj and Umrah services", "شركاؤنا المعتمدون الذين يقدمون خدمات الحج والعمرة")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t("ADVERTISEMENT", "إعلان")}</p>
                <Skeleton className="h-40 mb-2" />
                <Skeleton className="h-5 w-32 mx-auto" />
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("All advertisements undergo vetting to ensure they comply with Islamic principles", "تخضع جميع الإعلانات للتدقيق للتأكد من توافقها مع المبادئ الإسلامية")}
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  if (error || !advertisements || advertisements.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            {t("Sponsored Content", "المحتوى المدعوم")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("Our verified partners offering Hajj and Umrah services", "شركاؤنا المعتمدون الذين يقدمون خدمات الحج والعمرة")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {advertisements.map((ad) => (
            <a 
              key={ad.id}
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t("ADVERTISEMENT", "إعلان")}</p>
              <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded mb-2">
                <p className="text-gray-500 dark:text-gray-400">{ad.title}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{ad.description}</p>
            </a>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("All advertisements undergo vetting to ensure they comply with Islamic principles", "تخضع جميع الإعلانات للتدقيق للتأكد من توافقها مع المبادئ الإسلامية")}
          </p>
        </div>
      </div>
    </section>
  );
}
