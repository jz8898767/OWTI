import type { UserAnswers, HeroProfile, Dimension } from '../types';
import { questions } from '../data/questions';
import { heroes } from '../data/heroes';

/** 维度顺序 */
const DIMENSION_ORDER: Dimension[] = ['S1','S2','S3','E1','E2','E3','A1','A2','A3','Ac1','Ac2','Ac3','So1','So2','So3'];

/** 选项分数映射 */
const OPTION_SCORE: Record<string, number> = { A: 1, B: 2, C: 3 };

/**
 * 根据用户答案计算 15 维得分向量
 */
export function calculateDimensionScores(answers: UserAnswers): number[] {
  const scores: Record<Dimension, number> = {
    S1: 0, S2: 0, S3: 0,
    E1: 0, E2: 0, E3: 0,
    A1: 0, A2: 0, A3: 0,
    Ac1: 0, Ac2: 0, Ac3: 0,
    So1: 0, So2: 0, So3: 0,
  };

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer) {
      scores[q.dimension] += OPTION_SCORE[answer];
    }
  }

  return DIMENSION_ORDER.map(d => scores[d]);
}

/**
 * 使用绝对差之和找到最佳匹配英雄
 * 返回最佳匹配的英雄和所有英雄的距离列表
 */
export function findBestMatch(userScores: number[]): {
  hero: HeroProfile;
  distance: number;
  allDistances: { hero: HeroProfile; distance: number }[];
} {
  let bestHero = heroes[0];
  let bestDistance = Infinity;
  const allDistances: { hero: HeroProfile; distance: number }[] = [];

  for (const hero of heroes) {
    let distance = 0;
    for (let i = 0; i < 15; i++) {
      distance += Math.abs(userScores[i] - hero.scores[i]);
    }
    allDistances.push({ hero, distance });

    if (distance < bestDistance) {
      bestDistance = distance;
      bestHero = hero;
    }
  }

  return { hero: bestHero, distance: bestDistance, allDistances };
}
