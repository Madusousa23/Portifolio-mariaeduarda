import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const { data } = await supabase
      .from('skills')
      .select('name')
      .order('id');
    
    if (data) {
      setSkills(data.map(skill => skill.name));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Disponível para novos projetos</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Design & Desenvolvimento
              <span className="block text-primary mt-2">Web Criativo</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transformo ideias em experiências digitais memoráveis através de design intuitivo 
              e código limpo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="group">
                <Link to="/works">
                  Ver Trabalhos
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Entrar em Contato</Link>
              </Button>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-32 space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-center">Habilidades</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="p-6 bg-card border border-border rounded-lg text-center hover:border-primary transition-all hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
