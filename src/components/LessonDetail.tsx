import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Calendar, Quote, BookOpen, MessageCircleQuestion } from "lucide-react";
import { Lesson, DayStudy as DayStudyType } from "@/types/lesson";
import { DayStudy } from "./DayStudy";

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

export function LessonDetail({ lesson, onBack }: LessonDetailProps) {
  const [selectedDay, setSelectedDay] = useState<DayStudyType | null>(null);

  return (
    <div className="min-h-screen bg-gradient-peaceful">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às Lições
          </Button>
          
          <Card className="bg-card/95 backdrop-blur border-border">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-sm font-medium">
                  Lição {lesson.number}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {lesson.startDate} - {lesson.endDate}
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold text-foreground">
                {lesson.title}
              </CardTitle>
              
              <CardDescription className="text-base leading-relaxed">
                {lesson.summary}
              </CardDescription>
              
              <div className="bg-verse-highlight p-4 rounded-lg border border-border">
                <div className="flex items-start space-x-3">
                  <Quote className="w-5 h-5 mt-1 text-spiritual-gold flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Verso para Memorizar:
                    </p>
                    <p className="italic text-foreground leading-relaxed">
                      {lesson.memoryVerse}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Leituras da Semana:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {lesson.weeklyReadings.map((reading, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {reading}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Estudos Diários
            </h3>
            {lesson.days.map((day, index) => (
              <DayStudy
                key={index}
                dayStudy={day}
                isSelected={selectedDay === day}
                onSelect={() => setSelectedDay(day)}
              />
            ))}
          </div>
          
          <div className="lg:col-span-2">
            {selectedDay ? (
              <Card className="bg-card/95 backdrop-blur border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="bg-spiritual-gold text-primary">
                      {selectedDay.day}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {selectedDay.date}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-foreground">
                    {selectedDay.title}
                  </CardTitle>
                  
                  {selectedDay.rpsp && (
                    <CardDescription className="text-sm font-medium text-spiritual-blue">
                      RPSP: {selectedDay.rpsp}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ScrollArea className="h-96">
                    <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                      {selectedDay.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {selectedDay.verses && selectedDay.verses.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Textos Bíblicos:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedDay.verses.map((verse, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {verse}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedDay.questions && selectedDay.questions.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                          <MessageCircleQuestion className="w-4 h-4 mr-2" />
                          Perguntas para Reflexão:
                        </h4>
                        <div className="space-y-2">
                          {selectedDay.questions.map((question, index) => (
                            <div key={index} className="bg-verse-highlight p-3 rounded-lg border border-border">
                              <p className="text-sm text-foreground">{question}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/95 backdrop-blur border-border h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Selecione um dia para estudar</p>
                  <p className="text-sm">Escolha um dos estudos diários ao lado para começar</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}