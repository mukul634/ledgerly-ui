
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileImage, Moon, Sun, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a mock login - in a real app this would validate against a backend
    setTimeout(() => {
      // Demo credentials - Replace with actual authentication logic
      if (username === "admin" && password === "password") {
        // Use the login function from useAuth hook
        login(username, "admin");
        
        toast({
          title: "Login successful",
          description: "Welcome to FinLedger!",
        });
        
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 p-4 relative overflow-hidden">
      {/* Financial pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="w-full h-full grid grid-cols-12 grid-rows-12 gap-4">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-blue-900 rounded-sm"></div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-[10%] right-[20%] w-32 h-32 bg-blue-500 dark:bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[15%] left-[25%] w-40 h-40 bg-indigo-500 dark:bg-indigo-700 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
      
      {/* Theme toggle button */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            id="theme-toggle"
          />
          {theme === 'dark' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </div>
      </div>
      
      <Card className="w-full max-w-md relative z-10 shadow-xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardHeader className="space-y-1 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white mb-4">
            <FileImage className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-300">FinLedger</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Financial management made simple
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="dark:text-gray-300">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="dark:text-gray-300">Password</Label>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Password Reset",
                      description: "This feature is not implemented in the demo.",
                    });
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white transition-all" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Sign in</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
        <div className="p-6 pt-0 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Demo credentials: admin / password
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
