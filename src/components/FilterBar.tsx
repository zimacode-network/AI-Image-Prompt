"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { STYLE_LABELS, SCENE_LABELS, MODEL_LABELS } from "@/lib/types";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeStyle = searchParams.get("style") || "";
  const activeScene = searchParams.get("scene") || "";
  const activeModel = searchParams.get("model") || "";

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/explore?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.push("/explore", { scroll: false });
  }

  const hasFilters = activeStyle || activeScene || activeModel;

  return (
    <div className="space-y-5">
      {/* Style filters */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-display font-medium text-text-muted uppercase tracking-widest">
            风格 Style
          </h3>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-[11px] text-accent-amber hover:underline"
            >
              清除筛选
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(STYLE_LABELS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setFilter("style", key)}
              className={`tag-chip ${activeStyle === key ? "active" : ""}`}
            >
              <span className="mr-1">{val.icon}</span>
              {val.zh}
            </button>
          ))}
        </div>
      </div>

      {/* Scene filters */}
      <div>
        <h3 className="text-xs font-display font-medium text-text-muted uppercase tracking-widest mb-2.5">
          场景 Scene
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SCENE_LABELS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setFilter("scene", key)}
              className={`tag-chip ${activeScene === key ? "active" : ""}`}
            >
              <span className="mr-1">{val.icon}</span>
              {val.zh}
            </button>
          ))}
        </div>
      </div>

      {/* Model filters */}
      <div>
        <h3 className="text-xs font-display font-medium text-text-muted uppercase tracking-widest mb-2.5">
          模型 Model
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(MODEL_LABELS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setFilter("model", key)}
              className={`tag-chip ${activeModel === key ? "active" : ""}`}
              style={
                activeModel === key
                  ? { borderColor: val.color, color: val.color, background: `${val.color}15` }
                  : {}
              }
            >
              {val.en}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
