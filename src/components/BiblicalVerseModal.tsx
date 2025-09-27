import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Copy, Share2, Heart } from "lucide-react";
import { BiblicalVerse } from "@/types/lesson";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BiblicalVerseModalProps {
  verse: BiblicalVerse | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BiblicalVerseModal = ({ verse, isOpen, onClose }: BiblicalVerseModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  if (!verse) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
      toast({
        title: "Versículo copiado!",
        description: "O versículo foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o versículo.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Versículo Bíblico - ${verse.reference}`,
          text: `"${verse.text}" - ${verse.reference}`,
        });
      } catch (error) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: `${verse.reference} ${isFavorite ? "foi removido dos" : "foi adicionado aos"} seus versículos favoritos.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <BookOpen className="w-6 h-6 text-spiritual-gold" />
            <span>Versículo Bíblico</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Reference Badge */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-lg px-4 py-2 bg-spiritual-gold/10 border-spiritual-gold/30">
              {verse.reference}
            </Badge>
            {verse.version && (
              <Badge variant="secondary" className="text-sm">
                {verse.version}
              </Badge>
            )}
          </div>

          {/* Verse Text */}
          <Card className="bg-gradient-to-br from-spiritual-gold/5 to-spiritual-blue/5 border-spiritual-gold/20">
            <CardContent className="p-6">
              <blockquote className="text-lg leading-relaxed text-foreground font-medium italic">
                "{verse.text}"
              </blockquote>
              <cite className="block text-right mt-4 text-spiritual-gold font-semibold">
                — {verse.reference}
              </cite>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copiar</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartilhar</span>
              </Button>
            </div>

            <Button
              variant={isFavorite ? "default" : "outline"}
              size="sm"
              onClick={toggleFavorite}
              className="flex items-center space-x-2"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              <span>{isFavorite ? "Favoritado" : "Favoritar"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};