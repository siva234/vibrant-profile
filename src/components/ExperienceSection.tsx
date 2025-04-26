
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, Users } from "lucide-react";

interface WorkDetails {
  title: string;
  description: string;
  type: "client" | "internal";
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
  workDetails?: WorkDetails[];
  industry: string;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: "Sigma Technology AB",
    role: "Full-Stack Developer/ Lead Developer/ Scrum Master",
    period: "June 2021 - Jan 2025",
    workDetails: [
      {
        title: "Client: Ericsson AB",
        description: "Working as a full-stack developer on tools supporting technical documentation workflows. Focused on frontend development using VanillaJS and Hugo, with backend contributions in Python and deployments on Azure.  Independently used Figma to design and implement user interfaces. Supporting the team as Scrum Master when needed, helping drive agile collaboration and task ownership.",
        type: "client"
      },
      {
        title: "Internal Projects at Sigma",
        description: "Contributed to internal tools and initiatives while awaiting next client assignment.",
        type: "internal"
      },
      {
        title: "Client: Telia AB",
        description: "Developed and maintained an internal web application critical to Telia's support systems, using VueJS and ReactJS. Acted as lead developer, responsible for on-boarding and mentoring new developers. Introduced developer productivity improvements, including custom Bash scripts to simplify daily workflows. Took the initiative to enhance team culture, organizing activities like weekly football sessions to strengthen collaboration. Participated in UX discussions and occasionally contributed to UI/UX improvements. Temporarily stepped in as Scrum Master, facilitating sprints and maintaining delivery momentum.",
        type: "client"
      }
    ],
    industry: "Consultancy, Telecom",
    technologies: ["JavaScript", "Typescript", "React", "Vue", "Hugo", "Java", "Springboot", "Python", "Docker", "Bash", "Wsl", "MongoDB", "AWS", "Azure", "Maven", "Git", "Jira", "Scrum", "Microservice Architecture"]
  },
  {
    company: "Tink AB",
    role: "Software Developer",
    period: "Feb 2021 - May 2021",
    description: "As part of the Agile team, Siva developed and maintained a web platform called console for all the products in Tink. Siva was also responsible for setting up regular team syncs, summarized weekly planning decisions, and followed up on them.",
    industry: "Fintech",
    technologies: ["JavaScript", "Typescript", "React", "Node", "Git", "Jira", "Scrum", "Kanban", "Microservice Architecture"]
  },
  {
    company: "Adventure Box Technology AB",
    role: "Software Developer",
    period: "Feb 2020 - Aug 2020",
    description: "As part of the Scrum-based team Siva developed and maintained adventurebox.com, a web platform for developing, publishing and playing voxel games for all age groups. He built the modifed homepage completely based on React.",
    industry: "Gaming",
    technologies: ["JavaScript", "Typescript", "React", "Java", "Docker", "Bash", "MongoDB", "AWS", "Maven", "Git", "Jira", "Scrum", "Microservice Architecture"]
  },
  {
    company: "HMS Industrial Networks AB",
    role: "Software Developer",
    period: "Jan 2018 - Feb 2020",
    description: "As part of the Scrum-based team Siva developed and maintained Netbiter, a web platform (system based on micro-services using REST API) for monitoring and controlling data from HMS IoT products deployed in industrial precision systems. He also built a test environment for simulating real-time conditions for our IoT products with the new updates.He worked with DevOps deployments, auto-scaling, certifcations, etc on AWS. And automated some daily tasks in the team with bash scripts.",
    industry: "IoT",
    technologies: ["Java", "SpringBoot", "Docker", "Bash", "Sql", "Aws", "Maven", "Git", "Jenkins", "Swagger", "Jira", "Scrum", "Microservice Architecture"]
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
                {exp.description && <p className="mb-4">{exp.description}</p>}
                
                {exp.workDetails && (
                  <div className="space-y-6 mb-6">
                    {exp.workDetails.map((work, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center gap-2 text-lg font-medium">
                          {work.type === "client" ? 
                            <Briefcase className="h-5 w-5" /> : 
                            <Building className="h-5 w-5" />
                          }
                          {work.title}
                        </div>
                        <p className="text-muted-foreground pl-7">{work.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                
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
