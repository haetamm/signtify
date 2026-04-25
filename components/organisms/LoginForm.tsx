"use client";

import OrDivider from "@/components/atoms/OrDivider";
import AuthFooterLink from "@/components/molecules/AuthFooterLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/useAuth";
import { LoginFormValues, loginSchema } from "@/lib/schemas/authSchema";
import { urlPage } from "@/lib/utils/constans";
import { handleFormError } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { GrGoogle } from "react-icons/gr";
import ErrorAllert from "../atoms/ErrorAllert";
import { ErrorLabel } from "../atoms/ErrorLable";

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
    } catch (error) {
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
          <ErrorLabel message={errors.username?.message} />
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="password"
            className="border text-secondary-foreground"
            placeholder="Password"
            {...register("password")}
          />
          <ErrorLabel message={errors.password?.message} />
        </div>
      </div>

      {serverError && <ErrorAllert message={serverError} />}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-5 w-full rounded-full h-11 bg-primary-gradient"
      >
        {isSubmitting && (
          <FiLoader className="animate-spin h-4 w-4 mr-0.5 inline"></FiLoader>
        )}
        Sign in
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
