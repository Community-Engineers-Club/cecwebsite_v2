/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();


// note to self/club: need to find more robust and accurate method of decreasing counter
exports.decrementCounter = onRequest(async (request, response) => {
    try {
        const docRef = admin.firestore().collection("arduino").doc("post");

        await admin.firestore().runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) {
                response.status(404).send("Document not found");
                return;
            }

            const currentValue = doc.data().counter || 0;
            if (currentValue > 0) {
                transaction.update(docRef, { counter: currentValue - 1 });
            } else{
                console.log("Counter not > 0. No decrement.")
            }
        });

        response.status(200).send("Counter decremented successfully");
    } catch (error) {
        console.error("Error decrementing counter:", error);
        response.status(500).send("Error decrementing counter");
    }
});