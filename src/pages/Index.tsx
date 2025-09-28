import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import Icon from '@/components/ui/icon'

const Index = () => {
  const [url, setUrl] = useState('')
  const [violationType, setViolationType] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmitComplaint = async () => {
    if (!url.trim() || !violationType || !description.trim() || !agreedToTerms) return
    
    setIsLoading(true)
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsLoading(false)
    
    // Show success message
    alert('Жалоба успешно отправлена! YouTube рассмотрит её в течение 48 часов.')
    
    // Reset form
    setUrl('')
    setViolationType('')
    setDescription('')
    setAgreedToTerms(false)
  }

  const isValidUrl = url.includes('youtube.com') || url.includes('youtu.be')
  const canSubmit = isValidUrl && violationType && description.trim().length > 10 && agreedToTerms

  const violationTypes = [
    { value: 'copyright', label: 'Нарушение авторских прав' },
    { value: 'harassment', label: 'Домогательства и кибербуллинг' },
    { value: 'hate-speech', label: 'Язык вражды' },
    { value: 'violence', label: 'Насилие и жестокость' },
    { value: 'spam', label: 'Спам или обман' },
    { value: 'privacy', label: 'Нарушение конфиденциальности' },
    { value: 'child-safety', label: 'Безопасность детей' },
    { value: 'misinformation', label: 'Дезинформация' },
    { value: 'other', label: 'Другое нарушение' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-youtube-light">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-youtube-red rounded-lg flex items-center justify-center">
                <Icon name="Flag" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-youtube-dark">YouTube Жалобы</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#complaint" className="text-foreground hover:text-youtube-red transition-colors">Пожаловаться</a>
              <a href="#how-to" className="text-foreground hover:text-youtube-red transition-colors">Как подать</a>
              <a href="#faq" className="text-foreground hover:text-youtube-red transition-colors">FAQ</a>
              <a href="#contact" className="text-foreground hover:text-youtube-red transition-colors">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="complaint" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold text-youtube-dark mb-6">
              Удали <span className="text-youtube-red">нарушающее</span> видео
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Быстрая подача жалоб на видео, нарушающие правила YouTube. 
              Поможем защитить сообщество от вредного контента.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm animate-scale-in">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-youtube-dark">Подать жалобу на видео</CardTitle>
              <CardDescription>Укажите ссылку на видео и тип нарушения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* URL Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">Ссылка на видео</label>
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="text-lg h-12 border-2 focus:border-youtube-red"
                />
                {url && !isValidUrl && (
                  <p className="text-destructive text-sm flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    Введите корректную ссылку на YouTube видео
                  </p>
                )}
              </div>

              {/* Violation Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">Тип нарушения</label>
                <Select value={violationType} onValueChange={setViolationType}>
                  <SelectTrigger className="h-12 border-2 focus:border-youtube-red">
                    <SelectValue placeholder="Выберите тип нарушения" />
                  </SelectTrigger>
                  <SelectContent>
                    {violationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">Описание нарушения</label>
                <Textarea
                  placeholder="Опишите подробно, какие правила нарушает данное видео. Укажите временные метки, если нарушение происходит в определенный момент видео..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-24 border-2 focus:border-youtube-red resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Минимум 10 символов. Текущая длина: {description.length}
                </p>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={setAgreedToTerms}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-left leading-5 cursor-pointer">
                  Я подтверждаю, что информация в моей жалобе точна, и понимаю, что подача ложных жалоб может привести к ограничению моего аккаунта
                </label>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmitComplaint}
                disabled={!canSubmit || isLoading}
                className="w-full h-12 bg-youtube-red hover:bg-youtube-red/90 text-white font-semibold text-lg transition-all hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Отправляем жалобу...
                  </>
                ) : (
                  <>
                    <Icon name="Flag" size={20} className="mr-2" />
                    Отправить жалобу
                  </>
                )}
              </Button>
            </CardContent>
          </Card>


        </div>
      </section>

      {/* How-to Section */}
      <section id="how-to" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-youtube-dark mb-12">
            Как подать эффективную жалобу
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-youtube-red font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Определите нарушение</h3>
                <p className="text-muted-foreground text-sm">
                  Убедитесь, что видео действительно нарушает правила YouTube. 
                  Ознакомьтесь с политикой сообщества.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-youtube-red font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Опишите подробно</h3>
                <p className="text-muted-foreground text-sm">
                  Укажите конкретные временные метки и детально опишите нарушение. 
                  Чем больше деталей, тем лучше.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-youtube-red font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Дождитесь ответа</h3>
                <p className="text-muted-foreground text-sm">
                  YouTube рассматривает жалобы в течение 24-48 часов. 
                  Результат придет на вашу почту.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-youtube-dark mb-12">
            Часто задаваемые вопросы
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                Сколько времени рассматривается жалоба?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                YouTube обычно рассматривает жалобы в течение 24-48 часов. В сложных случаях 
                может потребоваться до 7 дней для полного расследования.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                Что происходит после подачи жалобы?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                YouTube проверяет жалобу на соответствие правилам сообщества. Если нарушение 
                подтверждается, видео удаляется, а автор получает предупреждение или страйк.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                Можно ли подавать анонимные жалобы?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                Да, жалобы можно подавать анонимно. Однако для некоторых типов нарушений 
                (например, авторские права) может потребоваться идентификация.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border-0 shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                Что делать, если жалоба отклонена?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                Если жалоба отклонена, но вы уверены в нарушении, можно подать повторную жалобу 
                с более подробным описанием или обратиться в службу поддержки YouTube.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-youtube-dark mb-8">Нужна помощь?</h2>
          
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Mail" size={24} className="text-youtube-red" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email поддержка</h3>
                  <p className="text-muted-foreground">help@youtube-complaints.com</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Phone" size={24} className="text-youtube-red" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Горячая линия</h3>
                  <p className="text-muted-foreground">8-800-555-0123</p>
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
              <Icon name="Flag" size={16} className="text-white" />
            </div>
            <span className="font-semibold">YouTube Жалобы</span>
          </div>
          <p className="text-gray-400 text-sm mb-2">
            © 2024 YouTube Жалобы. Помогаем создать безопасное сообщество.
          </p>
          <p className="text-gray-500 text-xs">
            Мы не являемся официальным сервисом YouTube. Все жалобы направляются через официальные каналы YouTube.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Index