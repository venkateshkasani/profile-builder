import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Zap, Shield } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">BreadButter</h1>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Button asChild>
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Smart Talent Profile Builder
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Automatically create structured, searchable profiles for creators by importing from Instagram, 
            LinkedIn, Google Drive, websites, and resumes. Reduce onboarding friction and attract more talent.
          </p>
          {!user && (
            <Button size="lg" asChild>
              <Link to="/auth">
                Create Your Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Automated Import</h3>
            <p className="text-muted-foreground">
              Import your work from multiple platforms automatically. No manual data entry required.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Profiles</h3>
            <p className="text-muted-foreground">
              AI-powered profile generation creates comprehensive, searchable talent profiles.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your data is secure with enterprise-grade security and privacy controls.
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to showcase your talent?</h2>
          <p className="text-muted-foreground mb-6">
            Join creators, photographers, designers, and directors who trust BreadButter to build their profiles.
          </p>
          {!user && (
            <Button size="lg" asChild>
              <Link to="/auth">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
