import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen } from "lucide-react";

interface LessonHeaderProps {
  lessonNumber: number;
  title: string;
  day: string;
  date: string;
  rpsp: string;
  memoryVerse?: string;
  imageUrl?: string;
}

export const LessonHeader = ({ 
  lessonNumber, 
  title, 
  day, 
  date, 
  rpsp, 
  memoryVerse,
  imageUrl 
}: LessonHeaderProps) => {
  return (
    <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-blue-600 to-teal-600 text-white">
      <CardContent className="p-0">
        <div className="relative">
          {/* Header with lesson number and title */}
          <div className="absolute top-0 left-0 right-0 z-10 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">{lessonNumber}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold leading-tight">{title}</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Main image area */}
          <div className="relative h-64 bg-gradient-to-br from-blue-700 to-teal-700">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-white/30" />
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Bottom info section */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {day}, {date}
                </Badge>
                <p className="text-sm text-blue-100">RPSP: {rpsp}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-blue-100 text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>Lição {lessonNumber}</span>
                </div>
              </div>
            </div>

            {/* Memory verse section */}
            {memoryVerse && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h3 className="text-sm font-semibold text-blue-100 mb-2 uppercase tracking-wide">
                  Verso para Memorizar
                </h3>
                <blockquote className="text-white italic leading-relaxed">
                  {memoryVerse}
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};