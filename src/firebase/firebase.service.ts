import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  public db: FirebaseFirestore.Firestore;

  constructor() {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT as string,
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    this.db = admin.firestore();
  }
}
