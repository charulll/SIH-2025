import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Components
import SplashScreen from "./components/SplashScreen";
import LanguageSelection from "./components/LanguageSelection";
import ClassSelection from "./components/ClassSelection";
import TeacherAuth from "./pages/TeacherAuth";
import StudentAuth from "./pages/StudentAuth";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <Routes>
              {/* Landing Pages */}
              <Route path="/" element={<SplashScreen />} />
              <Route path="/language" element={<LanguageSelection />} />

              {/* Class Selection with props */}
              <Route path="/class-selection" element={<ClassSelectionWrapper />} />

              {/* Auth Pages */}
              <Route path="/teacher-auth" element={<TeacherAuth />} />
              <Route path="/student-auth" element={<StudentAuth />} />

              {/* Dashboards */}
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// ✅ Wrapper to pass props correctly
const ClassSelectionWrapper = () => {
  const navigate = useNavigate();

  return (
    <ClassSelection
      onClassSelect={(classNumber) => {
        console.log("Selected class:", classNumber);
        navigate("/student-auth", { state: { classNumber } });
      }}
      onTeacherSelect={() => {
        console.log("Teacher selected");
        navigate("/teacher-auth");
      }}
    />
  );
};

export default App;
