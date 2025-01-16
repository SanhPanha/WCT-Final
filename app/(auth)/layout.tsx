import "../globals.css";
import { AuthProvider } from "@/lib/context/context";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

{
  return (

        <AuthProvider>
              {children}
        </AuthProvider>
  );
}
