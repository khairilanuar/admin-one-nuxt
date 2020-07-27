// eslint-disable-next-line no-unused-vars
import { Crypton } from 'laravel-crypton'

export default function ({ $axios, _ }) {
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
  // eslint-disable-next-line no-unused-vars
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

    // decrypt error.response payload
    if (
      error.response.data.payload !== undefined &&
      error.response.data.payload.length > 0
    ) {
      error.response.data = Crypton(key).encrypter.decrypt(
        error.response.data.payload
      )
    }
    return Promise.reject(error)
  })

  // encrypt both request and response data
  // TODO: fix method=_PUT in axios post for PUT
  // Crypton(key).encrypt($axios)
}
