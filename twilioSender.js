const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function sendWhatsAppMessage(task, priority, assignedTo, status) {
  const message = `📌 New Task:\n📝 ${task}\n⭐ Priority: ${priority}\n👤 Assigned: ${assignedTo}\n📋 Status: ${status}`;

  return client.messages.create({
    from: process.env.TWILIO_FROM,
    to: process.env.TWILIO_TO,
    body: message,
  });
}

module.exports = { sendWhatsAppMessage };
