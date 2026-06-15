
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star } from "lucide-react";

const GITHUB_USER = "siva234";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

const prettyName = (name: string) =>
  name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const ProjectsSection = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data: Repo[]) => {
        const filtered = data
          .filter((r) => !r.fork && !r.archived)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          );
        setRepos(filtered);
        setStatus("done");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Open-source work and experiments, pulled live from my GitHub. Most of my
            professional work is proprietary — happy to walk through it on request.
          </p>
        </div>

        {status === "loading" && (
          <p className="text-center text-muted-foreground">Loading projects from GitHub…</p>
        )}

        {status === "error" && (
          <p className="text-center text-muted-foreground">
            Couldn’t load projects right now. View them directly on{" "}
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              GitHub
            </a>
            .
          </p>
        )}

        {status === "done" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo) => (
              <Card key={repo.id} className="group hover:shadow-lg transition-all duration-300 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between gap-2">
                    <span>{prettyName(repo.name)}</span>
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center text-sm text-muted-foreground font-normal">
                        <Star className="w-4 h-4 mr-1" />
                        {repo.stargazers_count}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {repo.description || "No description provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                    )}
                    {repo.topics?.slice(0, 4).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button asChild size="sm" className="flex-1">
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {status === "done" && (
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                View all on GitHub
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
