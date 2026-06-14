import { GraduationCap, School, University } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    degree: "Masters in Computer Science",
    institution: "Blekinge Institute of Technology",
    period: "2015 - 2017",
    location: "Karlskrona, Sweden",
    description: "Specialized in Computer Science with topics like AI, Machine Learning and Software Security.",
    achievements: [
      "Industrial thesis with Ericsson on backward-compatibility check tools analysis",
      "Participated in events like India Day at BTH",
      "Part of the hockey team in the KIDS club and played in tournaments",
      "Selected by BTH on credit merit for industrial training at Softhouse AB"
    ],
    icon: "university",
    watermarkImage: "https://www.bth.se/wp-content/uploads/2023/03/0C8A7887_spotbild-475x310.jpg"
  },
  {
    degree: "Bachelors in Computer Science",
    institution: "Jawaharlal Nehru Technological University, Kakinada",
    period: "2011 - 2014",
    location: "Kakinada, India",
    description: "Computer Science and Engineering, covering topics like C, Java, web technologies, cyber security and computer architecture.",
    achievements: [
      "Undergraduate thesis on a secured login system using visual cryptography",
      "Active member of voluntary clubs like Rotaract and the Carbon Credit Club",
      "Student leader for the gaming section in college tech fests for 2 years"
    ],
    icon: "graduation",
    watermarkImage: "https://media.licdn.com/dms/image/v2/C5622AQHMjwOOZbehDQ/feedshare-shrink_800/feedshare-shrink_800/0/1679032857623?e=2147483647&v=beta&t=oi367-MPrMKjNF0bOMOkwo_jUTXhngVpvEW3Ug_DvPw&auto=format&fit=crop&q=80"
  }
];

const EducationSection = () => {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Section Background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: "url('https://us.almawq3.com/wp-content/uploads/2024/10/Pros-and-Cons-of-Using-Education-Technology.png')",
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
