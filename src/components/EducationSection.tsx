
import { GraduationCap, School, University } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description?: string;
  achievements?: string[];
  icon: "university" | "school" | "graduation";
  watermarkImage: string;
}

const educations: Education[] = [
  {
    degree: "Master of Science in Engineering",
    institution: "KTH Royal Institute of Technology",
    period: "2015 - 2017",
    location: "Stockholm, Sweden",
    description: "Specialized in Computer Science with focus on Software Engineering and Distributed Systems.",
    achievements: [
      "Graduate thesis on cloud-based microservices architecture",
      "Participated in university hackathons",
      "Student representative for the department council"
    ],
    icon: "university",
    watermarkImage: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80"
  },
  {
    degree: "Bachelor of Engineering",
    institution: "Uppsala University",
    period: "2012 - 2015",
    location: "Uppsala, Sweden",
    description: "Computer Science and Engineering with minor in Mathematics.",
    achievements: [
      "Undergraduate thesis on backend development and API design",
      "Student mentor for first-year students"
    ],
    icon: "graduation",
    watermarkImage: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80"
  }
];

const EducationSection = () => {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Section Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(60%)"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading">Education</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educations.map((edu) => (
            <Card key={edu.institution} className="hover:shadow-md transition-all duration-300 overflow-hidden relative">
              {/* Card Watermark Image */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `url('${edu.watermarkImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              
              <CardHeader className="bg-muted/30 flex flex-row items-center gap-4 relative z-10">
                <div className="bg-primary/10 p-3 rounded-full">
                  {edu.icon === "university" && <University className="h-6 w-6 text-primary" />}
                  {edu.icon === "school" && <School className="h-6 w-6 text-primary" />}
                  {edu.icon === "graduation" && <GraduationCap className="h-6 w-6 text-primary" />}
                </div>
                
                <div>
                  <CardTitle className="text-xl font-bold">{edu.degree}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    {edu.institution}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-muted-foreground">{edu.period}</span>
                  <Badge variant="outline" className="text-xs font-normal">
                    {edu.location}
                  </Badge>
                </div>
                
                {edu.description && (
                  <p className="mb-4 text-muted-foreground">{edu.description}</p>
                )}
                
                {edu.achievements && (
                  <div className="space-y-2 mt-4">
                    <h4 className="text-sm font-medium">Key Achievements</h4>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
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

export default EducationSection;
