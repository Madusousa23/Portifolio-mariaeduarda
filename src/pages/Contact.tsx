import Navigation from "@/components/Navigation";
import { portfolioConfig } from "@/config/portfolio";
import { Mail, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold">
              Entre em <span className="text-primary">Contato</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vamos conversar sobre seu próximo projeto? Estou sempre aberto a novas oportunidades e colaborações.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Email Card */}
            <Card className="hover:border-primary transition-all hover:scale-105 animate-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Email</CardTitle>
                <CardDescription>Envie-me um email para discutir seu projeto</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <a href={`mailto:${portfolioConfig.email}`}>
                    {portfolioConfig.email}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp Card */}
            <Card className="hover:border-primary transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>WhatsApp</CardTitle>
                <CardDescription>Converse comigo diretamente pelo WhatsApp</CardDescription>
              </CardHeader>
              <CardContent>
                {portfolioConfig.whatsapp ? (
                  <Button asChild variant="outline" className="w-full">
                    <a href={portfolioConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                      Enviar Mensagem
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Link em breve
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
