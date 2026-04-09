"use client";

import AuthFooterLink from "@/components/molecules/AuthFooterLink";
import AuthLeftPanel from "@/components/organisms/AuthLeftPanel";
import AuthRightPanel from "@/components/organisms/AuthRightPanel";
import GuestLayout from "@/components/templates/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { urlPage } from "@/lib/util/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    window.location.href = urlPage.RESET_PASSWORD;
    router.push(urlPage.RESET_PASSWORD);
  };

  return (
    <GuestLayout cardClassName="md:min-h-[539px] lg:min-h-[507px]">
      <AuthLeftPanel imageSrc="/img/forgot.svg" />

      <AuthRightPanel
        heading="Recover Access, Stay Organized."
        headingClassName="md:-mb-3"
        centeredContent
      >
        <div className="flex flex-col gap-3">
          <Input
            type="email"
            name="email"
            className="border text-secondary-foreground"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <Button
          onClick={handleSubmit}
          size="lg"
          className="mt-5 w-full rounded-full h-11 bg-primary-gradient"
        >
          Reset Password
        </Button>

        <AuthFooterLink
          label="Back to login?"
          linkText="Here"
          href={urlPage.LOGIN}
        />
      </AuthRightPanel>
    </GuestLayout>
  );
}
