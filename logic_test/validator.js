function validatorName(name) {
  if (!name)
    return {
      status: 400,
      data: {
        message: 'name is required',
        valid: false,
      },
    }

  const splitName = name.split(' ')
  const isInitial = (term) => /^[A-Z]\.$/.test(term)
  const isWord = (term) => /^[A-Z][a-z]+$/.test(term)
  const isValidNameLength = (term) => splitName.length === 1

  if (isValidNameLength(splitName))
    return {
      status: 400,
      data: {
        message: 'Must contain 2 or 3 terms',
        valid: false,
      },
    }

  if (splitName[splitName.length - 1].match(/\.$/gm)) {
    return {
      status: 400,
      data: {
        message: 'Last name cannot be an initial',
        valid: false,
      },
    }
  }

  if (splitName.length === 2) {
    const [firstName, lastName] = splitName

    if (isInitial(firstName) && !firstName.match(/^\w?[.]/gm)) {
      return {
        status: 400,
        data: {
          message: 'Initials must end with a dot ',
          valid: false,
        },
      }
    }

    if (isWord(lastName) && lastName.match(/^\w?[.]/gm)) {
      return {
        status: 400,
        data: {
          message: 'Last name cannot be an initial',
          valid: false,
        },
      }
    }

    if (name.match(/[A-Z][.]\s[a-z]\w+/gm)) {
      return {
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      }
    }

    if (name.match(/[a-z][.]\s[A-Z]\w+/gm)) {
      return {
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      }
    }

    if (name.match(/[A-Z]\s[A-Za-z]\w+/gm)) {
      return {
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      }
    }
  }

  if (splitName.length === 3) {
    const [firstName, _, lastName] = splitName
    if (isInitial(firstName) && !firstName.match(/^\w?[.]/gm)) {
      return {
        status: 400,
        data: {
          message: 'Initials must end with a dot ',
          valid: false,
        },
      }
    }
    if (isWord(lastName) && lastName.match(/^\w?[.]/gm)) {
      return {
        status: 400,
        data: {
          message: 'Last name cannot be an initial',
          valid: false,
        },
      }
    }
    if (name.match(/[A-Z][.]\s[a-z]\w+/gm)) {
      return {
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      }
    }
    if (name.match(/[A-Z]\s[a-z]\w+/gm)) {
      return {
        status: 400,
        data: {
          message: 'Initials must end with a dot',
          valid: false,
        },
      }
    }
    if (name.match(/[a-z]\s[A-Z]\w+/gm)) {
      return {
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      }
    }
  }
  return {
    status: 200,
    data: {
      message: 'Success',
      valid: true,
    },
  }
}

console.log(validatorName('I. Tri'), 'I. Tri')
console.log(validatorName('I. T. Septian'), 'I. T. Septian')
console.log(validatorName('Ivan T. Septian'), 'Ivan T. Septian')

console.log(validatorName('Ivan'), 'Ivan')
console.log(validatorName('i. Tri'), 'i. Tri')
console.log(validatorName('I Tri'), 'I Tri')
console.log(validatorName('I. tri'), 'I. tri')
console.log(validatorName('I. Tri Septian'), 'I. Tri Septian')
console.log(validatorName('I. Tri P.'), 'I. Tri P.')
console.log(validatorName('Ivan. Tri Septian'), 'Ivan. Tri Septian')
