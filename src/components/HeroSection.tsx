
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const HeroSection = () => {
  const scrollToProjects = () => {
    const projects = document.getElementById("projects");
    if (projects) {
      window.scrollTo({
        top: projects.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="w-24 h-24 border-4 border-primary">
            <AvatarImage 
              src="/lovable-uploads/1dc50672-a1d0-4686-ae9f-9b41657d2bc4.png" 
              alt="Venkata Sai Siva Reddy Kolli" 
              className="object-cover"
            />
            <AvatarFallback>VSR</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-accent font-mono mb-2">Hi, this is</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
              Venkata Sai Siva Reddy Kolli
            </h1>
          </div>
        </div>
        
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground/70 mb-6">
            Full Stack Developer
          </h2>
        </div>
        
        <div className="animate-fade-in opacity-0 max-w-xl" style={{ animationDelay: '0.6s' }}>
          <p className="text-lg text-foreground/70 mb-8">
            I'm a software engineer specializing in building outstanding digital experiences.
            Currently, I'm focused on building accessible, human-centered products.
          </p>
        </div>
        
        <div className="animate-fade-in opacity-0 flex flex-wrap gap-4" style={{ animationDelay: '1s' }}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={scrollToProjects}
          >
            View My Work
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => {
              const contact = document.getElementById("contact");
              if (contact) {
                window.scrollTo({
                  top: contact.offsetTop - 100,
                  behavior: "smooth",
                });
              }
            }}
          >
            Contact Me
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={() => {
            const about = document.getElementById("about");
            if (about) {
              window.scrollTo({
                top: about.offsetTop - 100,
                behavior: "smooth",
              });
            }
          }}
        >
          <ArrowDown className="h-6 w-6 text-foreground/70" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
