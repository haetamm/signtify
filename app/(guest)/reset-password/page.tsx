import AuthLeftPanel from "@/components/organisms/AuthLeftPanel";
import AuthRightPanel from "@/components/organisms/AuthRightPanel";
import ResetPassForm from "@/components/organisms/ResetPassForm";
import { ResetPassFormSkeleton } from "@/components/organisms/ResetPassFormSkeleton";
import GuestLayout from "@/components/templates/GuestLayout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password — Signtify",
  description: "Reset Your Password, Stay Organized .",
};

export default function ResetPassword() {
  return (
    <GuestLayout cardClassName="md:min-h-[539px] lg:min-h-[507px]">
      <AuthLeftPanel imageSrc="/img/reset.svg" />

      <AuthRightPanel
        heading="Reset Your Password, Stay Organized ."
        headingClassName="md:mb-0"
        centeredContent
      >
        <Suspense fallback={<ResetPassFormSkeleton />}>
          <ResetPassForm />
        </Suspense>
      </AuthRightPanel>
    </GuestLayout>
  );
}
