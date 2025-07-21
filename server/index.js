const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const HIREME_FILE = path.join(__dirname, 'hireme.json');

function loadHireMeStatus() {
  try {
    const data = fs.readFileSync(HIREME_FILE, 'utf-8');
    return JSON.parse(data).hireMe;
  } catch {
    return false;
  }
}
function saveHireMeStatus(status) {
  fs.writeFileSync(HIREME_FILE, JSON.stringify({ hireMe: status }), 'utf-8');
}
let hireMeStatus = loadHireMeStatus();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage for messages (in production, use a database)
let messages = [];

app.use(cors());
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get('/', (req, res) => {
  res.send('API is running');
});

// Get all messages (for admin panel)
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Contact form endpoint with email notification
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  // Store message
  messages.push(newMessage);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // send to yourself
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h3>Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message received and sent to your email!' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }

  console.log('Contact form submission:', newMessage);
});

app.get('/api/hireme', (req, res) => {
  res.json({ hireMe: hireMeStatus });
});

app.post('/api/hireme', (req, res) => {
  const { hireMe, password } = req.body;
  if (typeof hireMe !== 'boolean') {
    return res.status(400).json({ error: 'hireMe must be a boolean' });
  }
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  hireMeStatus = hireMe;
  saveHireMeStatus(hireMeStatus);
  res.json({ success: true, hireMe: hireMeStatus });
});

// Delete a message (for admin panel)
app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const messageIndex = messages.findIndex(msg => msg.id === parseInt(id));
  
  if (messageIndex === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  messages.splice(messageIndex, 1);
  res.json({ success: true, message: 'Message deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`- GET /api/messages - Get all messages`);
  console.log(`- POST /api/contact - Submit contact form`);
  console.log(`- DELETE /api/messages/:id - Delete a message`);
}); 