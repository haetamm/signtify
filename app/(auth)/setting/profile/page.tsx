"use client";

import React from "react";

import PageHeader from "@/components/molecules/PageHeader";
import AccountInfoCard from "@/components/organisms/AccountInfoCard";
import PersonalInfoCard from "@/components/organisms/PersonalInfoCard";
import SecurityCard from "@/components/organisms/SecurityCard";
import { useModalStore } from "@/lib/stores/useModalStore";
import { Pencil } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { open } = useModalStore();
  const handleEdit = () => {
    open({ type: "updateProfile" });
  };

  return (
    <div className="min-h-[calc(100vh-128px)] bg-background">
      <div className="w-full mx-auto">
        {/* CONTENT */}
        <main className="px-3 sm:px-4 lg:px-8 py-6 flex flex-col gap-2 dark:gap-3">
          {/* HEADER */}
          <PageHeader title="Profile Saya" onAction={handleEdit}>
            <Pencil className="w-3.5 h-3.5" />
            Edit Profile
          </PageHeader>

          {/* Personal Information + Address */}
          <PersonalInfoCard />

          {/* Account Information */}
          <AccountInfoCard />

          {/* Security */}
          <SecurityCard />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
