import { notFound } from "next/navigation";
import { getCityByPinyin, getNursingHomesByCity, getFuneralHomesByCity, getCemeteriesByCity } from "@/lib/data";
import InfoCard from "@/components/InfoCard";
import Link from "next/link";
import { Metadata } from "next";
import { cities } from "@/lib/data";

interface Props { params: Promise<{ city: string }>; }

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.pinyin }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: pinyin } = await params;
  const city = getCityByPinyin(pinyin);
  if (!city) return { title: "城市未找到" };
  return {
    title: `${city.name}养老院、殡仪馆、墓地信息查询 - 银发指南`,
    description: `查询${city.name}市所有养老机构、殡仪馆、公墓陵园的详细信息，包括价格、地址、电话等。人工核实，信息可靠。`,
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
      {/* Hero banner */}
      <div className="bg-gradient-to-b from-sage-700 to-sage-800 text-white">
        <div className="max-w-5xl mx-auto px-5 py-10 md:py-14">
          <Link href="/" className="text-sage-200 hover:text-white text-sm mb-3 inline-block transition-colors">
            ← 选择其他城市
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{city.name}</h1>
          <div className="flex items-center gap-3 text-sage-200 text-sm">
            <span>{city.province}</span>
            <span>·</span>
            <span>{city.tier}</span>
            <span>·</span>
            <span>收录 {nursingHomes.length + funeralHomes.length + cemeteryList.length} 个服务机构</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Quick links */}
        <div className="flex flex-wrap gap-3 mb-10">
          {nursingHomes.length > 0 && (
            <a href="#nursing" className="flex items-center gap-2 bg-sage-50 text-sage-700 border border-sage-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-sage-100 transition-colors">
              🏥 养老机构 ({nursingHomes.length})
            </a>
          )}
          {funeralHomes.length > 0 && (
            <a href="#funeral" className="flex items-center gap-2 bg-warm-50 text-warm-700 border border-warm-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-warm-100 transition-colors">
              🕯️ 殡仪馆 ({funeralHomes.length})
            </a>
          )}
          {cemeteryList.length > 0 && (
            <a href="#cemetery" className="flex items-center gap-2 bg-warm-50 text-warm-700 border border-warm-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-warm-100 transition-colors">
              🪦 墓地陵园 ({cemeteryList.length})
            </a>
          )}
        </div>

        {/* Nursing Homes */}
        {nursingHomes.length > 0 && (
          <section id="nursing" className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center text-lg">🏥</span>
              <div>
                <h2 className="text-xl font-bold text-sage-800">养老机构</h2>
                <p className="text-xs text-text-secondary">共 {nursingHomes.length} 家</p>
              </div>
            </div>
            <div className="space-y-3">
              {nursingHomes.map((home) => (
                <InfoCard
                  key={home.id}
                  title={home.name}
                  subtitle={home.address}
                  price={`¥${home.priceMin} - ${home.priceMax}/月`}
                  badge={home.type}
                  tags={[
                    home.acceptsDisabled ? "接收失能" : "",
                    home.medicalInsurance ? "医保定点" : "",
                    home.bedAvailable ? `空余${home.bedAvailable}床` : "",
                  ].filter(Boolean)}
                  rating={home.rating}
                  description={home.description}
                  phone={home.phone || undefined}
                  href={`/city/${city.pinyin}/yanglao/${home.id}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* Funeral Homes */}
        {funeralHomes.length > 0 && (
          <section id="funeral" className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-lg bg-warm-100 flex items-center justify-center text-lg">🕯️</span>
              <div>
                <h2 className="text-xl font-bold text-warm-700">殡仪馆</h2>
                <p className="text-xs text-text-secondary">共 {funeralHomes.length} 家</p>
              </div>
            </div>
            <div className="space-y-3">
              {funeralHomes.map((fh) => (
                <InfoCard
                  key={fh.id}
                  title={fh.name}
                  subtitle={fh.address}
                  price={fh.priceRange ? `约 ¥${fh.priceRange}` : undefined}
                  tags={fh.services.slice(0, 4)}
                  description={fh.description}
                  phone={fh.phone || undefined}
                  href={`/city/${city.pinyin}/sangzang/binyiguan/${fh.id}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* Cemeteries */}
        {cemeteryList.length > 0 && (
          <section id="cemetery" className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-lg bg-warm-100 flex items-center justify-center text-lg">🪦</span>
              <div>
                <h2 className="text-xl font-bold text-warm-700">墓地陵园</h2>
                <p className="text-xs text-text-secondary">共 {cemeteryList.length} 处</p>
              </div>
            </div>
            <div className="space-y-3">
              {cemeteryList.map((c) => (
                <InfoCard
                  key={c.id}
                  title={c.name}
                  subtitle={c.address}
                  price={`¥${c.priceMin.toLocaleString()} - ¥${c.priceMax.toLocaleString()}`}
                  tags={c.plotTypes}
                  description={c.description}
                  phone={c.phone || undefined}
                  href={`/city/${city.pinyin}/sangzang/mudi/${c.id}`}
                />
              ))}
            </div>
          </section>
        )}

        {nursingHomes.length === 0 && funeralHomes.length === 0 && cemeteryList.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-xl font-semibold text-text-secondary mb-2">暂无数据</p>
            <p className="text-sm text-text-secondary/60">我们正在努力收录该城市的信息，敬请期待。</p>
          </div>
        )}
      </div>
    </div>
  );
}
