import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

// loop over all rules
for (const rule in rules) {
  extend(rule, {
    // eslint-disable-next-line import/namespace
    ...rules[rule], // add the rule
    message: messages[rule], // add its message
  })
}

// password strength
extend('verify_password', {
  message: (field) => {
    return `The ${field} field must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`
  },
  validate: (value) => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    return strongRegex.test(value)
  },
})
