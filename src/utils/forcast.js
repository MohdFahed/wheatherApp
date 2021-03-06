const request = require('request');

const forcast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=8e00d04aa2130cb06a2b43396cce9150&query='+ latitude +','+ longitude +'&units=f'
       request({url:url, json:true},(error, response) => {
         if(error){
            callback("samething  is wrong...",undefined);
         }else if(response.body.error){
            callback("unable to  find location...",undefined)
         }else{
             const temp = response.body.current.temperature;
             const finalTemp = Math.ceil((temp-32)* 5/9);
             const futureTemp = response.body.current.feelslike;
             const finalFutureTemp = Math.ceil((futureTemp-32)* 5/9);
            callback(undefined,response.body.current.weather_descriptions[0]+'. It is currently '+finalTemp+'°F. it feels like '+response.body.current.feelslike+' degree out')
         }
       })
 }

 module.exports = forcast 