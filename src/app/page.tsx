import Link from "next/link";
import Image from "next/image";
import { cities } from "@/lib/data";

const cityImages: Record<string, string> = {
  "上海": "/city-shanghai.png",
  "北京": "/city-beijing.png",
  "广州": "/city-guangzhou.png",
  "成都": "/city-chengdu.png",
};

const hotCityNames = ["上海", "北京", "广州", "成都", "杭州", "武汉"];
const hotCities = cities.filter((c) => hotCityNames.includes(c.name));

export default function HomePage() {
  return (
    <div>
      {/* ---------- Hero: clean gradient, no photo ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 text-white">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

        <div className="relative z-10 max-w-4xl mx-auto px-5 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm px-4 py-1.5 rounded-full mb-6 border border-white/10">
            <span>🌿</span>
            <span>v5 · 为银发家庭提供可靠参考</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
            为父母找到<span className="text-warm-300">安心</span>的选择
          </h1>
          <p className="text-lg text-sage-100/80 max-w-xl mx-auto mb-10 leading-relaxed">
            一站式查询全国养老机构、殡仪馆、墓地信息，人工核实，数据可靠。
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
          <div className="flex flex-wrap justify-center gap-2.5 mt-5">
            <Link href="/city/shanghai" className="text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-full transition-colors backdrop-blur-sm">上海养老院</Link>
            <Link href="/city/beijing" className="text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-full transition-colors backdrop-blur-sm">北京墓地</Link>
            <Link href="/city/chengdu" className="text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-full transition-colors backdrop-blur-sm">成都殡仪馆</Link>
            <Link href="/city/hangzhou" className="text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-full transition-colors backdrop-blur-sm">杭州护理院</Link>
          </div>

          {/* Stats bar */}
          <div className="flex justify-center gap-12 md:gap-16 text-center mt-12 pt-8 border-t border-white/10">
            {[
              { num: "10+", label: "覆盖城市" },
              { num: "24+", label: "收录机构" },
              { num: "100%", label: "人工核实" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold text-warm-300">{s.num}</div>
                <div className="text-sm text-sage-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Two service cards ---------- */}
      <section className="max-w-5xl mx-auto px-5 -mt-10 relative z-10 pb-12">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Nursing */}
          <Link href="/search?q=养老" className="group bg-surface rounded-2xl shadow-md hover:shadow-xl border border-border p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center text-3xl shrink-0 group-hover:bg-sage-200 transition-colors">🏥</div>
            <div>
              <h2 className="text-lg font-bold text-sage-800 mb-1.5">找养老院</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">对比价格、床位、医疗配套，为父母找到舒适安心的晚年居所。</p>
              <span className="text-sm font-semibold text-sage-600 group-hover:translate-x-1 transition-transform inline-block">立即查找 →</span>
            </div>
          </Link>

          {/* Funeral */}
          <Link href="/search?q=殡葬" className="group bg-surface rounded-2xl shadow-md hover:shadow-xl border border-border p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-warm-100 flex items-center justify-center text-3xl shrink-0 group-hover:bg-warm-200 transition-colors">🕯️</div>
            <div>
              <h2 className="text-lg font-bold text-warm-700 mb-1.5">殡葬服务</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">查找殡仪馆、墓地，了解流程与风俗，让告别体面而有尊严。</p>
              <span className="text-sm font-semibold text-warm-500 group-hover:translate-x-1 transition-transform inline-block">立即查找 →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------- Hot cities ---------- */}
      <section className="max-w-5xl mx-auto px-5 pb-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-text">热门城市</h2>
            <p className="text-sm text-text-secondary mt-0.5">首批覆盖 10 个核心城市</p>
          </div>
          <Link href="/search" className="text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors">查看全部 →</Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
          {hotCities.map((city) => (
            <Link
              key={city.id}
              href={`/city/${city.pinyin}`}
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-sage-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="h-20 relative overflow-hidden bg-gradient-to-br from-sage-50 to-sage-100">
                {cityImages[city.name] ? (
                  <Image src={cityImages[city.name]} alt={city.name} fill className="object-cover group-hover:scale-105 transition-transform duration-400" sizes="16vw" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🏙️</div>
                )}
              </div>
              <div className="p-2.5 text-center">
                <div className="font-semibold text-text group-hover:text-sage-700 transition-colors text-sm">{city.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-sage-700 text-white">
        <div className="max-w-5xl mx-auto px-5 py-12 text-center">
          <h2 className="text-xl font-bold mb-2">信息有误？帮助我们完善</h2>
          <p className="text-sage-200/80 mb-5 max-w-md mx-auto text-sm">本站信息均人工核实，如有疏漏，欢迎反馈。</p>
          <a href="mailto:hi@navi-resources.com" className="inline-flex items-center gap-2 bg-white text-sage-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-warm-50 transition-colors">📧 提交反馈</a>
        </div>
      </section>
    </div>
  );
}
