import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BabyShark VC 🦈 — AI mentor who pays real USDT",
  description:
    "An AI mentor-investor that reviews kids' coding work and pays out USDT when milestones are hit. The AI judges the work; code controls the money.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#FFFDF5] font-sans antialiased">{children}</body>
    </html>
  );
}
