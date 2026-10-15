export type Service = { slug: string; name: string; short: string; title: string; description: string; intro: string; icon: string; image: string; alt: string; symptoms: string[]; explanation: string; note: string; faqs: {q: string; a: string}[]; related: string[] };
export const services: Service[] = [
  {
    slug: 'troca-de-tela', name: 'Troca de tela', short: 'Tela quebrada, manchas ou toque falhando? Avaliamos o conjunto de tela do seu aparelho.',
    title: 'Troca de tela de celular em Sorocaba', description: 'Tela trincada, sem imagem ou com falhas no toque? Consulte a troca de tela na Kacell, na Vila Hortência, em Sorocaba. Peça seu orçamento.',
    intro: 'Volte a enxergar suas mensagens e usar o toque com conforto. O primeiro passo é avaliar o que aconteceu com a tela.',
    icon: 'device-mobile', image: 'troca-de-tela', alt: 'Ilustração de um celular com a tela trincada',
    symptoms: ['Vidro quebrado ou tela trincada', 'Manchas, linhas ou ausência de imagem', 'Toque sem resposta ou acionando sozinho'],
    explanation: 'A tela reúne o vidro, o sistema de toque e o display. Após avaliar o aparelho, a equipe orienta se é necessária a substituição do conjunto, apresenta as opções disponíveis para o modelo e informa as condições do reparo.',
    note: 'Se a imagem e o toque continuam funcionando, consulte também a possibilidade de trocar apenas o vidro.',
    faqs: [{q:'Toda tela trincada precisa ser trocada por completo?',a:'Não necessariamente. Em alguns casos é possível preservar o display e trocar o vidro. A avaliação identifica a opção compatível com o estado e o modelo do aparelho.'},{q:'Qual é o valor da troca de tela?',a:'O valor depende do modelo e das opções de peça disponíveis. Envie a marca, o modelo e uma descrição do problema para receber orientação e solicitar um orçamento gratuito.'},{q:'Vocês trocam telas de tablets?',a:'Atendemos tablets, com consulta prévia sobre modelo, peças e possibilidade de reparo.'}], related: ['troca-de-vidro','troca-de-bateria']
  },
  {
    slug:'troca-de-vidro', name:'Troca de vidro', short:'Vidro trincado com imagem e toque preservados? Consulte a possibilidade de manter o display.',
    title:'Troca de vidro de celular em Sorocaba', description:'Consulte a troca de vidro de celular na Kacell em Sorocaba. A possibilidade de preservar o display depende da avaliação. Orçamento pelo WhatsApp.',
    intro:'O vidro quebrou, mas a imagem e o toque continuam bons? Pode ser possível preservar o display do seu aparelho.',
    icon:'layers-intersect', image:'troca-de-vidro', alt:'Ilustração de um vidro trincado separado de um celular com display preservado',
    symptoms:['Trincas no vidro da frente', 'Imagem sem manchas ou linhas aparentes', 'Toque funcionando na área da tela'],
    explanation:'A troca de vidro atua na camada externa, preservando o display quando o estado do conjunto permite. A equipe precisa avaliar o funcionamento da imagem, do toque e a integridade do aparelho antes de indicar o procedimento.',
    note:'Ter imagem não garante que a troca apenas do vidro seja viável. A indicação é feita após a avaliação.',
    faqs:[{q:'Troca de vidro e troca de tela são o mesmo serviço?',a:'Não. Na troca de vidro, busca-se preservar o display quando isso é possível. A troca de tela envolve a substituição do conjunto conforme o defeito identificado.'},{q:'Meu vidro quebrou e apareceram manchas. Posso trocar só o vidro?',a:'Manchas podem indicar comprometimento do display. Conte o que aconteceu para a equipe; a avaliação definirá qual serviço é adequado.'}], related:['troca-de-tela','camera-audio-microfone']
  },
  {
    slug:'troca-de-bateria', name:'Troca de bateria', short:'Carga durando pouco ou desligamentos inesperados? Consulte a avaliação da bateria.',
    title:'Troca de bateria de celular em Sorocaba', description:'Bateria descarregando rápido ou celular desligando? Solicite um orçamento para troca de bateria na Kacell, em Sorocaba. Celulares e tablets.',
    intro:'A carga já não acompanha a sua rotina? Uma avaliação ajuda a entender se é hora de substituir a bateria.',
    icon:'battery-2', image:'troca-de-bateria', alt:'Ilustração de celular aberto com a bateria removida',
    symptoms:['Carga com duração reduzida', 'Desligamentos inesperados durante o uso', 'Bateria com alteração de formato'],
    explanation:'O desgaste da bateria pode afetar a autonomia, mas nem toda falha de carga vem dela. A equipe avalia o aparelho para orientar a substituição quando indicada e confirmar a disponibilidade de uma peça compatível.',
    note:'Se perceber a bateria estufada, interrompa o uso e procure orientação. Não pressione, perfure ou tente remover a peça em casa.',
    faqs:[{q:'Trocar a bateria resolve qualquer problema de carga?',a:'Não. Conector, cabo e outros componentes também podem estar relacionados. A avaliação ajuda a identificar o serviço necessário.'},{q:'A troca pode ser feita no mesmo dia?',a:'Alguns reparos são realizados no mesmo dia, conforme avaliação e disponibilidade de peças. Confirme o prazo para o seu modelo.'}], related:['conector-de-carga','reparo-de-placa']
  },
  {
    slug:'conector-de-carga', name:'Conector de carga', short:'Cabo com mau contato ou aparelho sem carregar? Vamos avaliar a conexão de carga.',
    title:'Reparo de conector de carga em Sorocaba', description:'Celular não carrega ou o cabo apresenta mau contato? Consulte o reparo de conector de carga na Kacell em Sorocaba. Orçamento gratuito.',
    intro:'Ter que encontrar uma posição para o cabo não precisa fazer parte da rotina. Consulte a avaliação da entrada de carga.',
    icon:'plug-connected', image:'conector-de-carga', alt:'Ilustração de um celular com a porta de carga e um cabo USB-C desconectado',
    symptoms:['Carregamento interrompido ao mover o cabo','Aparelho que não reconhece o carregador','Conector com encaixe irregular'],
    explanation:'Falhas ao carregar podem estar ligadas ao conector, a acessórios ou a componentes internos. A equipe verifica o aparelho e orienta o reparo adequado, sem pressupor que a troca da entrada resolve todos os casos.',
    note:'Evite forçar o cabo ou inserir objetos na porta de carga. Informe se houve queda, líquido ou dano aparente.',
    faqs:[{q:'Preciso levar meu carregador?',a:'Informe à equipe qual carregador e cabo você usa. Ela orientará quais acessórios levar para ajudar na avaliação.'},{q:'Vocês atendem diferentes tipos de conector?',a:'A disponibilidade depende do modelo do celular ou tablet e das peças necessárias. Envie essas informações pelo WhatsApp.'}], related:['troca-de-bateria','reparo-de-placa']
  },
  {
    slug:'reparo-de-placa', name:'Reparo de placa', short:'Aparelho que não liga ou apresenta falhas internas? Consulte uma avaliação técnica.',
    title:'Reparo de placa de celular em Sorocaba', description:'Avaliação de falhas na placa de celulares e tablets na Kacell em Sorocaba. Consulte a viabilidade do reparo e solicite um orçamento.',
    intro:'Alguns problemas estão nos componentes internos. A avaliação técnica é o ponto de partida para entender as possibilidades de reparo.',
    icon:'cpu', image:'reparo-de-placa', alt:'Ilustração de uma placa eletrônica de smartphone com seus componentes',
    symptoms:['Aparelho que não liga','Reinícios ou falhas recorrentes','Funções que deixam de operar após um dano'],
    explanation:'A placa interliga os componentes do aparelho. Sintomas semelhantes podem ter causas diferentes, por isso a equipe avalia o caso antes de indicar intervenções, prazo ou orçamento. A reparabilidade depende do dano identificado.',
    note:'Nenhum sintoma isolado confirma um defeito de placa. A viabilidade do reparo só pode ser informada após a avaliação.',
    faqs:[{q:'Toda placa pode ser reparada?',a:'Não é possível garantir. A possibilidade depende da extensão do dano, do modelo e das condições dos componentes.'},{q:'O reparo garante a recuperação dos meus arquivos?',a:'Não. A preservação ou recuperação dos dados não pode ser garantida. Informe à equipe se há arquivos importantes antes de autorizar qualquer serviço.'}], related:['contato-com-liquido','conector-de-carga']
  },
  {
    slug:'camera-audio-microfone', name:'Câmeras, áudio e microfone', short:'Fotos sem foco, som falhando ou dificuldade nas chamadas? Encontre orientação para o reparo.',
    title:'Reparo de câmera, áudio e microfone em Sorocaba', description:'Câmera sem foco, áudio baixo ou microfone com falhas? Consulte o reparo de celulares e tablets na Kacell, em Sorocaba. Fale pelo WhatsApp.',
    intro:'Fotos, chamadas e mensagens de voz fazem parte do dia. Conte qual função está falhando para orientar a avaliação.',
    icon:'camera', image:'camera-audio-microfone', alt:'Ilustração dos módulos de câmera, alto-falante e microfone de celular',
    symptoms:['Câmera sem imagem ou com dificuldade de foco','Som ausente, baixo ou distorcido','Voz que não é captada em chamadas ou gravações'],
    explanation:'Câmeras, alto-falantes e microfones têm funções diferentes e podem apresentar falhas específicas. A equipe verifica o comportamento relatado e orienta o serviço conforme o componente, o modelo e a disponibilidade de peças.',
    note:'Ao pedir orçamento, descreva se o problema ocorre nas chamadas, nas gravações, nas fotos ou em mais de uma função.',
    faqs:[{q:'Vocês avaliam a câmera frontal e a traseira?',a:'Sim, consulte a disponibilidade para o modelo e indique qual câmera apresenta o problema.'},{q:'Meu áudio falha só em chamadas. É o microfone?',a:'Não é possível concluir a causa à distância. Informar quando a falha acontece ajuda a direcionar a avaliação.'}], related:['reparo-de-placa','contato-com-liquido']
  },
  {
    slug:'contato-com-liquido', name:'Contato com líquido', short:'O aparelho molhou? Procure orientação para avaliar os danos e a possibilidade de reparo.',
    title:'Reparo de celular após contato com líquido em Sorocaba', description:'Seu celular ou tablet molhou? Consulte a Kacell em Sorocaba para avaliar os danos e a possibilidade de reparo após contato com líquido.',
    intro:'Após contato com líquido, o aparelho precisa de atenção mesmo que continue ligando. Fale com a equipe para receber orientação.',
    icon:'droplet', image:'contato-com-liquido', alt:'Ilustração de um smartphone desligado com gotas de água na superfície',
    symptoms:['Falhas após contato com água ou outro líquido','Tela, som ou carregamento alterados','Aparelho desligando ou sem ligar após molhar'],
    explanation:'O contato com líquido pode afetar diferentes componentes. A avaliação verifica o estado do aparelho e as possibilidades de intervenção. O resultado depende da extensão dos danos e não há garantia prévia de recuperação.',
    note:'Evite conectar o aparelho ao carregador ou tentar ligá-lo repetidamente. Não aplique calor. Procure orientação técnica.',
    faqs:[{q:'Se o aparelho ainda liga, precisa ser avaliado?',a:'O funcionamento imediato não descarta danos internos. Informe o que aconteceu e consulte a orientação da equipe.'},{q:'É possível garantir que vai voltar a funcionar?',a:'Não. A viabilidade e o resultado do reparo dependem dos danos encontrados durante a avaliação.'}], related:['reparo-de-placa','camera-audio-microfone']
  }
];
