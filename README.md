
# CodeLab: Plataforma de Programação Visual

![CodeLab Logo](https://placehold.co/200x100/4F46E5/ffffff?text=CodeLab)

CodeLab é uma plataforma interativa de aprendizado de programação baseada em blocos visuais, projetada para ensinar conceitos fundamentais de lógica de programação de forma divertida e educativa.

## 📚 Índice
- [Visão Geral](#visão-geral)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Componentes Principais](#componentes-principais)
- [Motor do Jogo](#motor-do-jogo)
- [Sistema de Comandos](#sistema-de-comandos)
- [Níveis e Progressão](#níveis-e-progressão)
- [Conceitos de Programação Ensinados](#conceitos-de-programação-ensinados)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Extensibilidade](#extensibilidade)
- [Futuras Melhorias](#futuras-melhorias)

## 🔍 Visão Geral

CodeLab utiliza uma interface visual de programação por blocos, onde usuários podem arrastar e soltar comandos para controlar um robô em um ambiente de grade. Através de uma série de níveis de dificuldade progressiva, os usuários aprendem conceitos computacionais como sequências, loops, condicionais e algoritmos.

### 🚀 Principais recursos:
- Interface de arrastar e soltar para criação de programas
- Feedback visual imediato da execução do código
- Progressão gradual de dificuldade através de níveis
- Conceitos avançados como loops e condicionais
- Sistema de persistência de progresso

## 🏗️ Arquitetura do Projeto

O projeto é desenvolvido em React com TypeScript e segue uma arquitetura modular bem definida:

```
src/
├── components/     # Componentes de UI
├── data/           # Dados de níveis e progressão
├── engine/         # Motor do jogo e lógica de execução
├── hooks/          # Hooks personalizados
├── lib/            # Utilitários e funções compartilhadas
└── pages/          # Páginas da aplicação
```

### 🧩 Estrutura de Diretórios

#### `/components`
Contém todos os componentes de UI da aplicação, organizados em subpastas:
- `/codeblocks`: Componentes relacionados à interface de programação
- `/ui`: Componentes de UI reutilizáveis (botões, modais, etc.)
- `/tabs`: Componentes para diferentes seções da aplicação

#### `/data`
Gerencia dados estáticos e persistência:
- `levelTypes.ts`: Definições de tipos para níveis
- `levelManager.ts`: Funções para gerenciar níveis
- `levelsData.ts`: Dados dos níveis do jogo
- `progressManager.ts`: Gerenciamento de progresso do usuário
- `gameObjects.ts`: Definições de objetos do jogo

#### `/engine`
O núcleo da lógica do jogo:
- `gameEngine.ts`: Implementação principal do motor do jogo
- `gameMovement.ts`: Lógica de movimento do robô
- `gameVerification.ts`: Verificação de objetivos e condições
- `types.ts`: Tipos e interfaces do motor
- `/handlers`: Manipuladores para diferentes tipos de comandos

#### `/pages`
Páginas principais da aplicação:
- `Index.tsx`: Página principal com abas e controle de navegação

## 🧱 Componentes Principais

### GameEngine
O coração da aplicação, responsável por:
- Carregar níveis
- Executar comandos
- Gerenciar o estado do jogo
- Detectar colisões e objetivos completados
- Processar a lógica de movimento do robô

### CodeBlocks
Interface de programação visual que permite:
- Arrastar e soltar blocos de comando
- Organizar comandos em sequência
- Aninhar comandos dentro de loops e condicionais
- Executar o programa criado

### GameCanvas
Renderiza o ambiente do jogo, incluindo:
- Grade do jogo
- Robô e sua orientação
- Obstáculos e coletáveis
- Células coloridas e alvo

## ⚙️ Motor do Jogo

O motor do jogo (`gameEngine.ts`) é implementado como uma classe que gerencia:

### Estado do Jogo
```typescript
interface GameState {
  robot: GameObject;         // Estado atual do robô
  objects: GameObject[];     // Objetos no ambiente
  gridSize: GridSize;        // Tamanho da grade
  isRunning: boolean;        // Se o jogo está em execução
  isComplete: boolean;       // Se o nível foi concluído
  isFailed: boolean;         // Se o nível falhou
  collectiblesGathered: number; // Coletáveis recolhidos
  totalCollectibles: number; // Total de coletáveis no nível
  moves: number;             // Contagem de movimentos
  blocksUsed: number;        // Blocos utilizados no programa
  commands: Command[];       // Comandos a serem executados
  executionPointer: number;  // Ponteiro de execução atual
  speed: number;             // Velocidade de execução
}
```

### Ciclo de Execução
1. O usuário arrasta e solta blocos para criar um programa
2. Ao pressionar "Executar", o motor inicializa a execução
3. Um intervalo é criado para executar comandos sequencialmente
4. Cada comando é processado pelo manipulador apropriado
5. O estado do jogo é atualizado após cada comando
6. Verificações são realizadas para detectar objetivos ou falhas
7. A UI é atualizada com o novo estado

### Manipuladores de Comandos
Cada tipo de comando tem seu próprio manipulador:
- `MoveForwardHandler`: Move o robô para frente
- `MoveBackwardHandler`: Move o robô para trás
- `TurnRightHandler`: Gira o robô à direita
- `TurnLeftHandler`: Gira o robô à esquerda
- `StopHandler`: Faz o robô parar no lugar
- `RepeatHandler`: Implementa a funcionalidade de repetição
- `IfHandler`: Implementa lógica condicional

## 📝 Sistema de Comandos

O sistema de comandos é baseado em uma estrutura de objetos que podem ser aninhados:

```typescript
interface Command {
  id: string;           // Identificador único
  name: string;         // Nome exibido
  condition?: string;   // Condição (para comandos if)
  params?: {            // Parâmetros adicionais
    count?: number;     // Número de repetições
    condition?: string; // Condição a ser verificada
    executionState?: ExecutionState; // Estado de execução
    isDummy?: boolean;  // Se é um comando fictício
  };
  children?: Command[]; // Comandos filhos (para loops/condicionais)
}
```

### Tipos de Comandos
- **Básicos**: Movimentos simples (andar, girar)
- **Loops**: Repetição de um conjunto de comandos
- **Condicionais**: Execução baseada em condições do ambiente

### Interface de Arrastar e Soltar
O sistema utiliza eventos de arrastar e soltar do HTML5 para permitir que o usuário:
- Arraste comandos da paleta para a área de programação
- Reorganize comandos dentro da área de programação
- Remova comandos não desejados
- Aninhe comandos dentro de loops e condicionais

## 🎮 Níveis e Progressão

O jogo inclui 11 níveis de dificuldade crescente:

1. **Primeiro Passo**: Introdução a movimentos básicos
2. **Navegando com Precisão**: Exploração de múltiplas direções
3. **Introdução à Repetição**: Básico de loops
4. **Padrões Geométricos**: Criação de padrões repetitivos
5. **Introdução a Algoritmos**: Resolução estratégica de problemas
6. **Labirinto Lógico**: Navegação em ambiente complexo
7. **Otimização de Rota**: Encontrar caminhos eficientes
8. **Espiral de Coleta**: Algoritmos de varredura
9. **Desafio Algorítmico**: Aplicação de múltiplos conceitos
10. **Células Coloridas**: Introdução a condicionais
11. **Cores Alternantes**: Timing avançado com células que mudam de cor

### Sistema de Persistência
O progresso do usuário é salvo no localStorage do navegador:
- Níveis completados
- Níveis desbloqueados
- Data da última sessão

## 💡 Conceitos de Programação Ensinados

- **Sequência**: Ordem de execução de comandos
- **Loops**: Repetição de um conjunto de comandos
- **Condicionais**: Execução de comandos baseada em condições
- **Decomposição de Problemas**: Divisão de problemas complexos em partes menores
- **Algoritmos**: Desenvolvimento de soluções passo a passo
- **Otimização**: Encontrar soluções mais eficientes

## 🛠️ Guia de Desenvolvimento

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/CodeLab.git

# Entre no diretório
cd CodeLab

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Estrutura do Código

#### Fluxo de Execução
1. O usuário seleciona um nível no `LevelsTab`
2. O `PlaygroundTab` carrega o nível e renderiza o `GameCanvas` e `CodeBlocks`
3. O usuário arrasta e solta blocos para criar um programa
4. Ao pressionar "Executar", o `gameEngine` processa cada comando
5. O `GameCanvas` atualiza a visualização com base no estado do jogo
6. Ao completar um nível, o progresso é salvo e o próximo nível é desbloqueado

#### Criação de Novos Comandos
Para adicionar um novo tipo de comando:

1. Crie um novo manipulador em `src/engine/handlers/`:
```typescript
export class NewCommandHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    // Implementação do comando
  }
}
```

2. Registre o manipulador no `gameEngine.ts`:
```typescript
this.commandHandlers.set('newCommand', new NewCommandHandler());
```

3. Adicione-o ao array de comandos disponíveis em `levelManager.ts`:
```typescript
{
  id: 'newCommand',
  name: 'Novo Comando',
  icon: 'icon-name',
  type: 'control',
  description: 'Descrição do novo comando'
}
```

#### Criação de Novos Níveis
Para adicionar um novo nível, adicione um objeto ao array em `levelsData.ts`:
```typescript
{
  id: 12,
  name: "Nome do Nível",
  description: "Descrição do nível",
  difficulty: "intermediate",
  gridSize: { width: 8, height: 8 },
  objects: [
    // Objetos do nível (robô, obstáculos, etc.)
  ],
  availableCommands: ["moveForward", "turnRight", /* etc */],
  objective: "Descrição do objetivo",
  hint: "Dica para o jogador",
  unlocked: false,
  completed: false,
  concepts: ["sequência", "loops"]
}
```

## 🔌 Extensibilidade

O sistema foi projetado para ser facilmente extensível:

- **Novos tipos de comandos**: Implemente a interface `CommandHandler`
- **Novos níveis**: Adicione-os ao arquivo `levelsData.ts`
- **Novos objetos do jogo**: Estenda o tipo `GameObject` e adicione a lógica necessária
- **Novos conceitos de programação**: Introduza gradualmente em novos níveis

## 🚀 Solucão

- **1**
```typescript
moveForward();
moveForward();
turnLeft(90);
moveForward();
moveForward();
```
- **2**
```typescript
turnRight(90);
moveForward();
moveForward();
moveForward();
turnLeft(90);
moveForward();
moveForward();
moveForward();
```
- **3**
```typescript
repeat(5) {
moveForward();
}
```
- **4**
```typescript
repeat(4) {
  repeat(4) {
    moveForward();
    turnLeft(90);
  }
}
```
- **5**
```typescript

```

- **7**
```typescript

```
- **7**
```typescript
repeat(4) {
   repeat(2) {
    moveForward();
     turnLeft(90);
  }
  
  repeat(2) {
    moveForward();
    moveForward();
    turnLeft(90);
  }
}
```
- **8**
```typescript
repeat(2) {
   repeat(9) {
    moveForward();
  }
  turnRight(90);
  moveForward();
  moveForward();
  turnRight(90)
  
  repeat(9) {
    moveForward();
  }
  turnLeft(90);
  moveForward();
  moveForward();
  turnLeft(90);
}
```

- **9**
```typescript
while(borda) {
  moveForward();
}
turnRight(90)
while(borda) {
  moveForward();
}
```


## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com 💙 para inspirar futuros programadores.
