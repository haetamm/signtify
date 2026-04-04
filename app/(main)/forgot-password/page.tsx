"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { urlPage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    window.location.href = urlPage.LOGIN;
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center bg-background p-6">
      <div className="flex w-full max-w-4xl rounded-3xl overflow-hidden md:shadow-2xl md:bg-secondary md:min-h-[539px] lg:min-h-[507px]">
        {/* Left Panel */}
        <div className="w-2/5 relative hidden md:block bg-primary-gradient">
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {/* Pencils decoration */}
            <div className="flex gap-2">
              <Image width="270" height="270" src="/img/reset.svg" alt="" />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col justify-start px-2 md:px-10 py-10">
          {/* Logo - tetap di atas */}
          <div className="flex items-center gap-2 mb-6">
            <Image
              height="28"
              width="28"
              src="/img/logo.svg"
              alt=""
              className="rounded-md flex items-center justify-center font-black text-white text-sm"
            />
            <span className="text-foreground font-bold text-2xl tracking-tight">
              Signtify
            </span>
          </div>

          {/* Heading - tetap di atas */}
          <h1 className="text-2xl font-extrabold text-foreground mb-6 md:-mb-3">
            Reset Your Password, Stay Organized .
          </h1>

          {/* Container form, button, link - akan terpush ke tengah vertikal */}
          <div className="flex-1 flex flex-col justify-center">
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
              className="mt-5 w-full rounded-full h-11"
            >
              Send Request
            </Button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-400 mt-6">
              Have an account already?{" "}
              <Link
                href={urlPage.LOGIN}
                className="text-foreground text-xs font-semibold hover:text-primary transition"
              >
                Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
