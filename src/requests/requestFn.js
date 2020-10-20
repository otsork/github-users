import Axios from 'axios'
import parseLinkHeader from 'parse-link-header'

const baseURL = 'https://api.github.com'

class Request {
  config
  successCb
  errorCb

  constructor(args) {
    const baseConfig = {
      url: `${baseURL}${args.config.url}`,
      params: args.config.params || {},
      data: args.config.data || {}
    }

    this.config = {
      ...baseConfig,
      ...args.config,
    }

    this.successCb = (response) => {
      if (args.successCb) args.successCb(Request.getParser(response))
      args.resolve(Request.getParser(response))
      return Request.getParser(response)
    }

    this.errorCb = (error) => {
      if (args.errorCb) args.resolve(args.errorCb(error))
      args.reject(error)
      return error
    }
  }

  static hasHeaderLinks = (response) => Boolean(response.headers && response.headers.link)
  static getParser = (response) => {
    switch(true) {
      case Request.hasHeaderLinks(response): {
        const { data, headers: { link } } = response
        return { data, links: parseLinkHeader(link) }
      }
      default:
        return response => response
    }
  }

  async send() {
    try {
      const response = await Axios(this.config)
      this.successCb(response)
    } catch(error) {
      this.errorCb(error)
    }
  }
}

export default async function requestFn(
  config,
  successCb,
  errorCb,
) {
  return new Promise((resolve, reject) => {
    const request = new Request({
      config,
      successCb,
      errorCb,
      resolve,
      reject
    })
    console.log(request.config)
    request.send()
  })
}