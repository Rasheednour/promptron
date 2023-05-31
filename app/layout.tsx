import "@styles/globals.css";
import { Children, ReactNode } from "react";

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
        <main className="app">{props.children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
