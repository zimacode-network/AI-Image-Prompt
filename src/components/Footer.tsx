export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border-default bg-bg-card">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + description */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-2xl text-primary">flare</span>
              <span className="text-lg font-bold tracking-tight text-text-primary">
                Prompt<span className="text-primary">Studio</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              AI 绘画提示词工具站 — 精选高质量提示词，中英双语，选词即出图。为下一代视觉创作者打造。
            </p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-primary">
              浏览
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-text-muted">
              <li>
                <a href="/explore" className="hover:text-primary transition-colors">
                  探索提示词
                </a>
              </li>
              <li>
                <a href="/explore?style=anime" className="hover:text-primary transition-colors">
                  动漫风格
                </a>
              </li>
              <li>
                <a href="/explore?style=realistic" className="hover:text-primary transition-colors">
                  写实摄影
                </a>
              </li>
              <li>
                <a href="/models" className="hover:text-primary transition-colors">
                  模型排行
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-primary">
              社区
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-text-muted">
              <li>
                <a
                  href="https://github.com/xiaoYuan928/AI-Image-Prompt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="/models" className="hover:text-primary transition-colors">
                  AI 模型
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-primary">
              保持灵感
            </h4>
            <p className="text-xs text-text-muted mb-4">
              加入创作者社区，获取每周精选提示词推荐。
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="输入邮箱地址"
                className="flex-1 rounded-xl border border-border-default bg-bg-surface px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
              />
              <button className="shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-hover transition-colors">
                订阅
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border-default flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-text-muted">
            &copy; {new Date().getFullYear()} PromptStudio. 保留所有权利。
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">alternate_email</span>
            </a>
            <a
              href="https://github.com/xiaoYuan928/AI-Image-Prompt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
