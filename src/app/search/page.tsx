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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">搜索</h1>
        <form className="flex gap-2 max-w-md">
          <input name="q" type="text" placeholder="输入关键词..." className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/30" />
          <button type="submit" className="bg-[#1a5f4a] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2d8a6e]">搜索</button>
        </form>
      </div>
    );
  }
  const results = searchAll(q);
  const total = results.cities.length + results.nursingHomes.length + results.funeralHomes.length + results.cemeteries.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <form className="flex gap-2 mb-6 max-w-md">
        <input name="q" type="text" defaultValue={q} placeholder="输入关键词..." className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/30" />
        <button type="submit" className="bg-[#1a5f4a] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2d8a6e]">搜索</button>
      </form>
      <p className="text-sm text-gray-500 mb-4">搜索 &quot;{q}&quot;，共 {total} 个结果</p>

      {results.cities.length > 0 && (
        <section className="mb-6"><h2 className="text-sm font-semibold text-gray-500 mb-2">城市</h2>
          <div className="flex flex-wrap gap-2">{results.cities.map((c) => <Link key={c.id} href={`/city/${c.pinyin}`} className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:border-[#1a5f4a]/30">{c.name} · {c.province}</Link>)}</div>
        </section>
      )}
      {results.nursingHomes.length > 0 && (
        <section className="mb-6"><h2 className="text-sm font-semibold text-gray-500 mb-2">养老机构</h2>
          <div className="space-y-2">{results.nursingHomes.map((h) => { const city = allCities.find((c) => c.id === h.cityId);
            return <InfoCard key={h.id} title={h.name} subtitle={`${city?.name || ""} · ${h.address}`} price={`¥${h.priceMin}-${h.priceMax}/月`} tags={[h.type, h.acceptsDisabled ? "接收失能" : ""].filter(Boolean)} rating={h.rating} href={`/city/${city?.pinyin}/yanglao/${h.id}`} />;
          })}</div>
        </section>
      )}
      {results.funeralHomes.length > 0 && (
        <section className="mb-6"><h2 className="text-sm font-semibold text-gray-500 mb-2">殡仪馆</h2>
          <div className="space-y-2">{results.funeralHomes.map((fh) => { const city = allCities.find((c) => c.id === fh.cityId);
            return <InfoCard key={fh.id} title={fh.name} subtitle={`${city?.name || ""} · ${fh.address}`} price={`¥${fh.priceRange}`} tags={fh.services.slice(0, 3)} href={`/city/${city?.pinyin}/sangzang/binyiguan/${fh.id}`} />;
          })}</div>
        </section>
      )}
      {results.cemeteries.length > 0 && (
        <section className="mb-6"><h2 className="text-sm font-semibold text-gray-500 mb-2">墓地/陵园</h2>
          <div className="space-y-2">{results.cemeteries.map((c) => { const city = allCities.find((ct) => ct.id === c.cityId);
            return <InfoCard key={c.id} title={c.name} subtitle={`${city?.name || ""} · ${c.address}`} price={`¥${c.priceMin.toLocaleString()}-${c.priceMax.toLocaleString()}`} tags={c.plotTypes} href={`/city/${city?.pinyin}/sangzang/mudi/${c.id}`} />;
          })}</div>
        </section>
      )}
      {total === 0 && <div className="text-center py-12 text-gray-400"><p className="text-lg mb-2">未找到相关结果</p><p className="text-sm">试试其他关键词。</p></div>}
    </div>
  );
}
