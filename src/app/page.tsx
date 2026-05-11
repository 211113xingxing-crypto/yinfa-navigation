import Link from "next/link";
import { cities } from "@/lib/data";

type CityStyle = { emoji: string; gradient: string; textColor: string };
const cityStyles: Record<string, CityStyle> = {
  "上海": { emoji: "🌃", gradient: "from-blue-400 to-indigo-600", textColor: "text-white" },
  "北京": { emoji: "🏯", gradient: "from-red-400 to-amber-600", textColor: "text-white" },
  "广州": { emoji: "🌆", gradient: "from-cyan-400 to-teal-600", textColor: "text-white" },
  "成都": { emoji: "🐼", gradient: "from-emerald-400 to-green-700", textColor: "text-white" },
  "杭州": { emoji: "🏞️", gradient: "from-teal-300 to-cyan-600", textColor: "text-white" },
  "武汉": { emoji: "🌉", gradient: "from-orange-400 to-rose-500", textColor: "text-white" },
  "重庆": { emoji: "🏔️", gradient: "from-purple-400 to-violet-700", textColor: "text-white" },
  "南京": { emoji: "🏛️", gradient: "from-amber-400 to-yellow-600", textColor: "text-white" },
  "天津": { emoji: "🎡", gradient: "from-sky-400 to-blue-700", textColor: "text-white" },
  "沈阳": { emoji: "🏭", gradient: "from-gray-400 to-slate-700", textColor: "text-white" },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 text-white">
        <div className="absolute inset-0 z-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-5 py-28 md:py-36 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight leading-tight">
            为父母找到<span className="text-warm-300">安心</span>的选择
          </h1>
          <p className="text-lg text-sage-100/80 max-w-xl mx-auto mb-10 leading-relaxed">
            一站式查询全国养老机构、殡仪馆、墓地信息
          </p>
          <form action="/search" className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
              <div className="flex-1 flex items-center px-5">
                <span className="text-xl mr-3 shrink-0">🔍</span>
                <input name="q" type="text" placeholder="输入城市名，如上海，开始查询..."
                  className="w-full py-4 text-text bg-transparent placeholder:text-text-secondary/40 text-base focus:outline-none" />
              </div>
              <button type="submit" className="bg-warm-500 hover:bg-warm-400 text-white px-8 py-4 font-semibold text-base transition-colors shrink-0">查询</button>
            </div>
          </form>
        </div>
      </section>

      {/* Service cards */}
      <section className="max-w-5xl mx-auto px-5 -mt-12 relative z-10 pb-16">
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/search?q=养老" className="group bg-surface rounded-2xl shadow-md hover:shadow-xl border border-border p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sage-100/60 to-transparent rounded-bl-full" />
            <div className="relative flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center text-3xl shrink-0">🏥</div>
              <div>
                <h2 className="text-xl font-bold text-sage-800 mb-2">找养老院</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">对比价格、床位、医疗配套，为父母找到舒适安心的晚年居所。</p>
                <span className="text-sm font-semibold text-sage-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">立即查找 →</span>
              </div>
            </div>
          </Link>
          <Link href="/search?q=殡葬" className="group bg-surface rounded-2xl shadow-md hover:shadow-xl border border-border p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-warm-100/60 to-transparent rounded-bl-full" />
            <div className="relative flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center text-3xl shrink-0">🕯️</div>
              <div>
                <h2 className="text-xl font-bold text-warm-700 mb-2">殡葬服务</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">查找殡仪馆、墓地，了解流程与风俗，让告别体面而有尊严。</p>
                <span className="text-sm font-semibold text-warm-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">立即查找 →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* City grid */}
      <section className="max-w-5xl mx-auto px-5 pb-14">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-text">选择城市</h2>
          <p className="text-sm text-text-secondary mt-1">覆盖 10 个核心城市，更多城市持续收录中</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {cities.map((city) => {
            const style = cityStyles[city.name] || { emoji: "🏙️", gradient: "from-sage-400 to-sage-600", textColor: "text-white" };
            return (
              <Link
                key={city.id}
                href={`/city/${city.pinyin}`}
                className="group relative rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Color block top */}
                <div className={`h-20 bg-gradient-to-br ${style.gradient} flex items-center justify-center text-3xl group-hover:scale-105 transition-transform duration-300`}>
                  {style.emoji}
                </div>
                {/* Label bottom */}
                <div className="bg-surface border border-t-0 border-border rounded-b-xl px-3 py-2.5 text-center">
                  <div className={`font-semibold text-sm ${city.tier === "一线" ? "text-sage-800" : "text-text"}`}>{city.name}</div>
                  <div className="text-xs text-text-secondary/50">{city.province}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage-700 text-white">
        <div className="max-w-5xl mx-auto px-5 py-12 text-center">
          <h2 className="text-xl font-bold mb-2">信息有误？帮助我们完善</h2>
          <p className="text-sage-200/80 mb-5 max-w-md mx-auto text-sm">本站信息均人工核实，如有疏漏，欢迎反馈。</p>
          <a href="mailto:hi@navi-resources.com" className="inline-flex items-center gap-2 bg-white text-sage-700 px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-warm-50 transition-colors">📧 提交反馈</a>
        </div>
      </section>
    </div>
  );
}
