import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

interface ClassSelectionProps {
  onClassSelect: (classNumber: number) => void;
  onTeacherSelect: () => void;
}

const classes = [
  { number: 6, label: 'Class 6', colors: 'bg-vibrant-turquoise hover:bg-vibrant-blue', icon: BookOpen },
  { number: 7, label: 'Class 7', colors: 'bg-vibrant-orange hover:bg-vibrant-green', icon: BookOpen },
  { number: 8, label: 'Class 8', colors: 'bg-vibrant-green hover:bg-vibrant-turquoise', icon: BookOpen },
  { number: 9, label: 'Class 9', colors: 'bg-pastel-blue hover:bg-pastel-teal', icon: GraduationCap },
  { number: 10, label: 'Class 10', colors: 'bg-pastel-peach hover:bg-pastel-yellow', icon: GraduationCap },
  { number: 11, label: 'Class 11', colors: 'bg-mature-navy hover:bg-mature-forest', icon: GraduationCap },
  { number: 12, label: 'Class 12', colors: 'bg-mature-burgundy hover:bg-mature-navy', icon: GraduationCap },
];

const ClassSelection: React.FC<ClassSelectionProps> = ({ onClassSelect, onTeacherSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm p-4">
      <div className="w-full max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Welcome to Funshiksha!
          </h1>
          <p className="text-xl font-body text-muted-foreground">
            Select your class to begin your learning journey
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {classes.map((classItem, index) => {
            const IconComponent = classItem.icon;
            return (
              <Card 
                key={classItem.number}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent 
                  className={`p-6 text-center ${classItem.colors} text-white rounded-lg`}
                  onClick={() => onClassSelect(classItem.number)}
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="text-lg font-heading font-semibold">
                    {classItem.label}
                  </h3>
                  <p className="text-sm opacity-90 font-body mt-1">
                    Interactive Learning
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="inline-block hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <Button
                onClick={onTeacherSelect}
                variant="outline"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/80 border-accent text-lg font-body px-8 py-4"
              >
                <Users className="w-6 h-6 mr-3" />
                I'm a Teacher
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;