import AuthLeftPanel from "@/components/organisms/AuthLeftPanel";
import AuthRightPanel from "@/components/organisms/AuthRightPanel";
import ForgotPassForm from "@/components/organisms/ForgotPassForm";
import GuestLayout from "@/components/templates/GuestLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — Signtify",
  description: "Recover Access, Stay Organized.",
};

export default function ForgotPassword() {
  return (
    <GuestLayout cardClassName="md:min-h-[539px] lg:min-h-[507px]">
      <AuthLeftPanel imageSrc="/img/forgot.svg" />

      <AuthRightPanel
        heading="Recover Access, Stay Organized."
        headingClassName="md:-mb-3"
        centeredContent
      >
        <ForgotPassForm />
      </AuthRightPanel>
    </GuestLayout>
  );
}
