import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-10">
      <SignInButton />
    </div>
  );
}
