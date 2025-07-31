import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function AuthForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (email: string, password: string, isSignUp: boolean) => {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl }
        });
        if (error) throw error;
        toast({
          title: 'Check your email',
          description: 'We sent you a confirmation link to complete your registration.',
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onSuccess();
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication error',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const AuthFormContent = ({ isSignUp }: { isSignUp: boolean }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth(email, password, isSignUp);
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Welcome to BreadButter</CardTitle>
        <CardDescription>
          Smart Talent Profile Builder
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <AuthFormContent isSignUp={false} />
          </TabsContent>
          <TabsContent value="signup">
            <AuthFormContent isSignUp={true} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}