export default function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-md bg-accent-amber/15 flex items-center justify-center border border-accent-amber/30">
                <span className="text-accent-amber text-xs font-bold font-display">P</span>
              </div>
              <span className="font-display font-semibold tracking-tight text-text-primary">
                Prompt<span className="text-accent-amber">Studio</span>
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-xs leading-relaxed">
              AI 绘画提示词工具站 — 精选高质量提示词，中英双语，选词即出图。
            </p>
          </div>

          <div className="flex gap-16 text-sm">
            <div>
              <h4 className="font-display font-medium text-text-secondary mb-3">浏览</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="/explore" className="hover:text-accent-amber transition-colors">探索提示词</a></li>
                <li><a href="/explore?style=anime" className="hover:text-accent-amber transition-colors">动漫风格</a></li>
                <li><a href="/explore?style=realistic" className="hover:text-accent-amber transition-colors">写实摄影</a></li>
                <li><a href="/explore?style=cyberpunk" className="hover:text-accent-amber transition-colors">赛博朋克</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-medium text-text-secondary mb-3">关于</h4>
              <ul className="space-y-2 text-text-muted">
                <li>
                  <a
                    href="https://github.com/xiaoYuan928/AI-Image-Prompt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-amber transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border-subtle flex justify-between items-center text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} PromptStudio</span>
          <span>Made with care for AI artists</span>
        </div>
      </div>
    </footer>
  );
}
