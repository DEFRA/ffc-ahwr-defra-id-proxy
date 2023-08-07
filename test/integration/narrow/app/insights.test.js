describe('Application Insights', () => {
  const appInsights = require('applicationinsights')
  jest.mock('applicationinsights')

  const startMock = jest.fn()
  const setupMock = jest.fn(() => {
    return {
      start: startMock
    }
  })
  appInsights.setup = setupMock
  const cloudRoleTag = 'cloudRoleTag'
  const tags = {}
  appInsights.defaultClient = {
    context: {
      keys: {
        cloudRole: cloudRoleTag
      },
      tags
    }
  }

  const consoleLogSpy = jest.spyOn(console, 'log')

  const appInsightsConnectionString = process.env.APPINSIGHTS_CONNECTIONSTRING

  beforeEach(() => {
    delete process.env.APPINSIGHTS_CONNECTIONSTRING
    jest.clearAllMocks()
  })

  afterAll(() => {
    process.env.APPINSIGHTS_CONNECTIONSTRING = appInsightsConnectionString
  })

  test('is started when env var exists', () => {
    const appName = 'test-app'
    process.env.APPINSIGHTS_CLOUDROLE = appName
    process.env.APPINSIGHTS_CONNECTIONSTRING = 'something'
    const insights = require('../../../../app/insights')

    insights.setup()

    expect(setupMock).toHaveBeenCalledTimes(1)
    expect(startMock).toHaveBeenCalledTimes(1)
    expect(tags[cloudRoleTag]).toEqual(appName)
    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    expect(consoleLogSpy).toHaveBeenCalledWith('App Insights running')
  })

  test('logs not running when env var does not exist', () => {
    const insights = require('../../../../app/insights')

    insights.setup()

    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    expect(consoleLogSpy).toHaveBeenCalledWith('App Insights not running')
  })
})
