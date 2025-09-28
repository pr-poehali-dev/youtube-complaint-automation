import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'

interface AttackStats {
  totalReports: number
  successfulReports: number
  failedReports: number
  estimatedTimeToStrike: string
}

const Index = () => {
  const [targetUrl, setTargetUrl] = useState('')
  const [attackType, setAttackType] = useState('')
  const [reportCount, setReportCount] = useState([500])
  const [isAttacking, setIsAttacking] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stats, setStats] = useState<AttackStats>({
    totalReports: 0,
    successfulReports: 0,
    failedReports: 0,
    estimatedTimeToStrike: '0 мин'
  })

  const attackTypes = [
    { value: 'copyright', label: 'Авторские права (самый эффективный)' },
    { value: 'harassment', label: 'Домогательства' },
    { value: 'hate-speech', label: 'Язык вражды' },
    { value: 'violence', label: 'Насилие' },
    { value: 'spam', label: 'Спам' },
    { value: 'child-safety', label: 'Безопасность детей' },
    { value: 'misinformation', label: 'Дезинформация' },
    { value: 'mixed', label: 'Смешанная атака (все типы)' }
  ]

  const handleStartAttack = async () => {
    if (!targetUrl.trim() || !attackType) return
    
    setIsAttacking(true)
    setProgress(0)
    
    const totalReports = reportCount[0]
    let currentReports = 0
    
    // Simulate attack progress
    const interval = setInterval(() => {
      currentReports += Math.floor(Math.random() * 15) + 5
      
      if (currentReports >= totalReports) {
        currentReports = totalReports
        clearInterval(interval)
        setIsAttacking(false)
      }
      
      const progressPercent = (currentReports / totalReports) * 100
      setProgress(progressPercent)
      
      setStats({
        totalReports: currentReports,
        successfulReports: Math.floor(currentReports * 0.85),
        failedReports: Math.floor(currentReports * 0.15),
        estimatedTimeToStrike: currentReports >= totalReports ? 'Завершено!' : `${Math.floor((totalReports - currentReports) / 20)} мин`
      })
    }, 200)
  }

  const handleStopAttack = () => {
    setIsAttacking(false)
    setProgress(0)
    setStats({
      totalReports: 0,
      successfulReports: 0,
      failedReports: 0,
      estimatedTimeToStrike: '0 мин'
    })
  }

  const isValidUrl = targetUrl.includes('youtube.com') || targetUrl.includes('youtu.be')
  const canStart = isValidUrl && attackType && !isAttacking

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
      {/* Header */}
      <header className="border-b border-red-700 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">YouTube Strike Bot</h1>
              <Badge variant="destructive" className="ml-2">BETA</Badge>
            </div>
            <nav className="hidden md:flex space-x-6">
              <span className="text-red-300 text-sm">🔴 Система активна</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Attack Panel */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Уничтожь <span className="text-red-400">любое</span> видео
            </h2>
            <p className="text-xl text-red-200 mb-8 max-w-3xl mx-auto">
              Массовая автоматическая отправка жалоб на YouTube видео. 
              Используем армию ботов для гарантированного удаления контента за 24-48 часов.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-red-300">
              <span>✓ 99.7% успешность</span>
              <span>✓ 10,000+ ботов</span>
              <span>✓ Обход защиты YouTube</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Attack Configuration */}
            <Card className="border-red-800 bg-black/60 backdrop-blur-sm text-white">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <Icon name="Target" size={24} className="mr-2" />
                  Настройка атаки
                </CardTitle>
                <CardDescription className="text-red-200">
                  Настрой параметры для максимальной эффективности
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Target URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-red-200">Цель (URL видео)</label>
                  <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="bg-red-950/50 border-red-800 text-white placeholder:text-red-400"
                  />
                  {targetUrl && !isValidUrl && (
                    <p className="text-red-400 text-sm flex items-center">
                      <Icon name="AlertTriangle" size={16} className="mr-1" />
                      Неверная ссылка на YouTube
                    </p>
                  )}
                </div>

                {/* Attack Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-red-200">Тип атаки</label>
                  <Select value={attackType} onValueChange={setAttackType}>
                    <SelectTrigger className="bg-red-950/50 border-red-800 text-white">
                      <SelectValue placeholder="Выбери стратегию атаки" />
                    </SelectTrigger>
                    <SelectContent className="bg-red-950 border-red-800">
                      {attackTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white hover:bg-red-900">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Report Count */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-red-200">
                    Количество жалоб: {reportCount[0]}
                  </label>
                  <Slider
                    value={reportCount}
                    onValueChange={setReportCount}
                    max={5000}
                    min={100}
                    step={50}
                    className="[&_.slider-track]:bg-red-900 [&_.slider-range]:bg-red-600"
                  />
                  <div className="flex justify-between text-xs text-red-400">
                    <span>100 (слабо)</span>
                    <span>2500 (норма)</span>
                    <span>5000 (максимум)</span>
                  </div>
                </div>

                <Separator className="bg-red-800" />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleStartAttack}
                    disabled={!canStart}
                    className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg"
                  >
                    {isAttacking ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Атака в процессе...
                      </>
                    ) : (
                      <>
                        <Icon name="Zap" size={20} className="mr-2" />
                        Начать атаку
                      </>
                    )}
                  </Button>
                  
                  {isAttacking && (
                    <Button
                      onClick={handleStopAttack}
                      variant="outline"
                      className="w-full border-red-600 text-red-400 hover:bg-red-950"
                    >
                      <Icon name="Square" size={20} className="mr-2" />
                      Остановить атаку
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Attack Monitor */}
            <Card className="border-red-800 bg-black/60 backdrop-blur-sm text-white">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <Icon name="Activity" size={24} className="mr-2" />
                  Мониторинг атаки
                </CardTitle>
                <CardDescription className="text-red-200">
                  Отслеживание прогресса в реальном времени
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-200">Прогресс</span>
                    <span className="text-red-400">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="[&_.progress-bar]:bg-red-600" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-950/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-red-200 text-sm">Отправлено</span>
                      <Icon name="Send" size={16} className="text-red-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.totalReports}</div>
                  </div>
                  
                  <div className="bg-green-950/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-200 text-sm">Успешно</span>
                      <Icon name="CheckCircle" size={16} className="text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.successfulReports}</div>
                  </div>
                  
                  <div className="bg-yellow-950/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-200 text-sm">Неудачно</span>
                      <Icon name="XCircle" size={16} className="text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.failedReports}</div>
                  </div>
                  
                  <div className="bg-purple-950/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200 text-sm">До страйка</span>
                      <Icon name="Clock" size={16} className="text-purple-400" />
                    </div>
                    <div className="text-lg font-bold text-white">{stats.estimatedTimeToStrike}</div>
                  </div>
                </div>

                {/* Status Messages */}
                <div className="bg-red-950/30 p-4 rounded-lg space-y-2">
                  <h4 className="text-red-400 font-semibold">Статус системы:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center text-green-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Боты подключены: 10,247 активных
                    </div>
                    <div className="flex items-center text-green-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Прокси-серверы: 2,847 онлайн
                    </div>
                    <div className="flex items-center text-green-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Обход YouTube AI: Активен
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Dashboard */}
          <Card className="mt-8 border-red-800 bg-black/60 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle className="text-red-400">Статистика успешных атак</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">47,392</div>
                  <div className="text-red-200 text-sm">Удаленных видео</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">99.7%</div>
                  <div className="text-red-200 text-sm">Успешность</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">1.2ч</div>
                  <div className="text-red-200 text-sm">Среднее время</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">24/7</div>
                  <div className="text-red-200 text-sm">Доступность</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-700 bg-black text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <span className="font-semibold">YouTube Strike Bot</span>
          </div>
          <p className="text-red-400 text-sm mb-2">
            © 2024 Strike Bot. Самая мощная система удаления YouTube контента.
          </p>
          <p className="text-red-600 text-xs">
            ⚠️ Используй ответственно. Мы не несем ответственности за последствия.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Index