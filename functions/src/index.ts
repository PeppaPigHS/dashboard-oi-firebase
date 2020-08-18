import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const checkUser = functions
  .region('asia-east2')
  .https.onCall(
    async (requestData: any, context: functions.https.CallableContext) => {
      if (!context.auth) return false
      try {
        const uid = context.auth.uid
        const userRef = admin.firestore().doc(`users/${uid}`)
        if (!(await userRef.get()).exists) {
          await userRef.set({
            username: requestData.displayName,
            checklist: [],
          })
        }
        return true
      } catch (error) {
        throw new functions.https.HttpsError('unknown', error)
      }
    }
  )
