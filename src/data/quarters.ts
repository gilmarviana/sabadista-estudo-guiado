import { YearData, Quarter, QuizQuestion, BiblicalVerse, Lesson } from '@/types/lesson';

// Versículos bíblicos completos
const verses = {
  joshua1_7: {
    reference: "Josué 1:7",
    text: "Tão somente seja forte e muito corajoso para que você tenha o cuidado de fazer segundo toda a Lei que o Meu servo Moisés te ordenou. Não se desvie dela, nem para a direita nem para a esquerda, para que seja bem-sucedido por onde quer que você andar.",
    version: "NAA"
  },
  hebrews11_31: {
    reference: "Hebreus 11:31",
    text: "Pela fé, Raabe, a prostituta, não foi destruída com os desobedientes, porque acolheu os espias com paz.",
    version: "NAA"
  },
  joshua4_23_24: {
    reference: "Josué 4:23-24",
    text: "O Senhor, o seu Deus, fez secar as águas do Jordão diante de vocês, até que vocês tivessem passado, como o Senhor, o seu Deus, fez com o Mar Vermelho, que Ele secou diante de nós, até que tivéssemos passado. Para que todos os povos da terra saibam que a mão do Senhor é forte, a fim de que vocês temam o Senhor, seu Deus, todos os dias.",
    version: "NAA"
  }
} as const;

// Função para criar lições completas
const createCompleteLesson = (
  number: number,
  title: string,
  subtitle: string,
  memoryVerse: BiblicalVerse,
  startDate: string,
  endDate: string,
  summary: string,
  objectives: string[],
  weeklyReadings: string[],
  color: string
): Lesson => {
  const days = [
    "Sábado", "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"
  ];
  
  const dates = generateWeekDates(startDate);
  
  return {
    number,
    title,
    subtitle,
    memoryVerse,
    startDate,
    endDate,
    summary,
    objectives,
    weeklyReadings,
    color,
    days: days.map((day, index) => ({
      day,
      date: dates[index],
      rpsp: `DT ${10 + number + index}`,
      title: generateDayTitle(number, index, day, title),
      content: generateDayContent(number, index, day),
      summary: generateDaySummary(number, index, day),
      keyPoints: generateKeyPoints(number, index),
      practicalApplication: generatePracticalApplication(number, index),
      verses: generateDayVerses(number, index, memoryVerse),
      quiz: generateDayQuiz(number, index, memoryVerse),
      readingTime: 15 + Math.floor(Math.random() * 10),
      questions: [`Como aplicar este ensinamento em minha vida?`, `Que lições práticas posso extrair deste estudo?`]
    }))
  };
};

// Funções auxiliares
const generateDayTitle = (lessonNum: number, dayIndex: number, day: string, lessonTitle: string): string => {
  // Títulos específicos para cada lição e dia
  const lessonDayTitles: Record<number, Record<number, string>> = {
    1: {
      0: lessonTitle, // Sábado usa o título da lição
      1: "Um novo Moisés",
      2: "Atravesse! Tome! Divida! Sirva!",
      3: "Herdeiros das promessas",
      4: "Seja forte!",
      5: "Próspero e bem-sucedido",
      6: "Estudo adicional"
    },
    2: {
      0: lessonTitle,
      1: "Segunda chance",
      2: "Engano e misericórdia",
      3: "Fé em ação",
      4: "Proteção divina",
      5: "Testemunho de fé",
      6: "Estudo adicional"
    },
    3: {
      0: lessonTitle,
      1: "Atravessando o Jordão",
      2: "Doze pedras memoriais",
      3: "Circuncisão em Gilgal",
      4: "A Páscoa na terra prometida",
      5: "O fim do maná",
      6: "Estudo adicional"
    },
    4: {
      0: lessonTitle,
      1: "O Príncipe do exército do Senhor",
      2: "A queda de Jericó",
      3: "Guerra espiritual",
      4: "Vitória pela obediência",
      5: "Deus luta por nós",
      6: "Estudo adicional"
    },
    5: {
      0: lessonTitle,
      1: "O pecado de Acã",
      2: "Consequências do pecado",
      3: "Confissão e arrependimento",
      4: "Restauração e perdão",
      5: "Lições sobre integridade",
      6: "Estudo adicional"
    }
  };
  
  const lessonTitles = lessonDayTitles[lessonNum];
  if (lessonTitles) {
    const specificTitle = lessonTitles[dayIndex];
    return day === "Sábado" ? specificTitle : `${day} - ${specificTitle}`;
  }
  
  // Fallback para lições não definidas
  return day === "Sábado" ? lessonTitle : `${day} - ${lessonTitle}`;
};

