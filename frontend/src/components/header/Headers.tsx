import { Navigate } from "react-router-dom"
import { Button } from '../ui/button'

const Headers = () => {
  
    function Logout() {
        localStorage.clear()
        window.location.reload()
        return <Navigate to='/login'/>
      }
  
    return (
        <div className="flex items-center bg-white h-[50px] ">
            <h2 className="flex-1 text-center text-black text-xl font-bold"></h2>
            <Button variant='outline'onClick={Logout} className="translate-x-[-20%] hover:scale-110 transition-transform duration-300 ease-out will-change-transform">Log Out</Button>
        </div>
  )
}

export default Headers