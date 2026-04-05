"use client";

import { useState } from "react";
import AuthTemplate from "@/components/templates/AuthTemplate";
import AuthLeftPanel from "@/components/organisms/AuthLeftPanel";
import AuthRightPanel from "@/components/organisms/AuthRightPanel";
import AuthInput from "@/components/atoms/AuthInput";
import AuthButton from "@/components/atoms/AuthButton";
import { urlPage } from "@/constants/urlPage";

export default function ResetPassword() {
  const [form, setForm] = useState({ password: "", passwordConfirmation: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    window.location.href = urlPage.LOGIN;
  };

  return (
    <AuthTemplate cardClassName="md:min-h-[539px] lg:min-h-[507px]">
      <AuthLeftPanel imageSrc="/img/reset.svg" />

      <AuthRightPanel
        heading="Reset Your Password, Stay Organized ."
        headingClassName="md:mb-0"
        centeredContent
      >
        <div className="flex flex-col gap-3">
          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <AuthInput
            type="password"
            name="passwordConfirmation"
            placeholder="Password Confirmation"
            value={form.passwordConfirmation}
            onChange={handleChange}
          />
        </div>

        <AuthButton onClick={handleSubmit} className="mt-5">
          Change Password
        </AuthButton>
      </AuthRightPanel>
    </AuthTemplate>
  );
}
