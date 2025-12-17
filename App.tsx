import React, { useState } from 'react';
import { Watch, Zap } from 'lucide-react';
import { Wizard } from './components/Wizard';
import { ResultView } from './components/ResultView';
import { generateWatchImage, editWatchImage } from './services/geminiService';
import { AppState, WatchConfig } from './types';
import { Button } from './components/Button';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [config, setConfig] = useState<WatchConfig>({});
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const startWizard = () => {
    setAppState(AppState.WIZARD);
    setError(null);
  };

  const handleWizardComplete = async (finalConfig: WatchConfig) => {
    setConfig(finalConfig);
    setAppState(AppState.GENERATING);
    setError(null);

    try {
      const imageUrl = await generateWatchImage(finalConfig);
      setGeneratedImage(imageUrl);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("Désolé, une erreur est survenue lors de la création de votre montre. Veuillez réessayer.");
      setAppState(AppState.WIZARD); // Go back to allow retry without losing data usually, but here simple
    }
  };

  const handleEdit = async (prompt: string) => {
    // Keep showing result view but indicate loading
    const previousState = appState;
    setAppState(AppState.EDITING);
    
    try {
      // Pass the CURRENT generated image to the edit function
      const newImageUrl = await editWatchImage(generatedImage, prompt);
      setGeneratedImage(newImageUrl);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("Impossible d'appliquer la modification.");
      setAppState(AppState.RESULT); // Revert state
    }
  };

  const handleRestart = () => {
    setAppState(AppState.INTRO);
    setConfig({});
    setGeneratedImage('');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-gold-500/30">
      {/* Header */}
      <header className="py-6 px-6 border-b border-luxury-800 bg-luxury-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleRestart}>
            <div className="bg-gold-500 p-2 rounded-lg text-luxury-900">
              <Watch className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              ChronoCraft <span className="text-gold-500">AI</span>
            </h1>
          </div>
          {appState !== AppState.INTRO && (
             <div className="text-xs font-semibold text-gold-500 border border-gold-500/30 px-3 py-1 rounded-full flex items-center gap-1">
               <Zap className="w-3 h-3" /> Gemini 2.5 Inside
             </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-6xl mx-auto">
        
        {error && (
          <div className="w-full max-w-md bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-center animate-pulse">
            {error}
          </div>
        )}

        {appState === AppState.INTRO && (
          <div className="text-center max-w-2xl animate-fade-in space-y-8">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
              Créez l'Unique. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                L'Art Horloger IA.
              </span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Concevez votre garde-temps idéal en quelques secondes. 
              Choisissez vos matériaux, définissez votre style, et laissez notre artisan numérique forger votre vision.
              Modifiez ensuite chaque détail par la simple puissance de vos mots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={startWizard} className="text-lg px-12 py-4">
                Commencer la Création
              </Button>
            </div>
          </div>
        )}

        {appState === AppState.WIZARD && (
          <Wizard onComplete={handleWizardComplete} />
        )}

        {appState === AppState.GENERATING && (
          <div className="text-center animate-pulse flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-luxury-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-gold-500 rounded-full border-t-transparent animate-spin"></div>
              <Watch className="absolute inset-0 m-auto text-gold-500 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif text-white mb-2">Assemblage en cours...</h2>
            <p className="text-gray-400">Nos algorithmes polissent le boîtier et ajustent le mécanisme.</p>
          </div>
        )}

        {(appState === AppState.RESULT || appState === AppState.EDITING) && (
          <ResultView 
            imageUrl={generatedImage} 
            isProcessing={appState === AppState.EDITING}
            onEdit={handleEdit}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm border-t border-luxury-800">
        <p>© 2024 ChronoCraft AI. Propulsé par Google Gemini 2.5 Flash Image.</p>
      </footer>
    </div>
  );
}
