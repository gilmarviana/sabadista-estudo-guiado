import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  GraduationCap, 
  ChevronRight,
  Clock,
  Target,
  Sparkles,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { yearsData } from "@/data/quarters";
import heroImage from "@/assets/hero-josue.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-white tracking-tight">
                Escola Sabatina
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Transforme sua jornada espiritual com estudos bíblicos interativos, 
                organizados por anos e trimestres para um aprendizado progressivo.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">52</div>
                <div className="text-blue-200 text-sm">Lições/Ano</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">364</div>
                <div className="text-blue-200 text-sm">Dias de Estudo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-blue-200 text-sm">Quiz Interativos</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Years Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Escolha seu Ano de Estudo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada ano contém 4 trimestres com 13 lições cada, totalizando 52 semanas de crescimento espiritual.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {yearsData.map((yearData) => (
              <Link 
                key={yearData.year}
                to={`/year/${yearData.year}`}
                className="block"
              >
                <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          Ano Letivo
                        </Badge>
                        <CardTitle className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {yearData.year}
                        </CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <ChevronRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{yearData.quarters.length}</div>
                        <div className="text-sm text-blue-700">Trimestres</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">52</div>
                        <div className="text-sm text-green-700">Lições</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                        Trimestres Disponíveis
                      </h4>
                      <div className="space-y-2">
                        {yearData.quarters.map((quarter) => (
                          <div key={quarter.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {quarter.number}º Tri
                              </Badge>
                              <span className="text-sm font-medium text-gray-700">{quarter.bookTitle}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-gray-900">Por que Escolher Nossa Plataforma?</h3>
            <p className="text-lg text-gray-600">Recursos modernos para uma experiência de aprendizado única</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Quiz Interativos</h4>
              <p className="text-gray-600">Teste seus conhecimentos com perguntas elaboradas e feedback detalhado.</p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Resumos Diários</h4>
              <p className="text-gray-600">Pontos-chave organizados para facilitar a compreensão e revisão.</p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Versículos Completos</h4>
              <p className="text-gray-600">Acesse versículos bíblicos completos com um clique, incluindo contexto.</p>
            </Card>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-20 text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="py-12">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold">
                  Acesso Rápido ao Estudo Atual
                </h3>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  Vá diretamente para o 4º trimestre de 2025 e comece seu estudo hoje mesmo.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Link to="/year/2025/quarter/2025-q4">
                    <Button 
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-3"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Ir para 4º Trimestre 2025
                    </Button>
                  </Link>
                  <Link to="/year/2025/quarter/2025-q4/lesson/1">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-3"
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Começar Lição 1
                    </Button>
                  </Link>
                </div>
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