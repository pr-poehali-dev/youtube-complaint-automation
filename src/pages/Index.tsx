import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    if (!url.trim()) return
    
    setIsLoading(true)
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    // Show success message (in real app would trigger download)
    alert('Видео готово к скачиванию!')
  }

  const isValidUrl = url.includes('youtube.com') || url.includes('youtu.be')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-youtube-light">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-youtube-red rounded-lg flex items-center justify-center">
                <Icon name="Download" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-youtube-dark">YouTube Downloader</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#download" className="text-foreground hover:text-youtube-red transition-colors">Скачать</a>
              <a href="#faq" className="text-foreground hover:text-youtube-red transition-colors">FAQ</a>
              <a href="#contact" className="text-foreground hover:text-youtube-red transition-colors">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="download" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold text-youtube-dark mb-6">
              Скачай видео с <span className="text-youtube-red">YouTube</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Быстрое и бесплатное скачивание видео в высоком качестве. 
              Просто вставь ссылку и получи файл!
            </p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm animate-scale-in">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-youtube-dark">Вставь ссылку на видео</CardTitle>
              <CardDescription>Поддерживаются все форматы YouTube видео</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-lg h-12 border-2 focus:border-youtube-red"
                  />
                </div>
                <Button
                  onClick={handleDownload}
                  disabled={!isValidUrl || isLoading}
                  className="h-12 px-8 bg-youtube-red hover:bg-youtube-red/90 text-white font-semibold text-lg transition-all hover:scale-105 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="Download" size={20} className="mr-2" />
                      Скачать
                    </>
                  )}
                </Button>
              </div>
              
              {url && !isValidUrl && (
                <p className="text-destructive text-sm flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  Введите корректную ссылку на YouTube видео
                </p>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={24} className="text-youtube-red" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Быстро</h3>
                <p className="text-muted-foreground">Скачивание за несколько секунд</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={24} className="text-youtube-red" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Безопасно</h3>
                <p className="text-muted-foreground">Без вирусов и рекламы</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Download" size={24} className="text-youtube-red" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Бесплатно</h3>
                <p className="text-muted-foreground">Навсегда без ограничений</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-youtube-dark mb-12">
            Часто задаваемые вопросы
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                Можно ли скачивать видео в разных качествах?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                Да, наш сервис поддерживает скачивание в различных разрешениях: от 360p до 4K, 
                в зависимости от исходного качества видео.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                Есть ли ограничения по длительности видео?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                Нет, вы можете скачивать видео любой длительности. Однако большие файлы 
                могут потребовать больше времени для обработки.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                Можно ли скачать только аудио?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                Да, наш сервис позволяет извлекать аудиодорожку в форматах MP3 и M4A 
                с высоким качеством звука.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                Безопасно ли использовать сервис?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                Абсолютно безопасно. Мы не сохраняем ваши данные, не требуем регистрации 
                и не содержим вредоносного ПО.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-youtube-dark mb-8">Связаться с нами</h2>
          
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Mail" size={24} className="text-youtube-red" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-muted-foreground">support@downloader.com</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="MessageSquare" size={24} className="text-youtube-red" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Техподдержка</h3>
                  <p className="text-muted-foreground">Ответим в течение 24 часов</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-youtube-dark text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-youtube-red rounded flex items-center justify-center">
              <Icon name="Download" size={16} className="text-white" />
            </div>
            <span className="font-semibold">YouTube Downloader</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 YouTube Downloader. Быстрое и бесплатное скачивание видео.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Index