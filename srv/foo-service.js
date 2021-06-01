const cds = require('@sap/cds')
const { executeHttpRequest } = require('@sap-cloud-sdk/core')

module.exports = cds.service.impl(async (srv) => {

    srv.on('READ', 'Foo', (request) => {

        return [{ID: 1}, {ID: 2}]
    })

    srv.on('getWeather', async (request) => {
        const url = '/data/2.5/weather'
        const apiKey = 'your api key'
        const params = {q: request.data.location, appid: apiKey, units: 'metric'}
        const response = await executeHttpRequest({destinationName: 'openWeatherApi'}, { url: url, method: 'get', params: params})
        console.log(response.data)
        return {'location': request.data.location, 'temp': response.data.main.temp}
    })

})