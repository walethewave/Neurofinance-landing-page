"use client"

import Link from "next/link";
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  BarChart3,
  Globe,
  TrendingUp,
  Zap,
  Shield,
  ArrowRight,
  Play,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react"

// Particle System Component
const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "#00D2FF" : "#FF6B35",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += dx * force * 0.001
          particle.vy += dy * force * 0.001
        }

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Connect nearby particles
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(0, 210, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}

// Animated Counter Component
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
}: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Typing Animation Component
const TypingAnimation = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function NeuroFinanceLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [demoInput, setDemoInput] = useState("")
  const [demoResponse, setDemoResponse] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const testimonials = [
    {
      text: "Daily tracking helped identify 35% profit margin increase opportunity",
      author: "Adaora K., E-commerce Founder",
      flag: "🇳🇬",
    },
    {
      text: "Raised $2M Series A using NeuroFinance projections and daily metrics",
      author: "Kwame A., Fintech CEO",
      flag: "🇬🇭",
    },
    {
      text: "From $50K to $5M revenue, completely data-driven with daily insights",
      author: "Sarah M., SaaS Founder",
      flag: "🇬🇧",
    },
    {
      text: "Expanded across 3 markets using AI insights and daily performance tracking",
      author: "Ahmed R., Retail Chain Owner",
      flag: "🇦🇪",
    },
  ]
