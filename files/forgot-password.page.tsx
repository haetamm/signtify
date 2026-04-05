"use client";

import { useState } from "react";
import AuthTemplate from "@/components/templates/AuthTemplate";
import AuthLeftPanel from "@/components/organisms/AuthLeftPanel";
import AuthRightPanel from "@/components/organisms/AuthRightPanel";
import AuthInput from "@/components/atoms/AuthInput";
import AuthButton from "@/components/atoms/AuthButton";
import AuthFooterLink from "@/components/molecules/AuthFooterLink";
import { urlPage } from "@/constants/urlPage";

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    window.location.href = urlPage.LOGIN;
  };

  return (
    <AuthTemplate cardClassName="md:min-h-[539px] lg:min-h-[507px]">
      <AuthLeftPanel imageSrc="/img/forgot.svg" />

      <AuthRightPanel
        heading="Recover Access, Stay Organized."
        headingClassName="md:-mb-3"
        centeredContent
      >
        <div className="flex flex-col gap-3">
          <AuthInput
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <AuthButton onClick={handleSubmit} className="mt-5">
          Reset Password
        </AuthButton>

        <AuthFooterLink
          label="Have an account already?"
          linkText="Here"
          href={urlPage.LOGIN}
        />
      </AuthRightPanel>
    </AuthTemplate>
  );
}
