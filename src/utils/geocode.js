const request = require('request')
const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibW9oYW42Njc3IiwiYSI6ImNrYzMxM3Z0eDFxNmgzMG40ZXpudnhwb28ifQ.ue51HwwX9Q-aCTU6y4J0gg"

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(body.features.length === 0)
        {
            callback('Unable to find location . Try Another Search',undefined)
        }
        else
        {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode