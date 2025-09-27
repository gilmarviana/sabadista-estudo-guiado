import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Quote } from "lucide-react";
import { Lesson } from "@/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
  onSelectLesson: (lessonNumber: number) => void;
}

export function LessonCard({ lesson, onSelectLesson }: LessonCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card group">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-medium">
            Lição {lesson.number}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            {lesson.startDate} - {lesson.endDate}
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {lesson.title}
        </CardTitle>
        
        <CardDescription className="text-muted-foreground leading-relaxed">
          {lesson.summary}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-verse-highlight p-4 rounded-lg border border-border">
          <div className="flex items-start space-x-2">
            <Quote className="w-4 h-4 mt-1 text-spiritual-gold flex-shrink-0" />
            <p className="text-sm italic text-foreground leading-relaxed">
              {lesson.memoryVerse}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4 mr-1" />
            {lesson.days.length} dias de estudo
          </div>
          
          <Button 
            variant="spiritual" 
            size="sm"
            onClick={() => onSelectLesson(lesson.number)}
            className="font-medium"
          >
            Estudar Lição
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}