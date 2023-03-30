const validateEmailRegexp = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/g

export const validateEmail = (email: string): boolean =>
  Boolean(email.match(validateEmailRegexp))
