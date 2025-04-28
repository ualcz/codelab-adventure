import { Level } from '@/types/levelTypes';
import { defaultRobot } from '@/data/gameObjects';

const repeat: Level[] = [
{
  module: "Laços de Repetição",
  name: "Introdução à Repetição",
  description: "Descubra o poder dos laços",
  difficulty: "beginner", // Kept as "beginner" - Basic loop introduction
  gridSize: { width: 6, height: 1 },
  objects: [
    { ...defaultRobot, x: 0, y: 0, rotation: 90 },
    { id: 'target1', type: 'target', x: 5, y: 0, width: 1, height: 1 }
  ],
  availableCommands: ["moveForward", "repeat", "stop"],
  objective: "Use repetição para chegar ao alvo de forma eficiente",
  hint: "Em vez de repetir 'mover para frente' várias vezes, use um laço",
  unlocked: true,
  completed: false,
  concepts: ["eficiência", "introdução a laços"]
},
{
  module: "Laços de Repetição",
  name: "Padrões Geométricos",
  description: "Crie movimentos repetitivos",
  difficulty: "intermediate",
  maxBlocks: 4,
  gridSize: { width: 5, height: 5 },
  objects: [
    { ...defaultRobot, x: 0, y: 0 },
    { id: 'collectible1', type: 'collectible', x: 3, y: 0, width: 1, height: 1 },
    { id: 'collectible2', type: 'collectible', x: 3, y: 3, width: 1, height: 1 },
    { id: 'collectible3', type: 'collectible', x: 0, y: 3, width: 1, height: 1 },
    { id: 'target1', type: 'target', x: 0, y: 0, width: 1, height: 1 }
  ],
  availableCommands: ["moveForward", "turnRight", "repeat", "stop"],
  objective: "Trace um quadrado, coletando itens e retornando ao início",
  hint: "Use laços para repetir o padrão 'andar, virar à direita'",
  unlocked: true,
  completed: false,
  concepts: ["padrões geométricos", "laços com múltiplos comandos"]
},
{
  module: "Laços de Repetição",
  name: "Introdução a Algoritmos",
  description: "Resolva problemas com estratégia",
  minBlocks:11,
  difficulty: "advanced",
  gridSize: { width: 8, height: 5 },
  objects: [
    { ...defaultRobot, x: 0, y: 0, rotation: 180 },

    { id: 'obstacle1', type: 'obstacle', x: 5, y: 0, width: 1, height: 4},
    { id: 'obstacle2', type: 'obstacle', x: 2, y: 0, width: 1, height: 4},
    { id: 'obstacle3', type: 'obstacle', x: 6, y: 1, width: 1, height: 3},

    { id: 'collectible1', type: 'collectible', x: 3, y: 0, width: 1, height: 1 },
    { id: 'collectible2', type: 'collectible', x: 4, y: 0, width: 1, height: 1 },
    { id: 'collectible3', type: 'collectible', x: 3, y: 4, width: 1, height: 1 },
    { id: 'collectible4', type: 'collectible', x: 4, y: 4, width: 1, height: 1 },
    { id: 'target1', type: 'target', x: 6, y: 0, width: 1, height: 1 }
  ],
  availableCommands: ["moveForward", "turnRight", "turnLeft", "repeat", "stop"],
  objective: "Desenvolva uma estratégia para coletar itens e chegar ao alvo",
  hint: "Divida o problema em etapas menores. Planeje cada movimento.",
  unlocked: true,
  completed: false,
  concepts: ["decomposição de problemas", "estratégia de resolução"]
},{
  module: "Laços de Repetição",
  name: "Otimização de Rota",
  description: "Encontre o caminho mais eficiente",
  difficulty: "intermediate",
  gridSize: { width: 8, height: 8 },
  objects: [
    { ...defaultRobot, x: 0, y: 0 , rotation: 180 },
    { id: 'obstacle1', type: 'obstacle', x: 0, y: 3, width: 2, height: 2 },
    { id: 'obstacle2', type: 'obstacle', x: 6, y: 3, width: 2, height: 2 },

    { id: 'collectible1', type: 'collectible', x: 0, y: 7, width: 1, height: 1 },
    { id: 'collectible2', type: 'collectible', x: 2, y: 7, width: 1, height: 1 },
    { id: 'collectible3', type: 'collectible', x: 5, y: 7, width: 1, height: 1 },
    { id: 'collectible4', type: 'collectible', x: 5, y: 2, width: 1, height: 1 },
    { id: 'collectible5', type: 'collectible', x: 5, y: 4, width: 1, height: 1 },
    { id: 'collectible6', type: 'collectible', x: 7, y: 7, width: 1, height: 1 },
    { id: 'collectible7', type: 'collectible', x: 2, y: 2, width: 1, height: 1 },
    { id: 'collectible8', type: 'collectible', x: 2, y: 4, width: 1, height: 1 },

    { id: 'target1', type: 'target', x: 7, y: 0, width: 1, height: 1 }
  ],
  availableCommands: ["moveForward", "turnRight", "turnLeft", "repeat", "stop"],
  objective: "Encontre a rota mais curta, coletando todos os itens",
  hint: "Pense em diferentes estratégias para minimizar movimentos",
  unlocked: true,
  completed: false,
  concepts: ["otimização", "estratégia algoritmica"]
},
{
  module: "Laços de Repetição",
  name: "Espiral de Coleta",
  minBlocks: 8,
  description: "Desenvolva um algoritmo de coleta",
  difficulty: "expert",
  gridSize: { width: 9, height: 9 },
  objects: [
    { ...defaultRobot, x: 4, y: 4, rotation: 0 },

    { id: 'collectible1', type: 'collectible', x: 3, y: 3, width: 1, height: 1 },
    { id: 'collectible2', type: 'collectible', x: 3, y: 4, width: 1, height: 1 },

    { id: 'collectible3', type: 'collectible', x: 3, y: 5, width: 1, height: 1 },
    { id: 'collectible4', type: 'collectible', x: 4, y: 5, width: 1, height: 1 },
    { id: 'collectible5', type: 'collectible', x: 5, y: 5, width: 1, height: 1 },

    { id: 'collectible6', type: 'collectible', x: 4, y: 6, width: 1, height: 1 },
    { id: 'collectible7', type: 'collectible', x: 5, y: 6, width: 1, height: 1 },
    { id: 'collectible8', type: 'collectible', x: 6, y: 6, width: 1, height: 1 },

    { id: 'collectible9', type: 'collectible', x: 5, y: 7, width: 1, height: 1 },
    { id: 'collectible10', type: 'collectible', x: 6, y: 7, width: 1, height: 1 },
    { id: 'collectible11', type: 'collectible', x: 7, y: 7, width: 1, height: 1 },

    {id: 'collectible12', type: 'collectible', x: 6, y: 8, width: 1, height: 1 },
    {id: 'collectible13', type: 'collectible', x: 7, y: 8, width: 1, height: 1 },
    
    { id: 'target1', type: 'target', x: 8, y: 8, width: 1, height: 1 }
  ],
  availableCommands: ["moveForward", "turnRight", "turnLeft", "repeat", "stop"],
  objective: "Desenvolva um algoritmo em espiral para coletar todos os itens",
  hint: "Crie um padrão de movimento em espiral para coleta eficiente",
  unlocked: true,
  completed: false,
  concepts: ["algoritmos de varredura", "padrões de movimento"]
},
{
  module: "Laços de Repetição",
  name: "Desafio Algorítmico",
  maxBlocks:14,
  description: "Aplique todos os conceitos aprendidos",
  difficulty: "advanced",
  gridSize: { width: 9, height: 10 },
  objects: [
    { ...defaultRobot, x: 0, y: 0 , rotation: 180 },
    { id: 'obstacle1', type: 'obstacle', x: 1, y: 0, width: 1, height: 7 },
    { id: 'obstacle2', type: 'obstacle', x: 3, y: 3, width: 1, height: 7 },
    { id: 'obstacle3', type: 'obstacle', x: 5, y: 0, width: 1, height: 7 },
    { id: 'obstacle4', type: 'obstacle', x: 7, y: 3, width: 1, height: 7 },


    { id: 'collectible1', type: 'collectible', x: 1, y: 9, width: 1, height: 1 },
    { id: 'collectible2', type: 'collectible', x: 4, y: 9, width: 1, height: 1 },
    { id: 'collectible3', type: 'collectible', x: 6, y: 9, width: 1, height: 1 },
    { id: 'collectible4', type: 'collectible', x: 2, y: 0, width: 1, height: 1 },
    { id: 'collectible5', type: 'collectible', x: 4, y: 0, width: 1, height: 1 },
    { id: 'collectible6', type: 'collectible', x: 7, y: 0, width: 1, height: 1 },
    

    { id: 'target1', type: 'target', x: 8, y: 0, width: 1, height: 1 }
  ],
  availableCommands: ["moveForward", "turnRight", "turnLeft", "repeat", "stop"],
  objective: "Utilize todos os conceitos para navegar pelo labirinto complexo",
  hint: "Combine todos os algoritmos e estratégias aprendidas",
  unlocked: true,
  completed: false,
  concepts: ["pensamento computacional", "resolução de problemas complexos"]
},
];

export default repeat;