const generateDayVerses = (lessonNum: number, dayIndex: number, memoryVerse: BiblicalVerse): BiblicalVerse[] => {
  const dayVerses = {
    0: [memoryVerse], // Sábado - verso para memorizar
    1: [ // Domingo - Um novo Moisés
      { reference: "Deuteronômio 18:15-22", text: "O Senhor, teu Deus, te despertará um profeta do meio de ti, de teus irmãos, como eu; a ele ouvireis...", version: "ARC" },
      { reference: "Josué 1:1-9", text: "E sucedeu, depois da morte de Moisés, servo do Senhor, que o Senhor falou a Josué...", version: "ARC" },
      { reference: "Êxodo 33:11", text: "E falava o Senhor a Moisés face a face, como qualquer fala com o seu amigo...", version: "ARC" },
      { reference: "Números 14:6", text: "E Josué, filho de Num, e Calebe, filho de Jefoné, dos que espiaram a terra, rasgaram as suas vestes.", version: "ARC" },
      { reference: "Números 14:30", text: "Não entrareis na terra pela qual levantei a minha mão que vos faria habitar nela, salvo Calebe, filho de Jefoné, e Josué, filho de Num.", version: "ARC" },
      { reference: "Números 14:38", text: "Mas Josué, filho de Num, e Calebe, filho de Jefoné, que eram dos homens que foram espiar a terra, ficaram com vida.", version: "ARC" },
      { reference: "Números 27:18", text: "Então, disse o Senhor a Moisés: Toma Josué, filho de Num, homem em quem há Espírito, e põe a tua mão sobre ele.", version: "ARC" },
      { reference: "Números 32:12", text: "Exceto Calebe, filho de Jefoné, o quenezeu, e Josué, filho de Num, porquanto perseveraram em seguir ao Senhor.", version: "ARC" },
      { reference: "Deuteronômio 1:38", text: "Josué, filho de Num, que está diante de ti, ele ali entrará; esforça-o, porque ele a fará herdar a Israel.", version: "ARC" },
      { reference: "Deuteronômio 31:23", text: "E deu ordem a Josué, filho de Num, e disse: Esforça-te e tem bom ânimo, porque tu introduzirás os filhos de Israel na terra que lhes jurei, e eu serei contigo.", version: "ARC" },
      { reference: "Deuteronômio 34:9", text: "E Josué, filho de Num, foi cheio do espírito de sabedoria, porquanto Moisés tinha posto sobre ele as suas mãos; assim, os filhos de Israel lhe deram ouvidos e fizeram como o Senhor ordenara a Moisés.", version: "ARC" }
    ],
    2: [ // Segunda - Atravesse! Tome! Divida! Sirva!
      { reference: "Josué 1", text: "E sucedeu, depois da morte de Moisés, servo do Senhor, que o Senhor falou a Josué, filho de Num, servidor de Moisés...", version: "ARC" },
      { reference: "Js 1:2-9", text: "Moisés, meu servo, é morto; levanta-te, pois, agora, passa este Jordão, tu e todo este povo, à terra que eu dou aos filhos de Israel...", version: "ARC" },
      { reference: "Js 1:10-11", text: "Então, deu ordem Josué aos príncipes do povo, dizendo: Passai pelo meio do arraial, e mandai ao povo...", version: "ARC" },
      { reference: "Js 1:12-15", text: "E falou Josué aos rubenitas, e aos gaditas, e à meia tribo de Manassés, dizendo: Lembrai-vos da palavra...", version: "ARC" },
      { reference: "Js 1:16-18", text: "Então, responderam a Josué, dizendo: Tudo quanto nos ordenaste faremos e onde quer que nos enviares iremos...", version: "ARC" },
      { reference: "Js 1:1-5:12", text: "Seção 'Atravessar': Desde o chamado de Josué até a circuncisão em Gilgal e a celebração da Páscoa na Terra Prometida...", version: "ARC" },
      { reference: "Js 5:13-12:24", text: "Seção 'Tomar': Desde o encontro com o Príncipe do exército do Senhor até a lista dos reis derrotados...", version: "ARC" },
      { reference: "Js 13:1-21:45", text: "Seção 'Dividir': A divisão da terra entre as tribos de Israel, incluindo a herança de cada tribo...", version: "ARC" },
      { reference: "Js 22:1-24:33", text: "Seção 'Servir': O retorno das tribos orientais, o discurso de despedida de Josué, a renovação da aliança...", version: "ARC" },
      { reference: "Apocalipse 14:12", text: "Aqui está a paciência dos santos; aqui estão os que guardam os mandamentos de Deus e a fé em Jesus.", version: "ARC" }
    ],
    3: [ // Terça - Herdeiros das promessas
      { reference: "Josué 1:2-6", text: "Moisés, meu servo, é morto; levanta-te, pois, agora, passa este Jordão, tu e todo este povo, à terra que eu dou aos filhos de Israel...", version: "ARC" },
      { reference: "Hebreus 6:17-18", text: "Por isso, querendo Deus mostrar mais abundantemente a imutabilidade do seu conselho aos herdeiros da promessa, se interpôs com juramento...", version: "ARC" }
    ],
    4: [ // Quarta - Seja forte!
      { reference: "Josué 1:6-9", text: "Esforça-te e tem bom ânimo, porque tu farás a este povo herdar a terra que jurei a seus pais lhes daria...", version: "ARC" },
      { reference: "Efésios 6:10-18", text: "No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder...", version: "ARC" }
    ],
    5: [ // Quinta - Próspero e bem-sucedido
      { reference: "Josué 1:7-9", text: "Tão-somente esforça-te e tem mui bom ânimo para teres o cuidado de fazer conforme toda a lei...", version: "ARC" },
      { reference: "Gênesis 39:2-3", text: "E o Senhor estava com José, e foi homem próspero; e estava na casa de seu senhor egípcio...", version: "ARC" },
      { reference: "1 Samuel 18:14", text: "E David se conduzia prudentemente em todos os seus caminhos, e o Senhor era com ele.", version: "ARC" },
      { reference: "Salmos 1:1-3", text: "Bem-aventurado o varão que não anda no conselho dos ímpios, nem se detém no caminho dos pecadores...", version: "ARC" },
      { reference: "Romanos 3:31", text: "Anulamos, pois, a lei pela fé? De maneira nenhuma! Antes, estabelecemos a lei.", version: "ARC" }
    ],
    6: [ // Sexta - Estudo adicional
      { reference: "João 3:16", text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", version: "ARC" },
      { reference: "Josué 1:5", text: "Ninguém se susterá diante de ti, todos os dias da tua vida; como fui com Moisés, assim serei contigo; não te deixarei nem te desampararei.", version: "ARC" }
    ]
  };
  
  return dayVerses[dayIndex as keyof typeof dayVerses] || [memoryVerse];
};

const generateWeekDates = (startDate: string): string[] => {
  // Gera datas da semana baseado na data de início
  const dates = [];
  const baseDate = new Date('2025-09-27'); // Data base para cálculo
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    dates.push(date.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long' 
    }).replace(' de ', ' de '));
  }
  return dates;
};

