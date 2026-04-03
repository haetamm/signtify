"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { GrGoogle } from "react-icons/gr";

export default function Home() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="flex w-full max-w-4xl rounded-3xl overflow-hidden md:shadow-2xl md:bg-secondary">
        {/* Left Panel */}
        <div className="w-2/5 relative hidden md:block bg-primary-gradient">
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {/* Pencils decoration */}
            <div className="flex gap-2">
              <Image width="500" height="500" src="/img/folder.svg" alt="" />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col justify-center px-2 md:px-10 py-10">
          {/* Logo */}
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

          {/* Heading */}
          <h1 className="text-2xl font-extrabold text-foreground mb-6">
            Keep Your Documents organized .
          </h1>

          {/* Form */}
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

          <Button size="lg" className="mt-5 w-full rounded-full h-11">
            Sign in
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Buttons */}
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

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Forgot Password?{" "}
            <a
              href="#"
              className="text-foreground font-semibold hover:text-primary transition"
            >
              Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
