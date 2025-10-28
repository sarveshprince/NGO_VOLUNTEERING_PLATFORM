import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Users, BookOpen, Sprout, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const { toast } = useToast();
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");

  const predefinedAmounts = ["25", "50", "100", "250"];

  const impactAreas = [
    {
      title: "Community Development",
      description: "Support local communities with essential resources and infrastructure.",
      icon: Users,
    },
    {
      title: "Education Programs",
      description: "Fund educational initiatives and learning opportunities for underserved areas.",
      icon: BookOpen,
    },
    {
      title: "Environmental Projects",
      description: "Contribute to sustainability and environmental conservation efforts.",
      icon: Sprout,
    },
  ];

  const handleDonate = () => {
    const finalAmount = customAmount || amount;
    toast({
      title: "Thank you for your generosity!",
      description: `Your ${donationType} donation of $${finalAmount} will help us grow the volunteering community.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="w-20 h-20 gradient-hero rounded-full flex items-center justify-center mx-auto shadow-glow">
              <Heart className="w-10 h-10 text-white" fill="white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Support Our <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">Mission</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Your donation helps us connect more volunteers with meaningful opportunities and grow our community of changemakers.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="border-border shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Make a Donation</CardTitle>
                  <CardDescription>Choose your donation type and amount</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Donation Type */}
                  <div className="space-y-3">
                    <Label>Donation Type</Label>
                    <RadioGroup value={donationType} onValueChange={setDonationType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time" className="cursor-pointer">One-time donation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="cursor-pointer">Monthly donation</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <Label>Select Amount</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {predefinedAmounts.map((amt) => (
                        <Button
                          key={amt}
                          variant={amount === amt && !customAmount ? "default" : "outline"}
                          onClick={() => {
                            setAmount(amt);
                            setCustomAmount("");
                          }}
                          className="h-16 text-lg"
                        >
                          <DollarSign className="w-4 h-4 mr-1" />
                          {amt}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-3">
                    <Label htmlFor="custom-amount">Or Enter Custom Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount("");
                        }}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold">Donor Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    size="lg"
                    className="w-full gradient-hero text-white"
                    onClick={handleDonate}
                  >
                    <Heart className="w-5 h-5 mr-2" fill="white" />
                    Donate ${customAmount || amount}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Impact Areas */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                  <CardDescription>Where your donation goes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {impactAreas.map((area, index) => {
                    const Icon = area.icon;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{area.title}</h4>
                          <p className="text-sm text-muted-foreground">{area.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="border-border bg-muted">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">100%</div>
                    <p className="text-sm text-muted-foreground">
                      of your donation goes directly to supporting our volunteer community and partner NGOs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Your Donation Matters
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your contribution helps us maintain and improve our platform, making it easier for volunteers 
              and NGOs to connect and create lasting impact in communities worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-2">$25</div>
                  <p className="text-sm text-muted-foreground">
                    Supports platform maintenance for one month
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-2">$100</div>
                  <p className="text-sm text-muted-foreground">
                    Helps onboard 10 new NGOs to our platform
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-2">$250</div>
                  <p className="text-sm text-muted-foreground">
                    Funds training programs for volunteer coordinators
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;