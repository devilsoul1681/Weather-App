const path = require('path')
const express = require('express')
const ejs=require("ejs");
const {geocode,getWeather}=require("./utlis.jsx")
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'ejs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'DevilSoul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'DevilSoul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'DevilSoul'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Please enter the Address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error:error
            })
        }
        else{
            getWeather(data.lalitude,data.longitude,(error1,data1)=>{
                 if(error1){
                     return res.send({
                         error:error1
                     })
                 }
                 res.send({
                    forecast: data1.forecast,
                    temperature:data1.temp,
                    address:data.place
                 })
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'DevilSoul',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'DevilSoul',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})