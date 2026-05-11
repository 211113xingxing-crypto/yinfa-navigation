import Link from "next/link";
import { cities } from "@/lib/data";

const cityColors: Record<string, string> = {
  "上海": "bg-red-500", "北京": "bg-amber-600", "广州": "bg-emerald-500",
  "成都": "bg-teal-500", "杭州": "bg-cyan-500", "武汉": "bg-blue-500",
  "重庆": "bg-purple-500", "南京": "bg-rose-500", "天津": "bg-indigo-500",
  "沈阳": "bg-slate-600",
};

const hot = cities.filter(c => ["上海","北京","广州","成都","杭州","武汉"].includes(c.name));

export default function HomePage() {
  return (
    <div style={{width:"100%", maxWidth:"56rem", margin:"0 auto", padding:"2.5rem 1rem", minHeight:"100vh"}}>
      {/* Logo + Title */}
      <div style={{textAlign:"center", marginBottom:"2.5rem"}}>
        <h1 style={{fontSize:"1.875rem", fontWeight:700, color:"#31402c", marginBottom:"0.25rem"}}>银发指南</h1>
        <p style={{fontSize:"0.875rem", color:"#7a7265"}}>养老 · 殡葬 · 墓地 信息查询</p>
      </div>

      {/* Search */}
      <form action="/search" style={{marginBottom:"2.5rem", maxWidth:"36rem", marginLeft:"auto", marginRight:"auto"}}>
        <div style={{display:"flex", background:"#fff", borderRadius:"0.75rem", border:"1px solid #e3e1dc", overflow:"hidden", boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
          <input name="q" type="text" placeholder="搜索城市或服务名称..."
            style={{flex:1, padding:"0.875rem 1.25rem", border:"none", outline:"none", fontSize:"0.875rem", background:"transparent"}} />
          <button type="submit" style={{background:"#4a6342", color:"#fff", padding:"0.875rem 1.5rem", border:"none", fontSize:"0.875rem", fontWeight:600, cursor:"pointer"}}>搜索</button>
        </div>
      </form>

      {/* Hot cities */}
      <h2 style={{fontSize:"0.875rem", fontWeight:600, color:"#7a7265", marginBottom:"0.75rem"}}>🔥 热门城市</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"0.625rem", marginBottom:"2.5rem"}}>
        {hot.map(c => (
          <Link key={c.id} href={`/city/${c.pinyin}`}
            style={{
              background: getColor(c.name), color:"#fff", borderRadius:"0.75rem",
              padding:"1.25rem 1rem", textAlign:"center", fontWeight:600, fontSize:"0.875rem",
              textDecoration:"none", display:"block", transition:"all 0.2s"
            }}>
            {c.name}
          </Link>
        ))}
      </div>

      {/* All cities */}
      <h2 style={{fontSize:"0.875rem", fontWeight:600, color:"#7a7265", marginBottom:"0.75rem"}}>📍 全部城市</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"0.625rem", marginBottom:"2.5rem"}}>
        {cities.map(c => (
          <Link key={c.id} href={`/city/${c.pinyin}`}
            style={{
              background:"#fff", border:"1px solid #e3e1dc", borderRadius:"0.75rem",
              padding:"0.875rem 1rem", textAlign:"center", fontSize:"0.875rem", fontWeight:500,
              color:"#2d2a26", textDecoration:"none", display:"block", transition:"all 0.2s"
            }}>
            {c.name}
          </Link>
        ))}
      </div>

      {/* Tags */}
      <h2 style={{fontSize:"0.875rem", fontWeight:600, color:"#7a7265", marginBottom:"0.75rem"}}>📂 快捷查询</h2>
      <div style={{display:"flex", flexWrap:"wrap", gap:"0.625rem", marginBottom:"2rem"}}>
        {[
          {label:"🏥 养老院", q:"养老院", bg:"#e3e9df", color:"#4a6342"},
          {label:"🕯️ 殡仪馆", q:"殡仪馆", bg:"#f9eddb", color:"#c98935"},
          {label:"🪦 墓地", q:"墓地", bg:"#f9eddb", color:"#c98935"},
          {label:"💊 护理院", q:"护理院", bg:"#e3e9df", color:"#4a6342"},
          {label:"📋 白事一条龙", q:"一条龙", bg:"#f9eddb", color:"#c98935"},
          {label:"💰 价格对比", q:"价格", bg:"#e3e9df", color:"#4a6342"},
        ].map(t => (
          <Link key={t.q} href={`/search?q=${t.q}`}
            style={{background:t.bg, color:t.color, padding:"0.5rem 1rem", borderRadius:"9999px", fontSize:"0.875rem", fontWeight:500, textDecoration:"none", display:"inline-block"}}>
            {t.label}
          </Link>
        ))}
      </div>

      <p style={{textAlign:"center", fontSize:"0.75rem", color:"rgba(122,114,101,0.5)"}}>
        navi-resources.com · 信息仅供参考
      </p>
    </div>
  );
}

function getColor(name: string): string {
  const m: Record<string,string> = {
    "上海":"#ef4444","北京":"#d97706","广州":"#10b981",
    "成都":"#14b8a6","杭州":"#06b6d4","武汉":"#3b82f6",
    "重庆":"#8b5cf6","南京":"#f43f5e","天津":"#6366f1",
    "沈阳":"#475569",
  };
  return m[name] || "#5f7d54";
}
