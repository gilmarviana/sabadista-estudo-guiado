import { Button } from "@/components/ui/button";
import { BiblicalVerse } from "@/types/lesson";

interface BiblicalReferenceProps {
  reference: string;
  onVerseClick: (verse: BiblicalVerse) => void;
  className?: string;
}

// Função para expandir referências em versículos individuais
const expandReference = (reference: string): BiblicalVerse => {
  // Para referências como "Js 1:12-15", criar texto combinado com versículos individuais
  if (reference.includes('-') && reference.includes(':')) {
    const match = reference.match(/(\w+)\s+(\d+):(\d+)-(\d+)/);
    if (match) {
      const [, book, chapter, startVerse, endVerse] = match;
      const verses = [];
      const verseTexts = [];
      
      for (let i = parseInt(startVerse); i <= parseInt(endVerse); i++) {
        const verseRef = `${book} ${chapter}:${i}`;
        verses.push(verseRef);
        
        // Tentar encontrar o texto individual do versículo
        const individualVerse = biblicalTexts[verseRef] || biblicalTexts[`Js ${chapter}:${i}`];
        if (individualVerse) {
          verseTexts.push(`**${verseRef}:** ${individualVerse.text}`);
        }
      }
      
      let combinedText = `Versículos ${startVerse} a ${endVerse} do capítulo ${chapter} de ${book}.\n\n`;
      
      if (verseTexts.length > 0) {
        combinedText += verseTexts.join('\n\n');
      } else {
        combinedText += `Referências individuais: ${verses.join(', ')}.\n\nConsulte sua Bíblia para o texto completo destes versículos.`;
      }
      
      return {
        reference,
        text: combinedText,
        version: "ARC"
      };
    }
  }
  
  // Para referências como "Js 1:1-5:12", criar texto de seção
  if (reference.includes('-') && reference.includes(':') && reference.split('-').length === 2) {
    const parts = reference.split('-');
    if (parts.length === 2 && parts[1].includes(':')) {
      return {
        reference,
        text: `Seção bíblica de ${parts[0]} até ${parts[1]}. Esta é uma seção extensa que abrange múltiplos capítulos. Consulte sua Bíblia para o texto completo.`,
        version: "ARC"
      };
    }
  }
  
  return {
    reference,
    text: "Texto não disponível. Por favor, consulte sua Bíblia.",
    version: "ARC"
  };
};

