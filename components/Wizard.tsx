import React, { useState } from 'react';
import { Button } from './Button';
import { Question, Option, WatchConfig } from '../types';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface WizardProps {
  onComplete: (config: WatchConfig) => void;
}

const QUESTIONS: Question[] = [
  {
    id: 'style',
    title: 'Quel est votre style ?',
    subtitle: 'L\'âme de votre garde-temps.',
    options: [
      { id: 'Minimaliste', label: 'Minimaliste', description: 'Épuré, simple, élégant.' },
      { id: 'Sport', label: 'Sport', description: 'Robuste, chronographe, dynamique.' },
      { id: 'Classique', label: 'Classique', description: 'Intemporel, sophistiqué, traditionnel.' },
      { id: 'Squelette', label: 'Squelette', description: 'Mécanique visible, complexe, audacieux.' },
    ]
  },
  {
    id: 'material',
    title: 'Matériau du boîtier',
    subtitle: 'La fondation de la structure.',
    options: [
      { id: 'Or Rose 18k', label: 'Or Rose', description: 'Chaleureux et luxueux.' },
      { id: 'Acier Inoxydable', label: 'Acier', description: 'Polyvalent et résistant.' },
      { id: 'Titane', label: 'Titane', description: 'Léger et moderne.' },
      { id: 'Céramique Noire', label: 'Céramique', description: 'Inrayable et intense.' },
    ]
  },
  {
    id: 'strap',
    title: 'Le Bracelet',
    subtitle: 'Confort et esthétique.',
    options: [
      { id: 'Cuir d\'Alligator', label: 'Cuir', description: 'Élégance classique.' },
      { id: 'Maillons Métal', label: 'Métal', description: 'Solidité et brillance.' },
      { id: 'Caoutchouc Haute Densité', label: 'Caoutchouc', description: 'Pour l\'aventure.' },
      { id: 'Tissu NATO', label: 'NATO', description: 'Décontracté et militaire.' },
    ]
  },
  {
    id: 'dialColor',
    title: 'Couleur du Cadran',
    subtitle: 'Le visage de la montre.',
    options: [
      { id: 'Bleu Roi Profond', label: 'Bleu Roi', description: 'Profondeur océanique.' },
      { id: 'Noir Mat', label: 'Noir Absolu', description: 'Discrétion et puissance.' },
      { id: 'Blanc Nacré', label: 'Blanc', description: 'Pureté et clarté.' },
      { id: 'Vert Émeraude', label: 'Vert', description: 'Originalité distinguée.' },
    ]
  }
];

export const Wizard: React.FC<WizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<WatchConfig>({});

  const currentQuestion = QUESTIONS[currentStep];

  const handleSelect = (optionId: string) => {
    setConfig(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(config);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepValid = !!config[currentQuestion.id];

  return (
    <div className="max-w-2xl mx-auto w-full p-6 animate-fade-in">
      {/* Progress Bar */}
      <div className="w-full bg-luxury-800 h-1 rounded-full mb-8">
        <div 
          className="bg-gold-500 h-1 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">{currentQuestion.title}</h2>
        <p className="text-gray-400">{currentQuestion.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`
              p-6 rounded-xl border text-left transition-all duration-200 group relative overflow-hidden
              ${config[currentQuestion.id] === option.id 
                ? 'border-gold-500 bg-gold-500/10' 
                : 'border-luxury-700 bg-luxury-800 hover:border-gold-500/50 hover:bg-luxury-750'}
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`font-semibold ${config[currentQuestion.id] === option.id ? 'text-gold-400' : 'text-white'}`}>
                {option.label}
              </span>
              {config[currentQuestion.id] === option.id && (
                <Check className="text-gold-500 w-5 h-5" />
              )}
            </div>
            <p className="text-sm text-gray-400 group-hover:text-gray-300">
              {option.description}
            </p>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-12">
        <Button 
          variant="secondary" 
          onClick={handleBack} 
          disabled={currentStep === 0}
          className="w-32"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </Button>
        <Button 
          variant="primary" 
          onClick={handleNext} 
          disabled={!isStepValid}
          className="w-32"
        >
          {currentStep === QUESTIONS.length - 1 ? 'Générer' : 'Suivant'}
          {currentStep < QUESTIONS.length - 1 && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};
