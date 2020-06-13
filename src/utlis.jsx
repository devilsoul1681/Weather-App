const request=require('request');
const getWeather=(lalitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=1a12324bf8e10241f7496a68a6a9c2eb&query="+encodeURIComponent(lalitude)+","+ encodeURIComponent(longitude)+"&units=m";
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Network Error!!',undefined)
        }
        else if(response.body.error){
            callback("Location not available",undefined)
        }
        else{
            callback(undefined,{forecast:response.body.current.weather_descriptions[0],temp:response.body.current.temperature});
        }
    })
    
}

const geocode=(address,callback)=>{
    const getCodeUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGV2aWxzb3VsMTY4MSIsImEiOiJja2I4NDB0b2swMGoxMnVwNWtqY2l3ZmV2In0.KWfi6jFgz94TFKY3PJMRMA&limit=1'

    request({url:getCodeUrl,json:true},(error,response)=>{
        if(error){
            callback('Network Error!!',undefined);
        }
        else if(response.body.message==="Not Found" || response.body.features.length===0 ){
            callback("Location not available!!!",undefined)
        }
        else{
            const lalitude=response.body.features[0].center[1];
            const longitude=response.body.features[0].center[0];
            const info=response.body.features[0].place_name;
            callback(undefined,{lalitude:lalitude,longitude:longitude,place:info})
        }
    })
}

module.exports={geocode,getWeather};
// 1a12324bf8e10241f7496a68a6a9c2eb