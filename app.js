// Adicione este objeto no início do app.js ou em um local apropriado
window.networkServers = {
    '192.168.1.150': {
        name: '192.168.1.150',
        type: 'directory',
        children: {
            'home': {
                name: 'home',
                type: 'directory',
                children: {
                    'admin': {
                        name: 'admin',
                        type: 'directory',
                        children: {
                            'documents': {
                                name: 'documents',
                                type: 'directory',
                                children: {
                                    'passwords.txt': {
                                        name: 'passwords.txt',
                                        type: 'file',
                                        content: 'Email: john.doe@company.com\nPassword: MySecurePass123!\nBank: 001 | Account: 12345-6\nCredit Card: 4111-1111-1111-1111 | Exp: 12/25'
                                    },
                                    'financial_data.xlsx': {
                                        name: 'financial_data.xlsx',
                                        type: 'file',
                                        content: 'Dados financeiros da empresa:\n- Saldo total: R$ 1.500.000,00\n- Transações recentes...\n- Contas a pagar...'
                                    }
                                }
                            },
                            'downloads': {
                                name: 'downloads',
                                type: 'directory',
                                children: {
                                    'confidential_data.zip': {
                                        name: 'confidential_data.zip',
                                        type: 'file',
                                        content: 'Arquivo compactado com dados confidenciais:\n- Estratégia de negócios\n- Planilhas financeiras\n- Contratos importantes'
                                    }
                                }
                            }
                        }
                    },
                    'www': {
                        name: 'www',
                        type: 'directory',
                        children: {
                            'html': {
                                name: 'html',
                                type: 'directory',
                                children: {
                                    'index.html': {
                                        name: 'index.html',
                                        type: 'file',
                                        content: '<html><body><h1>Servidor Corporativo</h1></body></html>'
                                    },
                                    'config.php': {
                                        name: 'config.php',
                                        type: 'file',
                                        content: '<?php\n$db_host = \"localhost\";\n$db_user = \"root\";\n$db_pass = \"Database@2024\";\n$db_name = \"company_data\";\n?>'
                                    }
                                }
                            }
                        }
                    },
                    'etc': {
                        name: 'etc',
                        type: 'directory',
                        children: {
                            'red_flag.txt': {
                                name: 'red_flag.txt',
                                type: 'file',
                                content: 'PARABÉNS! Você completou a interceptação!\n\nFLAG: RED_FLAG_NETWORK_MASTER_2024\n\nEsta flag demonstra sua habilidade em:\n- Varredura de rede\n- Interceptação de tráfego\n- Exploração de vulnerabilidades\n- Recuperação de dados sensíveis'
                            },
                            'shadow.bak': {
                                name: 'shadow.bak',
                                type: 'file',
                                content: 'root:$6$rounds=5000$abc123$HASHED_PASSWORD_HERE\nadmin:$6$rounds=5000$def456$ANOTHER_HASH_HERE'
                            }
                        }
                    }
                }
            }
        }
    }
};

class DarkHackSimulator {
    constructor() {
        this.currentChallenge = null;
        this.currentPath = ['~'];
        this.filesystem = {};
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isSandboxVisible = false;

        this.init();
    }

    // ADICIONE ESTAS FUNÇÕES ANTES DO init():

    // Atualiza a barra de progresso
    updateProgressBar() {
        const progress = this.getProgress();
        const totalChallenges = this.challenges.length;
        const completed = progress.completed.length;
        const percentage = Math.round((completed / totalChallenges) * 100);

        document.getElementById('progress-text').textContent = `${completed}/${totalChallenges}`;
        document.getElementById('progress-percent').textContent = `${percentage}%`;
        document.getElementById('progress-fill').style.width = `${percentage}%`;
    }

    // Modifique a função markChallengeCompleted (SUBSTITUA A EXISTENTE):
    markChallengeCompleted(challengeId) {
        const progress = this.getProgress();
        if (!progress.completed.includes(challengeId)) {
            progress.completed.push(challengeId);
            this.saveProgress(progress);
            this.updateProgressBar(); // Linha nova adicionada
        }
    }

