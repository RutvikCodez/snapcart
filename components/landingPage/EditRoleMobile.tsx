"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { editRoleMobileFormSchema, userRoles } from "@/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";
import { redirect } from "next/navigation";

export function EditRoleMobile() {
  const form = useForm<z.infer<typeof editRoleMobileFormSchema>>({
    resolver: zodResolver(editRoleMobileFormSchema),
    defaultValues: {
      role: "",
      mobile: "",
    },
  });

  async function onSubmit(data: z.infer<typeof editRoleMobileFormSchema>) {
    const { mobile, role } = data;

    toast.promise(
      axios.post("/api/user/edit-role-mobile", {
        mobile,
        role,
      }),
      {
        loading: "Updating mobile number and role...",
        success: (res) => {
          form.reset();
          redirect("/")
          return res.data.message || "Mobile number and role updated successfully";
        },
        error: "Failed to update mobile number and role",
      },
    );
  }
  return (
    <div className="flex w-full justify-center items-center flex-col gap-6 sm:max-w-md">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-primary text-5xl font-bold">Select Your Role</h1>
      </div>
      <form
        id="form-rhf-radiogroup"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:max-w-md flex flex-col gap-8"
      >
        <FieldGroup className="flex flex-col gap-8">
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet data-invalid={fieldState.invalid}>
                <RadioGroup
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  className="flex gap-5"
                >
                  {userRoles.map(({Icon, id, title}) => (
                    <Card
                      key={id}
                      className="w-full text-center flex justify-center items-center p-5 border bg-card border-border hover:bg-secondary duration-500 ease-in-out"
                    >
                      <FieldLabel
                        key={id}
                        htmlFor={`form-rhf-radiogroup-${id}`}
                        className="border-none bg-transparent text-center w-full"
                      >
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldContent className="flex flex-col gap-2 justify-center items-center bg-transparent text-center w-full">
                            <Icon className="font-semibold" />
                            <FieldTitle className="font-semibold">
                              {title}
                            </FieldTitle>
                          </FieldContent>
                          <RadioGroupItem
                            value={id}
                            id={`form-rhf-radiogroup-${id}`}
                            aria-invalid={fieldState.invalid}
                            className="hidden"
                          />
                        </Field>
                      </FieldLabel>
                    </Card>
                  ))}
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldSet>
            )}
          />
          <Controller
              name="mobile"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex flex-col gap-3">
                  <FieldLabel htmlFor="form-rhf-demo-mobile" className="font-semibold flex justify-center">
                    Enter Your Mobile Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-mobile"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. 0000000000"    
                    autoComplete="off"
                    type="number"
                    className="w-fit"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
        </FieldGroup>
        <Button
          type="submit"
          form="form-rhf-radiogroup"
          className="w-full text-secondary font-bold py-5 text-lg"
        >
          Go To Home
        </Button>
      </form>
    </div>
  );
}
