import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, RefreshCw, Check } from 'lucide-react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Puzzle data
const puzzleRows = [
  ['12', '+', null, '=', '36'],
  [null, '÷', null, '÷', null],
  [null, '-', '=', '4', null],
  ['x', null, '=', null, '='],
  ['=', null, '6', null, '5'],
  ['=', '=', null, '=', null],
  ['56', '20', '-', null, '11'],
  ['3', 'x', '13', '=', null],
  ['84', '÷', null, '=', null],
  ['=', '=', '63', '-', '='],
];

const solution = {
  '0-2': '24',
  '1-0': '8',
  '1-2': '4',
  '1-4': '2',
  '3-1': '7',
  '3-3': '9',
  '5-2': '7',
  '5-4': '3',
  '6-3': '14',
  '7-4': '39',
  '8-2': '7',
  '8-4': '12',
  '9-0': '24',
  '9-3': '55',
};

const tileNumbers = [
  '9', 'x', '24', '8', '32', '55',
  '22', '12', '24', '7', '7', '45',
  '4', '39', '9', '2', '3', '14'
];

const ItemTypes = {
  TILE: 'tile',
};

// Draggable Tile: tracks placement by index!
function Tile({ idx, text, isPlaced }: { idx: number; text: string; isPlaced: boolean }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TILE,
    item: { idx, text },
    canDrag: !isPlaced,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: 50,
        height: 50,
        margin: 6,
        borderRadius: 8,
        backgroundColor: isPlaced ? '#4ade80' : '#3b82f6',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: isPlaced ? 'default' : 'move',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        position: 'relative',
      }}
      aria-disabled={isPlaced}
    >
      {text}
      {isPlaced && (
        <Check style={{
          position: 'absolute', right: 4, top: 4,
          width: 16, height: 16, color: 'white'
        }}/>
      )}
    </div>
  );
}

// Droppable, Fillable Cell (shows dash for non-solution blanks)
function Cell({
  row,
  col,
  value,
  userValue,
  onDrop,
  isSelected,
  wrongPlacement,
  onClick,
  isSolutionCell
}: {
  row: number;
  col: number;
  value: string | null;
  userValue?: string;
  onDrop: (tileIdx: number, tileText: string) => void;
  isSelected: boolean;
  wrongPlacement: boolean;
  onClick: () => void;
  isSolutionCell: boolean;
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.TILE,
    canDrop: () => value === null && isSolutionCell,
    drop: (item: { idx: number; text: string }) => {
      onDrop(item.idx, item.text);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // Conditional cell style
  let backgroundColor = '#f0e68c';
  if (isSelected) backgroundColor = '#ffe066';
  else if (wrongPlacement) backgroundColor = '#f87171';
  else if (value === null) backgroundColor = '#fffff0';
  if (isOver && canDrop) backgroundColor = '#bfdbfe';

  // If not solution cell/solution key: show dash placeholder
  const displayValue = value !== null
    ? value
    : isSolutionCell
      ? userValue || ''
      : <span style={{ color: '#bbb', fontSize: 26, fontWeight: 700 }}>–</span>;

  return (
    <div
      ref={drop}
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        border: '1px solid #666',
        boxSizing: 'border-box',
        textAlign: 'center',
        lineHeight: '40px',
        fontSize: 18,
        fontWeight: '600',
        backgroundColor,
        cursor: value === null && isSolutionCell ? 'pointer' : 'default',
        userSelect: 'none',
        position: 'relative',
        transition: 'background 0.2s'
      }}
    >
      {displayValue}
    </div>
  );
}

