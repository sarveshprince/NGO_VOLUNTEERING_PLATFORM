import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Mail, Phone, Calendar, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const InputWithIcon = ({
  icon: Icon,
  ...props
}: {
  icon: React.ComponentType<{ className?: string }>;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input className="pl-10" {...props} />
  </div>
);

const NGORegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    phoneNumber: '',
    emergencyContact: '',
    description: '',
    missionStatement: '',
    contactInfo: '',
    foundedDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.organizationName || formData.organizationName.length < 3 || formData.organizationName.length > 100) {
      newErrors.organizationName = 'Organization name must be 3-100 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!formData.emergencyContact || !phoneRegex.test(formData.emergencyContact)) {
      newErrors.emergencyContact = 'Please enter a valid emergency contact (10-15 digits)';
    }

    if (formData.missionStatement.length > 500) {
      newErrors.missionStatement = 'Mission statement cannot exceed 500 characters';
    }

    if (formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    if (formData.contactInfo.length > 500) {
      newErrors.contactInfo = 'Contact info cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        toast.error('You are not logged in');
        return;
      }

      let username: String = '';
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        username = payload.sub;
        if (!username) throw new Error('username not found in token');
      } catch (err) {
        toast.error('Invalid token. Please login again.');
        console.error('Token parsing error:', err);
        return;
      }

      setLoading(true);

      const response = await fetch(`https://ngobackend-production.up.railway.app/register/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      setLoading(false);

      if (response.status === 401) {
        toast.error('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error('Failed to register NGO');
      }

      toast.success('NGO registration submitted successfully! Pending admin approval.');
      setFormData({
        organizationName: '',
        email: '',
        phoneNumber: '',
        emergencyContact: '',
        description: '',
        missionStatement: '',
        contactInfo: '',
        foundedDate: ''
      });

      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setLoading(false);
      console.error('Submission error:', error);
      toast.error('Failed to submit registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Register Your NGO</h1>
            <p className="text-muted-foreground">
              Join our network of organizations making a difference. Your application will be reviewed by our admin team.
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                NGO Registration Form
              </CardTitle>
              <CardDescription>
                Please provide accurate information about your organization. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Name */}
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <InputWithIcon
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Enter your organization name"
                    icon={Building2}
                    required
                    aria-invalid={!!errors.organizationName}
                  />
                  {errors.organizationName && <p className="text-sm text-destructive">{errors.organizationName}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <InputWithIcon
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="organization@example.com"
                    icon={Mail}
                    required
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                {/* Phone Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <InputWithIcon
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+1234567890"
                      icon={Phone}
                      required
                      aria-invalid={!!errors.phoneNumber}
                    />
                    {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                    <InputWithIcon
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="+1234567890"
                      icon={Phone}
                      required
                      aria-invalid={!!errors.emergencyContact}
                    />
                    {errors.emergencyContact && <p className="text-sm text-destructive">{errors.emergencyContact}</p>}
                  </div>
                </div>

                {/* Founded Date */}
                <div className="space-y-2">
                  <Label htmlFor="foundedDate">Founded Date</Label>
                  <InputWithIcon
                    id="foundedDate"
                    name="foundedDate"
                    type="date"
                    value={formData.foundedDate}
                    onChange={handleChange}
                    icon={Calendar}
                  />
                </div>

                {/* Mission Statement */}
                <div className="space-y-2">
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea
                    id="missionStatement"
                    name="missionStatement"
                    value={formData.missionStatement}
                    onChange={handleChange}
                    placeholder="Describe your organization's mission and goals..."
                    rows={3}
                  />
                  {errors.missionStatement && <p className="text-sm text-destructive">{errors.missionStatement}</p>}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Organization Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide details about your organization, activities, and impact..."
                    rows={4}
                  />
                  {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Additional Contact Information</Label>
                  <Textarea
                    id="contactInfo"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    placeholder="Address, website, social media links, etc..."
                    rows={3}
                  />
                  {errors.contactInfo && <p className="text-sm text-destructive">{errors.contactInfo}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <CheckCircle className="mr-2 h-5 w-5" />}
                    {loading ? 'Submitting...' : 'Submit Registration'}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Your registration will be reviewed by our admin team. You'll receive a notification once approved.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NGORegister;
