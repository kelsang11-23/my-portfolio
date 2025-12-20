import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, Mail, User, Calendar, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getMessages, createMessage, getMessagesCount } from '@/db/api';
import type { Message } from '@/types/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface MessageFormData {
  visitor_name: string;
  email: string;
  message: string;
}

export default function GuestbookPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<MessageFormData>({
    defaultValues: {
      visitor_name: '',
      email: '',
      message: '',
    },
  });

  // 加载留言
  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const [messagesData, count] = await Promise.all([
        getMessages(50),
        getMessagesCount(),
      ]);
      setMessages(messagesData);
      setTotalMessages(count);
    } catch (error) {
      console.error('加载留言失败:', error);
      toast({
        title: '加载失败',
        description: '无法加载留言，请刷新页面重试',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // 提交留言
  const onSubmit = async (data: MessageFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createMessage(data.visitor_name, data.message, data.email);
      
      toast({
        title: '留言成功',
        description: '感谢您的留言！',
      });

      // 重置表单
      form.reset();

      // 重新加载留言
      await loadMessages();
    } catch (error) {
      toast({
        title: '留言失败',
        description: error instanceof Error ? error.message : '请稍后重试',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 格式化时间
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes <= 1 ? '刚刚' : `${minutes}分钟前`;
      }
      return `${hours}小时前`;
    }
    if (days === 1) return '昨天';
    if (days < 7) return `${days}天前`;

    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 pt-20 pb-12 px-4">
      {/* 返回首页按钮 */}
      <div className="container mx-auto max-w-4xl mb-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <Home className="w-4 h-4" />
            返回首页
          </Button>
        </Link>
      </div>

      <div className="container mx-auto max-w-4xl">
        {/* 页面标题 */}
        <div className="text-center mb-8 xl:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-primary/10 mb-4">
            <MessageSquare className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold mb-2">留言板</h1>
          <p className="text-muted-foreground">
            欢迎留下您的足迹，期待与您交流 💬
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            共收到 <span className="font-semibold text-primary">{totalMessages}</span> 条留言
          </p>
        </div>

        {/* 留言表单 */}
        <Card className="rounded-3xl border-2 mb-8 xl:mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              发表留言
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="visitor_name"
                    rules={{
                      required: '请输入您的昵称',
                      minLength: { value: 2, message: '昵称至少2个字符' },
                      maxLength: { value: 20, message: '昵称最多20个字符' },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>昵称 *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              {...field}
                              placeholder="请输入您的昵称"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: '请输入有效的邮箱地址',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱（选填）</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="your@email.com"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  rules={{
                    required: '请输入留言内容',
                    minLength: { value: 5, message: '留言至少5个字符' },
                    maxLength: { value: 500, message: '留言最多500个字符' },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>留言内容 *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="写下您想说的话..."
                          className="min-h-[120px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '发送中...' : '发送留言'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* 留言列表 */}
        <div className="space-y-4">
          <h2 className="text-xl xl:text-2xl font-bold mb-4">所有留言</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="rounded-3xl border-2">
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-3 bg-muted rounded w-1/3"></div>
                      <div className="h-16 bg-muted rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <Card className="rounded-3xl border-2">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">还没有留言，快来抢沙发吧！</p>
              </CardContent>
            </Card>
          ) : (
            messages.map((msg) => (
              <Card
                key={msg.id}
                className="rounded-3xl border-2 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm xl:text-base">
                        {msg.visitor_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm xl:text-base">
                          {msg.visitor_name}
                        </h3>
                        {msg.email && (
                          <span className="text-xs text-muted-foreground truncate">
                            {msg.email}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(msg.created_at)}</span>
                      </div>
                      <p className="text-sm xl:text-base text-foreground whitespace-pre-wrap break-words">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}