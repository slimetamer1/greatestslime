import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Button } from "./ui/button";


interface FormProps {
  route: string;
  method: "login" | "register";
}

function Form({ route, method }: FormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const name = method === "login" ? "LOGIN" : "REGISTER";
  const inverse = method === "login" ? "register" : "login";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(method === "login" ? "Incorrect Username or Password" : "Username already taken");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col bg-white text-center p-6 space-y-7 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">{name}</h1>

        <div className="w-64">
          <input
            className="border border-gray-600 rounded-md p-2 w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            className="border border-gray-600 rounded-md p-2 w-full mt-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <Button variant="default" className="bg-gray-400 hover:scale-110 transition-transform" type="submit">
          {name}
        </Button>

        <p>
          <a className="capitalize hover:underline" href={`/${inverse}`}>
            {`${inverse} Here`}
          </a>
        </p>
      </form>
    </div>
  );
}

export default Form;
