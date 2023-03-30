const error = (err: any, ...optionalParams: any[]) => {
  console.error(err, ...optionalParams)
}

const log = (message: any, ...optionalParams: any[]) => {
  console.log(message, ...optionalParams)
}

const logger = {
  error,
  log,
}

export default logger
