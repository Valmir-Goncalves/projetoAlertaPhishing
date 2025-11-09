# Instruções para Agentes de IA - Projeto Alerta Phishing

## Visão Geral do Projeto
Este é um projeto educacional que simula uma isca de phishing para ensinar sobre segurança cibernética. O projeto usa HTML, CSS e JavaScript para criar uma experiência interativa que demonstra como golpes de phishing funcionam.

## Arquitetura e Estrutura

### Componentes Principais
- `index.html`: Interface principal com três estados:
  1. Isca inicial (simulação de link malicioso)
  2. Alerta educacional 
  3. Simulação de "ataque" (demonstração educativa)

- `style.css`: Estilização responsiva com foco em:
  - Layout flexível usando flexbox
  - Estados visuais (`.oculto` para controle de visibilidade)
  - Temas para diferentes estados (cores de alerta, overlay escuro)

- `script.js`: Gerenciamento de estado e interações:
  - Eventos DOM para transições entre telas
  - Manipulação de áudio para efeitos
  - Integração com WhatsApp via URL scheme

## Fluxos de Dados e Interação
1. Usuário clica na isca (`phishing-link`) → Mostra alerta educacional
2. Usuário clica no botão de simulação → Inicia demonstração do "ataque"
3. Usuário finaliza simulação → Redirecionamento para WhatsApp (configurável)

## Convenções de Código
- IDs seguem padrão kebab-case (ex: `isca-container`, `alerta-educacional`)
- Classes CSS usam camelCase para estados (ex: `videoPreview`)
- Eventos são organizados numericamente em comentários (1., 2., 3.)
- Uso consistente de classes `.oculto` para gerenciar visibilidade

## Integrações Externas
- Meta tags para compartilhamento social (OpenGraph)
- API do WhatsApp via URL scheme para compartilhamento
- Recursos estáticos necessários:
  - `background.jpg`: Imagem de fundo
  - `far1.jpg`: Preview do vídeo falso
  - `warning_sound.mp3`: Áudio de alerta
  - `xsg.png`: Imagem de simulação de ataque

## Melhores Práticas
1. Use event.preventDefault() ao interceptar cliques em links
2. Mantenha mensagens educacionais claras e concisas
3. Garanta que recursos de áudio têm fallbacks
4. Preserve a estrutura de três estados da interface
5. Mantenha o aspecto educacional em primeiro plano

## Observações Importantes
- O projeto é puramente educacional - não use para fins maliciosos
- Todo código malicioso é apenas simulado
- URLs e telefones são exemplos e devem ser configurados
- O código inclui comentários detalhados para manutenção