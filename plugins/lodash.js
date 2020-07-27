import lodash from 'lodash'

export default ({ _ }, inject) => {
  inject('lodash', lodash)
}
