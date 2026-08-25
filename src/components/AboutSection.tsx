import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg">
              I am a full-stack developer in Stockholm with just over eight years of experience. Most of my work
              has been in React and TypeScript on the front end, with Node, Java and Python behind it, and I am
              comfortable handling my own deployments on AWS and Azure. I have worked in telecom, industrial IoT,
              fintech, gaming and now restaurant SaaS.
            </p>
            <p className="text-lg">
              At Qopla I am building an internal CRM from scratch. I am the product owner and the developer on it,
              so I decide what gets built and then build it. It is in production with real customer data. Before
              that I was lead developer in a team of 22 at Telia, where I onboarded new engineers and did a lot of
              the code review. In 2025 I ran my own game project, hired a small team and took it to soft launch
              beta before the investor withdrew.
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
