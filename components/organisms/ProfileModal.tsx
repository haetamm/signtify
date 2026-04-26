import { ProfileFormValues, profileSchema } from "@/lib/schemas/profileSchema";
import { useModalStore } from "@/lib/stores/useModalStore";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { ProfilePayload } from "@/lib/types/profile";
import { handleFormError } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import ErrorAllert from "../atoms/ErrorAllert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TemplateModal from "./TemplateModal";

import { useProfile } from "@/lib/hooks/useProfile";
import { useRef } from "react";
import { ErrorLabel } from "../atoms/ErrorLable";

export default function ProfileModal() {
  const { close } = useModalStore();
  const profile = useProfileStore((s) => s.profile);
  const [serverError, setServerError] = useState<string | null>(null);
  const hasReset = useRef(false);
  const { update } = useProfile();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (profile && !hasReset.current) {
      reset({
        name: profile.name ?? "",
        username: profile.username ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        address: profile.address ?? "",
        birthPlace: profile.birthPlace ?? "",
        birthDate: profile.birthDate ?? "",
        religion: profile.religion ?? "",
        gender: profile.gender ?? "",
      });
      hasReset.current = true;
    }
  }, [profile, reset]);

  const gender = useWatch({
    control,
    name: "gender",
    defaultValue: profile?.gender ?? "",
  });

  const inputStyle =
    "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary text-muted-foreground transition-all outline-none";

  const onSubmit = async (values: ProfileFormValues) => {
    setServerError(null);

    const payload: ProfilePayload = {
      ...values,
      phone: values.phone || null,
      address: values.address || null,
      birthPlace: values.birthPlace || null,
      birthDate: values.birthDate || null,
      religion: values.religion || null,
    };

    try {
      await update(payload);
    } catch (error: unknown) {
      handleFormError<ProfileFormValues>(error, setError, setServerError);
    }
  };

  return (
    <TemplateModal
      title="Update Profile"
      classSize="max-w-2xl"
      cancelButton={close}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        {/* Section: Informasi Dasar */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Informasi Dasar
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Input
                className={inputStyle}
                placeholder="Nama Lengkap"
                {...register("name")}
              />
              <ErrorLabel message={errors.name?.message} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Input
                  className={inputStyle}
                  placeholder="Username"
                  {...register("username")}
                />
                <ErrorLabel message={errors.username?.message} />
              </div>
              <div>
                <Input
                  type="email"
                  className={inputStyle}
                  placeholder="Email"
                  {...register("email")}
                />
                <ErrorLabel message={errors.email?.message} />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Data Pribadi */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Data Pribadi
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                className={inputStyle}
                placeholder="Tempat Lahir"
                {...register("birthPlace")}
              />
              <ErrorLabel message={errors.birthPlace?.message} />
            </div>
            <div>
              <Input
                type="date"
                className={inputStyle}
                {...register("birthDate")}
              />
              <ErrorLabel message={errors.birthDate?.message} />
            </div>
            <div>
              <Input
                className={inputStyle}
                placeholder="Agama"
                {...register("religion")}
              />
              <ErrorLabel message={errors.religion?.message} />
            </div>
            <div>
              <Select
                onValueChange={(val) => setValue("gender", val)}
                value={gender}
              >
                <SelectTrigger className={inputStyle}>
                  <SelectValue placeholder="Pilih Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki Laki">Laki Laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              <ErrorLabel message={errors.gender?.message} />
            </div>
          </div>
        </div>

        {/* Section: Kontak */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Kontak
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <Input
                className={inputStyle}
                placeholder="Nomor Telepon"
                {...register("phone")}
              />
              <ErrorLabel message={errors.phone?.message} />
            </div>
            <div className="col-span-2">
              <textarea
                className={`${inputStyle} resize-none h-24 md:h-20 text-sm`}
                placeholder="Alamat"
                {...register("address")}
              />
              <ErrorLabel message={errors.address?.message} />
            </div>
          </div>
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
          Update Profile
        </Button>
      </form>
    </TemplateModal>
  );
}
