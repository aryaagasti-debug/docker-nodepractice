const express = require('express')
const app = express()

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Hello bhai 🚀 Express server is running using  docker')
})

app.get("/env", (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    postgresHost: process.env.POSTGRES_HOST,
    redisHost: process.env.REDIS_HOST,
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
