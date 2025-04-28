import { Level } from '@/types/levelTypes';
import { defaultRobot } from '@/data/gameObjects';

const  repeatcondicionais: Level[] = [
    {
        module: "laços condicionais",
        name: "Introdução a laços condicionais",
        minBlocks: 7,
        description: "Utilize laços condicionais para resolver problemas mais complexos",
        difficulty: "intermediate",
        gridSize: { width: 8, height: 8 },
        objects: [
          { ...defaultRobot, x: 3, y: 4, rotation: 90 },
          
          // Labirinto em espiral
          { id: 'obstacle1', type: 'obstacle', x: 1, y: 0, width: 7, height: 1 },
          { id: 'obstacle2', type: 'obstacle', x: 0, y: 0, width: 1, height: 7 },
          { id: 'obstacle3', type: 'obstacle', x: 0, y: 7, width: 7, height: 1 },
          { id: 'obstacle4', type: 'obstacle', x: 7, y: 1, width: 1, height: 7 },
          { id: 'obstacle5', type: 'obstacle', x: 2, y: 2, width: 2, height: 1 },
          { id: 'obstacle6', type: 'obstacle', x: 2, y: 3, width: 1, height: 2 },
          { id: 'obstacle7', type: 'obstacle', x: 2, y: 5, width: 3, height: 1 },
          { id: 'obstacle8', type: 'obstacle', x: 5, y: 1, width: 1, height: 5 },
          
          // Coletáveis em padrão estratégico
          { id: 'collectible1', type: 'collectible', x: 4, y: 2, width: 1, height: 1 },
          { id: 'collectible2', type: 'collectible', x: 4, y: 4, width: 1, height: 1 },
          { id: 'collectible3', type: 'collectible', x: 4, y: 6, width: 1, height: 1 },
          { id: 'collectible4', type: 'collectible', x: 6, y: 2, width: 1, height: 1 },
          { id: 'collectible5', type: 'collectible', x: 6, y: 4, width: 1, height: 1 },
          { id: 'collectible6', type: 'collectible', x: 6, y: 6, width: 1, height: 1 },
          
          // Alvo
          { id: 'target1', type: 'target', x: 6, y: 1, width: 1, height: 1 }
        ],
        availableCommands: ["moveForward", "turnRight", "turnLeft", "while"],
        availableSensors: ["barrier","target"],
        objective: "Desenvolva uma estratégia para coletar itens e chegar ao alvo",
        hint: "Crie um laço condicional para executar um bloco de comandos enquanto uma condição for verdadeira",
        unlocked: false,
        completed: false,
        concepts: ["pensamento computacional", "resolução de problemas complexos"],
      },
      {
        module: "laços condicionais",
        name: "Laços Condicionais",
        minBlocks: 8,
        description: "Use condicionais diferentes para resolver problemas mais complexos",
        difficulty: "intermediate",
        gridSize: { width: 6, height:6 },
        objects: [
          { ...defaultRobot, x: 0, y: 0 , rotation: 180 },
    
          { id: 'obstacle1', type: 'obstacle', x: 0, y: 3, width: 4, height: 1 },
          { id: 'target1', type: 'target', x: 5, y: 5, width: 1, height: 1 }
        ],
        availableCommands: ["moveForward", "turnRight", "turnLeft","while"],
        availableSensors: ["barrier", "border"],
        objective: "descubre o poder dos laços condicionais",
        hint: "Crie um laço condicional para executar um bloco de comandos enquanto uma condição for verdadeira",
        unlocked: true,
        completed: false,
        concepts: ["laços condicionais", "pensamento computacional"],
      },
      {
        module: "laços condicionais",
        name: "Laços Dentro de Laços",
        minBlocks: 12,
        description: "Use laços condicionais aninhados para resolver problemas mais complexos",
        difficulty: "intermediate",
        gridSize: { width: 12, height: 12 },
        objects: [
          { ...defaultRobot, x: 0, y: 0, rotation: 90 },
          // Labirinto com múltiplas seções
          { id: 'maze1', type: 'obstacle', x: 2, y: 1, width: 1, height: 8 },
          { id: 'maze2', type: 'obstacle', x: 0, y: 2, width: 2, height: 1 },
          { id: 'maze3', type: 'obstacle', x: 0, y: 9, width: 1, height: 1 },
          { id: 'maze4', type: 'obstacle', x: 4, y: 2, width: 5, height: 1 },
          { id: 'maze5', type: 'obstacle', x: 5, y: 3, width: 1, height: 4 },
          { id: 'maze6', type: 'obstacle', x: 3, y: 5, width: 1, height: 1 },
          { id: 'maze7', type: 'obstacle', x: 3, y: 8, width: 3, height: 1 },
          { id: 'maze8', type: 'obstacle', x: 7, y: 5, width: 1, height: 3 },
          { id: 'maze9', type: 'obstacle', x: 10, y: 0, width: 1, height: 10 },
          { id: 'maze10', type: 'obstacle', x: 6, y: 10, width: 5, height: 1 },
          { id: 'maze11', type: 'obstacle', x: 4, y: 0, width: 1, height: 1 },
    
          {id: 'collectible1', type: 'collectible', x: 9, y: 9, width: 1, height: 1 },
    
          { id: 'target1', type: 'target', x: 1, y: 3, width: 1, height: 1 }
        ],
        availableCommands: ["moveForward", "turnRight", "turnLeft", "while"],
        availableSensors: ["barrier", "border", "collectible"],
        objective: "Navegue pelo labirinto complexo usando laços aninhados e diferentes estratégias",
        hint: "Pense em laços dentro de outros laços para resolver diferentes partes do problema",
        unlocked: false,
        completed: false,
        concepts: ["laços aninhados", "estruturas de controle complexas", "resolução de problemas avançados"],
      },
];

export default repeatcondicionais;