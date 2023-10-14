"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function SignInForm() {
  const handleSignInWithGoogle = () => {
    signIn("google");
  };

  return (
    <div>
      <Button onClick={handleSignInWithGoogle}>Sign In With Google</Button>
    </div>
  );
}

export default SignInForm;
