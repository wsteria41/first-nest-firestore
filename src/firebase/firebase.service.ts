import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  public db: FirebaseFirestore.Firestore;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        require('../../serviceAccountKey.json'),
      ),
    });

    this.db = admin.firestore();
  }
}
