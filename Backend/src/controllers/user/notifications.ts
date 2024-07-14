import { Request, Response } from 'express';
import { admin } from '../../config/firebaseadmin';

export const sendNotification = async (req: Request, res: Response) => {
  console.log('inside the notification controller');
  const { receiverId, message, senderName, chatRoomId, senderId} = req.body;

  if (!receiverId) {
    console.log('Missing receiverId');
    return res.status(400).send('Missing receiverId');
  } else if (!message) {
    console.log('Missing message');
    return res.status(400).send('Missing message');
  } else if (!senderName) {
    console.log('Missing senderName');
    return res.status(400).send('Missing senderName');
  } else if (!chatRoomId) {
    console.log('Missing chatRoomId');
    return res.status(400).send('Missing chatRoomId');
  } else if (!senderId) {
    console.log('Missing senderId');
    return res.status(400).send('Missing senderId');
  }

  try {
    console.log('i');
    // Get the receiver's FCM token from Firestore
    //const userDoc = await admin.firestore().collection('users').doc(receiverId).get();
    console.log('ii');
    const fcmToken =  'dEiXs87jRfKR_M2r7eLude:APA91bGPH7uEMVGW4-6Yp7Jc7wpMGCj_4n0lpQ6ApNoLV3rmI__1y669m-y0tdiv_4OtCsWMH6p2Dj-h47UKwAPUUPPnVgx9BUmuBoE7lg0eggJ-afh8cE7IFHuP3V7eARn5otv67Hfu'; //userDoc.data()?.fcmToken;

    if (!fcmToken) {
      console.log('Receiver does not have a valid FCM token');
      return res.status(400).send('Receiver does not have a valid FCM token');
    }
    console.log('FCM token:', fcmToken);

    // Create the notification payload
    const payload = {
      token: fcmToken,
      notification: {
        title: senderName,
        body: message,
      },
      data: {
        senderName,
        message,
        chatRoomId,
        senderId
      },
    };

    // Send the notification
    await admin.messaging().send(payload);

    return res.status(200).send('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
    return res.status(500).send('Error sending notification');
  }
};
