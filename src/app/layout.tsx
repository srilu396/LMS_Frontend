import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Script from "next/script";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata = {
  title: "Admin Dashboard",
  description: "LMS Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (window.location.pathname.startsWith('/login') || !localStorage.getItem('theme_default_v1')) {
                  localStorage.removeItem('theme');
                  localStorage.setItem('theme_default_v1', 'true');
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {}
            `,
          }}
        />
        <Script
          id="console-override"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const orig = console.error;
              console.error = function(...args) {
                if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) return;
                orig.apply(console, args);
              };
            `
          }}
        />
      </head>
      <body className="bg-background text-foreground m-0 p-0 antialiased min-h-screen" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <TooltipProvider>
                <Toaster position="top-right" />
                {children}
              </TooltipProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
