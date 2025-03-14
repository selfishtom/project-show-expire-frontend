import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fa';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        search: 'Search',
        searchPlaceholder: 'Enter user code...',
        searchButton: 'Search',
        noUserFound: 'No user found',
        connectionError: 'Connection error',
        networkError: 'Network error. Please check your connection.',
        pleaseEnterCode: 'Please enter a user code',
        upload: 'Upload',
        download: 'Download',
        total: 'Total',
        reset: 'Reset',
        expiry: 'Expiry',
        unlimited: 'Unlimited',
        never: 'Never',
        language: 'Language',
        english: 'English',
        persian: 'Persian',
        status: 'Status',
        active: 'Active',
        expired: 'Expired',
        timeUntilEnd: 'Time Until End',
        usage: 'Usage',
        remain: 'Remaining',
        userSearch: 'User Search',
    },
    fa: {
        search: 'جستجو',
        searchPlaceholder: 'کد کاربر را وارد کنید...',
        searchButton: 'جستجو',
        noUserFound: 'کاربری یافت نشد',
        connectionError: 'خطا در اتصال',
        networkError: 'خطا در شبکه. لطفا اتصال خود را بررسی کنید.',
        pleaseEnterCode: 'لطفا یک کد کاربر وارد کنید',
        upload: 'آپلود',
        download: 'دانلود',
        total: 'کل',
        reset: 'بازنشانی',
        expiry: 'انقضا',
        unlimited: 'نامحدود',
        never: 'هرگز',
        language: 'زبان',
        english: 'انگلیسی',
        persian: 'فارسی',
        status: 'وضعیت',
        active: 'فعال',
        expired: 'منقضی شده',
        timeUntilEnd: 'زمان تا پایان',
        usage: 'مصرف',
        remain: 'باقیمانده',
        userSearch: 'جستجوی کاربر',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLang = localStorage.getItem('language') as Language;
        return savedLang || 'fa';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.dir = language === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations[typeof language]] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}; 