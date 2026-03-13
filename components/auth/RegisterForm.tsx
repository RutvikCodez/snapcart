"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { registerFields, registerFormSchema } from "@/constants";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { signIn } from "next-auth/react";

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    const { email, name, password } = data;

    toast.promise(
      axios.post("/api/auth/register", {
        email,
        name,
        password,
      }),
      {
        loading: "Creating account...",
        success: (res) => {
          form.reset();
          return res.data.message || "Account created successfully";
        },
        error: "Failed to create account",
      },
    );
  }
  return (
    <div className="flex w-full justify-center items-center flex-col gap-6 sm:max-w-md">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-primary text-5xl font-bold">Create Account</h1>
        <h2 className="text-secondary-foreground text-xl font-normal">
          Join Snapcart today!
        </h2>
      </div>
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:max-w-md flex flex-col gap-6"
      >
        <FieldGroup>
          {registerFields.map((item) => (
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
        onClick={()=>signIn("google", {callbackUrl: "/"})}
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
        Already have an account?{" "}
        <Link href="/login" className="text-primary underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
