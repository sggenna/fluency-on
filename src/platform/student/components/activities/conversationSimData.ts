import type { DialogueStep } from './ConversationSim';

export interface ConversationSimDef {
  id: number;
  title: string;
  scenario: string;
  icon: string;
  level: string;
  steps: DialogueStep[];
}

export const CONVERSATION_SIMS: ConversationSimDef[] = [
  {
    id: 1,
    title: 'Pedindo no Restaurante',
    scenario: 'Pratique fazer pedidos em inglês',
    icon: '🍽️',
    level: 'Básico',
    steps: [
      {
        speaker: 'partner',
        text: "Good evening! Welcome to our restaurant. Do you have a reservation?",
      },
      {
        speaker: 'you',
        text: "Yes, I have a table for two under the name Silva.",
      },
      {
        speaker: 'partner',
        text: "Perfect. Follow me, please. Here's your table. Can I get you something to drink first?",
      },
      {
        speaker: 'partner',
        text: "What would you like to drink?",
        choices: [
          { text: "I'll have a glass of water, please.", feedback: "Great! Natural and polite.", good: true },
          { text: "Give me water.", feedback: "A bit direct. 'I'll have a glass of water, please' sounds more polite.", good: false },
          { text: "Water.", feedback: "Too short. Adding 'please' and a full sentence is better in a restaurant.", good: false },
        ],
      },
      {
        speaker: 'partner',
        text: "Here's the menu. Take your time. I'll be back to take your order.",
      },
      {
        speaker: 'partner',
        text: "Are you ready to order?",
        choices: [
          { text: "Yes, I'd like the grilled salmon and a side salad, please.", feedback: "Perfect! Clear and polite.", good: true },
          { text: "I want the salmon.", feedback: "Correct but a bit blunt. 'I'd like...' is more polite.", good: false },
          { text: "We need more time.", feedback: "Good alternative if you're not ready yet!", good: true },
        ],
      },
      {
        speaker: 'partner',
        text: "Excellent choice! Your food will be ready in about 15 minutes. Enjoy your meal!",
      },
    ],
  },
  {
    id: 2,
    title: 'Entrevista de Emprego',
    scenario: 'Simule uma entrevista profissional',
    icon: '💼',
    level: 'Avançado',
    steps: [
      {
        speaker: 'partner',
        text: "Good morning! Thank you for coming in. I'm Sarah, and I'll be conducting your interview today. Can you tell me a little about yourself?",
      },
      {
        speaker: 'partner',
        text: "How would you describe your strengths?",
        choices: [
          { text: "I'm a quick learner, and I work well in teams. I also have strong problem-solving skills.", feedback: "Strong answer: specific and relevant to work.", good: true },
          { text: "I'm nice and I like people.", feedback: "Too vague. Give concrete examples related to the job.", good: false },
          { text: "I have five years of experience in this field and have led several successful projects.", feedback: "Good – experience and leadership are valuable.", good: true },
        ],
      },
      {
        speaker: 'partner',
        text: "What would you say is your biggest weakness?",
        choices: [
          { text: "I sometimes take on too much and need to improve my time management. I'm working on it with better planning.", feedback: "Good: honest, self-aware, and shows improvement.", good: true },
          { text: "I don't have any weaknesses.", feedback: "Unrealistic. Interviewers prefer honesty and self-awareness.", good: false },
          { text: "I'm a perfectionist.", feedback: "Overused. Be more specific about a real area you're improving.", good: false },
        ],
      },
      {
        speaker: 'partner',
        text: "Where do you see yourself in five years?",
        choices: [
          { text: "I hope to have grown within the company, taken on more responsibility, and perhaps led a team or project.", feedback: "Shows ambition and alignment with the company.", good: true },
          { text: "I don't know.", feedback: "Shows lack of direction. It's fine to be flexible but show some goals.", good: false },
          { text: "In your job.", feedback: "Can sound aggressive. Focus on growth and contribution instead.", good: false },
        ],
      },
      {
        speaker: 'partner',
        text: "Do you have any questions for us?",
        choices: [
          { text: "Yes. What does a typical day look like in this role? And how is success measured in the team?", feedback: "Great questions – they show interest and professionalism.", good: true },
          { text: "No, I think we've covered everything.", feedback: "It's better to ask at least one or two questions to show interest.", good: false },
          { text: "What's the salary?", feedback: "Important but often better to ask after an offer or when they bring it up.", good: false },
        ],
      },
      {
        speaker: 'partner',
        text: "Thank you for your time. We'll be in touch within the next week. Good luck!",
      },
    ],
  },
  {
    id: 3,
    title: 'Check-in no Hotel',
    scenario: 'Aprenda vocabulário de viagem',
    icon: '🏨',
    level: 'Intermediário',
    steps: [
      {
        speaker: 'partner',
        text: "Good afternoon! Welcome to the Grand Hotel. Do you have a reservation?",
      },
      {
        speaker: 'you',
        text: "Yes, I have a reservation under the name Oliveira.",
      },
      {
        speaker: 'partner',
        text: "Let me check... Yes, I found it. A double room for three nights. Is that correct?",
      },
      {
        speaker: 'partner',
        text: "How would you like to pay?",
        choices: [
          { text: "By credit card, please. I'd like to leave a deposit for minibar and room service.", feedback: "Clear and professional.", good: true },
          { text: "Card.", feedback: "Understood, but 'By credit card, please' is more complete.", good: false },
          { text: "I'll pay when I check out.", feedback: "Fine if the hotel allows it. You can also say 'I'll settle the bill at checkout.'", good: true },
        ],
      },
      {
        speaker: 'partner',
        text: "Here's your key card. Your room is 405 on the fourth floor. The elevator is to your left. Breakfast is from 7 to 10 a.m. in the dining room. Do you need help with your luggage?",
      },
      {
        speaker: 'partner',
        text: "Anything else I can help you with?",
        choices: [
          { text: "Could you tell me what time the gym and pool close, please?", feedback: "Good question – practical and polite.", good: true },
          { text: "No, thank you. That's all.", feedback: "Polite and clear.", good: true },
          { text: "Where is my room?", feedback: "They already told you (room 405). Ask for directions if you're unsure.", good: false },
        ],
      },
      {
        speaker: 'partner',
        text: "Enjoy your stay! If you need anything, just call reception.",
      },
    ],
  },
  {
    id: 4,
    title: 'Conversa Casual',
    scenario: 'Pratique small talk e expressões do dia-a-dia',
    icon: '💬',
    level: 'Básico',
    steps: [
      {
        speaker: 'partner',
        text: "Hi! How are you doing?",
      },
      {
        speaker: 'partner',
        text: "How would you respond in a casual way?",
        choices: [
          { text: "I'm good, thanks! And you?", feedback: "Natural and friendly. Perfect for small talk.", good: true },
          { text: "I am fine, thank you. How are you?", feedback: "Correct but a bit formal. 'I'm good, thanks!' is more casual.", good: false },
          { text: "Not bad! Busy week. How about you?", feedback: "Sounds natural and opens the conversation.", good: true },
        ],
      },
      {
        speaker: 'partner',
        text: "Yeah, same here! So, did you do anything nice at the weekend?",
      },
      {
        speaker: 'partner',
        text: "What could you say?",
        choices: [
          { text: "I just relaxed at home. What about you?", feedback: "Simple and natural. Good for casual chat.", good: true },
          { text: "I have done many activities.", feedback: "A bit vague. Adding one or two examples sounds more natural.", good: false },
          { text: "I went for a walk and met some friends. It was nice!", feedback: "Clear and friendly. Great for small talk.", good: true },
        ],
      },
      {
        speaker: 'partner',
        text: "Sounds good! Well, I'd better go. Catch you later!",
      },
      {
        speaker: 'partner',
        text: "How do you say goodbye in a casual way?",
        choices: [
          { text: "See you! Take care.", feedback: "Friendly and natural. Perfect.", good: true },
          { text: "I am leaving now. Goodbye.", feedback: "Too formal for this context. 'See you!' is more casual.", good: false },
          { text: "Bye! Have a good one.", feedback: "Very natural. Nice way to end the conversation.", good: true },
        ],
      },
    ],
  },
];
