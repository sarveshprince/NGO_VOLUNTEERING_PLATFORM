import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Users, Calendar, Search } from "lucide-react";

const API_BASE = "http://localhost:8080";

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [opportunities, setOpportunities] = useState<any[]>([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await fetch(`${API_BASE}/opportunities`);
        const data = await res.json();
        setOpportunities(data);
      } catch {
        setOpportunities([]);
      }
    };
    fetchOpportunities();
  }, []);

  const categories = ["all", "Environment", "Education", "Healthcare", "Community Service"];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      (opp.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      categoryFilter === "all" ||
      (opp.theme && opp.theme === categoryFilter) ||
      (opp.category && opp.category === categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Volunteer Opportunities
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover meaningful ways to make a difference in your community
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="gradient-card border-border hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{opportunity.theme || opportunity.category}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{opportunity.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    {opportunity.ngo || opportunity.organizationName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {opportunity.timeCommitment || opportunity.duration}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {opportunity.daySchedule || opportunity.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      {opportunity.maxVolunteers
                        ? `${opportunity.maxVolunteers} volunteers needed`
                        : opportunity.volunteers}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(opportunity.requiredSkills
                      ? opportunity.requiredSkills.split(",")
                      : opportunity.skills || []
                    ).map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="hero" className="w-full">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No opportunities found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Opportunities;
