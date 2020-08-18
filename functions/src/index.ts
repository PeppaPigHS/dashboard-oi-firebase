import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const onRegister = functions
  .region('asia-east2')
  .auth.user()
  .onCreate(
    async (user: admin.auth.UserRecord, context: functions.EventContext) => {
      try {
        const uid = user.uid
        await admin
          .firestore()
          .doc(`users/${uid}`)
          .set({ username: user.displayName, checklist: [] })
      } catch (error) {
        throw new functions.https.HttpsError('unknown', error)
      }
    }
  )
