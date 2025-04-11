"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import OTPModal from "@/components/OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) =>
  z.object({
    email: z.string().email("Please enter a valid email."),
    fullName:
      formType === "sign-up"
        ? z.string().min(2, "Full name is too short").max(50)
        : z.string().optional(),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch (error) {
      setErrorMessage("Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="backdrop-blur-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
            <h1 className="form-title">
              {type === "sign-in"
                ? "Login to your Account"
                : "Create your Account"}
            </h1>

            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="shad-input"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please provide your Email"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="form-submit-button font-bold"
              disabled={isLoading}
            >
              {type === "sign-in" ? "SIGN IN" : "SIGN UP"}

              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loading"
                  width={25}
                  height={25}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>

            {errorMessage && (
              <p className="error-message text-red-500 mt-2">{errorMessage}</p>
            )}

            <div className="body-2 flex justify-center mt-4">
              <p className="text-black">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Have an account already?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="ml-1 font-bold text-red"
              >
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </form>
        </Form>
      </div>

      {accountId && (
        <OTPModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
