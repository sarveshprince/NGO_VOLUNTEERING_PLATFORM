import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calendar, MapPin, Star, TrendingUp, Award, Heart } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const VolunteerMatching = () => {
  const [matches, setMatches] = useState([]);
  const [filters, setFilters] = useState({
    skills: [],
    location: '',
    availability: '',
    causeArea: '',
    minMatchScore: 70
  });
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("username") || "null");

  useEffect(() => {
    fetchMatches();
  }, [filters]);

  const fetchMatches = async () => {
    try {
      // Mock matching algorithm results
      const mockMatches = [
        {
          id: 1,
          title: 'Environmental Conservation Project',
          ngo: 'Green Planet Initiative',
          location: 'Riverside Park',
          date: '2025-10-22',
          matchScore: 95,
          skills: ['Environmental Science', 'Data Collection', 'Community Outreach'],
          causeArea: 'Environment',
          description: 'Join our team in monitoring local wildlife and educating communities about conservation.',
          impact: 'Help protect 500+ acres of natural habitat',
          timeCommitment: '8 hours/week',
          matchReasons: [
            'Your environmental science background is a perfect fit',
            'Location matches your preference',
            'Time commitment aligns with your availability'
          ]
        },
        {
          id: 2,
          title: 'Youth Mentorship & Career Guidance',
          ngo: 'Future Leaders Foundation',
          location: 'Community Center Downtown',
          date: '2025-10-25',
          matchScore: 92,
          skills: ['Teaching', 'Communication', 'Career Counseling'],
          causeArea: 'Education',
          description: 'Mentor high school students exploring career paths and developing professional skills.',
          impact: 'Impact 50+ students annually',
          timeCommitment: '4 hours/week',
          matchReasons: [
            'Your professional experience matches student needs',
            'Communication skills highly valued',
            'Flexible schedule fits your availability'
          ]
        },
        {
          id: 3,
          title: 'Community Food Distribution',
          ngo: 'Hunger Relief Network',
          location: 'West Side Community Kitchen',
          date: '2025-10-20',
          matchScore: 88,
          skills: ['Organization', 'Teamwork', 'Physical Stamina'],
          causeArea: 'Hunger Relief',
          description: 'Assist with sorting, packing, and distributing food to families in need.',
          impact: 'Serve 200+ families weekly',
          timeCommitment: '6 hours/week',
          matchReasons: [
            'Strong organizational skills needed',
            'Team collaboration experience valued',
            'Location within your specified radius'
          ]
        },
        {
          id: 4,
          title: 'Senior Citizen Technology Training',
          ngo: 'Digital Inclusion Project',
          location: 'Senior Living Center',
          date: '2025-10-28',
          matchScore: 85,
          skills: ['Teaching', 'Technology', 'Patience'],
          causeArea: 'Elder Care',
          description: 'Teach seniors how to use smartphones, tablets, and stay connected with loved ones.',
          impact: 'Empower 30+ seniors with digital literacy',
          timeCommitment: '3 hours/week',
          matchReasons: [
            'Tech skills perfectly suited',
            'Teaching experience is a plus',
            'Flexible timing matches your schedule'
          ]
        }
      ];

      // Filter based on minimum match score
      const filtered = mockMatches.filter(m => m.matchScore >= filters.minMatchScore);
      setMatches(filtered);
    } catch (error) {
      toast.error('Failed to fetch matched opportunities');
    }
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-accent';
    if (score >= 80) return 'text-primary';
    return 'text-secondary';
  };

  const getMatchLabel = (score) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 80) return 'Great Match';
    if (score >= 70) return 'Good Match';
    return 'Fair Match';
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Top right: Username and Logout */}
        <div className="flex justify-end items-center mb-4 gap-4">
          <span className="font-semibold text-muted-foreground text-lg">
            {username ? username : "GuestUser"}
          </span>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Smart Volunteer Matching</h1>
          <p className="text-muted-foreground">AI-powered recommendations based on your skills and interests</p>
        </div>

        {/* Filters Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Customize Your Matches</CardTitle>
            <CardDescription>Adjust filters to refine your recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Cause Area</Label>
                <Select value={filters.causeArea} onValueChange={(value) => setFilters({ ...filters, causeArea: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All causes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Causes</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="hunger">Hunger Relief</SelectItem>
                    <SelectItem value="elder">Elder Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location Preference</Label>
                <Input 
                  placeholder="Enter city or zip code"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Availability</Label>
                <Select value={filters.availability} onValueChange={(value) => setFilters({ ...filters, availability: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="mornings">Mornings</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Minimum Match Score: {filters.minMatchScore}%</Label>
                <span className="text-sm text-muted-foreground">Higher score = Better match</span>
              </div>
              <Slider
                value={[filters.minMatchScore]}
                onValueChange={(value) => setFilters({ ...filters, minMatchScore: value[0] })}
                min={50}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Match Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {matches.length} Opportunities Matched
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-primary" />
              Sorted by match score
            </div>
          </div>

          {matches.map((match) => (
            <Card key={match.id} className="hover-scale border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{match.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <Heart className="h-4 w-4" />
                      {match.ngo}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-bold ${getMatchColor(match.matchScore)}`}>
                      {match.matchScore}%
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{getMatchLabel(match.matchScore)}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{match.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-border">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{match.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{match.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Commitment</p>
                      <p className="font-medium">{match.timeCommitment}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {match.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-accent/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-accent" />
                    <p className="font-semibold">Expected Impact</p>
                  </div>
                  <p className="text-sm">{match.impact}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Why this is a great match for you:</p>
                  <ul className="space-y-1">
                    {match.matchReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1">Apply Now</Button>
                  <Button variant="outline">Learn More</Button>
                  <Button variant="outline">Save for Later</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerMatching;
