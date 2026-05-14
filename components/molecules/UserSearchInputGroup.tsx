import { UserQueryParam } from "@/lib/types/user";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UserSearchInputGroupProps {
  filters: Pick<UserQueryParam, "name" | "email" | "phone">;
  onChange: (filters: Partial<UserQueryParam>) => void;
}

const UserSearchInputGroup: React.FC<UserSearchInputGroupProps> = ({
  filters,
  onChange,
}) => {
  // Local state — tidak langsung trigger URL/fetch saat ketik
  const [localName, setLocalName] = useState(filters.name);
  const [localEmail, setLocalEmail] = useState(filters.email);
  const [localPhone, setLocalPhone] = useState(filters.phone);

  // Sync local ← filters saat reset atau perubahan dari luar (tanpa useEffect)
  const [prevFilters, setPrevFilters] = useState(filters);
  if (
    filters.name !== prevFilters.name ||
    filters.email !== prevFilters.email ||
    filters.phone !== prevFilters.phone
  ) {
    setPrevFilters(filters);
    setLocalName(filters.name);
    setLocalEmail(filters.email);
    setLocalPhone(filters.phone);
  }

  // Commit ke URL hanya kalau nilai berubah
  const commitName = () => {
    if (localName !== filters.name) onChange({ name: localName, page: 1 });
  };
  const commitEmail = () => {
    if (localEmail !== filters.email) onChange({ email: localEmail, page: 1 });
  };
  const commitPhone = () => {
    if (localPhone !== filters.phone) onChange({ phone: localPhone, page: 1 });
  };

  const onKeyDown =
    (commit: () => void) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.currentTarget.blur();
        commit();
      }
    };

  return (
    <div className="flex-1 flex flex-col sm:flex-row gap-2">
      <Button className="hidden sm:flex w-10 h-10 shadow-md">
        <FaPlus className="w-4 h-4 text-white" />
      </Button>
      <Input
        placeholder="Nama"
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
        onBlur={commitName}
        onKeyDown={onKeyDown(commitName)}
        className="bg-gray-50 dark:bg-primary/10 border dark:border-0 rounded-xl"
      />
      <Input
        placeholder="Email"
        value={localEmail}
        onChange={(e) => setLocalEmail(e.target.value)}
        onBlur={commitEmail}
        onKeyDown={onKeyDown(commitEmail)}
        className="bg-gray-50 dark:bg-primary/10 border dark:border-0 rounded-xl"
      />
      <Input
        placeholder="Nomor Telepon"
        value={localPhone}
        onChange={(e) => setLocalPhone(e.target.value)}
        onBlur={commitPhone}
        onKeyDown={onKeyDown(commitPhone)}
        className="bg-gray-50 dark:bg-primary/10 border dark:border-0 rounded-xl"
      />
    </div>
  );
};

export default UserSearchInputGroup;
