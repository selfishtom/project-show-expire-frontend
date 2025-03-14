import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            <div className="form-control">
                <div className="join">
                    <input
                        className="join-item btn btn-sm"
                        type="radio"
                        name="language"
                        value="en"
                        checked={language === 'en'}
                        onChange={(e) => setLanguage(e.target.value as 'en' | 'fa')}
                        aria-label="English"
                    />
                    <input
                        className="join-item btn btn-sm"
                        type="radio"
                        name="language"
                        value="fa"
                        checked={language === 'fa'}
                        onChange={(e) => setLanguage(e.target.value as 'en' | 'fa')}
                        aria-label="فارسی"
                    />
                </div>
            </div>
        </div>
    );
}; 