export default {
  apiResponse(func) {
    return (req, res) => res.json(func(req, res))
  },

  pageResponse(view, func) {
    return (req, res) => res.render(view, func(req, res))
  }
}
