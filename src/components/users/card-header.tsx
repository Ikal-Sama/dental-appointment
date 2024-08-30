"use client";

interface HeaderProps {
  title: string;
  label: string;
}
export const Header = ({ label, title }: HeaderProps) => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-primary mb-1 text-teal-500">
        {title}
      </h1>
      <p>{label}</p>
    </div>
  );
};
