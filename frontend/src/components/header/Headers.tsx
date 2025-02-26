import { Navigate } from "react-router-dom";
import { Button } from '../ui/button';
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";

const Headers = () => {
  const { theme, setTheme } = useTheme();

  function Logout() {
    localStorage.clear();
    window.location.reload();
    return <Navigate to='/login'/>;
  }

  return (
    <div className={`flex items-center h-[50px] ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h2 className="flex-1 text-center text-xl font-bold"></h2>
      <Button variant='outline' onClick={Logout} className="translate-x-[-20%] hover:scale-110 transition-transform duration-300 ease-out will-change-transform">Log Out</Button>
      <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="ml-4">
      <MdDarkMode />
      </Button>
    </div>
  );
}

export default Headers;