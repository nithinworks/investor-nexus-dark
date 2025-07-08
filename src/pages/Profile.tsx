import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save, User, Mail, Calendar, CreditCard, Lock, Phone, Building } from "lucide-react";
import { format } from "date-fns";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type Profile = Tables<"profiles">;

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    company: "",
    bio: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Fetch user profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user,
  });

  // Initialize form data when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        company: profile.company || "",
        bio: profile.bio || "",
      });
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user!.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async ({ newPassword }: { newPassword: string }) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordChange(false);
      toast({
        title: "Success",
        description: "Password updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    updateProfileMutation.mutate(formData);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    changePasswordMutation.mutate({ newPassword: passwordData.newPassword });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black font-satoshi">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Profile Not Found</h1>
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const displayName = profile.first_name && profile.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : user?.email;

  return (
    <div className="min-h-screen bg-black font-satoshi">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            <p className="text-white/60 mt-1">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 text-white">
              <CardHeader className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 mx-auto flex items-center justify-center text-2xl font-bold text-white">
                  {profile.first_name ? profile.first_name[0].toUpperCase() : user?.email?.[0].toUpperCase()}
                </div>
                <CardTitle className="text-xl">{displayName}</CardTitle>
                <p className="text-white/60 text-sm">{profile.email}</p>
                <div className="flex justify-center">
                  <Badge 
                    variant="secondary" 
                    className={`${
                      profile.subscription_tier === 'pro' 
                        ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-300 border-yellow-500/30' 
                        : 'bg-white/10 text-white/80 border-white/20'
                    }`}
                  >
                    {profile.subscription_tier === 'pro' ? 'Pro Member' : 'Free Member'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {format(new Date(profile.created_at), 'MMM yyyy')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <CreditCard className="h-4 w-4" />
                  <span>{profile.access_used || 0} / {profile.access_limit || 0} contacts revealed</span>
                </div>
                {profile.company && (
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <Building className="h-4 w-4" />
                    <span>{profile.company}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Your personal details and bio
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-white/80">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      type="text"
                      value={isEditing ? formData.first_name : (profile.first_name || '')}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      disabled={!isEditing}
                      className="backdrop-blur-sm bg-white/5 border-white/20 text-white disabled:text-white/60 disabled:cursor-not-allowed focus:border-red-400"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-white/80">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      type="text"
                      value={isEditing ? formData.last_name : (profile.last_name || '')}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      disabled={!isEditing}
                      className="backdrop-blur-sm bg-white/5 border-white/20 text-white disabled:text-white/60 disabled:cursor-not-allowed focus:border-red-400"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white/80 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={isEditing ? formData.phone : (profile.phone || '')}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="backdrop-blur-sm bg-white/5 border-white/20 text-white disabled:text-white/60 disabled:cursor-not-allowed focus:border-red-400"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white/80 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Company
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      value={isEditing ? formData.company : (profile.company || '')}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      disabled={!isEditing}
                      className="backdrop-blur-sm bg-white/5 border-white/20 text-white disabled:text-white/60 disabled:cursor-not-allowed focus:border-red-400"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white/80">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={isEditing ? formData.bio : (profile.bio || '')}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className="backdrop-blur-sm bg-white/5 border-white/20 text-white disabled:text-white/60 disabled:cursor-not-allowed focus:border-red-400 min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="backdrop-blur-sm bg-white/5 border-white/20 text-white/60 cursor-not-allowed"
                  />
                  <p className="text-xs text-white/40">Email cannot be changed</p>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Button
                      onClick={handleSave}
                      disabled={updateProfileMutation.isPending}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-white/60">
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showPasswordChange ? (
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordChange(true)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Change Password
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-white/80">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="backdrop-blur-sm bg-white/5 border-white/20 text-white focus:border-red-400"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white/80">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="backdrop-blur-sm bg-white/5 border-white/20 text-white focus:border-red-400"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={handlePasswordChange}
                        disabled={changePasswordMutation.isPending}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      >
                        {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowPasswordChange(false);
                          setPasswordData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                        }}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription className="text-white/60">
                  Your current usage and limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Contact Reveals</span>
                    <span className="text-white/60">
                      {profile.access_used || 0} / {profile.access_limit || 0}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          ((profile.access_used || 0) / (profile.access_limit || 1)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                {profile.access_reset_date && (
                  <p className="text-xs text-white/60">
                    Resets on {format(new Date(profile.access_reset_date), 'MMM dd, yyyy')}
                  </p>
                )}
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white/80 font-medium">Subscription Plan</p>
                      <p className="text-white/60 text-sm">
                        {profile.subscription_tier === 'pro' ? 'Pro Plan' : 'Free Plan'}
                      </p>
                    </div>
                    {profile.subscription_tier === 'free' && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      >
                        Upgrade to Pro
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;