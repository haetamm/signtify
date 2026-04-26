import { useProfile } from "@/lib/hooks/useProfile";
import {
  ChangePassFormValues,
  changePassSchema,
} from "@/lib/schemas/profileSchema";
import { useModalStore } from "@/lib/stores/useModalStore";
import { handleFormError } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import ErrorAllert from "../atoms/ErrorAllert";
import { ErrorLabel } from "../atoms/ErrorLable";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TemplateModal from "./TemplateModal";

export default function ChangePassModal() {
  const { close } = useModalStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const { change } = useProfile();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePassFormValues>({
    resolver: zodResolver(changePassSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: ChangePassFormValues) => {
    setServerError(null);
    try {
      await change(values);
    } catch (error) {
      handleFormError<ChangePassFormValues>(error, setError, setServerError);
    }
  };

  const inputStyle =
    "w-full px-4 py-2.5 rounded-lg border text-muted-foreground border-gray-300 focus:border-primary transition-all outline-none";

  return (
    <TemplateModal
      title="Update Password"
      classSize="max-w-md"
      cancelButton={close}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        <div className="flex flex-col gap-1">
          <Input
            type="password"
            className={inputStyle}
            placeholder="Password"
            {...register("password")}
          />
          <ErrorLabel message={errors.password?.message} />
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="password"
            className={inputStyle}
            placeholder="Password Confirmation"
            {...register("confirmPassword")}
          />
          <ErrorLabel message={errors.confirmPassword?.message} />
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="password"
            className={inputStyle}
            placeholder="Old Password"
            {...register("oldPassword")}
          />
          <ErrorLabel message={errors.oldPassword?.message} />
        </div>

        {serverError && <ErrorAllert message={serverError} />}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full rounded-lg py-2.5 bg-primary-gradient mb-3"
        >
          {isSubmitting && (
            <FiLoader className="animate-spin h-4 w-4 mr-2 inline" />
          )}
          Update Password
        </Button>
      </form>
    </TemplateModal>
  );
}
