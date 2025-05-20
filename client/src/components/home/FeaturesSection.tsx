import { useLanguage } from "@/hooks/use-language";
import { BookOpen, Map, Languages } from "lucide-react";

export default function FeaturesSection() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <BookOpen className="text-primary text-2xl" />,
      title: t("Authentic Sources", "مصادر أصيلة"),
      description: t(
        "All content is based on authentic hadiths and teachings from verified Salafi scholars with proper references.",
        "جميع المحتوى يستند إلى أحاديث وتعاليم أصيلة من علماء السلف المعتمدين مع المراجع المناسبة."
      )
    },
    {
      icon: <Map className="text-primary text-2xl" />,
      title: t("Virtual Guidance", "التوجيه الافتراضي"),
      description: t(
        "Step-by-step virtual guides for Hajj, Umrah, and exploring Masjid e Nabawi with interactive elements.",
        "أدلة افتراضية خطوة بخطوة للحج والعمرة واستكشاف المسجد النبوي مع عناصر تفاعلية."
      )
    },
    {
      icon: <Languages className="text-primary text-2xl" />,
      title: t("Bilingual Content", "محتوى ثنائي اللغة"),
      description: t(
        "Complete content available in both Arabic and English to serve a wider audience of believers.",
        "محتوى كامل متاح باللغتين العربية والإنجليزية لخدمة جمهور أوسع من المؤمنين."
      )
    }
  ];
  
  return (
    <section className="py-16 bg-light islamic-pattern">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("Authentic Islamic Learning", "التعلم الإسلامي الأصيل")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
