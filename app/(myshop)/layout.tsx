import StoreProvider from "../StoreProvider";
import NavbarComponent from "@/components/navbar/navbar";

export default function MyShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Rendering MyShop Layout");

  return (  
    <html lang="en" className="flex flex-col w-full scrollbar-hide">
      <body className="flex flex-col w-full min-h-screen">
        <StoreProvider>
          <header>
            <NavbarComponent />
          </header>
          <main className="flex flex-grow h-full w-full justify-between">
            <div className="w-full flex flex-grow items-start justify-center">
              {children}
            </div>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
