/**
 * Use this class for Feature toggling
 */
import { Config, Env as EnvEnum } from './config'

export class FeatureManager {
  /**
   * Example of a feature that is only available in Staging and dev stages
   */
  static shouldShowExample() {
    return [EnvEnum.Dev, EnvEnum.Staging, EnvEnum.Prod].includes(Config.Env)
  }
}
