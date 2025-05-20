import React, { useRef, useState } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';

const DrawingBoard: React.FC = () => {
  const [color, setColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const downloadCanvas = () => {
    const canvasElement = canvasContainerRef.current?.querySelector('canvas');
    
    if (!canvasElement) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.download = `doodledeck-${new Date().toISOString().slice(0, 10)}.png`;
    
    // Convert canvas to data URL and set as link href
    link.href = canvasElement.toDataURL('image/png');
    
    // Append to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div 
        ref={canvasContainerRef}
        className="flex-1 overflow-hidden rounded-lg"
      >
        <Canvas color={color} brushSize={brushSize} />
      </div>
      
      <div className="flex justify-center sticky bottom-4">
        <Toolbar
          color={color}
          setColor={setColor}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          downloadCanvas={downloadCanvas}
        />
      </div>
    </div>
  );
};

export default DrawingBoard;