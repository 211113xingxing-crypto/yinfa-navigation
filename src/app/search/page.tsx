import { searchAll, cities as allCities } from "@/lib/data";
import InfoCard from "@/components/InfoCard";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "搜索 - 银发指南" };
interface Props { searchParams: Promise<{ q?: string }>; }

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-16 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-text mb-4">搜索养老、殡葬服务</h1>
        <form className="max-w-md mx-auto flex gap-0">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/40">🔍</span>
            <input
              name="q" type="text" placeholder="输入城市名、机构名称..."
              className="w-full pl-11 pr-4 py-3 rounded-l-xl border border-border bg-surface text-text placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-sage-300 text-sm"
            />
          </div>
          <button type="submit" className="bg-sage-700 text-white px-6 py-3 rounded-r-xl text-sm font-semibold hover:bg-sage-600 transition-colors">
            搜索
          </button>
        </form>
      </div>
    );
  }

  const results = searchAll(q);
  const total = results.cities.length + results.nursingHomes.length + results.funeralHomes.length + results.cemeteries.length;

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <form className="flex gap-0 mb-8">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/40">🔍</span>
          <input
            name="q" type="text" defaultValue={q} placeholder="输入关键词..."
            className="w-full pl-11 pr-4 py-3 rounded-l-xl border border-border bg-surface text-text placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-sage-300 text-sm"
          />
        </div>
        <button type="submit" className="bg-sage-700 text-white px-6 py-3 rounded-r-xl text-sm font-semibold hover:bg-sage-600 transition-colors">
          搜索
        </button>
      </form>

      <p className="text-sm text-text-secondary mb-6">
        搜索 "{q}"，共找到 <strong className="text-sage-700">{total}</strong> 个结果
      </p>

      {results.cities.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">🏙️ 城市</h2>
          <div className="flex flex-wrap gap-2">
            {results.cities.map((c) => (
              <Link key={c.id} href={`/city/${c.pinyin}`} className="text-sm bg-surface border border-border rounded-xl px-4 py-2.5 hover:border-sage-300 hover:shadow-sm transition-all font-medium">
                {c.name} <span className="text-text-secondary/50 font-normal">· {c.province}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.nursingHomes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">🏥 养老机构 ({results.nursingHomes.length})</h2>
          <div className="space-y-3">
            {results.nursingHomes.map((h) => {
              const city = allCities.find((c) => c.id === h.cityId);
              return (
                <InfoCard key={h.id} title={h.name} subtitle={`${city?.name || ""} · ${h.address}`}
                  price={`¥${h.priceMin}-${h.priceMax}/月`} badge={h.type || undefined}
                  tags={[h.acceptsDisabled ? "接收失能" : "", h.medicalInsurance ? "医保定点" : ""].filter(Boolean)}
                  rating={h.rating} phone={h.phone || undefined} href={`/city/${city?.pinyin}/yanglao/${h.id}`} />
              );
            })}
          </div>
        </section>
      )}

      {results.funeralHomes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">🕯️ 殡仪馆 ({results.funeralHomes.length})</h2>
          <div className="space-y-3">
            {results.funeralHomes.map((fh) => {
              const city = allCities.find((c) => c.id === fh.cityId);
              return (
                <InfoCard key={fh.id} title={fh.name} subtitle={`${city?.name || ""} · ${fh.address}`}
                  price={`约 ¥${fh.priceRange}`} tags={fh.services.slice(0, 4)}
                  phone={fh.phone || undefined} href={`/city/${city?.pinyin}/sangzang/binyiguan/${fh.id}`} />
              );
            })}
          </div>
        </section>
      )}

      {results.cemeteries.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">🪦 墓地陵园 ({results.cemeteries.length})</h2>
          <div className="space-y-3">
            {results.cemeteries.map((c) => {
              const city = allCities.find((ct) => ct.id === c.cityId);
              return (
                <InfoCard key={c.id} title={c.name} subtitle={`${city?.name || ""} · ${c.address}`}
                  price={`¥${c.priceMin.toLocaleString()}-${c.priceMax.toLocaleString()}`} tags={c.plotTypes}
                  phone={c.phone || undefined} href={`/city/${city?.pinyin}/sangzang/mudi/${c.id}`} />
              );
            })}
          </div>
        </section>
      )}

      {total === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🤷</div>
          <p className="text-lg font-semibold text-text-secondary mb-2">未找到相关结果</p>
          <p className="text-sm text-text-secondary/60">试试其他关键词，如城市名、养老院名称等。</p>
        </div>
      )}
    </div>
  );
}
