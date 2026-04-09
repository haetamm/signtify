"use client";

import { profileData } from "@/lib/util/resource";
import React from "react";

// Molecules

// Organisms
import ProfilePageHeader from "@/components/molecules/ProfilePageHeader";
import AccountInfoCard from "@/components/organisms/AccountInfoCard";
import PersonalInfoCard from "@/components/organisms/PersonalInfoCard";
import SecurityCard from "@/components/organisms/SecurityCard";
import { handleBack } from "@/lib/util/helper";
import { Pencil } from "lucide-react";

const ProfilePage: React.FC = () => {
  const handleEdit = () => {
    console.log("Edit profile clicked");
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

  return (
    <div className="min-h-[calc(100vh-128px)] bg-background">
      <div className="w-full mx-auto">
        {/* CONTENT */}
        <main className="px-3 sm:px-4 lg:px-8 py-6 flex flex-col gap-2 dark:gap-3">
          {/* HEADER */}
          <ProfilePageHeader
            title="Profile Saya"
            onBack={handleBack}
            onAction={handleEdit}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit Profile
          </ProfilePageHeader>

          {/* Personal Information + Address */}
          <PersonalInfoCard
            name={profileData.name}
            username={profileData.username}
            avatar={profileData.avatar}
            gender={profileData.gender}
            religion={profileData.religion}
            birthPlace={profileData.birthPlace}
            birthDate={profileData.birthDate}
            address={profileData.address}
          />

          {/* Account Information */}
          <AccountInfoCard
            username={profileData.username}
            email={profileData.email}
            createdAt={profileData.createdAt}
            updatedAt={profileData.updatedAt}
          />

          {/* Security */}
          <SecurityCard onChangePassword={handleChangePassword} />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
