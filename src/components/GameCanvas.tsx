import React, { useEffect, useRef, useState } from 'react';
import { GameState, Position } from '@/engine/types';
import { Badge } from '@/components/ui/badge';
import { GameObject } from '@/engine/types';
import { Level } from '@/data/levelTypes';
import { 
  Target,  
  AlertTriangle, 
  Frown, 
  Star, 
  RotateCcw, 
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameCanvasProps {
  gameState: GameState;
  currentLevel?: Level;
  isComplete: boolean;
  onReset: () => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  gameState, 
  currentLevel,
  isComplete,
  onReset
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(50);
  
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const container = canvasRef.current;
      const { width, height } = container.getBoundingClientRect();
      
      const cellWidth = Math.floor(width / gameState.gridSize.width);
      const cellHeight = Math.floor(height / gameState.gridSize.height);
      
      setCellSize(Math.min(cellWidth, cellHeight));
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [gameState.gridSize]);
  
  const renderRobot = () => {
    const { x, y, rotation = 0 } = gameState.robot;
    
    let rotationClass = '';
    if (rotation === 0) rotationClass = 'rotate-0';
    else if (rotation === 90) rotationClass = 'rotate-90';
    else if (rotation === 180) rotationClass = 'rotate-180';
    else if (rotation === 270) rotationClass = 'rotate-270';
    
    return (
      <div 
        className="robot flex items-center justify-center "
        style={{
          left: `${x * cellSize}px`,
          top: `${y * cellSize}px`,
          width: `${cellSize - 4}px`,
          height: `${cellSize - 4}px`,
          transition: 'left 0.3s, top 0.3s, transform 0.3s',
          backgroundColor: gameState.isFailed ? '#ff006e' : '#3a86ff'
        }}
      >
        <div className={`robot-body ${rotationClass} transition-transform duration-300 w-full h-full flex items-center justify-center`}>
          <div className="absolute -top-2 w-1 h-3 bg-white rounded-full"></div>
          <div className="robot-face w-full h-full flex flex-col items-center justify-center">
            <div className="flex space-x-2 mb-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="w-0 h-0 
              border-l-[6px] border-l-transparent
              border-b-[10px] border-b-white
              border-r-[6px] border-r-transparent
              mt-1">
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderObject = (obj: GameObject) => {
    const { id, type, x, y, width = 1, height = 1, color } = obj;
    
    if (type === 'obstacle') {
      return (
        <div 
          key={id}
          className="obstacle absolute"
          style={{
            left: `${x * cellSize}px`,
            top: `${y * cellSize}px`,
            width: `${width * cellSize - 4}px`,
            height: `${height * cellSize - 4}px`
          }}
        >
          <AlertTriangle className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-game-secondary opacity-70" />
        </div>
      );
    }
    
    if (type === 'collectible') {
      return (
        <div 
          key={id}
          className="collectible absolute flex items-center justify-center"
          style={{
            left: `${x * cellSize + cellSize/2 - 12}px`,
            top: `${y * cellSize + cellSize/2 - 12}px`,
            width: '24px',
            height: '24px'
          }}
        >
          <Sparkles className="h-5 w-5" />
        </div>
      );
    }
    
    if (type === 'target') {
      return (
        <div 
          key={id}
          className="target absolute flex items-center justify-center"
          style={{
            left: `${x * cellSize + cellSize/2 - 20}px`,
            top: `${y * cellSize + cellSize/2 - 20}px`,
            width: '40px',
            height: '40px'
          }}
        >
          <Star className="h-6 w-6" />
        </div>
      );
    }
    
    if (type === 'colorCell') {
      const cellColor = color === 'red' 
        ? 'bg-red-500/40 border-red-500/60' 
        : 'bg-green-500/40 border-green-500/60';
      
      return (
        <div 
          key={id}
          className={`absolute ${cellColor} border-2 rounded-md transition-colors duration-300`}
          style={{
            left: `${x * cellSize + 2}px`,
            top: `${y * cellSize + 2}px`,
            width: `${width * cellSize - 4}px`,
            height: `${height * cellSize - 4}px`,
            zIndex: 0
          }}
        />
      );
    }
    
    return null;
  };
  
  const renderGrid = () => {
    const { width, height } = gameState.gridSize;
    const grid = [];
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const isEven = (x + y) % 2 === 0;
        
        grid.push(
          <div 
            key={`cell-${x}-${y}`}
            className={`border border-game-primary/10 absolute ${isEven ? 'bg-game-primary/5' : ''}`}
            style={{
              left: `${x * cellSize}px`,
              top: `${y * cellSize}px`,
              width: `${cellSize}px`,
              height: `${cellSize}px`
            }}
          />
        );
      }
    }
    
    return grid;
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="glass-panel border border-game-primary/30 p-4 rounded-lg shadow-lg flex-1 flex flex-col bg-gradient-to-br from-game-surface/80 to-game-background/90">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white/90 flex items-center">
            <Target className="h-5 w-5 mr-2 text-game-tertiary" />
            {currentLevel?.name || 'Playground'}
          </h3>
          
          <div className="flex gap-2">
            <Badge variant="outline" className={`${gameState.maxBlocks && gameState.blocksUsed > gameState.maxBlocks ? 'bg-game-secondary/20 text-game-secondary border-game-secondary/30 animate-pulse' : 'bg-game-primary/10 text-game-primary border-game-primary/30'} font-medium`}>
              Blocos: {gameState.blocksUsed}
              {gameState.maxBlocks && (
                <>
                  <span className="ml-1 opacity-70">/ {gameState.maxBlocks}</span>
                  {gameState.blocksUsed > gameState.maxBlocks && (
                    <span className="ml-2 text-game-secondary">⚠️ Limite excedido!</span>
                  )}
                </>
              )}
            </Badge>
            
            {gameState.totalCollectibles > 0 && (
              <Badge variant="outline" className={`${gameState.collectiblesGathered === gameState.totalCollectibles ? 'bg-game-success/10 text-game-success border-game-success/30' : 'bg-game-warning/10 text-game-warning border-game-warning/30'} font-medium`}>
                <Sparkles className="h-3 w-3 mr-1" />
                Itens: {gameState.collectiblesGathered}/{gameState.totalCollectibles}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="relative flex-1 flex items-center justify-center">
          <div 
            className="relative bg-game-background/30 border-2 border-game-primary/30 rounded-lg overflow-hidden shadow-lg"
            style={{
              width: `${gameState.gridSize.width * cellSize}px`,
              height: `${gameState.gridSize.height * cellSize}px`
            }}
            ref={canvasRef}
          >
            {renderGrid()}
            {gameState.objects.map(renderObject)}
            {renderRobot()}
          </div>
          
          {isComplete && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center animate-fade-in rounded-md">
              <div className="text-center p-6 glass-panel animate-scale-in border-2 border-game-success">
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-game-success/20 flex items-center justify-center">
                    <Star className="h-10 w-10 text-game-success animate-pulse-light" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-game-success mb-2">Nível Concluído!</h2>
                <p className="text-white/80 mb-2">
                  Parabéns! Você completou o desafio usando {gameState.blocksUsed} blocos.
                </p>
                {currentLevel?.minBlocks && (
                  <p className={`text-sm mb-4 ${gameState.blocksUsed <= currentLevel.minBlocks ? 'text-game-success' : 'text-white/60'}`}>
                    {gameState.blocksUsed <= currentLevel.minBlocks 
                      ? "Você encontrou a solução mais eficiente! 🎉"
                      : `Solução mais eficiente: ${currentLevel.minBlocks} blocos`}
                  </p>
                )}
                <Badge variant="outline" className="bg-game-primary/10 text-game-primary border-game-primary/30 text-sm">
                  {currentLevel?.concepts.join(' • ')}
                </Badge>
              </div>
            </div>
          )}
          
          {gameState.isFailed && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center animate-fade-in rounded-md">
              <div className="text-center p-6 glass-panel animate-scale-in border-2 border-game-secondary">
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-game-secondary/20 flex items-center justify-center">
                    <Frown className="h-10 w-10 text-game-secondary animate-pulse-light" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-game-secondary mb-2">Missão Falhou!</h2>
                <p className="text-white/80 mb-4">
                  Seu robô não conseguiu chegar ao destino. Tente novamente!
                </p>
                <Button 
                  onClick={onReset}
                  className="bg-game-secondary text-white hover:bg-game-secondary/80 flex items-center"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Tentar Novamente
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {currentLevel && (
          <div className="mt-4 text-white/90 glass-panel p-3 text-sm rounded-lg animate-slide-in bg-gradient-to-r from-game-primary/20 to-game-tertiary/20 border border-white/10">
            <p><strong>Objetivo:</strong> {currentLevel.objective}</p>
            {gameState.totalCollectibles > 0 && (
              <p className="mt-1 text-white/80">
                <strong>Lembre-se:</strong> Você precisa coletar todos os itens para completar o nível!
              </p>
            )}
            {currentLevel.hint && (
              <p className="mt-1 text-white/80">
                <strong>Dica:</strong> {currentLevel.hint}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCanvas;
