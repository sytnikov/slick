"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  submittingText?: string;
  style: "primary" | "secondary" | "tertiary";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}
export default function Button({
  text,
  submittingText,
  style,
  type,
  onClick,
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className={
        style === "primary"
          ? "btn btn-primary"
          : style === "secondary"
          ? "btn btn-secondary"
          : "btn btn-tertiary"
      }
      title={"primary button"}
      type={type}
      onClick={onClick}
    >
      {pending ? submittingText : text}
    </button>
  );
}
