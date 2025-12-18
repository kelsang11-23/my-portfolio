// Supabase client placeholder
// 这是一个占位文件，因为本项目不需要数据库功能

const mockSupabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error('Not implemented') }),
    signUp: async () => ({ data: { user: null, session: null }, error: new Error('Not implemented') }),
    signOut: async () => ({ error: null })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        maybeSingle: async () => ({ data: null, error: null })
      })
    })
  })
};

export const supabase = mockSupabase as any;
