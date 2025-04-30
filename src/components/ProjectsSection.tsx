
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Types for GitHub API response
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  pushed_at: string;
}

// Fallback static projects in case API fails
const fallbackProjects = [
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
  }
];

// Function to fetch GitHub repos
const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch("https://api.github.com/users/siva234/repos?sort=updated&direction=desc&per_page=4");
  
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repos");
  }
  
  return response.json();
};

// Function to generate a placeholder image for repos without specific images
const getPlaceholderImage = (index: number) => {
  const images = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b"
  ];
  return images[index % images.length];
};

const ProjectsSection = () => {
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: fetchGitHubRepos,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1
  });

  // If there's an error or no data, we'll use the fallback projects
  const projects = error || !repos ? fallbackProjects : repos.map((repo, index) => ({
    title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
    description: repo.description || "No description available",
    technologies: repo.topics.length ? repo.topics : repo.language ? [repo.language] : ["Unknown"],
    githubUrl: repo.html_url,
    demoUrl: repo.homepage,
    imgSrc: getPlaceholderImage(index),
    updatedAt: new Date(repo.updated_at).toLocaleDateString()
  }));

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-heading">Featured Projects</h2>
          {!error && (
            <a 
              href="https://github.com/siva234" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4 mr-1" />
              View GitHub Profile
            </a>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2">Loading projects from GitHub...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={project.title + index}
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
                  <CardTitle className="capitalize">{project.title}</CardTitle>
                  {!error && 'updatedAt' in project && (
                    <p className="text-xs text-muted-foreground">
                      Last updated: {project.updatedAt}
                    </p>
                  )}
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
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
