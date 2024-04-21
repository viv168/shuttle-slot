import "../styles/globals.css";

export const metadata = {
  title: "Next.js Authentication",
  description: "Example using NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="m-0 h-full flex items-center justify-center">
      <body className="bg-blue-50 p-5 md:p-0 md:py-5 w-full h-full flex flex-row justify-center items-center">
        <div className="bg-blue-100 h-full flex flex-col flex-1 w-full md:m-5 rounded-lg shadow-blue-500 shadow-lg p-2 md:p-5 overflow-y-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}
