require('dotenv').config();
const express = require('express');
const { appendToSheet } = require('./googleSheets');
const { sendWhatsAppMessage } = require('./twilioSender');

const app = express();
app.use(express.json());

app.post('/task', async (req, res) => {
  const { task, priority, assignedTo, status } = req.body;

  if (!task || !priority || !status) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await appendToSheet([task, priority, assignedTo || '', status]);
    await sendWhatsAppMessage(task, priority, assignedTo || 'Unassigned', status);
    res.status(200).json({ message: 'Task added & WhatsApp sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
