import Link from "next/link";
import { cities } from "@/lib/data";

export default function HomePage() {
  const hotCities = cities.filter((c) => c.tier === "一线");
  const newCities = cities.filter((c) => c.tier === "新一线");

  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-50 via-warm-50 to-surface">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_120%,#4a6342_0%,transparent_60%)]" />
        
        <div className="relative max-w-7xl mx-auto px-5 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-warm-100/80 text-warm-700 text-sm px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span>🌿</span>
            <span>用心守护每一个家庭的重要时刻</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sage-800 mb-5 leading-tight tracking-tight">
            银发指南
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            为父母养老解难，为家人善后分忧。<br />
            一站式查询全国<strong className="text-sage-700">养老机构</strong>、<strong className="text-sage-700">殡仪馆</strong>和<strong className="text-sage-700">墓地陵园</strong>信息。
          </p>

          {/* Search bar */}
          <form action="/search" className="max-w-xl mx-auto flex gap-0 mb-12">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50 text-lg">🔍</span>
              <input
                name="q"
                type="text"
                placeholder="输入城市名、养老院或服务关键词..."
                className="w-full pl-11 pr-4 py-3.5 rounded-l-xl border border-border bg-surface text-text placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 transition-shadow text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-sage-700 text-white px-6 py-3.5 rounded-r-xl text-sm font-semibold hover:bg-sage-600 transition-colors shrink-0 shadow-sm"
            >
              搜索
            </button>
          </form>

          {/* Stats */}
          <div className="flex justify-center gap-12 md:gap-16 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-sage-700">10+</div>
              <div className="text-sm text-text-secondary mt-1">覆盖城市</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-sage-700">24+</div>
              <div className="text-sm text-text-secondary mt-1">收录机构</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-warm-500">100%</div>
              <div className="text-sm text-text-secondary mt-1">人工核实</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Service cards ---------- */}
      <section className="max-w-7xl mx-auto px-5 -mt-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-5">
          <Link
            href="/search?q=养老"
            className="group bg-surface border border-border rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-sage-200 transition-all duration-300"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-sage-50 flex items-center justify-center text-3xl shrink-0 group-hover:bg-sage-100 transition-colors">
                🏥
              </div>
              <div>
                <h2 className="text-xl font-bold text-sage-800 mb-2 group-hover:text-sage-700 transition-colors">
                  养老服务
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  按城市查询养老机构，对比价格、床位数、医疗配套，为父母找到安心舒适的晚年居所。
                </p>
                <span className="text-sm font-semibold text-sage-600 group-hover:translate-x-1 transition-transform inline-block">
                  查找养老院 →
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="/search?q=殡葬"
            className="group bg-surface border border-border rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-warm-200 transition-all duration-300"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-warm-50 flex items-center justify-center text-3xl shrink-0 group-hover:bg-warm-100 transition-colors">
                🕯️
              </div>
              <div>
                <h2 className="text-xl font-bold text-warm-700 mb-2 group-hover:text-warm-600 transition-colors">
                  殡葬服务
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  查找殡仪馆、墓地陵园，了解白事流程与本地风俗，让告别体面而有尊严。
                </p>
                <span className="text-sm font-semibold text-warm-500 group-hover:translate-x-1 transition-transform inline-block">
                  查找殡葬服务 →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------- City grid ---------- */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-sage-800 mb-3">
            选择城市开始查询
          </h2>
          <p className="text-text-secondary text-sm">首批覆盖 10 个核心城市，更多城市持续收录中</p>
        </div>

        {/* Tier 1 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-sage-600" />
            <h3 className="text-sm font-semibold text-sage-700 uppercase tracking-wider">一线城市</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {hotCities.map((city) => (
              <Link
                key={city.id}
                href={`/city/${city.pinyin}`}
                className="group bg-surface border border-border rounded-xl px-5 py-4 hover:shadow-md hover:border-sage-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="font-semibold text-text group-hover:text-sage-700 transition-colors">
                  {city.name}
                </div>
                <div className="text-xs text-text-secondary/60 mt-1">{city.province}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tier 2 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-warm-400" />
            <h3 className="text-sm font-semibold text-warm-700 uppercase tracking-wider">新一线城市</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {newCities.map((city) => (
              <Link
                key={city.id}
                href={`/city/${city.pinyin}`}
                className="group bg-surface border border-border rounded-xl px-5 py-4 hover:shadow-md hover:border-warm-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="font-semibold text-text group-hover:text-warm-700 transition-colors">
                  {city.name}
                </div>
                <div className="text-xs text-text-secondary/60 mt-1">{city.province}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-sage-700 text-white">
        <div className="max-w-7xl mx-auto px-5 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">信息有误？帮助我们完善</h2>
          <p className="text-sage-200 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            本站信息均由人工核实，但难免有疏漏。如果您发现信息错误，欢迎反馈，让更多人受益。
          </p>
          <a
            href="mailto:hi@navi-resources.com"
            className="inline-flex items-center gap-2 bg-white text-sage-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-warm-50 transition-colors"
          >
            📧 提交反馈
          </a>
        </div>
      </section>
    </div>
  );
}
