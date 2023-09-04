import * as default_dark from './default_dark';

import { Theme } from '@/Theme/theme.type';

type Themes = { [key: string]: Partial<Theme> }

// TODO: Fix below type when multiple app themes are supported
export default {
  default_dark,
} as unknown as Themes;
