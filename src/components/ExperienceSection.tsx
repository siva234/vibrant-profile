
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
    company: "Qopla AB",
    role: "Full-Stack Developer / Scrum Master",
    period: "Oct 2025 - Present",
    description: "Developing end-to-end features across a React, TypeScript and NestJS stack, owning user stories from the UI through to backend integration. Architected and rebuilt the legacy email services and modernised the UI/UX templates, improving processing efficiency and maintainability. Proposed, designed and currently building an internal onboarding tool as the sole developer and Scrum Master, running short sprint iterations with a Claude-based AI agentic setup to apply AI where it brings real delivery value.",
    industry: "Restaurant / POS SaaS",
    technologies: ["React", "TypeScript", "JavaScript", "NestJS", "GraphQL", "MongoDB", "Java", "Kafka", "AWS", "Bash", "Git", "Scrum", "AI Agentic Tools"]
  },
  {
    company: "Independent Game Studio",
    role: "Founder & Game Designer",
    period: "2025",
    description: "Founded and led a small studio (two developers and two artists) building a mobile and PC (Steam) game. Owned game design, level design, balancing and market research, and used generative AI extensively for character, skin and level art to ship more with a lean team. The project ended before release after the investor withdrew funding.",
    industry: "Gaming / Startup",
    technologies: ["Game Design", "Level Design", "Game Balancing", "Market Research", "Generative AI", "Team Leadership"]
  },
  {
    company: "Sigma Technology AB",
    role: "Full-Stack Developer / Lead Developer / Scrum Master",
    period: "June 2021 - Jan 2025",
    workDetails: [
      {
        title: "Client: Ericsson AB",
        description: "Worked as a full-stack developer on tools supporting technical documentation workflows. Focused on frontend development using VanillaJS and Hugo, with backend contributions in Python and deployments on Azure. Independently used Figma to design and implement user interfaces. Supported the team as Scrum Master when needed, helping drive agile collaboration and task ownership.",
        type: "client"
      },
      {
        title: "Internal Projects at Sigma",
        description: "Contributed to internal tools and initiatives while awaiting the next client assignment.",
        type: "internal"
      },
      {
        title: "Client: Telia AB",
        description: "Developed and maintained an internal web application critical to Telia's customer-support operations, using VueJS and ReactJS. Acted as lead developer, responsible for onboarding and mentoring new developers and running regular code reviews. Introduced developer productivity improvements, including custom Bash scripts to simplify daily workflows. Took the initiative to enhance team culture, organising activities like weekly football sessions to strengthen collaboration. Participated in UX discussions and contributed to UI/UX improvements. Stepped in as Scrum Master, facilitating sprints and maintaining delivery momentum.",
        type: "client"
      }
    ],
    industry: "Consultancy, Telecom",
    technologies: ["JavaScript", "TypeScript", "React", "Vue", "Hugo", "Java", "Spring Boot", "Python", "Docker", "Bash", "WSL", "MongoDB", "AWS", "Azure", "Maven", "Git", "Jira", "Scrum", "Microservice Architecture"]
  },
  {
    company: "Tink AB",
    role: "Software Developer",
    period: "Feb 2021 - Apr 2021",
    description: "As part of the agile team, developed and maintained Console, the central web platform supporting all of Tink's products. Set up regular team syncs, summarised weekly planning decisions and followed up on them.",
    industry: "Fintech",
    technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Git", "Jira", "Scrum", "Kanban", "Microservice Architecture"]
  },
  {
    company: "Adventure Box Technology AB",
    role: "Software Developer",
    period: "Mar 2020 - Aug 2020",
    description: "As part of a Scrum-based team, developed and maintained adventurebox.com, a web platform for developing, publishing and playing voxel games for all age groups. Built the redesigned homepage entirely in React, delivering responsive, accessible UI across devices and age groups.",
    industry: "Gaming",
    technologies: ["JavaScript", "TypeScript", "React", "Java", "Docker", "Bash", "MongoDB", "AWS", "Maven", "Git", "Jira", "Scrum", "Microservice Architecture"]
  },
  {
    company: "HMS Industrial Networks AB",
    role: "Software Developer",
    period: "Jan 2018 - Feb 2020",
    description: "As part of a Scrum-based team, developed and maintained Netbiter, a microservices web platform (REST APIs) for monitoring and controlling data from HMS IoT products deployed in industrial precision systems. Built a test environment for simulating real-time conditions for new product updates, handled DevOps deployments, auto-scaling and certifications on AWS, and automated routine team tasks with Bash scripts.",
    industry: "IoT",
    technologies: ["Java", "Spring Boot", "Docker", "Bash", "SQL", "AWS", "Maven", "Git", "Jenkins", "Swagger", "Jira", "Scrum", "Microservice Architecture"]
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
