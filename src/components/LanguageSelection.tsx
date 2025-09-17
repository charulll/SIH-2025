import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' }
];

const LanguageSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (languageCode: string) => {
  console.log("Language selected:", languageCode); // ✅ check in console
  localStorage.setItem("language", languageCode);
  navigate("/class-selection");
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-vibrant p-4">
      <Card className="w-full max-w-md mx-auto animate-scale-in shadow-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Choose Your Language
              </h2>
              <p className="text-muted-foreground font-body">
                भाषा चुनें | ଭାଷା ବାଛନ୍ତୁ
              </p>
            </div>
            
            <div className="space-y-3">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  variant="outline"
                  size="lg"
                  className="w-full h-16 text-lg font-body hover:bg-vibrant-turquoise hover:text-white hover:border-vibrant-turquoise transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">{language.name}</span>
                    <span className="text-sm font-display">{language.native}</span>
                  </div>
                </Button>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground font-body">
              You can change this later in settings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelection;
