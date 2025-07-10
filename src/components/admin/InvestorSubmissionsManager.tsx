
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X, Eye, Calendar, MapPin, DollarSign, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface InvestorSubmission {
  id: string;
  name: string;
  bio: string;
  company: string;
  company_url: string;
  contact: string;
  contact_type: string;
  location: string;
  funding_type: string;
  funding_stage: string;
  funding_industries: string[];
  funding_description: string;
  check_sizes: string;
  image_url: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at: string;
  reviewed_by: string;
}

const InvestorSubmissionsManager = () => {
  const [submissions, setSubmissions] = useState<InvestorSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("investor_submissions")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setSubmissions((data || []) as InvestorSubmission[]);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submission: InvestorSubmission) => {
    setProcessingIds(prev => new Set(prev).add(submission.id));
    
    try {
      // First, add to investors table
      const { error: insertError } = await supabase
        .from("investors")
        .insert({
          name: submission.name,
          bio: submission.bio,
          company: submission.company,
          company_url: submission.company_url,
          contact: submission.contact,
          contact_type: submission.contact_type,
          location: submission.location,
          funding_type: submission.funding_type,
          funding_stage: submission.funding_stage,
          funding_industries: submission.funding_industries,
          funding_description: submission.funding_description,
          check_sizes: submission.check_sizes,
          image_url: submission.image_url,
          verified: true,
        });

      if (insertError) throw insertError;

      // Update submission status
      const { error: updateError } = await supabase
        .from("investor_submissions")
        .update({
          status: "approved",
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", submission.id);

      if (updateError) throw updateError;

      toast.success("Investor approved and added to database!");
      fetchSubmissions();
    } catch (error) {
      console.error("Error approving submission:", error);
      toast.error("Failed to approve submission");
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(submission.id);
        return newSet;
      });
    }
  };

  const handleReject = async (submissionId: string) => {
    setProcessingIds(prev => new Set(prev).add(submissionId));
    
    try {
      const { error } = await supabase
        .from("investor_submissions")
        .update({
          status: "rejected",
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", submissionId);

      if (error) throw error;

      toast.success("Submission rejected");
      fetchSubmissions();
    } catch (error) {
      console.error("Error rejecting submission:", error);
      toast.error("Failed to reject submission");
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(submissionId);
        return newSet;
      });
    }
  };

  const filteredSubmissions = submissions.filter(submission => 
    filter === 'all' || submission.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Investor Submissions</h2>
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && (
                <Badge variant="secondary" className="ml-2">
                  {submissions.filter(s => s.status === status).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{submission.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    {submission.company && <span>{submission.company}</span>}
                    {submission.location && (
                      <>
                        <Separator orientation="vertical" className="h-4" />
                        <MapPin className="h-3 w-3" />
                        <span>{submission.location}</span>
                      </>
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(submission.status)}>
                    {submission.status}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{submission.name}</DialogTitle>
                        <DialogDescription>
                          Submitted on {new Date(submission.submitted_at).toLocaleDateString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {submission.bio && (
                          <div>
                            <h4 className="font-semibold mb-2">Bio</h4>
                            <p className="text-sm text-muted-foreground">{submission.bio}</p>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-1">Contact</h4>
                            <p className="text-sm">{submission.contact}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Investment Type</h4>
                            <p className="text-sm">{submission.funding_type || 'Not specified'}</p>
                          </div>
                        </div>
                        {submission.funding_industries && submission.funding_industries.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Industries</h4>
                            <div className="flex flex-wrap gap-1">
                              {submission.funding_industries.map((industry) => (
                                <Badge key={industry} variant="secondary">{industry}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {submission.funding_description && (
                          <div>
                            <h4 className="font-semibold mb-2">Investment Focus</h4>
                            <p className="text-sm text-muted-foreground">{submission.funding_description}</p>
                          </div>
                        )}
                        {submission.check_sizes && (
                          <div>
                            <h4 className="font-semibold mb-1">Check Size</h4>
                            <p className="text-sm">{submission.check_sizes}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(submission.submitted_at).toLocaleDateString()}</span>
                  </div>
                  {submission.funding_type && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{submission.funding_type}</span>
                    </div>
                  )}
                </div>
                
                {submission.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(submission.id)}
                      disabled={processingIds.has(submission.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      {processingIds.has(submission.id) ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <X className="h-4 w-4 mr-1" />
                      )}
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(submission)}
                      disabled={processingIds.has(submission.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      {processingIds.has(submission.id) ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4 mr-1" />
                      )}
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredSubmissions.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No submissions found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InvestorSubmissionsManager;
