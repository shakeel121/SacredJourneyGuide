import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookmarks, BookmarkType } from '@/hooks/use-bookmarks';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';

interface BookmarkButtonProps {
  id: number;
  type: BookmarkType;
  title: string;
  className?: string;
  imageUrl?: string;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
}

export function BookmarkButton({
  id,
  type,
  title,
  className,
  imageUrl,
  variant = 'outline',
  size = 'sm'
}: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const [_, navigate] = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  
  const bookmarked = isBookmarked(id, type);
  
  const handleClick = () => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    
    if (bookmarked) {
      removeBookmark(id, type);
    } else {
      addBookmark({
        id,
        type,
        title,
        imageUrl
      });
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "transition-all duration-300",
        bookmarked ? "text-yellow-500 hover:text-yellow-600" : "text-gray-500 hover:text-gray-600",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={bookmarked ? t("Remove from bookmarks", "إزالة من المفضلة") : t("Add to bookmarks", "إضافة إلى المفضلة")}
    >
      {bookmarked ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-2" />
          {(isHovered ? t("Remove", "إزالة") : t("Bookmarked", "تم الحفظ"))}
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-2" />
          {t("Bookmark", "حفظ")}
        </>
      )}
    </Button>
  );
}