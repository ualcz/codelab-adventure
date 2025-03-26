import { Level } from '@/types/levelTypes';
import { defaultRobot } from '../gameObjects';

const LEVELS: Level[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    name: "Introdução à Repetição",
    description: "Descubra o poder dos laços",
    difficulty: "beginner",
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
    id: 4,
    name: "Padrões Geométricos",
    description: "Crie movimentos repetitivos",
    difficulty: "intermediate",
    maxBlocks: 4,
    gridSize: { width: 5, height: 5 },
    objects: [
      { ...defaultRobot, x: 0, y: 0 },
      { id: 'collectible1', type: 'collectible', x: 3, y: 0, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 3, y: 3, width: 1, height: 1 },
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
    id: 5,
    name: "Introdução a Algoritmos",
    description: "Resolva problemas com estratégia",
    minBlocks:11,
    difficulty: "intermediate",
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
  },
  {
    id: 6,
    name: "Otimização de Rota",
    description: "Encontre o caminho mais eficiente",
    difficulty: "advanced",
    gridSize: { width: 9, height: 7 },
    objects: [
      { ...defaultRobot, x: 0, y: 0 },
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 5 },
      { id: 'obstacle2', type: 'obstacle', x: 5, y: 2, width: 1, height: 5 },
      { id: 'collectible1', type: 'collectible', x: 1, y: 6, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 4, y: 6, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 7, y: 6, width: 1, height: 1 },
      { id: 'target1', type: 'target', x: 8, y: 0, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "repeat", "stop"],
    objective: "Encontre a rota mais curta, coletando todos os itens",
    hint: "Pense em diferentes estratégias para minimizar movimentos",
    unlocked: true,
    completed: false,
    concepts: ["otimização", "estratégia algoritmica"]
  },
  {
    id: 7,
    name: "Espiral de Coleta",
    minBlocks: 8,
    description: "Desenvolva um algoritmo de coleta",
    difficulty: "advanced",
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
 
  {
    id: 12,
    name: "Novos sensores ",
    minBlocks: 6,
    description: "use o bloco roxo para detectar obstáculos, bordas e células coloridas",
    difficulty: "expert",
    colorCycleSpeed: 10000,
    gridSize: { width: 8, height: 8 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      
      // Obstáculos estratégicos
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 1, width: 1, height: 2 },
      { id: 'obstacle2', type: 'obstacle', x: 0, y: 4, width: 3, height: 1 },
      { id: 'obstacle3', type: 'obstacle', x: 5, y: 1, width: 1, height: 3 },
      { id: 'obstacle4', type: 'obstacle', x: 5, y: 5, width: 1, height: 2 },
      
      // Células coloridas em padrões complexos
      { id: 'color1', type: 'colorCell', x: 3, y: 2, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color2', type: 'colorCell', x: 4, y: 3, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color3', type: 'colorCell', x: 3, y: 5, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color4', type: 'colorCell', x: 5, y: 0, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color4', type: 'colorCell', x: 4, y: 6, color: 'red', isBlocking: true, width: 1, height: 1 },
      
      // Coletáveis
      { id: 'collectible1', type: 'collectible', x: 3, y: 1, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 3, y: 4, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 4, y: 5, width: 1, height: 1 },
      { id: 'collectible4', type: 'collectible', x: 7, y: 0, width: 1, height: 1 },
      { id: 'collectible5', type: 'collectible', x: 4, y: 1, width: 1, height: 1 },
      { id: 'collectible6', type: 'collectible', x: 7, y: 4, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 0, y: 5, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "while", "paintGreen"],
    availableSensors: ["barrier", "collectible", "target", "greenCell","redCell"],
    objective: "Colete todos os itens e chegue ao alvo usando sensores e condições lógicos para tomar decisões complexas",
    hint: "user o combine os laco condicionas com o bloco roxo para detectar obstáculos, bordas e Celtulas coloridas",
    unlocked: false,
    completed: false,
    concepts: ["operadores lógicos", "tomada de decisão complexa"],
  },
  {
    id: 13,
    name: 'Labirinto de Cores Alternantes',
    description: 'Supere obstáculos e domine o timing com células que mudam de cor',
    difficulty: 'advanced',
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "stop", "repeat", "while","paintGreen"],
    availableSensors: ["redCell", "greenCell", "barrier", "border"],
    unlocked: true,
    completed: false,
    concepts: ['Condicionais', 'Células Coloridas', 'Timing', 'Planejamento de Rota'],
    objective: 'Guie o robô até o alvo, observando as células que mudam de cor e desviando das barreiras.',
    hint: 'As células alternam entre verde e vermelho. Verde permite passagem, vermelho bloqueia. Observe o padrão de alternância e planeje seus movimentos!',
    gridSize: { width: 8, height: 12 },
    colorCycleSpeed: 15500,
    objects: [
      { ...defaultRobot, x: 0, y: 0 , rotation: 180 },
      
      { id: 'obstacle1', type: 'obstacle', x: 1, y: 1, width: 3, height: 1},
      { id: 'obstacle2', type: 'obstacle', x: 4, y: 1, width: 1, height: 2 },
      { id: 'obstacle3', type: 'obstacle', x: 5, y: 2, width: 1, height: 1 },
      { id: 'obstacle4', type: 'obstacle', x: 6, y: 0, width: 2, height: 1 },
      { id: 'obstacle5', type: 'obstacle', x: 0, y: 3, width: 3, height: 1 },
      { id: 'obstacle6', type: 'obstacle', x: 7, y: 2, width: 1, height: 8 },
      { id: 'obstacle7', type: 'obstacle', x: 3, y: 6, width: 3, height: 1 },
      { id: 'obstacle8', type: 'obstacle', x: 1, y: 9, width: 5, height: 2 },
      { id: 'obstacle9', type: 'obstacle', x: 1, y: 6, width: 2, height: 2 },
      
      { id: 'color1', type: 'colorCell', x: 3, y: 2, color: 'red', isBlocking: true, width: 1, height: 1 },
      
      { id: 'color4', type: 'colorCell', x: 2, y: 4, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color5', type: 'colorCell', x: 3, y: 4, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color6', type: 'colorCell', x: 6, y: 4, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color7', type: 'colorCell', x: 6, y: 5, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color8', type: 'colorCell', x: 3, y: 2, color: 'green', isBlocking: true, width: 1, height: 1 },
      { id: 'color9', type: 'colorCell', x: 0, y: 7, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color10', type: 'colorCell', x: 0, y: 11, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color11', type: 'colorCell', x: 5, y: 11, color: 'red', isBlocking: true, width: 1, height: 1 },
      
      { id: 'color12', type: 'colorCell', x: 6, y: 9, color: 'green', isBlocking: false, width: 1, height: 1 },
      
      { id: 'target1', type: 'target', x: 6, y: 11, width: 1, height: 1 }
    ]
  }
];

export default LEVELS;