    // Modifique a função resetProgress (SUBSTITUA A EXISTENTE):
    resetProgress() {
        if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
            localStorage.removeItem('darkHackSimulatorProgress');
            this.loadProgress();
            this.renderChallengesList();
            this.updateProgressBar(); // Linha nova adicionada
            this.addToTerminal('Progresso resetado. Todos os desafios foram marcados como não concluídos.');
        }
    }

    // Inicialização da aplicação
    init() {
        this.loadChallenges();
        this.setupEventListeners();
        this.loadProgress();
        this.updateProgressBar();
        this.updateTerminalPrompt();
    }

    // Carrega os desafios do arquivo JSON
    async loadChallenges() {
        try {
            const response = await fetch('data/challenges.json');
            const data = await response.json();
            this.challenges = data.challenges;
            this.renderChallengesList();
        } catch (error) {
            console.error('Erro ao carregar desafios:', error);
            // Fallback para dados hardcoded se o arquivo não carregar
            this.challenges = [
                {
                    id: "find_password",
                    title: "Encontre a Senha Escondida",
                    level: "easy",
                    description: "Explore o sistema de arquivos para encontrar a senha escondida em um dos arquivos.",
                    // ... resto dos dados do desafio
                },
                // ... outros desafios
            ];
            this.renderChallengesList();
        }
    }

    // Configura os event listeners
    setupEventListeners() {
        const commandInput = document.getElementById('command-input');
        const clearBtn = document.getElementById('clear-terminal');
        const resetBtn = document.getElementById('reset-progress');
        const toggleSandboxBtn = document.getElementById('toggle-sandbox');
        const runSandboxBtn = document.getElementById('run-sandbox');
        const closeEditorBtn = document.getElementById('close-editor');
        const checkSolutionBtn = document.getElementById('check-solution');
        const resetFragmentsBtn = document.getElementById('reset-fragments');
        const levelFilter = document.getElementById('level-filter');
        const searchInput = document.getElementById('search-challenges');

        commandInput.addEventListener('keydown', (e) => this.handleCommandInput(e));
        clearBtn.addEventListener('click', () => this.clearTerminal());
        resetBtn.addEventListener('click', () => this.resetProgress());
        toggleSandboxBtn.addEventListener('click', () => this.toggleSandbox());
        runSandboxBtn.addEventListener('click', () => this.runSandboxCode());
        closeEditorBtn.addEventListener('click', () => this.closeBrokenFileEditor());
        checkSolutionBtn.addEventListener('click', () => this.checkBrokenFileSolution());
        resetFragmentsBtn.addEventListener('click', () => this.resetFragments());
        levelFilter.addEventListener('change', () => this.filterChallenges());
        searchInput.addEventListener('input', () => this.filterChallenges());

        // Drag and drop para fragmentos
        this.setupDragAndDrop();
    }

    // Renderiza a lista de desafios
    renderChallengesList() {
        const container = document.getElementById('challenges-list');
        container.innerHTML = '';

        this.challenges.forEach(challenge => {
            const challengeEl = document.createElement('div');
            challengeEl.className = `challenge-item ${this.getChallengeStatus(challenge.id)}`;
            challengeEl.innerHTML = `
                <div class="challenge-header">
                    <span class="challenge-title">${challenge.title}</span>
                    <span class="challenge-level level-${challenge.level}">${challenge.level}</span>
                </div>
                <div class="challenge-description">${challenge.description}</div>
            `;
            challengeEl.addEventListener('click', () => this.selectChallenge(challenge.id));
            container.appendChild(challengeEl);
        });
    }



    // Filtra os desafios baseado nos critérios
    filterChallenges() {
        const levelFilter = document.getElementById('level-filter').value;
        const searchTerm = document.getElementById('search-challenges').value.toLowerCase();

        const challenges = document.querySelectorAll('.challenge-item');

        challenges.forEach(challenge => {
            const level = challenge.querySelector('.challenge-level').className.includes(levelFilter);
            const title = challenge.querySelector('.challenge-title').textContent.toLowerCase();
            const matchesSearch = title.includes(searchTerm);
            const matchesLevel = levelFilter === 'all' || challenge.querySelector('.challenge-level').className.includes(levelFilter);

            challenge.style.display = (matchesSearch && matchesLevel) ? 'block' : 'none';
        });
    }

    // Seleciona um desafio
    selectChallenge(challengeId) {
        this.currentChallenge = this.challenges.find(c => c.id === challengeId);

        // Atualiza a UI
        document.querySelectorAll('.challenge-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.challenge-item.${this.getChallengeStatus(challengeId)}`).classList.add('active');

        // Carrega o filesystem do desafio
        this.loadChallengeFilesystem();

        // Reseta o caminho atual
        this.currentPath = ['~'];
        this.updateTerminalPrompt();

        // Exibe mensagem no terminal
        this.addToTerminal(`Desafio selecionado: ${this.currentChallenge.title}`);
        this.addToTerminal(`Descrição: ${this.currentChallenge.description}`);
        this.addToTerminal(`Nível: ${this.currentChallenge.level}`);
        this.addToTerminal('---');
        this.addToTerminal('Use os comandos disponíveis para explorar o sistema de arquivos e resolver o desafio.');
        this.addToTerminal('Digite "help" para ver a lista de comandos.');
    }

    // Carrega o filesystem do desafio atual
    loadChallengeFilesystem() {
        if (this.currentChallenge && this.currentChallenge.filesystem) {
            this.filesystem = JSON.parse(JSON.stringify(this.currentChallenge.filesystem));
        }
    }

    // Manipula a entrada de comandos
    handleCommandInput(event) {
        if (event.key === 'Enter') {
            const command = event.target.value.trim();
            if (command) {
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                event.target.value = '';
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.navigateHistory(-1);
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.navigateHistory(1);
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.autoComplete(command);
        }
    }

    // Navega pelo histórico de comandos
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex = Math.max(0, Math.min(this.commandHistory.length, this.historyIndex + direction));

        const commandInput = document.getElementById('command-input');
        if (this.historyIndex === this.commandHistory.length) {
            commandInput.value = '';
        } else {
            commandInput.value = this.commandHistory[this.historyIndex];
        }
    }

    // Auto-complete para comandos
    autoComplete(currentInput) {
        const commands = ['ls', 'cd', 'pwd', 'open', 'close', 'cat', 'search', 'broken', 'hint', 'solve', 'history', 'help'];
        const matches = commands.filter(cmd => cmd.startsWith(currentInput));

        if (matches.length === 1) {
            document.getElementById('command-input').value = matches[0];
        } else if (matches.length > 1) {
            this.addToTerminal(`Comandos possíveis: ${matches.join(', ')}`);
        }
    }

    // Executa um comando
    executeCommand(fullCommand) {
        const [command, ...args] = fullCommand.split(' ');
        this.addToTerminal(`hacker@darknet:${this.getCurrentPath()}$ ${fullCommand}`);

        switch (command) {
            case 'ls':
                this.cmdLs(args);
                break;
            case 'cd':
                this.cmdCd(args);
                break;
            case 'pwd':
                this.cmdPwd();
                break;
            case 'open':
                this.cmdOpen(args);
                break;
            case 'close':
                this.cmdClose();
                break;
            case 'cat':
                this.cmdCat(args);
                break;
            case 'search':
                this.cmdSearch(args);
                break;
            case 'broken':
                this.cmdBroken(args);
                break;
            case 'hint':
                this.cmdHint(args);
                break;
            case 'solve':
                this.cmdSolve(args);
                break;
            case 'history':
                this.cmdHistory();
                break;
            case 'help':
                this.cmdHelp();
                break;
            case 'clear':
                this.cmdClear();
                break;
            case 'api':
                this.cmdApi(args);
                break;
            case 'auth':        // ← ADICIONE ESTA LINHA
                this.cmdAuth(args);
                break;
            // Adicione estes casos no switch:
            case 'scan':
                this.cmdScan(args);
                break;
            case 'sniff':
                this.cmdSniff(args);
                break;
            case 'connect':
                this.cmdConnect(args);
                break;
            case 'remote_ls':
                this.cmdRemoteLs(args);
                break;
            case 'remote_cd':
                this.cmdRemoteCd(args);
                break;
            case 'remote_cat':
                this.cmdRemoteCat(args);
                break;
            default:
                this.addToTerminal(`Comando não reconhecido: ${command}. Digite 'help' para ver os comandos disponíveis.`);
        }
    }

    // Comando: ls - lista arquivos e diretórios
    cmdLs(args) {
        const path = this.resolvePath(args[0] || '.');
        const node = this.getNodeAtPath(path);

        if (!node) {
            this.addToTerminal(`ls: não foi possível acessar '${args[0] || "."}': Diretório não existe`);
            return;
        }

        if (node.type !== 'directory') {
            this.addToTerminal(`ls: '${args[0] || "."}' não é um diretório`);
            return;
        }

        const items = Object.keys(node.children || {});
        if (items.length === 0) {
            this.addToTerminal('(vazio)');
            return;
        }

        let output = '<div class="file-listing">';
        items.forEach(item => {
            const itemNode = node.children[item];
            const icon = itemNode.type === 'directory' ? '<span class="dir-icon">📁</span>' : '<span class="file-icon">📄</span>';
            output += `<div class="file-item">${icon} ${item}</div>`;
        });
        output += '</div>';

        this.addToTerminal(output, true);
    }

    // Comando: cd - muda diretório
    cmdCd(args) {
        if (args.length === 0) {
            this.currentPath = ['~'];
            this.updateTerminalPrompt();
            return;
        }

        const targetPath = this.resolvePath(args[0]);
        const node = this.getNodeAtPath(targetPath);

        if (!node) {
            this.addToTerminal(`cd: não foi possível acessar '${args[0]}': Diretório não existe`);
            return;
        }

        if (node.type !== 'directory') {
            this.addToTerminal(`cd: '${args[0]}' não é um diretório`);
            return;
        }

        this.currentPath = targetPath;
        this.updateTerminalPrompt();
    }

    // Comando: pwd - mostra diretório atual
    cmdPwd() {
        this.addToTerminal(this.getCurrentPath());
    }

    // Comando: open - abre um arquivo
    cmdOpen(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: open <arquivo>');
            return;
        }

        const path = this.resolvePath(args[0]);
        const node = this.getNodeAtPath(path);

        if (!node) {
            this.addToTerminal(`open: não foi possível abrir '${args[0]}': Arquivo não existe`);
            return;
        }

        if (node.type !== 'file') {
            this.addToTerminal(`open: '${args[0]}' não é um arquivo`);
            return;
        }

        this.addToTerminal(`Abrindo arquivo: ${args[0]}`);
        this.addToTerminal('--- CONTEÚDO DO ARQUIVO ---');
        this.addToTerminal(node.content || '(arquivo vazio)');
        this.addToTerminal('--- FIM DO ARQUIVO ---');
    }

    // Comando: close - fecha arquivo atual (placeholder)
    cmdClose() {
        this.addToTerminal('Nenhum arquivo aberto atualmente.');
    }

    // Comando: cat - exibe conteúdo do arquivo
    cmdCat(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: cat <arquivo>');
            return;
        }

        const path = this.resolvePath(args[0]);
        const node = this.getNodeAtPath(path);

        if (!node) {
            this.addToTerminal(`cat: não foi possível acessar '${args[0]}': Arquivo não existe`);
            return;
        }

        if (node.type !== 'file') {
            this.addToTerminal(`cat: '${args[0]}' não é um arquivo`);
            return;
        }

        this.addToTerminal(node.content || '(arquivo vazio)');
    }

    // Comando: search - busca por termo nos arquivos
    cmdSearch(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: search <termo>');
            return;
        }

        const term = args.join(' ');
        const results = this.searchInFilesystem(term);

        if (results.length === 0) {
            this.addToTerminal(`Nenhum resultado encontrado para: "${term}"`);
            return;
        }

        this.addToTerminal(`Resultados da busca por "${term}":`);
        results.forEach(result => {
            this.addToTerminal(`- ${result.path}: ${result.line}`);
        });
    }

    // Comando: broken - abre editor para arquivo quebrado
    cmdBroken(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: broken <arquivo>');
            return;
        }

        const path = this.resolvePath(args[0]);
        const node = this.getNodeAtPath(path);

        if (!node) {
            this.addToTerminal(`broken: não foi possível acessar '${args[0]}': Arquivo não existe`);
            return;
        }

        if (!node.broken) {
            this.addToTerminal(`broken: '${args[0]}' não é um arquivo quebrado`);
            return;
        }

        this.openBrokenFileEditor(args[0], node.content);
    }

    // Comando: hint - exibe dica do desafio
    cmdHint(args) {
        if (!this.currentChallenge) {
            this.addToTerminal('Nenhum desafio selecionado. Use a lista lateral para selecionar um desafio.');
            return;
        }

        const hintIndex = args.length > 0 ? parseInt(args[0]) - 1 : 0;
        const hints = this.currentChallenge.hints || [];

        if (hintIndex < 0 || hintIndex >= hints.length) {
            this.addToTerminal(`Dica ${hintIndex + 1} não disponível. Este desafio tem ${hints.length} dica(s).`);
            return;
        }

        this.addToTerminal(`Dica ${hintIndex + 1}: ${hints[hintIndex]}`);
    }

    // Comando: solve - tenta resolver o desafio
    cmdSolve(args) {
        if (!this.currentChallenge) {
            this.addToTerminal('Nenhum desafio selecionado. Use a lista lateral para selecionar um desafio.');
            return;
        }

        if (args.length === 0) {
            this.addToTerminal('Uso: solve <resposta>');
            return;
        }

        const answer = args.join(' ');
        const isCorrect = this.validateSolution(this.currentChallenge.id, answer);

        if (isCorrect) {
            this.addToTerminal('✅ Resposta correta! Desafio concluído.');
            this.markChallengeCompleted(this.currentChallenge.id);
            this.renderChallengesList();
        } else {
            this.addToTerminal('❌ Resposta incorreta. Tente novamente ou use "hint" para obter uma dica.');
        }
    }

    // Comando: history - exibe histórico de comandos
    cmdHistory() {
        if (this.commandHistory.length === 0) {
            this.addToTerminal('Nenhum comando no histórico.');
            return;
        }

        this.addToTerminal('Histórico de comandos:');
        this.commandHistory.forEach((cmd, index) => {
            this.addToTerminal(`${index + 1}. ${cmd}`);
        });
    }

    // Comando: clear - limpa o terminal
    cmdClear() {
        this.clearTerminal();
    }

    // Comando: auth <senha> - simula tentativa de autenticação
    cmdAuth(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: auth <senha> - Testa uma senha no sistema de autenticação');
            return;
        }

        const password = args.join(' ');
        const challenge = this.currentChallenge;

        if (challenge.id === 'auth_bruteforce') {
            // Simulação do sistema de autenticação
            const correctPassword = 'quantum2024';
            const isValid = password === correctPassword;

            if (isValid) {
                this.addToTerminal('✅ AUTENTICAÇÃO BEM-SUCEDIDA!');
                this.addToTerminal(`Acesso concedido. Flag: ${correctPassword.toUpperCase()}_ACCESS`);
                this.addToTerminal('Use: solve quantum2024 para completar o desafio');
            } else {
                this.addToTerminal('❌ Autenticação falhou. Senha incorreta.');
                this.addToTerminal('Consulte a wordlist.txt para outras tentativas.');
            }
        } else {
            this.addToTerminal('Sistema de autenticação não disponível neste desafio.');
        }
    }

    // Comando: scan - executa varredura de rede
    cmdScan(args) {
        if (this.currentChallenge && this.currentChallenge.id === 'network_interception') {
            const scanResults = {
                '192.168.1.1': 'Gateway/Router',
                '192.168.1.50': 'Servidor Web',
                '192.168.1.100': 'Workstation - user: john_doe',
                '192.168.1.150': 'File Server - uma vulnerabilidade encontrada',
                '192.168.1.200': 'Database Server'
            };

            this.addToTerminal(' Iniciando varredura de rede...');
            this.addToTerminal('Hosts encontrados:');
            Object.keys(scanResults).forEach(ip => {
                this.addToTerminal(`  ${ip} - ${scanResults[ip]}`);
            });
            this.addToTerminal('\n Dica: O servidor 192.168.1.150 parece vulnerável. Use: sniff 192.168.1.150');
        } else {
            this.addToTerminal('Scanner de rede não disponível neste desafio.');
        }
    }

    // Comando: sniff <IP> - intercepta tráfego
    cmdSniff(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: sniff <IP> - Intercepta tráfego do host especificado');
            return;
        }

        const targetIP = args[0];

        if (this.currentChallenge && this.currentChallenge.id === 'network_interception') {
            if (targetIP === '192.168.1.150') {
                this.addToTerminal(` Interceptando tráfego de ${targetIP}...`);
                this.addToTerminal(' Pacotes capturados:');
                this.addToTerminal('  - FTP Login: user=admin password=Server@1234');
                this.addToTerminal('  - HTTP: GET /confidential/data.zip');
                this.addToTerminal('  - Email: user@company.com -> banking credentials');
                this.addToTerminal('  - SSH: Connection established port 22');
                this.addToTerminal('\n Credenciais FTP encontradas! Use: connect 192.168.1.150');
            } else {
                this.addToTerminal(` Nenhum tráfego interessante encontrado para ${targetIP}`);
            }
        } else {
            this.addToTerminal('Sniffer de pacotes não disponível neste desafio.');
        }
    }

    // Comando: connect <IP> - conecta ao servidor
    cmdConnect(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: connect <IP> - Conecta ao servidor especificado');
            return;
        }

        const targetIP = args[0];

        if (this.currentChallenge && this.currentChallenge.id === 'network_interception') {
            if (targetIP === '192.168.1.150') {
                this.addToTerminal(` Conectando ao servidor ${targetIP}...`);
                this.addToTerminal(' Conexão FTP estabelecida com credenciais: admin:Server@1234');
                this.addToTerminal(' Sistema de arquivos remoto acessível');
                this.addToTerminal('\n ');

                // Marca que o servidor está acessível
                this.remoteServerConnected = true;
                this.remoteServerIP = targetIP;
            } else {
                this.addToTerminal(` Falha na conexão com ${targetIP}`);
            }
        } else {
            this.addToTerminal('Conexão remota não disponível neste desafio.');
        }
    }

    // Comando: remote_ls - lista arquivos do servidor remoto
    cmdRemoteLs(args) {
        if (this.currentChallenge && this.currentChallenge.id === 'network_interception' && this.remoteServerConnected) {
            const path = args[0] || '/';
            const serverFS = window.networkServers[this.remoteServerIP];

            if (path === '/') {
                this.addToTerminal('📁 Sistema de arquivos remoto:');
                this.addToTerminal('  home/    - Diretórios de usuários');
                this.addToTerminal('  etc/     - Arquivos de configuração');
                this.addToTerminal('\n');
            } else if (path === '/home') {
                this.addToTerminal('📁 /home:');
                this.addToTerminal('  admin/   - Diretório do administrador');
                this.addToTerminal('  www/     - Arquivos do servidor web');
            } else if (path === '/home/admin') {
                this.addToTerminal('📁 /home/admin:');
                this.addToTerminal('  documents/ - Documentos pessoais');
                this.addToTerminal('  downloads/ - Downloads');
            } else if (path === '/home/admin/documents') {
                this.addToTerminal('📁 /home/admin/documents:');
                this.addToTerminal('  passwords.txt       - Senhas e credenciais');
                this.addToTerminal('  financial_data.xlsx - Dados financeiros');
            } else if (path === '/etc') {
                this.addToTerminal('📁 /etc:');
                this.addToTerminal('  red_flag.txt - ★ ARQUIVO DA FLAG ★');
                this.addToTerminal('  shadow.bak   - Backup de senhas');
            }
        } else {
            this.addToTerminal('❌ Nenhum servidor remoto conectado. Use: connect <IP> primeiro');
        }
    }

    // Comando: remote_cd <pasta> - navega no servidor remoto
    cmdRemoteCd(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: remote_cd <pasta> - Navega no servidor remoto');
            return;
        }

        const folder = args[0];
        const validPaths = ['home', 'etc', 'home/admin', 'home/admin/documents', 'home/admin/downloads', 'home/www', '/'];

        if (validPaths.includes(folder)) {
            this.addToTerminal(`📁 Mudando para: ${folder}`);
            this.addToTerminal('');
        } else {
            this.addToTerminal(`❌ Diretório não encontrado: ${folder}`);
        }
    }

    // Comando: remote_cat <arquivo> - lê arquivo do servidor remoto
    cmdRemoteCat(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: remote_cat <arquivo> - Lê arquivo do servidor remoto');
            return;
        }

        const filename = args[0];
        const serverFS = window.networkServers[this.remoteServerIP];

        // Simulação de acesso a arquivos específicos
        const fileContents = {
            'passwords.txt': 'Email: john.doe@company.com\nPassword: MySecurePass123!\nBank: 001 | Account: 12345-6\nCredit Card: 4111-1111-1111-1111 | Exp: 12/25',
            'red_flag.txt': 'PARABÉNS! Você completou a interceptação!\n\nFLAG: RED_FLAG_NETWORK_MASTER_2024\n\nEsta flag demonstra sua habilidade em:\n- Varredura de rede\n- Interceptação de tráfego\n- Exploração de vulnerabilidades\n- Recuperação de dados sensíveis',
            'financial_data.xlsx': 'Dados financeiros da empresa:\n- Saldo total: R$ 1.500.000,00\n- Transações recentes...\n- Contas a pagar...',
            'shadow.bak': 'root:$6$rounds=5000$abc123$HASHED_PASSWORD_HERE\nadmin:$6$rounds=5000$def456$ANOTHER_HASH_HERE'
        };

        if (fileContents[filename]) {
            this.addToTerminal(`Conteúdo de ${filename}:`);
            this.addToTerminal('---');
            this.addToTerminal(fileContents[filename]);
            this.addToTerminal('---');

            if (filename === 'red_flag.txt') {
                this.addToTerminal('\n FLAG ENCONTRADA!');
            }
        } else {
            this.addToTerminal(`❌ Arquivo não encontrado: ${filename}`);
        }
    }

    // Comando: api <endpoint> - simula chamada de API
    cmdApi(args) {
        if (args.length === 0) {
            this.addToTerminal('Uso: api <endpoint> - Faz chamada para API simulada');
            this.addToTerminal('Endpoints: /users, /users/:id, /config, /backup');
            return;
        }

        const endpoint = args[0];
        const challenge = this.currentChallenge;

        if (challenge.id === 'web_api_exploit') {
            // Simulação de respostas da API
            const responses = {
                '/users': 'GET /api/users - 200 OK\n[\n  {\"id\": 1, \"name\": \"admin\"},\n  {\"id\": 2, \"name\": \"user1\"},\n  {\"id\": 3, \"name\": \"guest\"}\n]',
                '/users/1': 'GET /api/users/1 - 200 OK\n{\"id\": 1, \"name\": \"admin\", \"role\": \"admin\", \"secret\": \"FLAG_API_MASTER\"}',
                '/users/2': 'GET /api/users/2 - 200 OK\n{\"id\": 2, \"name\": \"user1\", \"role\": \"user\"}',
                '/config': 'GET /api/config - 403 Forbidden\nAcesso negado. Requer privilégios de admin.',
                '/backup': 'GET /api/backup - 401 Unauthorized\nToken de autenticação necessário.'
            };

            const response = responses[endpoint] || `GET ${endpoint} - 404 Not Found\nEndpoint não existe.`;
            this.addToTerminal(response);
        } else {
            this.addToTerminal('API simulada não disponível neste desafio.');
        }
    }

    // Comando: help - exibe ajuda
    // Comando: help - exibe ajuda organizada
    cmdHelp() {
        const helpText = `
<h4>comandos_de_navegação</h4>
<div class="command-group">
    <div class="command-item"><strong>ls [diretório]</strong> - Lista arquivos e diretórios</div>
    <div class="command-item"><strong>cd [diretório]</strong> - Muda o diretório atual</div>
    <div class="command-item"><strong>pwd</strong> - Mostra o diretório atual</div>
</div>

<h4>comandos_de_arquivos</h4>
<div class="command-group">
    <div class="command-item"><strong>open &lt;arquivo&gt;</strong> - Abre um arquivo para visualização</div>
    <div class="command-item"><strong>close</strong> - Fecha o arquivo atual</div>
    <div class="command-item"><strong>cat &lt;arquivo&gt;</strong> - Exibe o conteúdo de um arquivo</div>
    <div class="command-item"><strong>broken &lt;arquivo&gt;</strong> - Abre editor para arquivo quebrado</div>
</div>

<h4>comandos_de_busca_e_analise</h4>
<div class="command-group">
    <div class="command-item"><strong>search &lt;termo&gt;</strong> - Busca por termo nos arquivos</div>
</div>

<h4>comandos_de_desafio</h4>
<div class="command-group">
    <div class="command-item"><strong>hint [n]</strong> - Exibe dica do desafio (n = número da dica)</div>
    <div class="command-item"><strong>solve &lt;resposta&gt;</strong> - Tenta resolver o desafio</div>
</div>

<h4>comandos_do_sistema</h4>
<div class="command-group">
    <div class="command-item"><strong>history</strong> - Exibe histórico de comandos</div>
    <div class="command-item"><strong>clear</strong> - Limpa o terminal</div>
    <div class="command-item"><strong>help</strong> - Exibe esta ajuda</div>
</div>

<h4>atalhos_do_terminal</h4>
<div class="command-group">
    <div class="command-item"><strong>↑/↓</strong> - Navega no histórico de comandos</div>
    <div class="command-item"><strong>Tab</strong> - Auto-completar comandos</div>
</div>

<h4>comandos_interativos</h4>
<div class="command-group">
    <div class="command-item"><strong>auth &lt;senha&gt;</strong> - Testa senha no sistema de autenticação</div>
    <div class="command-item"><strong>api &lt;endpoint&gt;</strong> - Faz chamada para API simulada</div>
</div>
    `.trim();

        this.addToTerminal(helpText, true);
    }

    // Valida uma solução para um desafio
    validateSolution(challengeId, answer) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return false;

        // Comparação case-insensitive e ignora espaços extras
        const normalizedAnswer = answer.trim().toLowerCase();
        const normalizedSolution = challenge.solution.trim().toLowerCase();

        return normalizedAnswer === normalizedSolution;
    }

    // Adiciona texto ao terminal
    addToTerminal(text, isHTML = false) {
        const output = document.querySelector('.terminal .output');
        const line = document.createElement('div');
        line.className = 'command-line';

        if (isHTML) {
            line.innerHTML = text;
        } else {
            line.textContent = text;
        }

        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    // Limpa o terminal
    clearTerminal() {
        const output = document.querySelector('.terminal .output');
        output.innerHTML = '<div class="command-line"><span class="prompt">hacker@darknet:~$</span><span class="welcome-message">Terminal limpo.</span></div>';
    }

    // Atualiza o prompt do terminal
    updateTerminalPrompt() {
        const prompts = document.querySelectorAll('.prompt');
        prompts.forEach(prompt => {
            prompt.textContent = `hacker@darknet:${this.getCurrentPath()}$`;
        });
    }

    // Obtém o caminho atual como string
    getCurrentPath() {
        return this.currentPath.join('/');
    }

    // Resolve um caminho relativo para absoluto
    resolvePath(path) {
        if (path === '~') return ['~'];
        if (path === '/') return ['~'];

        const pathParts = path.split('/').filter(p => p !== '');
        let result = [...this.currentPath];

        if (path.startsWith('/') || path.startsWith('~')) {
            result = ['~'];
        }

        for (const part of pathParts) {
            if (part === '..') {
                if (result.length > 1) result.pop();
            } else if (part !== '.') {
                result.push(part);
            }
        }

        return result;
    }

    // Obtém um nó no filesystem pelo caminho
    getNodeAtPath(path) {
        let node = this.filesystem;

        for (let i = 1; i < path.length; i++) {
            const part = path[i];
            if (!node.children || !node.children[part]) {
                return null;
            }
            node = node.children[part];
        }

        return node;
    }

    // Busca por termo no filesystem
    searchInFilesystem(term) {
        const results = [];
        const searchRecursive = (node, currentPath) => {
            if (node.type === 'file' && node.content && node.content.toLowerCase().includes(term.toLowerCase())) {
                const lines = node.content.split('\n');
                lines.forEach((line, index) => {
                    if (line.toLowerCase().includes(term.toLowerCase())) {
                        results.push({
                            path: currentPath.join('/'),
                            line: `Linha ${index + 1}: ${line.trim()}`
                        });
                    }
                });
            }

            if (node.children) {
                Object.keys(node.children).forEach(childName => {
                    const childPath = [...currentPath, childName];
                    searchRecursive(node.children[childName], childPath);
                });
            }
        };

        searchRecursive(this.filesystem, ['~']);
        return results;
    }

    // Abre o editor de arquivos quebrados
    openBrokenFileEditor(filename, content) {
        document.getElementById('broken-file-name').textContent = filename;

        // Divide o conteúdo em fragmentos
        const fragments = content.split('\n').filter(line => line.trim() !== '');
        this.shuffleArray(fragments);

        const container = document.getElementById('fragments-container');
        container.innerHTML = '';

        fragments.forEach((fragment, index) => {
            const fragmentEl = document.createElement('div');
            fragmentEl.className = 'fragment';
            fragmentEl.textContent = fragment;
            fragmentEl.dataset.index = index;
            fragmentEl.draggable = true;
            container.appendChild(fragmentEl);
        });

        document.getElementById('broken-file-editor').classList.remove('hidden');
    }

    // Fecha o editor de arquivos quebrados
    closeBrokenFileEditor() {
        document.getElementById('broken-file-editor').classList.add('hidden');
    }

    // Configura drag and drop para fragmentos
    setupDragAndDrop() {
        let draggedItem = null;

        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('fragment')) {
                draggedItem = e.target;
                e.target.classList.add('dragging');
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('fragment')) {
                e.target.classList.remove('dragging');
            }
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedItem && e.target.classList.contains('fragment')) {
                const fragmentsContainer = document.getElementById('fragments-container');
                const fragments = Array.from(fragmentsContainer.querySelectorAll('.fragment'));
                const draggedIndex = fragments.indexOf(draggedItem);
                const targetIndex = fragments.indexOf(e.target);

                if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
                    if (draggedIndex < targetIndex) {
                        e.target.after(draggedItem);
                    } else {
                        e.target.before(draggedItem);
                    }
                }
            }
        });
    }

    // Verifica a solução do arquivo quebrado
    checkBrokenFileSolution() {
        const fragmentsContainer = document.getElementById('fragments-container');
        const fragments = Array.from(fragmentsContainer.querySelectorAll('.fragment'));
        const reconstructed = fragments.map(f => f.textContent).join('\n');

        // Verifica se a reconstrução está correta
        const path = this.resolvePath(document.getElementById('broken-file-name').textContent);
        const node = this.getNodeAtPath(path);

        if (node && reconstructed === node.originalContent) {
            this.addToTerminal('✅ Arquivo reconstruído corretamente!');
            this.closeBrokenFileEditor();
        } else {
            this.addToTerminal('❌ A reconstrução não está correta. Tente novamente.');
        }
    }

    // Reinicia os fragmentos do arquivo quebrado
    resetFragments() {
        const filename = document.getElementById('broken-file-name').textContent;
        const path = this.resolvePath(filename);
        const node = this.getNodeAtPath(path);

        if (node) {
            this.openBrokenFileEditor(filename, node.content);
        }
    }

    // Alterna a visibilidade do sandbox JS
    toggleSandbox() {
        const sandbox = document.getElementById('js-sandbox');
        const isHidden = sandbox.classList.contains('hidden');

        if (isHidden) {
            sandbox.classList.remove('hidden');
            document.getElementById('toggle-sandbox').textContent = 'Ocultar Sandbox';
        } else {
            sandbox.classList.add('hidden');
            document.getElementById('toggle-sandbox').textContent = 'Sandbox JS';
        }
    }

    // Executa código no sandbox JS
    runSandboxCode() {
        const code = document.getElementById('sandbox-code').value;

        try {
            // Captura o console.log
            let consoleOutput = [];
            const originalConsoleLog = console.log;
            console.log = (...args) => {
                consoleOutput.push(args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(' '));
            };

            this.addToTerminal(`> ${code}`);

            // Executa o código
            const result = new Function(code)();

            // Restaura console.log original
            console.log = originalConsoleLog;

            // Exibe outputs do console.log
            if (consoleOutput.length > 0) {
                consoleOutput.forEach(output => {
                    this.addToTerminal(`[console] ${output}`);
                });
            }

            // Exibe o resultado da função (se houver)
            if (result !== undefined) {
                this.addToTerminal(`Resultado: ${result}`);
            } else if (consoleOutput.length === 0) {
                this.addToTerminal('Código executado (sem retorno)');
            }

        } catch (error) {
            // Restaura console.log em caso de erro
            console.log = originalConsoleLog;
            this.addToTerminal(`> ${code}`);
            this.addToTerminal(`Erro: ${error.message}`);
        }
    }

    // Embaralha um array (para fragmentos de arquivos quebrados)
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Obtém o status de um desafio
    getChallengeStatus(challengeId) {
        const progress = this.getProgress();
        return progress.completed.includes(challengeId) ? 'completed' : 'incomplete';
    }

    // Marca um desafio como concluído
    markChallengeCompleted(challengeId) {
        const progress = this.getProgress();
        if (!progress.completed.includes(challengeId)) {
            progress.completed.push(challengeId);
            this.saveProgress(progress);
        }
    }

    // Carrega o progresso do localStorage
    loadProgress() {
        this.progress = this.getProgress();
    }

    // Obtém o progresso atual
    getProgress() {
        const stored = localStorage.getItem('darkHackSimulatorProgress');
        return stored ? JSON.parse(stored) : { completed: [] };
    }

    // Salva o progresso no localStorage
    saveProgress(progress) {
        localStorage.setItem('darkHackSimulatorProgress', JSON.stringify(progress));
    }

    // Reseta o progresso
    resetProgress() {
        if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
            localStorage.removeItem('darkHackSimulatorProgress');
            this.loadProgress();
            this.renderChallengesList();
            this.addToTerminal('Progresso resetado. Todos os desafios foram marcados como não concluídos.');
        }
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.hackSimulator = new DarkHackSimulator();
});