const generateDayContent = (lessonNum: number, dayIndex: number, day: string): string => {
  const contents = {
    0: `**VERSO PARA MEMORIZAR**
"Tão somente seja forte e muito corajoso para que você tenha o cuidado de fazer segundo toda a Lei que o Meu servo Moisés lhe ordenou. Não se desvie dela, nem para a direita nem para a esquerda, para que seja bem-sucedido por onde quer que você andar" (Js 1:7).

Benjamin Zander, diretor musical da Orquestra Filarmônica de Boston, ministrou uma aula de interpretação musical. Percebendo a ansiedade dos alunos diante da avaliação de seu desempenho, para deixá-los à vontade e incentivar seu máximo potencial, ele anunciou no primeiro dia que todos receberiam nota 10. Segundo ele, essa nota não era uma expectativa a ser cumprida, "mas uma possibilidade a ser vivida". O único requisito era que escrevessem uma carta nas duas primeiras semanas do semestre que tivesse a data do fim das aulas, explicando por que eles mereciam aquela nota.

O livro de Josué trata de novas possibilidades. Moisés, que liderou Israel por 40 anos, estava agora no passado. A saída do Egito e as peregrinações, marcadas por rebelião e teimosia, haviam terminado. Uma nova geração, disposta a obedecer a Deus, estava pronta para entrar na Terra Prometida, não como uma expectativa a ser cumprida, mas como uma possibilidade a ser vivida.

Durante esta semana vamos estudar a maneira como Deus abriu um novo capítulo na vida de Israel e como Ele pode fazer o mesmo em nossa própria vida.

**Leituras da semana**
Dt 18:15-22; Is 1; Hb 6:17, 18; Ef 6:10-18; Sl 1:1-3; Rm 3:31`,
    
    1: `**Um novo Moisés**

1. **Leia Deuteronômio 18:15-22; Josué 1:1-9. Por que é relevante que o livro de Josué comece lembrando uma promessa relacionada ao que aconteceria após a morte de Moisés?**

Embora Moisés tivesse morrido e Josué fosse o novo líder nomeado por Deus, existem paralelos entre eles. Ambos receberam a missão divina de conduzir Seu povo à terra que havia sido prometida aos seus antepassados. Como o Senhor disse a Josué: "Todo lugar em que puserem a planta do pé Eu darei a vocês, como prometi a Moisés" (Js 1:3). Josué terminaria o trabalho que havia sido originalmente dado a Moisés. Ele era, de fato, um novo Moisés.

2. **Leia Êxodo 33:11; Números 14:6, 30, 38; 27:18; 32:12; Deuteronômio 1:38; 31:23; 34:9. O que esses textos nos dizem sobre Josué?**

Nesse momento da história, a promessa de que Deus levantaria um profeta semelhante a Moisés (Dt 18:15) ainda era uma possibilidade, não uma realidade consumada. As palavras de abertura do livro de Josué lembram o leitor dessa promessa e, ao mesmo tempo, criam uma expectativa de seu cumprimento.

Embora tivesse morrido, Moisés ainda ocupa grande parte do primeiro capítulo. Seu nome é citado dez vezes, enquanto o de Josué apenas quatro. Moisés é chamado de "servo do Senhor", enquanto Josué é referido como o "auxiliar de Moisés" (Js 1:1). Levaria uma vida inteira de obediência e serviço fiel para que Josué recebesse o título de "servo do Senhor" (Js 24:29).

Mesmo que o primeiro capítulo de Josué apresente a transição entre dois grandes líderes de Israel, o personagem mais importante é o próprio Senhor, cujas palavras abrem o livro e cuja direção é o seu tema principal. Não há dúvidas sobre quem é o verdadeiro Líder de Israel.

**Ao longo da História, Deus tem chamado homens e mulheres para liderar Seu povo. Por que será que um líder é tão essencial?**`,
    
    2: `**Atravesse! Tome! Divida! Sirva!**

3. **Leia Josué 1. O que esse primeiro capítulo nos mostra sobre como o livro de Josué está dividido?**

O primeiro capítulo de Josué serve como uma introdução a todo o livro. Ele está dividido em quatro partes, que correspondem às quatro seções principais do livro: travessia (Js 1:2-9), conquista (Js 1:10-11), divisão da terra (Js 1:12-15) e serviço por meio da obediência à lei (Js 1:16-18).

Podemos ver o livro de Josué como uma série de iniciativas divinas. Em cada uma, Deus confia a Josué uma tarefa específica relacionada à conquista de Canaã, e cada tarefa, ao ser concluída com sucesso, é reconhecida mais tarde no livro.

No fim, as promessas de Deus a respeito da ocupação da Terra Prometida seriam cumpridas. A partir daí, a responsabilidade de manter a terra estava nas mãos dos israelitas e só poderia ser realizada pela fé verdadeira e pela obediência que dela resulta.

As iniciativas de Deus são expressas por três verbos: cruzar, tomar e dividir. Cada uma dessas iniciativas recebe a resposta adequada na obediência do povo, que deriva da iniciativa final: o serviço.

O livro de Josué possui quatro seções principais, e em cada uma delas um conceito específico é destacado pela presença de uma palavra hebraica:
(1) Atravessar (Js 1:1-5:12).
(2) Tomar (Js 5:13-12:24).
(3) Dividir (Js 13:1-21:45).
(4) Servir (Js 22:1-24:33).

A estrutura do livro transmite sua mensagem principal: as iniciativas de Deus não se realizam de forma imediata e automática e exigem a resposta fiel de Seu povo. Diante de tudo o que Deus fez por nós – incluindo tudo o que não podemos fazer por nós mesmos –, somos chamados a responder com obediência. Foi assim que sempre aconteceu em toda a história sagrada, e continua assim hoje. A descrição do povo de Deus no tempo do fim, em (Apocalipse 14:12), transmite a mesma ideia: a fé no que Deus fez por nós deve nos levar à obediência.

**Quais promessas da Palavra de Deus são mais preciosas para você? Que resposta elas exigem para se cumprirem em sua vida?**`,
    
    3: `**Herdeiros das promessas**

Em Josué 1:2, o Senhor disse ao líder de Israel que daria a terra a eles. Por outro lado, no verso seguinte, o texto hebraico indica que Deus já a havia concedido. Como entender isso?

A Terra Prometida era uma dádiva do Senhor, o seu verdadeiro dono. Em Josué 1:2 e 3, encontramos duas formas diferentes do verbo "dar", que revelam dois aspectos importantes da herança da Terra Prometida. O processo de dar a terra. Apenas os territórios da Transjordânia haviam sido ocupados por Israel. A maior parte da Terra Prometida ainda não havia sido tomada.

Em Josué 1:3, o verbo é usado em sua forma verbal perfeita, dando a entender de que Deus promete em Sua Palavra é tão seguro que podemos confiar nisso como se essa realidade já tivesse se cumprido.

O verso 3 utiliza palavras no plural: "puseram", "vocês". Portanto, a promessa não era dada apenas a Josué, mas a cada um do povo de Israel. É o fato de que Deus havia feito essa promessa a Moisés mostra que Deus estava dando continuidade às Suas ações.

Além disso, o termo hebraico kol (traduzido como "todo", "toda", "todos") é repetido várias vezes no primeiro capítulo, expressando a totalidade e integralidade essenciais para atingir o já propósito dado a Josué. O sucesso na conquista futura da Terra Prometida dependia de um alinhamento perfeito entre Deus, Josué e o povo de Israel.

4. **Leia Josué 1:4-6 e Hebreus 6:17, 18. Naquele momento, a Terra Prometida era apenas uma promessa, mas Deus a chamava de herança. O que significa ser herdeiro das promessas de Deus?**

As promessas de Deus não são algo mágico ou místico. Elas não têm, em si mesmas, o poder de garantir seu próprio cumprimento. A garantia de que elas se tornarão realidade está na presença de Deus, que diz: "Estarei com você" (Js 1:5). De fato, a presença do Senhor foi essencial para a sobrevivência de Israel. Sem ela, os israelitas seriam apenas mais uma nação dentre muitos – sem chamado, identificada em missão especial (Êx 33:12-16). A presença do Senhor era tudo de que Josué precisava para ser bem-sucedido.

Hoje a realidade continua sendo a mesma, e é por isso que Jesus nos faz a promessa de Mateus 28:20.`,
    
    4: `**Seja forte!**

5. **Leia Josué 1:7-9. Por que o Senhor repetiu duas vezes a Josué a necessidade de ser forte e corajoso?**

A tarefa diante de Josué envolvia desafios que pareciam insuperáveis. As muralhas das cidades de Canaã pareciam impenetráveis, e a população dessa terra estava preparada para a guerra. Por outro lado, os israelitas, simples nômades, não possuíam nem mesmo as máquinas de guerra mais primitivas para enfrentar as muralhas fortificadas. Os registros históricos nos mostram que nem mesmo o Egito, a maior potência da época, era capaz de dominar Canaã permanentemente.

No entanto, o chamado para que Josué fosse forte e corajoso não estava relacionado apenas às estratégias de guerra. Força e coragem eram necessárias para permanecer fiel à Torá e a seus requisitos específicos, que definiam a aliança de Israel com Yahweh, o Senhor.

6. **Leia Efésios 6:10-18. Mesmo sem participar de combates militares, como podemos aplicar as palavras de encorajamento dadas a Josué em nossas lutas espirituais diárias?**

Hoje, ao cumprir a missão que Cristo nos confiou, enfrentamos desafios semelhantes aos de Josué: precisamos travar uma guerra contra nossas próprias tendências pecaminosas e contra os poderes e as autoridades espirituais deste mundo de trevas. Assim como Josué, temos a garantia da presença de Cristo: "Eis que estou com vocês todos os dias até o fim dos tempos" (Mt 28:20). Assim como a presença do Senhor foi suficiente para afastar todos os medos de Josué, também deve ser suficiente para banir nossas dúvidas e ansiedades hoje.

Nosso desafio é conhecer o Senhor o suficiente para confiar Nele e nas promessas que Ele nos faz. E é por isso que, mais do que qualquer outra coisa, precisamos de um profundo relacionamento pessoal com Ele.

**A questão crucial para nós hoje é a mesma enfrentada por Josué: Como podemos permanecer fiéis ao que a Palavra de Deus diz mesmo quando isso é impopular ou inconveniente?**`,
    
    5: `**Próspero e bem-sucedido**

7. **Leia Josué 1:7-9; Gênesis 39:2-3; 1 Samuel 18:14 e Salmo 1:1-3. Com base nesses textos, o que significa prosperar e ser bem-sucedido?**

O termo hebraico tsalakh, "próspero" (ver Js 1:8), significa realizar de maneira satisfatória aquilo que foi planejado ou viver um estado de circunstâncias favoráveis.

O termo sakal, "bem-sucedido" (Js 1:7), também pode significar "ser prudente" ou "agir sabiamente". Ocorre frequentemente em Jó, Provérbios e Salmos, onde a noção de sucesso está intimamente ligada a agir com sabedoria, temendo a Deus e obedecendo à Sua Palavra.

Nessa perspectiva, o sucesso não é necessariamente definido como ter prosperidade material, embora não a exclua. O verdadeiro sucesso é viver em harmonia com os valores e princípios espirituais que estão na base do mundo criado por Deus e que são expressos em Sua lei.

De fato, confiar nas promessas de Deus, especialmente na salvação pela fé somente, e obedecer à Sua lei não se opõem um ao outro. Representam dois aspectos da vida cristã.

8. **Leia Romanos 3:31. O que esse texto diz sobre a relação entre lei e fé?**

Pensar que a fé na morte expiatória e sacrifical de Jesus em nosso favor se opõe à obediência à lei de Deus é uma ideia falsa e perigosa. Lei e graça sempre andam juntas. Apenas uma compreensão superficial do papel da lei pode levar à conclusão de que lei e graça são opostas.

Os escritores do AT tinham grande respeito pela lei e a consideravam uma fonte de prazer (Sl 1:2; 119:70, 77, 174). Quando entendemos a lei corretamente, temos uma compreensão mais profunda de nossa própria pecaminosidade (Rm 7:7) e necessidade da justiça de Cristo (Gl 3:24).

**Mesmo observando a lei de Deus pela graça, como sua experiência mostra a necessidade da justiça de Cristo que nos cobre?**`,
    
    6: `**Estudo adicional**

Leia, de Ellen G. White, Patriarcas e Profetas, p. 420, 421 ("A travessia do Jordão"); História da Redenção, p. 125 ("Entrando na Terra Prometida").

"Em Suas promessas e advertências, Jesus Se dirige a mim. Deus amou o mundo de tal maneira que deu Seu Filho unigênito, para que eu, crendo, não pereça, mas tenha a vida eterna (ver Jo 3:16). As experiências relatadas na Palavra de Deus devem ser minhas experiências. Orações e promessas, mandamentos e advertências pertencem a mim. [...] À medida que a fé assim recebe e assimila os princípios da verdade, eles se tornam parte do próprio ser e a força motriz da vida. A Palavra de Deus, recebida no coração, molda os pensamentos e entra no desenvolvimento do caráter" (Ellen G. White, O Desejo de Todas as Nações [CPB, 2021], p. 307, grifo do original).

"Não há um ponto que necessite ser enfatizado com mais diligência, repetido com mais frequência ou estabelecido com mais firmeza na mente de todos do que a impossibilidade de o ser humano caído merecer alguma coisa pelas próprias e melhores boas obras. A salvação é unicamente pela fé em Jesus Cristo" (Ellen G. White, Fé e Obras [CPB, 2024], p. 12).

**Perguntas para consideração**
1. Mesmo que as circunstâncias da vida e das experiências de Josué sejam diferentes das nossas, que princípios espirituais podemos aprender com sua vida? Por que, apesar disso, sempre devemos nos lembrar do contexto original ao tirar lições para nós?
2. Qual é a relação entre as promessas de Deus e nossa obediência a Ele? Por que é perigoso enfatizar demais uma e deixar de lado a outra? O que acontece quando enfatizamos tanto a lei que ignoramos a graça? E o que acontece quando enfatizamos tanto a graça que nos esquecemos da lei?
3. Com base nesta lição, como você definiria sucesso da perspectiva bíblica? Qual é o lugar da prosperidade na definição cristã de sucesso?
4. Imagine como Josué deve ter se sentido como sucessor de Moisés. Que promessa Deus lhe deu que certamente o sustentou em suas grandes responsabilidades? (Ver Js 1:5.)`
  };
  
  return contents[dayIndex as keyof typeof contents] || `Conteúdo do ${day} da lição ${lessonNum}. Este é um estudo profundo sobre os temas apresentados nesta semana, explorando as Escrituras e aplicações práticas para nossa vida cristã hoje.`;
};

