import { Config } from 'src/utils/config'

export const PAYMENT_PLUGIN_OPTIONS_DEFAULT = {
  environment: Config.PaymentPluginEnv, // Change to one of the environment values specified in step 4.
  clientKey: Config.PaymentPluginClientKey, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
  analytics: {
    enabled: true, // Set to false to not send analytics data to Adyen.
  },
  countryCode: 'BR', // TODO: Use locale
  shopperLocale: 'pt-BR', // TODO: Use locale
  // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
  // For example, this is 3D Secure configuration for cards:
  paymentMethodsConfiguration: {
    card: {
      hasHolderName: true,
      holderNameRequired: true,
      billingAddressRequired: true,
    },
  },
}
