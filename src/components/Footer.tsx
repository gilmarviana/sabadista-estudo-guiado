import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Heart, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-transparent border-none shadow-none">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-spiritual-gold" />
                  <h3 className="text-lg font-semibold text-foreground">Escola Sabatina</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Estudos bíblicos da Escola Sabatina para crescimento espiritual e 
                  compreensão das Escrituras Sagradas.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-md font-medium text-foreground flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-spiritual-gold" />
                  Sobre este Trimestre
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>4º Trimestre 2025</p>
                  <p>Livro de Josué</p>
                  <p>13 Lições de Estudo</p>
                  <p>Estudos Diários (Sábado - Sexta)</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-md font-medium text-foreground">Como Estudar</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Leia os textos bíblicos sugeridos</p>
                  <p>• Reflita sobre as perguntas apresentadas</p>
                  <p>• Aplique as lições à vida cotidiana</p>
                  <p>• Compartilhe com outros estudantes</p>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center">
                Feito com <Heart className="w-4 h-4 mx-1 text-spiritual-gold" /> para o estudo da Palavra de Deus
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
}