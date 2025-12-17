import React, { useState } from 'react';
import { Button } from './Button';
import { Download, Sparkles, RefreshCw, Wand2 } from 'lucide-react';

interface ResultViewProps {
  imageUrl: string;
  isProcessing: boolean;
  onEdit: (prompt: string) => void;
  onRestart: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ 
  imageUrl, 
  isProcessing, 
  onEdit,
  onRestart
}) => {
  const [prompt, setPrompt] = useState('');

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isProcessing) {
      onEdit(prompt);
      setPrompt('');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'chronocraft-watch.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 flex flex-col md:flex-row gap-8 animate-fade-in">
      {/* Image Display */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-luxury-800 border border-luxury-700 shadow-2xl group">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Generated Watch" 
              className={`w-full h-full object-cover transition-opacity duration-500 ${isProcessing ? 'opacity-50 blur-sm' : 'opacity-100'}`} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Aucune image
            </div>
          )}
          
          {isProcessing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gold-400 font-semibold tracking-wider animate-pulse">
                L'IA TRAVAILLE...
              </p>
            </div>
          )}

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleDownload}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg backdrop-blur-md transition-colors"
              title="Télécharger"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col justify-center gap-8">
        <div>
          <h2 className="text-3xl font-serif text-white mb-2">Votre Chef-d'œuvre</h2>
          <p className="text-gray-400">
            Voici votre montre personnalisée. Vous pouvez la télécharger ou demander à l'IA de faire des modifications précises.
          </p>
        </div>

        {/* Edit Form */}
        <div className="bg-luxury-800 p-6 rounded-xl border border-luxury-700">
          <div className="flex items-center gap-2 mb-4 text-gold-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold uppercase tracking-wider text-sm">Mode Studio</h3>
          </div>
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
            <label htmlFor="edit-prompt" className="text-sm text-gray-300">
              Que souhaitez-vous changer ?
            </label>
            <div className="relative">
              <input
                id="edit-prompt"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Ajoutez une gravure sur le côté..."
                className="w-full bg-luxury-900 border border-luxury-600 rounded-lg p-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                disabled={isProcessing}
              />
              <Wand2 className="absolute right-3 top-3 text-gray-500 w-5 h-5" />
            </div>
            <Button 
              type="submit" 
              disabled={!prompt.trim() || isProcessing}
              fullWidth
            >
              Appliquer la modification
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            Propulsé par Gemini 2.5 Flash Image. Essayez : "Mets le bracelet en vert", "Ajoute un reflet néon", "Change l'arrière-plan en bois".
          </p>
        </div>

        <div className="border-t border-luxury-800 pt-6">
           <Button variant="outline" onClick={onRestart} fullWidth>
             <RefreshCw className="w-4 h-4 mr-2" /> Créer une nouvelle montre
           </Button>
        </div>
      </div>
    </div>
  );
};
