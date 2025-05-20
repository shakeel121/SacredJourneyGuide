import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignUp() {
  const { t } = useLanguage();
  const { userSignUpWithEmail, userSignInWithGoogle } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await userSignUpWithEmail(values.email, values.password);
      if (result.success) {
        setLocation("/");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await userSignInWithGoogle();
      if (result.success) {
        setLocation("/");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("Sign Up - Authentic Hajj & Umrah Guide", "إنشاء حساب - دليل الحج والعمرة الأصيل")}</title>
      </Helmet>

      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              {t("Create an Account", "إنشاء حساب")}
            </CardTitle>
            <CardDescription>
              {t("Enter your details to create an account", "أدخل بياناتك لإنشاء حساب")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FcGoogle className="mr-2 h-5 w-5" />
              )}
              {t("Sign up with Google", "التسجيل باستخدام Google")}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("Or continue with", "أو المتابعة باستخدام")}
                </span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Email", "البريد الإلكتروني")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("Enter your email", "أدخل بريدك الإلكتروني")} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Password", "كلمة المرور")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder={t("Create a password", "أنشئ كلمة مرور")} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Confirm Password", "تأكيد كلمة المرور")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder={t("Confirm your password", "أكد كلمة المرور")} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {t("Create Account", "إنشاء حساب")}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              {t("Already have an account?", "لديك حساب بالفعل؟")}{" "}
              <Link href="/signin">
                <a className="text-primary underline hover:text-primary/80">
                  {t("Sign in", "تسجيل الدخول")}
                </a>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}