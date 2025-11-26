import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, Plus, LogOut } from "lucide-react";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório").max(200),
  url: z.string().trim().url("URL inválida").max(500),
  description: z.string().trim().min(1, "Descrição é obrigatória").max(500),
});

const skillSchema = z.string().trim().min(1, "Nome da habilidade é obrigatório").max(100);

const whatsappSchema = z.string().trim().max(500);

const Admin = () => {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [loading, setLoading] = useState(true);

  // New project form
  const [newProject, setNewProject] = useState({ title: "", url: "", description: "" });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      loadData();
    }
  }, [user, isAdmin]);

  const loadData = async () => {
    try {
      const [projectsRes, skillsRes, settingsRes] = await Promise.all([
        supabase.from('projects').select('*').order('id'),
        supabase.from('skills').select('*').order('id'),
        supabase.from('site_settings').select('*').single(),
      ]);

      if (projectsRes.data) setProjects(projectsRes.data);
      if (skillsRes.data) setSkills(skillsRes.data);
      if (settingsRes.data) setWhatsappLink(settingsRes.data.whatsapp_link || "");
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      projectSchema.parse(newProject);

      const { error } = await supabase
        .from('projects')
        .insert([newProject]);

      if (error) throw error;

      toast({ title: "Projeto adicionado com sucesso" });
      setNewProject({ title: "", url: "", description: "" });
      loadData();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao adicionar projeto",
          description: error instanceof Error ? error.message : "Erro desconhecido",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Projeto deletado com sucesso" });
      loadData();
    } catch (error) {
      toast({
        title: "Erro ao deletar projeto",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      skillSchema.parse(newSkill);

      const { error } = await supabase
        .from('skills')
        .insert([{ name: newSkill }]);

      if (error) throw error;

      toast({ title: "Habilidade adicionada com sucesso" });
      setNewSkill("");
      loadData();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao adicionar habilidade",
          description: error instanceof Error ? error.message : "Erro desconhecido",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Habilidade deletada com sucesso" });
      loadData();
    } catch (error) {
      toast({
        title: "Erro ao deletar habilidade",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    }
  };

  const handleUpdateWhatsApp = async () => {
    try {
      whatsappSchema.parse(whatsappLink);

      const { data: settings } = await supabase
        .from('site_settings')
        .select('id')
        .single();

      if (!settings) throw new Error("Configurações não encontradas");

      const { error } = await supabase
        .from('site_settings')
        .update({ whatsapp_link: whatsappLink })
        .eq('id', settings.id);

      if (error) throw error;

      toast({ title: "Link do WhatsApp atualizado com sucesso" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao atualizar WhatsApp",
          description: error instanceof Error ? error.message : "Erro desconhecido",
          variant: "destructive",
        });
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        {/* WhatsApp Link */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Link do WhatsApp</CardTitle>
            <CardDescription>Adicione ou atualize o link do WhatsApp</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={whatsappLink}
                onChange={(e) => setWhatsappLink(e.target.value)}
                placeholder="https://wa.me/seu-numero"
                maxLength={500}
              />
              <Button onClick={handleUpdateWhatsApp}>Salvar</Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Projetos</CardTitle>
            <CardDescription>Gerencie seus projetos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProject} className="space-y-4 mb-6">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Nome do projeto"
                  maxLength={200}
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={newProject.url}
                  onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                  placeholder="https://..."
                  maxLength={500}
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Descrição breve"
                  maxLength={500}
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Projeto
              </Button>
            </form>

            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.url}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Habilidades</CardTitle>
            <CardDescription>Gerencie suas habilidades</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSkill} className="flex gap-2 mb-6">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Nova habilidade"
                maxLength={100}
              />
              <Button type="submit">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </form>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg"
                >
                  <span>{skill.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleDeleteSkill(skill.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
