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
    minBlocks: 7,
    maxBlocks:11,
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
    minBlocks: 14,
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
    name: "Laços Condicionais",
    minBlocks: 8,
    maxBlocks: 8,
    description: "Crie um laço condicional para executar um bloco de comandos enquanto uma condição for verdadeira",
    difficulty: "advanced",
    gridSize: { width: 6, height:6 },
    objects: [
      { ...defaultRobot, x: 0, y: 0 , rotation: 180 },

      { id: 'obstacle1', type: 'obstacle', x: 0, y: 3, width: 4, height: 1 },
      { id: 'target1', type: 'target', x: 5, y: 5, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft","while"],
    objective: "descubre o poder dos laços condicionais",
    hint: "crie uma repetição que execute um bloco de comandos enquanto uma condição for verdadeira",
    unlocked: true,
    completed: false,
    concepts: ["laços condicionais", "pensamento computacional"],
  },

  {
    id: 10,
    name: "Laços Dentro de Laços",
    minBlocks: 15,
    maxBlocks: 22,
    description: "Use laços condicionais aninhados para resolver problemas mais complexos",
    difficulty: "master",
    gridSize: { width: 12, height: 12 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      // Labirinto com múltiplas seções
      { id: 'maze1', type: 'obstacle', x: 2, y: 1, width: 1, height: 9 },
      { id: 'maze2', type: 'obstacle', x: 0, y: 2, width: 2, height: 1 },
      { id: 'maze3', type: 'obstacle', x: 1, y: 6, width: 1, height: 1 },
      { id: 'maze4', type: 'obstacle', x: 4, y: 2, width: 5, height: 1 },
      { id: 'maze5', type: 'obstacle', x: 5, y: 3, width: 1, height: 4 },
      { id: 'maze6', type: 'obstacle', x: 3, y: 5, width: 1, height: 1 },
      { id: 'maze7', type: 'obstacle', x: 3, y: 8, width: 3, height: 1 },
      { id: 'maze8', type: 'obstacle', x: 7, y: 5, width: 1, height: 3 },
      { id: 'maze9', type: 'obstacle', x: 10, y: 0, width: 1, height: 11 },
      { id: 'maze10', type: 'obstacle', x: 6, y: 10, width: 5, height: 1 },
      { id: 'maze11', type: 'obstacle', x: 4, y: 0, width: 1, height: 2 },

      {id: 'collectible1', type: 'collectible', x: 9, y: 9, width: 1, height: 1 },

      { id: 'target1', type: 'target', x: 0, y: 3, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "while", "if", "else", "isPathForward", "isEdgeAhead", "isWallOnRight", "isWallOnLeft", "not"],
    objective: "Navegue pelo labirinto complexo usando laços aninhados e diferentes estratégias",
    hint: "Pense em laços dentro de outros laços para resolver diferentes partes do problema",
    unlocked: false,
    completed: false,
    concepts: ["laços aninhados", "estruturas de controle complexas", "resolução de problemas avançados"],
  },
  
  {
    id: 11,
    name: "Operadores Lógicos",
    minBlocks: 10,
    maxBlocks: 15,
    description: "Aprenda a combinar condições com operadores lógicos AND e OR",
    difficulty: "expert",
    gridSize: { width: 8, height: 8 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      
      // Obstáculos estratégicos
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 3 },
      { id: 'obstacle2', type: 'obstacle', x: 2, y: 4, width: 1, height: 4 },
      { id: 'obstacle3', type: 'obstacle', x: 5, y: 1, width: 1, height: 3 },
      { id: 'obstacle4', type: 'obstacle', x: 5, y: 5, width: 1, height: 3 },
      
      // Células coloridas em padrões complexos
      { id: 'color1', type: 'colorCell', x: 3, y: 2, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color2', type: 'colorCell', x: 4, y: 3, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color3', type: 'colorCell', x: 3, y: 5, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color4', type: 'colorCell', x: 4, y: 6, color: 'red', isBlocking: true, width: 1, height: 1 },
      
      // Coletáveis
      { id: 'collectible1', type: 'collectible', x: 4, y: 0, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 4, y: 4, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 4, y: 7, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 7, y: 7, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "else", "while", "and", "or", "isGreenAhead", "isRedAhead", "isCollectibleAhead"],
    objective: "Colete todos os itens e chegue ao alvo usando operadores lógicos para tomar decisões complexas",
    hint: "Combine condições com AND e OR para lidar com situações onde múltiplas verificações são necessárias",
    unlocked: false,
    completed: false,
    concepts: ["operadores lógicos", "condições compostas", "tomada de decisão complexa"],
  },
  
  {
    id: 12,
    name: "Funções Simples",
    minBlocks: 8,
    maxBlocks: 12,
    description: "Aprenda a criar e usar funções para organizar seu código",
    difficulty: "intermediate",
    gridSize: { width: 7, height: 7 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      
      // Padrão repetitivo de obstáculos
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 2 },
      { id: 'obstacle2', type: 'obstacle', x: 2, y: 3, width: 1, height: 2 },
      { id: 'obstacle3', type: 'obstacle', x: 2, y: 6, width: 1, height: 1 },
      { id: 'obstacle4', type: 'obstacle', x: 4, y: 1, width: 1, height: 2 },
      { id: 'obstacle5', type: 'obstacle', x: 4, y: 4, width: 1, height: 2 },
      
      // Coletáveis em padrão repetitivo
      { id: 'collectible1', type: 'collectible', x: 1, y: 2, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 1, y: 5, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 3, y: 3, width: 1, height: 1 },
      { id: 'collectible4', type: 'collectible', x: 5, y: 1, width: 1, height: 1 },
      { id: 'collectible5', type: 'collectible', x: 5, y: 5, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 6, y: 6, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "function", "call"],
    objective: "Crie funções para movimentos repetitivos e use-as para navegar pelo cenário de forma eficiente",
    hint: "Identifique padrões de movimento que se repetem e crie funções para eles",
    unlocked: false,
    completed: false,
    concepts: ["funções", "abstração", "reutilização de código"],
  },
  
  {
    id: 13,
    name: "Funções com Parâmetros",
    minBlocks: 10,
    maxBlocks: 15,
    description: "Aprenda a criar funções com parâmetros para torná-las mais flexíveis",
    difficulty: "advanced",
    gridSize: { width: 9, height: 9 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      
      // Obstáculos em padrão estratégico
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 3 },
      { id: 'obstacle2', type: 'obstacle', x: 2, y: 4, width: 1, height: 5 },
      { id: 'obstacle3', type: 'obstacle', x: 4, y: 2, width: 5, height: 1 },
      { id: 'obstacle4', type: 'obstacle', x: 4, y: 6, width: 5, height: 1 },
      { id: 'obstacle5', type: 'obstacle', x: 6, y: 3, width: 1, height: 3 },
      
      // Coletáveis em diferentes padrões
      { id: 'collectible1', type: 'collectible', x: 1, y: 3, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 3, y: 1, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 3, y: 5, width: 1, height: 1 },
      { id: 'collectible4', type: 'collectible', x: 5, y: 3, width: 1, height: 1 },
      { id: 'collectible5', type: 'collectible', x: 7, y: 7, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 8, y: 0, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "function", "call", "param"],
    objective: "Crie funções parametrizadas para lidar com distâncias e rotações variáveis",
    hint: "Use parâmetros para indicar quantos passos andar ou quantas vezes virar",
    unlocked: false,
    completed: false,
    concepts: ["funções parametrizadas", "generalização", "reusabilidade avançada"],
  },
  
  {
    id: 14,
    name: "Recursão Simples",
    minBlocks: 7,
    maxBlocks: 10,
    description: "Explore o conceito de recursão com funções que chamam a si mesmas",
    difficulty: "expert",
    gridSize: { width: 8, height: 8 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      
      // Labirinto em espiral
      { id: 'obstacle1', type: 'obstacle', x: 1, y: 1, width: 6, height: 1 },
      { id: 'obstacle2', type: 'obstacle', x: 1, y: 2, width: 1, height: 5 },
      { id: 'obstacle3', type: 'obstacle', x: 2, y: 6, width: 5, height: 1 },
      { id: 'obstacle4', type: 'obstacle', x: 6, y: 2, width: 1, height: 4 },
      { id: 'obstacle5', type: 'obstacle', x: 2, y: 2, width: 3, height: 1 },
      { id: 'obstacle6', type: 'obstacle', x: 2, y: 3, width: 1, height: 2 },
      { id: 'obstacle7', type: 'obstacle', x: 3, y: 4, width: 2, height: 1 },
      { id: 'obstacle8', type: 'obstacle', x: 4, y: 3, width: 1, height: 1 },
      
      // Coletáveis em padrão estratégico
      { id: 'collectible1', type: 'collectible', x: 0, y: 2, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 3, y: 3, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 5, y: 5, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 7, y: 7, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "function", "call", "recurse", "if", "isPathForward"],
    objective: "Use recursão para explorar o labirinto e encontrar o caminho até o alvo",
    hint: "Crie uma função que se chama novamente com uma condição de parada",
    unlocked: false,
    completed: false,
    concepts: ["recursão", "condições de parada", "exploração de labirintos"],
  },
  
  {
    id: 15,
    name: "Eventos e Gatilhos",
    minBlocks: 12,
    maxBlocks: 18,
    description: "Aprenda a reagir a eventos e criar gatilhos para ações",
    difficulty: "expert",
    gridSize: { width: 10, height: 10 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      
      // Células de gatilho que mudam o ambiente
      { id: 'trigger1', type: 'colorCell', x: 2, y: 2, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'trigger2', type: 'colorCell', x: 5, y: 5, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'trigger3', type: 'colorCell', x: 8, y: 2, color: 'green', isBlocking: false, width: 1, height: 1 },
      
      // Obstáculos que bloqueiam o caminho
      { id: 'obstacle1', type: 'obstacle', x: 4, y: 0, width: 1, height: 4 },
      { id: 'obstacle2', type: 'obstacle', x: 4, y: 5, width: 1, height: 5 },
      { id: 'obstacle3', type: 'obstacle', x: 7, y: 3, width: 3, height: 1 },
      { id: 'obstacle4', type: 'obstacle', x: 0, y: 3, width: 3, height: 1 },
      { id: 'obstacle5', type: 'obstacle', x: 7, y: 7, width: 1, height: 3 },
      
      // Coletáveis que aparecem após gatilhos
      { id: 'collectible1', type: 'collectible', x: 3, y: 1, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 6, y: 4, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 9, y: 9, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 1, y: 9, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "else", "while", "onGreen", "onRed", "onCollect", "paintGreen", "paintRed"],
    objective: "Reaja a eventos como pisar em células coloridas ou coletar itens para modificar o ambiente",
    hint: "Use comandos como 'onGreen' para detectar quando o robô está sobre uma célula verde",
    unlocked: false,
    completed: false,
    concepts: ["eventos", "gatilhos", "programação reativa", "modificação do ambiente"],
  },
  
  {
    id: 16,
    name: "Algoritmos de Busca",
    minBlocks: 15,
    maxBlocks: 25,
    description: "Implemente um algoritmo de busca para encontrar o caminho em um labirinto complexo",
    difficulty: "master",
    gridSize: { width: 12, height: 12 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      
      // Labirinto complexo
      { id: 'wall1', type: 'obstacle', x: 2, y: 0, width: 1, height: 10 },
      { id: 'wall2', type: 'obstacle', x: 4, y: 2, width: 1, height: 10 },
      { id: 'wall3', type: 'obstacle', x: 6, y: 0, width: 1, height: 10 },
      { id: 'wall4', type: 'obstacle', x: 8, y: 2, width: 1, height: 10 },
      { id: 'wall5', type: 'obstacle', x: 10, y: 0, width: 1, height: 10 },
      { id: 'wall6', type: 'obstacle', x: 0, y: 3, width: 2, height: 1 },
      { id: 'wall7', type: 'obstacle', x: 3, y: 5, width: 1, height: 1 },
      { id: 'wall8', type: 'obstacle', x: 5, y: 7, width: 1, height: 1 },
      { id: 'wall9', type: 'obstacle', x: 7, y: 9, width: 1, height: 1 },
      { id: 'wall10', type: 'obstacle', x: 9, y: 3, width: 1, height: 1 },
      
      // Marcadores para caminhos
      { id: 'marker1', type: 'colorCell', x: 1, y: 2, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'marker2', type: 'colorCell', x: 3, y: 4, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'marker3', type: 'colorCell', x: 5, y: 6, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'marker4', type: 'colorCell', x: 7, y: 8, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'marker5', type: 'colorCell', x: 9, y: 10, color: 'green', isBlocking: false, width: 1, height: 1 },
      
      // Coletáveis no final de cada seção
      { id: 'collectible1', type: 'collectible', x: 1, y: 11, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 5, y: 11, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 9, y: 11, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 11, y: 11, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "else", "while", "function", "call", "isPathForward", "isWallOnRight", "isWallOnLeft", "paintGreen", "paintRed", "isGreenAhead", "isRedAhead"],
    objective: "Implemente um algoritmo de busca em profundidade ou em largura para encontrar o caminho",
    hint: "Use marcação de células para lembrar caminhos já explorados e evitar ciclos",
    unlocked: false,
    completed: false,
    concepts: ["algoritmos de busca", "exploração de labirintos", "marcação de caminhos", "detecção de ciclos"],
  },
  
  {
    id: 17,
    name: "Otimização de Recursos",
    minBlocks: 10,
    maxBlocks: 20,
    description: "Aprenda a gerenciar e otimizar recursos limitados",
    difficulty: "master",
    gridSize: { width: 9, height: 9 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      
      // Recursos espalhados pelo mapa
      { id: 'resource1', type: 'collectible', x: 2, y: 2, width: 1, height: 1 },
      { id: 'resource2', type: 'collectible', x: 2, y: 6, width: 1, height: 1 },
      { id: 'resource3', type: 'collectible', x: 6, y: 2, width: 1, height: 1 },
      { id: 'resource4', type: 'collectible', x: 6, y: 6, width: 1, height: 1 },
      { id: 'resource5', type: 'collectible', x: 4, y: 4, width: 1, height: 1 },
      
      // Obstáculos que consomem recursos
      { id: 'barrier1', type: 'colorCell', x: 1, y: 4, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'barrier2', type: 'colorCell', x: 4, y: 1, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'barrier3', type: 'colorCell', x: 7, y: 4, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'barrier4', type: 'colorCell', x: 4, y: 7, color: 'red', isBlocking: true, width: 1, height: 1 },
      
      // Obstáculos fixos
      { id: 'obstacle1', type: 'obstacle', x: 0, y: 3, width: 1, height: 3 },
      { id: 'obstacle2', type: 'obstacle', x: 3, y: 0, width: 3, height: 1 },
      { id: 'obstacle3', type: 'obstacle', x: 8, y: 3, width: 1, height: 3 },
      { id: 'obstacle4', type: 'obstacle', x: 3, y: 8, width: 3, height: 1 },
      
      // Alvo no centro
      { id: 'target1', type: 'target', x: 4, y: 4, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "else", "while", "function", "call", "useResource", "checkResource", "paintGreen"],
    objective: "Colete recursos e use-os estrategicamente para remover barreiras e chegar ao alvo",
    hint: "Cada recurso permite remover uma barreira vermelha. Planeje sua rota para otimizar o uso",
    unlocked: false,
    completed: false,
    concepts: ["gerenciamento de recursos", "planejamento estratégico", "otimização de caminhos"],
  },
  
  {
    id: 18,
    name: "Programação Paralela",
    minBlocks: 18,
    maxBlocks: 30,
    description: "Controle múltiplos robôs simultaneamente para resolver tarefas cooperativas",
    difficulty: "master",
    gridSize: { width: 11, height: 11 },
    objects: [
      // Múltiplos robôs
      { ...defaultRobot, id: 'robot1', x: 0, y: 0, rotation: 90 },
      { ...defaultRobot, id: 'robot2', x: 10, y: 0, rotation: 180 },
      { ...defaultRobot, id: 'robot3', x: 0, y: 10, rotation: 0 },
      
      // Botões que precisam ser ativados simultaneamente
      { id: 'button1', type: 'colorCell', x: 5, y: 1, color: 'red', isBlocking: false, width: 1, height: 1 },
      { id: 'button2', type: 'colorCell', x: 9, y: 5, color: 'red', isBlocking: false, width: 1, height: 1 },
      { id: 'button3', type: 'colorCell', x: 5, y: 9, color: 'red', isBlocking: false, width: 1, height: 1 },
      
      // Obstáculos fixos
      { id: 'obstacle1', type: 'obstacle', x: 3, y: 3, width: 5, height: 1 },
      { id: 'obstacle2', type: 'obstacle', x: 3, y: 7, width: 5, height: 1 },
      { id: 'obstacle3', type: 'obstacle', x: 3, y: 3, width: 1, height: 5 },
      { id: 'obstacle4', type: 'obstacle', x: 7, y: 3, width: 1, height: 5 },
      
      // Coletáveis para cada robô
      { id: 'collectible1', type: 'collectible', x: 2, y: 2, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 8, y: 2, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 2, y: 8, width: 1, height: 1 },
      
      // Porta central que se abre quando todos os botões estão ativados
      { id: 'door', type: 'colorCell', x: 5, y: 5, color: 'red', isBlocking: true, width: 1, height: 1 },
      
      // Alvo central
      { id: 'target1', type: 'target', x: 5, y: 5, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "else", "while", "selectRobot", "allRobots", "paintGreen", "synchronize", "wait"],
    objective: "Coordene múltiplos robôs para ativar botões simultaneamente e abrir o caminho para o alvo",
    hint: "Use selectRobot para alternar entre robôs e synchronize para coordenar ações",
    unlocked: false,
    completed: false,
    concepts: ["programação paralela", "sincronização", "coordenação", "múltiplos agentes"],
  },
  
  {
    id: 19,
    name: "Inteligência Artificial",
    minBlocks: 20,
    maxBlocks: 40,
    description: "Implemente comportamentos adaptativos para seu robô usando técnicas de IA",
    difficulty: "master",
    gridSize: { width: 15, height: 15 },
    objects: [
      // Robô inicial
      { ...defaultRobot, x: 7, y: 7, rotation: 0 },
      
      // Ambiente dinâmico com células que mudam de comportamento
      { id: 'dynamic1', type: 'colorCell', x: 3, y: 3, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'dynamic2', type: 'colorCell', x: 11, y: 3, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'dynamic3', type: 'colorCell', x: 3, y: 11, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'dynamic4', type: 'colorCell', x: 11, y: 11, color: 'green', isBlocking: false, width: 1, height: 1 },
      
      // Obstáculos que se movem em padrões previsíveis
      { id: 'movingObstacle1', type: 'obstacle', x: 5, y: 5, width: 1, height: 1 },
      { id: 'movingObstacle2', type: 'obstacle', x: 9, y: 5, width: 1, height: 1 },
      { id: 'movingObstacle3', type: 'obstacle', x: 5, y: 9, width: 1, height: 1 },
      { id: 'movingObstacle4', type: 'obstacle', x: 9, y: 9, width: 1, height: 1 },
      
      // Recursos com valores diferentes
      { id: 'resource1', type: 'collectible', x: 2, y: 7, width: 1, height: 1 },
      { id: 'resource2', type: 'collectible', x: 7, y: 2, width: 1, height: 1 },
      { id: 'resource3', type: 'collectible', x: 12, y: 7, width: 1, height: 1 },
      { id: 'resource4', type: 'collectible', x: 7, y: 12, width: 1, height: 1 },
      
      // Alvo que se move periodicamente
      { id: 'target1', type: 'target', x: 7, y: 7, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "else", "while", "function", "call", "learn", "adapt", "predict", "rememberState", "evaluateState", "paintGreen", "paintRed"],
    objective: "Desenvolva um sistema adaptativo que aprenda a lidar com obstáculos móveis e alvos dinâmicos",
    hint: "Use comandos como learn para identificar padrões, e adapt para modificar o comportamento baseado em experiências passadas",
    unlocked: false,
    completed: false,
    concepts: ["inteligência artificial", "aprendizado de máquina", "comportamentos adaptativos", "reconhecimento de padrões"],
  },
  
  {
    id: 20,
    name: 'Labirinto de Cores Alternantes',
    description: 'Supere obstáculos e domine o timing com células que mudam de cor',
    difficulty: 'advanced',
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "stop", "repeat", "while","paintGreen"],
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
