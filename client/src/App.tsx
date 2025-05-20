import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
import HajjGuide from "@/pages/hajj-guide";
import UmrahGuide from "@/pages/umrah-guide";
import MasjidGuide from "@/pages/masjid-guide";
import DuasCollection from "@/pages/duas-collection";
import Scholars from "@/pages/scholars";
import { LanguageProvider } from "@/hooks/use-language";
import { ThemeProvider } from "./lib/ThemeProvider";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/hajj" component={HajjGuide} />
          <Route path="/umrah" component={UmrahGuide} />
          <Route path="/masjid" component={MasjidGuide} />
          <Route path="/duas" component={DuasCollection} />
          <Route path="/scholars" component={Scholars} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
