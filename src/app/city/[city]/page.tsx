import { notFound } from "next/navigation";
import { getCityByPinyin, getNursingHomesByCity, getFuneralHomesByCity, getCemeteriesByCity } from "@/lib/data";
import InfoCard from "@/components/InfoCard";
import { Metadata } from "next";
import { cities } from "@/lib/data";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.pinyin }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: pinyin } = await params;
  const city = getCityByPinyin(pinyin);
  if (!city) return { title: "城市未找到" };
  return {
    title: `${city.name}养老院、殡仪馆、墓地信息 - 银发指南`,
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
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{city.name}</h1>
      <p className="text-sm text-gray-500 mb-6">{city.province} · {city.tier}</p>

      {/* 养老服务 */}
      {nursingHomes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">🏥 养老机构 ({nursingHomes.length})</h2>
          <div className="space-y-3">
            {nursingHomes.map((home) => (
              <InfoCard
                key={home.id}
                title={home.name}
                subtitle={home.address}
                price={`¥${home.priceMin}-${home.priceMax}/月`}
                tags={[
                  home.type,
                  home.acceptsDisabled ? "接收失能" : "",
                  home.medicalInsurance ? "医保定点" : "",
                  home.bedAvailable ? `空余${home.bedAvailable}床` : "",
                ].filter(Boolean)}
                rating={home.rating}
                description={home.description}
                href={`/city/${city.pinyin}/yanglao/${home.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* 殡仪馆 */}
      {funeralHomes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">🕯️ 殡仪馆 ({funeralHomes.length})</h2>
          <div className="space-y-3">
            {funeralHomes.map((fh) => (
              <InfoCard
                key={fh.id}
                title={fh.name}
                subtitle={fh.address}
                price={fh.priceRange ? `¥${fh.priceRange}` : undefined}
                tags={[...fh.services.slice(0, 4), fh.phone ? `☎ ${fh.phone}` : ""].filter(Boolean)}
                href={`/city/${city.pinyin}/sangzang/binyiguan/${fh.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* 墓地/陵园 */}
      {cemeteryList.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">🪦 墓地/陵园 ({cemeteryList.length})</h2>
          <div className="space-y-3">
            {cemeteryList.map((c) => (
              <InfoCard
                key={c.id}
                title={c.name}
                subtitle={c.address}
                price={`¥${c.priceMin.toLocaleString()}-${c.priceMax.toLocaleString()}`}
                tags={c.plotTypes}
                description={c.description}
                href={`/city/${city.pinyin}/sangzang/mudi/${c.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {nursingHomes.length === 0 && funeralHomes.length === 0 && cemeteryList.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">暂无数据</p>
          <p className="text-sm">我们正在努力收录该城市的信息，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
