const express = require('express')

const app = express()
app.use(express.json())
app.post('/validator', (req, res) => {
  const { name } = req.body
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

  if (splitName.length < 2 || splitName.length > 3)
    return res.status(400).json({
      status: 400,
      data: {
        message: 'Must contain 2 or 3 terms',
        valid: false,
      },
    })

  if (splitName[splitName.length - 1].match(/\.$/gm)) {
    return res.status(400).json({
      status: 400,
      data: {
        message: 'Last name cannot be an initial',
        valid: false,
      },
    })
  }

  if (splitName.length === 2) {
    const [firstName, lastName] = splitName

    if (isInitial(firstName) && !firstName.match(/^\w?[.]/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Initials must end with a dot ',
          valid: false,
        },
      })
    }

    if (isWord(lastName) && lastName.match(/^\w?[.]/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Last name cannot be an initial',
          valid: false,
        },
      })
    }

    if (name.match(/[A-Z][.]\s[a-z]\w+/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      })
    }

    if (name.match(/[a-z][.]\s[A-Z]\w+/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      })
    }

    if (name.match(/[A-Z]\s[A-Za-z]\w+/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      })
    }
  }

  if (splitName.length === 3) {
    const [firstName, _, lastName] = splitName
    if (isInitial(firstName) && !firstName.match(/^\w?[.]/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Initials must end with a dot ',
          valid: false,
        },
      })
    }
    if (isWord(lastName) && lastName.match(/^\w?[.]/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Last name cannot be an initial',
          valid: false,
        },
      })
    }
    if (name.match(/[A-Z][.]\s[a-z]\w+/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      })
    }
    if (name.match(/[A-Z]\s[a-z]\w+/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Initials must end with a dot',
          valid: false,
        },
      })
    }
    if (name.match(/[a-z]\s[A-Z]\w+/gm)) {
      return res.status(400).json({
        status: 400,
        data: {
          message: 'Incorrect capitalization',
          valid: false,
        },
      })
    }
  }
  return res.status(200).json({
    status: 200,
    data: {
      message: 'Success',
      valid: true,
    },
  })
})
app.listen(3000, () => {
  console.log(`Server listening on port ${3000}`)
})
