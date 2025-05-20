import React, { createContext, useContext, useState } from 'react';
import { CanvasState, CanvasContextType, Point } from '../types/canvas';

const initialCanvasState: CanvasState = {
  lines: [],
  currentLine: null,
  history: [],
  historyIndex: -1,
};

const CanvasContext = createContext<CanvasContextType | null>(null);

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [canvasState, setCanvasState] = useState<CanvasState>(initialCanvasState);
  
  const startDrawing = (x: number, y: number, color: string, width: number) => {
    const newPoint: Point = { x, y };
    const newLine = {
      points: [newPoint],
      color,
      width,
    };
    
    setCanvasState((prev) => ({
      ...prev,
      currentLine: newLine,
    }));
  };
  
  const draw = (x: number, y: number) => {
    if (!canvasState.currentLine) return;
    
    const newPoint: Point = { x, y };
    
    setCanvasState((prev) => {
      if (!prev.currentLine) return prev;
      
      return {
        ...prev,
        currentLine: {
          ...prev.currentLine,
          points: [...prev.currentLine.points, newPoint],
        },
      };
    });
  };
  
  const stopDrawing = () => {
    if (!canvasState.currentLine) return;
    
    setCanvasState((prev) => {
      if (!prev.currentLine) return prev;
      
      // Add the current line to lines
      const newLines = [...prev.lines, prev.currentLine];
      
      // Update history
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newLines);
      
      return {
        lines: newLines,
        currentLine: null,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  };
  
  const clearCanvas = () => {
    setCanvasState((prev) => {
      const newHistory = [...prev.history, []];
      
      return {
        lines: [],
        currentLine: null,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  };
  
  const undo = () => {
    if (canvasState.historyIndex <= 0) return;
    
    setCanvasState((prev) => ({
      ...prev,
      historyIndex: prev.historyIndex - 1,
      lines: prev.history[prev.historyIndex - 1] || [],
      currentLine: null,
    }));
  };
  
  const redo = () => {
    if (canvasState.historyIndex >= canvasState.history.length - 1) return;
    
    setCanvasState((prev) => ({
      ...prev,
      historyIndex: prev.historyIndex + 1,
      lines: prev.history[prev.historyIndex + 1] || [],
      currentLine: null,
    }));
  };
  
  const canUndo = canvasState.historyIndex > 0;
  const canRedo = canvasState.historyIndex < canvasState.history.length - 1;
  
  const value = {
    canvasState,
    setCanvasState,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    undo,
    redo,
    canUndo,
    canRedo,
  };
  
  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};