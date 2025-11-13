import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Topic {
  icon: string;
  title: string;
  law: string;
  example: string;
  tips: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

@Component({
  selector: 'app-scan',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss'
})
export class ScanComponent {
  selected: { [key: number]: number | null } = {};
  done: { [key: number]: boolean } = {};

  // topics: Topic[] = [
  //   {
  //     icon: 'lock',
  //     title: 'Piratage et accès non autorisé',
  //     law: 'Entrer dans le compte ou l’ordinateur de quelqu’un sans autorisation est illégal (jusqu’à 2 ans de prison).',
  //     example: 'Une personne se connecte à ton WhatsApp sans te le dire.',
  //     tips: ['Mot de passe fort', '2FA'],
  //     quiz: {
  //       question: "Je me connecte au compte Facebook d’un ami avec son mot de passe :",
  //       options: [
  //         'C’est autorisé.',
  //         'C’est interdit si l’ami n’a pas donné un accord clair et actuel.'
  //       ],
  //       correctIndex: 1,
  //       explanation: 'Sans accord explicite et actuel, c’est considéré comme un accès non autorisé.'
  //     }
  //   },
  //   {
  //     icon: 'photo_camera',
  //     title: 'Vie privée et images partagées',
  //     law: 'Partager la photo/vidéo de quelqu’un sans accord est interdit.',
  //     example: 'Poster la photo gênante d’un camarade sans lui demander.',
  //     tips: ['Demande avant', 'Respect'],
  //     quiz: {
  //       question: 'Je peux publier la photo d’un camarade si je pense qu’il ne verra pas ?',
  //       options: ['Non, il faut son accord.', 'Oui, si c’est drôle.'],
  //       correctIndex: 0,
  //       explanation: 'Publier sans accord est une atteinte à la vie privée.'
  //     }
  //   }
  // ];
  topics: Topic[] = [
    {
      icon: 'lock',
      title: 'Piratage et accès non autorisé',
      law: 'Entrer dans le compte ou l’ordinateur de quelqu’un sans autorisation est illégal (peines possibles : amende et jusqu’à 2 ans de prison).',
      example: 'Une personne se connecte à ton WhatsApp avec ton code QR sans te le dire.',
      tips: ['Mot de passe fort', '2FA'],
      quiz: {
        question: "Je me connecte au compte Facebook d’un ami avec son mot de passe qu’il m’a donné l’an dernier :",
        options: [
          "C’est autorisé.",
          "C’est interdit si l’ami n’a pas donné un accord clair et actuel.",
        ],
        correctIndex: 1,
        explanation:
          "Sans accord explicite et actuel, l’accès est considéré comme non autorisé et puni par la loi.",
      },
    },
    {
      icon: 'photo_camera',
      title: 'Vie privée et images partagées',
      law: 'Partager la photo/vidéo de quelqu’un sans accord porte atteinte à sa vie privée (sanctions : amende/prison).',
      example: 'Poster la photo gênante d’un camarade dans un groupe sans lui demander.',
      tips: ['Demande d’abord', 'Respect'],
      quiz: {
        question:
          'Je peux publier la photo d’un camarade si je pense qu’il ne verra pas ?',
        options: ['Non, il faut son accord.', 'Oui, si c’est drôle.'],
        correctIndex: 0,
        explanation:
          'La diffusion d’images sans consentement est une atteinte à la vie privée.',
      },
    },
    {
      icon: 'campaign',
      title: 'Fausses informations (rumeurs)',
      law: 'Diffuser des rumeurs ou fake news est sanctionné (amende et/ou prison).',
      example: 'Annoncer un faux décès d’un enseignant sur Facebook.',
      tips: ['Vérifie la source', 'Ne partage pas vite'],
      quiz: {
        question: 'Tu vois une info choquante sur TikTok :',
        options: [
          "Je partage vite avant de perdre la ‘primauté’.",
          'Je vérifie sur un site fiable ou média sérieux.',
        ],
        correctIndex: 1,
        explanation:
          'Partager sans vérifier peut te rendre responsable d’une diffusion de fausses nouvelles.',
      },
    },
    {
      icon: 'warning',
      title: 'Cyberharcèlement (injures, menaces)',
      law: 'Insulter, menacer, humilier en ligne est puni. Les peines varient selon la gravité.',
      example: 'Créer un faux compte pour se moquer tous les jours d’un élève.',
      tips: ['Signale', 'Parle à un adulte'],
      quiz: {
        question: 'Quel est le bon réflexe si on t’insulte en ligne ?',
        options: [
          'Répondre plus fort.',
          'Garder les preuves et signaler aux adultes/plateformes.',
        ],
        correctIndex: 1,
        explanation:
          'Conserve les captures, bloque, signale. Parle à un adulte de confiance.',
      },
    },
    {
      icon: 'error',
      title: 'Arnaques et fraudes en ligne',
      law: 'Escroquer en ligne (fausse vente, hameçonnage…) est puni (jusqu’à 5 ans de prison + remboursement).',
      example: 'Fausse boutique qui encaisse l’argent sans livrer.',
      tips: ['Méfie-toi des “trop beaux”', 'Vérifie le vendeur'],
      quiz: {
        question: 'On te demande tes coordonnées bancaires pour un “cadeau” :',
        options: ['Je donne vite !', 'Je refuse et je signale.'],
        correctIndex: 1,
        explanation:
          'Jamais de données bancaires en échange d’un “cadeau”. C’est presque toujours une arnaque.',
      },
    },
    {
      icon: 'group',
      title: 'Protection des mineurs',
      law: 'Créer/posséder/partager des images sexuelles impliquant un mineur est un crime (5 à 10 ans de prison).',
      example: 'Partager une photo intime d’un(e) mineur(e) dans un groupe.',
      tips: ['Respecte-toi', 'Refuse & supprime'],
      quiz: {
        question: 'On t’envoie une photo intime d’un camarade :',
        options: [
          'Je la transfère à mes amis.',
          'Je supprime et j’en parle à un adulte.',
        ],
        correctIndex: 1,
        explanation:
          'Ne partage jamais. Supprime et cherche de l’aide. La loi protège les mineurs.',
      },
    },
    {
      icon: 'badge',
      title: 'Usurpation d’identité',
      law: 'Se faire passer pour quelqu’un en ligne (faux profil, vol d’identité) est puni (jusqu’à 5 ans).',
      example: 'Créer un faux compte au nom d’un élève pour le ridiculiser.',
      tips: ['Ne partage pas tes codes', 'Vérifie les profils'],
      quiz: {
        question: 'Un ami ouvre un faux compte à ton nom pour “plaisanter” :',
        options: [
          'C’est légal, c’est une blague.',
          'C’est interdit : usurpation d’identité.',
        ],
        correctIndex: 1,
        explanation:
          'L’usurpation d’identité nuit à la dignité et est punie par la loi.',
      },
    },
    {
      icon: 'shield',
      title: 'Discours de haine (racisme, xénophobie)',
      law: 'Publier ou partager des propos haineux est interdit (peines lourdes).',
      example:
        'Diffuser une vidéo qui insulte un groupe ethnique ou religieux.',
      tips: ['Respect', 'Ne propage pas'],
      quiz: {
        question: 'Partager une “blague” raciste :',
        options: [
          'Toléré si c’est humoristique.',
          'Interdit : ça propage la haine.',
        ],
        correctIndex: 1,
        explanation:
          'Même sous couvert d’humour, la diffusion de propos haineux est répréhensible.',
      },
    },
  ];


  chooseOption(topicIndex: number, optionIndex: number): void {
    if (this.done[topicIndex]) return;
    this.selected[topicIndex] = optionIndex;
    this.done[topicIndex] = true;
  }

  isCorrect(topicIndex: number): boolean {
    const topic = this.topics[topicIndex];
    return this.selected[topicIndex] === topic.quiz.correctIndex;
  }
}