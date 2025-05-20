import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Lock, 
  BookOpen,
  MapPin,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords do not match.",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function ProfilePage() {
  const { currentUser, loading } = useAuth();
  const { t } = useLanguage();
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Mock progress data (in a real app, this would come from the database)
  const progress = [
    { 
      id: 1, 
      type: "hajj", 
      title: t("Hajj Guide", "دليل الحج"),
      progress: 60, 
      lastAccessed: new Date(2024, 4, 15),
      image: "https://images.unsplash.com/photo-1564769625673-cb844a3763ef?q=80&w=300&auto=format&fit=crop"
    },
    { 
      id: 2, 
      type: "umrah", 
      title: t("Umrah Guide", "دليل العمرة"),
      progress: 85, 
      lastAccessed: new Date(2024, 4, 18),
      image: "https://images.unsplash.com/photo-1519058082350-08716243d33a?q=80&w=300&auto=format&fit=crop"
    },
    { 
      id: 3, 
      type: "masjid", 
      title: t("Masjid Guide", "دليل المسجد"),
      progress: 35, 
      lastAccessed: new Date(2024, 4, 10),
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=300&auto=format&fit=crop"
    }
  ];
  
  // Bookmarked duas
  const bookmarkedDuas = [
    {
      id: 1,
      title: t("Dua for Entering Ihram", "دعاء الإحرام"),
      bookmarkedDate: new Date(2024, 4, 12)
    },
    {
      id: 3,
      title: t("Dua for Tawaf", "دعاء الطواف"),
      bookmarkedDate: new Date(2024, 4, 14)
    },
    {
      id: 5,
      title: t("Dua for Arafat", "دعاء عرفة"),
      bookmarkedDate: new Date(2024, 4, 10)
    }
  ];

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/signin");
    }
  }, [currentUser, loading, navigate]);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: currentUser?.displayName || "",
      email: currentUser?.email || "",
      bio: "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    toast({
      title: t("Profile updated", "تم تحديث الملف الشخصي"),
      description: t("Your profile has been updated successfully.", "تم تحديث ملفك الشخصي بنجاح."),
    });
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    toast({
      title: t("Password updated", "تم تحديث كلمة المرور"),
      description: t("Your password has been updated successfully.", "تم تحديث كلمة المرور الخاصة بك بنجاح."),
    });
    
    passwordForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  function getInitials(name: string) {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
      : "U";
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <span className="mt-4 text-lg">{t("Loading profile...", "جاري تحميل الملف الشخصي...")}</span>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <>
      <Helmet>
        <title>{t("Your Profile", "الملف الشخصي")} | Authentic Hajj & Umrah Guide</title>
        <meta name="description" content={t("Manage your profile settings and track your learning progress", "إدارة إعدادات ملفك الشخصي وتتبع تقدمك في التعلم")} />
      </Helmet>
      
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">{t("Your Profile", "الملف الشخصي")}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || "User"} />
                  <AvatarFallback className="text-lg bg-primary text-white">
                    {getInitials(currentUser.displayName || currentUser.email || "User")}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-semibold mb-1">
                  {currentUser.displayName || currentUser.email?.split("@")[0]}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {currentUser.email}
                </p>
                
                <div className="w-full border-t pt-4 mt-2">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {t("Email", "البريد الإلكتروني")}
                    </span>
                    <span className="text-sm">{currentUser.email}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {t("Account type", "نوع الحساب")}
                    </span>
                    <span className="text-sm">
                      {currentUser.providerId === "password" ? 
                        t("Email/Password", "البريد الإلكتروني/كلمة المرور") : 
                        t("Google", "جوجل")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("Learning Progress", "تقدم التعلم")}</CardTitle>
                <CardDescription>
                  {t("Track your progress through different guides", "تتبع تقدمك في الأدلة المختلفة")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progress.map((item) => (
                  <div key={item.id} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{item.title}</h3>
                          <span className="text-sm">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{width: `${item.progress}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {t("Last accessed", "آخر وصول")}: {item.lastAccessed.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/")}>
                  {t("Continue Learning", "مواصلة التعلم")}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("Bookmarked Duas", "الأدعية المحفوظة")}</CardTitle>
                <CardDescription>
                  {t("Quick access to your saved duas", "وصول سريع إلى الأدعية المحفوظة")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {bookmarkedDuas.map((dua) => (
                  <div key={dua.id} className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-primary" />
                      <span>{dua.title}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {dua.bookmarkedDate.toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/duas")}>
                  {t("View All Duas", "عرض جميع الأدعية")}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="profile">{t("Profile Settings", "إعدادات الملف")}</TabsTrigger>
                    <TabsTrigger value="security">{t("Security", "الأمان")}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="profile" className="pt-4">
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("Username", "اسم المستخدم")}</FormLabel>
                            <FormControl>
                              <Input placeholder="johndoe" {...field} />
                            </FormControl>
                            <FormDescription>
                              {t("This is your public display name.", "هذا هو اسم العرض العام الخاص بك.")}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("Email", "البريد الإلكتروني")}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="you@example.com" 
                                {...field} 
                                disabled={currentUser?.providerId !== "password"}
                              />
                            </FormControl>
                            {currentUser?.providerId !== "password" && (
                              <FormDescription>
                                {t("Email cannot be changed for Google accounts.", "لا يمكن تغيير البريد الإلكتروني لحسابات Google.")}
                              </FormDescription>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("Bio", "نبذة شخصية")}</FormLabel>
                            <FormControl>
                              <textarea
                                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder={t("Tell us a little about yourself", "أخبرنا قليلاً عن نفسك")}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {t("You can @mention other users to link to them.", "يمكنك استخدام @اسم_المستخدم للإشارة إلى المستخدمين الآخرين.")}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">{t("Update profile", "تحديث الملف الشخصي")}</Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="security" className="pt-4">
                  {currentUser?.providerId === "password" ? (
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Current password", "كلمة المرور الحالية")}</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("New password", "كلمة المرور الجديدة")}</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Confirm password", "تأكيد كلمة المرور")}</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit">{t("Update password", "تحديث كلمة المرور")}</Button>
                      </form>
                    </Form>
                  ) : (
                    <div className="py-4 text-center">
                      <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        {t("Google Authentication", "مصادقة Google")}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {t("You're signed in with Google. Password settings are managed through your Google account.", "أنت مسجل الدخول باستخدام Google. يتم إدارة إعدادات كلمة المرور من خلال حساب Google الخاص بك.")}
                      </p>
                      <Button variant="outline" onClick={() => window.open("https://myaccount.google.com/security", "_blank")}>
                        {t("Manage Google Account", "إدارة حساب Google")}
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}