export default function ArithmeticPage() {
  // Used tiles tracked by index!
  const [placedTiles, setPlacedTiles] = useState<{ [idx: number]: boolean }>({});
  const [gridValues, setGridValues] = useState<{ [pos: string]: string }>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [wrongPlacementCell, setWrongPlacementCell] = useState<string | null>(null);

  const totalFillable = Object.keys(solution).length;
  const score = Object.keys(gridValues).filter(pos => solution[pos] === gridValues[pos]).length;
  const gameCompleted = score === totalFillable;

  useEffect(() => {
    if (wrongPlacementCell) {
      const timeout = setTimeout(() => setWrongPlacementCell(null), 800);
      return () => clearTimeout(timeout);
    }
  }, [wrongPlacementCell]);

  // Is this a cell expecting a value? (solution key)
  const isSolutionCell = (row: number, col: number) => solution[`${row}-${col}`] !== undefined;

  function handleCellClick(r: number, c: number, value: string | null) {
    if (value !== null) return;
    const key = `${r}-${c}`;
    if (isSolutionCell(r, c)) setSelectedCell(key);
  }

  function handleDrop(tileIdx: number, tileText: string) {
    if (!selectedCell) return;
    if (solution[selectedCell] === tileText) {
      setGridValues(prev => ({ ...prev, [selectedCell]: tileText }));
      setPlacedTiles(prev => ({ ...prev, [tileIdx]: true }));
      setSelectedCell(null);
    } else {
      setWrongPlacementCell(selectedCell);
    }
  }

  function onReset() {
    setPlacedTiles({});
    setGridValues({});
    setSelectedCell(null);
    setWrongPlacementCell(null);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-vibrant p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-heading">
                  ➗ Mathematics: Arithmetic Puzzle - Interactive Learning
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-vibrant-green text-white text-lg px-3 py-1">
                    Score: {score} / {totalFillable}
                  </Badge>
                  <Button onClick={onReset} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {gameCompleted && (
                <div className="bg-gradient-success p-4 rounded-lg text-white mx-4">
                  <div className="flex justify-center items-center space-x-2 mb-2">
                    <Trophy className="w-8 h-8 text-white" />
                    <span className="text-xl font-heading">Puzzle Completed! 🎉</span>
                  </div>
                  <p className="text-sm opacity-90">You solved the arithmetic puzzle correctly!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Puzzle Area */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  {/* Puzzle Grid */}
                  <div style={{ display: 'inline-block', borderCollapse: 'collapse' }}>
                    {puzzleRows.map((row, rIdx) => (
                      <div key={rIdx} style={{ display: 'flex' }}>
                        {row.map((cell, cIdx) => {
                          const posKey = `${rIdx}-${cIdx}`;
                          const isSelected = selectedCell === posKey;
                          const isWrong = wrongPlacementCell === posKey;
                          const userAns = gridValues[posKey] || '';
                          return (
                            <Cell
                              key={cIdx}
                              row={rIdx}
                              col={cIdx}
                              value={cell}
                              userValue={userAns}
                              onDrop={(tileIdx, tileText) => handleDrop(tileIdx, tileText)}
                              isSelected={isSelected}
                              wrongPlacement={isWrong}
                              onClick={() => handleCellClick(rIdx, cIdx, cell)}
                              isSolutionCell={isSolutionCell(rIdx, cIdx)}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  {/* Tile bank with tick-by-index */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
                    {tileNumbers.map((tile, idx) => (
                      <Tile
                        key={idx}
                        idx={idx}
                        text={tile}
                        isPlaced={!!placedTiles[idx]}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Side panel */}
            <div className="space-y-6">
              {/* Game Progress */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-heading">
                    Game Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-heading font-bold text-vibrant-turquoise">
                        {Math.round((score / totalFillable) * 100)}%
                      </div>
                      <div className="text-sm font-body text-muted-foreground">Completion</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-body">
                        <span>Questions Answered:</span>
                        <span>{score} / {totalFillable}</span>
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
                  <CardTitle className="text-lg font-heading">
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm font-body">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-vibrant-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        Practice arithmetic calculations in an interactive puzzle format.
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-vibrant-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        Develop logical thinking and number sense via number placement.
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-vibrant-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        Some grid cells are intentionally left empty and show a dash (–). No answer is required there.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Completion Card */}
              {gameCompleted && (
                <Card className="shadow-lg border-vibrant-orange">
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-12 h-12 text-vibrant-orange mx-auto mb-2" />
                    <h3 className="font-heading font-bold text-vibrant-orange mb-1">
                      Level Complete!
                    </h3>
                    <p className="text-sm font-body text-muted-foreground">
                      Well done! You have successfully completed all the arithmetic equations!
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
}
