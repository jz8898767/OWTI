import React, { useRef } from 'react';
import type { HeroProfile } from '../types';

interface Props {
  hero: HeroProfile;
  onRestart: () => void;
}

const ResultCard: React.FC<Props> = ({ hero, onRestart }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    const text = `🎮 我的 OWTI 人格类型：${hero.name} · ${hero.pronoun}\n"${hero.slogan}"\n来测测你对应哪个守望先锋英雄→`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'OWTI 人格测试', text, url: window.location.href });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert('结果已复制到剪贴板，去分享给朋友吧！');
    }
  };

  return (
    <div className="result-card" ref={resultRef}>
      <div className="result-header">
        <p className="result-badge">🎮 你的 OWTI 人格类型</p>
        <h1 className="result-hero">
          <span className="hero-name">{hero.name}</span>
          <span className="hero-sep">·</span>
          <span className="hero-pronoun">{hero.pronoun}</span>
        </h1>
        <blockquote className="result-slogan">{hero.slogan}</blockquote>
      </div>

      <div className="result-sections">
        <div className="result-section section-me">
          <h3>🟢 我的样子</h3>
          <p>{hero.description.me}</p>
        </div>
        <div className="result-section section-others">
          <h3>🟡 别人眼中的我</h3>
          <p>{hero.description.others}</p>
        </div>
        <div className="result-section section-weakness">
          <h3>🔴 我的死穴</h3>
          <p>{hero.description.weakness}</p>
        </div>
      </div>

      <div className="result-actions">
        <button className="btn-share" onClick={handleShare}>
          📸 分享结果
        </button>
        <button className="btn-restart" onClick={onRestart}>
          🔄 重新测试
        </button>
      </div>

      <p className="result-footer">
        📸 长按保存结果图，让你朋友也来测测！<br />
        🔗 不服？分享这个链接看看谁的结果更离谱
      </p>
    </div>
  );
};

export default ResultCard;
