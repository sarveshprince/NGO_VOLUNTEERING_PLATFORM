import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import Chatbot from "@/components/Chatbot";
import { Heart, Users, Target, TrendingUp, MapPin, Clock, Award, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-volunteering.jpg";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Volunteers", value: "50,000+", icon: Users },
    { label: "NGO Partners", value: "1,200+", icon: Heart },
    { label: "Communities Served", value: "800+", icon: MapPin },
    { label: "Hours Contributed", value: "2M+", icon: Clock },
  ];

  const features = [
    {
      title: "Find Your Passion",
      description: "Discover volunteer opportunities that align with your skills, interests, and availability.",
      icon: Target,
    },
    {
      title: "Track Your Impact",
      description: "Monitor your volunteer hours and see the real difference you're making in communities.",
      icon: TrendingUp,
    },
    {
      title: "Earn Recognition",
      description: "Get certificates, badges, and acknowledgment for your volunteer contributions.",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-semibold">
                  Make a Difference Today
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Lives Through
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"> Volunteering</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Connect with meaningful opportunities, track your impact, and join a community of changemakers dedicated to creating a better world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="hero" onClick={() => navigate("/opportunities")} className="group">
                  Explore Opportunities
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/NGORegister")} className="group">
                  Register Your NGO
                </Button>
                <Button size="lg" variant="secondary" onClick={() => navigate("/donate")} className="group">
                  <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Donate
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-glow">
                <img
                  src={heroImage}
                  alt="Volunteers making a difference in their community"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 gradient-impact rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center mx-auto shadow-elegant">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose VolunteerHub?
            </h2>
            <p className="text-lg text-muted-foreground">
              We provide the tools and connections you need to make meaningful contributions to causes you care about.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="gradient-card border-border hover:shadow-glow transition-smooth">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="gradient-hero text-white border-0 shadow-glow">
            <CardContent className="p-8 md:p-12 text-center">
              <Heart className="w-16 h-16 mx-auto mb-6" fill="white" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Make an Impact?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of volunteers creating positive change in communities around the world. Your journey starts here.
              </p>
              <Button
                size="lg"
                variant="accent"
                onClick={() => navigate("/register")}
                className="group text-lg px-8"
              >
                Start Volunteering Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
