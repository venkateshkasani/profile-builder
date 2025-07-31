import { AuthForm } from '@/components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <AuthForm onSuccess={() => navigate('/')} />
    </div>
  );
}