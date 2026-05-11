import { notFound } from "next/navigation";
import { getCityByPinyin, getNursingHomeById } from "@/lib/data";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ city: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: pinyin, id } = await params;
  const home = getNursingHomeById(parseInt(id));
  const city = getCityByPinyin(pinyin);
  if (!home || !city) return { title: "未找到" };
  return {
    title: `${home.name} - ${city.name}养老院 - 银发指南`,
    description: home.description || `${home.name}位于${home.address}，价格¥${home.priceMin}-${home.priceMax}/月`,
  };
}

export default async function NursingHomeDetailPage({ params }: Props) {
  const { city: pinyin, id } = await params;
  const home = getNursingHomeById(parseInt(id));
  const city = getCityByPinyin(pinyin);
  if (!home || !city) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href={`/city/${pinyin}`} className="text-sm text-gray-400 hover:text-[#1a5f4a] mb-4 inline-block">
        ← 返回{city.name}
      </Link>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{home.name}</h1>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-500 text-sm">⭐ {home.rating.toFixed(1)}</span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{home.type}</span>
      </div>

      {home.description && (
        <p className="text-gray-600 mb-6 leading-relaxed">{home.description}</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <InfoItem label="价格" value={`¥${home.priceMin} - ¥${home.priceMax}/月`} highlight />
        <InfoItem label="床位总数" value={`${home.bedCount}张`} />
        <InfoItem label="空余床位" value={home.bedAvailable ? `${home.bedAvailable}张` : "暂无"} />
        <InfoItem label="接收失能" value={home.acceptsDisabled ? "✅ 是" : "❌ 否"} />
        <InfoItem label="医保定点" value={home.medicalInsurance ? "✅ 是" : "❌ 否"} />
        <InfoItem label="联系电话" value={home.phone || "暂无"} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="font-semibold mb-2">📍 地址</h2>
        <p className="text-gray-600">{home.address}</p>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
        信息有误？<Link href="/" className="text-[#1a5f4a] underline">联系我们反馈</Link>
      </div>
    </div>
  );
}

function InfoItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className={`text-sm font-medium ${highlight ? "text-[#f0a261]" : "text-gray-900"}`}>{value}</div>
    </div>
  );
}
