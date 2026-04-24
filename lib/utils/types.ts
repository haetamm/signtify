export type FieldErrors = {
  code?: number;
  general?: string;
  [key: string]: string | number | undefined;
};

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

export type ErrorResponse = {
  code: number;
  status: string;
  messages?:
    | string
    | {
        path: string;
        message: string;
      }[];
};

export type SetErrorFn<T> = (
  name: keyof T,
  error: { type: string; message?: string },
) => void;
