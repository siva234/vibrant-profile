
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, Users } from "lucide-react";

interface WorkDetails {
  title: string;
  period: string;
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
    role: "Senior Full-Stack Developer",
    period: "Oct 2025 - Present",
    description: "Building Qopla's internal CRM from scratch. React and TypeScript on the front end, NestJS behind it. I am product owner, manager and developer on it, so I set the scope and priorities and then write the code. It is in production with real customer data. The onboarding and hardware teams use it today, around 10 people, and sales and support are next, roughly 30 more users. I built it using an agentic AI workflow with MCP servers I set up myself. Tests are in Jest and Playwright. I also rebuilt the legacy email service and its templates, which is faster now and far easier to maintain. On call one week in every few.",
    industry: "Restaurant / POS SaaS",
    technologies: ["React", "TypeScript", "JavaScript", "NestJS", "GraphQL", "MongoDB", "Java", "Kafka", "AWS", "Jest", "Playwright", "Bash", "Git", "Scrum", "Agentic AI workflows", "MCP servers"]
  },
  {
    company: "Independent Game Project",
    role: "Founder & Game Designer",
    period: "Jan 2025 - Sept 2025",
    description: "Designed a mobile game and built it in Unity. I hired and managed the team: one senior developer and two artists working on character animation. I did the rest of the art myself using digital and AI tools. I handled game design, level design and balancing, did the market research, and made the calls on scope and priorities. We reached soft launch beta. The investor then withdrew and I wound the project up.",
    industry: "Gaming / Startup",
    technologies: ["Unity", "Game Design", "Level Design", "Game Balancing", "Market Research", "Generative AI", "Hiring", "Team Leadership"]
  },
  {
    company: "Sigma Technology Group",
    role: "Software Engineering Consultant, then Lead Software Engineering Consultant",
    period: "Jul 2021 - Jan 2025",
    workDetails: [
      {
        title: "Client: Telia AB",
        period: "Oct 2021 - Oct 2023",
        description: "Developed and maintained an internal web application critical to Telia's customer-support operations, using VueJS and ReactJS with Redux and Vite. Joined as a software engineer and moved up to lead developer in June 2022, in a team of 22. Onboarded and mentored around five new engineers and ran regular code reviews. Wrote unit tests in Jest. Introduced developer productivity improvements, including custom Bash scripts to simplify daily workflows. Took the initiative to enhance team culture, organising activities like weekly football sessions. Participated in UX discussions and contributed to UI/UX improvements. Stepped in as Scrum Master, facilitating sprints and maintaining delivery momentum.",
        type: "client"
      },
      {
        title: "Client: Ericsson AB",
        period: "Apr 2024 - Nov 2024",
        description: "Worked as a full-stack developer on tools supporting technical documentation workflows. Focused on frontend development using VanillaJS and Hugo, with backend contributions in Python and deployments on Azure. Independently used Figma to design and implement user interfaces. Supported the team as Scrum Master when needed, helping drive agile collaboration and task ownership.",
        type: "client"
      },
      {
        title: "Internal Projects at Sigma",
        period: "Between client assignments",
        description: "Contributed to internal tools and initiatives while awaiting the next client assignment.",
        type: "internal"
      }
    ],
    industry: "Consultancy, Telecom",
    technologies: ["JavaScript", "TypeScript", "React", "Vue", "Redux", "Vite", "Jest", "Hugo", "Java", "Spring Boot", "Python", "Figma", "Bash", "WSL", "Azure", "Maven", "Git", "Jira", "Scrum", "Microservice Architecture"]
  },
  {
    company: "Tink AB",
    role: "Software Engineer",
    period: "Feb 2021 - May 2021",
    description: "As part of the agile team, developed and maintained Console, the central web platform supporting all of Tink's products. Set up regular team syncs, summarised weekly planning decisions and followed up on them.",
    industry: "Fintech",
    technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Git", "Jira", "Scrum", "Kanban", "Microservice Architecture"]
  },
  {
    company: "Adventure Box Technology AB",
    role: "JavaScript Multiplayer Game Developer",
    period: "Mar 2020 - Aug 2020",
    description: "As part of a Scrum-based team, developed and maintained adventurebox.com, a web platform for developing, publishing and playing voxel games for all age groups. Built the redesigned homepage entirely in React, delivering responsive, accessible UI across devices and age groups. Also tracked down and fixed Rollbar errors around connectivity and failing features.",
    industry: "Gaming",
    technologies: ["JavaScript", "TypeScript", "React", "Java", "Docker", "Bash", "MongoDB", "AWS", "Maven", "Git", "Jira", "Scrum", "Microservice Architecture"]
  },
  {
    company: "HMS Industrial Networks AB",
    role: "Development Engineer",
    period: "Jan 2018 - Mar 2020",
    description: "As part of a Scrum-based team, developed and maintained Netbiter, a microservices web platform (REST APIs) for monitoring and controlling data from HMS IoT products deployed in industrial precision systems. Built a test environment for simulating real-time conditions for new product updates, handled DevOps deployments, auto-scaling and certifications on AWS, and automated routine team tasks with Bash scripts. Also part of a 24/7 on-call rota.",
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
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-lg font-medium">
                            {work.type === "client" ?
                              <Briefcase className="h-5 w-5" /> :
                              <Building className="h-5 w-5" />
                            }
                            {work.title}
                          </div>
                          <span className="text-sm text-muted-foreground">{work.period}</span>
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
