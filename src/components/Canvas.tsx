import React, { useRef, useEffect } from 'react';
import { useCanvas } from '../context/CanvasContext';

interface CanvasProps {
  color: string;
  brushSize: number;
}

const Canvas: React.FC<CanvasProps> = ({ color, brushSize }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { 
    canvasState, 
    startDrawing: contextStartDrawing, 
    draw: contextDraw,
    stopDrawing: contextStopDrawing 
  } = useCanvas();
  
  // Function to get correct coordinates for touch and mouse events
  const getCoordinates = (event: MouseEvent | TouchEvent): { x: number, y: number } => {
    let clientX, clientY;
    
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    
    if (!canvas || !rect) return { x: 0, y: 0 };
    
    // Calculate the ratio of the canvas display size to its internal size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };
  
  // Mouse and touch event handlers
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(event.nativeEvent);
    contextStartDrawing(x, y, color, brushSize);
  };
  
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasState.currentLine) return;
    const { x, y } = getCoordinates(event.nativeEvent);
    contextDraw(x, y);
  };
  
  const handleMouseUp = () => {
    contextStopDrawing();
  };
  
  const handleMouseLeave = () => {
    contextStopDrawing();
  };
  
  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const { x, y } = getCoordinates(event.nativeEvent);
    contextStartDrawing(x, y, color, brushSize);
  };
  
  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!canvasState.currentLine) return;
    const { x, y } = getCoordinates(event.nativeEvent);
    contextDraw(x, y);
  };
  
  const handleTouchEnd = () => {
    contextStopDrawing();
  };

  // Resize canvas to match container
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      
      if (!canvas || !container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Redraw everything when resizing
      drawCanvas();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  // Draw function that renders all lines on canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw all completed lines
    canvasState.lines.forEach((line) => {
      if (line.points.length < 2) return;
      
      context.beginPath();
      context.moveTo(line.points[0].x, line.points[0].y);
      
      for (let i = 1; i < line.points.length; i++) {
        context.lineTo(line.points[i].x, line.points[i].y);
      }
      
      context.strokeStyle = line.color;
      context.lineWidth = line.width;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.stroke();
    });
    
    // Draw the current line being drawn
    if (canvasState.currentLine && canvasState.currentLine.points.length > 0) {
      const line = canvasState.currentLine;
      
      context.beginPath();
      context.moveTo(line.points[0].x, line.points[0].y);
      
      for (let i = 1; i < line.points.length; i++) {
        context.lineTo(line.points[i].x, line.points[i].y);
      }
      
      context.strokeStyle = line.color;
      context.lineWidth = line.width;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.stroke();
    }
  };
  
  // Redraw canvas whenever the state changes
  useEffect(() => {
    drawCanvas();
  }, [canvasState]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default Canvas;