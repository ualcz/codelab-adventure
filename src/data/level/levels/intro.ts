import { Level } from '@/types/levelTypes';
import { defaultRobot } from '@/data/gameObjects';

const introduction: Level[] = [
    {
        module: "Intodução",
        name: "Primeiro Passo",
        description: "Aprenda movimentos básicos",
        difficulty: "beginner",
        maxBlocks: 5,
        minBlocks: 3,
        gridSize: { width: 3, height: 3 },
        objects: [
          { ...defaultRobot, x: 0, y: 0, rotation: 90 },
          { id: 'target1', type: 'target', x: 2, y: 2, width: 1, height: 1 }
        ],
        availableCommands: ["moveForward", "turnRight", "stop"],
        availableSensors: [],
        objective: "Mova o robô até o alvo usando movimentos simples",
        hint: "Use 'mover para frente' e 'virar à direita' para chegar ao destino",
        unlocked: true,
        completed: false,
        concepts: ["direcionamento", "sequência de comandos"]
      },
      {
        module: "Intodução",
        name: "Navegando com Precisão",
        description: "Explore movimentos em múltiplas direções",
        difficulty: "beginner",
        gridSize: { width: 4, height: 4 },
        objects: [
          { ...defaultRobot, x: 0, y: 0, rotation: 90 },
          { id: 'obstacle1', type: 'obstacle', x: 1, y: 0, width: 1, height: 2 },
          { id: 'target1', type: 'target', x: 3, y: 3, width: 1, height: 1 }
        ],
        availableCommands: ["moveForward", "turnRight", "turnLeft", "stop"],
        objective: "Desvie do obstáculo e alcance o alvo",
        hint: "Planeje sua rota, usando voltas à direita e à esquerda",
        unlocked: true,
        completed: false,
        concepts: ["planejamento de rota", "tomada de decisão"]
      }
];

export default introduction;