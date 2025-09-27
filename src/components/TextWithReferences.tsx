import { BiblicalReference } from "./BiblicalReference";
import { BiblicalVerse } from "@/types/lesson";

interface TextWithReferencesProps {
  text: string;
  onVerseClick: (verse: BiblicalVerse) => void;
}

export const TextWithReferences = ({ text, onVerseClick }: TextWithReferencesProps) => {
  // Regex para encontrar referências bíblicas (incluindo abreviações)
  const biblicalReferenceRegex = /\b(?:(?:[1-3]\s+)?(?:Gênesis|Gn|Êxodo|Êx|Levítico|Lv|Números|Nm|Deuteronômio|Dt|Josué|Js|Juízes|Jz|Rute|Rt|(?:[1-2]\s+)?Samuel|(?:[1-2]\s+)?Sm|(?:[1-2]\s+)?Reis|(?:[1-2]\s+)?Rs|(?:[1-2]\s+)?Crônicas|(?:[1-2]\s+)?Cr|Esdras|Ed|Neemias|Ne|Ester|Et|Jó|Jó|Salmos?|Sl|Provérbios|Pv|Eclesiastes|Ec|Cantares|Ct|Isaías|Is|Jeremias|Jr|Lamentações|Lm|Ezequiel|Ez|Daniel|Dn|Oseias|Os|Joel|Jl|Amós|Am|Obadias|Ob|Jonas|Jn|Miqueias|Mq|Naum|Na|Habacuque|Hc|Sofonias|Sf|Ageu|Ag|Zacarias|Zc|Malaquias|Ml|Mateus|Mt|Marcos|Mc|Lucas|Lc|João|Jo|Atos|At|Romanos|Rm|(?:[1-2]\s+)?Coríntios|(?:[1-2]\s+)?Co|Gálatas|Gl|Efésios|Ef|Filipenses|Fp|Colossenses|Cl|(?:[1-2]\s+)?Tessalonicenses|(?:[1-2]\s+)?Ts|(?:[1-2]\s+)?Timóteo|(?:[1-2]\s+)?Tm|Tito|Tt|Filemom|Fm|Hebreus|Hb|Tiago|Tg|(?:[1-2]\s+)?Pedro|(?:[1-2]\s+)?Pe|(?:[1-3]\s+)?João|(?:[1-3]\s+)?Jo|Judas|Jd|Apocalipse|Ap)\s+\d+(?::\d+)?(?:-\d+(?::\d+)?)?(?:,\s*\d+(?::\d+)?(?:-\d+(?::\d+)?)?)*(?:;\s*\d+(?::\d+)?(?:-\d+(?::\d+)?)?)*)\b/gi;

  const processText = (inputText: string) => {
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = biblicalReferenceRegex.exec(inputText)) !== null) {
      // Adiciona o texto antes da referência
      if (match.index > lastIndex) {
        parts.push(inputText.slice(lastIndex, match.index));
      }

      // Adiciona a referência como componente clicável
      parts.push(
        <BiblicalReference
          key={`${match.index}-${match[0]}`}
          reference={match[0]}
          onVerseClick={onVerseClick}
        />
      );

      lastIndex = match.index + match[0].length;
    }

    // Adiciona o texto restante
    if (lastIndex < inputText.length) {
      parts.push(inputText.slice(lastIndex));
    }

    return parts;
  };

  // Processa o texto linha por linha para manter quebras de linha
  const lines = text.split('\n');
  
  return (
    <div className="space-y-4">
      {lines.map((line, lineIndex) => {
        if (line.trim() === '') {
          return <br key={lineIndex} />;
        }

        const processedLine = processText(line);
        
        return (
          <p key={lineIndex} className="leading-relaxed">
            {processedLine.map((part, partIndex) => 
              typeof part === 'string' ? (
                <span key={partIndex}>{part}</span>
              ) : (
                part
              )
            )}
          </p>
        );
      })}
    </div>
  );
};