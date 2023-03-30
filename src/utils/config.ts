console.log('===> Using env', process.env.NODE_ENV)

export enum Env {
  Test = 'test',
  Local = 'local',
  Dev = 'development',
  Staging = 'staging',
  Prod = 'production',
}
export interface Config {
  Env: Env
  ApiBaseUrl: string
  PaymentPluginEnv: string
  PaymentPluginClientKey: string
}

export const getConfig = (): Config => {
  return {
    Env: (process.env.NODE_ENV as Env) ?? 'development',
    ApiBaseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
    PaymentPluginEnv: process.env.NEXT_PUBLIC_PAYMENT_PLUGIN_ENV || 'test',
    PaymentPluginClientKey:
      process.env.NEXT_PUBLIC_PAYMENT_PLUGIN_CLIENT_KEY || '',
  }
}

export const Config = getConfig()
