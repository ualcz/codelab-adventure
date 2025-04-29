import { Level } from '@/types/levelTypes';
import { defaultRobot } from '@/data/gameObjects';

const repeat: Level[] = [
{
  module: "Laços",
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
  module: "Laços",
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
  module: "Laços",
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
  module: "Laços",
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
  module: "Laços",
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
  module: "Laços",
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
{
  module: "Laços",
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
  module: "Laços",
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
  module: "Laços",
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

export default repeat;