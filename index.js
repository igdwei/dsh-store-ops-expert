import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { BUNDLED_SKILL_RANK } from '@deepseek-ai/dsh-skill';

const RESOURCE_BASE = {
  kind: 'directory',
  path: fileURLToPath(new URL('./assets/', import.meta.url)),
};

const SKILLS = [
  {
    name: 'store-ops-analyst',
    file: 'SKILL-analyst.md',
    description:
      'Restaurant store operations analyst for POS/收银 exports: reconciliation, gap attribution, discount efficiency, concrete store actions. Use when the user shares a 收银/外卖/团购 export, asks why revenue or take-home changed, or whether a discount campaign paid off.',
  },
  {
    name: 'store-ops-workbench',
    file: 'SKILL-workbench.md',
    description:
      'Deliver and explain the 门店经营助手 single-file HTML dashboard. Use when the user wants the dashboard, asks how to import a POS export, what a metric means, or how a conclusion is calculated.',
  },
];

const candidates = SKILLS.map((s) => ({
  name: s.name,
  description: s.description,
  invocation: { modelInvocable: true, userInvocable: true },
  provider: 'store-ops-expert',
  source: 'bundled',
  resourceBase: RESOURCE_BASE,
  rank: BUNDLED_SKILL_RANK,
  locator: new URL('./assets/' + s.file, import.meta.url),
}));

const provider = {
  name: 'store-ops-expert',
  list: () => Promise.resolve(candidates),
  async get(candidate) {
    const meta = SKILLS.find((s) => s.name === candidate.name);
    if (!meta) throw new Error('unknown skill: ' + candidate.name);
    const base = candidates.find((c) => c.name === meta.name);
    return {
      ...base,
      content: await readFile(new URL('./assets/' + meta.file, import.meta.url), 'utf8'),
    };
  },
};

/** Cordis plugin name. */
export const name = 'store-ops-expert';
/** Service required by the bundled skill provider. */
export const inject = ['skills'];
/** Register the bundled expert skills on ctx.skills. */
export function apply(ctx) {
  ctx.skills.registerProvider(() => provider);
}
