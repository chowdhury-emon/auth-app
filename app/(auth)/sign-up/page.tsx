"use client";
import { signUp } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";


export default function SignUp() {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const signUpData = Object.fromEntries(formData.entries()) as Record<string, string>;

    // console.log("Form submitted with:", signUpData)

    const { data, error } = await signUp.email({
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password
    })

    if (data) {
      toast.success("User created successfully");
    } else if (error) {
      toast.danger(error.message || "No sex today");
      throw new Error(`${error.status}: ${error.message}`);
    }
  };

  return (
    <Form className="form-layout" onSubmit={onSubmit}>
      <h1 className="text-sm font-bold text-center uppercase mb-2">Create new user</h1>
      <TextField
        variant="secondary"
        isRequired
        name="name"
        type="text"
        validate={(value) => {
          if (value.length < 3) {
            return "Name must be at least 3 characters";
          }
          return null;
        }}
      >
        <Label>Name</Label>
        <Input placeholder="Your name" />
        <FieldError />
      </TextField>

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

      <div className="w-full grid grid-cols-2 gap-2 mt-2 *:w-full">
        <Button type="submit">
          Create User
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
  );
}