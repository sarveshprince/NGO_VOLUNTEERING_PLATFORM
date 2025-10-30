import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Users, TrendingUp, Target, Calendar, Award, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://ngobackend-production.up.railway.app';

const ProgramManagerDashboard = () => {
  const [impactData, setImpactData] = useState({
    totalVolunteers: 0,
    activeProjects: 0,
    totalHours: 0,
    livesImpacted: 0
  });
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("username") || "null");

  

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const mockImpact = {
        totalVolunteers: 342,
        activeProjects: 18,
        totalHours: 8456,
        livesImpacted: 12500
      };

      const mockProjects = [
        {
          id: 1,
          name: 'Clean Water Initiative',
          status: 'active',
          volunteers: 45,
          progress: 67,
          impact: '2,340 families',
          budget: '$45,000',
          spent: '$31,200'
        },
        {
          id: 2,
          name: 'Education For All',
          status: 'active',
          volunteers: 78,
          progress: 82,
          impact: '1,200 students',
          budget: '$28,000',
          spent: '$23,400'
        }
      ];

      setImpactData(mockImpact);
      setProjects(mockProjects);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    }
  };
  const handleLogout = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
      navigate('/login');
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Program Manager Dashboard</h1>
          <p className="text-muted-foreground">Strategic oversight and program management</p>
          <div className="mb-4 font-bold text-xl text-muted-foreground">{username ? username : "GuestUser"}</div>

          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary">{impactData.totalVolunteers}</div>
                <Users className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-accent">{impactData.activeProjects}</div>
                <Target className="h-8 w-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-secondary">{impactData.totalHours.toLocaleString()}</div>
                <Calendar className="h-8 w-8 text-secondary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lives Impacted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary">{impactData.livesImpacted.toLocaleString()}</div>
                <Award className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Overview */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Active Projects</h2>
                <p className="text-muted-foreground">Manage and monitor all programs</p>
              </div>
              <Button>
                <Target className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>

            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.volunteers} volunteers assigned
                      </CardDescription>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent font-medium">
                      {project.status.toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Impact</p>
                        <p className="font-semibold">{project.impact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Budget</p>
                        <p className="font-semibold">{project.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Spent</p>
                        <p className="font-semibold">{project.spent}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Program Analytics
                </CardTitle>
                <CardDescription>Comprehensive program performance insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <p className="text-muted-foreground">Analytics charts will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Impact Reports</CardTitle>
                <CardDescription>Generate and download detailed reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Download Monthly Impact Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download Volunteer Engagement Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download Financial Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download Custom Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgramManagerDashboard;
