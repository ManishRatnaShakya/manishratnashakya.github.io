
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type AuthFormValues = z.infer<typeof authSchema>;

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    setErrorMsg(null);
    
    try {
      if (authMode === "signin") {
        await signIn(values.email, values.password);
      } else {
        await signUp(values.email, values.password);
        form.reset();
        setAuthMode("signin");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark p-4">
      <Card className="w-full max-w-md border-highlight/10 bg-dark-200/80">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {authMode === "signin" ? "Sign In" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            {authMode === "signin" 
              ? "Enter your credentials to access your account" 
              : "Enter your details to create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMsg && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        {...field}
                        className="bg-dark-300/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        {...field}
                        className="bg-dark-300/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-highlight hover:bg-highlight/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {authMode === "signin" ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  authMode === "signin" ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-400">
            {authMode === "signin" ? (
              <div>
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 text-highlight" 
                  onClick={() => setAuthMode("signup")}
                >
                  Create one
                </Button>
              </div>
            ) : (
              <div>
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 text-highlight" 
                  onClick={() => setAuthMode("signin")}
                >
                  Sign in
                </Button>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
