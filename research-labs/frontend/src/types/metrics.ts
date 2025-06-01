
export interface Metrics {
  total_users: number;
  users_by_role_status: Array<[string, string, number]>;
  new_users_7d: number;
  new_users_30d: number;
  total_publications: number;
  publications_by_status_visibility: Array<[string, string, number]>;
  new_publications_7d: number;
  new_publications_30d: number;
  total_conferences: number;
  upcoming_conferences_30d: number;
  publications_per_conference: Array<{ 0: string; 1: string; 2: number }>; 
  top_users_by_publications: Array<{ 0: string; 1: string; 2: number }>; 
}
