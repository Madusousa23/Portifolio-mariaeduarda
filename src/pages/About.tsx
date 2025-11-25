import Navigation from "@/components/Navigation";
import profilePhoto from "@/assets/profile-photo.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
            {/* Photo */}
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl" />
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="relative rounded-2xl w-full shadow-2xl border border-border"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Sobre <span className="text-primary">Mim</span>
              </h1>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sou designer e desenvolvedor web apaixonado por criar experiências digitais 
                  que combinam estética e funcionalidade.
                </p>
                
                <p>
                  Com expertise em UX/UI e desenvolvimento web, trabalho para transformar 
                  conceitos em soluções digitais que fazem a diferença.
                </p>
                
                <p>
                  Meu foco está em criar interfaces intuitivas, responsivas e visualmente 
                  atraentes, sempre com atenção aos detalhes e às necessidades dos usuários.
                </p>
              </div>

              <div className="pt-6">
                <h3 className="font-semibold mb-3">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {["Design de Interface", "Experiência do Usuário", "Desenvolvimento Frontend", "Design Responsivo"].map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
