// Type definitions placeholder
export interface User {
  id: string;
  email?: string;
  username?: string;
}

export interface Profile {
  id: string;
  username?: string;
  email?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}
// 留言类型
export interface Message {
  id: string;
  visitor_name: string;
  email?: string;
  message: string;
  created_at: string;
}

// 访客记录类型
export interface Visitor {
  id: string;
  page_url: string;
  visit_time: string;
  user_agent?: string;
  referrer?: string;
}