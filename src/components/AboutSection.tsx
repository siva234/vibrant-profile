
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg">
              Hello! I'm a passionate Full Stack Developer with expertise in building robust and scalable web applications. 
              My journey in software development has taken me through various industries, including IoT, gaming, telecom, consultancy, 
              and fintech.
            </p>
            
            <p className="text-lg">
              I enjoy creating technology that solves real-world problems and delivers exceptional user experiences. 
              With a strong foundation in both frontend and backend technologies, I bridge the gap between design and functionality 
              to build comprehensive solutions.
            </p>
            
            <p className="text-lg">
              When I'm not coding, you might find me exploring new technologies, contributing to open-source projects, 
              or sharing my knowledge through tech communities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">6+</h3>
                <p className="text-foreground/70">Years Experience</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">15+</h3>
                <p className="text-foreground/70">Projects Completed</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">5</h3>
                <p className="text-foreground/70">Industries Served</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">10+</h3>
                <p className="text-foreground/70">Technologies Mastered</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
