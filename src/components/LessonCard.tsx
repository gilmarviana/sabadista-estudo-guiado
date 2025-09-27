import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Quote, Target, Clock, ChevronRight } from "lucide-react";
import { Lesson } from "@/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
  onSelectLesson: (lessonNumber: number) => void;
}

export function LessonCard({ lesson, onSelectLesson }: LessonCardProps) {
  return (
    <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 hover:scale-105 overflow-hidden">
      {/* Color accent bar */}
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
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{lesson.startDate}</span>
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
        
        <CardDescription className="text-gray-600 leading-relaxed text-sm">
          {lesson.summary}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6 pt-0">
        {/* Memory Verse */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-start space-x-2">
            <Quote className="w-4 h-4 mt-1 text-blue-600 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                Verso para Memorizar
              </p>
              <p className="text-sm italic text-gray-700 leading-relaxed">
                "{lesson.memoryVerse.text}"
              </p>
              <p className="text-xs font-medium text-blue-600">
                — {lesson.memoryVerse.reference}
              </p>
            </div>
          </div>
        </div>

        {/* Objectives */}
        {lesson.objectives && lesson.objectives.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center">
              <Target className="w-4 h-4 mr-2 text-green-600" />
              Objetivos da Lição
            </h4>
            <div className="space-y-1">
              {lesson.objectives.slice(0, 2).map((objective, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-600">{objective}</p>
                </div>
              ))}
              {lesson.objectives.length > 2 && (
                <p className="text-xs text-gray-500 italic">
                  +{lesson.objectives.length - 2} objetivos adicionais
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Stats and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              <span>{lesson.days.length} dias</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>~15 min/dia</span>
            </div>
          </div>
          
          <Button 
            size="sm"
            onClick={() => onSelectLesson(lesson.number)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2 group-hover:bg-blue-700 transition-colors"
          >
            Estudar
            <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}