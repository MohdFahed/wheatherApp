const path = require('path');
const express = require ('express');
const hbs = require ('hbs');
const geocode = require('./utils/geocode');
const forcast = require ('./utils/forcast');
const app = express();

//Difine paths for express config
const publicdirPath = path.join(__dirname,'../public'); //manupulate path where index.html is present...
const viewPath = path.join(__dirname,'./templates/views')

const partialPAth = path.join(__dirname,'./templates/partials')
console.log(viewPath)

//set handlebars engine and view location
app.set('view engine','hbs')// set of view engie for hbs
app.set('views',viewPath) // if we changes the hbs folder views to other we need to set path 
hbs.registerPartials(partialPAth);


//setup static directory to serve
app.use(express.static(publicdirPath)) // app.use function use to set index.html file as a default...


app.get('',(req,res) => {
   res.render('index',{
       title:'Wheather Application',
       name:'Mohd. Fahadur Rahman'
   })// render  use to render dynamic content... it have two parameter first route path and second object which is display dynamically
})

app.get('/help',(req, res) => {
    res.render('help',{
        title:'Help Page..',
        name:'Mohd. Fahadur Rahman'
    })
})

app.get('/help/*',(req, res) => {
    res.render('page404',{
        title:'404',
        errorMesssage:'article not found..',
        name:'Mohd. Fahadur Rahman'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Mohd. Fahadur Rahman'
    })
})


app.get('/wheather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You Must provide address.'
        })
     }

     geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
         if(error){
             return res.send({
                 error:error
             })
         }
         forcast(latitude,longitude,(error,forcastdata)=>{
             if(error){
                 return res.send({error})
             }
             res.send({
                 forcast:forcastdata,
                 location,
                 address:req.query.address
             })
         })
     })

})

app.get('*',(req,res) => {
    res.render('page404',{
        title:'404',
        errorMesssage:'Page Not Found',
        name:'Fahad'
    })
})


app.listen(3000,()=>{
    console.log('application run on port 3000...')
})