const generateDaySummary = (lessonNum: number, dayIndex: number, day: string): string => {
  const summaries = {
    0: "Introdução ao livro de Josué como um livro sobre novas possibilidades. Deus abre um novo capítulo na vida de Israel após a morte de Moisés.",
    1: "Josué é apresentado como sucessor de Moisés, com paralelos importantes entre os dois líderes. Deus prepara Josué para liderar Israel na conquista da Terra Prometida.",
    2: "O livro de Josué está dividido em quatro seções principais: atravessar, tomar, dividir e servir. Cada seção representa uma iniciativa divina que requer resposta fiel do povo.",
    3: "A Terra Prometida é uma dádiva do Senhor. As promessas de Deus têm poder para garantir seu próprio cumprimento quando respondemos com fé.",
    4: "Deus ordena a Josué três vezes para ser forte e corajoso. A força vem da confiança nas promessas divinas e da presença constante do Senhor.",
    5: "O verdadeiro sucesso bíblico não é medido por riquezas, mas por viver em harmonia com os valores e princípios espirituais de Deus.",
    6: "Estudo adicional sobre os princípios aprendidos durante a semana, com foco na aplicação prática dos ensinamentos em nossa vida cristã."
  };
  
  return summaries[dayIndex as keyof typeof summaries] || `Resumo do ${day} da lição ${lessonNum}`;
};

