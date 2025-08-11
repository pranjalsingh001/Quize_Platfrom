import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Zap, Target, BarChart3, Rocket, Play, Users, Trophy, Brain, ArrowRight, ChevronDown, Moon, Sun, Code, BookOpen, Lightbulb, Clock, TrendingUp, Users2, Award, Bookmark, PenTool } from 'lucide-react'

// Join Quiz Modal Component
function JoinQuizModal({ isOpen, onClose }) {
  const [quizCode, setQuizCode] = useState('')
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join a Quiz</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Enter the quiz code to join</p>
        
        <input
          type="text"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
          placeholder="Enter quiz code"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-6 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle join quiz logic here
              console.log('Joining quiz:', quizCode)
              onClose()
            }}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Join Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

// Create Quiz Page Component
function CreateQuizPage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-black dark:via-gray-950 dark:to-slate-950 text-slate-900 dark:text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Create Your Quiz</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Build engaging quizzes with our intuitive creator
          </p>
          
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-6">Quiz creator coming soon...</p>
            
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Landing Page Component
function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setMounted(true)
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    
    // Apply theme to document
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Debug log
    console.log('Initial theme:', savedTheme)
    console.log('Document classes:', document.documentElement.classList.toString())
    
    // Also check system preference if no saved theme
    if (!localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        setTheme('dark')
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }
    }
    
    // Listen for theme changes from other components
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('theme') || 'light'
      setTheme(currentTheme)
    }
    
    window.addEventListener('theme-change', handleThemeChange)
    
    return () => {
      window.removeEventListener('theme-change', handleThemeChange)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Debug log
    console.log('Theme toggled to:', newTheme)
    console.log('Document classes:', document.documentElement.classList.toString())
    
    // Show toast notification
    const toast = document.createElement('div')
    toast.className = `fixed top-20 right-4 z-50 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
      newTheme === 'dark' 
        ? 'bg-gray-800 border border-gray-600' 
        : 'bg-white border border-gray-300 text-gray-900'
    }`
    toast.textContent = `Switched to ${newTheme} mode`
    document.body.appendChild(toast)
    
    // Remove toast after 2 seconds
    setTimeout(() => {
      toast.style.opacity = '0'
      toast.style.transform = 'translateX(100%)'
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 2000)
    
    // Force a re-render to ensure all components update
    setTimeout(() => {
      window.dispatchEvent(new Event('theme-change'))
    }, 0)
  }

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId.slice(1))
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-black dark:via-gray-950 dark:to-slate-950 text-slate-900 dark:text-white overflow-x-hidden font-inter transition-all duration-500">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-navy-500/20 dark:border-blue-500/10 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-navy-600 to-blue-600 dark:from-blue-400 dark:to-cyan-400 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-white dark:text-black" />
                </div>
                <div className="absolute inset-0 bg-navy-600 dark:bg-blue-400 rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                QuizVerse
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Features', href: '#features' },
                { name: 'How It Works', href: '#how-it-works' },
                { name: 'Contact', href: '#contact' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="relative text-slate-600 dark:text-gray-300 hover:text-navy-600 dark:hover:text-white transition-colors group py-2"
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-navy-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Enhanced Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-3 rounded-xl bg-slate-100 dark:bg-gray-900/50 border border-navy-500/20 dark:border-blue-500/20 hover:border-navy-600/40 dark:hover:border-blue-400/40 transition-all duration-300 group overflow-hidden"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <div className="relative z-10">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-navy-600 dark:text-blue-400 transform group-hover:rotate-12 transition-transform duration-300" />
                ) : (
                  <Sun className="h-5 w-5 text-navy-600 dark:text-blue-400 transform group-hover:rotate-12 transition-transform duration-300" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-navy-500/10 to-blue-600/10 dark:from-blue-400/10 dark:to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Theme indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-8">
            {/* Enhanced Status Badge */}
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/80 dark:bg-gray-900/50 border border-navy-500/20 dark:border-blue-500/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-2 h-2 bg-navy-600 dark:bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-navy-600 dark:text-blue-400">
                Study Mode Active
              </span>
              <div className="w-2 h-2 bg-navy-600 dark:bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            
            {/* Enhanced Main Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                Quiz<span className="text-navy-600 dark:text-blue-400">Verse</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your digital study cockpit for mastering knowledge through 
                <span className="text-navy-600 dark:text-blue-400 font-semibold"> interactive quizzes</span>
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={() => navigate('/create')}
                className="group relative px-8 py-4 bg-navy-600 hover:bg-navy-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white dark:text-black font-semibold text-lg rounded-xl transition-all duration-300 overflow-hidden shadow-lg shadow-navy-500/25 dark:shadow-blue-500/25 hover:shadow-navy-600/40 dark:hover:shadow-blue-400/40 hover:scale-105"
              >
                <div className="relative flex items-center space-x-2 z-10">
                  <Code className="h-5 w-5" />
                  <span>Create Quiz</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-navy-700/20 to-blue-600/20 dark:from-blue-400/20 dark:to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group px-8 py-4 bg-white/80 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800/50 border border-navy-500/20 dark:border-blue-500/20 hover:border-navy-600/40 dark:hover:border-blue-400/40 text-slate-900 dark:text-white font-semibold text-lg rounded-xl transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <Rocket className="h-5 w-5 text-navy-600 dark:text-blue-400 group-hover:animate-bounce" />
                  <span>Join Quiz</span>
                </div>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center pt-12">
              <div className="text-slate-400 dark:text-gray-500 animate-bounce">
                <ChevronDown className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Floating Study Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-24 left-16 p-6 bg-white/80 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl border border-navy-500/20 dark:border-blue-500/10 shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
              <BookOpen className="h-8 w-6 text-navy-600 dark:text-blue-400/70" />
            </div>
            <div className="absolute top-40 right-20 p-6 bg-white/80 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl border border-navy-500/20 dark:border-blue-500/10 shadow-lg animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
              <Lightbulb className="h-8 w-6 text-blue-600 dark:text-cyan-400/70" />
            </div>
            <div className="absolute bottom-32 left-24 p-6 bg-white/80 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl border border-navy-500/20 dark:border-blue-500/10 shadow-lg animate-bounce" style={{ animationDuration: '4s' }}>
              <Trophy className="h-8 w-6 text-navy-600 dark:text-blue-400/70" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              Built for <span className="text-navy-600 dark:text-blue-400">Focus</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              Every feature designed to enhance your learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant Feedback",
                description: "Get immediate results and explanations to accelerate your learning process.",
                studyElements: [
                  { icon: Clock, label: "Real-time" },
                  { icon: TrendingUp, label: "Progress" },
                ]
              },
              {
                icon: Target,
                title: "Focused Learning",
                description: "Distraction-free environment designed specifically for deep concentration.",
                studyElements: [
                  { icon: Users2, label: "Collaborative" },
                  { icon: Bookmark, label: "Organized" },
                ]
              },
              {
                icon: BarChart3,
                title: "Progress Tracking",
                description: "Clean analytics that show your improvement without overwhelming details.",
                studyElements: [
                  { icon: Award, label: "Achievements" },
                  { icon: PenTool, label: "Insights" },
                ]
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/80 dark:bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-navy-500/20 dark:border-blue-500/10 hover:border-navy-600/40 dark:hover:border-blue-400/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl shadow-lg"
              >
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="inline-flex p-4 rounded-xl bg-navy-600/10 dark:bg-blue-400/10 border border-navy-600/20 dark:border-blue-400/20 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-navy-600 dark:text-blue-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-navy-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-gray-400">
                    {feature.studyElements.map((element, idx) => (
                      <span key={idx} className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-navy-600 dark:bg-blue-400 animate-pulse" />
                        <span>{element.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-navy-600/5 to-blue-600/5 dark:from-blue-400/5 dark:to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-100/50 dark:bg-gray-950/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              Simple <span className="text-navy-600 dark:text-blue-400">Process</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              Three steps to transform your study sessions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                icon: Play,
                title: "Create",
                description: "Design focused quizzes with our clean, distraction-free builder.",
              },
              {
                step: "02",
                icon: Users,
                title: "Share",
                description: "Generate study codes and invite others to join your session.",
              },
              {
                step: "03",
                icon: Trophy,
                title: "Learn",
                description: "Engage in real-time learning with instant feedback and progress tracking.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-navy-600 dark:bg-blue-500 text-white dark:text-black font-bold text-2xl rounded-2xl shadow-lg shadow-navy-500/25 dark:shadow-blue-500/25 group-hover:shadow-navy-600/40 dark:group-hover:shadow-blue-400/40 transition-all duration-300 mb-4 group-hover:scale-110 group-hover:rotate-3">
                    {step.step}
                  </div>
                  
                  <div className="absolute -top-2 -right-2 p-3 bg-white dark:bg-gray-900 rounded-xl border border-navy-500/20 dark:border-blue-500/20 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    <step.icon className="h-6 w-6 text-navy-600 dark:text-blue-400" />
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-12 h-0.5 bg-gradient-to-r from-navy-500/50 to-transparent dark:from-blue-400/50 dark:to-transparent" />
                  )}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-navy-600 dark:group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-6 border-t border-navy-500/20 dark:border-blue-500/10 bg-slate-50 dark:bg-gray-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-navy-600 to-blue-600 dark:from-blue-400 dark:to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-6 w-6 text-white dark:text-black" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                QuizVerse
              </span>
            </div>
            
            <p className="text-slate-500 dark:text-gray-400 text-center">
              © 2025 QuizVerse. Designed for focused learning.
            </p>
            
            <div className="flex space-x-6">
              {['About', 'Contact', 'Privacy'].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="text-slate-500 dark:text-gray-400 hover:text-navy-600 dark:hover:text-blue-400 transition-colors hover:-translate-y-1 duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <JoinQuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

// Main App Component with Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateQuizPage />} />
      </Routes>
    </Router>
  )
}

export default App