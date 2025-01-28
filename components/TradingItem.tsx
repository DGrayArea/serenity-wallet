import { Card, CardContent } from "@/components/ui/card"
import { Circle, Pill } from 'lucide-react'

interface TrendingItemProps {
  rank: number
  title: string
  category: string
  icon: "circle" | "pill"
}

export function TrendingItem({ rank, title, category, icon }: TrendingItemProps) {
  return (
    <Card className="bg-transparent border-0 hover:bg-white/5 transition-colors">
      <CardContent className="p-4 flex items-center gap-4">
        <span className="text-white/50 font-mono w-6">{rank}</span>
        <div className="p-2 bg-white/10 rounded-full">
          {icon === "circle" ? (
            <Circle className="w-5 h-5 text-blue-400 fill-current" />
          ) : (
            <Pill className="w-5 h-5 text-emerald-400" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/50">{category}</p>
        </div>
      </CardContent>
    </Card>
  )
}

