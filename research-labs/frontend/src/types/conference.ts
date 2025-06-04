import { Publication } from "./publication";

export interface Conference {
  id: string;
  name: string;
  description: string;
  location: string;
  start_date: string;  // assuming ISO string
  end_date: string;    // assuming ISO string
  publications: Publication[];
}
