import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import { Dua } from "@shared/schema";

export default function DuasSection() {
  const { t, language } = useLanguage();
  const { data: duas, isLoading, error } = useQuery<Dua[]>({
    queryKey: ['/api/duas'],
  });
  
  return (
    <section id="duas" className="py-16 bg-light islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            {t("Authentic Duas Collection", "مجموعة الأدعية الأصيلة")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t(
              "Comprehensive collection of authentic duas for Hajj and Umrah with proper references and translations.",
              "مجموعة شاملة من الأدعية الأصيلة للحج والعمرة مع المراجع والترجمات المناسبة."
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            Array(2).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-24" />
                </div>
                
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
                
                <div className="mb-4">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-16 w-full" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-2 text-center">
              <p className="text-red-500">{t("Failed to load duas", "فشل تحميل الأدعية")}</p>
            </div>
          ) : (
            duas?.slice(0, 2).map((dua) => (
              <div key={dua.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">
                    {language === "en" ? dua.title : dua.title_ar}
                  </h3>
                  <span className="text-xs bg-secondary bg-opacity-20 text-secondary px-2 py-1 rounded">
                    {dua.category}
                  </span>
                </div>
                
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="arabic text-right text-2xl mb-2">{dua.arabic_text}</p>
                  <p className="text-gray-700 dark:text-gray-300 italic">{dua.transliteration}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">{t("Translation:", "الترجمة:")}</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === "en" ? dua.translation : dua.translation_ar}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <BookOpen className="mr-1 h-4 w-4" />
                    <span>{t("Reference:", "المرجع:")} {dua.reference}</span>
                  </div>
                  <Link href={`/duas?id=${dua.id}`}>
                    <a className="text-primary font-medium">
                      {t("View details", "عرض التفاصيل")}
                    </a>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/duas">
            <a className="inline-block bg-primary hover:bg-[#0A6E43] text-white px-6 py-3 rounded-md font-medium transition">
              {t("View all duas", "عرض جميع الأدعية")}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
