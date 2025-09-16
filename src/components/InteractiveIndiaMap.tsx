import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Award, RefreshCw } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ClimateZonesGame from './ClimateZonesGame'; // use correct relative path


interface ClimateZonesGameProps {
  onScoreUpdate?: (score: number, maxScore: number) => void;
}



const InteractiveIndiaMap: React.FC = () => {
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameKey, setGameKey] = useState(0); // force remount for reset

  // Callback to update score and completion from child game component
  const handleScoreUpdate = (newScore: number, maxScore: number) => {
    setScore(newScore);
    setGameCompleted(newScore === maxScore);
  };

  const resetGame = () => {
    setScore(0);
    setGameCompleted(false);
    setGameKey((k) => k + 1); // remount game component to reset internal state
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-vibrant p-4">
        <div className="max-w-6xl mx-auto">
          {/* Game Header */}
          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-heading">
                  🗺️ Social Science: Geography of India - Interactive Learning
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-vibrant-green text-white text-lg px-3 py-1">Score: {score}</Badge>
                  <Button onClick={resetGame} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                {gameCompleted && (
                  <div className="bg-gradient-success p-4 rounded-lg text-white mx-4">
                    <div className="flex justify-center items-center space-x-2 mb-2">
                      <Trophy className="w-8 h-8 text-white" />
                      <span className="text-xl font-heading">Geography Master Achieved! 🎉</span>
                    </div>
                    <p className="text-sm opacity-90">
                      You've learned about climate zones, vegetation, and wildlife of India!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Game Area */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  {/* Pass score update callback and key for resetting */}
 <ClimateZonesGame key={gameKey} onScoreUpdate={handleScoreUpdate} />                </CardContent>
              </Card>
            </div>

            {/* Right Side Panels */}
            <div className="space-y-6">
              {/* Game Progress */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-heading flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Game Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-heading font-bold text-vibrant-turquoise">
                        {/* Assuming max score is 8 for ClimateZonesGame */}
                        {Math.round((score / 8) * 100)}%
                      </div>
                      <div className="text-sm font-body text-muted-foreground">Completion</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-body">
                        <span>Correct Matches:</span>
                        <span>{score} / 8</span>
                      </div>
                      <div className="flex justify-between text-sm font-body">
                        <span>Accuracy:</span>
                        <span>{score > 0 ? '100%' : '0%'}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Objectives */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-heading flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm font-body">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-vibrant-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Understand India's climate zones and their characteristics.</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-vibrant-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Identify native vegetation and wildlife in each climate zone.</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-vibrant-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Encourages critical thinking via interactive classification.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Completion Card */}
              {gameCompleted && (
                <Card className="shadow-lg border-vibrant-orange">
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-12 h-12 text-vibrant-orange mx-auto mb-2" />
                    <h3 className="font-heading font-bold text-vibrant-orange mb-1">Level Complete!</h3>
                    <p className="text-sm font-body text-muted-foreground">
                      You've mastered India's climate zones, vegetation, and wildlife!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default InteractiveIndiaMap;