const generateKeyPoints = (lessonNum: number, dayIndex: number): string[] => {
  const points = [
    ["Novas possibilidades em Deus", "Liderança divina", "Obediência à Palavra"],
    ["Sucessão de liderança", "Paralelos entre líderes", "Deus como verdadeiro Líder"],
    ["Estrutura do livro", "Iniciativas divinas", "Resposta humana necessária"],
    ["Terra como dádiva", "Promessas divinas", "Poder das promessas"],
    ["Força e coragem", "Confiança em Deus", "Presença divina"],
    ["Verdadeiro sucesso", "Sabedoria divina", "Valores espirituais"],
    ["Aplicação prática", "Princípios eternos", "Vida cristã"]
  ];
  
  return points[dayIndex] || ["Ponto principal 1", "Ponto principal 2", "Ponto principal 3"];
};

const generatePracticalApplication = (lessonNum: number, dayIndex: number): string => {
  const applications = {
    0: "Reflita sobre as 'novas possibilidades' que Deus pode estar abrindo em sua vida. Como você pode responder com fé e obediência?",
    1: "Considere como Deus tem preparado você para liderar ou servir em sua esfera de influência. Que qualidades de liderança você precisa desenvolver?",
    2: "Identifique as 'iniciativas divinas' em sua vida atual. Como você pode responder fielmente a cada uma delas?",
    3: "Medite nas promessas específicas que Deus fez a você. Como sua fé pode ativar o poder dessas promessas?",
    4: "Em que áreas de sua vida você precisa ser mais forte e corajoso? Como a presença de Deus pode fortalecer você?",
    5: "Reavalie sua definição de sucesso. Como você pode alinhar seus objetivos com os valores espirituais de Deus?",
    6: "Escolha um princípio estudado esta semana para aplicar concretamente em sua vida diária."
  };
  
  return applications[dayIndex as keyof typeof applications] || "Aplicação prática para sua vida cristã.";
};

