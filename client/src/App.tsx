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
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import AdminDashboard from "@/pages/admin/dashboard";
import Profile from "@/pages/profile";
import { LanguageProvider } from "@/hooks/use-language";
import { AuthProvider } from "@/hooks/use-auth";
import { BookmarkProvider } from "@/hooks/use-bookmarks";
import { useEffect } from "react";

function Router() {
  // On initial load, check for stored dark mode preference
  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
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
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/blog" component={Blog} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <BookmarkProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </BookmarkProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
