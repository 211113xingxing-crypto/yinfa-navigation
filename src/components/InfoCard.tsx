import Link from "next/link";

interface InfoCardProps {
  icon?: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  price?: string;
  href: string;
  rating?: number;
  description?: string;
  phone?: string;
  badge?: string;
}

export default function InfoCard({ icon, title, subtitle, tags, price, href, rating, description, phone, badge }: InfoCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-surface border border-border rounded-xl p-5 hover:shadow-lg hover:border-warm-200 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center gap-2 mb-1">
            {icon && <span className="text-lg">{icon}</span>}
            <h3 className="font-semibold text-text group-hover:text-sage-600 transition-colors truncate">
              {title}
            </h3>
            {badge && (
              <span className="shrink-0 text-xs bg-warm-100 text-warm-700 px-2 py-0.5 rounded-full font-medium">
                {badge}
              </span>
            )}
          </div>
          
          {/* Subtitle / address */}
          {subtitle && (
            <p className="text-sm text-text-secondary truncate mb-2">{subtitle}</p>
          )}
          
          {/* Description */}
          {description && (
            <p className="text-sm text-text-secondary/80 line-clamp-2 mb-2.5 leading-relaxed">
              {description}
            </p>
          )}
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-sage-50 text-sage-700 px-2.5 py-1 rounded-full border border-sage-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Phone */}
          {phone && (
            <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-1">
              <span>📞</span>
              <span>{phone}</span>
            </div>
          )}
        </div>

        {/* Right side: price + rating */}
        <div className="text-right shrink-0">
          {price && (
            <div className="text-base font-bold text-warm-500 whitespace-nowrap">{price}</div>
          )}
          {rating !== undefined && rating > 0 && (
            <div className="flex items-center justify-end gap-1 mt-1.5">
              <span className="text-yellow-500 text-xs">★</span>
              <span className="text-sm font-semibold text-text">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
