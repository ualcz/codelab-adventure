
import { Level } from './levelTypes';
import { defaultRobot } from './gameObjects';

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
      { ...defaultRobot, x: 0, y: 0, rotation: 0 },
      { id: 'obstacle1', type: 'obstacle', x: 1, y: 1, width: 1, height: 1 },
      { id: 'target1', type: 'target', x: 3, y: 3, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "stop","while"],
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
    difficulty: "intermediate",
    gridSize: { width: 7, height: 5 },
    objects: [
      { ...defaultRobot, x: 0, y: 0 },
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 3 },
      { id: 'obstacle2', type: 'obstacle', x: 4, y: 2, width: 1, height: 3 },
      { id: 'collectible1', type: 'collectible', x: 1, y: 4, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 3, y: 4, width: 1, height: 1 },
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
    name: "Labirinto Lógico",
    description: "Navegue usando lógica e repetição",
    difficulty: "intermediate",
    gridSize: { width: 8, height: 6 },
    objects: [
      { ...defaultRobot, x: 0, y: 0 },
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 4 },
      { id: 'obstacle2', type: 'obstacle', x: 5, y: 2, width: 1, height: 4 },
      { id: 'collectible1', type: 'collectible', x: 3, y: 5, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 6, y: 5, width: 1, height: 1 },
      { id: 'target1', type: 'target', x: 7, y: 0, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "repeat", "stop"],
    objective: "Encontre o caminho através de obstáculos, coletando itens",
    hint: "Use laços aninhados para criar padrões de navegação",
    unlocked: true,
    completed: false,
    concepts: ["navegação complexa", "laços aninhados"]
  },
  {
    id: 7,
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
    id: 8,
    name: "Espiral de Coleta",
    description: "Desenvolva um algoritmo de coleta",
    difficulty: "advanced",
    gridSize: { width: 9, height: 9 },
    objects: [
      { ...defaultRobot, x: 4, y: 4, rotation: 0 },
      { id: 'collectible1', type: 'collectible', x: 3, y: 3, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 5, y: 3, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 5, y: 5, width: 1, height: 1 },
      { id: 'collectible4', type: 'collectible', x: 3, y: 5, width: 1, height: 1 },
      { id: 'collectible5', type: 'collectible', x: 2, y: 4, width: 1, height: 1 },
      { id: 'collectible6', type: 'collectible', x: 6, y: 4, width: 1, height: 1 },
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
    id: 9,
    name: "Desafio Algorítmico",
    description: "Aplique todos os conceitos aprendidos",
    difficulty: "advanced",
    gridSize: { width: 10, height: 10 },
    objects: [
      { ...defaultRobot, x: 0, y: 0 },
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 7 },
      { id: 'obstacle2', type: 'obstacle', x: 5, y: 3, width: 1, height: 7 },
      { id: 'obstacle3', type: 'obstacle', x: 8, y: 0, width: 1, height: 7 },
      { id: 'collectible1', type: 'collectible', x: 1, y: 9, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 4, y: 9, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 7, y: 9, width: 1, height: 1 },
      { id: 'collectible4', type: 'collectible', x: 9, y: 9, width: 1, height: 1 },
      { id: 'target1', type: 'target', x: 9, y: 0, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "repeat", "stop"],
    objective: "Utilize todos os conceitos para navegar pelo labirinto complexo",
    hint: "Combine todos os algoritmos e estratégias aprendidas",
    unlocked: true,
    completed: false,
    concepts: ["pensamento computacional", "resolução de problemas complexos"]
  },
  {
    id: 10,
    name: 'Células Coloridas',
    description: 'Aprenda a lidar com células coloridas',
    difficulty: 'intermediate',
    concepts: ['Condicionais', 'Células Coloridas'],
    objective: 'Guie o robô até o alvo, evitando as células vermelhas.',
    hint: 'Use o comando "Se" para verificar a cor da célula antes de se mover.',
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "stop", "repeat"],
    unlocked: true,
    completed: false,
    gridSize: { width: 8, height: 8 },
    objects: [
      { ...defaultRobot, x: 0, y: 0 },
      { id: 'target1', type: 'target', x: 5, y: 5, width: 1, height: 1 },
    ]
  },
  {
    id: 11,
    name: 'Cores Alternantes',
    description: 'Domine o timing com células que mudam de cor',
    difficulty: 'advanced',
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "stop", "repeat"],
    unlocked: true,
    completed: false,
    concepts: ['Condicionais', 'Células Coloridas', 'Timing'],
    objective: 'Guie o robô até o alvo, observando as células que mudam de cor.',
    hint: 'As células alternam entre verde e vermelho. Planeje seu movimento com cuidado!',
    gridSize: { width: 5, height: 5 },
    colorCycleSpeed: 5500,
    objects: [
      { ...defaultRobot, x: 0, y: 0 },
      { id: 'target1', type: 'target', x: 4, y: 4, width: 1, height: 1 },
      { id: 'color1', type: 'colorCell', x: 1, y: 1, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color2', type: 'colorCell', x: 2, y: 2, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color3', type: 'colorCell', x: 3, y: 3, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color4', type: 'colorCell', x: 2, y: 1, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color5', type: 'colorCell', x: 3, y: 2, color: 'red', isBlocking: true, width: 1, height: 1 }
    ]
  }
];

export default LEVELS;
