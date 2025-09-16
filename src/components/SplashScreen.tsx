import React, { useEffect } from 'react';
import funshikshaLogo from '@/assets/funshiksha-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
      <div className="text-center animate-fade-in">
        <div className="animate-float">
          <img 
            src={funshikshaLogo} 
            alt="Funshiksha Logo" 
            className="w-96 h-auto mx-auto mb-8 drop-shadow-lg"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground">
            Funshiksha
          </h1>
          <p className="text-xl md:text-2xl font-body text-primary-foreground/90">
            मज़ेदार शिक्षा | Fun Learning
          </p>
          <div className="flex justify-center mt-8">
            <div className="animate-pulse">
              <div className="w-8 h-8 bg-primary-foreground/50 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;