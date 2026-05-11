import Link from "next/link";

interface InfoCardProps {
  title: string;
  subtitle?: string;
  tags?: string[];
  price?: string;
  href: string;
  rating?: number;
  description?: string;
}

export default function InfoCard({ title, subtitle, tags, price, href, rating, description }: InfoCardProps) {
  return (
    <Link href={href} className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-[#1a5f4a]/30 transition-all">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5 truncate">{subtitle}</p>}
          {description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="text-right shrink-0">
          {price && <div className="text-sm font-bold text-[#f0a261]">{price}</div>}
          {rating !== undefined && (
            <div className="text-xs text-yellow-600 mt-1">⭐ {rating.toFixed(1)}</div>
          )}
        </div>
      </div>
    </Link>
  );
}
