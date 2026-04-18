"use client";

import OrDivider from "@/components/atoms/OrDivider";
import AuthFooterLink from "@/components/molecules/AuthFooterLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/useAuth";
import { showSuccessToast } from "@/lib/hooks/useHandleToast";
import { LoginFormValues, loginSchema } from "@/lib/schemas/authSchema";
import { handleFormError, urlPage } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GrGoogle } from "react-icons/gr";
import ErrorAllert from "../atoms/ErrorAllert";

export default function LoginForm() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      await login(values);
      showSuccessToast("Selamat jumpa lagi", "");
      window.location.assign(urlPage.DASHBOARD);
    } catch (error) {
      console.log(error);
      handleFormError<LoginFormValues>(error, setError, setServerError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            className="border text-secondary-foreground"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-xs text-red-500 px-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="password"
            className="border text-secondary-foreground"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500 px-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {serverError && <ErrorAllert message={serverError} />}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-5 w-full rounded-full h-11 bg-primary-gradient"
      >
        {isSubmitting ? "Loading..." : "Sign in"}
      </Button>

      <OrDivider title="Or" />

      <div className="flex justify-center gap-4">
        <Button
          type="button"
          variant="tertiary"
          size="lg"
          disabled
          className="w-11 h-11 rounded-full"
        >
          <GrGoogle className="text-[44px]" />
        </Button>
      </div>

      <AuthFooterLink
        label="Forgot Password?"
        linkText="Here"
        href={urlPage.FORGOT_PASSWORD}
      />
    </form>
  );
}
