import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Heart, TrendingUp, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:8080";

const VolunteerDashboard = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [hours, setHours] = useState<{ total: number; thisMonth: number; thisYear: number }>({ total: 0, thisMonth: 0, thisYear: 0 });
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("username") || "null");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch recommendations (opportunities)
      const resOpp = await fetch(`${API_BASE}/opportunities`);
      const opportunities = await resOpp.json();
      setRecommendations(Array.isArray(opportunities) ? opportunities : []);

      // Optionally, fetch applications and hours from backend if available
      // setApplications(await (await fetch(`${API_BASE}/applications`)).json());
      // setHours(await (await fetch(`${API_BASE}/volunteer/hours`)).json());
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
      setRecommendations([]);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: 'bg-accent/10 text-accent',
      pending: 'bg-secondary/10 text-secondary',
      rejected: 'bg-destructive/10 text-destructive'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Top right: Username and Logout */}
      <div className="container mx-auto px-4 pt-4 flex justify-end items-center gap-4">
        <span className="font-semibold text-muted-foreground text-lg">
          {username ? username : "GuestUser"}
        </span>
        <Button variant="destructive" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Volunteer Dashboard</h1>
          <p className="text-muted-foreground">Your personalized volunteer journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary">{hours.total}</div>
                <Clock className="h-8 w-8 text-primary/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Lifetime contribution</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-accent">{hours.thisMonth}</div>
                <TrendingUp className="h-8 w-8 text-accent/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Hours volunteered</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-secondary">{hours.thisYear}</div>
                <Award className="h-8 w-8 text-secondary/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Annual impact</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="mt-6 space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Opportunities Matched For You</h2>
              <p className="text-muted-foreground">Based on your skills and interests</p>
            </div>

            {recommendations.map((opp) => (
              <Card key={opp.id} className="hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">{opp.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        {opp.ngo}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-primary font-semibold">
                      {opp.matchScore}% Match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{opp.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{opp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{opp.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                      {(opp.skills ?? []).map((skill, idx) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                      ))}
                  </div>


                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="applications" className="mt-6 space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">My Applications</h2>
              <p className="text-muted-foreground">Track your volunteer applications</p>
            </div>

            {applications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">{app.opportunity}</CardTitle>
                      <CardDescription>{app.ngo}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Applied Date</p>
                      <p className="font-medium">{app.appliedDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Start Date</p>
                      <p className="font-medium">{app.startDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
