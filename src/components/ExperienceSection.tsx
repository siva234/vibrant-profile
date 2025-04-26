
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
    company: "Sigma Technology AB",
    role: "Full-Stack Developer/ Lead Developer/ Scrum Master",
    period: "June 2021 - Jan 2025",
    description: "",
    industry: "Consultancy, Telecom",
    technologies: ["React", "Node.js", "TypeScript", "Vanilla JS", "MongoDB", "AWS"]
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
    company: "Tink AB",
    role: "Software Developer",
    period: "Feb 2021 - May 2021",
    description: "Developed robust backend services for telecommunications platforms. Implemented microservices architecture and improved system reliability by 40%.",
    industry: "Fintech",
    technologies: ["JavaScript", "Typescript", "React", "Node", "Git", "Jira", "Scrum"]
  },
  {
    company: "Adventure Box Technology AB",
    role: "Software Developer",
    period: "Feb 2020 - Aug 2020",
    description: "As part of the Scrum-based team Siva developed and maintained adventurebox.com, a web platform for developing, publishing and playing voxel games for all age groups. He built the modifed homepage completely based on React.",
    industry: "Gaming",
    technologies: ["JavaScript", "Typescript", "React", "Java", "Docker", "Bash", "MongoDB", "AWS", "Maven", "Git", "Jira", "Scrum"]
  },
  {
    company: "HMS Industrial Networks AB",
    role: "Software Developer",
    period: "Jan 2018 - Feb 2020",
    description: "As part of the Scrum-based team Siva developed and maintained Netbiter, a web platform (system based on micro-services using REST API) for monitoring and controlling data from HMS IoT products deployed in industrial precision systems. He also built a test environment for simulating real-time conditions for our IoT products with the new updates.He worked with DevOps deployments, auto-scaling, certifcations, etc on AWS. And automated some daily tasks in the team with bash scripts.",
    industry: "IoT",
    technologies: ["Java", "SpringBoot", "Docker", "Bash", "Sql", "Aws", "Maven", "Git", "Jenkins", "Swagger", "Jira", "Scrum"]
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
