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

  // const key = 'E7ZbLlW4NnkUec2lc8Uo27UTUpaHmV8AuJETVrEQcEU='
  const key = process.env.CRYPTON_KEY

  $axios.interceptors.response.use(undefined, (error) => {
    return Promise.reject(error)
    // eslint-disable-next-line prefer-promise-reject-errors
    // return Promise.reject({ ...error })
  })

  // encrypt both request and response data
  Crypton(key).encrypt($axios)
}
