import { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, role: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Set default user to be automatically logged in
  const defaultUser = { username: "admin", role: "admin" };
  const [user, setUser] = useState<User | null>(defaultUser);

  // No need to check localStorage anymore since we're always authenticated
  useEffect(() => {
    // Check if user is logged in on page load
    const storedUser = localStorage.getItem("finledger_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data", error);
        localStorage.removeItem("finledger_user");
      }
    }
  }, []);
  
  const login = (username: string, role: string) => {
    const userData = { username, role };
    localStorage.setItem("finledger_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // We're keeping the logout functionality in case it's needed in the future
    localStorage.removeItem("finledger_user");
    setUser(defaultUser); // Reset to default user instead of null
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: true, // Always authenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default useAuth;
