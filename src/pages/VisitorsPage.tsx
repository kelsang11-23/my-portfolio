import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Eye, Calendar, TrendingUp, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  getVisitors,
  getVisitorsCount,
  getTodayVisitorsCount,
} from '@/db/api';
import type { Visitor } from '@/types/types';

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVisitors();
  }, []);

  const loadVisitors = async () => {
    setIsLoading(true);
    try {
      const [visitorsData, total, today] = await Promise.all([
        getVisitors(100),
        getVisitorsCount(),
        getTodayVisitorsCount(),
      ]);
      setVisitors(visitorsData);
      setTotalVisitors(total);
      setTodayVisitors(today);
    } catch (error) {
      console.error('加载访客记录失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getPageName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      if (path === '/' || path === '') return '首页';
      if (path.includes('guestbook')) return '留言板';
      if (path.includes('visitors')) return '访客记录';
      return path;
    } catch {
      return url;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 pt-20 pb-12 px-4">
      {/* 返回首页按钮 */}
      <div className="container mx-auto max-w-6xl mb-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <Home className="w-4 h-4" />
            返回首页
          </Button>
        </Link>
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* 页面标题 */}
        <div className="text-center mb-8 xl:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-primary/10 mb-4">
            <Users className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold mb-2">访客记录</h1>
          <p className="text-muted-foreground">感谢每一位访问者的到来 👋</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6 mb-8">
          <Card className="rounded-3xl border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">总访问量</p>
                  <p className="text-2xl font-bold">{totalVisitors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">今日访问</p>
                  <p className="text-2xl font-bold">{todayVisitors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-lavender/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">最近记录</p>
                  <p className="text-2xl font-bold">{visitors.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 访客列表 */}
        <Card className="rounded-3xl border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              访问记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : visitors.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">暂无访客记录</p>
              </div>
            ) : (
              <div className="space-y-3">
                {visitors.map((visitor) => (
                  <div
                    key={visitor.id}
                    className="p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">
                            {getPageName(visitor.page_url)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(visitor.visit_time)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {visitor.page_url}
                        </p>
                        {visitor.referrer && (
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            来源: {visitor.referrer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}