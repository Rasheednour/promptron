import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ReactNode } from "react";
import { Session } from "next-auth";
import dotenv from "dotenv";
dotenv.config();

export const metadata = {
  title: "Promptron",
  description: "Find & Share AI Prompts",
};

interface RootLayoutProps {
  children: ReactNode;
  session: Session;
}

const RootLayout = ({ children, session }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
