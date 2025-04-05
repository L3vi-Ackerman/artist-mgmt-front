"use client";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { login } from "@/shared/api/post/login-user";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface LoginFormProps {
  className?:string;
  [key:string]:any;
}
export function LoginForm({
  signup,className,...props
}: LoginFormProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole] = useState("")
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    setError("");
    const result = await login({email:email,password:password,role:role})

    console.log(result)
    if(result.success){
      toast.success('Login Successful!')
      router.push('/dashboard')
    }else{
      toast.error('Invalid Credentials')
    }
   }
  
 const handleLogin = () => {
    const token =Cookies.get("accessToken");
    if (token) {
      router.push("/dashboard"); // Redirect if token exists
    } else {
      alert("Invalid Credentials!"); // Show an error message
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
        {signup ? 

          (<CardTitle className="text-xl">Create an Account</CardTitle>):(
          <CardTitle className="text-xl">Welcome back</CardTitle>)
        }
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {!signup &&
<a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                    }
                    
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="*********"
                  />
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                Login
                </Button>
              </div>
              
              </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
        <ToastContainer />
    </div>
  );
}
