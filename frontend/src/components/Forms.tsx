import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Button } from "./ui/button";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "LOGIN" : "REGISTER";
    const inverse = method === "login" ? "register" : "login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
                window.location.reload()
            } else {
                navigate("/login")
                window.location.reload()
            }
        } catch (error) {
            if (method === 'login'){
                alert("Incorrect Username or Password")
                window.location.reload()
            }
            else{
                alert("Username already taken")
                window.location.reload()
            }
            
        } finally {
            setLoading(false)
        }
    };

    return (
            <div className="flex justify-center items-center min-h-screen">    
                <form onSubmit={handleSubmit} className="flex flex-col bg-white text-center min-w-min-w-500 p-25 space-y-7 rounded-xl">
                    <h1 className="text-3xl font-bold translate-y-[-50px]">{name}</h1>
                        <div className="min-w-[15rem] pt-5"> 
                            <div className="flex flex-col translate-y-[-2rem] space-y-4">  
                        
                                <input
                                    className="border-1 border-gray-600 rounded-[8px] p-1"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                />
                                <input
                                    className="border-1 border-gray-600 rounded-[8px] p-1"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                        
                           
                            <div className="mt-4 mb-[-30px]">   
                                <Button variant='default' className="bg-gray-400 hover:scale-110 transition-transform duration-300 ease-out will-change-transform" type="submit">
                                    {name}
                                </Button>
                            </div>                                 
                        </div>  
                    </div>    
                    <p><a className="capitalize hover:underline" href={`/${inverse}`}>{`${inverse} Here`}</a> </p>
                    
                </form>
            </div>
    );
}

export default Form