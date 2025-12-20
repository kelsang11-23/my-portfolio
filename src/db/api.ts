import { supabase } from './supabase';
import type { Message, Visitor } from '@/types/types';

// ==================== 留言板 API ====================

/**
 * 获取所有留言（按时间倒序）
 */
export async function getMessages(limit = 50): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('获取留言失败:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

/**
 * 创建新留言
 */
export async function createMessage(
  visitor_name: string,
  message: string,
  email?: string
): Promise<Message | null> {
  // 清理空字符串为 null
  const cleanEmail = email?.trim() || null;

  const { data, error } = await supabase
    .from('messages')
    .insert({
      visitor_name: visitor_name.trim(),
      message: message.trim(),
      email: cleanEmail,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('创建留言失败:', error);
    throw new Error('留言发送失败，请稍后重试');
  }

  return data;
}

/**
 * 获取留言总数
 */
export async function getMessagesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('获取留言数量失败:', error);
    return 0;
  }

  return count || 0;
}

// ==================== 访客记录 API ====================

/**
 * 记录访客访问
 */
export async function recordVisit(
  page_url: string,
  user_agent?: string,
  referrer?: string
): Promise<void> {
  const { error } = await supabase.from('visitors').insert({
    page_url,
    user_agent: user_agent || null,
    referrer: referrer || null,
  });

  if (error) {
    console.error('记录访客失败:', error);
  }
}

/**
 * 获取访客记录（按时间倒序）
 */
export async function getVisitors(limit = 100): Promise<Visitor[]> {
  const { data, error } = await supabase
    .from('visitors')
    .select('*')
    .order('visit_time', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('获取访客记录失败:', error);
    return [];
  }

  return Array.isArray(data) ? data : [];
}

/**
 * 获取访客总数
 */
export async function getVisitorsCount(): Promise<number> {
  const { count, error } = await supabase
    .from('visitors')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('获取访客数量失败:', error);
    return 0;
  }

  return count || 0;
}

/**
 * 获取今日访客数
 */
export async function getTodayVisitorsCount(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('visitors')
    .select('*', { count: 'exact', head: true })
    .gte('visit_time', today.toISOString());

  if (error) {
    console.error('获取今日访客数量失败:', error);
    return 0;
  }

  return count || 0;
}
