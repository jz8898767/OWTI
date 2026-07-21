/** 15 个内部人格维度 */
export type Dimension = 'S1' | 'S2' | 'S3' | 'E1' | 'E2' | 'E3' | 'A1' | 'A2' | 'A3' | 'Ac1' | 'Ac2' | 'Ac3' | 'So1' | 'So2' | 'So3';

/** 计分等级：H=3分 M=2分 L=1分 */
export type ScoreLevel = 'H' | 'M' | 'L';

/** 选项 A/B/C 对应 1/2/3 分 */
export type OptionKey = 'A' | 'B' | 'C';

/** 一道测试题 */
export interface Question {
  id: number;
  text: string;
  dimension: Dimension;   // 内部维度，不展示给用户
  options: {
    A: string;
    B: string;
    C: string;
  };
}

/** 一个英雄的人格数据 */
export interface HeroProfile {
  id: number;
  name: string;           // 英雄名
  pronoun: string;        // 人格代词
  slogan: string;         // 口头禅
  scores: number[];       // 15 维得分向量 (1/2/3)
  description: {
    me: string;           // 🟢 我的样子
    others: string;       // 🟡 别人眼中的我
    weakness: string;     // 🔴 我的死穴
  };
}

/** 测试状态 */
export type TestPhase = 'start' | 'testing' | 'result';

/** 用户答案记录 */
export type UserAnswers = Record<number, OptionKey>;
