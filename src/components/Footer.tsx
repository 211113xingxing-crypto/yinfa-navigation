export default function Footer() {
  return (
    <footer className="bg-sage-800 text-sage-200 mt-auto">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🌿</span> 银发指南
            </h3>
            <p className="text-sm text-sage-300 leading-relaxed">
              帮您一站式查询全国养老院、殡仪馆、墓地信息。为父母养老解难，为家人善后分忧。
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">快速导航</h4>
            <div className="space-y-2 text-sm">
              <p>🏥 养老机构查询</p>
              <p>🕯️ 殡葬服务查询</p>
              <p>🪦 墓地陵园查询</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">免责声明</h4>
            <p className="text-xs text-sage-400 leading-relaxed">
              本站信息仅供参考，请以实际机构公示为准。如有信息错误，欢迎联系我们反馈更正。
            </p>
          </div>
        </div>
        <div className="border-t border-sage-700 pt-6 text-center text-xs text-sage-400">
          © 2026 银发指南 navi-resources.com
        </div>
      </div>
    </footer>
  );
}
