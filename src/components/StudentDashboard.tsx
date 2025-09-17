// src/components/StudentDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Atom, 
  Globe, 
  PenTool,
  Trophy,
  Home,
  ChevronDown,
  Play
} from 'lucide-react';
import InteractiveIndiaMap from './InteractiveIndiaMap';
import ArithmeticPage from './Arithmetic';

type LocalStudent = {
  name: string;
  roll_number: string;
  class: number;
};

const subjects = [
  {
    id: 'sst',
    name: 'Social Science',
    icon: Globe,
    progress: 45,
    color: 'bg-vibrant-turquoise',
    topics: ['Geography of India', 'Indian History', 'Civics & Government', 'Economics Basics']
  },
  {
    id: 'math',
    name: 'Mathematics',
    icon: Calculator,
    progress: 72,
    color: 'bg-vibrant-orange',
    topics: ['Algebra', 'Geometry', 'Arithmetic', 'Data Handling']
  },
  {
    id: 'science',
    name: 'Science',
    icon: Atom,
    progress: 58,
    color: 'bg-vibrant-green',
    topics: ['Physics', 'Chemistry', 'Biology', 'Environmental Science']
  },
  {
    id: 'english',
    name: 'English',
    icon: PenTool,
    progress: 83,
    color: 'bg-vibrant-blue',
    topics: ['Grammar', 'Literature', 'Writing Skills', 'Speaking Practice']
  }
];

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<LocalStudent | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // Load student from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('student');
    if (!raw) {
      navigate('/student-auth');
      return;
    }
    try {
      const parsed: LocalStudent = JSON.parse(raw);
      setStudent(parsed);
    } catch (err) {
      localStorage.removeItem('student');
      navigate('/student-auth');
    }
  }, [navigate]);

  const toggleSubject = (subjectId: string) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  const handleTopicClick = (subjectId: string, topic: string) => {
    if (subjectId === 'sst' && topic === 'Geography of India') {
      setActiveSubject('sst');
      setActiveTopic('Geography of India');
    } else if (subjectId === 'math' && topic === 'Arithmetic') {
      setActiveSubject('math');
      setActiveTopic('Arithmetic');
    } else {
      setActiveSubject(null);
      setActiveTopic(null);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const getClassColors = (classNum: number) => {
    if (classNum <= 8) return 'from-vibrant-turquoise to-vibrant-blue';
    if (classNum <= 10) return 'from-pastel-blue to-pastel-teal';
    return 'from-mature-navy to-mature-forest';
  };

  // If a topic is selected, show its special component
  if (activeSubject === 'sst' && activeTopic === 'Geography of India') {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4">
          <Button onClick={() => { setActiveSubject(null); setActiveTopic(null); }} variant="outline" className="mb-4">
            <Home className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
        <InteractiveIndiaMap />
      </div>
    );
  } else if (activeSubject === 'math' && activeTopic === 'Arithmetic') {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4">
          <Button onClick={() => { setActiveSubject(null); setActiveTopic(null); }} variant="outline" className="mb-4">
            <Home className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
        <ArithmeticPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getClassColors(student?.class || 6)} text-white p-6`}>
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleBack} variant="ghost" className="text-white hover:bg-white/20">
            <Home className="w-4 h-4 mr-2" /> Home
          </Button>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Class {student?.class ?? '--'}
          </Badge>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Welcome back, {student?.name ?? 'Student'}!
          </h1>
          <p className="text-lg font-body opacity-90">
            Roll Number: {student?.roll_number ?? '--'}
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              <span className="font-body">Level 3 Learner</span>
            </div>
            <Badge className="bg-vibrant-orange text-white">
              🏆 5 Badges Earned
            </Badge>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">

          {/* Quick Stats */}
          <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center p-4">
              <div className="text-2xl font-heading font-bold text-vibrant-turquoise">12</div>
              <div className="text-sm font-body text-muted-foreground">Lessons Completed</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-heading font-bold text-vibrant-orange">45</div>
              <div className="text-sm font-body text-muted-foreground">Games Played</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-heading font-bold text-vibrant-green">87%</div>
              <div className="text-sm font-body text-muted-foreground">Average Score</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-heading font-bold text-vibrant-blue">5</div>
              <div className="text-sm font-body text-muted-foreground">Achievements</div>
            </Card>
          </div>

          {/* Subject Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject) => {
              const IconComponent = subject.icon;
              const isExpanded = expandedSubject === subject.id;

              return (
                <Card key={subject.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="cursor-pointer" onClick={() => toggleSubject(subject.id)}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${subject.color} text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="font-heading text-lg">{subject.name}</CardTitle>
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-sm font-body">
                            <span>Progress</span>
                            <span>{subject.progress}%</span>
                          </div>
                          <Progress value={subject.progress} className="h-2" />
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="animate-slide-up">
                      <div className="space-y-2">
                        <h4 className="font-heading font-semibold text-muted-foreground">
                          Topics Available:
                        </h4>
                        <div className="grid gap-2">
                          {subject.topics.map((topic, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleTopicClick(subject.id, topic)}
                              className="justify-start font-body hover:bg-muted"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              {topic}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;
