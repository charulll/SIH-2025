import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Home,
  Plus,
  Eye,
  BarChart3,
  Calendar,
  MessageSquare
} from 'lucide-react';

type LocalTeacher = {
  login_id: string;
  name?: string;
  subject?: string;
};

const classes = [
  { id: '6A', name: 'Class 6-A', students: 32, avgProgress: 67, subjects: 4 },
  { id: '7B', name: 'Class 7-B', students: 28, avgProgress: 73, subjects: 4 },
  { id: '8C', name: 'Class 8-C', students: 35, avgProgress: 61, subjects: 4 },
];

const recentActivities = [
  { student: 'Ram Kumar', class: '6A', activity: 'Completed Geography Quiz', score: '85%', time: '2 hours ago' },
  { student: 'Priya Singh', class: '7B', activity: 'Started Math Module', score: 'In Progress', time: '3 hours ago' },
  { student: 'Amit Patel', class: '8C', activity: 'Achieved Science Badge', score: '90%', time: '5 hours ago' },
];

const TeacherDashboard: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [teacher, setTeacher] = useState<LocalTeacher | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('teacher');
    if (!raw) {
      // Instead of navigating to /teacher-auth, set a guest teacher fallback
      setTeacher({ login_id: 'guest', name: 'Guest Teacher', subject: 'General' });
      return;
    }
    try {
      const parsed: LocalTeacher = JSON.parse(raw);
      setTeacher(parsed);
    } catch (err) {
      localStorage.removeItem('teacher');
      setTeacher({ login_id: 'guest', name: 'Guest Teacher', subject: 'General' });
    }
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Teacher ID: {teacher?.login_id ?? '—'}
          </Badge>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Welcome, {teacher?.name ?? teacher?.login_id ?? 'Teacher'}
          </h1>
          <p className="text-lg font-body opacity-90">
            Teacher Dashboard - Monitor and Guide Student Progress
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-vibrant-turquoise mx-auto mb-2" />
                <div className="text-2xl font-heading font-bold text-vibrant-turquoise">
                  95
                </div>
                <div className="text-sm font-body text-muted-foreground">
                  Total Students
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-vibrant-orange mx-auto mb-2" />
                <div className="text-2xl font-heading font-bold text-vibrant-orange">
                  3
                </div>
                <div className="text-sm font-body text-muted-foreground">
                  Active Classes
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-vibrant-green mx-auto mb-2" />
                <div className="text-2xl font-heading font-bold text-vibrant-green">
                  67%
                </div>
                <div className="text-sm font-body text-muted-foreground">
                  Avg Progress
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-vibrant-blue mx-auto mb-2" />
                <div className="text-2xl font-heading font-bold text-vibrant-blue">
                  124
                </div>
                <div className="text-sm font-body text-muted-foreground">
                  Badges Awarded
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Classes Overview */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-heading font-bold">My Classes</h2>
                <Button size="sm" className="bg-vibrant-turquoise hover:bg-vibrant-blue">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Class
                </Button>
              </div>

              <div className="space-y-4">
                {classes.map((classItem) => (
                  <Card key={classItem.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="font-heading text-lg">
                          {classItem.name}
                        </CardTitle>
                        <Badge className="bg-muted text-muted-foreground">
                          {classItem.students} students
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm font-body mb-1">
                            <span>Class Average Progress</span>
                            <span>{classItem.avgProgress}%</span>
                          </div>
                          <Progress value={classItem.avgProgress} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm font-body text-muted-foreground">
                            {classItem.subjects} subjects active
                          </span>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <BarChart3 className="w-4 h-4 mr-1" />
                              Analytics
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-vibrant-orange hover:bg-vibrant-orange/80 h-12">
                      <Plus className="w-4 h-4 mr-2" />
                      Assign Quiz
                    </Button>
                    <Button className="bg-vibrant-green hover:bg-vibrant-green/80 h-12">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Reports
                    </Button>
                    <Button className="bg-vibrant-blue hover:bg-vibrant-blue/80 h-12">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                    <Button className="bg-accent hover:bg-accent/80 h-12">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Recent Student Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-body font-medium text-sm">
                            {activity.student}
                            <Badge variant="outline" className="ml-2 text-xs">
                              {activity.class}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground font-body">
                            {activity.activity}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-body font-medium text-vibrant-green">
                            {activity.score}
                          </div>
                          <div className="text-xs text-muted-foreground font-body">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
