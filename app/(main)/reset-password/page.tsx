"use client";

import AuthLeftPanel from "@/components/organisms/AuthLeftPanel";
import AuthRightPanel from "@/components/organisms/AuthRightPanel";
import GuestLayout from "@/components/templates/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { urlPage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const [form, setForm] = useState({ password: "", passwordConfirmation: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    router.push(urlPage.LOGIN);
  };

  return (
    <GuestLayout cardClassName="md:min-h-[539px] lg:min-h-[507px]">
      <AuthLeftPanel imageSrc="/img/reset.svg" />

      <AuthRightPanel
        heading="Reset Your Password, Stay Organized ."
        headingClassName="md:mb-0"
        centeredContent
      >
        <div className="flex flex-col gap-3">
          <Input
            type="password"
            name="password"
            className="border text-secondary-foreground"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="passwordConfirmation"
            className="border text-secondary-foreground"
            placeholder="Confirm Password"
            value={form.passwordConfirmation}
            onChange={handleChange}
          />
        </div>

        <Button
          onClick={handleSubmit}
          size="lg"
          className="mt-5 w-full rounded-full h-11"
        >
          Change Password
        </Button>
      </AuthRightPanel>
    </GuestLayout>
  );
}
