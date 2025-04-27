
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["React", "Vue", "TypeScript", "HTML", "CSS", "JavaScript", "Redux", "Hugo", "Tailwind CSS"]
  },
  {
    name: "Backend",
    skills: ["Java", "Spring Boot", "Maven", "Node.js", "Express", "Python", "REST APIs"]
  },
  {
    name: "DevOps",
    skills: ["Bash", "Docker", "Git", "CI/CD", "Jenkins", "Linux"]
  },
  {
    name: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "H2"]
  },
  {
    name: "Cloud",
    skills: ["Azure", "AWS", "GCP"]
  },
  {
    name: "Other",
    skills: ["Scrum", "Microservices", "Jira", "Figma", "Ai Tools"]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">My Skills</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={category.name} className="backdrop-blur-sm border hover:shadow-md transition-shadow overflow-hidden">
              <CardHeader className="border-b bg-muted/50">
                <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="px-3 py-1 text-sm transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                      {skill}
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

export default SkillsSection;
