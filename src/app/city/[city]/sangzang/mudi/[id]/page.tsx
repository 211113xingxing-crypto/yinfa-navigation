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
  return { title: `${c.name} - ${city.name}墓地 - 银发指南`, description: c.description || `${c.name}位于${c.address}` };
}

export default async function CemeteryDetailPage({ params }: Props) {
  const { city: pinyin, id } = await params;
  const c = getCemeteryById(parseInt(id));
  const city = getCityByPinyin(pinyin);
  if (!c || !city) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href={`/city/${pinyin}`} className="text-sm text-gray-400 hover:text-[#1a5f4a] mb-4 inline-block">← 返回{city.name}</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{c.name}</h1>
      {c.description && <p className="text-gray-600 mb-6 leading-relaxed">{c.description}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <InfoItem label="价格区间" value={`¥${c.priceMin.toLocaleString()} - ¥${c.priceMax.toLocaleString()}`} highlight />
        <InfoItem label="联系电话" value={c.phone || "暂无"} />
        <InfoItem label="地址" value={c.address} />
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-2">🪦 墓型选择</h2>
        <div className="flex flex-wrap gap-2">
          {c.plotTypes.map((t) => <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return <div className="bg-white border border-gray-200 rounded-lg p-3"><div className="text-xs text-gray-400 mb-1">{label}</div><div className={`text-sm font-medium ${highlight ? "text-[#f0a261]" : "text-gray-900"}`}>{value}</div></div>;
}
