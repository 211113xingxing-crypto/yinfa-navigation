import Link from "next/link";
import { cities } from "@/lib/data";

export const dynamic = "force-static";

const hotCityNames = ["上海","北京","广州","成都","杭州","武汉"];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-bold">银</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-wide">银发指南</h1>
              <p className="text-xs text-muted-foreground">养老·殡葬·墓地 信息查询</p>
            </div>
          </div>
          <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground">🔍 搜索</Link>
        </div>
      </header>

      <section className="py-12 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-tight">温暖陪伴每一程</h2>
          <p className="text-muted-foreground mb-8 text-sm md:text-base">为您提供全国养老院、殡仪馆、墓地的权威信息查询服务</p>

          <form action="/search" className="relative max-w-xl mx-auto">
            <input type="text" name="q" placeholder="输入城市名，如上海"
              className="w-full pl-5 pr-28 py-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm text-base" />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity text-sm">搜索</button>
          </form>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">🔥 热门城市</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {cities.filter(c => hotCityNames.includes(c.name)).map((city) => (
              <Link key={city.id} href={`/city/${city.pinyin}`}
                className="bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity text-center shadow-sm">
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">📍 全部城市</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {cities.map((city) => (
              <Link key={city.id} href={`/city/${city.pinyin}`}
                className="bg-card border border-border py-3 px-4 rounded-lg text-foreground font-medium hover:border-primary hover:bg-secondary transition-all text-center shadow-sm">
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">📂 快捷分类</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[{n:"🏥 养老院",q:"养老院"},{n:"🕯️ 殡仪馆",q:"殡仪馆"},{n:"🪦 墓地",q:"墓地"},{n:"💊 护理院",q:"护理院"},{n:"📋 白事一条龙",q:"一条龙"},{n:"💰 价格对比",q:"价格"}].map(cat => (
              <Link key={cat.q} href={`/search?q=${cat.q}`}
                className="bg-card border border-border p-4 rounded-lg hover:border-primary hover:shadow-md transition-all group flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg group-hover:bg-primary/10 transition-colors shrink-0">{cat.n.slice(0,2)}</div>
                <div className="font-medium text-foreground text-sm">{cat.n.slice(3)}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-secondary/50 border border-border rounded-lg p-6 text-center">
            <span className="text-sm font-medium text-foreground">收录全国 24+ 家机构 · 覆盖 10 座城市</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 py-6 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">© 2026 银发指南 navi-resources.com</p>
        </div>
      </footer>
    </div>
  );
}
