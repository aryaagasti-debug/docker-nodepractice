const express = require('express');
const multer = require('multer')
const {S3Client, PutObjectCommand} =  require('@aws-sdk/client-s3')
const app = express();


//s3 setup
const s3 =  new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1' 
})

//multer setup
const upload = multer({storage: multer.memoryStorage()})

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello bhai 🚀 Express server is running using docker');
});

app.get('/env', (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    postgresHost: process.env.POSTGRES_HOST,
    redisHost: process.env.REDIS_HOST,
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// upload setup 
app.post('/upload', upload.single('file'), async (req,res)=>{
  try {
    if(!req.file){
      return res.status(400).json({error: 'No file uploaded'})
    }

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }

    await s3.send(new PutObjectCommand(params))

    res.json({
      message:'File uploaded successfully',
      file: params.Key
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Upload failed'})
  }
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
