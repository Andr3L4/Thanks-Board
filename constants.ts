import type { ThankYouMessage } from './types';

const now = Date.now();

export const NOTE_COLORS = [
  '#FFFACD', // lemonchiffon
  '#ADD8E6', // lightblue
  '#FFB6C1', // lightpink
  '#90EE90', // lightgreen
  '#F0E68C', // khaki
  '#E6E6FA', // lavender
];

const getRandomColor = () => NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];

export const INITIAL_MESSAGES: ThankYouMessage[] = [
  { id: 1, text: "To the person who held the door for me when my hands were full, thank you. It made my day.", rotation: -1, createdAt: now, color: getRandomColor() },
  { id: 2, text: "Thank you to the barista who always remembers my order and greets me with a smile. You're awesome!", rotation: 2, createdAt: now, color: getRandomColor() },
  { id: 3, text: "To my friend who listened without judgment when I was having a tough time, I'm so grateful for you.", rotation: 1, createdAt: now, color: getRandomColor() },
  { id: 4, text: "Thank you to the stranger who paid for my coffee this morning. I'll pay it forward!", rotation: 0, createdAt: now, color: getRandomColor() },
  { id: 5, text: "A huge thanks to the developer of my favorite open-source library. You've saved me countless hours.", rotation: -2, createdAt: now, color: getRandomColor() },
  { id: 6, text: "To the person who leaves positive comments online, you make the internet a better place. Thank you.", rotation: 1, createdAt: now, color: getRandomColor() },
  { id: 7, text: "I'm grateful for the teacher who saw potential in me when I didn't see it in myself. You changed my life.", rotation: -1, createdAt: now, color: getRandomColor() },
  { id: 8, text: "Thank you to the delivery driver working late nights to bring us food and packages. We appreciate you!", rotation: 2, createdAt: now, color: getRandomColor() },
];
