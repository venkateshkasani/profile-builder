import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Linkedin, Globe, Upload, Link } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SOURCE_TYPES = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: '@username or URL' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'LinkedIn profile URL' },
  { id: 'website', label: 'Website', icon: Globe, placeholder: 'Your website URL' },
  { id: 'gdrive', label: 'Google Drive', icon: Upload, placeholder: 'Google Drive folder link' },
  { id: 'resume', label: 'Resume/CV', icon: Link, placeholder: 'Resume URL or upload' },
];

interface ImportSource {
  type: string;
  url: string;
}

export function ProfileImportWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: '',
    profession: '',
    bio: '',
    location: '',
  });
  const [sources, setSources] = useState<ImportSource[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const addSource = (type: string, url: string) => {
    if (!url.trim()) return;
    setSources(prev => [...prev.filter(s => s.type !== type), { type, url }]);
  };

  const removeSource = (type: string) => {
    setSources(prev => prev.filter(s => s.type !== type));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          name: profileData.name,
          profession: profileData.profession,
          bio: profileData.bio,
          location: profileData.location,
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // Add import sources
      if (sources.length > 0) {
        const { error: sourcesError } = await supabase
          .from('import_sources')
          .insert(
            sources.map(source => ({
              profile_id: profile.id,
              source_type: source.type,
              source_url: source.url,
            }))
          );

        if (sourcesError) throw sourcesError;
      }

      toast({
        title: 'Profile created successfully!',
        description: 'Your talent profile has been created. Import processing will begin shortly.',
      });

      onComplete();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error creating profile',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Tell us about yourself to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                value={profileData.profession}
                onChange={(e) => setProfileData(prev => ({ ...prev, profession: e.target.value }))}
                placeholder="e.g., Photographer, Designer, Director"
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Brief description of your work and experience"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, Country"
              />
            </div>
            <Button 
              onClick={() => setStep(2)} 
              disabled={!profileData.name || !profileData.profession}
              className="w-full"
            >
              Continue to Import Sources
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Import Your Work</CardTitle>
            <CardDescription>
              Add links to your social profiles, portfolios, and work samples
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {SOURCE_TYPES.map((sourceType) => {
              const existingSource = sources.find(s => s.type === sourceType.id);
              const Icon = sourceType.icon;
              
              return (
                <div key={sourceType.id} className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {sourceType.label}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder={sourceType.placeholder}
                      defaultValue={existingSource?.url || ''}
                      onBlur={(e) => {
                        if (e.target.value) {
                          addSource(sourceType.id, e.target.value);
                        } else {
                          removeSource(sourceType.id);
                        }
                      }}
                    />
                    {existingSource && (
                      <Badge variant="secondary" className="px-2">
                        Added
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}