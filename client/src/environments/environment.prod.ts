/**
 * **This file _SHOULD NEVER BE IMPORTED_!**
 *
 * @fileoverview This file contains configurations in production environment. The `ng build --prod` command will replace {@link "./environment.ts"} with this file.
 */
import { sharedEnv } from './environment.shared'

/** Environmental configuration in production */
export const environment = {
  production: true,
  ...sharedEnv
}
