const { Expo } = require("expo-server-sdk");

// expo notifications
let expo = new Expo({
  useFcmV1: true,
});

// Create the messages that you want to send to clients
async function sendChunkMessages(pushTokens) {
  const messages = [
    {
      to: pushTokens,
      sound: "default",
      title: "Dynamic notifications",
      body: "Yessir group time",
    },
  ];

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }

  // Process the receipts
  let receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }
  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      for (let receiptId in receipts) {
        let { status, message, details } = receipts[receiptId];
        if (status === "ok") {
          continue;
        } else if (status === "error") {
          console.error(`There was an error sending a notification: ${message}`);
          if (details && details.error) {
            console.error(`The error code is ${details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports.sendChunkMessages = sendChunkMessages;
