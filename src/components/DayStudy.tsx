import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, BookOpenCheck, MessageCircleQuestion } from "lucide-react";
import { DayStudy as DayStudyType } from "@/types/lesson";

interface DayStudyProps {
  dayStudy: DayStudyType;
  isSelected: boolean;
  onSelect: () => void;
}

export function DayStudy({ dayStudy, isSelected, onSelect }: DayStudyProps) {
  return (
    <Card className={`transition-all duration-300 cursor-pointer ${
      isSelected 
        ? 'ring-2 ring-spiritual-gold bg-gradient-peaceful shadow-lg' 
        : 'hover:shadow-md hover:border-spiritual-gold/50'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge 
            variant={isSelected ? "default" : "outline"} 
            className={isSelected ? "bg-spiritual-gold text-primary" : ""}
          >
            {dayStudy.day}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4 mr-1" />
            {dayStudy.date}
          </div>
        </div>
        
        <CardTitle className="text-lg font-semibold text-foreground">
          {dayStudy.title}
        </CardTitle>
        
        {dayStudy.rpsp && (
          <CardDescription className="text-xs font-medium text-spiritual-blue">
            RPSP: {dayStudy.rpsp}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-foreground leading-relaxed line-clamp-3">
          {dayStudy.content.split('\n')[0]}...
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            {dayStudy.verses && (
              <div className="flex items-center">
                <BookOpenCheck className="w-3 h-3 mr-1" />
                {dayStudy.verses.length} versículos
              </div>
            )}
            {dayStudy.questions && (
              <div className="flex items-center">
                <MessageCircleQuestion className="w-3 h-3 mr-1" />
                {dayStudy.questions.length} perguntas
              </div>
            )}
          </div>
          
          <Button 
            variant={isSelected ? "golden" : "verse"} 
            size="sm"
            onClick={onSelect}
            className="text-xs"
          >
            {isSelected ? "Selecionado" : "Estudar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}