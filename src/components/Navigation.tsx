import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Home, BookOpen, Calendar, Info } from "lucide-react";

interface NavigationProps {
  currentLesson?: number;
  onNavigateHome: () => void;
  onNavigateToLesson: (lessonNumber: number) => void;
  totalLessons: number;
}

export function Navigation({ currentLesson, onNavigateHome, onNavigateToLesson, totalLessons }: NavigationProps) {
  return (
    <nav className="bg-card/95 backdrop-blur border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onNavigateHome}
              className="flex items-center space-x-2"
            >
              <GraduationCap className="w-5 h-5 text-spiritual-gold" />
              <span className="font-semibold">Escola Sabatina</span>
            </Button>
            
            {currentLesson && (
              <>
                <span className="text-muted-foreground">/</span>
                <Badge variant="outline">
                  Lição {currentLesson}
                </Badge>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onNavigateHome}>
              <Home className="w-4 h-4 mr-1" />
              Início
            </Button>
            
            {!currentLesson && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{totalLessons} Lições</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}