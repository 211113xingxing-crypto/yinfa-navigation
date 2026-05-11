import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#1a5f4a] hover:text-[#2d8a6e]">
          银发指南
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-gray-600 hover:text-[#1a5f4a]">首页</Link>
          <Link href="/search" className="text-gray-600 hover:text-[#1a5f4a]">搜索</Link>
        </nav>
      </div>
    </header>
  );
}
