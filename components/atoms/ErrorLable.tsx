import { FC } from "react";

interface ErrorLabelProps {
  message?: string;
}

export const ErrorLabel: FC<ErrorLabelProps> = ({ message }) => {
  if (!message) return null;

  return <p className="mt-1 px-3 text-xs text-red-500">{message}</p>;
};
