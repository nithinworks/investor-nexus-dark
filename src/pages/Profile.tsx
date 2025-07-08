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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save, User, Mail, Calendar, CreditCard } from "lucide-react";
import { format } from "date-fns";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type Profile = Tables<"profiles">;

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = () => {
    // For now, we don't have editable fields in the current profile structure
    // This would be where we'd call updateProfileMutation.mutate() with form data
    setIsEditing(false);
    toast({
      title: "Info",
      description: "No editable fields available in current profile structure.",
    });
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
                  {user?.email?.[0].toUpperCase()}
                </div>
                <CardTitle className="text-xl">{user?.email}</CardTitle>
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
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Your basic account details
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label className="text-white/80">Subscription</Label>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`${
                          profile.subscription_tier === 'pro' 
                            ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-300 border-yellow-500/30' 
                            : 'bg-white/10 text-white/80 border-white/20'
                        }`}
                      >
                        {profile.subscription_tier === 'pro' ? 'Pro Plan' : 'Free Plan'}
                      </Badge>
                      {profile.subscription_tier === 'free' && (
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                        >
                          Upgrade
                        </Button>
                      )}
                    </div>
                  </div>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;