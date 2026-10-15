"use client";
import { signIn } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";


export default function SignIn() {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const signInData = Object.fromEntries(formData.entries()) as Record<string, string>;

    const { data, error } = await signIn.email({
      email: signInData.email,
      password: signInData.password,
      rememberMe: false,
      callbackURL: "/"
    });

    if (data) {
      toast.success(`User created successfully. Welcome, ${data.user.name}`);
    } else if (error) {
      toast.danger(error.message || "Failed to create new user.");
    }
  };

  const handleGoogleSignIn = async () => {
    const res = await signIn.social({ provider: "google" })
    console.log(res.data);
  }

  return (
    <Form className="form-layout" onSubmit={onSubmit}>
      <h1 className="text-sm font-bold text-center uppercase mb-2">Sign in</h1>

      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="email@example.com" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }

          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>

      <div className="grid place-items-center">
        <div className="w-full grid grid-cols-2 gap-2 mt-2 *:w-full">

          <Button type="submit">
            Sign In
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>

        <div className="opacity-50 my-2">or</div>

        <Button className="w-full" onClick={handleGoogleSignIn}>Sign In with Google</Button>
      </div>
    </Form>
  );
}