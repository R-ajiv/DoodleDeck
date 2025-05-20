import React from 'react';
import ColorPicker from './ColorPicker';
import BrushSizeSelector from './BrushSizeSelector';
import ActionButtons from './ActionButtons';

interface ToolbarProps {
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  downloadCanvas: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  color,
  setColor,
  brushSize,
  setBrushSize,
  downloadCanvas,
}) => {
  return (
    <div className="flex flex-col md:flex-row p-4 gap-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-700 text-center">Colors</h3>
        <ColorPicker currentColor={color} onColorChange={setColor} />
      </div>
      
      <div className="w-px h-auto bg-gray-200 hidden md:block" />
      
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-700 text-center">Brush Size</h3>
        <BrushSizeSelector brushSize={brushSize} onBrushSizeChange={setBrushSize} />
      </div>
      
      <div className="w-px h-auto bg-gray-200 hidden md:block" />
      
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-gray-700 text-center">Actions</h3>
        <ActionButtons downloadCanvas={downloadCanvas} />
      </div>
    </div>
  );
};

export default Toolbar;