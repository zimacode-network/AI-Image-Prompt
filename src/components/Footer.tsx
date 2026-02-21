export default function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-20">
      <div className="max-w-[1200px] mx-auto px-8 py-14">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[26px] h-[26px] rounded-md bg-accent-gold/12 flex items-center justify-center border border-accent-gold/20">
                <span className="text-accent-gold text-[11px] font-bold font-display">P</span>
              </div>
              <span className="font-display font-semibold text-[15px] tracking-tight text-text-primary">
                Prompt<span className="text-accent-gold-soft">Studio</span>
              </span>
            </div>
            <p className="text-text-muted text-[13px] leading-[1.8] tracking-wide">
              AI 绘画提示词工具站 — 精选高质量提示词，中英双语，选词即出图。
            </p>
          </div>

          <div className="flex gap-20 text-[13px]">
            <div>
              <h4 className="font-body font-medium text-text-secondary mb-4 text-[12px] tracking-widest uppercase">浏览</h4>
              <ul className="space-y-2.5 text-text-muted">
                <li><a href="/explore" className="hover:text-accent-gold transition-colors duration-200">探索提示词</a></li>
                <li><a href="/explore?style=anime" className="hover:text-accent-gold transition-colors duration-200">动漫风格</a></li>
                <li><a href="/explore?style=realistic" className="hover:text-accent-gold transition-colors duration-200">写实摄影</a></li>
                <li><a href="/explore?style=cyberpunk" className="hover:text-accent-gold transition-colors duration-200">赛博朋克</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-body font-medium text-text-secondary mb-4 text-[12px] tracking-widest uppercase">关于</h4>
              <ul className="space-y-2.5 text-text-muted">
                <li>
                  <a
                    href="https://github.com/xiaoYuan928/AI-Image-Prompt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-gold transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border-subtle flex justify-between items-center text-[11px] text-text-dim tracking-wider">
          <span>&copy; {new Date().getFullYear()} PromptStudio</span>
          <span>Made with care for AI artists</span>
        </div>
      </div>
    </footer>
  );
}