const generateDayQuiz = (lessonNum: number, dayIndex: number, memoryVerse: BiblicalVerse): QuizQuestion[] => {
  const baseQuestions: QuizQuestion[] = [
    {
      id: dayIndex * 10 + 1,
      question: `Qual é o tema principal do estudo de ${["sábado", "domingo", "segunda", "terça", "quarta", "quinta", "sexta"][dayIndex]}?`,
      options: [
        "Guerras e conquistas",
        "Liderança e obediência", 
        "Leis e mandamentos",
        "Histórias do passado"
      ],
      correctAnswer: 1,
      explanation: "O tema central é sempre a liderança divina e nossa resposta de obediência.",
      verse: memoryVerse,
      difficulty: 'easy'
    },
    {
      id: dayIndex * 10 + 2,
      question: "Segundo o estudo, qual é a chave para o sucesso espiritual?",
      options: [
        "Força própria",
        "Conhecimento teológico",
        "Obediência à Palavra de Deus",
        "Experiência pessoal"
      ],
      correctAnswer: 2,
      explanation: "A obediência à Palavra de Deus é sempre apresentada como fundamental para o sucesso espiritual.",
      verse: memoryVerse,
      difficulty: 'medium'
    },
    {
      id: dayIndex * 10 + 3,
      question: "Como podemos aplicar os ensinamentos desta lição em nossa vida?",
      options: [
        "Apenas estudando mais",
        "Confiando nas promessas de Deus e obedecendo",
        "Seguindo tradições humanas",
        "Dependendo de nossa própria sabedoria"
      ],
      correctAnswer: 1,
      explanation: "A aplicação prática sempre envolve confiar nas promessas divinas e responder com obediência.",
      verse: memoryVerse,
      difficulty: 'hard'
    }
  ];
  
  return baseQuestions;
};

