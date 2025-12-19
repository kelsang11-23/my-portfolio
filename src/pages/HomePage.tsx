import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, Heart, Code, Book, Music, Palette, Camera, Coffee } from 'lucide-react';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'hobbies', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 xl:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl xl:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-lavender bg-clip-text text-transparent">
              我的个人网站
            </div>
            <div className="hidden xl:flex gap-6">
              {[
                { id: 'hero', label: '首页' },
                { id: 'about', label: '关于我' },
                { id: 'hobbies', label: '兴趣爱好' },
                { id: 'skills', label: '技能特长' },
                { id: 'contact', label: '联系方式' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {/* 移动端菜单按钮 */}
            <button
              className="xl:hidden p-2"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                if (menu) {
                  menu.classList.toggle('hidden');
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {/* 移动端菜单 */}
          <div id="mobile-menu" className="hidden xl:hidden pb-4">
            {[
              { id: 'hero', label: '首页' },
              { id: 'about', label: '关于我' },
              { id: 'hobbies', label: '兴趣爱好' },
              { id: 'skills', label: '技能特长' },
              { id: 'contact', label: '联系方式' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  const menu = document.getElementById('mobile-menu');
                  if (menu) {
                    menu.classList.add('hidden');
                  }
                }}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                  activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center gap-6 xl:gap-8">
            <div className="relative">
              <div className="w-32 h-32 xl:w-48 xl:h-48 rounded-full bg-gradient-to-br from-primary via-secondary to-lavender p-1">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <img
                    src="https://miaoda-site-img.cdn.bcebos.com/images/40d9de32-7639-4433-a5f9-ba17ad250207.jpg"
                    alt="个人头像"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 xl:w-16 xl:h-16 rounded-full bg-secondary flex items-center justify-center">
                <Heart className="w-6 h-6 xl:w-8 xl:h-8 text-secondary-foreground" />
              </div>
            </div>
            <div className="space-y-3 xl:space-y-4">
              <h1 className="text-3xl xl:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-lavender bg-clip-text text-transparent">
                你好，我是 [格桑旺姆]
              </h1>
              <p className="text-base xl:text-2xl text-muted-foreground max-w-2xl">
                一个热爱生活、追求梦想的 [经济学院] 学生
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => scrollToSection('about')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 xl:px-8"
              >
                了解更多
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="rounded-full px-6 xl:px-8 border-primary text-primary hover:bg-primary/10"
              >
                联系我
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-16 xl:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl xl:text-4xl font-bold text-center mb-8 xl:mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            关于我
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 max-w-6xl mx-auto">
            <Card className="rounded-3xl border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Book className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-bold">基本信息</h3>
                </div>
                <div className="space-y-3 text-sm xl:text-base text-muted-foreground">
                  <p><span className="font-semibold text-foreground">姓名：</span>[格桑旺姆]</p>
                  <p><span className="font-semibold text-foreground">年龄：</span>[19]</p>
                  <p><span className="font-semibold text-foreground">家乡：</span>[西藏林芝]</p>
                  <p><span className="font-semibold text-foreground">座右铭：</span>[迎万难 赢万难]</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Book className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-bold">教育背景</h3>
                </div>
                <div className="space-y-3 text-sm xl:text-base text-muted-foreground">
                  <p><span className="font-semibold text-foreground">学校：</span>[武汉理工大学]</p>
                  <p><span className="font-semibold text-foreground">专业：</span>[智能经济]</p>
                  <p><span className="font-semibold text-foreground">学历：</span>[本科]</p>
                  <p><span className="font-semibold text-foreground">入学时间：</span>[2024]</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-2 hover:shadow-lg transition-shadow xl:col-span-2">
              <CardContent className="p-6 xl:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-lavender" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-bold">个人简介</h3>
                </div>
                <p className="text-sm xl:text-base text-muted-foreground leading-relaxed">
                  [大家好，我性格比较开朗，在熟人面前比较e.希望能跟大家成为朋友。]
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="min-h-screen py-16 xl:py-24 px-4 bg-accent/30">
        <div className="container mx-auto">
          <h2 className="text-2xl xl:text-4xl font-bold text-center mb-8 xl:mb-16 bg-gradient-to-r from-secondary to-lavender bg-clip-text text-transparent">
            兴趣爱好
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Music className="w-8 h-8 xl:w-12 xl:h-12" />,
                title: '音乐',
                description: '喜欢听各种类型的音乐，偶尔也参加唱歌表演',
                color: 'primary',
                image: 'https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_259aeb8e-119c-4541-8a61-be0023689945.jpg'
              },
              {
                icon: <Book className="w-8 h-8 xl:w-12 xl:h-12" />,
                title: '阅读',
                description: '热爱阅读各类书籍，从小说到专业书籍都有涉猎',
                color: 'secondary',
                image: 'https://miaoda-image.cdn.bcebos.com/img/corpus/f8e9505e0cc9404c87fccddc50ca0041.jpg'
              },
              {
                icon: <Camera className="w-8 h-8 xl:w-12 xl:h-12" />,
                title: '摄影',
                description: '喜欢用镜头记录生活中的美好瞬间',
                color: 'lavender',
                image: 'https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_cc1cfb82-e0ee-425f-bd83-e3e21c0e7df2.jpg'
              },
              {
                icon: <Palette className="w-8 h-8 xl:w-12 xl:h-12" />,
                title: '绘画',
                description: '享受用画笔表达创意和想法的过程',
                color: 'peach',
                image: 'https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_e47166ca-1d1e-460c-8d56-58360b53cbcb.jpg'
              },
              {
                icon: <Code className="w-8 h-8 xl:w-12 xl:h-12" />,
                title: '打羽毛球',
                description: '既可以锻炼身体，也非常有趣。',
                color: 'sky-blue',
                image: 'https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_e6ee021a-4f77-477c-a90f-2e8cec2d5652.jpg'
              },
              {
                icon: <Coffee className="w-8 h-8 xl:w-12 xl:h-12" />,
                title: '咖啡',
                description: '喜欢品尝不同风味的咖啡，探索咖啡文化',
                color: 'lemon',
                image: 'https://miaoda-image.cdn.bcebos.com/img/corpus/c919883e15fd48d199235001f176b7a0.jpg'
              }
            ].map((hobby, index) => (
              <Card key={index} className="rounded-3xl border-2 hover:shadow-lg transition-all hover:-translate-y-2">
                <CardContent className="p-6 xl:p-8">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-accent to-muted mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={hobby.image}
                      alt={hobby.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`w-12 h-12 xl:w-16 xl:h-16 rounded-full flex items-center justify-center mb-4 ${
                    hobby.color === 'primary' ? 'bg-primary/20 text-primary' :
                    hobby.color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                    hobby.color === 'lavender' ? 'bg-lavender/20 text-lavender' :
                    hobby.color === 'peach' ? 'bg-peach/20 text-peach' :
                    hobby.color === 'sky-blue' ? 'bg-sky-blue/20 text-sky-blue' :
                    'bg-lemon/20 text-lemon'
                  }`}>
                    {hobby.icon}
                  </div>
                  <h3 className="text-lg xl:text-xl font-bold mb-2">{hobby.title}</h3>
                  <p className="text-sm xl:text-base text-muted-foreground">{hobby.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-16 xl:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl xl:text-4xl font-bold text-center mb-8 xl:mb-16 bg-gradient-to-r from-lavender to-primary bg-clip-text text-transparent">
            技能特长
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 max-w-6xl mx-auto">
            <Card className="rounded-3xl border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 xl:p-8">
                <h3 className="text-xl xl:text-2xl font-bold mb-6">擅长技能</h3>
                <div className="space-y-4">
                  {[
                    { name: '打羽毛球', level: 85, color: 'bg-primary' },
                    { name: '唱歌', level: 75, color: 'bg-secondary' },
                    { name: '跳舞', level: 70, color: 'bg-lavender' }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm xl:text-base font-medium">{skill.name}</span>
                        <span className="text-sm xl:text-base text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 xl:h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${skill.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 xl:p-8">
                <h3 className="text-xl xl:text-2xl font-bold mb-6">语言能力</h3>
                <div className="space-y-4">
                  {[
                    { name: '中文', level: 90, color: 'bg-primary' },
                    { name: '藏语', level: 100, color: 'bg-secondary' },
                    { name: '英语', level: 20, color: 'bg-lavender' }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm xl:text-base font-medium">{skill.name}</span>
                        <span className="text-sm xl:text-base text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 xl:h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${skill.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-16 xl:py-24 px-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-lavender/10">
        <div className="container mx-auto">
          <h2 className="text-2xl xl:text-4xl font-bold text-center mb-8 xl:mb-16 bg-gradient-to-r from-primary via-secondary to-lavender bg-clip-text text-transparent">
            联系方式
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="rounded-3xl border-2 shadow-lg">
              <CardContent className="p-8 xl:p-12">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="past061123@qq.com">邮箱</p>
                        <p className="past061123@qq.com">your.email@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">电话</p>
                        <p className="font-medium">+86 123 4567 8900</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-lavender" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">位置</p>
                        <p className="font-medium">[武汉]</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">社交媒体</h3>
                    <div className="flex gap-4">
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
                      >
                        <Github className="w-6 h-6 text-primary" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-secondary/30 transition-colors"
                      >
                        <Linkedin className="w-6 h-6 text-secondary" />
                      </a>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm xl:text-base text-muted-foreground leading-relaxed">
                        欢迎通过以上方式与我联系，我很乐意与你交流学习、工作或其他有趣的话题！
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 [格桑旺姆]. All rights reserved.</p>
          <p className="mt-2">用 ❤️ 制作</p>
        </div>
      </footer>
    </div>
  );
}
