import { CustomCheckoutRequiredData } from '@views/booking/custom-checkout/CustomCheckout'

//TODO: Refac - Move all internal URLs used to this file
export const ROUTES = {
  home: () => '/',
  experiences: () => '/experiences',
  signInPage: () => '/sign-in',
  customCheckout: ({
    endDate,
    startDate,
    origin,
    destination,
  }: CustomCheckoutRequiredData) =>
    `/checkout/custom?endDate=${endDate}
      &startDate=${startDate}
      &origin=${JSON.stringify(origin)}
      &destination=${JSON.stringify(destination)}`,
  checkout: (packageId?: string) =>
    `/checkout${packageId ? `?packageId=${packageId}` : ''}`,
  register: () => 'https://www.smiles.com.br/cadastro',
  packageIdPage: (packageId: string) => `/packages/${packageId}`,
  termsAndConditions: () => '/docs/TermsAndConditions.pdf',
  orderDetail: (orderId: string) => `profile/orders/${orderId}`,
  googlePlay: () => 'https://play.google.com/',
  appStore: () => 'https://www.apple.com/app-store/',
  login: () => '/api/auth/login',
  logout: () => '/api/auth/logout',
  profile: () => '/profile',
  editProfile: () =>
    'https://www.smiles.com.br/restrito/minha-conta/alterar-dados',
  concierge: () => 'https://wa.me/5511974556527',
  whatsapp: () => 'https://wa.me/5511974556527',
}
