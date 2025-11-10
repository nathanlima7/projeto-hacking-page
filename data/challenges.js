// Dados dos desafios em formato JSON
window.challengesData = [
    {
        "id": "find_password",
        "title": "Encontre a Senha Escondida",
        "level": "easy",
        "description": "Explore o sistema de arquivos para encontrar a senha escondida em um dos arquivos.",
        "filesystem": {
            "name": "~",
            "type": "directory",
            "children": {
                "documentos": {
                    "name": "documentos",
                    "type": "directory",
                    "children": {
                        "leia-me.txt": {
                            "name": "leia-me.txt",
                            "type": "file",
                            "content": "Bem-vindo ao sistema. Verifique a pasta config para configurações importantes."
                        },
                        "notas.txt": {
                            "name": "notas.txt",
                            "type": "file", 
                            "content": "Reunião às 15h com a equipe de segurança.\nNão se esqueça de fazer backup dos logs."
                        }
                    }
                },
                "config": {
                    "name": "config",
                    "type": "directory",
                    "children": {
                        "sistema.conf": {
                            "name": "sistema.conf",
                            "type": "file",
                            "content": "hostname: darknet-server\nport: 8080\ntimeout: 30"
                        },
                        "seguranca.txt": {
                            "name": "seguranca.txt",
                            "type": "file",
                            "content": "A senha de administrador é: DARKHACK2024\nMantenha esta informação em segredo."
                        }
                    }
                },
                "logs": {
                    "name": "logs", 
                    "type": "directory",
                    "children": {
                        "acesso.log": {
                            "name": "acesso.log",
                            "type": "file",
                            "content": "2024-01-15 10:30:22 - Usuário anônimo conectado\n2024-01-15 10:35:47 - Tentativa de acesso falhou\n2024-01-15 11:02:15 - Backup realizado com sucesso"
                        }
                    }
                }
            }
        },
        "hints": [
            "Use o comando 'ls' para listar os diretórios disponíveis",
            "Procure em diretórios que possam conter informações de configuração", 
            "O arquivo 'seguranca.txt' pode ter a informação que você precisa"
        ],
        "solution": "DARKHACK2024",
        "solution_explain": "A senha estava escondida no arquivo seguranca.txt dentro do diretório config."
    },
    {
    "id": "network_interception",
    "title": "Interceptação de Tráfego de Rede",
    "level": "hard",
    "description": "Intercepte o tráfego da rede, encontre uma máquina vulnerável e recupere dados sensíveis.",
    "filesystem": {
        "name": "~",
        "type": "directory",
        "children": {
            "tools": {
                "name": "tools",
                "type": "directory",
                "children": {
                    "network_scanner.js": {
                        "name": "network_scanner.js",
                        "type": "file",
                        "content": "// Scanner de rede - encontra hosts ativos\nfunction scanNetwork() {\n    return {\n        '192.168.1.1': 'Gateway/Router',\n        '192.168.1.50': 'Servidor Web',\n        '192.168.1.100': 'Workstation - User: john_doe',\n        '192.168.1.150': 'File Server - Vulnerável',\n        '192.168.1.200': 'Database Server'\n    };\n}\n\n// Teste: scanNetwork()"
                    },
                    "packet_sniffer.js": {
                        "name": "packet_sniffer.js",
                        "type": "file",
                        "content": "// Sniffer de pacotes - intercepta tráfego\nfunction sniffPackets(targetIP) {\n    const traffic = {\n        '192.168.1.150': [\n            'FTP Login: user=admin password=Server@1234',\n            'HTTP: GET /confidential/data.zip',\n            'Email: user@company.com -> banking credentials',\n            'SSH: Connection established port 22'\n        ]\n    };\n    return traffic[targetIP] || ['Nenhum tráfego encontrado para: ' + targetIP];\n}\n\n// Teste: sniffPackets('192.168.1.150')"
                    },
                    "ssh_bruteforce.js": {
                        "name": "ssh_bruteforce.js",
                        "type": "file",
                        "content": "// Simulador de brute force SSH\nfunction sshBruteForce(ip, username, wordlist) {\n    const validCredentials = {\n        'admin': 'Server@1234',\n        'root': 'Admin@2024',\n        'john_doe': 'Password123'\n    };\n    \n    if (validCredentials[username] && wordlist.includes(validCredentials[username])) {\n        return `✅ SSH Access Granted to ${ip} as ${username}`;\n    }\n    return `❌ Access Denied to ${ip}`;\n}\n\n// Teste: sshBruteForce('192.168.1.150', 'admin', ['Server@1234'])"
                    }
                }
            },
            "captures": {
                "name": "captures",
                "type": "directory",
                "children": {
                    "network_scan.txt": {
                        "name": "network_scan.txt",
                        "type": "file",
                        "content": "Iniciando varredura de rede...\nUse o comando: scan para executar o scanner"
                    },
                    "intercepted_traffic.txt": {
                        "name": "intercepted_traffic.txt",
                        "type": "file",
                        "content": "Aguardando interceptação...\nUse o comando: sniff <IP> para capturar tráfego"
                    }
                }
            },
            "exploit": {
                "name": "exploit",
                "type": "directory",
                "children": {
                    "access_log.txt": {
                        "name": "access_log.txt",
                        "type": "file",
                        "content": "Sistema de exploração pronto.\nUse credenciais obtidas para acessar sistemas."
                    }
                }
            }
        }
    },
    "hints": [
        "Comece escaneando a rede para encontrar hosts",
        "Intercepte o tráfego do host vulnerável", 
        "Use as credenciais FTP encontradas para acessar o servidor",
        "Procure por arquivos com dados sensíveis no servidor",
        "A flag está em um arquivo chamado 'red_flag.txt'"
    ],
    "solution": "RED_FLAG_NETWORK_MASTER_2024",
    "solution_explain": "A flag RED_FLAG_NETWORK_MASTER_2024 foi encontrada no arquivo red_flag.txt após acessar o servidor 192.168.1.150 com as credenciais admin:Server@1234."
}
];