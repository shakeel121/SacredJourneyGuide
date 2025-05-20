import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import { AdvertisementBanner } from "@/components/ui/advertisement-banner";
import HajjSection from "@/components/home/HajjSection";
import UmrahSection from "@/components/home/UmrahSection";
import MasjidSection from "@/components/home/MasjidSection";
import DuasSection from "@/components/home/DuasSection";
import AdSection from "@/components/advertisements/AdSection";
import ScholarsSection from "@/components/home/ScholarsSection";
import CTASection from "@/components/home/CTASection";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/hooks/use-language";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t("Authentic Hajj & Umrah Guide - Virtual Learning Platform", "دليل الحج والعمرة الأصيل - منصة تعليمية افتراضية")}</title>
        <meta 
          name="description" 
          content={t(
            "Comprehensive virtual learning platform for authentic Islamic guidance on Hajj and Umrah rituals based on Saudi Salafi scholars.",
            "منصة تعليمية افتراضية شاملة للإرشاد الإسلامي الأصيل حول مناسك الحج والعمرة من علماء السلف السعوديين."
          )}
        />
      </Helmet>
      
      <HeroSection />
      <FeaturesSection />
      <AdvertisementBanner location="banner" />
      <HajjSection />
      <UmrahSection />
      <MasjidSection />
      <DuasSection />
      <AdSection />
      <ScholarsSection />
      <CTASection />
    </>
  );
}
