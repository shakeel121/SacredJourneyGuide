import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  BookOpen, 
  Users, 
  Award, 
  Image, 
  FileText, 
  Home, 
  Church, 
  Map, 
  Settings, 
  Plus,
  Trash2,
  Edit,
  Loader2
} from "lucide-react";

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { currentUser, isAdmin, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("hajj");
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Redirect if user is not authenticated or is not an admin
  useEffect(() => {
    if (!loading && (!currentUser || !isAdmin)) {
      setLocation("/signin");
    }
  }, [currentUser, isAdmin, loading, setLocation]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4">{t("Loading...", "جار التحميل...")}</p>
        </div>
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    return null; // Will redirect in the useEffect
  }

  const handleAdd = () => {
    setIsAdding(true);
    setEditingItem(null);
  };

  const handleEdit = (item: any) => {
    setIsAdding(false);
    setEditingItem(item);
  };

  const handleDelete = (id: number) => {
    // Implement delete logic here
    console.log(`Delete item with id: ${id}`);
    // You would typically make an API call to delete the item
  };

  const handleSave = (data: any) => {
    // Implement save logic here
    console.log("Saving data:", data);
    // You would typically make an API call to save the data
    setIsAdding(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingItem(null);
  };

  // Temporary placeholder for content list
  const ContentList = ({ contentType }: { contentType: string }) => (
    <div className="space-y-4">
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <FileText className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium">{t("Content Management Section", "قسم إدارة المحتوى")}</h3>
        <p className="text-gray-500 mt-2">
          {t(
            `This is where you will manage your ${contentType} content.`, 
            `هنا ستقوم بإدارة محتوى ${contentType}.`
          )}
        </p>
        <Button className="mt-4" onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {t("Add Your First Item", "أضف العنصر الأول")}
        </Button>
      </div>
    </div>
  );

  // Temporary placeholder for content form
  const ContentForm = ({ contentType, item, onSave, onCancel }: { contentType: string, item: any, onSave: (data: any) => void, onCancel: () => void }) => (
    <div className="space-y-4">
      <div className="bg-primary/5 p-8 rounded-lg border border-primary/20">
        <h3 className="text-lg font-medium mb-4">
          {item ? t("Edit Item", "تعديل العنصر") : t("Add New Item", "إضافة عنصر جديد")}
        </h3>
        <p className="text-gray-500 mb-6">
          {t(
            `This form will allow you to ${item ? 'edit' : 'add'} ${contentType} content.`,
            `هذا النموذج سيسمح لك ${item ? 'بتعديل' : 'بإضافة'} محتوى ${contentType}.`
          )}
        </p>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onCancel}>
            {t("Cancel", "إلغاء")}
          </Button>
          <Button onClick={() => onSave({ id: item?.id || Date.now(), name: "Sample Item" })}>
            {t("Save", "حفظ")}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{t("Admin Dashboard - Authentic Hajj & Umrah Guide", "لوحة التحكم - دليل الحج والعمرة الأصيل")}</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/5">
            <Card>
              <CardHeader>
                <CardTitle>{t("Admin Panel", "لوحة التحكم")}</CardTitle>
                <CardDescription>
                  {t("Manage content and settings", "إدارة المحتوى والإعدادات")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button 
                    variant={activeTab === "hajj" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("hajj")}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    {t("Hajj Guides", "أدلة الحج")}
                  </Button>
                  <Button 
                    variant={activeTab === "umrah" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("umrah")}
                  >
                    <Church className="mr-2 h-4 w-4" />
                    {t("Umrah Guides", "أدلة العمرة")}
                  </Button>
                  <Button 
                    variant={activeTab === "masjid" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("masjid")}
                  >
                    <Map className="mr-2 h-4 w-4" />
                    {t("Masjid Guides", "أدلة المساجد")}
                  </Button>
                  <Button 
                    variant={activeTab === "duas" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("duas")}
                  >
                    <Award className="mr-2 h-4 w-4" />
                    {t("Duas Collection", "مجموعة الأدعية")}
                  </Button>
                  <Button 
                    variant={activeTab === "scholars" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("scholars")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    {t("Scholars", "العلماء")}
                  </Button>
                  <Button 
                    variant={activeTab === "blog" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("blog")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {t("Blog Posts", "المدونة")}
                  </Button>
                  <Button 
                    variant={activeTab === "ads" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("ads")}
                  >
                    <Image className="mr-2 h-4 w-4" />
                    {t("Advertisements", "الإعلانات")}
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {t("Settings", "الإعدادات")}
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-4/5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {activeTab === "hajj" && t("Hajj Guides", "أدلة الحج")}
                    {activeTab === "umrah" && t("Umrah Guides", "أدلة العمرة")}
                    {activeTab === "masjid" && t("Masjid Guides", "أدلة المساجد")}
                    {activeTab === "duas" && t("Duas Collection", "مجموعة الأدعية")}
                    {activeTab === "scholars" && t("Scholars", "العلماء")}
                    {activeTab === "blog" && t("Blog Posts", "المدونة")}
                    {activeTab === "ads" && t("Advertisements", "الإعلانات")}
                    {activeTab === "settings" && t("Settings", "الإعدادات")}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === "hajj" && t("Manage Hajj Guide content", "إدارة محتوى أدلة الحج")}
                    {activeTab === "umrah" && t("Manage Umrah Guide content", "إدارة محتوى أدلة العمرة")}
                    {activeTab === "masjid" && t("Manage Masjid Guide content", "إدارة محتوى أدلة المساجد")}
                    {activeTab === "duas" && t("Manage Duas Collection", "إدارة مجموعة الأدعية")}
                    {activeTab === "scholars" && t("Manage Scholars information", "إدارة معلومات العلماء")}
                    {activeTab === "blog" && t("Manage Blog Posts", "إدارة المدونة")}
                    {activeTab === "ads" && t("Manage Advertisements", "إدارة الإعلانات")}
                    {activeTab === "settings" && t("Manage Application Settings", "إدارة إعدادات التطبيق")}
                  </CardDescription>
                </div>
                
                {activeTab !== "settings" && !isAdding && !editingItem && (
                  <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t("Add New", "إضافة جديد")}
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isAdding || editingItem ? (
                  <ContentForm 
                    contentType={activeTab} 
                    item={editingItem} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                  />
                ) : (
                  <ContentList contentType={activeTab} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}