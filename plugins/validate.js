import isArray from 'lodash/isArray'
export default ({ app, store }, inject) => {
  inject('validate', (rules, models, mutator = '') => {
    const errors = []
    rules.forEach(({ required, model, dropdown, message }) => {
      if (required && !models[model]) {
        errors.push(message)
      }
      if (dropdown) {
        if (isArray(models[model])) {
          if (required && models[model].length === 0) {
            errors.push(message)
          }
        } else if (!isArray(models[model]) && required && !models[model]) {
          errors.push(message)
        }
      }
    })
    if (mutator) {
      store.commit(mutator, errors)
    }
    return errors
  })
}
