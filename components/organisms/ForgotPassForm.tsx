"use client";

import { forgotPass } from "@/lib/action/authAction";
import { showSuccessToast } from "@/lib/hooks/useHandleToast";
import {
  ForgotPassFormValues,
  forgotPassSchema,
} from "@/lib/schemas/authSchema";
import { handleFormError, urlPage } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorAllert from "../atoms/ErrorAllert";
import AuthFooterLink from "../molecules/AuthFooterLink";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ForgotPassForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPassFormValues>({
    resolver: zodResolver(forgotPassSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: ForgotPassFormValues) => {
    setServerError(null);
    try {
      const response = await forgotPass(values);
      showSuccessToast(response, "");
      console.log(response);
      reset();
    } catch (error: unknown) {
      console.log(error);
      handleFormError<ForgotPassFormValues>(error, setError, setServerError);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-3">
          <Input
            type="email"
            className="border text-secondary-foreground"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs px-3 text-red-500 px-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {serverError && <ErrorAllert message={serverError} />}

        <Button
          size="lg"
          className="mt-5 w-full rounded-full h-11 bg-primary-gradient"
        >
          {isSubmitting ? "Loading..." : "Reset Password"}
        </Button>

        <AuthFooterLink
          label="Back to login?"
          linkText="Here"
          href={urlPage.LOGIN}
        />
      </form>
    </>
  );
}
