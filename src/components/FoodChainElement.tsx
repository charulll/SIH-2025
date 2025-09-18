import React from 'react';
import { FoodChainElement as FoodChainElementType } from 'src/types/game';
import { cn } from '../lib/utils';

interface FoodChainElementProps {
  element: FoodChainElementType;
  isDragging?: boolean;
  isInDropZone?: boolean;
  onDragStart?: (element: FoodChainElementType) => void;
  onDragEnd?: () => void;
  className?: string;
}

const FoodChainElement: React.FC<FoodChainElementProps> = ({
  element,
  isDragging = false,
  isInDropZone = false,
  onDragStart,
  onDragEnd,
  className
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', element.id);
    onDragStart?.(element);
  };

  const handleDragEnd = () => {
    onDragEnd?.();
  };

  return (
    <div
      draggable={!isInDropZone}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "food-chain-element",
        "p-4 rounded-xl bg-card border-2 border-border",
        "flex flex-col items-center gap-2 min-w-[120px] max-w-[140px]",
        "cursor-grab active:cursor-grabbing",
        {
          "dragging": isDragging,
          "opacity-50": isDragging,
          "cursor-default": isInDropZone,
        },
        className
      )}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-background-secondary p-2">
        <img
          src={element.image}
          alt={element.name}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <h3 className="text-sm font-semibold text-center text-foreground">
        {element.name}
      </h3>
    </div>
  );
};

export default FoodChainElement;

