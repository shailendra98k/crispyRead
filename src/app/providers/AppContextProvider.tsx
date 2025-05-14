"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { headers, publicRuntimeConfig } from "../../../next.config";
import { CRISPY_READ_CORE_BASE_URL, getCookie } from "@/utils/constant";
import CrispyReadClient from "../client/CrispyReadClient";

export enum UserType {
  LOGGED_IN = "loggedIn",
  GUEST = "guest",
}
enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
export interface Category {
  id: string;
  name: string;
}
export interface UserDetails {
  id?: number;
  type: UserType;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  authToken?: string;
}
export interface AppContextType {
  categories: Category[];
  user: any;
}
export interface AppContextProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useState<UserDetails>(
    window.localStorage.getItem("user")
      ? JSON.parse(window.localStorage.getItem("user") as string)
      : { type: UserType.GUEST }
  );

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      setUser(await CrispyReadClient.fetchUserInfo());
    };

    const fetchCategories = async () => {
      setCategories(await CrispyReadClient.fetchCategories());
    };

    user?.id && fetchUserInfo();
    fetchCategories();
  }, []);

  return (
    <AppContext.Provider value={{ categories, user }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to use the AppContext
 * @returns AppContextType
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
