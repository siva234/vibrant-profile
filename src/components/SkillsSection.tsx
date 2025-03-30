
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["React", "TypeScript", "HTML", "CSS", "JavaScript", "Redux", "Next.js", "Tailwind CSS"]
  },
  {
    name: "Backend",
    skills: ["Java", "Spring Boot", "Node.js", "Express", "Python", "C#", ".NET", "REST APIs", "GraphQL"]
  },
  {
    name: "DevOps",
    skills: ["Docker", "Git", "CI/CD", "Jenkins", "GitHub Actions", "Kubernetes", "Linux"]
  },
  {
    name: "Cloud",
    skills: ["Azure", "AWS", "GCP", "Serverless", "Microservices"]
  },
  {
    name: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch"]
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
