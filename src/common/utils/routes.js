export default {
  apiResponse: func => {
    return (req, res) => res.json(func(req, res))
  },

  apiResponseAsync: func => {
    return async (req, res) => {
      try {
        const message = await func(req, res)
        res.json(message)
      } catch (err) {
        res.json(err)
      }
    }
  },

  pageResponse: (view, func) => {
    return (req, res) => res.render(view, func(req, res))
  }
}
