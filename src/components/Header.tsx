import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-warm-50/90 border-b border-warm-100">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl">🌿</span>
          <span className="text-xl font-bold text-sage-700 tracking-wide group-hover:text-sage-600 transition-colors">
            银发指南
          </span>
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link href="/" className="text-text-secondary hover:text-sage-600 font-medium transition-colors">
            首页
          </Link>
          <Link href="/search" className="text-text-secondary hover:text-sage-600 font-medium transition-colors">
            🔍 搜索
          </Link>
        </nav>
      </div>
    </header>
  );
}
