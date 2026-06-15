import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "./ParticlesBackground";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden"
    >
      <ParticlesBackground />
      <div className="container mx-auto px-4 relative">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          <p className="text-accent font-mono mb-5">Hi, this is Siva Kolli</p>
        </div>

        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground">
            Senior Full-Stack Engineer
          </h1>
        </div>

        <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground/70 mb-6">
            8+ years shipping React &amp; TypeScript products — Stockholm
          </h2>
        </div>

        <div className="animate-fade-in opacity-0 max-w-2xl" style={{ animationDelay: '0.8s' }}>
          <p className="text-lg text-foreground/70 mb-8">
            I build scalable, user-focused web applications across telecom, IoT, fintech and
            gaming — front end to cloud. I&apos;ve led teams, founded my own game studio, and
            now ship real internal tooling solo using AI agentic workflows.
          </p>
        </div>

        <div className="animate-fade-in opacity-0 flex flex-wrap items-center gap-4" style={{ animationDelay: '1s' }}>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <a href="/Siva-Kolli-CV.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>

          <div className="flex items-center gap-2 ml-1">
            <Button asChild variant="ghost" size="icon" className="rounded-full" aria-label="GitHub">
              <a href="https://github.com/siva234" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full" aria-label="LinkedIn">
              <a href="https://www.linkedin.com/in/sivareddykolli/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => scrollToSection("about")}
          aria-label="Scroll to About"
        >
          <ArrowDown className="h-6 w-6 text-foreground/70" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
