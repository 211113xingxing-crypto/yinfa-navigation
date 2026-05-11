import { notFound } from "next/navigation";
import { getCityByPinyin, getNursingHomeById } from "@/lib/data";
import Link from "next/link";
import { Metadata } from "next";

interface Props { params: Promise<{ city: string; id: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: pinyin, id } = await params;
  const home = getNursingHomeById(parseInt(id));
  const city = getCityByPinyin(pinyin);
  if (!home || !city) return { title: "未找到" };
  return {
    title: `${home.name} - ${city.name}养老院 | 价格¥${home.priceMin}-${home.priceMax}/月 - 银发指南`,
    description: home.description || `${home.name}位于${home.address}，${home.type}机构，${home.bedCount}张床位，价格¥${home.priceMin}-${home.priceMax}/月。`,
  };
}

export default async function NursingHomeDetailPage({ params }: Props) {
  const { city: pinyin, id } = await params;
  const home = getNursingHomeById(parseInt(id));
  const city = getCityByPinyin(pinyin);
  if (!home || !city) notFound();

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary/60 mb-6">
        <Link href="/" className="hover:text-sage-600 transition-colors">首页</Link>
        <span>/</span>
        <Link href={`/city/${pinyin}`} className="hover:text-sage-600 transition-colors">{city.name}</Link>
        <span>/</span>
        <span className="text-text">养老机构</span>
      </nav>

      {/* Header */}
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏥</span>
              <h1 className="text-2xl md:text-3xl font-bold text-text">{home.name}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-xs bg-sage-50 text-sage-700 px-3 py-1 rounded-full font-medium border border-sage-200">
                {home.type}
              </span>
              {home.rating > 0 && (
                <span className="flex items-center gap-1 text-yellow-500 text-sm">
                  <span>★</span>
                  <span className="font-semibold">{home.rating.toFixed(1)}</span>
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-secondary mb-1">参考价格</div>
            <div className="text-2xl md:text-3xl font-bold text-warm-500">
              ¥{home.priceMin.toLocaleString()} - ¥{home.priceMax.toLocaleString()}
              <span className="text-sm font-normal text-text-secondary">/月</span>
            </div>
          </div>
        </div>

        {home.description && (
          <p className="mt-5 pt-5 border-t border-border text-text-secondary leading-relaxed">
            {home.description}
          </p>
        )}
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <InfoTile label="床位总数" value={`${home.bedCount} 张`} icon="🛏️" />
        <InfoTile
          label="空余床位"
          value={home.bedAvailable ? `${home.bedAvailable} 张` : "暂无"}
          icon="🏷️"
          highlight={!!home.bedAvailable}
        />
        <InfoTile label="接收失能老人" value={home.acceptsDisabled ? "✅ 可以" : "❌ 不可"} icon="♿" />
        <InfoTile label="医保定点" value={home.medicalInsurance ? "✅ 是" : "❌ 否"} icon="🏥" />
        <InfoTile label="联系电话" value={home.phone || "暂无"} icon="📞" highlight />
        <InfoTile label="机构类型" value={home.type || "未知"} icon="🏛️" />
      </div>

      {/* Address */}
      <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">📍</span>
          <div>
            <h3 className="font-semibold text-text mb-1">机构地址</h3>
            <p className="text-sm text-text-secondary">{home.address}</p>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="text-center py-6">
        <p className="text-sm text-text-secondary/60">
          信息有误？<Link href="/" className="text-sage-600 underline underline-offset-2 hover:text-sage-700">联系我们反馈</Link>
        </p>
      </div>
    </div>
  );
}

function InfoTile({ label, value, icon, highlight }: { label: string; value: string; icon: string; highlight?: boolean }) {
  return (
    <div className={`bg-surface border rounded-xl p-4 ${highlight ? "border-warm-200 bg-warm-50/30" : "border-border"}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-base">{icon}</span>
        <span className="text-xs text-text-secondary">{label}</span>
      </div>
      <div className={`text-sm font-semibold ${highlight ? "text-warm-700" : "text-text"}`}>
        {value}
      </div>
    </div>
  );
}
