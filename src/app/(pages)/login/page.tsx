import CrispyReadClient from "@/app/client/CrispyReadClient";
import { useAppContext } from "@/app/providers/AppContextProvider";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import React from "react";
export const dynamic = "force-dynamic";

let window: any = { location: { href: "" } , localStorage: { setItem: () => {} } };
export default function App() {
  const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    provider,
    formData
  ) => {
    CrispyReadClient.login({
      username: formData.get("email") as string,
      password: formData.get("password") as string,
    })
      .then((response: any) => {
        if (response.active) {
          window.localStorage.setItem("user", JSON.stringify(response));
          window.location.replace("/");
        } else {
          console.error("Login failed");
          // Handle login failure here
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error here
      });
  };

  const providers = [{ id: "credentials", name: "Email and Password" }];
  return (
    <SignInPage
      signIn={signIn}
      providers={providers}
      slotProps={{
        emailField: { autoFocus: false },
        form: { noValidate: true },
      }}
    />
  );
}
