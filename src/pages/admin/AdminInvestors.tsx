import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';

interface Investor {
  id: string;
  name: string;
  bio: string | null;
  company: string | null;
  company_url: string | null;
  contact: string;
  contact_type: string | null;
  location: string | null;
  funding_type: string | null;
  funding_stage: string | null;
  funding_industries: string[] | null;
  funding_description: string | null;
  check_sizes: string | null;
  image_url: string | null;
  verified: boolean | null;
  created_at: string;
}

const AdminInvestors = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filteredInvestors, setFilteredInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    company: '',
    company_url: '',
    contact: '',
    contact_type: 'email',
    location: '',
    funding_type: '',
    funding_stage: '',
    funding_industries: '',
    funding_description: '',
    check_sizes: '',
    image_url: '',
    verified: true,
  });

  useEffect(() => {
    fetchInvestors();
  }, []);

  useEffect(() => {
    const filtered = investors.filter(investor =>
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInvestors(filtered);
  }, [investors, searchTerm]);

  const fetchInvestors = async () => {
    try {
      const { data, error } = await supabase
        .from('investors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvestors(data || []);
    } catch (error) {
      console.error('Error fetching investors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch investors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      bio: '',
      company: '',
      company_url: '',
      contact: '',
      contact_type: 'email',
      location: '',
      funding_type: '',
      funding_stage: '',
      funding_industries: '',
      funding_description: '',
      check_sizes: '',
      image_url: '',
      verified: true,
    });
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase
        .from('investors')
        .insert([{
          ...formData,
          funding_industries: formData.funding_industries ? formData.funding_industries.split(',').map(s => s.trim()) : [],
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Investor added successfully",
      });
      
      fetchInvestors();
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding investor:', error);
      toast({
        title: "Error",
        description: "Failed to add investor",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async () => {
    if (!selectedInvestor) return;

    try {
      const { error } = await supabase
        .from('investors')
        .update({
          ...formData,
          funding_industries: formData.funding_industries ? formData.funding_industries.split(',').map(s => s.trim()) : [],
        })
        .eq('id', selectedInvestor.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Investor updated successfully",
      });
      
      fetchInvestors();
      setIsEditDialogOpen(false);
      setSelectedInvestor(null);
      resetForm();
    } catch (error) {
      console.error('Error updating investor:', error);
      toast({
        title: "Error",
        description: "Failed to update investor",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this investor?')) return;

    try {
      const { error } = await supabase
        .from('investors')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Investor deleted successfully",
      });
      
      fetchInvestors();
    } catch (error) {
      console.error('Error deleting investor:', error);
      toast({
        title: "Error",
        description: "Failed to delete investor",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (investor: Investor) => {
    setSelectedInvestor(investor);
    setFormData({
      name: investor.name,
      bio: investor.bio || '',
      company: investor.company || '',
      company_url: investor.company_url || '',
      contact: investor.contact,
      contact_type: investor.contact_type || 'email',
      location: investor.location || '',
      funding_type: investor.funding_type || '',
      funding_stage: investor.funding_stage || '',
      funding_industries: investor.funding_industries ? investor.funding_industries.join(', ') : '',
      funding_description: investor.funding_description || '',
      check_sizes: investor.check_sizes || '',
      image_url: investor.image_url || '',
      verified: investor.verified || false,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (investor: Investor) => {
    setSelectedInvestor(investor);
    setIsViewDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Investors</h1>
          <p className="text-white/60">Manage investor database</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Investor
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/90 border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Investor</DialogTitle>
              <DialogDescription className="text-white/60">
                Add a new investor to the database
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Contact *</Label>
                <Input
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Type</Label>
                <Select value={formData.contact_type} onValueChange={(value) => setFormData({ ...formData, contact_type: value })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Funding Type</Label>
                <Select value={formData.funding_type} onValueChange={(value) => setFormData({ ...formData, funding_type: value })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select funding type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VC">VC</SelectItem>
                    <SelectItem value="Angel">Angel</SelectItem>
                    <SelectItem value="Family Office">Family Office</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Funding Stage</Label>
                <Select value={formData.funding_stage} onValueChange={(value) => setFormData({ ...formData, funding_stage: value })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select funding stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                    <SelectItem value="Seed">Seed</SelectItem>
                    <SelectItem value="Series A">Series A</SelectItem>
                    <SelectItem value="Series B">Series B</SelectItem>
                    <SelectItem value="Series C+">Series C+</SelectItem>
                    <SelectItem value="Growth">Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Industries (comma-separated)</Label>
                <Input
                  value={formData.funding_industries}
                  onChange={(e) => setFormData({ ...formData, funding_industries: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="e.g., FinTech, SaaS, Healthcare"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} className="bg-red-600 hover:bg-red-700">
                Add Investor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Investor Database</CardTitle>
              <CardDescription className="text-white/60">
                {filteredInvestors.length} investors total
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <Input
                  placeholder="Search investors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-white/80">Name</TableHead>
                <TableHead className="text-white/80">Company</TableHead>
                <TableHead className="text-white/80">Location</TableHead>
                <TableHead className="text-white/80">Funding Type</TableHead>
                <TableHead className="text-white/80">Verified</TableHead>
                <TableHead className="text-white/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestors.map((investor) => (
                <TableRow key={investor.id} className="border-white/10">
                  <TableCell className="text-white">{investor.name}</TableCell>
                  <TableCell className="text-white/80">{investor.company || '-'}</TableCell>
                  <TableCell className="text-white/80">{investor.location || '-'}</TableCell>
                  <TableCell className="text-white/80">{investor.funding_type || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={investor.verified ? "default" : "secondary"}>
                      {investor.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openViewDialog(investor)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(investor)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(investor.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog - Similar structure to Add Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-black/90 border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Investor</DialogTitle>
            <DialogDescription className="text-white/60">
              Update investor information
            </DialogDescription>
          </DialogHeader>
          {/* Same form fields as Add Dialog */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Contact *</Label>
              <Input
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Contact Type</Label>
              <Select value={formData.contact_type} onValueChange={(value) => setFormData({ ...formData, contact_type: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Funding Type</Label>
              <Select value={formData.funding_type} onValueChange={(value) => setFormData({ ...formData, funding_type: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select funding type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VC">VC</SelectItem>
                  <SelectItem value="Angel">Angel</SelectItem>
                  <SelectItem value="Family Office">Family Office</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Funding Stage</Label>
              <Select value={formData.funding_stage} onValueChange={(value) => setFormData({ ...formData, funding_stage: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select funding stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                  <SelectItem value="Series A">Series A</SelectItem>
                  <SelectItem value="Series B">Series B</SelectItem>
                  <SelectItem value="Series C+">Series C+</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Industries (comma-separated)</Label>
              <Input
                value={formData.funding_industries}
                onChange={(e) => setFormData({ ...formData, funding_industries: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                placeholder="e.g., FinTech, SaaS, Healthcare"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} className="bg-red-600 hover:bg-red-700">
              Update Investor
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-black/90 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedInvestor?.name}</DialogTitle>
            <DialogDescription className="text-white/60">
              Investor details
            </DialogDescription>
          </DialogHeader>
          {selectedInvestor && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80">Company</Label>
                  <p className="text-white">{selectedInvestor.company || '-'}</p>
                </div>
                <div>
                  <Label className="text-white/80">Location</Label>
                  <p className="text-white">{selectedInvestor.location || '-'}</p>
                </div>
                <div>
                  <Label className="text-white/80">Contact</Label>
                  <p className="text-white">{selectedInvestor.contact}</p>
                </div>
                <div>
                  <Label className="text-white/80">Funding Type</Label>
                  <p className="text-white">{selectedInvestor.funding_type || '-'}</p>
                </div>
              </div>
              {selectedInvestor.bio && (
                <div>
                  <Label className="text-white/80">Bio</Label>
                  <p className="text-white mt-1">{selectedInvestor.bio}</p>
                </div>
              )}
              {selectedInvestor.funding_industries && (
                <div>
                  <Label className="text-white/80">Industries</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedInvestor.funding_industries.map((industry, index) => (
                      <Badge key={index} variant="secondary">{industry}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInvestors;
