import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: number;
  title: string;
  url: string;
  description: string;
}

const Works = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('id');
    
    if (data) {
      setProjects(data);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              Meus <span className="text-primary">Trabalhos</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seleção de projetos que demonstram minha experiência em design e desenvolvimento web.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="group hover:border-primary transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.title}
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Ver Projeto
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Works;
