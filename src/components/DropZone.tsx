import React from 'react';
import { FoodChainElement as FoodChainElementType } from 'src/types/game';
import { cn } from '../lib/utils';
import FoodChainElement from './FoodChainElement';

interface DropZoneProps {
  element: FoodChainElementType | null;
  index: number;
  isDragOver: boolean;
  isCorrect?: boolean;
  onDrop: (index: number, elementId: string) => void;
  onDragOver: (index: number) => void;
  onDragLeave: () => void;
  onElementRemove?: (index: number) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  element,
  index,
  isDragOver,
  isCorrect,
  onDrop,
  onDragOver,
  onDragLeave,
  onElementRemove
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementId = e.dataTransfer.getData('text/plain');
    onDrop(index, elementId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    onDragLeave();
  };

  const handleDoubleClick = () => {
    if (element && onElementRemove) {
      onElementRemove(index);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDoubleClick={handleDoubleClick}
      className={cn(
        "drop-zone",
        "w-36 h-32 rounded-xl border-2 border-dashed",
        "flex items-center justify-center",
        "transition-all duration-300",
        {
          "drag-over border-primary bg-primary/10": isDragOver,
          "filled border-success bg-success/10": element && isCorrect,
          "filled border-destructive bg-destructive/10": element && isCorrect === false,
          "border-border bg-muted/20": !element && !isDragOver,
        }
      )}
    >
      {element ? (
        <FoodChainElement
          element={element}
          isInDropZone={true}
          className="cursor-pointer hover:scale-105"
        />
      ) : (
        <div className="text-muted-foreground text-center text-sm">
          <div className="text-2xl mb-1">🎯</div>
          Drop here
        </div>
      )}
    </div>
  );
};

export default DropZone;