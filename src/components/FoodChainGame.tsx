import React, { useState, useEffect, useCallback } from 'react';
import { FoodChainElement as FoodChainElementType, GameLevel, DragDropState } from 'src/types/game';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Trophy, Target, RotateCcw } from 'lucide-react';
import FoodChainElement from './FoodChainElement';
import DropZone from './DropZone';
import { toast } from '../hooks/use-toast';
import '@/foodChain.css';

interface FoodChainGameProps {
  level: GameLevel;
  onBackToMenu: () => void;
}

const FoodChainGame: React.FC<FoodChainGameProps> = ({ level, onBackToMenu }) => {
  const [currentChainIndex, setCurrentChainIndex] = useState(0);
  const [dragDropState, setDragDropState] = useState<DragDropState>({
    draggedElement: null,
    draggedFrom: -1,
    dropZones: []
  });
  const [availableElements, setAvailableElements] = useState<FoodChainElementType[]>([]);
  const [dragOverIndex, setDragOverIndex] = useState<number>(-1);

  // Guard: avoid crash if no chains
  const chainCount = Array.isArray(level?.foodChains) ? level.foodChains.length : 0;
  const currentChain = chainCount > 0 ? level.foodChains[currentChainIndex] : null;

  // Initialize on chain change
  useEffect(() => {
    if (!currentChain) return;
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChainIndex, level]);

  const initializeGame = useCallback(() => {
    if (!currentChain) return;
    const shuffledElements = [...currentChain.elements].sort(() => Math.random() - 0.5);

    setAvailableElements(shuffledElements);
    setDragDropState({
      draggedElement: null,
      draggedFrom: -1,
      dropZones: new Array(currentChain.elements.length).fill(null)
    });
    setDragOverIndex(-1);
  }, [currentChain]);

  const handleDragStart = (element: FoodChainElementType) => {
    setDragDropState(prev => ({ ...prev, draggedElement: element }));
  };

  const handleDragEnd = () => {
    setDragDropState(prev => ({ ...prev, draggedElement: null }));
    setDragOverIndex(-1);
  };

  const handleDrop = (dropIndex: number, elementId: string) => {
    if (!currentChain) return;

    if (dragDropState.dropZones[dropIndex]) {
      toast({
        title: "Spot occupied",
        description: "This slot is already filled. Remove it first to place another.",
        variant: "destructive",
      });
      return;
    }

    const element = availableElements.find(el => el.id === elementId);
    if (!element) return;

    setDragDropState(prev => {
      const newDropZones = [...prev.dropZones];
      newDropZones[dropIndex] = element;
      return { ...prev, dropZones: newDropZones, draggedElement: null };
    });

    setAvailableElements(prev => prev.filter(el => el.id !== elementId));
    setDragOverIndex(-1);

    const correctElement = currentChain.elements[dropIndex];
    if (element.id === correctElement.id) {
      toast({
        title: "Correct! 🎉",
        description: `${element.name} is in the right position!`,
        duration: 1500,
      });
    } else {
      toast({
        title: "Try again 🤔",
        description: `${element.name} may belong in a different position.`,
        variant: "destructive",
      });
    }
  };

  const handleElementRemove = (index: number) => {
    const element = dragDropState.dropZones[index];
    if (!element) return;

    setDragDropState(prev => {
      const newDropZones = [...prev.dropZones];
      newDropZones[index] = null;
      return { ...prev, dropZones: newDropZones };
    });

    setAvailableElements(prev => {
      if (prev.find(el => el.id === element.id)) return prev;
      return [...prev, element];
    });
  };

  const checkAnswer = () => {
    if (!currentChain) return;

    const isComplete = dragDropState.dropZones.every(zone => zone !== null);
    if (!isComplete) {
      toast({
        title: "Incomplete chain!",
        description: "Please fill all positions in the food chain.",
        variant: "destructive",
      });
      return;
    }

    const correct = dragDropState.dropZones.every((element, index) =>
      element?.id === currentChain.elements[index].id
    );

    if (correct) {
      toast({
        title: "Perfect! 🌟",
        description: "You've built the food chain correctly!",
        duration: 2000,
      });
      if (currentChainIndex < chainCount - 1) {
        setTimeout(() => setCurrentChainIndex(prev => prev + 1), 1200);
      } else {
        toast({
          title: "All chains completed!",
          description: "Well done 🎉",
        });
      }
    } else {
      toast({
        title: "Not quite right! 🎯",
        description: "Check the order of your food chain elements.",
        variant: "destructive",
      });
    }
  };

  const resetCurrentChain = () => {
    initializeGame();
  };

  if (!currentChain) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card className="p-6">
          <CardContent>
            <h3 className="text-lg font-semibold">No food chains available</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This level has no chains configured.
            </p>
            <div className="mt-4">
              <Button onClick={onBackToMenu}>Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = chainCount > 0 ? ((currentChainIndex / chainCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-nature p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Badge className="level-badge">{level.name}</Badge>
                  <span className="text-foreground">{currentChain.name}</span>
                </CardTitle>
                <p className="text-muted-foreground mt-1">{currentChain.description}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  <span>{currentChainIndex + 1}/{chainCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span>Progress</span>
                </div>
              </div>
            </div>
            <Progress value={progress} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Game Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Available Elements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Elements</CardTitle>
              <p className="text-sm text-muted-foreground">
                Drag these elements to build the food chain
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {availableElements.map((element) => (
                  <FoodChainElement
                    key={element.id}
                    element={element}
                    isDragging={dragDropState.draggedElement?.id === element.id}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Drop Zone Area */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Build Your Food Chain</CardTitle>
              <p className="text-sm text-muted-foreground">
                Arrange elements from left to right in the correct order
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center items-center flex-wrap">
                {dragDropState.dropZones.map((element, index) => (
                  <React.Fragment key={index}>
                    <DropZone
                      element={element}
                      index={index}
                      isDragOver={dragOverIndex === index}
                      onDrop={handleDrop}
                      onDragOver={setDragOverIndex}
                      onDragLeave={() => setDragOverIndex(-1)}
                      onElementRemove={handleElementRemove}
                    />
                    {index < dragDropState.dropZones.length - 1 && (
                      <div className="text-2xl text-primary">→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex gap-3 mt-6 justify-center">
                <Button
                  onClick={checkAnswer}
                  variant="default"
                  size="lg"
                  className="min-w-32"
                  disabled={dragDropState.dropZones.some(zone => zone === null)}
                >
                  Check Answer
                </Button>
                <Button onClick={resetCurrentChain} variant="outline" size="lg">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={onBackToMenu} variant="secondary" size="lg">
                  Back to Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FoodChainGame;