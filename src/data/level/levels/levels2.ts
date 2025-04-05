import { Level } from '@/types/levelTypes';
import { defaultRobot } from '@/data/gameObjects';

const levels_2: Level[] = [
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
    name: "Labirinto de Decisões",
    description: "Use condicionais para tomar decisões complexas",
    difficulty: "intermediate",
    gridSize: { width: 10, height: 10 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 180 },
      
      // Labirinto complexo
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 8 },
      { id: 'obstacle2', type: 'obstacle', x: 5, y: 2, width: 1, height: 8 },
      { id: 'obstacle3', type: 'obstacle', x: 8, y: 0, width: 1, height: 8 },
      
      // Células coloridas em pontos estratégicos
      { id: 'color1', type: 'colorCell', x: 1, y: 1, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color2', type: 'colorCell', x: 4, y: 4, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color3', type: 'colorCell', x: 7, y: 7, color: 'red', isBlocking: true, width: 1, height: 1 },
      
      // Coletáveis estrategicamente posicionados
      { id: 'collectible1', type: 'collectible', x: 1, y: 3, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 4, y: 6, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 7, y: 9, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 9, y: 9, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "while", "paintGreen"],
    availableSensors: ["barrier", "border", "collectible", "target", "redCell", "greenCell"],
    objective: "Navegue pelo labirinto usando condicionais para tomar decisões inteligentes",
    hint: "Use condicionais para verificar a cor das células e ajustar seu caminho",
    unlocked: false,
    completed: false,
    concepts: ["condicionais avançados", "tomada de decisão complexa"],
    colorCycleSpeed: 10000
  },
  {
    id: 13,
    name: "Corredor de Fogo",
    description: "Atravesse um corredor com células que alternam entre seguras e perigosas",
    difficulty: "intermediate",
    gridSize: { width: 15, height: 5 },
    objects: [
      { ...defaultRobot, x: 0, y: 2, rotation: 90 },
      
      // Corredor de células coloridas alternantes
      { id: 'color1', type: 'colorCell', x: 2, y: 2, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color2', type: 'colorCell', x: 4, y: 2, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color3', type: 'colorCell', x: 6, y: 2, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color4', type: 'colorCell', x: 8, y: 2, color: 'red', isBlocking: true, width: 1, height: 1 },
      { id: 'color5', type: 'colorCell', x: 10, y: 2, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color6', type: 'colorCell', x: 12, y: 2, color: 'red', isBlocking: true, width: 1, height: 1 },
      
      // Obstáculos laterais
      { id: 'obstacle1', type: 'obstacle', x: 0, y: 0, width: 15, height: 1 },
      { id: 'obstacle2', type: 'obstacle', x: 0, y: 4, width: 15, height: 1 },
      { id: 'obstacle3', type: 'obstacle', x: 2, y: 1, width: 1, height: 1 },
      { id: 'obstacle4', type: 'obstacle', x: 2, y: 3, width: 1, height: 1 },
      { id: 'obstacle5', type: 'obstacle', x: 6, y: 1, width: 1, height: 1 },
      { id: 'obstacle6', type: 'obstacle', x: 6, y: 3, width: 1, height: 1 },
      { id: 'obstacle7', type: 'obstacle', x: 10, y: 1, width: 1, height: 1 },
      { id: 'obstacle8', type: 'obstacle', x: 10, y: 3, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 14, y: 2, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if","else", "while", "stop"],
    availableSensors: ["barrier", "target", "redCell", "greenCell"],
    objective: "Atravesse o corredor sincronizando seus movimentos com as mudanças de cor",
    hint: "Pare e espere quando necessário para que as células vermelhas se tornem verdes",
    unlocked: false,
    completed: false,
    concepts: ["sincronização", "tempo de espera"],
    colorCycleSpeed: 5000
  },
  {
    id: 14,
    name: "Corrida Contra o Tempo",
    description: "Complete o percurso antes que as cores mudem",
    difficulty: "intermediate",
    gridSize: { width: 12, height: 6 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 180 },
      
      // Padrão de cores alternantes
      { id: 'color1', type: 'colorCell', x: 2, y: 3, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color2', type: 'colorCell', x: 4, y: 3, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color3', type: 'colorCell', x: 6, y: 3, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color4', type: 'colorCell', x: 8, y: 3, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color5', type: 'colorCell', x: 10, y: 3, color: 'green', isBlocking: false, width: 1, height: 1 },
      
      // Obstáculos estratégicos
      { id: 'obstacle1', type: 'obstacle', x: 1, y: 0, width: 1, height: 5 },
      { id: 'obstacle2', type: 'obstacle', x: 3, y: 1, width: 1, height: 5 },
      { id: 'obstacle3', type: 'obstacle', x: 5, y: 0, width: 1, height: 5 },
      { id: 'obstacle4', type: 'obstacle', x: 7, y: 1, width: 1, height: 5 },
      { id: 'obstacle5', type: 'obstacle', x: 9, y: 0, width: 1, height: 5 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 11, y: 3, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if","else", "while"],
    availableSensors: ["barrier", "redCell", "greenCell", "target"],
    objective: "Chegue ao alvo antes que as células verdes se tornem vermelhas",
    hint: "Monitore as mudanças de cor e ajuste seu movimento para evitar ficar preso",
    unlocked: false,
    completed: false,
    concepts: ["tempo de execução", "otimização de percurso"],
    colorCycleSpeed: 8000
  },
  {
    id: 15,
    name: 'Labirinto de Cores Alternantes',
    description: 'Supere obstáculos e domine o timing com células que mudam de cor',
    difficulty: 'advanced',
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if","else", "stop", "repeat", "while","paintGreen"],
    availableSensors: ["redCell", "greenCell", "barrier", "border"],
    unlocked: true,
    completed: false,
    concepts: ['condicionais', 'células coloridas', 'planejamento de rota'],
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
  },
  {
    id: 16,
    name: "Algoritimo de Sensores",
    minBlocks: 6,
    description: "Use as condições dos sensores para resolver problemas mais complexos",
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
    objective: "Colete todos os itens e chegue ao alvo usando sensores e condições lógicas para tomar decisões complexas",
    hint: "Considera as condições dos sensores para tomar decisões complexas",
    unlocked: false,
    completed: false,
    concepts: ["operadores lógicos", "tomada de decisão complexa"],
  },
  {
    id: 17,
    name: "Coletando com Condições",
    description: "Colete itens usando decisões condicionais",
    difficulty: "intermediate",
    gridSize: { width: 8, height: 8 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 180},
      
      // Obstáculos formando um padrão de grade
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 0, width: 1, height: 2 },
      { id: 'obstacle2', type: 'obstacle', x: 0, y: 3, width: 1, height: 4 },
      { id: 'obstacle3', type: 'obstacle', x: 2, y: 7, width: 6, height: 1 },
      { id: 'obstacle4', type: 'obstacle', x: 5, y: 0, width: 1, height: 6 },
      { id: 'obstacle5', type: 'obstacle', x: 4, y: 4, width: 1, height: 1 },
      { id: 'obstacle6', type: 'obstacle', x: 3, y: 0, width: 2, height: 1 },
      
      // Coletáveis em diferentes posições
      { id: 'collectible1', type: 'collectible', x: 0, y: 2, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 3, y: 2, width: 1, height: 1 },
      { id: 'collectible4', type: 'collectible', x: 2, y: 3, width: 1, height: 1 },
      { id: 'collectible5', type: 'collectible', x: 2, y: 6, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 7, y: 6, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "else", "while"],
    availableSensors: ["barrier", "collectible", "target"],
    objective: "Colete todos os itens usando estruturas condicionais para detectar e navegar até eles",
    hint: "Use sensores para detectar coletáveis e barreiras, e estruturas if/else para decidir quando virar",
    unlocked: false,
    completed: false,
    concepts: ["detecção de objetos", "estruturas condicionais"],
  },
  {
    id: 18,
    name: "Desvio de Obstáculos Inteligente",
    description: "Desvie de obstáculos usando lógica condicional avançada",
    difficulty: "expert",
    gridSize: { width: 10, height: 10 },
    objects: [
      { ...defaultRobot, x: 0, y: 0, rotation: 90 },
      
      // Padrão de obstáculos que requer decisões complexas
      { id: 'obstacle1', type: 'obstacle', x: 2, y: 1, width: 1, height: 3 },
      { id: 'obstacle2', type: 'obstacle', x: 2, y: 5, width: 1, height: 3 },
      { id: 'obstacle3', type: 'obstacle', x: 4, y: 0, width: 1, height: 3 },
      { id: 'obstacle4', type: 'obstacle', x: 4, y: 4, width: 1, height: 3 },
      { id: 'obstacle5', type: 'obstacle', x: 4, y: 8, width: 1, height: 2 },
      { id: 'obstacle6', type: 'obstacle', x: 6, y: 2, width: 1, height: 3 },
      { id: 'obstacle7', type: 'obstacle', x: 6, y: 6, width: 1, height: 3 },
      { id: 'obstacle8', type: 'obstacle', x: 8, y: 0, width: 1, height: 3 },
      { id: 'obstacle9', type: 'obstacle', x: 8, y: 4, width: 1, height: 6 },
      
      // Células coloridas que indicam caminhos preferenciais
      { id: 'color1', type: 'colorCell', x: 1, y: 4, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color2', type: 'colorCell', x: 3, y: 3, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color3', type: 'colorCell', x: 3, y: 7, color: 'red', isBlocking: false, width: 1, height: 1 },
      { id: 'color4', type: 'colorCell', x: 5, y: 1, color: 'red', isBlocking: false, width: 1, height: 1 },
      { id: 'color5', type: 'colorCell', x: 5, y: 5, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color6', type: 'colorCell', x: 7, y: 3, color: 'green', isBlocking: false, width: 1, height: 1 },
      { id: 'color7', type: 'colorCell', x: 7, y: 7, color: 'red', isBlocking: false, width: 1, height: 1 },
      
      // Coletáveis em posições estratégicas
      { id: 'collectible1', type: 'collectible', x: 3, y: 1, width: 1, height: 1 },
      { id: 'collectible2', type: 'collectible', x: 5, y: 3, width: 1, height: 1 },
      { id: 'collectible3', type: 'collectible', x: 7, y: 5, width: 1, height: 1 },
      
      // Alvo
      { id: 'target1', type: 'target', x: 9, y: 9, width: 1, height: 1 }
    ],
    availableCommands: ["moveForward", "turnRight", "turnLeft", "if", "else", "while", "repeat"],
    availableSensors: ["barrier", "redCell", "greenCell", "collectible", "target"],
    objective: "Colete todos os itens e chegue ao alvo usando decisões condicionais complexas",
    hint: "Combine if/else com while e repeat para criar estratégias avançadas de navegação",
    unlocked: false,
    completed: false,
    concepts: ["estruturas condicionais aninhadas", "loops condicionais", "planejamento de rota"],
  },
];

export default levels_2;