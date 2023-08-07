describe('Signin tests', () => {
  const server = require('../../../../app/server')
  const testNamespace = 'test-namespace'
  const baseRedirectUrl = `https://${testNamespace}.ffc.snd.azure.defra.cloud`
  const stateParam = 'eyJpZCI6IjM2MzAyNjdkLWY1ZjMtNDU1Yi05ZGY1LThmNWRiMWFkZGI1MyIsIm5hbWVzcGFjZSI6InRlc3QtbmFtZXNwYWNlIn0='
  const codeParam = 'test-code'
  const applyUrl = '/apply/signin-oidc'
  const claimUrl = '/claim/signin-oidc'

  beforeEach(async () => {
    await server.start()
    jest.clearAllMocks()
  })

  afterEach(async () => {
    await server.stop()
  })

  describe(`GET requests to '${applyUrl}'`, () => {
    test('returns 302 and redirected', async () => {
      const options = {
        method: 'GET',
        url: `${applyUrl}?state=${stateParam}&code=${codeParam}`
      }

      const res = await server.inject(options)

      expect(res.statusCode).toBe(302)
      expect(res.headers.location).toEqual(`${baseRedirectUrl}${applyUrl}?code=${codeParam}&state=${stateParam}`)
    })
  })

  describe(`GET requests to '${claimUrl}'`, () => {
    test('returns 302 and redirected', async () => {
      const options = {
        method: 'GET',
        url: `${claimUrl}?state=${stateParam}&code=${codeParam}`
      }

      const res = await server.inject(options)

      expect(res.statusCode).toBe(302)
      expect(res.headers.location).toEqual(`${baseRedirectUrl}${claimUrl}?code=${codeParam}&state=${stateParam}`)
    })
  })
})
