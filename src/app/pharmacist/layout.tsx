import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alpha Pharm Staff",
  manifest: "/manifest-pharmacist.json",
};

export default function PharmacistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
