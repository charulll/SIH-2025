import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Award, RefreshCw } from 'lucide-react';

interface State {
  id: string;
  name: string;
  status: 'correct' | 'incorrect' | 'unclicked';
  capital?: string;
}

const InteractiveIndiaMap: React.FC = () => {
  const [states] = useState<State[]>([
    { id: 'rajasthan', name: 'Rajasthan', status: 'unclicked', capital: 'Jaipur' },
    { id: 'maharashtra', name: 'Maharashtra', status: 'unclicked', capital: 'Mumbai' },
    { id: 'karnataka', name: 'Karnataka', status: 'unclicked', capital: 'Bengaluru' },
    { id: 'gujarat', name: 'Gujarat', status: 'unclicked', capital: 'Gandhinagar' },
    { id: 'tamilnadu', name: 'Tamil Nadu', status: 'unclicked', capital: 'Chennai' },
    { id: 'kerala', name: 'Kerala', status: 'unclicked', capital: 'Thiruvananthapuram' },
    { id: 'westbengal', name: 'West Bengal', status: 'unclicked', capital: 'Kolkata' },
    { id: 'uttarpradesh', name: 'Uttar Pradesh', status: 'unclicked', capital: 'Lucknow' },
  ]);

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('Click on Rajasthan');
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleStateClick = (stateId: string) => {
    // Simple demo logic - in real app, this would have proper game mechanics
    if (stateId === 'rajasthan' && currentQuestion.includes('Rajasthan')) {
      setScore(score + 10);
      setCurrentQuestion('Great! Now click on Maharashtra');
    } else if (stateId === 'maharashtra' && currentQuestion.includes('Maharashtra')) {
      setScore(score + 10);
      setCurrentQuestion('Excellent! Click on Karnataka');
    } else if (stateId === 'karnataka' && currentQuestion.includes('Karnataka')) {
      setScore(score + 10);
      setGameCompleted(true);
      setCurrentQuestion('Congratulations! Game completed!');
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestion('Click on Rajasthan');
    setGameCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-vibrant p-4">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-heading">
                🗺️ Geography of India - Interactive Map
              </CardTitle>
              <div className="flex items-center space-x-4">
                <Badge className="bg-vibrant-green text-white text-lg px-3 py-1">
                  Score: {score}
                </Badge>
                <Button onClick={resetGame} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <h3 className="text-xl font-body text-foreground mb-2">
                {currentQuestion}
              </h3>
              {gameCompleted && (
                <div className="flex justify-center items-center space-x-2 mt-4">
                  <Trophy className="w-6 h-6 text-vibrant-orange" />
                  <span className="text-lg font-heading text-vibrant-orange">
                    You earned 30 points! 🎉
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 min-h-[500px] relative">
                  {/* Simplified India Map using CSS Grid */}
                  <div className="grid grid-cols-4 gap-2 h-full">
                    {states.slice(0, 8).map((state, index) => (
                      <div
                        key={state.id}
                        onClick={() => handleStateClick(state.id)}
                        className={`
                          rounded-lg border-2 border-white cursor-pointer
                          flex items-center justify-center text-center
                          font-body text-sm font-semibold p-2
                          transition-all duration-300 hover:scale-105
                          ${state.status === 'correct' ? 'map-state-correct' : ''}
                          ${state.status === 'incorrect' ? 'map-state-incorrect' : ''}
                          ${state.status === 'unclicked' ? 'map-state-unclicked' : ''}
                          map-state
                        `}
                        style={{
                          minHeight: '80px',
                          gridColumn: index % 2 === 0 ? '1 / 3' : '3 / 5',
                          gridRow: Math.floor(index / 2) + 1
                        }}
                      >
                        <div>
                          <div className="font-semibold">{state.name}</div>
                          <div className="text-xs opacity-75">{state.capital}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Map Legend */}
                  <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
                    <h4 className="text-sm font-heading font-semibold mb-2">Legend:</h4>
                    <div className="space-y-1 text-xs font-body">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-vibrant-green rounded mr-2"></div>
                        <span>Correct</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                        <span>Incorrect</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-pink-200 rounded mr-2"></div>
                        <span>Unclicked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Stats & Info */}
          <div className="space-y-6">
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
                      {Math.round((score / 30) * 100)}%
                    </div>
                    <div className="text-sm font-body text-muted-foreground">
                      Completion
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-body">
                      <span>States Identified:</span>
                      <span>{score / 10}/3</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span>Accuracy:</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <span>Identify major Indian states on the map</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Learn state capitals and their locations</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-vibrant-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Understand geographical positioning</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {gameCompleted && (
              <Card className="shadow-lg border-vibrant-orange">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-12 h-12 text-vibrant-orange mx-auto mb-2" />
                  <h3 className="font-heading font-bold text-vibrant-orange mb-1">
                    Level Complete!
                  </h3>
                  <p className="text-sm font-body text-muted-foreground">
                    You've mastered basic Indian geography!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveIndiaMap;