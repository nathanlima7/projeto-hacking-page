# Dark Hack Simulator

Um simulador de terminal hacker com desafios de segurança e programação, desenvolvido como uma SPA (Single Page Application) em vanilla JavaScript.

## Características

- Interface no estilo terminal com tema escuro
- 6 desafios de diferentes níveis (fácil, médio, difícil)
- Sistema de arquivos simulado para cada desafio
- Terminal interativo com comandos personalizados
- Editor para reparar arquivos quebrados (drag & drop)
- Sandbox JavaScript para testar código
- Progresso salvo localmente

## Comandos Disponíveis

- `ls [diretório]` - Lista arquivos e diretórios
- `cd [diretório]` - Muda o diretório atual
- `pwd` - Mostra o diretório atual
- `open <arquivo>` - Abre um arquivo para visualização
- `close` - Fecha o arquivo atual
- `cat <arquivo>` - Exibe o conteúdo de um arquivo
- `search <termo>` - Busca por termo nos arquivos
- `broken <arquivo>` - Abre editor para arquivo quebrado
- `hint [n]` - Exibe dica do desafio (n = número da dica)
- `solve <resposta>` - Tenta resolver o desafio
- `history` - Exibe histórico de comandos
- `help` - Exibe ajuda completa

## Como Usar

1. Abra `index.html` em um navegador moderno
2. Selecione um desafio na lista lateral
3. Use os comandos do terminal para explorar o sistema de arquivos
4. Encontre pistas e resolva o desafio
5. Use `solve <resposta>` para verificar sua solução

## Walkthrough: Resolvendo "Encontre a Senha Escondida"

### Passo 1: Explorar o Sistema de Arquivos