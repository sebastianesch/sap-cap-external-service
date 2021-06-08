const cds = require('@sap/cds')
const express = require('express')
const dotenv = require('dotenv')
const { executeHttpRequest } = require('@sap-cloud-sdk/core')

dotenv.config()

cds.on('bootstrap', (app) => {

    app.use(express.json())

    app.post('/getWeather', async (request, response) => {
        console.log('getWeather: body: %o', request.body)
        const url = '/data/2.5/weather'
        const apiKey = process.env.API_KEY
        console.log('API Key: %s', apiKey)
        const params = {q: request.body.location, appid: apiKey, units: 'metric'}
        const apiResponse = await executeHttpRequest({destinationName: 'openWeatherApi'}, { url: url, method: 'get', params: params})
        console.log(apiResponse.data)
        response.json({'location': request.body.location, 'temp': apiResponse.data.main.temp})
    })
})

module.exports = cds.server