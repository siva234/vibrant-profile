
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 50);
    
    // Update active section based on scroll position
    const sections = ["home", "about", "skills", "experience", "projects", "contact"];
    for (const section of sections.reverse()) {
      const element = document.getElementById(section);
      if (element && scrollPosition >= element.offsetTop - 200) {
        setActiveSection(section);
        break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          Portfolio
        </a>

        <nav className="hidden md:flex space-x-1">
          {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map((item) => {
            const sectionId = item.toLowerCase();
            return (
              <a
                key={sectionId}
                href={`#${sectionId}`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === sectionId
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(sectionId);
                }}
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
