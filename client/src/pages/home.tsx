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
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import MobileAppSection from "@/components/home/MobileAppSection";
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
        <meta property="og:title" content={t("Authentic Hajj & Umrah Guide", "دليل الحج والعمرة الأصيل")} />
        <meta property="og:description" content={t("Authentic guidance for Hajj and Umrah rituals", "إرشاد أصيل لمناسك الحج والعمرة")} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1519058082350-08716243d33a?q=80&w=2073" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <HeroSection />
      <FeaturesSection />
      <StatisticsSection />
      <AdvertisementBanner location="banner" />
      <HajjSection />
      <UmrahSection />
      <TestimonialsSection />
      <MasjidSection />
      <MobileAppSection />
      <DuasSection />
      <AdSection />
      <ScholarsSection />
      <CTASection />
    </>
  );
}
