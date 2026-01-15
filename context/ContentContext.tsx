import React, { createContext, useContext, useState, useEffect } from 'react';

const APP_VERSION = "1.3";

export const defaultContent = {
  "nav": {
    "logoPart1": "Marketing",
    "logoPart2": "Joy",
    "links": [
      {
        "name": "Diagnostic",
        "href": "#offre"
      },
      {
        "name": "Expertise",
        "href": "#whoami"
      },
      {
        "name": "FAQ",
        "href": "#faq"
      }
    ],
    "cta": "Audit Offert"
  },
  "hero": {
    "badge": "Accélération Marketing B2B & PME",
    "headlineMain": "Externalisez votre",
    "headlineAccent": "Direction Marketing",
    "subheadline": "Un abonnement senior pour les dirigeants qui veulent des résultats, pas des excuses. Stratégie IA, contenus multicanaux et exécution 48h.",
    "ctaEligibility": "Lancer mon Diagnostic de Capacité",
    "ctaMicroCopy": "Évaluez vos besoins RH et Production en 2 min."
  },
  "whoAmI": {
    "title": "Votre Partenaire Stratégique",
    "name": "Julien Tridat",
    "role": "Directeur Marketing à Temps Partagé",
    "tagline": "Expert IA & Systèmes de Croissance",
    "bio": "J'aide les dirigeants de PME à transformer leur marketing en centre de profit. Mon approche combine 15 ans d'expertise stratégique et la puissance de l'IA Générative pour livrer plus vite que n'importe quelle agence classique.",
    "skills": [
      "Audit CRM & ROI",
      "Automatisation IA",
      "Stratégie de Contenu",
      "Lead Gen B2B"
    ],
    "imageUrl": "data:image/jpeg;base64,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"
  },
  "philosophy": {
    "text": "Ma conviction est simple : une PME n'a pas besoin de 'plus de bras', elle a besoin d'un meilleur cerveau marketing. MarketingJoy est conçu pour être ce cerveau : agile, technique, et focalisé sur une seule chose : décharger le dirigeant pour qu'il se concentre sur sa vision."
  },
  "whyUs": {
    "title": "Le marketing traditionnel est devenu un gouffre",
    "items": [
      {
        "title": "Agences : Trop de réunions, peu de livrables",
        "desc": "Vous payez pour leur structure, pas pour votre ROI. Les délais sont longs et la réactivité inexistante."
      },
      {
        "title": "Freelances : Manque de vision globale",
        "desc": "Ils exécutent sans comprendre vos enjeux business. C'est à vous de coordonner tout le monde, ce qui vous épuise."
      },
      {
        "title": "Recrutement : Trop lent, trop risqué",
        "desc": "Attendre 6 mois pour trouver un profil senior ? MarketingJoy vous donne accès à cette expertise en 48h."
      }
    ]
  },
  "benefits": {
    "title": "Engagement Performance",
    "items": [
      {
        "title": "Alignement CRM & Sales",
        "desc": "Chaque action marketing est pensée pour nourrir vos commerciaux et tracker votre ROI."
      },
      {
        "title": "Vitesse d'Exécution IA",
        "desc": "Grâce à l'IA, je produis en 48h ce qui prendrait 15 jours à une équipe créative classique."
      },
      {
        "title": "Clarté de la Facturation",
        "desc": "Un prix fixe. Zéro frais caché. Une visibilité totale sur votre capacité de production."
      }
    ]
  },
  "targetAudience": {
    "title": "Profils Accompagnés",
    "items": [
      {
        "title": "Dirigeants de PME",
        "subtitle": "Industrie, Services, B2B",
        "context": "Priorités :",
        "points": [
          "Clarifier le message",
          "Moderniser l'image",
          "Générer des leads qualifiés"
        ],
        "conclusion": "Je deviens votre bras droit marketing pour structurer votre croissance."
      },
      {
        "title": "Équipes Marketing",
        "subtitle": "Besoin de renfort ou d'IA",
        "context": "Priorités :",
        "points": [
          "Accélérer la production",
          "Former aux outils IA",
          "Débloquer le backlog"
        ],
        "conclusion": "Je m'intègre à votre équipe pour absorber le surplus de charge en mode 'Commando'."
      },
      {
        "title": "Consultants & Cabinets",
        "subtitle": "Expertise & Crédibilité",
        "context": "Priorités :",
        "points": [
          "Autorité sur LinkedIn",
          "Tunnel de conversion",
          "Webinaires & Newsletters"
        ],
        "conclusion": "Je professionnalise votre visibilité pour justifier vos tarifs premium."
      }
    ]
  },
  "pricing": {
    "title": "Diagnostic &",
    "titleAccent": "Abonnement",
    "subtitle": "Une solution clé en main pour piloter votre marketing sans frictions.",
    "planTitle": "Direction Marketing Externalisée",
    "price": "2 500 €",
    "priceSuffix": "HT /mois",
    "planDetail": "Expertise Senior · Production IA · Livraison 48-72h",
    "features": [
      {
        "title": "Dashboard Trello",
        "desc": "Suivez l'avancement en temps réel."
      },
      {
        "title": "Utilisateurs Illimités",
        "desc": "Toute votre équipe peut faire des demandes."
      },
      {
        "title": "Pause à tout moment",
        "desc": "Ajustez selon votre saisonnalité."
      },
      {
        "title": "Accès Direct",
        "desc": "Communication par Slack ou Email."
      }
    ],
    "starterPack": {
      "title": "Starter Pack (Offert)",
      "delivery": "Les 7 premiers jours",
      "desc": "Audit stratégique, kit média et paramétrage des outils.",
      "items": [
        "Audit Positionnement",
        "Configuration CRM",
        "Plan de Production"
      ]
    },
    "footerNote": "Sans engagement · Résiliable en un clic · Focus ROI garanti",
    "cta": "Lancer le simulateur de charge"
  },
  "testimonials": {
    "title": "Retours d'Expérience",
    "items": [
      {
        "quote": "Enfin un prestataire qui comprend mes enjeux de vente et qui ne parle pas juste de 'jolis visuels'.",
        "author": "Directeur Général, PME Industrie"
      },
      {
        "quote": "MarketingJoy a débloqué notre production LinkedIn en 48h. L'usage de l'IA est bluffant.",
        "author": "Responsable Com, Groupe Services"
      }
    ]
  },
  "finalCta": {
    "headline": "Arrêtez de gérer votre marketing.",
    "subheadline": "Commencez à piloter votre croissance.",
    "desc": "Vérifions ensemble en 15 minutes si votre structure est prête pour l'accélération MarketingJoy.",
    "cta": "Réserver mon Audit Stratégique",
    "calendarUrl": "https://calendar.app.google/zSC4G63S5SvC2tYw8"
  },
  "faq": {
    "title": "Précisions techniques",
    "items": [
      {
        "question": "Comment gérez-vous mon CRM actuel ?",
        "answer": "Je m'adapte à vos outils (HubSpot, Salesforce, Pipedrive...). L'objectif est de s'assurer que les leads générés par nos campagnes sont correctement trackés et transmis à vos sales."
      },
      {
        "question": "Que se passe-t-1 si j'ai trop de demandes ?",
        "answer": "Le simulateur de charge vous donne une base. Si vous dépassez les 25 unités, nous priorisons ensemble ou séquençons les livrables sur le mois suivant. Pour les besoins massifs, des forfaits 'Full Capacity' sont disponibles."
      },
      {
        "question": "L'IA ne risque-t-elle pas de dénaturer mon image ?",
        "answer": "Au contraire. L'IA me permet de créer des assets de haute qualité plus vite, mais c'est mon expertise de 15 ans qui garantit la cohérence stratégique et la validation finale."
      },
      {
        "question": "Puis-je mettre l'abonnement en pause ?",
        "answer": "Oui, c'est la force du modèle. Si votre équipe est sous l'eau ou si vous avez moins de besoins un mois donné, vous mettez en pause et reprenez quand vous voulez."
      }
    ]
  },
  "footer": {
    "email": "contact@marketingjoy.fr",
    "copyright": "Expertise PME & Stratégie IA."
  }
};

type ContentType = typeof defaultContent;

interface ContentContextType {
  content: ContentType;
  updateContent: (newContent: ContentType) => void;
  resetContent: () => void;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentType>(defaultContent);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVersion = localStorage.getItem('mj_version');
      const saved = localStorage.getItem('mj_content');
      if (savedVersion !== APP_VERSION || !saved) {
        localStorage.setItem('mj_version', APP_VERSION);
        localStorage.setItem('mj_content', JSON.stringify(defaultContent));
        setContent(defaultContent);
      } else {
        try {
          setContent(JSON.parse(saved));
        } catch (e) {
          setContent(defaultContent);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  const updateContent = (newContent: ContentType) => {
    setContent(newContent);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mj_content', JSON.stringify(newContent));
      localStorage.setItem('mj_version', APP_VERSION);
    }
  };

  const resetContent = () => {
    updateContent(defaultContent);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isEditMode, setIsEditMode }}>
      {isInitialized ? children : <div className="min-h-screen bg-white" />}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within a ContentProvider");
  return context;
};