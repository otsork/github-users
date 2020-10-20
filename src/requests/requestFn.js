import Axios from 'axios'

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
      ...args.config
    }

    this.successCb = (response) => {
      // console.log(response)
      const parsedResponse = this.config.parser && this.config.parser(response)
      const _response = this.config.parser ? parsedResponse : response
      // console.log(parsedResponse)
      if (args.successCb) args.successCb(_response)
      args.resolve(_response)
      return _response
    }

    this.errorCb = (error) => {
      if (args.errorCb) args.resolve(args.errorCb(error))
      args.reject(error)
      return error
    }
  }

  async send() {
    
    console.log(this.config.url)
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