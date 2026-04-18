"use client";

import { resetPass } from "@/lib/action/authAction";
import { showSuccessToast } from "@/lib/hooks/useHandleToast";
import { ResetPassFormValues, resetPassSchema } from "@/lib/schemas/authSchema";
import { handleFormError, urlPage } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import ErrorAllert from "../atoms/ErrorAllert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ResetPassForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassFormValues>({
    resolver: zodResolver(resetPassSchema),
    mode: "onChange",
  });

  if (!token) {
    return (
      <div className="rounded-lg bg-error p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
          <IoWarning className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="mb-2 text-lg text-destructive font-semibold">
          Invalid Reset Link
        </h3>
        <p className="text-sm text-muted-foreground">
          The password reset link is invalid or has expired.
        </p>
      </div>
    );
  }

  const onSubmit = async (values: ResetPassFormValues) => {
    setServerError(null);
    try {
      const response = await resetPass(values, token);
      showSuccessToast(response, "");
      reset();
      router.push(urlPage.LOGIN);
    } catch (error: unknown) {
      handleFormError<ResetPassFormValues>(error, setError, setServerError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-3">
        <Input
          type="password"
          className="border text-secondary-foreground"
          placeholder="New Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs px-3 text-red-500 px-1">
            {errors.password.message}
          </p>
        )}
        <Input
          type="password"
          className="border text-secondary-foreground"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs px-3 text-red-500 px-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      {serverError && <ErrorAllert message={serverError} />}
      <Button
        size="lg"
        className="mt-5 w-full rounded-full h-11 bg-primary-gradient"
      >
        {isSubmitting ? "Loading" : "Change Password"}
      </Button>
    </form>
  );
}
