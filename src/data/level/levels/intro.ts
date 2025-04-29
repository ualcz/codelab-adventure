import { Level } from '@/types/levelTypes';
import { defaultRobot } from '@/data/gameObjects';

const introduction: Level[] = [
    {
        module: "Introdução",
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
        module: "Introdução",
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
      },
      {
        module: "Introdução",
        name: "Caminho em Zigue-Zague",
        description: "Pratique movimentos precisos em um caminho com curvas",
        difficulty: "beginner",
        gridSize: { width: 5, height: 5 },
        objects: [
          { ...defaultRobot, x: 0, y: 0, rotation: 90 },
          { id: 'obstacle1', type: 'obstacle', x: 1, y: 1, width: 3, height: 1 },
          { id: 'obstacle2', type: 'obstacle', x: 1, y: 3, width: 3, height: 1 },
          { id: 'target1', type: 'target', x: 4, y: 4, width: 1, height: 1 }
        ],
        availableCommands: ["moveForward", "turnRight", "turnLeft", "stop"],
        objective: "Navegue pelo caminho em zigue-zague até o alvo",
        hint: "Planeje cuidadosamente suas curvas para evitar os obstáculos",
        unlocked: false,
        completed: false,
        concepts: ["sequência de comandos", "planejamento de rota"]
      },
      {
        module: "Introdução",
        name: "Coletando Tesouros",
        description: "Aprenda a coletar itens durante o percurso",
        difficulty: "beginner",
        gridSize: { width: 5, height: 5 },
        objects: [
          { ...defaultRobot, x: 0, y: 0, rotation: 90 },
          { id: 'collectible1', type: 'collectible', x: 2, y: 1, width: 1, height: 1 },
          { id: 'collectible2', type: 'collectible', x: 3, y: 3, width: 1, height: 1 },
          { id: 'target1', type: 'target', x: 4, y: 4, width: 1, height: 1 }
        ],
        availableCommands: ["moveForward", "turnRight", "turnLeft", "stop"],
  
        objective: "Colete todos os tesouros e chegue ao alvo",
        hint: "Planeje uma rota que passe por todos os tesouros antes de chegar ao destino",
        unlocked: false,
        completed: false,
        concepts: ["coleta de itens", "planejamento de rota"]
      },
      {
        module: "Introdução",
        name: "Labirinto Simples",
        description: "Navegue por um pequeno labirinto até o alvo",
        difficulty: "beginner",
        gridSize: { width: 6, height: 6 },
        objects: [
          { ...defaultRobot, x: 0, y: 0, rotation: 90 },
          { id: 'obstacle1', type: 'obstacle', x: 1, y: 0, width: 1, height: 4 },
          { id: 'obstacle2', type: 'obstacle', x: 2, y: 2, width: 3, height: 1 },
          { id: 'obstacle3', type: 'obstacle', x: 3, y: 4, width: 1, height: 2 },
          { id: 'target1', type: 'target', x: 5, y: 5, width: 1, height: 1 }
        ],
        availableCommands: ["moveForward", "turnRight", "turnLeft", "stop"],
        objective: "Encontre o caminho através do labirinto até o alvo",
        hint: "Planeje cuidadosamente suas curvas para evitar os obstáculos",
        unlocked: false,
        completed: false,
        concepts: ["navegação em labirinto", "detecção de obstáculos"]
      },
      {
        module: "Introdução",
        name: "Desafio Final de Introdução",
        description: "Combine todos os conceitos aprendidos até agora",
        difficulty: "intermediate",
        gridSize: { width: 8, height: 8 },
        objects: [
          { ...defaultRobot, x: 0, y: 0, rotation: 90 },
          { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 3 },
          { id: 'obstacle2', type: 'obstacle', x: 2, y: 4, width: 1, height: 4 },
          { id: 'obstacle3', type: 'obstacle', x: 4, y: 2, width: 3, height: 1 },
          { id: 'obstacle4', type: 'obstacle', x: 4, y: 5, width: 3, height: 1 },
          { id: 'collectible1', type: 'collectible', x: 3, y: 3, width: 1, height: 1 },
          { id: 'collectible2', type: 'collectible', x: 6, y: 3, width: 1, height: 1 },
          { id: 'target1', type: 'target', x: 7, y: 7, width: 1, height: 1 }
        ],
        availableCommands: ["moveForward", "turnRight", "turnLeft", "stop"],
        objective: "Navegue pelo labirinto, colete todos os itens e chegue ao alvo",
        hint: "Use todos os conceitos aprendidos para alcançar o objetivo",
        unlocked: false,
        completed: false,
        concepts: ["integração de conceitos", "planejamento estratégico"]
      }
];

export default introduction;