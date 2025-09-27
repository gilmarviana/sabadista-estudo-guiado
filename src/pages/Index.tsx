import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Calendar, Star } from "lucide-react";
import { LessonCard } from "@/components/LessonCard";
import { LessonDetail } from "@/components/LessonDetail";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { lessonData } from "@/data/lessons";
import heroImage from "@/assets/hero-josue.jpg";

const Index = () => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  
  const handleSelectLesson = (lessonNumber: number) => {
    setSelectedLesson(lessonNumber);
  };

  const handleBackToLessons = () => {
    setSelectedLesson(null);
  };

  const currentLesson = selectedLesson 
    ? lessonData.lessons.find(lesson => lesson.number === selectedLesson)
    : null;

  if (currentLesson) {
    return (
      <>
        <Navigation 
          currentLesson={currentLesson.number}
          onNavigateHome={handleBackToLessons}
          onNavigateToLesson={handleSelectLesson}
          totalLessons={lessonData.lessons.length}
        />
        <LessonDetail lesson={currentLesson} onBack={handleBackToLessons} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-peaceful">
      <Navigation 
        onNavigateHome={() => {}}
        onNavigateToLesson={handleSelectLesson}
        totalLessons={lessonData.lessons.length}
      />
      
      {/* Header */}
      <header className="relative bg-gradient-spiritual text-spiritual-light shadow-lg overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <GraduationCap className="w-12 h-12 text-spiritual-gold" />
              <h1 className="text-5xl font-bold">Escola Sabatina</h1>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{lessonData.bookTitle}</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Um estudo profundo sobre as lições de fé, coragem e confiança em Deus 
                encontradas na jornada de Josué e do povo de Israel.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <Badge variant="secondary" className="bg-spiritual-gold/20 text-spiritual-light border-spiritual-gold/30 px-4 py-2">
                  {lessonData.quarter} {lessonData.year}
                </Badge>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-lg">{lessonData.lessons.length} Lições</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Card className="bg-card/95 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Star className="w-5 h-5 text-spiritual-gold" />
                <span>Sobre o Trimestre</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Este trimestre estudaremos as lições de fé encontradas no livro de Josué. 
                Descobriremos como Deus abriu um novo capítulo na vida de Israel e como Ele 
                pode fazer o mesmo em nossa própria vida. Cada lição contém estudos diários 
                organizados do sábado à sexta-feira, com textos bíblicos, reflexões e 
                perguntas para aprofundar nossa compreensão.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-foreground">Lições do Trimestre</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>13 semanas de estudo</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonData.lessons.map((lesson) => (
              <LessonCard
                key={lesson.number}
                lesson={lesson}
                onSelectLesson={handleSelectLesson}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-golden border-spiritual-gold/30">
            <CardContent className="py-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">
                  Comece Sua Jornada de Estudo
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Selecione uma lição acima para começar seu estudo diário da Palavra de Deus. 
                  Cada dia traz novas descobertas e crescimento espiritual.
                </p>
                <Button 
                  variant="spiritual" 
                  size="lg"
                  onClick={() => handleSelectLesson(1)}
                  className="font-semibold"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Começar com a Lição 1
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
