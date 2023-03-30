export const changeLocationHref = (href: string) => {
  if (location) {
    location.href = href
  }
}
