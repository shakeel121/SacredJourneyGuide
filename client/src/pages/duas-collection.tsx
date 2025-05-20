import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { Dua } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AdvertisementBanner } from "@/components/ui/advertisement-banner";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function DuasCollectionPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: duas, isLoading, error } = useQuery<Dua[]>({
    queryKey: ['/api/duas', selectedCategory],
    queryFn: () => fetch(selectedCategory ? `/api/duas?category=${selectedCategory}` : '/api/duas').then(res => res.json()),
  });

  // Extract unique categories
  const categories = duas ? [...new Set(duas.map(dua => dua.category))] : [];

  return (
    <>
      <Helmet>
        <title>{t("Authentic Duas Collection - Hajj & Umrah", "مجموعة الأدعية الأصيلة - الحج والعمرة")}</title>
        <meta 
          name="description" 
          content={t(
            "Comprehensive collection of authentic duas for Hajj and Umrah with proper references and translations.",
            "مجموعة شاملة من الأدعية الأصيلة للحج والعمرة مع المراجع والترجمات المناسبة."
          )}
        />
      </Helmet>

      <div className="bg-[#0A6E43] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("Authentic Duas Collection", "مجموعة الأدعية الأصيلة")}</h1>
          <p className="max-w-3xl mx-auto text-lg">
            {t(
              "Comprehensive collection of authentic duas for Hajj and Umrah with proper references and translations.",
              "مجموعة شاملة من الأدعية الأصيلة للحج والعمرة مع المراجع والترجمات المناسبة."
            )}
          </p>
        </div>
      </div>

      <AdvertisementBanner location="banner" />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-end">
          <div className="w-full max-w-xs">
            <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("Filter by category", "تصفية حسب الفئة")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("All Categories", "جميع الفئات")}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-xl">{t("Failed to load duas", "فشل تحميل الأدعية")}</p>
            <p className="text-gray-500 mt-2">{t("Please try again later", "يرجى المحاولة مرة أخرى لاحقًا")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {duas?.map((dua) => (
              <Card key={dua.id}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-xl font-semibold">
                      {language === "en" ? dua.title : dua.title_ar}
                    </CardTitle>
                    <Badge variant="secondary">{dua.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
