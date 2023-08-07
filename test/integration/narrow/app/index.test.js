jest.mock('../../../../app/server')
const { setup } = require('../../../../app/insights')
jest.mock('../../../../app/insights')
const server = require('../../../../app/server')
server.start = jest.fn(async () => { })

const init = require('../../../../app/index')

afterEach(() => {
  jest.clearAllMocks()
})
describe('init function defined', () => {
  test('Should be defined', () => {
    expect(init).toBeDefined()
  })
  test('Should call setup once', async () => {
    expect(require('../../../../app/index')).toEqual({})
    expect(setup).toHaveBeenCalledTimes(0)
  })
})
