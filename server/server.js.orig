import express from 'express'
import cors from 'cors'

import tripRoutes from './routes/trips.js'
import activityRoutes from './routes/activities.js'
import destinationRoutes from './routes/destinations.js'
import tripDestinationRoutes from './routes/trips-destinations.js'
import userTripRoutes from './routes/users-trips.js'

import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'
import authRoutes from './routes/auth.js'

// create express app
const app = express()

app.use(session({
    secret: 'codepath',
    resave: false,
    saveUninitialized: true
 }))

// middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
  }
))

app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ OnTheFly API</h1>')
})

// authentication routes
app.use('/auth', authRoutes)

// routes
app.use('/api/trips/', tripRoutes)
app.use('/api/activities/', activityRoutes)
app.use('/api/destinations/', destinationRoutes)
app.use('/api/trips-destinations/', tripDestinationRoutes)
app.use('/api/users-trips/', userTripRoutes)

// connect server on port 3001
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})
