import AuthLeftPanel from "@/components/organisms/AuthLeftPanel";
import AuthRightPanel from "@/components/organisms/AuthRightPanel";
import LoginForm from "@/components/organisms/LoginForm";
import GuestLayout from "@/components/templates/GuestLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — Signtify",
  description: "Keep Your Documents Organized .",
};

export default function LoginPage() {
  return (
    <GuestLayout>
      <AuthLeftPanel
        imageSrc="/img/folder.svg"
        imageWidth={500}
        imageHeight={500}
      />

      <AuthRightPanel heading="Keep Your Documents Organized .">
        <LoginForm />
      </AuthRightPanel>
    </GuestLayout>
  );
}
