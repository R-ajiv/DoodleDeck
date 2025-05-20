import React from 'react';

interface BrushSizeSelectorProps {
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

const BrushSizeSelector: React.FC<BrushSizeSelectorProps> = ({ 
  brushSize, 
  onBrushSizeChange 
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 w-full">
        <span className="text-xs text-gray-600">1px</span>
        <input
          type="range"
          min="1"
          max="30"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <span className="text-xs text-gray-600">30px</span>
      </div>
      <div 
        className="w-8 h-8 rounded-full bg-current border border-gray-300 flex items-center justify-center"
        style={{ width: `${brushSize * 1.2}px`, height: `${brushSize * 1.2}px` }}
      />
    </div>
  );
};

export default BrushSizeSelector;