// Dados dos versículos bíblicos (expandir conforme necessário)
const biblicalTexts: Record<string, BiblicalVerse> = {
  "Deuteronômio 18:15-22": {
    reference: "Deuteronômio 18:15-22",
    text: "O Senhor, teu Deus, te despertará um profeta do meio de ti, de teus irmãos, como eu; a ele ouvireis; conforme a tudo o que pediste ao Senhor, teu Deus, em Horebe, no dia da assembleia, dizendo: Não ouvirei mais a voz do Senhor, meu Deus, nem mais verei este grande fogo, para que não morra. Então, o Senhor me disse: Bem falaram naquilo que disseram. Eis lhes suscitarei um profeta do meio de seus irmãos, como tu, e porei as minhas palavras na sua boca, e ele lhes falará tudo o que eu lhe ordenar. E será que qualquer que não ouvir as minhas palavras que ele falar em meu nome, eu o requererei dele. Porém o profeta que presumir soberbamente de falar alguma palavra em meu nome, que eu lhe não tenho mandado falar, ou o que falar em nome de outros deuses, o tal profeta morrerá. E, se disseres no teu coração: Como conheceremos a palavra que o Senhor não falou? Quando o tal profeta falar em nome do Senhor, e tal palavra se não cumprir, nem suceder assim, esta é palavra que o Senhor não falou; com soberba a falou o tal profeta; não tenhas temor dele.",
    version: "ARC"
  },
  "Josué 1:1-9": {
    reference: "Josué 1:1-9",
    text: "E sucedeu, depois da morte de Moisés, servo do Senhor, que o Senhor falou a Josué, filho de Num, servidor de Moisés, dizendo: Moisés, meu servo, é morto; levanta-te, pois, agora, passa este Jordão, tu e todo este povo, à terra que eu dou aos filhos de Israel. Todo lugar que pisar a planta do vosso pé, vo-lo tenho dado, como eu disse a Moisés. Desde o deserto e desde este Líbano, até ao grande rio, o rio Eufrates, toda a terra dos heteus e até ao grande mar para o pôr do sol serão os vossos termos. Ninguém se susterá diante de ti, todos os dias da tua vida; como fui com Moisés, assim serei contigo; não te deixarei nem te desampararei. Esforça-te e tem bom ânimo, porque tu farás a este povo herdar a terra que jurei a seus pais lhes daria. Tão-somente esforça-te e tem mui bom ânimo para teres o cuidado de fazer conforme toda a lei que meu servo Moisés te ordenou; dela não te desvies, nem para a direita nem para a esquerda, para que prudentemente te conduzas por onde quer que fores. Não se aparte da tua boca o livro desta Lei; antes, medita nele de dia e de noite, para que tenhas cuidado de fazer conforme tudo quanto nele está escrito; porque, então, farás prosperar o teu caminho e, então, prudentemente te conduzirás. Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que fores.",
    version: "ARC"
  },
  "Êxodo 33:11": {
    reference: "Êxodo 33:11",
    text: "E falava o Senhor a Moisés face a face, como qualquer fala com o seu amigo; depois, tornava-se ao arraial; porém o seu servidor, o jovem Josué, filho de Num, nunca se apartava do meio da tenda.",
    version: "ARC"
  },
  "Números 14:6": {
    reference: "Números 14:6",
    text: "E Josué, filho de Num, e Calebe, filho de Jefoné, dos que espiaram a terra, rasgaram as suas vestes.",
    version: "ARC"
  },
  "Números 14:30": {
    reference: "Números 14:30",
    text: "Não entrareis na terra pela qual levantei a minha mão que vos faria habitar nela, salvo Calebe, filho de Jefoné, e Josué, filho de Num.",
    version: "ARC"
  },
  "Números 14:38": {
    reference: "Números 14:38",
    text: "Mas Josué, filho de Num, e Calebe, filho de Jefoné, que eram dos homens que foram espiar a terra, ficaram com vida.",
    version: "ARC"
  },
  "Números 27:18": {
    reference: "Números 27:18",
    text: "Então, disse o Senhor a Moisés: Toma Josué, filho de Num, homem em quem há Espírito, e põe a tua mão sobre ele.",
    version: "ARC"
  },
  "Números 32:12": {
    reference: "Números 32:12",
    text: "Exceto Calebe, filho de Jefoné, o quenezeu, e Josué, filho de Num, porquanto perseveraram em seguir ao Senhor.",
    version: "ARC"
  },
  "Deuteronômio 1:38": {
    reference: "Deuteronômio 1:38",
    text: "Josué, filho de Num, que está diante de ti, ele ali entrará; esforça-o, porque ele a fará herdar a Israel.",
    version: "ARC"
  },
  "Deuteronômio 31:23": {
    reference: "Deuteronômio 31:23",
    text: "E deu ordem a Josué, filho de Num, e disse: Esforça-te e tem bom ânimo, porque tu introduzirás os filhos de Israel na terra que lhes jurei, e eu serei contigo.",
    version: "ARC"
  },
  "Deuteronômio 34:9": {
    reference: "Deuteronômio 34:9",
    text: "E Josué, filho de Num, foi cheio do espírito de sabedoria, porquanto Moisés tinha posto sobre ele as suas mãos; assim, os filhos de Israel lhe deram ouvidos e fizeram como o Senhor ordenara a Moisés.",
    version: "ARC"
  },
  "Josué 1": {
    reference: "Josué 1",
    text: "E sucedeu, depois da morte de Moisés, servo do Senhor, que o Senhor falou a Josué, filho de Num, servidor de Moisés, dizendo: Moisés, meu servo, é morto; levanta-te, pois, agora, passa este Jordão, tu e todo este povo, à terra que eu dou aos filhos de Israel. Todo lugar que pisar a planta do vosso pé, vo-lo tenho dado, como eu disse a Moisés...",
    version: "ARC"
  },
  "Apocalipse 14:12": {
    reference: "Apocalipse 14:12",
    text: "Aqui está a paciência dos santos; aqui estão os que guardam os mandamentos de Deus e a fé em Jesus.",
    version: "ARC"
  },
  "Josué 1:4-6": {
    reference: "Josué 1:4-6",
    text: "Desde o deserto e desde este Líbano, até ao grande rio, o rio Eufrates, toda a terra dos heteus e até ao grande mar para o pôr do sol serão os vossos termos. Ninguém se susterá diante de ti, todos os dias da tua vida; como fui com Moisés, assim serei contigo; não te deixarei nem te desampararei. Esforça-te e tem bom ânimo, porque tu farás a este povo herdar a terra que jurei a seus pais lhes daria.",
    version: "ARC"
  },
  "Hebreus 6:17-18": {
    reference: "Hebreus 6:17-18",
    text: "Por isso, querendo Deus mostrar mais abundantemente a imutabilidade do seu conselho aos herdeiros da promessa, se interpôs com juramento, para que por duas coisas imutáveis, nas quais é impossível que Deus minta, tenhamos a firme consolação, nós, os que pomos o nosso refúgio em reter a esperança proposta.",
    version: "ARC"
  },
  "Josué 1:7-9": {
    reference: "Josué 1:7-9",
    text: "Tão-somente esforça-te e tem mui bom ânimo para teres o cuidado de fazer conforme toda a lei que meu servo Moisés te ordenou; dela não te desvies, nem para a direita nem para a esquerda, para que prudentemente te conduzas por onde quer que fores. Não se aparte da tua boca o livro desta Lei; antes, medita nele de dia e de noite, para que tenhas cuidado de fazer conforme tudo quanto nele está escrito; porque, então, farás prosperar o teu caminho e, então, prudentemente te conduzirás. Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que fores.",
    version: "ARC"
  },
  "Efésios 6:10-18": {
    reference: "Efésios 6:10-18",
    text: "No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder. Revesti-vos de toda a armadura de Deus, para que possais estar firmes contra as astutas ciladas do diabo. Porque não temos que lutar contra carne e sangue, mas, sim, contra os principados, contra as potestades, contra os príncipes das trevas deste século, contra as hostes espirituais da maldade, nos lugares celestiais. Portanto, tomai toda a armadura de Deus, para que possais resistir no dia mau e, havendo feito tudo, ficar firmes. Estai, pois, firmes, tendo cingidos os vossos lombos com a verdade, e vestida a couraça da justiça, e calçados os pés na preparação do evangelho da paz; tomando sobretudo o escudo da fé, com o qual podereis apagar todos os dardos inflamados do maligno. Tomai também o capacete da salvação e a espada do Espírito, que é a palavra de Deus; orando em todo tempo com toda oração e súplica no Espírito e vigiando nisso com toda perseverança e súplica por todos os santos.",
    version: "ARC"
  },
  "Gênesis 39:2-3": {
    reference: "Gênesis 39:2-3",
    text: "E o Senhor estava com José, e foi homem próspero; e estava na casa de seu senhor egípcio. Vendo, pois, o seu senhor que o Senhor estava com ele e que tudo o que fazia o Senhor prosperava na sua mão.",
    version: "ARC"
  },
  "1 Samuel 18:14": {
    reference: "1 Samuel 18:14",
    text: "E Davi se conduzia prudentemente em todos os seus caminhos, e o Senhor era com ele.",
    version: "ARC"
  },
  "Salmo 1:1-3": {
    reference: "Salmo 1:1-3",
    text: "Bem-aventurado o varão que não anda no conselho dos ímpios, nem se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores. Antes, tem o seu prazer na lei do Senhor, e na sua lei medita de dia e de noite. Pois será como a árvore plantada junto a ribeiros de águas, a qual dá o seu fruto na estação própria, e cujas folhas não caem; e tudo quanto fizer prosperará.",
    version: "ARC"
  },
  "Romanos 3:31": {
    reference: "Romanos 3:31",
    text: "Anulamos, pois, a lei pela fé? De maneira nenhuma! Antes, estabelecemos a lei.",
    version: "ARC"
  },
  "Js 1:2-9": {
    reference: "Josué 1:2-9",
    text: "Moisés, meu servo, é morto; levanta-te, pois, agora, passa este Jordão, tu e todo este povo, à terra que eu dou aos filhos de Israel. Todo lugar que pisar a planta do vosso pé, vo-lo tenho dado, como eu disse a Moisés. Desde o deserto e desde este Líbano, até ao grande rio, o rio Eufrates, toda a terra dos heteus e até ao grande mar para o pôr do sol serão os vossos termos. Ninguém se susterá diante de ti, todos os dias da tua vida; como fui com Moisés, assim serei contigo; não te deixarei nem te desampararei. Esforça-te e tem bom ânimo, porque tu farás a este povo herdar a terra que jurei a seus pais lhes daria. Tão-somente esforça-te e tem mui bom ânimo para teres o cuidado de fazer conforme toda a lei que meu servo Moisés te ordenou; dela não te desvies, nem para a direita nem para a esquerda, para que prudentemente te conduzas por onde quer que fores. Não se aparte da tua boca o livro desta Lei; antes, medita nele de dia e de noite, para que tenhas cuidado de fazer conforme tudo quanto nele está escrito; porque, então, farás prosperar o teu caminho e, então, prudentemente te conduzirás. Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que fores.",
    version: "ARC"
  },
  "Js 1:10-11": {
    reference: "Josué 1:10-11",
    text: "Então, deu ordem Josué aos príncipes do povo, dizendo: Passai pelo meio do arraial, e mandai ao povo, dizendo: Preparai-vos comida, porque, dentro de três dias, passareis este Jordão, para que entreis a possuir a terra que vos dá o Senhor, vosso Deus, para a possuirdes.",
    version: "ARC"
  },
  "Js 1:12-15": {
    reference: "Josué 1:12-15",
    text: "E falou Josué aos rubenitas, e aos gaditas, e à meia tribo de Manassés, dizendo: Lembrai-vos da palavra que vos mandou Moisés, o servo do Senhor, dizendo: O Senhor, vosso Deus, vos dá descanso e vos dará esta terra. Vossas mulheres, vossos meninos e vosso gado ficarão na terra que Moisés vos deu desta banda do Jordão; porém vós passareis armados na frente de vossos irmãos, todos os valentes e valorosos, e os ajudareis, até que o Senhor dê descanso a vossos irmãos, como a vós, e eles também possuam a terra que o Senhor, vosso Deus, lhes dá; então, tornareis à terra da vossa herança e a possuireis, a que vos deu Moisés, o servo do Senhor, desta banda do Jordão, para o nascente do sol.",
    version: "ARC"
  },
  "Js 1:16-18": {
    reference: "Josué 1:16-18",
    text: "Então, responderam a Josué, dizendo: Tudo quanto nos ordenaste faremos e onde quer que nos enviares iremos. Como em tudo obedecemos a Moisés, assim te obedeceremos a ti; tão-somente que o Senhor, teu Deus, seja contigo, como foi com Moisés. Todo homem que for rebelde à tua boca e não obedecer às tuas palavras em tudo quanto lhe ordenares será morto; tão-somente esforça-te e tem bom ânimo.",
    version: "ARC"
  },
  "Js 1:1-5:12": {
    reference: "Josué 1:1 - 5:12",
    text: "Seção 'Atravessar': Desde o chamado de Josué até a circuncisão em Gilgal e a celebração da Páscoa na Terra Prometida. Esta seção abrange a preparação para entrar na terra, a travessia milagrosa do Jordão, e os primeiros atos de consagração do povo na terra prometida.",
    version: "ARC"
  },
  "Js 5:13-12:24": {
    reference: "Josué 5:13 - 12:24",
    text: "Seção 'Tomar': Desde o encontro com o Príncipe do exército do Senhor até a lista dos reis derrotados. Esta seção inclui a conquista de Jericó, Ai, e as campanhas do sul e norte de Canaã.",
    version: "ARC"
  },
  "Js 13:1-21:45": {
    reference: "Josué 13:1 - 21:45",
    text: "Seção 'Dividir': A divisão da terra entre as tribos de Israel, incluindo a herança de cada tribo, as cidades de refúgio, e as cidades dos levitas.",
    version: "ARC"
  },
  "Js 22:1-24:33": {
    reference: "Josué 22:1 - 24:33",
    text: "Seção 'Servir': O retorno das tribos orientais, o discurso de despedida de Josué, a renovação da aliança em Siquém, e a morte de Josué.",
    version: "ARC"
  },
  "Js 1:12": {
    reference: "Josué 1:12",
    text: "E falou Josué aos rubenitas, e aos gaditas, e à meia tribo de Manassés, dizendo:",
    version: "ARC"
  },
  "Js 1:13": {
    reference: "Josué 1:13",
    text: "Lembrai-vos da palavra que vos mandou Moisés, o servo do Senhor, dizendo: O Senhor, vosso Deus, vos dá descanso e vos dará esta terra.",
    version: "ARC"
  },
  "Js 1:14": {
    reference: "Josué 1:14",
    text: "Vossas mulheres, vossos meninos e vosso gado ficarão na terra que Moisés vos deu desta banda do Jordão; porém vós passareis armados na frente de vossos irmãos, todos os valentes e valorosos, e os ajudareis,",
    version: "ARC"
  },
  "Js 1:15": {
    reference: "Josué 1:15",
    text: "até que o Senhor dê descanso a vossos irmãos, como a vós, e eles também possuam a terra que o Senhor, vosso Deus, lhes dá; então, tornareis à terra da vossa herança e a possuireis, a que vos deu Moisés, o servo do Senhor, desta banda do Jordão, para o nascente do sol.",
    version: "ARC"
  },
  "Js 1:1": {
    reference: "Josué 1:1",
    text: "E sucedeu, depois da morte de Moisés, servo do Senhor, que o Senhor falou a Josué, filho de Num, servidor de Moisés, dizendo:",
    version: "ARC"
  },
  "Js 5:12": {
    reference: "Josué 5:12",
    text: "E cessou o maná no dia seguinte, depois que comeram do trigo da terra; e os filhos de Israel não tiveram mais maná; porém, no mesmo ano, comeram das novidades da terra de Canaã.",
    version: "ARC"
  }
};

export const BiblicalReference = ({ reference, onVerseClick, className = "" }: BiblicalReferenceProps) => {
  const handleClick = () => {
    const verse = biblicalTexts[reference];
    if (verse) {
      onVerseClick(verse);
    } else {
      // Usar expansão automática para referências não encontradas
      const expandedVerse = expandReference(reference);
      onVerseClick(expandedVerse);
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleClick}
      className={`p-0 h-auto font-medium text-blue-600 hover:text-blue-800 underline ${className}`}
    >
      {reference}
    </Button>
  );
};