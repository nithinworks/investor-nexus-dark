import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Search, Users } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  subscription_tier: string | null;
  access_used: number | null;
  access_limit: number | null;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionBadge = (tier: string | null) => {
    if (!tier || tier === "free") {
      return <Badge variant="secondary">Free</Badge>;
    }
    if (tier === "starter") {
      return <Badge className="bg-blue-600">Starter</Badge>;
    }
    if (tier === "premium") {
      return <Badge className="bg-purple-600">Premium</Badge>;
    }
    return <Badge variant="secondary">{tier}</Badge>;
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Users
        </h1>
        <p className="text-white/60">Manage platform users and subscriptions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-white/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{users.length}</div>
            <p className="text-xs text-white/60">Registered accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Premium Users
            </CardTitle>
            <Users className="h-4 w-4 text-white/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {
                users.filter(
                  (u) => u.subscription_tier && u.subscription_tier !== "free"
                ).length
              }
            </div>
            <p className="text-xs text-white/60">Paying subscribers</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Active This Month
            </CardTitle>
            <Users className="h-4 w-4 text-white/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {users.filter((u) => (u.access_used || 0) > 0).length}
            </div>
            <p className="text-xs text-white/60">Users with activity</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="text-white">User Database</CardTitle>
              <CardDescription className="text-white/60">
                {filteredUsers.length} users
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80 min-w-[120px]">
                    User
                  </TableHead>
                  <TableHead className="text-white/80 min-w-[200px]">
                    Email
                  </TableHead>
                  <TableHead className="text-white/80 min-w-[150px] hidden sm:table-cell">
                    Company
                  </TableHead>
                  <TableHead className="text-white/80 min-w-[120px]">
                    Subscription
                  </TableHead>
                  <TableHead className="text-white/80 min-w-[100px] hidden md:table-cell">
                    Action Usage
                  </TableHead>
                  <TableHead className="text-white/80 min-w-[100px] hidden lg:table-cell">
                    Joined
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-white/10">
                    <TableCell className="text-white">
                      <div className="font-medium">
                        {user.first_name && user.last_name
                          ? `${user.first_name} ${user.last_name}`
                          : "N/A"}
                      </div>
                      <div className="sm:hidden text-xs text-white/60 mt-1">
                        {user.company || "-"}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80">
                      <div className="truncate max-w-[200px]">{user.email}</div>
                      <div className="md:hidden text-xs text-white/60 mt-1">
                        {user.access_used || 0}/{user.access_limit || 0} actions
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 hidden sm:table-cell">
                      {user.company || "-"}
                    </TableCell>
                    <TableCell>
                      {getSubscriptionBadge(user.subscription_tier)}
                      <div className="lg:hidden text-xs text-white/60 mt-1">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 hidden md:table-cell">
                      {user.access_used || 0}/{user.access_limit || 0}
                    </TableCell>
                    <TableCell className="text-white/80 hidden lg:table-cell">
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
