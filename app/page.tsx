"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  BarChart3,
  Settings,
  User,
  Moon,
  ArrowUp,
  DollarSign,
  Briefcase,
  Copy,
  Share,
  MoreHorizontal,
  Activity,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

// Typing Animation Component
const TypingAnimation = ({
  text,
  delay = 30,
  onComplete,
}: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, delay, onComplete])

  return <span>{displayText}</span>
}

// Typing Indicator Component
const TypingIndicator = () => (
  <div className="flex items-center space-x-2 p-4">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0099CC] flex items-center justify-center">
      <Brain className="w-4 h-4 text-white" />
    </div>
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-[#00D2FF] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 bg-[#00D2FF] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 bg-[#00D2FF] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  </div>
)

// Financial Chart Component
const FinancialChart = ({ data, title, type = "bar" }: { data: any; title: string; type?: string }) => (
  <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4 my-4">
    <h4 className="text-sm font-semibold text-[#A0A0A0] mb-3">{title}</h4>
    <div className="h-32 flex items-end justify-between space-x-1">
      {data.map((value: number, index: number) => (
        <div
          key={index}
          className="bg-gradient-to-t from-[#00D2FF] to-[#0099CC] rounded-t flex-1 transition-all duration-1000 ease-out"
          style={{ height: `${(value / Math.max(...data)) * 100}%`, animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  </div>
)

// Progress Visual Component
const ProgressVisual = ({
  label,
  value,
  max,
  color = "#00D2FF",
}: { label: string; value: number; max: number; color?: string }) => {
  const percentage = (value / max) * 100
  const bars = "█".repeat(Math.floor(percentage / 10)) + "░".repeat(10 - Math.floor(percentage / 10))

  return (
    <div className="font-mono text-sm bg-[#0A0A0A] p-3 rounded border-l-2" style={{ borderLeftColor: color }}>
      <div className="flex justify-between items-center">
        <span className="text-[#A0A0A0]">{label}:</span>
        <span className="text-white font-semibold">${value.toLocaleString()}</span>
      </div>
      <div className="mt-1" style={{ color }}>
        {bars} {percentage.toFixed(0)}%
      </div>
    </div>
  )
}

// Business Insight Component
const BusinessInsight = ({
  children,
  type = "info",
}: { children: React.ReactNode; type?: "info" | "success" | "warning" }) => {
  const colors = {
    info: { bg: "rgba(0, 210, 255, 0.1)", border: "#00D2FF", icon: AlertCircle },
    success: { bg: "rgba(0, 245, 160, 0.1)", border: "#00F5A0", icon: CheckCircle },
    warning: { bg: "rgba(255, 210, 63, 0.1)", border: "#FFD23F", icon: AlertCircle },
  }

  const config = colors[type]
  const Icon = config.icon

  return (
    <div
      className="p-4 rounded-lg border-l-2 my-3"
      style={{ backgroundColor: config.bg, borderLeftColor: config.border }}
    >
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5" style={{ color: config.border }} />
        <div className="text-sm text-[#A0A0A0] leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

// Message Component
const Message = ({
  message,
  isUser,
  timestamp,
  showActions = false,
}: {
  message: string | React.ReactNode
  isUser: boolean
  timestamp: Date
  showActions?: boolean
}) => {
  const [showTools, setShowTools] = useState(false)

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-8 group`}>
      <div className={`max-w-[85%] ${isUser ? "max-w-[70%]" : ""}`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0099CC] flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-[#666666]">NeuroFinance AI CFO</span>
            <span className="text-xs text-[#666666]">•</span>
            <span className="text-xs text-[#666666]">{timestamp.toLocaleTimeString()}</span>
          </div>
        )}

        <div
          className={`p-6 rounded-2xl relative ${
            isUser
              ? "bg-gradient-to-br from-[#00D2FF]/15 to-[#0099CC]/10 border border-[#00D2FF]/25 text-white rounded-br-md"
              : "bg-[#111111] border border-[#1E1E1E] text-white rounded-bl-md"
          } transition-all duration-200 hover:shadow-lg`}
          onMouseEnter={() => setShowTools(true)}
          onMouseLeave={() => setShowTools(false)}
        >
          <div className="text-base leading-relaxed">{typeof message === "string" ? message : message}</div>

          {showTools && (
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-[#1A1A1A]">
                <Copy className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-[#1A1A1A]">
                <Share className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-[#1A1A1A]">
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        {isUser && (
          <div className="text-right mt-1">
            <span className="text-xs text-[#666666]">{timestamp.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Follow-up Actions Component
const FollowUpActions = ({
  actions,
  onActionClick,
}: { actions: string[]; onActionClick: (action: string) => void }) => (
  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#1E1E1E]">
    {actions.map((action, index) => (
      <Button
        key={index}
        variant="outline"
        size="sm"
        onClick={() => onActionClick(action)}
        className="bg-[#1A1A1A]/80 border-[#1E1E1E] text-[#A0A0A0] hover:bg-gradient-to-r hover:from-[#00D2FF] hover:to-[#0099CC] hover:text-white hover:border-[#00D2FF] transition-all duration-200"
      >
        {action}
      </Button>
    ))}
  </div>
)

// Smart Suggestions Component
const SmartSuggestions = ({
  suggestions,
  onSuggestionClick,
}: { suggestions: string[]; onSuggestionClick: (suggestion: string) => void }) => (
  <div className="absolute bottom-full left-0 right-0 mb-4 px-6">
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSuggestionClick(suggestion)}
          className="bg-[#1A1A1A]/80 backdrop-blur-xl border-[#1E1E1E] text-[#A0A0A0] hover:border-[#00D2FF] hover:text-white hover:shadow-lg hover:shadow-[#00D2FF]/20 transition-all duration-200"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  </div>
)

export default function ChatInterface() {
  const [messages, setMessages] = useState<
    Array<{
      id: string
      content: string | React.ReactNode
      isUser: boolean
      timestamp: Date
      actions?: string[]
    }>
  >([])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const smartSuggestions = [
    "💰 What if I increase prices by 15%?",
    "📊 Show my daily revenue vs costs trend",
    "🌍 Should I expand to new markets now?",
    "💼 Compare loan vs investor funding",
    "📈 When should I hire my first employee?",
    "🏪 Analyze my best-performing products",
  ]

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Welcome message on load
  useEffect(() => {
    const welcomeMessage = {
      id: "welcome",
      content: "Hi! I'm your AI CFO. What would you like to analyze about your business today?",
      isUser: false,
      timestamp: new Date(),
    }

    setMessages([welcomeMessage])
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setShowSuggestions(false)
    setIsTyping(true)

    // Simulate AI response
    setTimeout(async () => {
    const aiResponse = await generateAIResponse(inputValue)
    setMessages((prev) => [...prev, aiResponse])
    setIsTyping(false)
  }, 2000)
  }

  const generateAIResponse = async (input: string): Promise<any> => {
  const lowerInput = input.toLowerCase()

  // Try to connect to your backend first
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/unified-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: input,
        session_id: `session_${Date.now()}`,
        currency: 'NGN'
      })
    })

    if (response.ok) {
      const data = await response.json()
      
      return {
        id: Date.now().toString(),
        content: (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-5 h-5 text-[#00D2FF]" />
              <h4 className="text-lg font-semibold text-white">AI CFO ANALYSIS</h4>
            </div>
            
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: data.response?.message || data.message }}
            />
            
            {data.response?.charts && (
              <FinancialChart 
                data={data.response.charts.data || [1, 2, 3, 4, 5]} 
                title={data.response.charts.title || "Financial Analysis"} 
              />
            )}
            
            {data.response?.insights && (
              <BusinessInsight type="info">
                {data.response.insights}
              </BusinessInsight>
            )}
          </div>
        ),
        isUser: false,
        timestamp: new Date(),
        actions: data.response?.next_steps || ["📊 Deep dive analysis", "💰 Explore options", "📈 Set up tracking"]
      }
    }
  } catch (error) {
    console.log('Backend not available, using enhanced mock responses')
  }

  // Enhanced mock responses with Nigerian business context
  if (lowerInput.includes("hire") || lowerInput.includes("employee") || lowerInput.includes("staff")) {
    return {
      id: Date.now().toString(),
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <Briefcase className="w-5 h-5 text-[#00D2FF]" />
            <h4 className="text-lg font-semibold text-white">HIRING DECISION ANALYSIS</h4>
          </div>

          <div className="space-y-3">
            <h5 className="text-[#00D2FF] font-semibold">Current State:</h5>
            <ProgressVisual label="Monthly Profit" value={800} max={5000} color="#00F5A0" />
            <ProgressVisual label="Profit Margin" value={16} max={100} color="#FFD23F" />
            <ProgressVisual label="Cash Runway" value={6} max={12} color="#00D2FF" />
          </div>

          <div className="space-y-3">
            <h5 className="text-[#FF6B35] font-semibold">If You Hire (₦500,000/month):</h5>
            <ProgressVisual label="New Profit" value={-200} max={5000} color="#FF6B35" />
            <ProgressVisual label="Growth Needed" value={35} max={100} color="#00D2FF" />
            <div className="text-sm text-[#A0A0A0] bg-[#0A0A0A] p-3 rounded border-l-2 border-[#FFD23F]">
              <strong className="text-[#FFD23F]">Breakeven:</strong> Month 4 (Lagos market factors included)
            </div>
          </div>

          <BusinessInsight type="success">
            <strong className="text-[#00F5A0]">SMART MOVE:</strong> Start with a contract role! Hire part-time (20hrs/week) for ₦250,000 first. Perfect for Nigerian market dynamics 🚀
          </BusinessInsight>

          <BusinessInsight type="warning">
            <strong>NIGERIAN CONTEXT:</strong> Consider remote talent from other states - 40% cost savings vs Lagos-based employees. Factor in PAYE, pension, and health insurance (additional 15% costs).
          </BusinessInsight>

          <FinancialChart 
            data={[800, 600, 400, 200, 600, 1000, 1400]} 
            title="Profit Trajectory with Strategic Hiring" 
          />
        </div>
      ),
      isUser: false,
      timestamp: new Date(),
      actions: ["📊 Calculate exact costs", "🌍 Explore remote options", "📈 Create hiring timeline", "💰 Compare contract vs full-time"]
    }
  }

  if (lowerInput.includes("price") || lowerInput.includes("pricing") || lowerInput.includes("increase")) {
    const match = lowerInput.match(/(\d+)%?/);
    const increasePercent = match && match[1] ? parseInt(match[1]) : 15;
    
    return {
      id: Date.now().toString(),
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <DollarSign className="w-5 h-5 text-[#00D2FF]" />
            <h4 className="text-lg font-semibold text-white">PRICING STRATEGY ANALYSIS ({increasePercent}% INCREASE)</h4>
          </div>

          <FinancialChart
            data={[420000, 480000, 510000, 540000, 570000, 600000, 630000]}
            title={`Revenue Impact - ${increasePercent}% Price Increase (₦)`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
              <h5 className="text-[#00F5A0] font-semibold mb-2">Nigerian Market Gains</h5>
              <ul className="text-sm text-[#A0A0A0] space-y-1">
                <li>• +₦4.8M annual revenue</li>
                <li>• Higher margins (cost inflation protection)</li>
                <li>• Premium positioning vs competitors</li>
                <li>• Better cash flow for expansion</li>
              </ul>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
              <h5 className="text-[#FF6B35] font-semibold mb-2">Nigerian Market Risks</h5>
              <ul className="text-sm text-[#A0A0A0] space-y-1">
                <li>• 12% customer churn risk (price sensitivity)</li>
                <li>• Economic climate impact</li>
                <li>• Competitor undercut risk</li>
                <li>• Payment delays may increase</li>
              </ul>
            </div>
          </div>

          <BusinessInsight type="info">
            <strong>NIGERIAN RECOMMENDATION:</strong> Implement gradually starting with new customers. Consider value-add bundles to justify increase. Monitor naira volatility impact on pricing power.
          </BusinessInsight>

          <BusinessInsight type="success">
            <strong>MARKET INSIGHT:</strong> Nigerian consumers show 23% higher price tolerance for "premium" positioning vs gradual increases. Consider repositioning strategy.
          </BusinessInsight>
        </div>
      ),
      isUser: false,
      timestamp: new Date(),
      actions: ["📊 Model different scenarios", "🧪 Set up A/B test", "📈 Track price sensitivity", "🌍 Analyze competitor pricing"]
    }
  }

  if (lowerInput.includes("revenue") || lowerInput.includes("sales") || lowerInput.includes("income")) {
    return {
      id: Date.now().toString(),
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <BarChart3 className="w-5 h-5 text-[#00D2FF]" />
            <h4 className="text-lg font-semibold text-white">REVENUE OPTIMIZATION ANALYSIS</h4>
          </div>

          <FinancialChart
            data={[1200000, 1450000, 1320000, 1680000, 1890000, 2100000, 2350000]}
            title="Monthly Revenue Trend (₦)"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
              <h5 className="text-[#00F5A0] font-semibold mb-2">Current MRR</h5>
              <div className="text-2xl font-bold text-white">₦2.35M</div>
              <div className="text-xs text-[#00F5A0]">⬆️ +18% this month</div>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
              <h5 className="text-[#FFD23F] font-semibold mb-2">Growth Rate</h5>
              <div className="text-2xl font-bold text-white">24%</div>
              <div className="text-xs text-[#FFD23F]">Above Nigeria SME avg (12%)</div>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
              <h5 className="text-[#00D2FF] font-semibold mb-2">Forecast</h5>
              <div className="text-2xl font-bold text-white">₦3.2M</div>
              <div className="text-xs text-[#00D2FF]">Next month projection</div>
            </div>
          </div>

          <BusinessInsight type="success">
            <strong>OUTSTANDING PERFORMANCE:</strong> Your growth rate is 2x the Nigerian SME average! You're perfectly positioned for scaling or seeking investment.
          </BusinessInsight>

          <BusinessInsight type="info">
            <strong>OPTIMIZATION OPPORTUNITIES:</strong>
            <ul className="mt-2 space-y-1">
              <li>• Customer lifetime value increase: +30% potential</li>
              <li>• Upselling existing clients: ₦450K monthly opportunity</li>
              <li>• Geographic expansion: Lagos→Abuja market entry</li>
              <li>• Product diversification: 15% revenue boost</li>
            </ul>
          </BusinessInsight>
        </div>
      ),
      isUser: false,
      timestamp: new Date(),
      actions: ["📊 Deep dive into top customers", "💰 Calculate LTV optimization", "🌍 Explore market expansion", "📈 Set revenue targets"]
    }
  }

  if (lowerInput.includes("cash flow") || lowerInput.includes("cash") || lowerInput.includes("liquidity")) {
    return {
      id: Date.now().toString(),
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <Activity className="w-5 h-5 text-[#00D2FF]" />
            <h4 className="text-lg font-semibold text-white">CASH FLOW HEALTH CHECK</h4>
          </div>

          <div className="space-y-3">
            <ProgressVisual label="Current Cash Position" value={2800000} max={5000000} color="#00F5A0" />
            <ProgressVisual label="Monthly Burn Rate" value={850000} max={2000000} color="#FFD23F" />
            <ProgressVisual label="Cash Runway (Months)" value={8} max={12} color="#00D2FF" />
          </div>

          <BusinessInsight type="warning">
            <strong>NIGERIAN BUSINESS ALERT:</strong> Your 8-month runway is good, but consider economic volatility. Naira devaluation risk suggests maintaining 12+ months runway.
          </BusinessInsight>

          <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
            <h5 className="text-[#00D2FF] font-semibold mb-3">Cash Flow Optimization Strategies:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="text-[#00F5A0] font-medium mb-2">Quick Wins (30 days)</h6>
                <ul className="text-[#A0A0A0] space-y-1">
                  <li>• Invoice terms: Net 30 → Net 15</li>
                  <li>• Payment incentives: 2% discount for immediate payment</li>
                  <li>• Inventory optimization: ₦200K freed up</li>
                </ul>
              </div>
              <div>
                <h6 className="text-[#FFD23F] font-medium mb-2">Strategic (90 days)</h6>
                <ul className="text-[#A0A0A0] space-y-1">
                  <li>• Line of credit: ₦5M facility secured</li>
                  <li>• Expense audit: 8% cost reduction</li>
                  <li>• Recurring revenue: +₦300K monthly</li>
                </ul>
              </div>
            </div>
          </div>

          <FinancialChart
            data={[2800, 2900, 3100, 3300, 3600, 3900, 4200]}
            title="Projected Cash Position (₦'000s)"
          />
        </div>
      ),
      isUser: false,
      timestamp: new Date(),
      actions: ["💰 Set up credit line", "📊 Optimize collections", "📈 Create cash forecast", "🔄 Automate invoicing"]
    }
  }

  if (lowerInput.includes("expand") || lowerInput.includes("expansion") || lowerInput.includes("scale") || lowerInput.includes("grow")) {
    return {
      id: Date.now().toString(),
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <Activity className="w-5 h-5 text-[#00D2FF]" />
            <h4 className="text-lg font-semibold text-white">BUSINESS EXPANSION READINESS</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
              <h5 className="text-[#00F5A0] font-semibold mb-2">Financial Health</h5>
              <div className="text-3xl font-bold text-[#00F5A0] mb-1">85/100</div>
              <div className="text-xs text-[#A0A0A0]">Ready for expansion</div>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
              <h5 className="text-[#FFD23F] font-semibold mb-2">Market Opportunity</h5>
              <div className="text-3xl font-bold text-[#FFD23F] mb-1">92/100</div>
              <div className="text-xs text-[#A0A0A0]">High demand signals</div>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
              <h5 className="text-[#00D2FF] font-semibold mb-2">Operational Readiness</h5>
              <div className="text-3xl font-bold text-[#00D2FF] mb-1">73/100</div>
              <div className="text-xs text-[#A0A0A0]">Needs optimization</div>
            </div>
          </div>

          <BusinessInsight type="success">
            <strong>EXPANSION RECOMMENDATION:</strong> You're financially ready! Nigerian market data shows strong demand in your sector. Focus on operational scaling before geographic expansion.
          </BusinessInsight>

          <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
            <h5 className="text-[#00D2FF] font-semibold mb-3">Recommended Expansion Sequence:</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#00F5A0] text-[#0A0A0A] flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-sm text-[#A0A0A0]">Scale current operations (Lagos market penetration)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#FFD23F] text-[#0A0A0A] flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-sm text-[#A0A0A0]">Geographic expansion (Abuja/Port Harcourt)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#00D2FF] text-[#0A0A0A] flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-sm text-[#A0A0A0]">Product line diversification</span>
              </div>
            </div>
          </div>

          <FinancialChart
            data={[2350, 2800, 3400, 4200, 5100, 6300, 7800]}
            title="Revenue Projection with Expansion (₦'000s)"
          />
        </div>
      ),
      isUser: false,
      timestamp: new Date(),
      actions: ["🌍 Analyze market entry costs", "📊 Create expansion timeline", "💰 Calculate funding needs", "📈 Set growth milestones"]
    }
  }
// Enhanced default response with more business intelligence
  return {
    id: Date.now().toString(),
    content: (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-3">
          <Brain className="w-5 h-5 text-[#00D2FF]" />
          <h4 className="text-lg font-semibold text-white">AI CFO READY TO HELP</h4>
        </div>

        <p className="text-[#A0A0A0]">I understand you have questions about your business. I'm designed specifically for Nigerian entrepreneurs and global businesses.</p>

        <BusinessInsight type="info">
          I can help you analyze:
          <ul className="mt-2 space-y-1">
            <li>• 💰 Pricing strategies and revenue optimization</li>
            <li>• 📊 Cash flow management and forecasting</li>
            <li>• 👥 Hiring decisions and team scaling</li>
            <li>• 🌍 Market expansion and growth planning</li>
            <li>• 💡 Investment and funding strategies</li>
            <li>• 📈 Financial KPIs and business metrics</li>
          </ul>
        </BusinessInsight>

        <div className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg p-4">
          <h5 className="text-[#00F5A0] font-semibold mb-2">Quick Business Health Check</h5>
          <p className="text-sm text-[#A0A0A0] mb-3">Share your monthly revenue and main expenses for instant insights:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="bg-[#1A1A1A]/80 border-[#1E1E1E] text-[#A0A0A0] hover:border-[#00D2FF] hover:text-white text-xs"
            >
              "Revenue: ₦2M, Costs: ₦1.5M"
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="bg-[#1A1A1A]/80 border-[#1E1E1E] text-[#A0A0A0] hover:border-[#00D2FF] hover:text-white text-xs"
            >
              "Small retail business"
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="bg-[#1A1A1A]/80 border-[#1E1E1E] text-[#A0A0A0] hover:border-[#00D2FF] hover:text-white text-xs"
            >
              "Tech startup"
            </Button>
          </div>
        </div>

        <p className="text-sm text-[#666666]">
          💡 <strong>Pro tip:</strong> Upload financial documents or connect your accounting software for deeper, personalized insights tailored to your specific business situation.
        </p>
      </div>
    ),
    isUser: false,
    timestamp: new Date(),
    actions: ["📊 Upload financial data", "🔗 Connect accounting", "📈 Set up KPI tracking", "💡 Explore AI features"]
    // ← REMOVED THE COMMA HERE
    }
  }
  
// Add these missing closing braces for the functions:
  const handleActionClick = (action: string) => {
    setInputValue(action)
    handleSendMessage()
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-[#1E1E1E] backdrop-blur-xl bg-[#0A0A0A]/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0099CC] flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00D2FF] to-[#0099CC] bg-clip-text text-transparent">
                  NeuroFinance AI CFO
                </h1>
                <p className="text-xs text-[#666666]">Real-time business intelligence</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="hover:bg-[#1A1A1A]"
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="hover:bg-[#1A1A1A]"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfile(!showProfile)}
                className="hover:bg-[#1A1A1A]"
              >
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="min-h-[60vh] mb-8">
          {messages.map((message) => (
            <div key={message.id}>
              <Message
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
              {message.actions && (
                <FollowUpActions
                  actions={message.actions}
                  onActionClick={handleActionClick}
                />
              )}
            </div>
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative">
          {showSuggestions && messages.length <= 1 && (
            <SmartSuggestions
              suggestions={smartSuggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          )}

          <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-4 backdrop-blur-xl">
            <div className="flex items-end space-x-4">
              <Textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your AI CFO anything about your business..."
                className="flex-1 bg-transparent border-0 resize-none focus:ring-0 text-white placeholder-[#666666] min-h-[60px] max-h-32"
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-[#00D2FF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00D2FF] text-white border-0 h-12 w-12 rounded-xl"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}