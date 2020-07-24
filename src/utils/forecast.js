const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat="+encodeURIComponent(latitude)+"&lon="+encodeURIComponent(longitude)+"&units=metric&appid=e3ab67392abb931f9c5830f5c2563010"

    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
            callback("Unable to connect to weather services!",undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location',undefined)
        }
        else
        {
            callback(undefined,body.current.weather[0].description.toString()+". It is "+body.current.temp.toString()+" degrees out."+"humidity is "+body.current.humidity.toString())
        }
    })
}

module.exports = forecast