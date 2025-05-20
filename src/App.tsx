import React from 'react';
import { CanvasProvider } from './context/CanvasContext';
import DrawingBoard from './components/DrawingBoard';
import { Palette } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        <header className="mb-4">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <div className="bg-purple-600 p-2 rounded-lg text-white">
              <Palette size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">DoodleDeck</h1>
          </div>
          <p className="text-center sm:text-left text-gray-600 text-sm mt-1">
            A lightweight canvas for your creative ideas
          </p>
        </header>
        
        <main className="flex-1 overflow-hidden">
          <CanvasProvider>
            <DrawingBoard />
          </CanvasProvider>
        </main>
        
        <footer className="mt-4 text-center text-gray-500 text-xs">
          © 2025 DoodleDeck • Draw and share your creativity
        </footer>
      </div>
    </div>
  );
}

export default App;