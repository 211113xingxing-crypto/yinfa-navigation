import Link from "next/link";
import { cities } from "@/lib/data";

const cityColors: Record<string, string> = {
  "上海": "bg-red-500", "北京": "bg-amber-600", "广州": "bg-emerald-500",
  "成都": "bg-teal-500", "杭州": "bg-cyan-500", "武汉": "bg-blue-500",
  "重庆": "bg-purple-500", "南京": "bg-rose-500", "天津": "bg-indigo-500",
  "沈阳": "bg-slate-600",
};

const hot = cities.filter(c => ["上海","北京","广州","成都","杭州","武汉"].includes(c.name));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-warm-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        
        {/* Logo + Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-sage-800 mb-1">银发指南</h1>
          <p className="text-sm text-text-secondary">养老 · 殡葬 · 墓地 信息查询</p>
        </div>

        {/* Search */}
        <form action="/search" className="mb-10 max-w-xl mx-auto">
          <div className="flex bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <input name="q" type="text" placeholder="搜索城市或服务名称..."
              className="flex-1 px-5 py-3.5 bg-transparent text-text placeholder:text-text-secondary/40 text-sm focus:outline-none" />
            <button type="submit" className="bg-sage-700 text-white px-6 py-3.5 text-sm font-semibold hover:bg-sage-600">搜索</button>
          </div>
        </form>

        {/* Hot cities */}
        <h2 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
          <span>🔥</span> 热门城市
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-10">
          {hot.map(c => (
            <Link key={c.id} href={`/city/${c.pinyin}`}
              className={`${cityColors[c.name] || "bg-sage-500"} text-white rounded-xl px-4 py-5 text-center font-semibold text-sm hover:brightness-110 hover:shadow-lg transition-all hover:-translate-y-0.5`}>
              {c.name}
            </Link>
          ))}
        </div>

        {/* All cities */}
        <h2 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
          <span>📍</span> 全部城市
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 mb-10">
          {cities.map(c => (
            <Link key={c.id} href={`/city/${c.pinyin}`}
              className="bg-white border border-border rounded-xl px-4 py-3.5 text-center text-sm font-medium text-text hover:border-sage-300 hover:shadow-sm transition-all hover:-translate-y-0.5">
              {c.name}
            </Link>
          ))}
        </div>

        {/* Category links */}
        <h2 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
          <span>📂</span> 快捷查询
        </h2>
        <div className="flex flex-wrap gap-2.5 mb-8">
          <Link href="/search?q=养老院" className="bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-sage-200 transition-colors">🏥 养老院</Link>
          <Link href="/search?q=殡仪馆" className="bg-warm-100 text-warm-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors">🕯️ 殡仪馆</Link>
          <Link href="/search?q=墓地" className="bg-warm-100 text-warm-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors">🪦 墓地</Link>
          <Link href="/search?q=护理院" className="bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-sage-200 transition-colors">💊 护理院</Link>
          <Link href="/search?q=一条龙" className="bg-warm-100 text-warm-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors">📋 白事一条龙</Link>
          <Link href="/search?q=价格" className="bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-sage-200 transition-colors">💰 价格对比</Link>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-text-secondary/50">
          navi-resources.com · 信息仅供参考
        </p>
      </div>
    </div>
  );
}
