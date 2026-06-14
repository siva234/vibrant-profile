import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "AI-Agentic Onboarding Tool",
      description: "Internal tool to speed up company onboarding at Qopla — proposed, designed and built solo, using a Claude-based multi-agent setup to drive development across short sprint iterations.",
      technologies: ["React", "TypeScript", "NestJS", "AI Agents"],
      github: "",
      demo: ""
    },
    {
      title: "Indie Game — Studio Founder",
      description: "Mobile and PC (Steam) game built with a small founder-led team of developers and artists. Led game design, level design and balancing, using generative AI for characters, skins and level art. Unreleased after investor funding was withdrawn.",
      technologies: ["Game Design", "Level Design", "Generative AI", "Team Leadership"],
      github: "",
      demo: ""
    },
    {
      title: "Netbiter — Industrial IoT Platform",
      description: "Microservices web platform (REST APIs) for monitoring and controlling HMS IoT devices in industrial environments, including a real-time test environment and AWS deployments with auto-scaling.",
      technologies: ["Java", "Spring Boot", "AWS", "Docker"],
      github: "",
      demo: ""
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of work across my career. Most of it is proprietary —
            code and demos are available on request.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg"></div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {(project.github || project.demo) && (
                  <div className="flex gap-2">
                    {project.github && (
                      <Button asChild size="sm" variant="outline" className="flex-1">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button asChild size="sm" className="flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
