import "@styles/globals.css";
import { Children, ReactNode } from "react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "PromptyDumpty",
  description: "Find & Share AI Prompts",
};

type Props = {
    children: ReactNode;
};

const RootLayout = (props: Props) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        
        <main className="app">
          <Nav />
          {props.children}
          </main>
      </body>
    </html>
  );
};

export default RootLayout;
