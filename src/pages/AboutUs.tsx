import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Target, Award, Globe, HandHeart } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  const values = [
    {
      title: "Community First",
      description: "We believe in the power of community and collective action to create lasting change.",
      icon: Users,
    },
    {
      title: "Impact Driven",
      description: "Every action counts. We track and measure the real impact volunteers make in communities.",
      icon: Target,
    },
    {
      title: "Global Reach",
      description: "Connecting volunteers and NGOs across borders to address local and global challenges.",
      icon: Globe,
    },
    {
      title: "Recognition Matters",
      description: "We celebrate and acknowledge the dedication and contributions of every volunteer.",
      icon: Award,
    },
  ];

  const team = [
    {
      name: "Our Mission",
      description: "To connect passionate volunteers with meaningful opportunities and empower NGOs to maximize their impact.",
      icon: Target,
    },
    {
      name: "Our Vision",
      description: "A world where everyone has the opportunity to contribute to causes they care about and create positive change.",
      icon: Heart,
    },
    {
      name: "Our Approach",
      description: "Using technology to bridge the gap between volunteers and organizations, making social impact accessible to all.",
      icon: HandHeart,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              About <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">VolunteerHub</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We're on a mission to make volunteering accessible, impactful, and rewarding for everyone. 
              Join us in building stronger communities through meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Approach */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="gradient-card border-border hover:shadow-glow transition-smooth">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription className="text-base">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              These principles guide everything we do and shape the community we're building together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-border hover:shadow-elegant transition-smooth">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                    <CardDescription className="text-sm">{value.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Growing Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Together, we're creating meaningful change across communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">50K+</div>
              <div className="text-sm text-muted-foreground">Active Volunteers</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">1.2K+</div>
              <div className="text-sm text-muted-foreground">NGO Partners</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">800+</div>
              <div className="text-sm text-muted-foreground">Communities</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">2M+</div>
              <div className="text-sm text-muted-foreground">Hours Contributed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="gradient-hero text-white border-0 shadow-glow">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Be part of a global movement dedicated to creating positive change. Start your volunteering journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="accent"
                  onClick={() => navigate("/register")}
                  className="text-lg px-8"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/opportunities")}
                  className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Browse Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;