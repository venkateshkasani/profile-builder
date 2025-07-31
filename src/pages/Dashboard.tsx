import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProfileImportWizard } from '@/components/profile/ProfileImportWizard';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  name: string;
  profession?: string;
  bio?: string;
  location?: string;
  website_url?: string;
  instagram_handle?: string;
  linkedin_url?: string;
  avatar_url?: string;
  is_verified: boolean;
}

export default function Dashboard() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProfession, setFilterProfession] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfiles();
    checkUserProfile();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error fetching profiles',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setUserProfile(data);
      
      if (!data) {
        setShowWizard(true);
      }
    } catch (error: any) {
      console.error('Error checking user profile:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProfession = filterProfession === 'all' || 
                             profile.profession?.toLowerCase().includes(filterProfession.toLowerCase());

    return matchesSearch && matchesProfession;
  });

  const professions = Array.from(new Set(profiles.map(p => p.profession).filter(Boolean)));

  if (showWizard) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto pt-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Talent Profile</h1>
            <p className="text-muted-foreground">
              Let's import your work and create an amazing profile
            </p>
          </div>
          <ProfileImportWizard 
            onComplete={() => {
              setShowWizard(false);
              fetchProfiles();
              // checkUserProfile();
            }} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">BreadButter</h1>
              <p className="text-sm text-muted-foreground">Smart Talent Profile Builder</p>
            </div>
            <div className="flex items-center gap-4">
              {userProfile && (
                <Button
                  variant="outline"
                  onClick={() => setShowWizard(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Profile
                </Button>
              )}
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, profession, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterProfession} onValueChange={setFilterProfession}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Professions</SelectItem>
                {professions.map(profession => (
                  <SelectItem key={profession} value={profession!}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading profiles...</p>
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterProfession !== 'all' 
                ? 'No profiles match your search criteria.' 
                : 'No profiles yet. Be the first to create one!'}
            </p>
            {!userProfile && (
              <Button onClick={() => setShowWizard(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your Profile
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}