// Dados do 4º Trimestre de 2025 - Completo com 13 lições
const quarter4_2025: Quarter = {
  id: "2025-q4",
  number: 4,
  year: 2025,
  title: "4º Trimestre",
  bookTitle: "Lições de Fé no livro de Josué",
  description: "Um estudo profundo sobre as lições de fé, coragem e confiança em Deus encontradas na jornada de Josué e do povo de Israel.",
  author: "Escola Sabatina",
  coverImage: "/hero-josue.jpg",
  color: "#8B5A3C",
  gradient: "from-amber-600 to-orange-700",
  totalLessons: 13,
  lessons: [
    createCompleteLesson(
      1,
      "Receita para o sucesso",
      "Novas possibilidades em Deus",
      verses.joshua1_7,
      "2025-09-27",
      "2025-10-03",
      "O livro de Josué trata de novas possibilidades. Moisés, que liderou Israel por 40 anos, estava agora no passado. Uma nova era, disposta a obedecer a Deus, estava pronta para entrar na Terra Prometida.",
      [
        "Compreender o contexto histórico do livro de Josué",
        "Identificar os paralelos entre Moisés e Josué",
        "Reconhecer a importância da obediência à Palavra de Deus",
        "Aplicar os princípios de liderança espiritual"
      ],
      ["Dt 18:15-22", "Is 1", "Hb 6:17-18", "Ef 6:10-18", "Sl 1:1-3", "Rm 3:31"],
      "#8B5A3C"
    ),
    
    createCompleteLesson(
      2,
      "Surpreendidos pela graça",
      "A graça de Deus em ação",
      verses.hebrews11_31,
      "2025-10-04",
      "2025-10-10",
      "Através da história de Raabe e dos espias, descobrimos como a graça de Deus opera de maneiras surpreendentes, oferecendo segundas chances e novas oportunidades.",
      [
        "Entender o conceito bíblico de graça",
        "Reconhecer as segundas chances que Deus oferece",
        "Aplicar a graça em relacionamentos pessoais",
        "Valorizar a fé como resposta à graça"
      ],
      ["Js 2:1-14", "Hb 11:31", "Ex 12:39", "Ne 7:25", "Rm 5:2", "Ef 2:8"],
      "#2563EB"
    ),
    
    createCompleteLesson(
      3,
      "Memoriais da graça",
      "Lembrando as obras de Deus",
      verses.joshua4_23_24,
      "2025-10-11",
      "2025-10-17",
      "A travessia do Jordão e os memoriais estabelecidos ensinam sobre a importância de lembrar as obras poderosas de Deus em nossa vida.",
      [
        "Compreender o significado dos memoriais bíblicos",
        "Reconhecer a importância de lembrar as obras de Deus",
        "Estabelecer marcos espirituais pessoais",
        "Transmitir a fé às próximas gerações"
      ],
      ["Js 3-5", "Nm 14:41-44", "Lc 18:18-27", "1Co 11:24-25", "Hb 4:8-11"],
      "#059669"
    ),
    
    createCompleteLesson(
      4,
      "O conflito por trás de todos os conflitos",
      "A guerra espiritual",
      {
        reference: "Josué 10:14",
        text: "Não houve dia semelhante a este, nem antes nem depois dele, tendo o Senhor, assim, atendido à voz de um homem; porque o Senhor lutava por Israel.",
        version: "NAA"
      },
      "2025-10-18",
      "2025-10-24",
      "Por trás dos conflitos físicos descritos em Josué, há uma batalha espiritual maior entre o bem e o mal, entre Deus e Satanás.",
      [
        "Identificar a dimensão espiritual dos conflitos",
        "Compreender a guerra entre Cristo e Satanás",
        "Aplicar princípios de guerra espiritual",
        "Confiar na vitória de Deus"
      ],
      ["Js 5:13-15", "Is 37:16", "Ap 12:7-9", "Dt 32:17", "Ex 14:13-14"],
      "#DC2626"
    ),
    
    createCompleteLesson(
      5,
      "Acã: O perigo do pecado oculto",
      "Consequências da desobediência",
      {
        reference: "Josué 7:21",
        text: "Quando vi entre os despojos uma bela capa babilônica, duzentos siclos de prata e uma barra de ouro do peso de cinquenta siclos, cobicei essas coisas e as tomei. Estão escondidas na terra, no meio da minha tenda, e a prata está debaixo da capa.",
        version: "NAA"
      },
      "2025-10-25",
      "2025-10-31",
      "A história de Acã revela como o pecado oculto pode afetar não apenas o indivíduo, mas toda a comunidade de fé.",
      [
        "Reconhecer o perigo do pecado oculto",
        "Compreender as consequências comunitárias do pecado",
        "Praticar a confissão e o arrependimento",
        "Manter a integridade espiritual"
      ],
      ["Js 7", "1Co 10:12", "Gl 6:1", "Tg 5:16", "1Jo 1:9"],
      "#7C2D12"
    ),
    
    createCompleteLesson(
      6,
      "Vitória através da derrota",
      "Lições de Ai",
      {
        reference: "Josué 8:1",
        text: "Então, disse o Senhor a Josué: 'Não temas, nem te desanimes! Toma contigo toda a gente de guerra, levanta-te e sobe a Ai. Vê que entreguei na tua mão o rei de Ai, o seu povo, a sua cidade e a sua terra.'",
        version: "NAA"
      },
      "2025-11-01",
      "2025-11-07",
      "Após a derrota inicial em Ai, Deus ensina Israel que a vitória vem através do arrependimento e da obediência renovada.",
      [
        "Aprender com os fracassos",
        "Buscar a restauração após a queda",
        "Confiar nas promessas de Deus",
        "Perseverar na fé"
      ],
      ["Js 8", "Pv 24:16", "Mq 7:8", "Rm 8:28", "Fp 3:13-14"],
      "#B45309"
    ),
    
    createCompleteLesson(
      7,
      "Os gibeonitas: Engano e misericórdia",
      "Quando somos enganados",
      {
        reference: "Josué 9:14",
        text: "Os homens de Israel provaram das suas provisões e não consultaram o Senhor.",
        version: "NAA"
      },
      "2025-11-08",
      "2025-11-14",
      "A história dos gibeonitas ensina sobre as consequências de não buscar a orientação de Deus e como Ele pode usar até mesmo nossos erros.",
      [
        "Reconhecer a importância de buscar orientação divina",
        "Lidar com as consequências de decisões precipitadas",
        "Praticar a misericórdia mesmo quando somos enganados",
        "Honrar compromissos assumidos"
      ],
      ["Js 9", "Pv 3:5-6", "Pv 14:15", "Ec 5:4-5", "Mt 5:37"],
      "#0891B2"
    ),
    
    createCompleteLesson(
      8,
      "O dia mais longo",
      "Quando Deus intervém",
      {
        reference: "Josué 10:12-13",
        text: "Então, Josué falou ao Senhor, no dia em que o Senhor entregou os amorreus nas mãos dos filhos de Israel, e disse na presença de Israel: 'Sol, detém-te em Gibeom, e tu, lua, no vale de Aijalom.' E o sol se deteve, e a lua parou até que o povo se vingou dos seus inimigos.",
        version: "NAA"
      },
      "2025-11-15",
      "2025-11-21",
      "O milagre do sol que se deteve demonstra o poder ilimitado de Deus e Sua disposição de intervir em favor de Seu povo.",
      [
        "Reconhecer o poder ilimitado de Deus",
        "Confiar na intervenção divina",
        "Orar com ousadia e fé",
        "Testemunhar dos milagres de Deus"
      ],
      ["Js 10", "Hc 3:11", "Is 38:8", "Mt 17:20", "Mc 11:22-24"],
      "#7C3AED"
    ),
    
    createCompleteLesson(
      9,
      "Cidades de refúgio",
      "Justiça e misericórdia",
      {
        reference: "Josué 20:3",
        text: "Para que fuja para lá o homicida que matar alguém por erro e não intencionalmente; e elas vos servirão de refúgio contra o vingador do sangue.",
        version: "NAA"
      },
      "2025-11-22",
      "2025-11-28",
      "As cidades de refúgio representam o equilíbrio perfeito entre justiça e misericórdia no plano de Deus.",
      [
        "Compreender o conceito de justiça divina",
        "Reconhecer a misericórdia de Deus",
        "Ser um refúgio para outros",
        "Buscar proteção em Cristo"
      ],
      ["Js 20", "Nm 35:9-15", "Dt 19:1-13", "Hb 6:18", "1Jo 2:1"],
      "#DC2626"
    ),
    
    createCompleteLesson(
      10,
      "Herança e responsabilidade",
      "Dividindo a terra",
      {
        reference: "Josué 13:1",
        text: "Sendo Josué já velho, entrado em dias, disse-lhe o Senhor: 'Já estás velho, entrado em dias, e ainda muitíssima terra ficou para possuir.'",
        version: "NAA"
      },
      "2025-11-29",
      "2025-12-05",
      "A divisão da Terra Prometida ensina sobre herança espiritual e nossa responsabilidade de possuir as promessas de Deus.",
      [
        "Compreender nossa herança em Cristo",
        "Assumir responsabilidades espirituais",
        "Possuir as promessas de Deus",
        "Ser fiel na administração dos dons"
      ],
      ["Js 13-19", "Ef 1:3", "2Pe 1:3-4", "1Co 4:2", "Mt 25:14-30"],
      "#059669"
    ),
    
    createCompleteLesson(
      11,
      "Adoração: O coração da vida",
      "Prioridades espirituais",
      {
        reference: "Josué 22:5",
        text: "Tão somente tende muito cuidado de cumprir o mandamento e a Lei que Moisés, servo do Senhor, vos ordenou: que ameis o Senhor, vosso Deus, e andeis em todos os seus caminhos, e guardeis os seus mandamentos, e vos achegueis a ele, e o sirvais de todo o vosso coração e de toda a vossa alma.",
        version: "NAA"
      },
      "2025-12-06",
      "2025-12-12",
      "A verdadeira adoração deve ser o centro de nossa vida, influenciando todas as nossas decisões e relacionamentos.",
      [
        "Priorizar a adoração a Deus",
        "Integrar fé e vida prática",
        "Manter comunhão constante com Deus",
        "Servir com todo o coração"
      ],
      ["Js 22", "Dt 6:5", "Mt 22:37", "Rm 12:1", "Jo 4:23-24"],
      "#7C2D12"
    ),
    
    createCompleteLesson(
      12,
      "Liderança que perdura",
      "O legado de Josué",
      {
        reference: "Josué 23:14",
        text: "Eis que hoje vou pelo caminho de toda a terra; sabeis, de todo o vosso coração e de toda a vossa alma, que nem uma só palavra falhou de todas as boas palavras que o Senhor, vosso Deus, vos disse; todas se cumpriram, nem uma só delas falhou.",
        version: "NAA"
      },
      "2025-12-13",
      "2025-12-19",
      "O discurso de despedida de Josué revela os princípios de uma liderança que deixa um legado duradouro.",
      [
        "Desenvolver liderança servidora",
        "Deixar um legado positivo",
        "Transmitir valores às próximas gerações",
        "Confiar na fidelidade de Deus"
      ],
      ["Js 23", "2Tm 4:7", "Pv 13:22", "Sl 78:4", "1Co 11:1"],
      "#B45309"
    ),
    
    createCompleteLesson(
      13,
      "Escolhendo a quem servir",
      "Decisão final",
      {
        reference: "Josué 24:15",
        text: "Porém, se vos parece mal servir ao Senhor, escolhei, hoje, a quem sirvais: se aos deuses a quem serviram vossos pais que estavam dalém do Eufrates ou aos deuses dos amorreus em cuja terra habitais. Eu e a minha casa serviremos ao Senhor.",
        version: "NAA"
      },
      "2025-12-20",
      "2025-12-26",
      "O último desafio de Josué ao povo é também nosso: escolher conscientemente a quem servir, renovando nosso compromisso com Deus.",
      [
        "Fazer escolhas conscientes de fé",
        "Renovar compromissos espirituais",
        "Influenciar positivamente a família",
        "Perseverar na fidelidade a Deus"
      ],
      ["Js 24", "1Rs 18:21", "Mt 6:24", "Ap 3:15-16", "Dt 30:19"],
      "#8B5A3C"
    )
  ]
};

