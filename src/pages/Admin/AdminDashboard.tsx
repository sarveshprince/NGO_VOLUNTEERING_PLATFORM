import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'sonner';
import { Users, Activity, TrendingUp, Shield } from 'lucide-react';
import StatsCard from './StatsCard';
import UsersTable from './UsersTable';
import CreateUserForm from './CreateUserForm';
import Sidebar from './Sidebar';
import axios from 'axios';
import { User } from '../../api/auth';
import {Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import {Button} from '../../components/ui/button';

interface Stats {
  volunteer: number;
  volunteer_leader: number;
  ngo_coordinator: number;
  program_manager: number;
  admin: number;
  total: number;
}

interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  location: string;
  skills: string;
  dateOfBirth: string;
}

interface NGO {
  id: number;
  organizationName: string;
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  missionStatement?: string;
  description?: string;
  foundedDate?: string;
  verificationStatus: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    volunteer: 0,
    volunteer_leader: 0,
    ngo_coordinator: 0,
    program_manager: 0,
    admin: 0,
    total: 0,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [pendingNGOs, setPendingNGOs] = useState<NGO[]>([]);

  const [newUser, setNewUser] = useState<NewUser>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'VOLUNTEER',
    location: '',
    skills: '',
    dateOfBirth: '',
  });

  const [currentTab, setCurrentTab] = useState('users');

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>('http://localhost:8080/volunteers');
      setUsers(res.data);

      const roleCount = {
        volunteer: 0,
        volunteer_leader: 0,
        ngo_coordinator: 0,
        program_manager: 0,
        admin: 0,
      };

      res.data.forEach((user) => {
        switch (user.role) {
          case 'VOLUNTEER':
            roleCount.volunteer++;
            break;
          case 'VOLUNTEER_LEADER':
            roleCount.volunteer_leader++;
            break;
          case 'NGO_COORDINATOR':
            roleCount.ngo_coordinator++;
            break;
          case 'PROGRAM_MANAGER':
            roleCount.program_manager++;
            break;
          case 'ADMIN':
            roleCount.admin++;
            break;
        }
      });

      setStats({
        ...roleCount,
        total:
          roleCount.volunteer +
          roleCount.volunteer_leader +
          roleCount.ngo_coordinator +
          roleCount.program_manager +
          roleCount.admin,
      });
    } catch {
      toast.error('Failed to fetch users');
    }
  };

  const fetchPendingNGOs = async () => {
    try {
      const res = await axios.get<NGO[]>('http://localhost:8080/ngos');
      setPendingNGOs(res.data);
    } catch {
      toast.error('Failed to fetch pending NGOs');
    }
  };

  const handleApproveNGO = async (id: number) => {
  try {
    await axios.put(`http://localhost:8080/ngos/update/${id}`, {
      verificationStatus: "APPROVED"
    });
    toast.success("NGO approved");
    fetchPendingNGOs();
  } catch (error) {
    console.error(error);
    toast.error("Failed to approve NGO");
  }
};

  const handleRejectNGO = async (id: number) => {
    try {
      await axios.put(`http://localhost:8080/ngos/update/${id}`, {
        verificationStatus: "REJECTED"
      });
      toast.success('NGO rejected');
      fetchPendingNGOs();
    } catch {
      toast.error('Failed to reject NGO');
    }
  };
  const handleDeleteNGO = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/ngos/${id}`);
      toast.success('NGO deleted');
      fetchPendingNGOs();
    } catch {
      toast.error('Failed to delete NGO');
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Delete user?')) {
      try {
        await axios.delete(`http://localhost:8080/volunteers/${id}`);
        toast.success('User deleted');
        fetchUsers();
      } catch {
        toast.error('Failed to delete');
      }
    }
  };

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const payload = {
        username: newUser.username,
        firstName: newUser.firstName || null,
        lastName: newUser.lastName || null,
        email: newUser.email,
        passwordHash: newUser.password,
        role: newUser.role,
        phone: newUser.phone || null,
        location: newUser.location || null,
        skills: newUser.skills || null,
        dateOfBirth: newUser.dateOfBirth || null,
      };

      await axios.post('http://localhost:8080/volunteers', payload);
      toast.success('User created successfully');
      setNewUser({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'VOLUNTEER',
        location: '',
        skills: '',
        dateOfBirth: '',
      });
      fetchUsers();
      setCurrentTab('users');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create user');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPendingNGOs();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar onTabChange={setCurrentTab} currentTab={currentTab} />

      <div className="flex-1 bg-gradient-to-br from-background via-background to-primary/5 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatsCard title="Total Users" value={stats.total} icon={Users} color="text-primary" />
          <StatsCard title="Volunteers" value={stats.volunteer} icon={Activity} color="text-accent" />
          <StatsCard title="NGO Coordinators" value={stats.ngo_coordinator} icon={TrendingUp} color="text-secondary" />
          <StatsCard title="Program Managers" value={stats.program_manager} icon={Shield} color="text-primary" />
          <StatsCard title="Volunteer Leaders" value={stats.volunteer_leader} icon={Users} color="text-accent" />
          <StatsCard title="Administrators" value={stats.admin} icon={Shield} color="text-destructive" />
        </div>

        {currentTab === 'users' && <UsersTable users={users} onDelete={handleDeleteUser} />}
        {currentTab === 'create' && (
          <CreateUserForm newUser={newUser} setNewUser={setNewUser} onSubmit={handleCreateUser} />
        )}

        {currentTab === 'ngos' && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending NGO Registrations</CardTitle>
                <CardDescription>Review and approve NGO applications</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingNGOs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending NGO registrations
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingNGOs.map((ngo) => (
                      <Card key={ngo.id} className="border-2">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl">{ngo.organizationName}</CardTitle>
                              <CardDescription className="mt-1">
                                Founded: {ngo.foundedDate ? new Date(ngo.foundedDate).toLocaleDateString() : 'Not specified'}
                              </CardDescription>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent">
                              {ngo.verificationStatus}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-medium text-muted-foreground">Email:</span>
                              <p className="text-foreground">{ngo.email}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Phone:</span>
                              <p className="text-foreground">{ngo.phoneNumber}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Emergency Contact:</span>
                              <p className="text-foreground">{ngo.emergencyContact}</p>
                            </div>
                          </div>
                          {ngo.missionStatement && (
                            <div className="text-sm">
                              <span className="font-medium text-muted-foreground">Mission:</span>
                              <p className="text-foreground mt-1">{ngo.missionStatement}</p>
                            </div>
                          )}
                          {ngo.description && (
                            <div className="text-sm">
                              <span className="font-medium text-muted-foreground">Description:</span>
                              <p className="text-foreground mt-1">{ngo.description}</p>
                            </div>
                          )}
                          <div className="flex gap-3 pt-3">
                            <Button onClick={() => handleApproveNGO(ngo.id)} className="flex-1">
                              Approve
                            </Button>
                            <Button variant="destructive" onClick={() => handleRejectNGO(ngo.id)} className="flex-1">
                              Reject
                            </Button>
                            <Button variant="destructive" onClick={() => handleDeleteNGO(ngo.id)} className="flex-1">
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
