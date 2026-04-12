export type StatusBadgeInfo = {
  label: string;
  color: string;
  iconName: string;
};

export type ActivityStyleInfo = {
  iconName: string;
  bgColor: string;
};

export type Contributor = {
  id: string;
  username: string;
  permissionType?: string; // MANAGE | UPLOAD | VIEW
  status?: string; // PENDING | SIGNED | REJECTED
};

export type Layout = "grid" | "list";
