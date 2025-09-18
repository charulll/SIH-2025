import React from 'react';
import { GameLevel } from 'src/types/game';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Target, Clock, Play, BookOpen, Leaf } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';


interface LevelSelectorProps {
  levels: GameLevel[];
  onLevelSelect: (level: GameLevel) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ levels, onLevelSelect }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getDifficultyDescription = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'Perfect for beginners - 3 elements to arrange';
      case 'medium': return 'Intermediate challenge - 4 elements with multiple chains';
      case 'hard': return 'Advanced level - 5 elements in complex ecosystems';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-nature p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
              <Leaf className="w-16 h-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Food Chain Adventure
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Learn about nature's energy flow by building food chains! 
            Drag and drop elements to create the correct feeding relationships.
          </p>
        </div>

        {/* Level Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {levels.map((level) => (
            <Card key={level.id} className="h-full shadow-nature hover:shadow-dragging transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">{level.name}</CardTitle>
                  <Badge className={getDifficultyColor(level.difficulty)}>
                    {level.difficulty}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {getDifficultyDescription(level.difficulty)}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Food Chains
                    </span>
                    <span className="font-medium">{level.foodChains.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      Max Score
                    </span>
                    <span className="font-medium">{level.maxScore}</span>
                  </div>
                </div>

                {/* Preview of food chains */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Food Chains:</h4>
                  {level.foodChains.map((chain) => (
                    <div key={chain.id} className="text-xs">
                      <div className="font-medium">{chain.name}</div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        {chain.elements.map((element, index) => (
                          <React.Fragment key={element.id}>
                            <span>{element.name}</span>
                            {index < chain.elements.length - 1 && (
                              <span className="text-primary">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => onLevelSelect(level)}
                  className="w-full"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Level
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default LevelSelector;