export type ContactFieldError = {
  name: string
  message: string
}

export type ContactResponseError = {
  statusCode: number
  statusMessage: string
  data: {
    success: false
    message: string
    errors?: ContactFieldError[]
  }
}

export type ContactResponseSuccess = {
  statusCode: number
  success: true
  message: string
  data?: object
}
