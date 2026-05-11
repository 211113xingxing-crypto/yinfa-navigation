import { searchAll, cities as allCities } from "@/lib/data";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "搜索 - 银发指南" };
interface Props { searchParams: Promise<{ q?: string }>; }

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  if (!q) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-20 text-center">
        <span className="text-5xl block mb-4">🔍</span>
        <h1 className="text-2xl font-bold text-text mb-4">搜索养老、殡葬服务</h1>
        <form className="max-w-lg mx-auto">
          <div className="flex bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="flex-1 flex items-center px-4">
              <span className="text-lg mr-2 shrink-0">🔍</span>
              <input name="q" type="text" placeholder="输入城市名、机构名称..." className="w-full py-3 text-text bg-transparent placeholder:text-text-secondary/40 text-sm focus:outline-none" />
            </div>
            <button type="submit" className="bg-sage-700 text-white px-6 py-3 text-sm font-semibold hover:bg-sage-600 transition-colors">搜索</button>
          </div>
        </form>
      </div>
    );
  }

  const results = searchAll(q);
  const total = results.cities.length + results.nursingHomes.length + results.funeralHomes.length + results.cemeteries.length;

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <form className="mb-8">
        <div className="flex bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="flex-1 flex items-center px-4">
            <span className="text-lg mr-2 shrink-0">🔍</span>
            <input name="q" type="text" defaultValue={q} placeholder="输入关键词..." className="w-full py-3 text-text bg-transparent placeholder:text-text-secondary/40 text-sm focus:outline-none" />
          </div>
          <button type="submit" className="bg-sage-700 text-white px-6 py-3 text-sm font-semibold hover:bg-sage-600 transition-colors">搜索</button>
        </div>
      </form>

      <p className="text-sm text-text-secondary mb-6">搜索 "{q}"，找到 <strong className="text-sage-700">{total}</strong> 个结果</p>

      {results.cities.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">🏙️ 城市</h2>
          <div className="flex flex-wrap gap-2">{results.cities.map((c) => (
            <Link key={c.id} href={`/city/${c.pinyin}`} className="text-sm bg-surface border border-border rounded-xl px-4 py-2.5 hover:border-sage-300 hover:shadow-sm transition-all font-medium">{c.name} <span className="text-text-secondary/50 font-normal">· {c.province}</span></Link>
          ))}</div>
        </section>
      )}

      {results.nursingHomes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">🏥 养老机构</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {results.nursingHomes.map((h) => { const c = allCities.find((x) => x.id === h.cityId);
              return (
                <Link key={h.id} href={`/city/${c?.pinyin}/yanglao/${h.id}`} className="group bg-surface border border-border rounded-xl p-4 hover:shadow-md hover:border-sage-200 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">🏥</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text truncate group-hover:text-sage-700">{h.name}</h3>
                      <p className="text-xs text-text-secondary truncate">{c?.name} · {h.address}</p>
                      <div className="flex items-center justify-between mt-2"><span className="text-sm font-bold text-warm-500">¥{h.priceMin}-{h.priceMax}/月</span>{h.rating > 0 && <span className="text-xs text-yellow-600">★ {h.rating.toFixed(1)}</span>}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {results.funeralHomes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">🕯️ 殡仪馆</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {results.funeralHomes.map((fh) => { const c = allCities.find((x) => x.id === fh.cityId);
              return (
                <Link key={fh.id} href={`/city/${c?.pinyin}/sangzang/binyiguan/${fh.id}`} className="group bg-surface border border-border rounded-xl p-4 hover:shadow-md hover:border-warm-200 transition-all">
                  <div className="flex items-start gap-3"><span className="text-xl shrink-0">🕯️</span>
                    <div className="flex-1 min-w-0"><h3 className="font-semibold text-text truncate group-hover:text-warm-700">{fh.name}</h3>
                      <p className="text-xs text-text-secondary truncate">{c?.name} · {fh.address}</p>
                      <div className="flex items-center justify-between mt-2"><span className="text-sm font-bold text-warm-500">¥{fh.priceRange}</span><span className="text-xs text-text-secondary">{fh.phone}</span></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {results.cemeteries.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">🪦 墓地陵园</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {results.cemeteries.map((cm) => { const c = allCities.find((x) => x.id === cm.cityId);
              return (
                <Link key={cm.id} href={`/city/${c?.pinyin}/sangzang/mudi/${cm.id}`} className="group bg-surface border border-border rounded-xl p-4 hover:shadow-md hover:border-warm-200 transition-all">
                  <div className="flex items-start gap-3"><span className="text-xl shrink-0">🪦</span>
                    <div className="flex-1 min-w-0"><h3 className="font-semibold text-text truncate group-hover:text-warm-700">{cm.name}</h3>
                      <p className="text-xs text-text-secondary truncate">{c?.name} · {cm.address}</p>
                      <div className="flex items-center justify-between mt-2"><span className="text-sm font-bold text-warm-500">¥{cm.priceMin.toLocaleString()}-{cm.priceMax.toLocaleString()}</span></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {total === 0 && (
        <div className="text-center py-16"><span className="text-5xl block mb-4">🤷</span><p className="text-lg font-semibold text-text-secondary mb-2">未找到相关结果</p><p className="text-sm text-text-secondary/60">试试其他关键词。</p></div>
      )}
    </div>
  );
}
