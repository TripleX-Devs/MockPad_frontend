import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { BookOpen, Cookie, GraduationCap } from "lucide-react";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { teacherLogin } from "@/StateManagement/Authentication/action";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function LoginPage() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const loginError = useSelector((state: any) => state.auth.error);

  useEffect(()=>{
    if (loginError) {
      toast.error(loginError);
    }
  },[loginError]);

  const handleSubmit = (
    event: React.FormEvent,
    role: "student" | "teacher"
  ) => {
    event.preventDefault();
    const userData={
      universityEmail:email,
      universityEmailPassword:password,
      
    }

    // @ts-ignore
     dispatch(teacherLogin(userData,role,navigate));
    // console.log("Login Data",userData);

   
   
   
  };

  





  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
       <ToastContainer />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">
                <GraduationCap className="mr-2 h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="teacher">
                <BookOpen className="mr-2 h-4 w-4" />
                Teacher
              </TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <form onSubmit={(e) => handleSubmit(e, "student")}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In as Student
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="teacher">
              <form onSubmit={(e) => handleSubmit(e, "teacher")}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-email">Email</Label>
                    <Input
                      id="teacher-email"
                      type="email"
                      placeholder="teacher@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-password">Password</Label>
                    <Input
                      id="teacher-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In as Teacher
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-gray-600">
            Don't have an account? Contact your school administrator.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
