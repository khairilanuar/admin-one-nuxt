// eslint-disable-next-line no-unused-vars
import { Crypton } from 'laravel-crypton'

export default function({ $axios, redirect }) {
  /*
  $axios.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/401')
    }
  })
  */

  // read crypton key from .env
  const key = process.env.CRYPTON_KEY

  // intercept error response
  $axios.onError((error) => {
    /*
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    */
    // console.log('Axios Error!')
    // console.log({ ...error })
    return Promise.reject(error)
  })

  // encrypt both request and response data
  Crypton(key).encrypt($axios)
}