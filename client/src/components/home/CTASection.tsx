import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

export default function CTASection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-[#0A6E43] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {t("Begin Your Virtual Learning Journey", "ابدأ رحلة التعلم الافتراضية الخاصة بك")}
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          {t(
            "Get access to comprehensive guides, authentic duas, and verified teachings to prepare for your Hajj or Umrah journey.",
            "احصل على إمكانية الوصول إلى أدلة شاملة وأدعية أصيلة وتعاليم موثقة للاستعداد لرحلة الحج أو العمرة."
          )}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link href="/hajj">
            <a className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition">
              {t("Register for Free", "سجل مجانًا")}
            </a>
          </Link>
          <Link href="/duas">
            <a className="bg-white text-[#0A6E43] hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition">
              {t("Explore Resources", "استكشف الموارد")}
            </a>
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">1000+</div>
            <p className="text-sm">{t("Authentic Duas", "أدعية أصيلة")}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <p className="text-sm">{t("Step-by-Step Guides", "أدلة خطوة بخطوة")}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <p className="text-sm">{t("Verified Scholars", "علماء موثوقين")}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">100k+</div>
            <p className="text-sm">{t("Users Worldwide", "مستخدمين حول العالم")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