// Dados de exemplo para outros trimestres
const quarter1_2025: Quarter = {
  id: "2025-q1",
  number: 1,
  year: 2025,
  title: "1º Trimestre",
  bookTitle: "Lições sobre Amor e Relacionamentos",
  description: "Estudos sobre como viver relacionamentos saudáveis baseados nos princípios bíblicos.",
  lessons: []
};

const quarter2_2025: Quarter = {
  id: "2025-q2", 
  number: 2,
  year: 2025,
  title: "2º Trimestre",
  bookTitle: "Profetas Menores",
  description: "Um estudo dos livros dos profetas menores e suas mensagens para hoje.",
  lessons: []
};

const quarter3_2025: Quarter = {
  id: "2025-q3",
  number: 3,
  year: 2025,
  title: "3º Trimestre", 
  bookTitle: "Cartas de Paulo",
  description: "Explorando as cartas paulinas e seus ensinamentos práticos para a vida cristã.",
  lessons: []
};

// Dados do ano 2025
const year2025: YearData = {
  year: 2025,
  quarters: [quarter1_2025, quarter2_2025, quarter3_2025, quarter4_2025]
};

// Dados de exemplo para 2024
const year2024: YearData = {
  year: 2024,
  quarters: [
    {
      id: "2024-q1",
      number: 1,
      year: 2024,
      title: "1º Trimestre",
      bookTitle: "Salmos",
      description: "Estudos nos Salmos: Orações, louvores e lamentações do povo de Deus.",
      lessons: []
    },
    {
      id: "2024-q2",
      number: 2, 
      year: 2024,
      title: "2º Trimestre",
      bookTitle: "Evangelho de João",
      description: "Jesus como revelado no Evangelho de João.",
      lessons: []
    },
    {
      id: "2024-q3",
      number: 3,
      year: 2024,
      title: "3º Trimestre",
      bookTitle: "Atos dos Apóstolos",
      description: "A igreja primitiva e a expansão do evangelho.",
      lessons: []
    },
    {
      id: "2024-q4",
      number: 4,
      year: 2024,
      title: "4º Trimestre",
      bookTitle: "Apocalipse",
      description: "Profecias e esperança no livro do Apocalipse.",
      lessons: []
    }
  ]
};

export const yearsData: YearData[] = [year2024, year2025];

export const getCurrentQuarter = (): Quarter | null => {
  // Por padrão, retorna o 4º trimestre de 2025 (dados completos)
  return quarter4_2025;
};

export const getQuarterById = (id: string): Quarter | null => {
  for (const year of yearsData) {
    const quarter = year.quarters.find(q => q.id === id);
    if (quarter) return quarter;
  }
  return null;
};

export const getYearData = (year: number): YearData | null => {
  return yearsData.find(y => y.year === year) || null;
};