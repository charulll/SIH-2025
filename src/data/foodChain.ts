import { GameLevel, FoodChain, FoodChainElement } from '../types/game';
import grassImage from '../assets/grass.png';
import rabbitImage from '../assets/rabbit.png';
import hawkImage from '../assets/hawk.png';
import sunImage from '../assets/sun.png';
import caterpillarImage from '../assets/caterpillar.png';

// Food chain elements
const elements: Record<string, FoodChainElement> = {
  sun: {
    id: 'sun',
    name: 'Sun',
    image: sunImage,
    description: 'The ultimate source of energy for all life on Earth',
    level: 'producer'
  },
  grass: {
    id: 'grass',
    name: 'Grass',
    image: grassImage,
    description: 'A producer that converts sunlight into energy through photosynthesis',
    level: 'producer'
  },
  rabbit: {
    id: 'rabbit',
    name: 'Rabbit',
    image: rabbitImage,
    description: 'A primary consumer that eats plants and grass',
    level: 'primary_consumer'
  },
  caterpillar: {
    id: 'caterpillar',
    name: 'Caterpillar',
    image: caterpillarImage,
    description: 'A primary consumer that feeds on leaves and plants',
    level: 'primary_consumer'
  },
  hawk: {
    id: 'hawk',
    name: 'Hawk',
    image: hawkImage,
    description: 'A secondary consumer that hunts smaller animals',
    level: 'secondary_consumer'
  }
};

// Food chains for different levels
const basicFoodChains: FoodChain[] = [
  {
    id: 'grass-rabbit-hawk',
    name: 'Grassland Food Chain',
    elements: [elements.grass, elements.rabbit, elements.hawk],
    description: 'A simple grassland food chain showing energy flow from producers to consumers',
    ecosystem: 'Grassland'
  }
];

const mediumFoodChains: FoodChain[] = [
  {
    id: 'sun-grass-rabbit-hawk',
    name: 'Complete Grassland Chain',
    elements: [elements.sun, elements.grass, elements.rabbit, elements.hawk],
    description: 'A complete food chain starting from the sun as the energy source',
    ecosystem: 'Grassland'
  },
  {
    id: 'sun-grass-caterpillar-hawk',
    name: 'Insect Food Chain',
    elements: [elements.sun, elements.grass, elements.caterpillar, elements.hawk],
    description: 'An alternative food chain featuring insects as primary consumers',
    ecosystem: 'Garden'
  }
];

const hardFoodChains: FoodChain[] = [
  {
    id: 'complex-chain',
    name: 'Complex Ecosystem Chain',
    elements: [elements.sun, elements.grass, elements.caterpillar, elements.rabbit, elements.hawk],
    description: 'A complex food web showing multiple feeding relationships',
    ecosystem: 'Mixed Ecosystem'
  }
];

// Game levels
export const gameLevels: GameLevel[] = [
  {
    id: 'basic',
    name: 'Basic Food Chain',
    difficulty: 'basic',
    foodChains: basicFoodChains,
    maxScore: 100
  },
  {
    id: 'medium',
    name: 'Medium Food Chain',
    difficulty: 'medium',
    foodChains: mediumFoodChains,
    maxScore: 200
  },
  {
    id: 'hard',
    name: 'Hard Food Chain',
    difficulty: 'hard',
    foodChains: hardFoodChains,
    maxScore: 300
  }
];

// Educational content
// export const educationalContent = {
//   whatIsFoodChain: {
//     title: "What is a Food Chain?",
//     content: "A food chain shows how energy and nutrients flow from one living thing to another in an ecosystem. It starts with producers (like plants) and moves through different levels of consumers."
//   },
//   energyFlow: {
//     title: "Energy Flow",
//     content: "Energy flows in one direction through a food chain - from the sun to producers, then to primary consumers, secondary consumers, and so on. Only about 10% of energy is passed to the next level."
//   },
//   roles: {
//     title: "Roles in Food Chains",
//     content: {
//       producers: "Plants that make their own food using sunlight (photosynthesis)",
//       primaryConsumers: "Animals that eat plants (herbivores)",
//       secondaryConsumers: "Animals that eat other animals (carnivores)",
//       decomposers: "Organisms that break down dead material and return nutrients to soil"
//     }
//   }
// };