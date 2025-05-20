export interface Point {
  x: number;
  y: number;
}

export interface DrawingLine {
  points: Point[];
  color: string;
  width: number;
}

export type DrawingHistory = DrawingLine[][];

export interface CanvasState {
  lines: DrawingLine[];
  currentLine: DrawingLine | null;
  history: DrawingHistory;
  historyIndex: number;
}

export interface CanvasContextType {
  canvasState: CanvasState;
  setCanvasState: React.Dispatch<React.SetStateAction<CanvasState>>;
  startDrawing: (x: number, y: number, color: string, width: number) => void;
  draw: (x: number, y: number) => void;
  stopDrawing: () => void;
  clearCanvas: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}