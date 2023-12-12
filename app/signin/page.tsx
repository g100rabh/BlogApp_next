import LoginForm from "@/components/authentication/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

const SignIn = async () => {
  const session = await getServerSession();
  console.log(session?.user,"=======>user")
  if (session) {
    redirect("/");
  }

  return <LoginForm />;
};

export default SignIn;
