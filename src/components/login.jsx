import { supabase } from './components/SupabaseClient';

// Define the Login component
const Login = () => {
  // Function to handle login using GitHub
  const handleLogin = async () => {
    try {
      // this is where i attempted to sign in using Supabase authentication with GitHub provider
      await supabase.auth.signIn({
        provider: 'github',
      });
    } catch (error) {
      // Handle errors if any occur during the login process
      console.error('Error logging in:', error.message);
    }
  };

  // Render the Login component
  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

// Export the Login component as the default export
export default Login;