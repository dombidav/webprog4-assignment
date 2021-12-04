/**
 * **This file _SHOULD NEVER BE IMPORTED_ outside of other environment files!**
 *
 * @fileoverview This file contains configurations which are identical in both production and development environment.
 */

import { environmentLocal } from './environment.local'

/** Environment settings which are identical in both production and development */
export const sharedEnv = {
  apiUrl: 'http://localhost:8000/api',
  ...environmentLocal
}
