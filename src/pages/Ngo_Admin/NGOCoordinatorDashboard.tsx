import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Calendar, Users, MapPin, Clock, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8080';

const NGOCoordinatorDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    requiredSkills: '',
    maxVolunteers: 10,
    status: 'PUBLISHED',
    theme: '',
    timeCommitment: '',
    hours: '',
    daySchedule: '', // <-- add daySchedule field
    customDays:''
  });
  const [ngoProfileId, setNgoProfileId] = useState<number | null>(null);

  const navigate = useNavigate();

  // Get username from localStorage
  const username = JSON.parse(localStorage.getItem("username") || "null");

  // Fetch NGOProfile for the logged-in user
  useEffect(() => {
    const fetchNgoProfile = async () => {
      if (!username) return;
      try {
        // Assuming you have an endpoint like /ngos/user/{username}
        // If not, fetch all and filter, or adjust as per your backend
        const res = await axios.get(`http://localhost:8080/ngos`);
        const ngo = res.data.find((n: any) => n.user && n.user.username === username);
        if (ngo && ngo.id) setNgoProfileId(ngo.id);
      } catch {
        toast.error("Failed to fetch NGO profile");
      }
    };
    fetchNgoProfile();
    fetchData();
  }, [username]);

  // ✅ Fetch opportunities from backend
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/opportunities`);
      setOpportunities(res.data);
    } catch (error) {
      toast.error('Failed to fetch opportunities');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Create opportunity (store in DB)
  const handleCreateOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ngoProfileId) {
      toast.error("NGO Profile not found. Cannot create opportunity.");
      return;
    }
    try {
      let timeCommitment = newOpportunity.timeCommitment;
      // Append hours if needed
      if (
        (timeCommitment === "Hour" || timeCommitment === "Hours/Week") &&
        newOpportunity.hours
      ) {
        timeCommitment = `${newOpportunity.hours} ${timeCommitment}`;
      }
      let daySchedule = newOpportunity.daySchedule;
      if (daySchedule === "Custom" && newOpportunity.customDays) {
        daySchedule = newOpportunity.customDays;
      }
      await axios.post(`${API_BASE}/opportunities`, {
        ...newOpportunity,
        ngcid: ngoProfileId,
        status: newOpportunity.status || 'PUBLISHED',
        theme: newOpportunity.theme,
        timeCommitment,
        daySchedule // send the computed daySchedule string
      });
      toast.success('Opportunity created successfully');
      setIsCreateDialogOpen(false);
      setNewOpportunity({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        requiredSkills: '',
        maxVolunteers: 10,
        status: 'PUBLISHED',
        theme: '',
        timeCommitment: '',
        hours: '',
        daySchedule: '',
        customDays: ''
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to create opportunity');
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // ✅ Handle mock application actions (can integrate backend later)
  const handleApplicationAction = (appId: number, action: string) => {
    toast.success(`Application ${action}`);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">NGO Coordinator Dashboard</h1>
            <p className="text-muted-foreground">Manage volunteer opportunities and applications</p>
          </div>
          <div className="mb-4 font-bold text-xl text-muted-foreground">{username ? username : "GuestUser"}</div>

          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary">{opportunities.length}</div>
                <Calendar className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-accent">
                  {applications.filter(a => a.status === 'pending').length}
                </div>
                <Users className="h-8 w-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-secondary">
                  {opportunities.reduce((sum, opp: any) => sum + (opp.applicants || 0), 0)}
                </div>
                <Users className="h-8 w-8 text-secondary/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="opportunities">My Opportunities</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          {/* Opportunities */}
          <TabsContent value="opportunities" className="mt-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Volunteer Opportunities</h2>
                <p className="text-muted-foreground">Create and manage opportunities</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Opportunity
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Opportunity</DialogTitle>
                    <DialogDescription>Add a new volunteer opportunity for your organization</DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleCreateOpportunity} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <select
                        id="theme"
                        value={newOpportunity.theme}
                        onChange={e => setNewOpportunity({ ...newOpportunity, theme: e.target.value })}
                        className="w-full p-2 border rounded-md bg-gray-100"
                        required
                      >
                        <option value="">Select theme</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Environment">Environment</option>
                        <option value="Community Service">Community Service</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newOpportunity.title}
                        onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newOpportunity.description}
                        onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newOpportunity.location}
                          onChange={(e) => setNewOpportunity({ ...newOpportunity, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxVolunteers">Max Volunteers</Label>
                        <Input
                          id="maxVolunteers"
                          type="number"
                          value={newOpportunity.maxVolunteers}
                          onChange={(e) => setNewOpportunity({ ...newOpportunity, maxVolunteers: parseInt(e.target.value) })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newOpportunity.startDate}
                          onChange={(e) => setNewOpportunity({ ...newOpportunity, startDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={newOpportunity.endDate}
                          onChange={(e) => setNewOpportunity({ ...newOpportunity, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeCommitment">Time Commitment</Label>
                      <select
                        id="timeCommitment"
                        value={newOpportunity.timeCommitment}
                        onChange={e => setNewOpportunity({ ...newOpportunity, timeCommitment: e.target.value, hours: '' })}
                        className="w-full p-2 border rounded-md bg-gray-100"
                        required
                      >
                        <option value="">Select time commitment</option>
                        <option value="Half Day">Half Day</option>
                        <option value="Full Day">Full Day</option>
                        <option value="Hour">Hour</option>
                        <option value="Hours/Week">Hours/Week</option>
                      </select>
                    </div>
                    {/* Show hours input if needed */}
                    {(newOpportunity.timeCommitment === "Hour" || newOpportunity.timeCommitment === "Hours/Week") && (
                      <div className="space-y-2">
                        <Label htmlFor="hours">
                          {newOpportunity.timeCommitment === "Hour"
                            ? "Number of Hours"
                            : "Number of Hours/Week"}
                        </Label>
                        <Input
                          id="hours"
                          type="number"
                          min={1}
                          value={newOpportunity.hours}
                          onChange={e => setNewOpportunity({ ...newOpportunity, hours: e.target.value })}
                          placeholder={
                            newOpportunity.timeCommitment === "Hour"
                              ? "Enter number of hours"
                              : "Enter number of hours per week"
                          }
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="requiredSkills">Required Skills</Label>
                      <Input
                        id="requiredSkills"
                        value={newOpportunity.requiredSkills}
                        onChange={(e) => setNewOpportunity({ ...newOpportunity, requiredSkills: e.target.value })}
                        placeholder="e.g., Communication, Teamwork"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="daySchedule">Day Schedule</Label>
                      <select
                        id="daySchedule"
                        value={newOpportunity.daySchedule}
                        onChange={e => setNewOpportunity({ ...newOpportunity, daySchedule: e.target.value })}
                        className="w-full p-2 border rounded-md bg-gray-100"
                        required
                      >
                        <option value="">Select schedule</option>
                        <option value="Flexible">Flexible</option>
                        <option value="Every Weekend">Every Weekend</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Custom">Custom (specify below)</option>
                      </select>
                    </div>
                    {/* If Custom, allow entering multiple days */}
                    {newOpportunity.daySchedule === "Custom" && (
                      <div className="space-y-2">
                        <Label htmlFor="customDays">Enter Days (comma separated)</Label>
                        <Input
                          id="customDays"
                          value={newOpportunity.customDays || ''}
                          onChange={e => setNewOpportunity({ ...newOpportunity, customDays: e.target.value })}
                          placeholder="e.g., Monday, Wednesday, Friday"
                          required
                        />
                      </div>
                    )}

                    <Button type="submit" className="w-full">Create Opportunity</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {opportunities.map((opp: any) => (
              <Card key={opp.id}>
                <CardHeader>
                  <CardTitle>{opp.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {opp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {opp.startDate}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Applicants</p>
                        <p className="text-2xl font-bold text-primary">
                          {opp.applicants || 0}/{opp.maxVolunteers}
                        </p>
                      </div>
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${((opp.applicants || 0) / opp.maxVolunteers) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Applications */}
          <TabsContent value="applications" className="mt-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Volunteer Applications</h2>
            {applications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{app.volunteerName}</CardTitle>
                      <CardDescription className="mt-1">
                        Applied for: {app.opportunityTitle}
                      </CardDescription>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs bg-secondary/10 text-secondary font-medium">
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Applied on {app.appliedDate}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApplicationAction(app.id, 'approved')}>Approve</Button>
                      <Button variant="outline" size="sm" onClick={() => handleApplicationAction(app.id, 'rejected')}>Reject</Button>
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

export default NGOCoordinatorDashboard;
