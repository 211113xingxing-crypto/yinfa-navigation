import { notFound } from "next/navigation";
import { getCityByPinyin, getFuneralHomeById } from "@/lib/data";
import Link from "next/link";
import { Metadata } from "next";

interface Props { params: Promise<{ city: string; id: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: pinyin, id } = await params;
  const fh = getFuneralHomeById(parseInt(id));
  const city = getCityByPinyin(pinyin);
  if (!fh || !city) return { title: "未找到" };
  return { title: `${fh.name} - ${city.name}殡仪馆 - 银发指南`, description: fh.description || `${fh.name}位于${fh.address}，服务项目包括${fh.services.join("、")}。` };
}

export default async function FuneralHomeDetailPage({ params }: Props) {
  const { city: pinyin, id } = await params;
  const fh = getFuneralHomeById(parseInt(id));
  const city = getCityByPinyin(pinyin);
  if (!fh || !city) notFound();

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <nav className="flex items-center gap-2 text-sm text-text-secondary/60 mb-6">
        <Link href="/" className="hover:text-sage-600 transition-colors">首页</Link>
        <span>/</span>
        <Link href={`/city/${pinyin}`} className="hover:text-sage-600 transition-colors">{city.name}</Link>
        <span>/</span>
        <span className="text-text">殡仪馆</span>
      </nav>

      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🕯️</span>
              <h1 className="text-2xl md:text-3xl font-bold text-text">{fh.name}</h1>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-secondary mb-1">参考价格区间</div>
            <div className="text-2xl md:text-3xl font-bold text-warm-500">¥{fh.priceRange}</div>
          </div>
        </div>
        {fh.description && (
          <p className="mt-5 pt-5 border-t border-border text-text-secondary leading-relaxed">{fh.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <InfoTile label="价格区间" value={`¥${fh.priceRange}`} icon="💰" highlight />
        <InfoTile label="联系电话" value={fh.phone || "暂无"} icon="📞" />
        <InfoTile label="地址" value={fh.address} icon="📍" />
      </div>

      <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
        <h2 className="font-semibold text-text mb-3 flex items-center gap-2"><span>🛠️</span> 服务项目</h2>
        <div className="flex flex-wrap gap-2">
          {fh.services.map((s) => (
            <span key={s} className="text-sm bg-sage-50 text-sage-700 px-3 py-1.5 rounded-full border border-sage-100">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoTile({ label, value, icon, highlight }: { label: string; value: string; icon: string; highlight?: boolean }) {
  return (
    <div className={`bg-surface border rounded-xl p-4 ${highlight ? "border-warm-200 bg-warm-50/30" : "border-border"}`}>
      <div className="flex items-center gap-2 mb-1.5"><span className="text-base">{icon}</span><span className="text-xs text-text-secondary">{label}</span></div>
      <div className={`text-sm font-semibold ${highlight ? "text-warm-700" : "text-text"}`}>{value}</div>
    </div>
  );
}
