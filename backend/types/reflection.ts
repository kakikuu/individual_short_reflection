export interface getReflections {
  id: string;
  user_id: string;
  title: string;
  what_miss: string;
  why_miss: string;
  prevent_miss: string;
  created_at: Date;
}

export interface inputReflection {
  user_id: string;
  title: string;
  what_miss: string;
  why_miss: string;
  prevent_miss: string;
}
