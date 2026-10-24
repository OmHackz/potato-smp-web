import { demoProvider } from './providers/demo';
import { planProvider } from './providers/plan';
import { customProvider } from './providers/custom';

type ProviderType = 'demo' | 'plan' | 'custom';

const MODE = (import.meta.env.VITE_STATS_MODE as ProviderType) || 'demo';

let provider: typeof demoProvider;

switch (MODE) {
  case 'plan':
    provider = planProvider;
    break;
  case 'custom':
    provider = customProvider;
    break;
  case 'demo':
  default:
    provider = demoProvider;
    break;
}

export const dataProvider = provider;
export const currentMode = MODE;

export function getProvider() {
  return provider;
}

export function setProvider(newProvider: typeof demoProvider) {
  // For testing/runtime switching
  Object.assign(provider, newProvider);
}