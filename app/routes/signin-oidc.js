module.exports = [{
  method: 'GET',
  path: '/apply/signin-oidc',
  handler: (request, h) => {
    const decodedState = JSON.parse(Buffer.from(request.query.state, 'base64').toString('ascii'))
    const url = `https://${decodedState.namespace}.ffc.snd.azure.defra.cloud/apply/signin-oidc?code=${request.query.code}&state=${request.query.state}`
    return h.redirect(url).code(302)
  }
},
{
  method: 'GET',
  path: '/claim/signin-oidc',
  handler: (request, h) => {
    const decodedState = JSON.parse(Buffer.from(request.query.state, 'base64').toString('ascii'))
    const url = `https://${decodedState.namespace}.ffc.snd.azure.defra.cloud/claim/signin-oidc?code=${request.query.code}&state=${request.query.state}`
    return h.redirect(url).code(302)
  }
}]
