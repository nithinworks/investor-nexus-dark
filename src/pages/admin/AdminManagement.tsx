import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Search, Plus, Edit, Trash2, Shield } from 'lucide-react';
import bcrypt from 'bcryptjs';

interface Admin {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const AdminManagement = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    const filtered = admins.filter(admin =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAdmins(filtered);
  }, [admins, searchTerm]);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('id, username, email, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admins",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const handleAdd = async () => {
    try {
      if (!formData.username || !formData.password) {
        toast({
          title: "Error",
          description: "Username and password are required",
          variant: "destructive",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const { error } = await supabase
        .from('admins')
        .insert([{
          username: formData.username,
          email: formData.email,
          password_hash: hashedPassword,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin added successfully",
      });
      
      fetchAdmins();
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding admin:', error);
      toast({
        title: "Error",
        description: "Failed to add admin",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async () => {
    if (!selectedAdmin) return;

    try {
      const updateData: any = {
        username: formData.username,
        email: formData.email,
      };

      if (formData.password) {
        updateData.password_hash = await bcrypt.hash(formData.password, 10);
      }

      const { error } = await supabase
        .from('admins')
        .update(updateData)
        .eq('id', selectedAdmin.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin updated successfully",
      });
      
      fetchAdmins();
      setIsEditDialogOpen(false);
      setSelectedAdmin(null);
      resetForm();
    } catch (error) {
      console.error('Error updating admin:', error);
      toast({
        title: "Error",
        description: "Failed to update admin",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    try {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin deleted successfully",
      });
      
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast({
        title: "Error",
        description: "Failed to delete admin",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (admin: Admin) => {
    setSelectedAdmin(admin);
    setFormData({
      username: admin.username,
      email: admin.email || '',
      password: '',
    });
    setIsEditDialogOpen(true);
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
          <h1 className="text-3xl font-bold text-white mb-2">Admin Management</h1>
          <p className="text-white/60">Manage administrator accounts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/90 border-white/10 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogDescription className="text-white/60">
                Create a new administrator account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Username *</Label>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Password *</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} className="bg-red-600 hover:bg-red-700">
                Add Admin
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Administrator Accounts</CardTitle>
              <CardDescription className="text-white/60">
                {filteredAdmins.length} admin accounts total
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <Input
                  placeholder="Search admins..."
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
                <TableHead className="text-white/80">Username</TableHead>
                <TableHead className="text-white/80">Email</TableHead>
                <TableHead className="text-white/80">Created</TableHead>
                <TableHead className="text-white/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin.id} className="border-white/10">
                  <TableCell className="text-white flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-red-500" />
                    {admin.username}
                  </TableCell>
                  <TableCell className="text-white/80">{admin.email || '-'}</TableCell>
                  <TableCell className="text-white/80">
                    {new Date(admin.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(admin)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(admin.id)}
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-black/90 border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
            <DialogDescription className="text-white/60">
              Update administrator information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Username *</Label>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>New Password (leave blank to keep current)</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} className="bg-red-600 hover:bg-red-700">
              Update Admin
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminManagement;