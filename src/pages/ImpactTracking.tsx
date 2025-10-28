import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Users, Clock, Heart, Award, Target, Globe, Calendar } from 'lucide-react';
import { getImpactDashboard } from '@/api/auth';

const ImpactTracking = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [impactData, setImpactData] = useState({
    totalVolunteers: 0,
    totalHours: 0,
    livesImpacted: 0,
    projectsCompleted: 0,
    activeProjects: 0,
    volunteerRetention: 0,
    averageHoursPerVolunteer: 0,
    topCauseAreas: []
  });

  useEffect(() => {
    fetchImpactData();
  }, [timeframe]);

  const fetchImpactData = async () => {
    try {
      const mockData = {
        totalVolunteers: 1247,
        totalHours: 18540,
        livesImpacted: 45230,
        projectsCompleted: 87,
        activeProjects: 23,
        volunteerRetention: 78,
        averageHoursPerVolunteer: 14.8,
        topCauseAreas: [
          { name: 'Education', volunteers: 342, hours: 5120, impact: '12,400 students' },
          { name: 'Environment', volunteers: 298, hours: 4560, impact: '850 acres protected' },
          { name: 'Health', volunteers: 267, hours: 3890, impact: '8,900 patients served' },
          { name: 'Hunger Relief', volunteers: 189, hours: 2780, impact: '15,600 meals' },
          { name: 'Elder Care', volunteers: 151, hours: 2190, impact: '3,200 seniors supported' }
        ],
        monthlyTrends: [
          { month: 'Apr', volunteers: 980, hours: 14200 },
          { month: 'May', volunteers: 1050, hours: 15600 },
          { month: 'Jun', volunteers: 1120, hours: 16800 },
          { month: 'Jul', volunteers: 1180, hours: 17500 },
          { month: 'Aug', volunteers: 1247, hours: 18540 }
        ],
        recentProjects: [
          {
            name: 'Clean Water Initiative',
            volunteers: 45,
            hours: 680,
            impact: '2,340 families with clean water access',
            status: 'completed',
            date: '2025-09-15'
          },
          {
            name: 'Community Library Program',
            volunteers: 32,
            hours: 512,
            impact: '1,200 children with library access',
            status: 'active',
            date: '2025-08-20'
          },
          {
            name: 'Homeless Shelter Support',
            volunteers: 56,
            hours: 892,
            impact: '850 individuals housed',
            status: 'completed',
            date: '2025-09-01'
          }
        ]
      };
      setImpactData(mockData);
    } catch (error) {
      console.error('Failed to fetch impact data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Impact Tracking Dashboard</h1>
            <p className="text-muted-foreground">Measure and visualize your social impact</p>
          </div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-primary">{impactData.totalVolunteers.toLocaleString()}</div>
                  <p className="text-xs text-accent mt-1">↑ 12% from last period</p>
                </div>
                <Users className="h-10 w-10 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-accent">{impactData.totalHours.toLocaleString()}</div>
                  <p className="text-xs text-accent mt-1">↑ 18% from last period</p>
                </div>
                <Clock className="h-10 w-10 text-accent/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lives Impacted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-secondary">{impactData.livesImpacted.toLocaleString()}</div>
                  <p className="text-xs text-accent mt-1">↑ 24% from last period</p>
                </div>
                <Heart className="h-10 w-10 text-secondary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Projects Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-primary">{impactData.projectsCompleted}</div>
                  <p className="text-xs text-muted-foreground mt-1">{impactData.activeProjects} active</p>
                </div>
                <Award className="h-10 w-10 text-primary/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="causes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="causes">By Cause Area</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="causes" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Impact by Cause Area</CardTitle>
                <CardDescription>Breakdown of volunteer engagement across different causes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {impactData.topCauseAreas.map((cause, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-12 rounded-full ${idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-accent' : 'bg-secondary'}`} />
                        <div>
                          <h3 className="font-semibold text-lg">{cause.name}</h3>
                          <p className="text-sm text-muted-foreground">{cause.impact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{cause.volunteers}</p>
                        <p className="text-xs text-muted-foreground">volunteers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-5 pl-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{cause.hours.toLocaleString()} hours</span>
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${(cause.volunteers / impactData.totalVolunteers) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Volunteer Growth Trends
                </CardTitle>
                <CardDescription>Track volunteer engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 rounded-lg bg-primary/5">
                      <p className="text-sm text-muted-foreground mb-1">Retention Rate</p>
                      <p className="text-3xl font-bold text-primary">{impactData.volunteerRetention}%</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-accent/5">
                      <p className="text-sm text-muted-foreground mb-1">Avg Hours/Volunteer</p>
                      <p className="text-3xl font-bold text-accent">{impactData.averageHoursPerVolunteer}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/5">
                      <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
                      <p className="text-3xl font-bold text-secondary">{impactData.activeProjects}</p>
                    </div>
                  </div>

                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <p className="text-muted-foreground">Monthly trend chart visualization would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Impact summary of recent volunteer projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {impactData.recentProjects?.map((project, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {project.date}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                      }`}>
                        {project.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Volunteers</p>
                        <p className="text-xl font-bold text-primary">{project.volunteers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Hours</p>
                        <p className="text-xl font-bold text-accent">{project.hours}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Impact</p>
                        <p className="text-sm font-medium">{project.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ImpactTracking;
