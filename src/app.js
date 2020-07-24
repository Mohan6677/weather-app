const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
         name:'Mohan Tummala'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Mohan Tummala'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Mohan Tummala'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:"locaton error"})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error:"waether error"})
            }
            res.send({
                forecast:forecastData,
                location:location
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mohan Tummala',
        errorMessage:'Help article not found.'
    })

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mohan Tummala',
        errorMessage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on '+port)
})