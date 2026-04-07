"use client";

import OrDivider from "@/components/atoms/OrDivider";
import AuthFooterLink from "@/components/molecules/AuthFooterLink";
import AuthLeftPanel from "@/components/organisms/AuthLeftPanel";
import AuthRightPanel from "@/components/organisms/AuthRightPanel";
import GuestLayout from "@/components/templates/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { urlPage } from "@/lib/util/helper";
import { useState } from "react";
import { GrGoogle } from "react-icons/gr";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    window.location.href = urlPage.DASHBOARD;
  };

  return (
    <GuestLayout>
      <AuthLeftPanel
        imageSrc="/img/folder.svg"
        imageWidth={500}
        imageHeight={500}
      />

      <AuthRightPanel heading="Keep Your Documents Organized .">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="username"
            className="border text-secondary-foreground"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            className="border text-secondary-foreground"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <Button
          onClick={handleSubmit}
          size="lg"
          className="mt-5 w-full rounded-full h-11 "
        >
          Sign in
        </Button>

        <OrDivider />

        <div className="flex justify-center gap-4">
          <Button
            variant="tertiary"
            size="lg"
            disabled
            className="w-11 h-11 rounded-full h-11 "
          >
            <GrGoogle className="text-[44px]" />
          </Button>
        </div>

        <AuthFooterLink
          label="Forgot Password?"
          linkText="Here"
          href={urlPage.FORGOT_PASSWORD}
        />
      </AuthRightPanel>
    </GuestLayout>
  );
}
