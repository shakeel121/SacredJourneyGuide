import { useLanguage } from "@/hooks/use-language";
import { useState, useEffect } from "react";

export default function StatisticsSection() {
  const { t, language } = useLanguage();
  const [numbers, setNumbers] = useState({
    pilgrims: 0,
    sources: 0,
    guides: 0,
    satisfaction: 0
  });
  
  useEffect(() => {
    // Simulate animation of counting up
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    
    const finalNumbers = {
      pilgrims: 50000,
      sources: 150,
      guides: 200,
      satisfaction: 98
    };
    
    const increments = {
      pilgrims: finalNumbers.pilgrims / steps,
      sources: finalNumbers.sources / steps,
      guides: finalNumbers.guides / steps,
      satisfaction: finalNumbers.satisfaction / steps
    };
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      setNumbers(prev => ({
        pilgrims: currentStep >= steps ? finalNumbers.pilgrims : Math.floor(prev.pilgrims + increments.pilgrims),
        sources: currentStep >= steps ? finalNumbers.sources : Math.floor(prev.sources + increments.sources),
        guides: currentStep >= steps ? finalNumbers.guides : Math.floor(prev.guides + increments.guides),
        satisfaction: currentStep >= steps ? finalNumbers.satisfaction : Math.floor(prev.satisfaction + increments.satisfaction)
      }));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  const stats = [
    {
      value: numbers.pilgrims,
      label: t("Pilgrims Guided", "الحجاج الموجهين"),
      suffix: "+",
      color: "#0A6E43",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      )
    },
    {
      value: numbers.sources,
      label: t("Authentic Sources", "المصادر الأصيلة"),
      suffix: "+",
      color: "#D4AF37",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
      )
    },
    {
      value: numbers.guides,
      label: t("Interactive Guides", "الأدلة التفاعلية"),
      suffix: "+",
      color: "#4C51BF",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
      )
    },
    {
      value: numbers.satisfaction,
      label: t("Satisfaction Rate", "نسبة الرضا"),
      suffix: "%",
      color: "#E53E3E",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
      )
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-r from-[#0A6E43]/5 to-[#D4AF37]/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            {t("Our Impact in Numbers", "تأثيرنا بالأرقام")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              "Authentic guidance for millions of pilgrims around the world since our foundation.",
              "توجيه أصيل لملايين الحجاج حول العالم منذ تأسيسنا."
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center transform transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center" 
                  style={{ backgroundColor: `${stat.color}10` }}
                >
                  <div className="text-2xl" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              
              <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}