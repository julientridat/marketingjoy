import React, { createContext, useContext, useState } from 'react';

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
    "subheadline": "Un abonnement senior pour les dirigeants qui veulent des résultats, sans attendre. Stratégie IA, contenus multicanaux et exécution 48h.",
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
    "imageUrl": "https://lh3.googleusercontent.com/d/1Xl2N9tN-E5D3S5f-8h_v-L-v0X2N9tN-E"
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
        "question": "Que se passe-t-il si j'ai trop de demandes ?",
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
  const [content, setContent] = useState<ContentType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mj_content');
      return saved ? JSON.parse(saved) : defaultContent;
    }
    return defaultContent;
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const updateContent = (newContent: ContentType) => {
    setContent(newContent);
    localStorage.setItem('mj_content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('mj_content');
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      resetContent, 
      isEditMode, 
      setIsEditMode 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within a ContentProvider");
  return context;
};