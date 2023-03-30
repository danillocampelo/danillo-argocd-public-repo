/**
 * @description
 * This `enum` defines the keys which the objects are stored in `localStorage` throughout
 * the _Checkout_ flow. Please use this enum everytime you need to get/set/remove anything
 * in the `localStorage` during the _Checkout_ flow.
 */
export enum CheckoutStorageKeys {
  BOOKING_ID = 'bookingId',
  PACKAGE_AVAILABILITY = 'packageAvailability',
  FORM_DATA = 'checkoutFormData',
  PACKAGE_DATA = 'packageData',
}
