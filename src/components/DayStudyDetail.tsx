import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Brain, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight,
  RotateCcw,
  Trophy,
  FileText,
  Target,
  Lightbulb,
  Clock
} from "lucide-react";
import { DayStudy, QuizQuestion, BiblicalVerse } from "@/types/lesson";
import { BiblicalVerseModal } from "./BiblicalVerseModal";

interface DayStudyDetailProps {
  dayStudy: DayStudy;
  onBack: () => void;
  onNextDay?: () => void;
  onPrevDay?: () => void;
  hasNextDay?: boolean;
  hasPrevDay?: boolean;
}

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  showResults: boolean;
  score: number;
}

export const DayStudyDetail = ({ 
  dayStudy, 
  onBack, 
  onNextDay, 
  onPrevDay,
  hasNextDay,
  hasPrevDay 
}: DayStudyDetailProps) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: new Array(dayStudy.quiz.length).fill(null),
    showResults: false,
    score: 0
  });
  
  const [selectedVerse, setSelectedVerse] = useState<BiblicalVerse | null>(null);
  const [isVerseModalOpen, setIsVerseModalOpen] = useState(false);

  const handleVerseClick = (verse: BiblicalVerse) => {
    setSelectedVerse(verse);
    setIsVerseModalOpen(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    setQuizState(prev => ({ ...prev, answers: newAnswers }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < dayStudy.quiz.length - 1) {
      setQuizState(prev => ({ 
        ...prev, 
        currentQuestion: prev.currentQuestion + 1 
      }));
    } else {
      // Calcular pontuação e mostrar resultados
      const score = quizState.answers.reduce((acc, answer, index) => {
        if (answer === dayStudy.quiz[index].correctAnswer) {
          return acc + 1;
        }
        return acc;
      }, 0);
      
      setQuizState(prev => ({ 
        ...prev, 
        showResults: true, 
        score 
      }));
    }
  };

  const handlePrevQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({ 
        ...prev, 
        currentQuestion: prev.currentQuestion - 1 
      }));
    }
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: new Array(dayStudy.quiz.length).fill(null),
      showResults: false,
      score: 0
    });
  };

  const currentQuestion = dayStudy.quiz[quizState.currentQuestion];
  const progress = ((quizState.currentQuestion + 1) / dayStudy.quiz.length) * 100;
  const scorePercentage = (quizState.score / dayStudy.quiz.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Modern Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 hover:bg-white/50 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a Lição
          </Button>
          
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {dayStudy.day} • {dayStudy.date}
                </Badge>
                <h1 className="text-4xl font-bold">{dayStudy.title}</h1>
                <div className="flex items-center justify-center space-x-6 text-white/90">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>RPSP: {dayStudy.rpsp}</span>
                  </div>
                  {dayStudy.readingTime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{dayStudy.readingTime} min</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation between days */}
        <div className="flex justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={onPrevDay}
            disabled={!hasPrevDay}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dia Anterior
          </Button>
          <Button 
            variant="outline" 
            onClick={onNextDay}
            disabled={!hasNextDay}
          >
            Próximo Dia
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Modern Tabs */}
        <Tabs defaultValue="study" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-white shadow-lg rounded-xl border-0">
            <TabsTrigger value="study" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
              <BookOpen className="w-4 h-4" />
              <span>Estudo</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg">
              <FileText className="w-4 h-4" />
              <span>Resumo</span>
            </TabsTrigger>
            <TabsTrigger value="application" className="flex items-center space-x-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg">
              <Lightbulb className="w-4 h-4" />
              <span>Aplicação</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-lg">
              <Brain className="w-4 h-4" />
              <span>Quiz</span>
            </TabsTrigger>
          </TabsList>

          {/* Study Content */}
          <TabsContent value="study">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <span>Estudo Completo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                    {dayStudy.content}
                  </div>
                </div>

                {dayStudy.verses && dayStudy.verses.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Textos Bíblicos de Referência
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {dayStudy.verses.map((verse, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleVerseClick(verse)}
                          className="bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800"
                        >
                          {verse.reference}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {dayStudy.questions && dayStudy.questions.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Perguntas para Reflexão
                    </h4>
                    <div className="space-y-4">
                      {dayStudy.questions.map((question, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-purple-100">
                          <p className="text-gray-700 font-medium">
                            <span className="text-purple-600 font-bold">{index + 1}.</span> {question}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Summary Content */}
          <TabsContent value="summary">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <FileText className="w-6 h-6 text-green-600" />
                  <span>Resumo e Pontos-Chave</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-900 mb-4">Resumo Principal</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {dayStudy.summary}
                  </p>
                </div>

                {dayStudy.keyPoints && dayStudy.keyPoints.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Pontos-Chave para Lembrar
                    </h4>
                    <div className="grid gap-3">
                      {dayStudy.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-blue-100">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 font-medium">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Content */}
          <TabsContent value="application">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                  <span>Aplicação Prática</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-4">Para Sua Vida Hoje</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {dayStudy.practicalApplication}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Content */}
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-spiritual-gold" />
                    <span>Quiz do Dia</span>
                  </div>
                  {!quizState.showResults && (
                    <Badge variant="outline">
                      {quizState.currentQuestion + 1} de {dayStudy.quiz.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!quizState.showResults ? (
                  <>
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progresso</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Current Question */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {currentQuestion.question}
                      </h3>
                      
                      {currentQuestion.verse && (
                        <Badge variant="secondary" className="mb-4">
                          {currentQuestion.verse}
                        </Badge>
                      )}

                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <Button
                            key={index}
                            variant={quizState.answers[quizState.currentQuestion] === index ? "default" : "outline"}
                            className="w-full text-left justify-start h-auto p-4"
                            onClick={() => handleAnswerSelect(index)}
                          >
                            <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                      <Button 
                        variant="outline" 
                        onClick={handlePrevQuestion}
                        disabled={quizState.currentQuestion === 0}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Anterior
                      </Button>
                      
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={quizState.answers[quizState.currentQuestion] === null}
                      >
                        {quizState.currentQuestion === dayStudy.quiz.length - 1 ? 'Finalizar' : 'Próxima'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </>
                ) : (
                  /* Quiz Results */
                  <div className="space-y-6">
                    <div className="text-center space-y-4">
                      <Trophy className="w-16 h-16 text-spiritual-gold mx-auto" />
                      <h3 className="text-2xl font-bold text-foreground">Quiz Concluído!</h3>
                      <div className="space-y-2">
                        <p className="text-lg">
                          Você acertou <span className="font-bold text-spiritual-gold">{quizState.score}</span> de {dayStudy.quiz.length} perguntas
                        </p>
                        <p className="text-muted-foreground">
                          Pontuação: {scorePercentage.toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    {/* Detailed Results */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Respostas Detalhadas:</h4>
                      {dayStudy.quiz.map((question, index) => {
                        const userAnswer = quizState.answers[index];
                        const isCorrect = userAnswer === question.correctAnswer;
                        
                        return (
                          <Card key={index} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                            <CardContent className="pt-4">
                              <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                  {isCorrect ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                  )}
                                  <div className="flex-1">
                                    <p className="font-medium text-foreground">{question.question}</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Sua resposta: {userAnswer !== null ? question.options[userAnswer] : 'Não respondida'}
                                    </p>
                                    {!isCorrect && (
                                      <p className="text-sm text-green-600 mt-1">
                                        Resposta correta: {question.options[question.correctAnswer]}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                  <p className="text-sm text-foreground">
                                    <span className="font-medium">Explicação:</span> {question.explanation}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    <div className="text-center">
                      <Button onClick={resetQuiz} variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Refazer Quiz
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Biblical Verse Modal */}
      <BiblicalVerseModal
        verse={selectedVerse}
        isOpen={isVerseModalOpen}
        onClose={() => setIsVerseModalOpen(false)}
      />
    </div>
  );
};