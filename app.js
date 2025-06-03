
 
 const express=require('express')
 const ratelimit=require('express-rate-limit')
 const mongoSanitize=require('express-mongo-sanitize')
 const hpp=require('hpp')
 const helmet=require('helmet')
 const cors=require('cors')
 const cookieParser=require('cookie-parser')

const {DATA_LIMIT,URL_ENCODE,RATE_LIMIT,MAX_LIMIT,WEB_CACHE}=require('./config')
const Routes=require('./src/routes/route')
const app=express()


//Security middleware

app.use(cors())
app.use(helmet())
app.use(hpp())
//app.use(mongoSanitize())
app.use(cookieParser())

//Body-parsing middleware

app.use(express.json({limit:DATA_LIMIT}))
app.use(express.urlencoded({extended:URL_ENCODE}))

//setting rate limit

const limiter=ratelimit({
    windowMs:RATE_LIMIT,
    max:MAX_LIMIT
})

app.use(limiter)

//Webcaching

app.set('etag',WEB_CACHE)

//Routing End Point

app.use('/api/v1',Routes)

 module.exports=app;