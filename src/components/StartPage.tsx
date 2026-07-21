import React from 'react';

interface Props {
  onStart: () => void;
}

const StartPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="start-page">
      <div className="start-logo">🎮</div>
      <h1 className="start-title">OWTI</h1>
      <p className="start-subtitle">守望先锋人格测试</p>
      <p className="start-desc">
        30 道生活场景题 · 3 分钟<br />
        看看你是哪位守望先锋英雄的人格
      </p>
      <div className="start-tags">
        <span>零游戏门槛</span>
        <span>纯娱乐向</span>
        <span>不收藏不收集</span>
      </div>
      <button className="btn-start" onClick={onStart}>
        开始测试
      </button>
      <p className="start-footer">
        效仿 SBTI · 双名法输出 · 仅供娱乐
      </p>
    </div>
  );
};

export default StartPage;
