import { notFound } from "next/navigation";
import { getCityByPinyin, getCemeteryById } from "@/lib/data";
import Link from "next/link";
import { Metadata } from "next";

interface Props { params: Promise<{ city: string; id: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: pinyin, id } = await params;
  const c = getCemeteryById(parseInt(id));
  const city = getCityByPinyin(pinyin);
  if (!c || !city) return { title: "未找到" };
  return { title: `${c.name} - ${city.name}墓地陵园 | ¥${c.priceMin.toLocaleString()}-${c.priceMax.toLocaleString()} - 银发指南`, description: c.description || `${c.name}位于${c.address}，墓型包括${c.plotTypes.join("、")}。` };
}

export default async function CemeteryDetailPage({ params }: Props) {
  const { city: pinyin, id } = await params;
  const c = getCemeteryById(parseInt(id));
  const city = getCityByPinyin(pinyin);
  if (!c || !city) notFound();

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <nav className="flex items-center gap-2 text-sm text-text-secondary/60 mb-6">
        <Link href="/" className="hover:text-sage-600 transition-colors">首页</Link>
        <span>/</span>
        <Link href={`/city/${pinyin}`} className="hover:text-sage-600 transition-colors">{city.name}</Link>
        <span>/</span>
        <span className="text-text">墓地陵园</span>
      </nav>

      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🪦</span>
              <h1 className="text-2xl md:text-3xl font-bold text-text">{c.name}</h1>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-secondary mb-1">参考价格</div>
            <div className="text-2xl md:text-3xl font-bold text-warm-500">
              ¥{c.priceMin.toLocaleString()} - ¥{c.priceMax.toLocaleString()}
            </div>
          </div>
        </div>
        {c.description && (
          <p className="mt-5 pt-5 border-t border-border text-text-secondary leading-relaxed">{c.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <InfoTile label="价格区间" value={`¥${c.priceMin.toLocaleString()} - ¥${c.priceMax.toLocaleString()}`} icon="💰" highlight />
        <InfoTile label="联系电话" value={c.phone || "暂无"} icon="📞" />
        <InfoTile label="地址" value={c.address} icon="📍" />
      </div>

      <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
        <h2 className="font-semibold text-text mb-3 flex items-center gap-2"><span>🪦</span> 可选墓型</h2>
        <div className="flex flex-wrap gap-2">
          {c.plotTypes.map((t) => (
            <span key={t} className="text-sm bg-warm-50 text-warm-700 px-3 py-1.5 rounded-full border border-warm-200">{t}</span>
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
