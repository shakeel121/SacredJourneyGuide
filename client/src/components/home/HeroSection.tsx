import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

export default function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="relative bg-[#0A6E43] text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1537031934600-7046ab816a21)`,
          filter: 'brightness(40%)'
        }} 
      />
      <div className="relative container mx-auto px-4 py-20 flex flex-col items-center text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="block">
            {t("Learn Authentic", "تعلم الأصيل")}
          </span>
          <span className="block text-[#D4AF37]">
            {t("Hajj & Umrah Rituals", "مناسك الحج والعمرة")}
          </span>
        </h1>
        <p className="text-xl max-w-3xl mb-8">
          {t(
            "Comprehensive virtual learning platform based on authentic guidance from Saudi Salafi Ulema with verified references.",
            "منصة تعليمية افتراضية شاملة تستند إلى توجيهات أصيلة من علماء السلف السعوديين مع مراجع موثقة."
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/hajj">
            <a className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition">
              {t("Start Learning", "ابدأ التعلم")}
            </a>
          </Link>
          <Link href="/duas">
            <a className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-md font-medium transition">
              {t("Explore Resources", "استكشف الموارد")}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
