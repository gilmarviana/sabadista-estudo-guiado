import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Quote, 
  Target, 
  Clock,
  ChevronRight,
  ChevronLeft,
  Home,
  Share2,
  ExternalLink,
  Brain,
  FileText,
  Lightbulb,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Copy
} from "lucide-react";
import { yearsData, getQuarterById } from "@/data/quarters";
import { Quarter, Lesson, DayStudy, QuizQuestion, BiblicalVerse } from "@/types/lesson";
import { BiblicalVerseModal } from "@/components/BiblicalVerseModal";
import { LessonHeader } from "@/components/LessonHeader";
import { TextWithReferences } from "@/components/TextWithReferences";
import { useToast } from "@/hooks/use-toast";

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  showResults: boolean;
  score: number;
}

const StudyPage = () => {
  const { year, quarterId, lessonNumber, dayIndex } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayStudy | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<BiblicalVerse | null>(null);
  const [isVerseModalOpen, setIsVerseModalOpen] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    showResults: false,
    score: 0
  });

  // Initialize data based on URL parameters
  useEffect(() => {
    if (year) {
      const yearNum = parseInt(year);
      setSelectedYear(yearNum);
      
      if (quarterId) {
        const quarter = getQuarterById(quarterId);
        setSelectedQuarter(quarter);
        
        if (lessonNumber && quarter) {
          const lesson = quarter.lessons.find(l => l.number === parseInt(lessonNumber));
          setSelectedLesson(lesson || null);
          
          if (dayIndex && lesson) {
            const day = lesson.days[parseInt(dayIndex)];
            setSelectedDay(day || null);
            
            // Initialize quiz state
            if (day?.quiz) {
              setQuizState({
                currentQuestion: 0,
                answers: new Array(day.quiz.length).fill(null),
                showResults: false,
                score: 0
              });
            }
          }
        }
      }
    }
  }, [year, quarterId, lessonNumber, dayIndex]);

  // Navigation functions
  const navigateToYear = (yearNum: number) => {
    navigate(`/year/${yearNum}`);
  };

  const navigateToQuarter = (qId: string) => {
    navigate(`/year/${selectedYear}/quarter/${qId}`);
  };

  const navigateToLesson = (lNum: number) => {
    navigate(`/year/${selectedYear}/quarter/${quarterId}/lesson/${lNum}`);
  };

  const navigateToDay = (dIndex: number) => {
    navigate(`/year/${selectedYear}/quarter/${quarterId}/lesson/${lessonNumber}/day/${dIndex}`);
  };

  // Share functionality
  const shareCurrentPage = async () => {
    const url = window.location.href;
    const title = selectedDay ? 
      `${selectedDay.title} - Escola Sabatina` :
      selectedLesson ?
      `${selectedLesson.title} - Escola Sabatina` :
      selectedQuarter ?
      `${selectedQuarter.bookTitle} - Escola Sabatina` :
      'Escola Sabatina';

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para a área de transferência.",
        });
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    }
  };

  // Quiz functions
  const handleAnswerSelect = (answerIndex: number) => {
    if (!selectedDay) return;
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    setQuizState(prev => ({ ...prev, answers: newAnswers }));
  };

  const handleNextQuestion = () => {
    if (!selectedDay) return;
    if (quizState.currentQuestion < selectedDay.quiz.length - 1) {
      setQuizState(prev => ({ 
        ...prev, 
        currentQuestion: prev.currentQuestion + 1 
      }));
    } else {
      // Calculate score and show results
      const score = quizState.answers.reduce((acc, answer, index) => {
        if (answer === selectedDay.quiz[index].correctAnswer) {
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
    if (!selectedDay) return;
    setQuizState({
      currentQuestion: 0,
      answers: new Array(selectedDay.quiz.length).fill(null),
      showResults: false,
      score: 0
    });
  };

  const handleVerseClick = (verse: BiblicalVerse) => {
    setSelectedVerse(verse);
    setIsVerseModalOpen(true);
  };

  // Render different views based on URL parameters
  const renderBreadcrumb = () => (
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link to="/" className="hover:text-blue-600 transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      <ChevronRight className="w-3 h-3" />
      
      {selectedYear && (
        <>
          <Link 
            to={`/year/${selectedYear}`}
            className="hover:text-blue-600 transition-colors"
          >
            {selectedYear}
          </Link>
          <ChevronRight className="w-3 h-3" />
        </>
      )}
      
      {selectedQuarter && (
        <>
          <Link 
            to={`/year/${selectedYear}/quarter/${quarterId}`}
            className="hover:text-blue-600 transition-colors"
          >
            {selectedQuarter.number}º Trimestre
          </Link>
          <ChevronRight className="w-3 h-3" />
        </>
      )}
      
      {selectedLesson && (
        <>
          <Link 
            to={`/year/${selectedYear}/quarter/${quarterId}/lesson/${lessonNumber}`}
            className="hover:text-blue-600 transition-colors"
          >
            Lição {selectedLesson.number}
          </Link>
          {selectedDay && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-600 font-medium">{selectedDay.day}</span>
            </>
          )}
        </>
      )}
    </div>
  );

  const renderYearView = () => {
    const yearData = yearsData.find(y => y.year === selectedYear);
    if (!yearData) return <div>Ano não encontrado</div>;

    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Trimestres de {yearData.year}</h1>
          <p className="text-lg text-gray-600">
            Escolha um trimestre para acessar suas 13 lições de estudo bíblico.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {yearData.quarters.map((quarter) => (
            <Card 
              key={quarter.id}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 hover:scale-105 overflow-hidden"
              onClick={() => navigateToQuarter(quarter.id)}
            >
              <div className={`h-2 bg-gradient-to-r ${quarter.gradient}`}></div>
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <Badge 
                      className="bg-gray-100 text-gray-700 hover:bg-gray-100"
                      style={{ backgroundColor: `${quarter.color}20`, color: quarter.color }}
                    >
                      {quarter.number}º Trimestre
                    </Badge>
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {quarter.bookTitle}
                    </CardTitle>
                    {quarter.author && (
                      <p className="text-sm text-gray-500">por {quarter.author}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(`${window.location.origin}/year/${selectedYear}/quarter/${quarter.id}`);
                        toast({
                          title: "Link copiado!",
                          description: "Link do trimestre copiado para a área de transferência.",
                        });
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {quarter.description}
                </p>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{quarter.totalLessons}</div>
                    <div className="text-xs text-blue-700">Lições</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">91</div>
                    <div className="text-xs text-green-700">Dias</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">273</div>
                    <div className="text-xs text-purple-700">Quiz</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderQuarterView = () => {
    if (!selectedQuarter) return <div>Trimestre não encontrado</div>;

    return (
      <div className="space-y-8">
        {/* Quarter Header */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {selectedQuarter.number}º Trimestre {selectedQuarter.year}
                </Badge>
                <h1 className="text-4xl font-bold">{selectedQuarter.bookTitle}</h1>
                <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                  {selectedQuarter.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={shareCurrentPage}
                className="text-white hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Lições do Trimestre</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedQuarter.lessons.map((lesson) => (
              <Card 
                key={lesson.number}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 hover:scale-105 overflow-hidden"
                onClick={() => navigateToLesson(lesson.number)}
              >
                <div 
                  className="h-1 w-full"
                  style={{ backgroundColor: lesson.color || '#3B82F6' }}
                ></div>
                
                <CardHeader className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <Badge 
                      className="text-xs font-semibold px-3 py-1"
                      style={{ 
                        backgroundColor: `${lesson.color || '#3B82F6'}20`, 
                        color: lesson.color || '#3B82F6',
                        border: `1px solid ${lesson.color || '#3B82F6'}30`
                      }}
                    >
                      Lição {lesson.number}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(`${window.location.origin}/year/${selectedYear}/quarter/${quarterId}/lesson/${lesson.number}`);
                          toast({
                            title: "Link copiado!",
                            description: "Link da lição copiado para a área de transferência.",
                          });
                        }}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {lesson.title}
                    </CardTitle>
                    {lesson.subtitle && (
                      <p className="text-sm font-medium text-gray-600">{lesson.subtitle}</p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 p-6 pt-0">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {lesson.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>7 dias</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>~15 min/dia</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLessonView = () => {
    if (!selectedLesson) return <div>Lição não encontrada</div>;

    return (
      <div className="space-y-8">
        {/* Lesson Header */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  Lição {selectedLesson.number}
                </Badge>
                <h1 className="text-4xl font-bold">{selectedLesson.title}</h1>
                {selectedLesson.subtitle && (
                  <p className="text-xl text-white/90">{selectedLesson.subtitle}</p>
                )}
                <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                  {selectedLesson.summary}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={shareCurrentPage}
                className="text-white hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Memory Verse */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Quote className="w-5 h-5 text-blue-600" />
              <span>Verso para Memorizar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <blockquote className="text-lg italic text-gray-700 leading-relaxed mb-4">
                "{selectedLesson.memoryVerse.text}"
              </blockquote>
              <cite className="text-blue-600 font-semibold">
                — {selectedLesson.memoryVerse.reference}
              </cite>
            </div>
          </CardContent>
        </Card>

        {/* Days Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Estudos Diários</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedLesson.days.map((day, index) => (
              <Card 
                key={index}
                className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:scale-105"
                onClick={() => navigateToDay(index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {day.day}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(`${window.location.origin}/year/${selectedYear}/quarter/${quarterId}/lesson/${lessonNumber}/day/${index}`);
                          toast({
                            title: "Link copiado!",
                            description: "Link do dia copiado para a área de transferência.",
                          });
                        }}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {day.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {day.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{day.readingTime || 15} min</span>
                      </div>
                      <div className="flex items-center">
                        <Brain className="w-3 h-3 mr-1" />
                        <span>{day.quiz?.length || 0} quiz</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    if (!selectedDay || !selectedLesson) return <div>Dia não encontrado</div>;

    const currentDayIndex = parseInt(dayIndex || '0');
    const hasNextDay = currentDayIndex < selectedLesson.days.length - 1;
    const hasPrevDay = currentDayIndex > 0;

    const currentQuestion = selectedDay.quiz[quizState.currentQuestion];
    const progress = ((quizState.currentQuestion + 1) / selectedDay.quiz.length) * 100;
    const scorePercentage = (quizState.score / selectedDay.quiz.length) * 100;

    return (
      <div className="space-y-8">
        {/* Day Header with Lesson Style */}
        <LessonHeader
          lessonNumber={selectedLesson.number}
          title={selectedDay.title}
          day={selectedDay.day}
          date={selectedDay.date}
          rpsp={selectedDay.rpsp}
          memoryVerse={selectedLesson.memoryVerse.text}
        />

        {/* Navigation between days */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigateToDay(currentDayIndex - 1)}
            disabled={!hasPrevDay}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Dia Anterior</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigateToDay(currentDayIndex + 1)}
            disabled={!hasNextDay}
            className="flex items-center space-x-2"
          >
            <span>Próximo Dia</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Study Tabs */}
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
                    {selectedDay.content}
                  </div>
                </div>

                {selectedDay.verses && selectedDay.verses.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Textos Bíblicos de Referência
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedDay.verses.map((verse, index) => (
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

                {selectedDay.questions && selectedDay.questions.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Perguntas para Reflexão
                    </h4>
                    <div className="space-y-4">
                      {selectedDay.questions.map((question, index) => (
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
                    {selectedDay.summary}
                  </p>
                </div>

                {selectedDay.keyPoints && selectedDay.keyPoints.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Pontos-Chave para Lembrar
                    </h4>
                    <div className="grid gap-3">
                      {selectedDay.keyPoints.map((point, index) => (
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
                    {selectedDay.practicalApplication}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Content */}
          <TabsContent value="quiz">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-2xl">
                    <Brain className="w-6 h-6 text-orange-600" />
                    <span>Quiz Interativo</span>
                  </div>
                  {!quizState.showResults && (
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      {quizState.currentQuestion + 1} de {selectedDay.quiz.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {!quizState.showResults ? (
                  <>
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progresso</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>

                    {/* Current Question */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {currentQuestion.question}
                      </h3>
                      
                      {currentQuestion.verse && (
                        <Badge variant="secondary" className="mb-4">
                          {currentQuestion.verse.reference}
                        </Badge>
                      )}

                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <Button
                            key={index}
                            variant={quizState.answers[quizState.currentQuestion] === index ? "default" : "outline"}
                            className={`w-full text-left justify-start h-auto p-4 transition-all ${
                              quizState.answers[quizState.currentQuestion] === index 
                                ? "bg-orange-600 text-white border-orange-600 shadow-lg" 
                                : "hover:bg-orange-50 hover:border-orange-200"
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                          >
                            <span className="font-bold mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                            <span className="text-base">{option}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-6 border-t">
                      <Button 
                        variant="outline" 
                        onClick={handlePrevQuestion}
                        disabled={quizState.currentQuestion === 0}
                        className="flex items-center space-x-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Anterior</span>
                      </Button>
                      
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={quizState.answers[quizState.currentQuestion] === null}
                        className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700"
                      >
                        <span>{quizState.currentQuestion === selectedDay.quiz.length - 1 ? 'Finalizar' : 'Próxima'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  /* Quiz Results */
                  <div className="space-y-8">
                    <div className="text-center space-y-6">
                      <Trophy className="w-20 h-20 text-orange-600 mx-auto" />
                      <h3 className="text-3xl font-bold text-gray-900">Quiz Concluído!</h3>
                      <div className="space-y-2">
                        <p className="text-xl">
                          Você acertou <span className="font-bold text-orange-600">{quizState.score}</span> de {selectedDay.quiz.length} perguntas
                        </p>
                        <p className="text-gray-600">
                          Pontuação: {scorePercentage.toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    {/* Detailed Results */}
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-gray-900">Respostas Detalhadas:</h4>
                      {selectedDay.quiz.map((question, index) => {
                        const userAnswer = quizState.answers[index];
                        const isCorrect = userAnswer === question.correctAnswer;
                        
                        return (
                          <Card key={index} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                  {isCorrect ? (
                                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                                  ) : (
                                    <XCircle className="w-6 h-6 text-red-500 mt-0.5" />
                                  )}
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900 text-lg">{question.question}</p>
                                    <p className="text-sm text-gray-600 mt-2">
                                      Sua resposta: {userAnswer !== null ? question.options[userAnswer] : 'Não respondida'}
                                    </p>
                                    {!isCorrect && (
                                      <p className="text-sm text-green-600 mt-1">
                                        Resposta correta: {question.options[question.correctAnswer]}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                  <p className="text-sm text-gray-700">
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
                      <Button onClick={resetQuiz} variant="outline" className="flex items-center space-x-2">
                        <RotateCcw className="w-4 h-4" />
                        <span>Refazer Quiz</span>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {renderBreadcrumb()}
        
        {selectedDay ? renderDayView() :
         selectedLesson ? renderLessonView() :
         selectedQuarter ? renderQuarterView() :
         selectedYear ? renderYearView() :
         <div>Carregando...</div>
        }
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

export default StudyPage;