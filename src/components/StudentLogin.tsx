import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Hash, Home } from 'lucide-react';

interface StudentLoginProps {
  selectedClass: number;
  onLogin: (name: string, rollNumber: string) => void;
  onBack: () => void;
}

const StudentLogin: React.FC<StudentLoginProps> = ({ selectedClass, onLogin, onBack }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && rollNumber.trim()) {
      onLogin(name.trim(), rollNumber.trim());
    }
  };

  const getClassColors = (classNum: number) => {
    if (classNum <= 8) return 'bg-gradient-vibrant';
    if (classNum <= 10) return 'bg-gradient-warm';
    return 'bg-gradient-primary';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${getClassColors(selectedClass)} p-4`}>
      <div className="w-full max-w-md mx-auto animate-scale-in">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-white hover:bg-white/20"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading text-foreground">
              Class {selectedClass} Student Login
            </CardTitle>
            <p className="text-muted-foreground font-body">
              Enter your details to access your personalized dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium font-body">
                  Your Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 font-body"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rollNumber" className="text-sm font-medium font-body">
                  Roll Number
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="rollNumber"
                    type="text"
                    placeholder="Enter your roll number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="pl-10 font-body"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-vibrant-turquoise hover:bg-vibrant-blue text-white font-body text-lg transition-all duration-300 hover:scale-105"
                disabled={!name.trim() || !rollNumber.trim()}
              >
                Start Learning Journey
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground font-body">
                Your progress will be saved locally on this device
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentLogin;