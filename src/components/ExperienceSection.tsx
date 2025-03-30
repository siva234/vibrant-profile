
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  industry: string;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: "Fintech Innovations",
    role: "Senior Full Stack Developer",
    period: "2022 - Present",
    description: "Leading the development of a next-generation payment processing platform. Implementing secure API integrations with banking systems and designing responsive user interfaces for financial management.",
    industry: "Fintech",
    technologies: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"]
  },
  {
    company: "Tech Consultancy Group",
    role: "Full Stack Developer",
    period: "2020 - 2022",
    description: "Consulted for multiple client projects across various industries. Delivered end-to-end solutions from requirements gathering to deployment and maintenance.",
    industry: "Consultancy",
    technologies: ["React", "Java", "Spring Boot", "Docker", "Azure"]
  },
  {
    company: "ConnectNet Systems",
    role: "Backend Developer",
    period: "2018 - 2020",
    description: "Developed robust backend services for telecommunications platforms. Implemented microservices architecture and improved system reliability by 40%.",
    industry: "Telecom",
    technologies: ["Java", "Spring Boot", "Kubernetes", "PostgreSQL", "RabbitMQ"]
  },
  {
    company: "GameVerse Studios",
    role: "Frontend Developer",
    period: "2016 - 2018",
    description: "Created interactive UIs for web-based gaming platforms. Implemented real-time features and optimized rendering performance for complex game interfaces.",
    industry: "Gaming",
    technologies: ["JavaScript", "React", "WebSockets", "HTML5 Canvas", "CSS3"]
  },
  {
    company: "IoT Solutions Inc",
    role: "Junior Developer",
    period: "2015 - 2016",
    description: "Built data visualization dashboards for IoT devices. Worked on REST APIs for device communication and data processing pipelines.",
    industry: "IoT",
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "D3.js"]
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={exp.company}
              className="border hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              <CardHeader className="bg-muted/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-bold">{exp.role}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1 flex flex-wrap items-center gap-2">
                    <span>{exp.company}</span>
                    <span className="hidden md:inline">•</span>
                    <Badge variant="outline" className="text-xs font-normal">
                      {exp.industry}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{exp.period}</div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
