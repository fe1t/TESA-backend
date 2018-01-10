import Animal from './models'

export const testGetApi = () => {
  return {
    test: 'Test jha'
  }
}

export const testPost = req => {
  const data = req.body
  return {
    data
  }
}

export const list = req => {
  const abe = req.query.abe
  return {
    text: abe
  }
}
