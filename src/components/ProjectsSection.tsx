
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imgSrc: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product catalog, shopping cart, payment processing, and admin dashboard.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    imgSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team workspaces, and progress tracking.",
    technologies: ["React", "TypeScript", "Firebase", "Material UI"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    imgSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    title: "Financial Dashboard",
    description: "An interactive dashboard for visualizing financial data with customizable charts, filters, and reporting features.",
    technologies: ["React", "D3.js", "Spring Boot", "PostgreSQL"],
    githubUrl: "https://github.com",
    imgSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    title: "IoT Monitoring System",
    description: "A real-time monitoring system for IoT devices with data visualization, alerts, and device management.",
    technologies: ["React", "Node.js", "WebSockets", "InfluxDB", "Docker"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    imgSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    title: "Social Media API",
    description: "A RESTful API for a social media platform with user authentication, posts, comments, and notifications.",
    technologies: ["Java", "Spring Boot", "MySQL", "Redis", "AWS"],
    githubUrl: "https://github.com",
    imgSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    title: "Mobile Workout App",
    description: "A cross-platform mobile application for tracking workouts, setting fitness goals, and viewing progress analytics.",
    technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    imgSrc: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.title}
              className="overflow-hidden border flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md group"
            >
              <div className="aspect-video w-full overflow-hidden bg-muted/50">
                <img 
                  src={`${project.imgSrc}?w=600&h=400&fit=crop&crop=focalpoint&auto=format&q=80`} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                {project.demoUrl && (
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