const handleDemoSubmit = async () => {
  if (!demoInput.trim()) return

  setIsAnalyzing(true)
  setDemoResponse("")

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/unified-chat`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: demoInput,
          session_id: "demo_" + Date.now(),// must match backend model!
          // Optionally add session_id and currency if you want
        }),
      }
    )
    const data = await response.json()
    setDemoResponse(data.response?.message || "No response from AI.")
  } catch (err) {
    setDemoResponse("Error connecting to AI backend.")
  }
  setIsAnalyzing(false)
}

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <ParticleSystem />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00D2FF] to-[#0099CC] flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00D2FF] to-[#0099CC] bg-clip-text text-transparent">
                NeuroFinance
              </span>
            </div>

            {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                <a href="#product" className="text-[#A0A0A0] hover:text-white transition-colors">
                    Product
                </a>
                <a href="#features" className="text-[#A0A0A0] hover:text-white transition-colors">
                    Features
                </a>
                <Button variant="ghost" className="text-[#A0A0A0] hover:text-white">
                    Login
                </Button>
                <Link href="/" passHref>
                    <Button className="bg-gradient-to-r from-[#00D2FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D2FF] text-white border-0">
                    Start Tracking
                    </Button>
                </Link>
                </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-[#1E1E1E] pt-4">
              <nav className="flex flex-col space-y-4">
                <a href="#product" className="text-[#A0A0A0] hover:text-white transition-colors">
                  Product
                </a>
                <a href="#features" className="text-[#A0A0A0] hover:text-white transition-colors">
                  Features
                </a>
                <Button variant="ghost" className="text-[#A0A0A0] hover:text-white justify-start">
                  Login
                </Button>
                <Button className="bg-gradient-to-r from-[#00D2FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D2FF] text-white border-0">
                  Start Tracking
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[120vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#00D2FF] via-white to-[#FF6B35] bg-clip-text text-transparent leading-tight">
              Your AI CFO + Daily Financial Tracker
            </h1>

            <p className="text-xl md:text-2xl text-[#A0A0A0] max-w-4xl mx-auto leading-relaxed">
              Real financial modeling with daily business tracking for global entrepreneurs. Get 30-second analysis that
              traditional CFOs take 30 days to deliver - plus track every metric that matters, daily.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00D2FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D2FF] text-white border-0 px-8 py-4 text-lg"
            >
              Start Free Tracking
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="ghost" className="border border-[#1E1E1E] hover:bg-[#111111] px-8 py-4 text-lg">
              <Play className="mr-2 w-5 h-5" />
              Test Live Demo
            </Button>
          </div>

          {/* Hero Visual - Terminal Preview */}
          <div className="mt-20 max-w-4xl mx-auto">
            <Card className="bg-[#111111]/50 backdrop-blur-xl border-[#1E1E1E] p-8">
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-3 text-[#A0A0A0] text-sm">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B35]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFD23F]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#00F5A0]"></div>
                  </div>
                  <span>NeuroFinance Terminal</span>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <span className="text-[#00D2FF]">💬 User:</span>
                    <span className="text-white">
                      "Show my daily revenue trend + what if I raise Series A at $10M?"
                    </span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-[#FF6B35]">🤖 AI:</span>
                    <div className="text-[#A0A0A0]">
                      <TypingAnimation
                        text="📊 Daily tracking shows 15% MoM growth. Based on your data: Current ARR $2.4M, 18-month runway. Series A at $10M valuation would provide 4-year runway and enable 3x team expansion. Optimal timing: Q2 2024. Recommendation: Prepare pitch deck focusing on unit economics..."
                        delay={30}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-[#666666] space-y-2">
            <p className="text-lg">Trusted by 5,000+ Global Entrepreneurs</p>
            <div className="flex justify-center items-center space-x-6">
              <Badge variant="outline" className="border-[#1E1E1E] text-[#A0A0A0]">
                SOC 2 Compliant
              </Badge>
              <Badge variant="outline" className="border-[#1E1E1E] text-[#A0A0A0]">
                Bank-Level Security
              </Badge>
              <Badge variant="outline" className="border-[#1E1E1E] text-[#A0A0A0]">
                99.9% Uptime
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="relative min-h-[110vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white">Test NeuroFinance Live Demo</h2>
            <p className="text-xl text-[#A0A0A0] max-w-3xl mx-auto">
              Connect your data, ask questions, see AI analysis in real-time.
            </p>
          </div>

          <Card className="bg-[#111111]/50 backdrop-blur-xl border-[#1E1E1E] max-w-4xl mx-auto">
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center space-x-3 text-[#A0A0A0]">
                <Brain className="w-6 h-6 text-[#00D2FF]" />
                <span className="text-lg font-semibold">NeuroFinance AI + Daily Tracker</span>
              </div>

              <div> </div> className="space-y-6"
                <p className="text-[#A0A0A0]">Welcome! Upload sample data or try demo questions:</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-[#00D2FF] font-semibold">DAILY TRACKING EXAMPLES:</h4>
                    <ul className="space-y-2 text-sm text-[#A0A0A0]">
                      <li>• "Show my revenue vs expenses this month"</li>
                      <li>• "What's my cash runway based on current burn?"</li>
                      <li>• "Track my customer acquisition cost daily"</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[#FF6B35] font-semibold">AI SCENARIO EXAMPLES:</h4>
                    <ul className="space-y-2 text-sm text-[#A0A0A0]">
                      <li>• "What if I increase prices by 20%?"</li>
                      <li>• "Should I expand to new markets now?"</li>
                      <li>• "Compare debt vs equity funding options"</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button variant="outline" className="border-[#1E1E1E] hover:bg-[#111111] bg-transparent">
                    <BarChart3 className="mr-2 w-4 h-4" />
                    Sample Dashboard
                  </Button>
                  <Button variant="outline" className="border-[#1E1E1E] hover:bg-[#111111] bg-transparent">
                    <Brain className="mr-2 w-4 h-4" />
                    Ask AI Question
                  </Button>
                  <Button variant="outline" className="border-[#1E1E1E] hover:bg-[#111111] bg-transparent">
                    <TrendingUp className="mr-2 w-4 h-4" />
                    Upload Data
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask any business question or upload data..."
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      className="bg-[#0A0A0A]/50 border-[#1E1E1E] text-white placeholder-[#666666] flex-1"
                      onKeyPress={(e) => e.key === "Enter" && handleDemoSubmit()}
                    />
                    <Link href="/" passHref>
                        <Button
                            className="bg-gradient-to-r from-[#00D2FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D2FF] text-white border-0"
                        >
                            Start Tracking
                        </Button>
                        </Link>

                  {(demoResponse || isAnalyzing) && (
                    <Card className="bg-[#0A0A0A]/50 border-[#1E1E1E]">
                      <CardContent className="p-4">
                        {isAnalyzing ? (
                          <div className="flex items-center space-x-3 text-[#A0A0A0]">
                            <div className="animate-spin w-4 h-4 border-2 border-[#00D2FF] border-t-transparent rounded-full"></div>
                            <span>Analyzing your data...</span>
                          </div>
                        ) : (
                          <div className="text-[#A0A0A0]">
                            <TypingAnimation text={demoResponse} delay={20} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <p className="text-center text-sm text-[#666666]">
                Full demo access - no signup required | Connect real data instantly
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
                  
      {/* Features Grid */}
      <section id="features" className="relative min-h-[100vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white">Everything Your Business Needs, Daily</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="group bg-[#111111]/50 backdrop-blur-xl border-[#1E1E1E] hover:bg-[#111111]/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00D2FF]/20">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#00D2FF]/20 to-[#0099CC]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-[#00D2FF]" />
                </div>

                <h3 className="text-2xl font-bold text-white">Daily Business Tracking</h3>

                <p className="text-[#A0A0A0] leading-relaxed">
                  Connect all your business data. Track revenue, expenses, KPIs, and growth metrics automatically.
                  Visual dashboards that update in real-time with actionable insights.
                </p>

                <div className="pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#666666]">Live Metrics</span>
                    <Badge className="bg-[#00F5A0]/20 text-[#00F5A0] border-[#00F5A0]/30">
                      <AnimatedCounter end={127} />+ tracking now
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group bg-[#111111]/50 backdrop-blur-xl border-[#1E1E1E] hover:bg-[#111111]/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FF6B35]/20">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#FF6B35]/20 to-[#E74C3C]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-[#FF6B35] animate-pulse" />
                </div>

                <h3 className="text-2xl font-bold text-white">AI-Powered Scenarios</h3>

                <p className="text-[#A0A0A0] leading-relaxed">
                  Ask 'What if?' in plain English. Get $10M+ financial modeling in 30 seconds. No spreadsheets. No
                  consultants. Just intelligent answers based on your real data.
                </p>

                <div className="pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#666666]">Scenarios Run</span>
                    <Badge className="bg-[#FF6B35]/20 text-[#FF6B35] border-[#FF6B35]/30">
                      <AnimatedCounter end={50000} suffix="+" />
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group bg-[#111111]/50 backdrop-blur-xl border-[#1E1E1E] hover:bg-[#111111]/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00F5A0]/20">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#00F5A0]/20 to-[#00CC80]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-[#00F5A0] animate-spin" style={{ animationDuration: "10s" }} />
                </div>

                <h3 className="text-2xl font-bold text-white">Global Market Intelligence</h3>

                <p className="text-[#A0A0A0] leading-relaxed">
                  Multi-currency tracking, emerging market dynamics, global business patterns. Context-aware insights
                  that traditional tools miss, with enterprise-grade accuracy.
                </p>

                <div className="pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#666666]">Countries Supported</span>
                    <Badge className="bg-[#00F5A0]/20 text-[#00F5A0] border-[#00F5A0]/30">
                      <AnimatedCounter end={60} suffix="+" />
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative min-h-[100vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white">Trusted by Global Entrepreneurs</h2>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <Card className="bg-[#111111]/50 backdrop-blur-xl border-[#1E1E1E] min-h-[200px] flex items-center">
              <CardContent className="p-12 text-center space-y-6">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-[#FFD23F] text-[#FFD23F]" />
                  ))}
                </div>

                <blockquote className="text-2xl text-white leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">{testimonials[currentTestimonial].flag}</span>
                  <cite className="text-[#A0A0A0] not-italic">{testimonials[currentTestimonial].author}</cite>
                </div>
              </CardContent>
            </Card>

            {/* Carousel Controls */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="border border-[#1E1E1E] hover:bg-[#111111]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="border border-[#1E1E1E] hover:bg-[#111111]"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-[#00D2FF]" : "bg-[#1E1E1E]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#00D2FF] to-[#0099CC] bg-clip-text text-transparent">
                $<AnimatedCounter end={250} />
                B+
              </div>
              <div className="text-[#A0A0A0]">Tracked</div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#E74C3C] bg-clip-text text-transparent">
                <AnimatedCounter end={5000} />+
              </div>
              <div className="text-[#A0A0A0]">Entrepreneurs</div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#00F5A0] to-[#00CC80] bg-clip-text text-transparent">
                <AnimatedCounter end={60} />+
              </div>
              <div className="text-[#A0A0A0]">Countries</div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#FFD23F] to-[#FFA500] bg-clip-text text-transparent">
                {"<"}
                <AnimatedCounter end={2} />s
              </div>
              <div className="text-[#A0A0A0]">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative min-h-[100vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white">How NeuroFinance Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "CONNECT", desc: "Upload data", icon: Zap },
              { step: "2", title: "TRACK", desc: "Daily monitoring", icon: BarChart3 },
              { step: "3", title: "ASK", desc: "Chat with AI", icon: Brain },
              { step: "4", title: "OPTIMIZE", desc: "Act on insights", icon: TrendingUp },
            ].map((item, index) => (
              <div key={index} className="relative">
                <Card className="bg-[#111111]/50 backdrop-blur-xl border-[#1E1E1E] hover:bg-[#111111]/70 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0099CC] flex items-center justify-center mx-auto">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-[#00D2FF]">{item.step}</div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-[#A0A0A0]">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>

                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#00D2FF] to-[#0099CC] transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="relative min-h-[100vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-[#111111]/50 backdrop-blur-xl border-[#1E1E1E] p-12">
            <CardContent className="space-y-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Join 5,000+ Global Entrepreneurs Building Smarter Businesses
              </h2>

              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-[#0A0A0A]/50 border-[#1E1E1E] text-white placeholder-[#666666] h-14 text-lg"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <select className="bg-[#0A0A0A]/50 border border-[#1E1E1E] text-white h-14 px-4 rounded-md">
                    <option value="">Business Type</option>
                    <option value="saas">SaaS</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>

                  <select className="bg-[#0A0A0A]/50 border border-[#1E1E1E] text-white h-14 px-4 rounded-md">
                    <option value="">Monthly Revenue</option>
                    <option value="0-10k">$0 - $10K</option>
                    <option value="10k-100k">$10K - $100K</option>
                    <option value="100k-1m">$100K - $1M</option>
                    <option value="1m+">$1M+</option>
                  </select>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#00D2FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D2FF] text-white border-0 h-14 text-lg">
                  Start Free Tracking
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4 text-sm text-[#A0A0A0]">
                <p>No spam. Weekly insights on global business trends + exclusive NeuroFinance features.</p>
                <p className="text-[#FFD23F]">First 1,000 users get lifetime 40% discount + premium onboarding</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative min-h-[80vh] bg-[#111111]/50 backdrop-blur-xl border-t border-[#1E1E1E] px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#00D2FF] to-[#0099CC] flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#00D2FF] to-[#0099CC] bg-clip-text text-transparent">
                NeuroFinance
              </div>
              <p className="text-[#A0A0A0] text-sm">
                AI Financial Intelligence + Daily Business Tracking for Global Entrepreneurs
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Product</h4>
              <ul className="space-y-2 text-[#A0A0A0]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Resources</h4>
              <ul className="space-y-2 text-[#A0A0A0]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Webinars
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Company</h4>
              <ul className="space-y-2 text-[#A0A0A0]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Legal</h4>
              <ul className="space-y-2 text-[#A0A0A0]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1E1E1E] pt-8 space-y-6">
            <p className="text-[#A0A0A0] text-center">
              Empowering entrepreneurs worldwide with intelligent financial tools
            </p>

            <div className="flex justify-center space-x-6">
              <Badge variant="outline" className="border-[#1E1E1E] text-[#A0A0A0]">
                <Shield className="w-4 h-4 mr-2" />
                SOC 2
              </Badge>
              <Badge variant="outline" className="border-[#1E1E1E] text-[#A0A0A0]">
                GDPR Compliant
              </Badge>
              <Badge variant="outline" className="border-[#1E1E1E] text-[#A0A0A0]">
                Bank-Level Security
              </Badge>
              <Badge variant="outline" className="border-[#1E1E1E] text-[#A0A0A0]">
                99.9% Uptime
              </Badge>
            </div>

            <div className="text-center text-[#666666] text-sm">© 2024 NeuroFinance. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
