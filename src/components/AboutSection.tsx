import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg">
              Dynamic full-stack developer with eight years of experience driving impactful web applications and
              tools across diverse industries. Proficient in front-end and back-end technologies such as React,
              TypeScript, and Node.js, delivering solutions that enhance user experience and operational efficiency.
              Adept in Agile and DevOps methodologies, demonstrating strong leadership through team training and
              process improvement initiatives. Committed to continuous learning and adapting to new technologies, contributing to innovative project outcomes while fostering collaborative team environments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">8+</h3>
                <p className="text-foreground/70">Years Experience</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">15+</h3>
                <p className="text-foreground/70">Projects Completed</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">5</h3>
                <p className="text-foreground/70">Industries Served</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">10+</h3>
                <p className="text-foreground/70">Technologies Mastered</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">4</h3>
                <p className="text-foreground/70">Languages</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
