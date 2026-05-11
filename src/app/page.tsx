import Link from "next/link";
import { cities } from "@/lib/data";

export default function HomePage() {
  const tiers = [
    { label: "一线城市", cities: cities.filter((c) => c.tier === "一线") },
    { label: "新一线城市", cities: cities.filter((c) => c.tier === "新一线") },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a5f4a] mb-4">
          银发指南
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          帮您一站式查询全国养老院、殡仪馆、墓地信息。<br />
          为父母养老解难，为家人善后分忧。
        </p>
        
        {/* Quick search */}
        <form action="/search" className="mt-6 max-w-md mx-auto flex gap-2">
          <input
            name="q"
            type="text"
            placeholder="搜索城市、养老院、殡仪馆或墓地..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/30 focus:border-[#1a5f4a]"
          />
          <button
            type="submit"
            className="bg-[#1a5f4a] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2d8a6e] transition-colors shrink-0"
          >
            搜索
          </button>
        </form>
      </section>

      {/* City grid */}
      {tiers.map((tier) => (
        <section key={tier.label} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">{tier.label}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {tier.cities.map((city) => (
              <Link
                key={city.id}
                href={`/city/${city.pinyin}`}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center hover:shadow-md hover:border-[#1a5f4a]/30 transition-all"
              >
                <div className="font-semibold text-gray-900">{city.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{city.province}</div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Services intro */}
      <section className="mt-10 grid md:grid-cols-2 gap-6">
        <Link href="/search?q=养老" className="block bg-gradient-to-br from-[#e8f5f0] to-white border border-[#1a5f4a]/10 rounded-xl p-6 hover:shadow-lg transition-all">
          <div className="text-3xl mb-2">🏥</div>
          <h3 className="text-lg font-bold text-[#1a5f4a] mb-1">找养老院</h3>
          <p className="text-sm text-gray-500">按城市查询养老机构，对比价格、床位数、是否接收失能老人。</p>
        </Link>
        <Link href="/search?q=丧葬" className="block bg-gradient-to-br from-[#fdf2e8] to-white border border-[#f0a261]/10 rounded-xl p-6 hover:shadow-lg transition-all">
          <div className="text-3xl mb-2">🕯️</div>
          <h3 className="text-lg font-bold text-[#f0a261] mb-1">殡葬服务</h3>
          <p className="text-sm text-gray-500">查找殡仪馆、墓地信息，了解白事流程和本地丧葬风俗。</p>
        </Link>
      </section>
    </div>
  );
}
