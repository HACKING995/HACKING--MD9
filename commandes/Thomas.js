const { zokou } = require('../framework/zokou');

const isIdeaCommandEnabled = true; // Variable pour activer ou désactiver la commande "idea"

zokou({ nomCom: "idea", categorie: "IA", reaction:"👨‍🏫", active: isIdeaCommandEnabled }, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre } = commandeOptions;
  const message = arg.join(' ');

  // Greetings
  const greetings = ["Bonjour !", "Salut !", "Salutations !", "Hé !", "Ravi de vous voir !"];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Introduction
  const introduction = [
    "Je suis Assistant, un bot utile. Je suis là pour vous aider avec toutes vos questions ou tâches.",
    "Bienvenue ! Je suis Assistant, votre bot amical ici pour vous aider avec tout ce dont vous avez besoin.",
    "Salut ! Je suis Assistant, votre assistant IA personnel. Comment puis-je vous aider aujourd'hui ?",
    "Bonjour ! Je suis Assistant, prêt à vous assister avec vos requêtes et tâches."
  ];
  const randomIntroduction = introduction[Math.floor(Math.random() * introduction.length)];

  // Project Suggestions
  const projet = [
    "Vous devriez commencer un nouveau projet lié à votre passion !",
    "Et si vous travailliez sur un projet créatif qui vous enthousiasme ?",
    "Envisagez de vous lancer dans un projet qui s'aligne sur vos intérêts et objectifs.",
    "Pourquoi ne pas vous lancer dans un projet qui vous challenge et vous inspire ?"
  ];
  const randomProjet = projet[Math.floor(Math.random() * projet.length)];

  // Suggestions for "presentement"
  const presentement = [
    "En ce moment, vous pourriez apprendre une nouvelle compétence ou un nouveau passe-temps.",
    "Actuellement, vous pourriez explorer de nouveaux livres ou films.",
    "À l'heure actuelle, vous pourriez essayer de pratiquer la pleine conscience ou la méditation.",
    "Présentement, vous pourriez vous concentrer sur l'amélioration de votre condition physique."
  ];
  const randomPresentement = presentement[Math.floor(Math.random() * presentement.length)];

  // Custom response for the "idea" command when it is enabled
  const customResponse = `Ceci est une réponse personnalisée pour la commande 'idea' lorsqu'elle est activée.
Réponse générée le ${new Date().toLocaleString()}.`;

  // Check if the "idea" command is enabled
  if (isIdeaCommandEnabled) {
    // Ajouter un délai de 60 secondes pour la réponse
    setTimeout(() => {
      repondre("Je suis à votre disposition, comment puis-je vous aider ?");
    }, 60000); // 60 secondes (60000 millisecondes)
  } else {
    // Envoyer une réponse indiquant que la commande est désactivée
    repondre("Désolé, la commande 'idea' est actuellement désactivée.");
    return;
  }

  // Vérifier le contenu du message et générer une réponse en conséquence
  if (message.includes('projet')) {
    repondre(` ${randomGreeting} ${randomProjet} ${randomIntroduction}`);
  } else if (message.includes('livre')) {
    repondre(` ${randomGreeting} Et si vous écriviez un livre sur un sujet que vous connaissez bien ? ${randomIntroduction}`);
  } else if (message.includes('voyage')) {
    repondre(` ${randomGreeting} Planifiez un voyage vers une destination que vous avez toujours voulu visiter ! ${randomIntroduction}`);
  } else if (message.includes('presentement')) {
    repondre(` ${randomGreeting} ${randomPresentement} ${randomIntroduction}`);
  } else {
    repondre(` ${randomGreeting} J'ai une idée pour vous, mais j'ai besoin de plus d'informations. Pouvez-vous me donner plus de détails ? ${randomIntroduction}`);
  }
});
