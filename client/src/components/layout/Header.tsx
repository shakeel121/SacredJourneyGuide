import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/ThemeProvider";
import { useLanguage } from "@/hooks/use-language";
import { Church, Menu, X, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: "/", label: t("Home", "الرئيسية") },
    { href: "/hajj", label: t("Hajj", "الحج") },
    { href: "/umrah", label: t("Umrah", "العمرة") },
    { href: "/masjid", label: t("Masjid e Nabawi", "المسجد النبوي") },
    { href: "/duas", label: t("Duas", "الأدعية") },
    { href: "/scholars", label: t("Scholars", "العلماء") },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Church className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-primary">
              {t("Authentic Hajj & Umrah Guide", "دليل الحج والعمرة الأصيل")}
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={`font-medium hover:text-primary transition ${
                  location === item.href ? "text-primary" : ""
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="border rounded-md overflow-hidden flex">
              <button 
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 ${language === "en" ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage("ar")}
                className={`px-3 py-1 ${language === "ar" ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                AR
              </button>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === "ar" ? "right" : "left"}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-2">
                      <Church className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl text-primary">
                      {t("Hajj & Umrah Guide", "دليل الحج والعمرة")}
                    </span>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <a className={`font-medium py-2 border-b border-gray-100 dark:border-gray-800 ${
                          location === item.href ? "text-primary" : ""
                        }`}>
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
