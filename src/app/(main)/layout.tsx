import StreamClientProvider from "@/components/providers/StreamClientProvider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <StreamClientProvider>{children}</StreamClientProvider>;
};

export default Layout;
