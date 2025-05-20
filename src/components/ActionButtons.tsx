import React from 'react';
import { Download, Trash2, Undo, Redo } from 'lucide-react';
import { useCanvas } from '../context/CanvasContext';

interface ActionButtonsProps {
  downloadCanvas: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ downloadCanvas }) => {
  const { clearCanvas, undo, redo, canUndo, canRedo } = useCanvas();

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={undo}
        disabled={!canUndo}
        className={`p-2 rounded-full bg-white text-gray-700 shadow-md
                  transition-all hover:bg-gray-100 active:shadow-sm
                  ${!canUndo ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
        aria-label="Undo"
      >
        <Undo size={20} />
      </button>
      
      <button
        onClick={redo}
        disabled={!canRedo}
        className={`p-2 rounded-full bg-white text-gray-700 shadow-md
                  transition-all hover:bg-gray-100 active:shadow-sm
                  ${!canRedo ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
        aria-label="Redo"
      >
        <Redo size={20} />
      </button>
      
      <button
        onClick={clearCanvas}
        className="p-2 rounded-full bg-white text-red-500 shadow-md
                  transition-all hover:bg-red-50 hover:scale-105 active:scale-95 active:shadow-sm"
        aria-label="Clear canvas"
      >
        <Trash2 size={20} />
      </button>
      
      <button
        onClick={downloadCanvas}
        className="p-2 rounded-full bg-white text-purple-600 shadow-md
                  transition-all hover:bg-purple-50 hover:scale-105 active:scale-95 active:shadow-sm"
        aria-label="Download as PNG"
      >
        <Download size={20} />
      </button>
    </div>
  );
};

export default ActionButtons;