import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';

// Types for bookmarked items
export type BookmarkType = 'dua' | 'hajj-guide' | 'umrah-guide' | 'masjid-guide' | 'scholar';

export interface BookmarkedItem {
  id: number;
  type: BookmarkType;
  title: string;
  timestamp: number;
  imageUrl?: string;
}

interface BookmarkContextType {
  bookmarks: BookmarkedItem[];
  addBookmark: (item: Omit<BookmarkedItem, 'timestamp'>) => void;
  removeBookmark: (id: number, type: BookmarkType) => void;
  isBookmarked: (id: number, type: BookmarkType) => boolean;
  getByType: (type: BookmarkType) => BookmarkedItem[];
  clearAll: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Load bookmarks from localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const savedBookmarks = localStorage.getItem(`bookmarks_${userId}`);
      if (savedBookmarks) {
        try {
          setBookmarks(JSON.parse(savedBookmarks));
        } catch (error) {
          console.error('Error parsing bookmarks', error);
          setBookmarks([]);
        }
      }
    } else {
      // Clear bookmarks when user logs out
      setBookmarks([]);
    }
  }, [currentUser]);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (currentUser && bookmarks.length > 0) {
      const userId = currentUser.uid;
      localStorage.setItem(`bookmarks_${userId}`, JSON.stringify(bookmarks));
    }
  }, [bookmarks, currentUser]);

  // Add a bookmark
  const addBookmark = (item: Omit<BookmarkedItem, 'timestamp'>) => {
    if (!currentUser) {
      toast({
        title: t('Sign in required', 'تسجيل الدخول مطلوب'),
        description: t('Please sign in to bookmark items', 'الرجاء تسجيل الدخول لحفظ العناصر'),
        variant: 'destructive',
      });
      return;
    }

    // Check if already bookmarked
    if (isBookmarked(item.id, item.type)) {
      toast({
        title: t('Already bookmarked', 'تم الحفظ مسبقًا'),
        description: t('This item is already in your bookmarks', 'هذا العنصر موجود بالفعل في المفضلة'),
      });
      return;
    }

    const newBookmark: BookmarkedItem = {
      ...item,
      timestamp: Date.now(),
    };

    setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);
    
    toast({
      title: t('Added to bookmarks', 'تمت الإضافة إلى المفضلة'),
      description: t('Item has been saved to your bookmarks', 'تم حفظ العنصر في المفضلة'),
    });
  };

  // Remove a bookmark
  const removeBookmark = (id: number, type: BookmarkType) => {
    setBookmarks((prevBookmarks) => 
      prevBookmarks.filter(bookmark => !(bookmark.id === id && bookmark.type === type))
    );
    
    toast({
      title: t('Removed from bookmarks', 'تمت الإزالة من المفضلة'),
      description: t('Item has been removed from your bookmarks', 'تمت إزالة العنصر من المفضلة'),
    });
  };

  // Check if an item is bookmarked
  const isBookmarked = (id: number, type: BookmarkType): boolean => {
    return bookmarks.some(bookmark => bookmark.id === id && bookmark.type === type);
  };

  // Get bookmarks by type
  const getByType = (type: BookmarkType): BookmarkedItem[] => {
    return bookmarks.filter(bookmark => bookmark.type === type);
  };

  // Clear all bookmarks
  const clearAll = () => {
    if (currentUser) {
      const userId = currentUser.uid;
      localStorage.removeItem(`bookmarks_${userId}`);
    }
    setBookmarks([]);
    
    toast({
      title: t('Bookmarks cleared', 'تم مسح المفضلة'),
      description: t('All bookmarks have been removed', 'تمت إزالة جميع العناصر من المفضلة'),
    });
  };

  return (
    <BookmarkContext.Provider 
      value={{ 
        bookmarks, 
        addBookmark, 
        removeBookmark, 
        isBookmarked, 
        getByType,
        clearAll 
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}