import React from "react";

interface ProfileIdentityProps {
  name: string;
  username: string;
}

const ProfileIdentity: React.FC<ProfileIdentityProps> = ({ name, username }) => {
  return (
    <div className="md:hidden">
      <div className="text-2xl font-bold tracking-tight">{name}</div>
      <div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
        @{username}
      </div>
    </div>
  );
};

export default ProfileIdentity;
