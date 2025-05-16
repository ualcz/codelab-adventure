# CodeLab Adventure

<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/cpu.svg" alt="CodeLab Logo" width="120" height="120" />
  <h3>Aprenda programação de forma divertida e interativa</h3>
</div>

## 📋 Sobre o Projeto

CodeLab Adventure é uma plataforma educacional interativa projetada para ensinar conceitos de programação através de desafios gamificados. Os usuários controlam um robô em um ambiente de grade, usando blocos de código para resolver quebra-cabeças e completar missões, aprendendo lógica de programação de forma prática e divertida.

## ✨ Funcionalidades

- **Interface Drag-and-Drop**: Crie sequências de comandos arrastando e soltando blocos de código
- **Níveis Progressivos**: Desafios que aumentam gradualmente em complexidade
- **Conceitos de Programação**: Aprenda sobre comandos básicos, loops, condicionais e algoritmos
- **Feedback Visual**: Veja o resultado de seus comandos em tempo real
- **Sistema de Sensores**: Detecte objetos e condições no ambiente de jogo
- **Perfil de Usuário**: Acompanhe seu progresso e conquistas

## 🚀 Tecnologias Utilizadas

- **Frontend**: React com TypeScript
- **Estilização**: TailwindCSS com componentes Shadcn/UI
- **Roteamento**: React Router
- **Gerenciamento de Estado**: Context API
- **Requisições HTTP**: TanStack Query
- **Ícones**: Lucide React

## 🏗️ Arquitetura do Projeto

### Motor de Jogo (Game Engine)

O núcleo do projeto é um motor de jogo personalizado que gerencia:

- **Estado do Jogo**: Posição do robô, objetos coletáveis, obstáculos e alvos
- **Execução de Comandos**: Processamento e execução de sequências de comandos
- **Verificação de Objetivos**: Validação de conclusão de níveis
- **Manipulação de Eventos**: Colisões, coleta de itens e interações

### Componentes Principais

- **CommandPalette**: Biblioteca de comandos disponíveis para o usuário
- **SensorAwareCodeBlocks**: Interface para criação e execução de sequências de comandos
- **GameMovement**: Controle de movimento do robô no ambiente
- **Handlers de Comandos**: Implementação de comandos como moveForward, turnRight, repeat, if/else, while

## 🎮 Comandos Disponíveis

- **Movimento Básico**: moveForward, moveBackward, turnRight, turnLeft
- **Controle**: stop
- **Interação**: paintGreen
- **Estruturas de Controle**: repeat, while, if/else

## 📚 Conceitos de Programação Abordados

- **Sequência**: Execução ordenada de comandos
- **Loops**: Repetição de blocos de código (repeat, while)
- **Condicionais**: Tomada de decisões baseada em condições (if/else)
- **Algoritmos**: Resolução de problemas através de passos lógicos

## 🛠️ Instalação e Uso

```bash
# Clone o repositório
git clone https://github.com/ualcz/codelab-adventure.git

# Entre no diretório do projeto
cd codelab-adventure

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🧩 Estrutura do Projeto

```
src/
├── components/       # Componentes React reutilizáveis
├── contexts/         # Contextos para gerenciamento de estado
├── data/             # Dados estáticos e gerenciadores de progresso
├── engine/           # Motor de jogo e lógica principal
│   ├── core/         # Núcleo do motor de jogo
│   ├── handlers/     # Manipuladores de comandos
│   └── utils/        # Funções utilitárias
├── hooks/            # Hooks personalizados
├── pages/            # Páginas da aplicação
├── services/         # Serviços e APIs
└── types/            # Definições de tipos TypeScript
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar o projeto.

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

<div align="center">
  <p>Desenvolvido com 💻 e 💙 para tornar o aprendizado de programação mais acessível e divertido.</p>
</div>