import { notFound } from "next/navigation";
import { getCityByPinyin, getNursingHomesByCity, getFuneralHomesByCity, getCemeteriesByCity } from "@/lib/data";
import Link from "next/link";
import { Metadata } from "next";
import { cities } from "@/lib/data";

interface Props { params: Promise<{ city: string }>; }

export async function generateStaticParams() { return cities.map((c) => ({ city: c.pinyin })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: pinyin } = await params;
  const city = getCityByPinyin(pinyin);
  if (!city) return { title: "城市未找到" };
  return {
    title: `${city.name}养老院、殡仪馆、墓地信息查询 - 银发指南`,
    description: `查询${city.name}市所有养老机构、殡仪馆、公墓陵园的详细信息，包括价格、地址、电话等。`,
  };
}

export default async function CityPage({ params }: Props) {
  const { city: pinyin } = await params;
  const city = getCityByPinyin(pinyin);
  if (!city) notFound();
  const nursingHomes = getNursingHomesByCity(city.id);
  const funeralHomes = getFuneralHomesByCity(city.id);
  const cemeteryList = getCemeteriesByCity(city.id);

  return (
    <div>
      <div className="bg-gradient-to-r from-sage-700 to-sage-800 text-white">
        <div className="max-w-5xl mx-auto px-5 py-10 md:py-14">
          <Link href="/" className="text-sage-200 hover:text-white text-sm mb-3 inline-block transition-colors">← 选择其他城市</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{city.name}</h1>
          <p className="text-sage-200 text-sm">{city.province} · {city.tier} · 收录 {nursingHomes.length + funeralHomes.length + cemeteryList.length} 个机构</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Anchor tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <a href="#nursing" className="px-4 py-2 rounded-full text-sm font-medium bg-sage-50 text-sage-700 border border-sage-100 hover:bg-sage-100 transition-colors">🏥 养老 ({nursingHomes.length})</a>
          <a href="#funeral" className="px-4 py-2 rounded-full text-sm font-medium bg-warm-50 text-warm-700 border border-warm-100 hover:bg-warm-100 transition-colors">🕯️ 殡仪馆 ({funeralHomes.length})</a>
          <a href="#cemetery" className="px-4 py-2 rounded-full text-sm font-medium bg-warm-50 text-warm-700 border border-warm-100 hover:bg-warm-100 transition-colors">🪦 墓地 ({cemeteryList.length})</a>
        </div>

        {/* Nursing Homes grid */}
        {nursingHomes.length > 0 && (
          <section id="nursing" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏥</span>
              <h2 className="text-lg font-bold text-sage-800">养老机构</h2>
              <span className="text-xs text-text-secondary">· {nursingHomes.length}家</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {nursingHomes.map((home) => (
                <Link key={home.id} href={`/city/${city.pinyin}/yanglao/${home.id}`}
                  className="group bg-surface border border-border rounded-xl p-4 hover:shadow-md hover:border-sage-200 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sage-50 flex items-center justify-center text-lg shrink-0 group-hover:bg-sage-100 transition-colors">🏥</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-text truncate group-hover:text-sage-700 transition-colors">{home.name}</h3>
                        {home.type && <span className="text-[10px] bg-sage-50 text-sage-700 px-1.5 py-0.5 rounded shrink-0">{home.type}</span>}
                      </div>
                      <p className="text-xs text-text-secondary truncate mt-0.5">{home.address}</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-sm font-bold text-warm-500">¥{home.priceMin}-{home.priceMax}/月</span>
                        <div className="flex items-center gap-2">
                          {home.bedAvailable ? <span className="text-[10px] text-sage-600 bg-sage-50 px-1.5 py-0.5 rounded">空{home.bedAvailable}床</span> : null}
                          {home.rating > 0 && <span className="text-xs text-yellow-600">★ {home.rating.toFixed(1)}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Funeral Homes grid */}
        {funeralHomes.length > 0 && (
          <section id="funeral" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🕯️</span>
              <h2 className="text-lg font-bold text-warm-700">殡仪馆</h2>
              <span className="text-xs text-text-secondary">· {funeralHomes.length}家</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {funeralHomes.map((fh) => (
                <Link key={fh.id} href={`/city/${city.pinyin}/sangzang/binyiguan/${fh.id}`}
                  className="group bg-surface border border-border rounded-xl p-4 hover:shadow-md hover:border-warm-200 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-warm-50 flex items-center justify-center text-lg shrink-0">🕯️</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text truncate group-hover:text-warm-700 transition-colors">{fh.name}</h3>
                      <p className="text-xs text-text-secondary truncate mt-0.5">{fh.address}</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-sm font-bold text-warm-500">¥{fh.priceRange}</span>
                        <div className="flex gap-1">{fh.services.slice(0, 3).map((s) => <span key={s} className="text-[10px] bg-warm-50 text-warm-700 px-1.5 py-0.5 rounded">{s}</span>)}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cemeteries grid */}
        {cemeteryList.length > 0 && (
          <section id="cemetery" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🪦</span>
              <h2 className="text-lg font-bold text-warm-700">墓地陵园</h2>
              <span className="text-xs text-text-secondary">· {cemeteryList.length}处</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {cemeteryList.map((c) => (
                <Link key={c.id} href={`/city/${city.pinyin}/sangzang/mudi/${c.id}`}
                  className="group bg-surface border border-border rounded-xl p-4 hover:shadow-md hover:border-warm-200 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-warm-50 flex items-center justify-center text-lg shrink-0">🪦</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text truncate group-hover:text-warm-700 transition-colors">{c.name}</h3>
                      <p className="text-xs text-text-secondary truncate mt-0.5">{c.address}</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-sm font-bold text-warm-500">¥{c.priceMin.toLocaleString()}-{c.priceMax.toLocaleString()}</span>
                        <div className="flex gap-1">{c.plotTypes.slice(0, 3).map((t) => <span key={t} className="text-[10px] bg-warm-50 text-warm-700 px-1.5 py-0.5 rounded">{t}</span>)}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {nursingHomes.length === 0 && funeralHomes.length === 0 && cemeteryList.length === 0 && (
          <div className="text-center py-20 text-text-secondary">
            <span className="text-5xl block mb-4">📋</span>
            <p className="text-lg font-semibold mb-2">暂无数据</p>
            <p className="text-sm">我们正在努力收录该城市的信息，敬请期待。</p>
          </div>
        )}
      </div>
    </div>
  );
}
