import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";

// Components
import SplashScreen from "./components/SplashScreen";
import LanguageSelection from "./components/LanguageSelection";
import ClassSelection from "./components/ClassSelection";
import StudentLogin from "./components/StudentLogin";
import StudentDashboard from "./components/StudentDashboard";
import TeacherLogin from "./components/TeacherLogin";
import TeacherDashboard from "./components/TeacherDashboard";

const queryClient = new QueryClient();

type AppState = 
  | 'splash'
  | 'language'
  | 'class-selection'
  | 'student-login'
  | 'student-dashboard'
  | 'teacher-login'
  | 'teacher-dashboard';

interface StudentData {
  name: string;
  rollNumber: string;
  selectedClass: number;
}

interface TeacherData {
  name: string;
  loginId: string;
}

const App = () => {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);

  const handleSplashComplete = useCallback(() => {
    setCurrentState('language');
  }, []);

  const handleLanguageSelect = useCallback((language: string) => {
    setSelectedLanguage(language);
    setCurrentState('class-selection');
  }, []);

  const handleClassSelect = useCallback((classNumber: number) => {
    setStudentData({ name: '', rollNumber: '', selectedClass: classNumber });
    setCurrentState('student-login');
  }, []);

  const handleTeacherSelect = useCallback(() => {
    setCurrentState('teacher-login');
  }, []);

  const handleStudentLogin = useCallback((name: string, rollNumber: string) => {
    if (studentData) {
      setStudentData({ ...studentData, name, rollNumber });
      setCurrentState('student-dashboard');
    }
  }, [studentData]);

  const handleTeacherLogin = useCallback((name: string, loginId: string) => {
    setTeacherData({ name, loginId });
    setCurrentState('teacher-dashboard');
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentState('class-selection');
    setStudentData(null);
    setTeacherData(null);
  }, []);

  const renderCurrentComponent = () => {
    switch (currentState) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'language':
        return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
      
      case 'class-selection':
        return (
          <ClassSelection 
            onClassSelect={handleClassSelect}
            onTeacherSelect={handleTeacherSelect}
          />
        );
      
      case 'student-login':
        return studentData ? (
          <StudentLogin
            selectedClass={studentData.selectedClass}
            onLogin={handleStudentLogin}
            onBack={handleBackToHome}
          />
        ) : null;
      
      case 'student-dashboard':
        return studentData?.name ? (
          <StudentDashboard
            studentName={studentData.name}
            studentRoll={studentData.rollNumber}
            selectedClass={studentData.selectedClass}
            onBack={handleBackToHome}
          />
        ) : null;
      
      case 'teacher-login':
        return (
          <TeacherLogin
            onLogin={handleTeacherLogin}
            onBack={handleBackToHome}
          />
        );
      
      case 'teacher-dashboard':
        return teacherData ? (
          <TeacherDashboard
            teacherName={teacherData.name}
            teacherId={teacherData.loginId}
            onBack={handleBackToHome}
          />
        ) : null;
      
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            {renderCurrentComponent()}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
