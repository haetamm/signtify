"use client";

import { forgotPass } from "@/lib/action/authAction";
import { showSuccessToast } from "@/lib/hooks/useHandleToast";
import {
  ForgotPassFormValues,
  forgotPassSchema,
} from "@/lib/schemas/authSchema";
import { urlPage } from "@/lib/utils/constans";
import { handleFormError } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import ErrorAllert from "../atoms/ErrorAllert";
import { ErrorLabel } from "../atoms/ErrorLable";
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
      reset();
    } catch (error: unknown) {
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
          <ErrorLabel message={errors.email?.message} />
        </div>

        {serverError && <ErrorAllert message={serverError} />}

        <Button
          size="lg"
          className="mt-5 w-full rounded-full h-11 bg-primary-gradient"
        >
          {isSubmitting && (
            <FiLoader className="animate-spin h-4 w-4 mr-0.5 inline"></FiLoader>
          )}
          Reset Password
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
