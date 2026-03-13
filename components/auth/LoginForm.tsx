"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { loginFormSchema, loginFields } from "@/constants";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";

export function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    const { email, password } = data;

    const promise = signIn("credentials", { email, password });

    toast.promise(promise, {
      loading: "Signing in...",
      success: () => {
        form.reset();
        return "Login successful";
      },
      error: "Invalid email or password",
    });
  }
  return (
    <div className="flex w-full justify-center items-center flex-col gap-6 sm:max-w-md">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-primary text-5xl font-bold">Welcome Back</h1>
        <h2 className="text-secondary-foreground text-xl font-normal">
          Login To Snapcart!
        </h2>
      </div>
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:max-w-md flex flex-col gap-6"
      >
        <FieldGroup>
          {loginFields.map((item) => (
            <Controller
              key={item.name}
              name={item.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder={item.placeholder}
                    type={item.type}
                    autoComplete="off"
                    className="py-5"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
        </FieldGroup>
        <Button
          type="submit"
          form="form-rhf-demo"
          className="w-full text-secondary font-bold py-5 text-lg"
        >
          Submit
        </Button>
      </form>
      <div className="flex gap-2 w-full sm:max-w-md items-center">
        <hr className="border-secondary border w-full" />
        <span>OR</span>
        <hr className="border-secondary border w-full" />
      </div>
      <Button
        type="button"
        form="form-rhf-demo"
        className="w-full text-primary bg-transparent border-secondary py-5 text-base flex items-center gap-2 justify-center"
        onClick={() => signIn("google")}
      >
        <Image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          width={18}
          height={18}
        />
        Continue with Google
      </Button>
      <p>
        Want to create an account?{" "}
        <Link href="/register" className="text-primary underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
