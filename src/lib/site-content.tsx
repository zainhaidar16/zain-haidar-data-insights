import { createContext, useContext } from "react";
export interface SiteContent {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  resume: string;
  calendar: string;
  availability: string;
  portrait: string;
  headline: string;
  headline_accent: string;
  intro: string;
  about: string;
}
export const SiteContentContext = createContext<SiteContent | null>(null);
export function useSiteContent() {
  const value = useContext(SiteContentContext);
  if (!value) throw new Error("Portfolio settings unavailable");
  return value;
}
