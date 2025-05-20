import React from 'react';

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const colors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#EF4444', // Red
  '#F97316', // Orange
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899'  // Pink
];

const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onColorChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full ${
            color === '#FFFFFF' ? 'border border-gray-300' : ''
          } ${
            color === currentColor ? 'ring-2 ring-offset-2 ring-purple-500' : ''
          } transition-transform hover:scale-110 active:scale-95`}
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;