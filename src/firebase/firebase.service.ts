import { Injectable } from '@nestjs/common';
import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

// ⚠️ 注意: 本番環境では環境変数やSecret Managerから取得してください
// Cloudflare Workersでは、wrangler.tomlを通じて環境変数をバインドできます。
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyC2F6xmeSWn1K8scm_tWbdEc0Hk5OsGM60',
  authDomain: 'fir-library-feddc.firebaseapp.com',
  projectId: 'fir-library-feddc',
  storageBucket: 'fir-library-feddc.firebasestorage.app',
  messagingSenderId: '928474680494',
  appId: '1:928474680494:web:6205f248c8e6a96515f13f',
};

/**
 * FirebaseService:
 * Firebaseアプリケーションの初期化とFirestoreインスタンスの提供を担当するサービス。
 * NestJSのDIコンテナを通じて他のサービスに注入されます。
 */
@Injectable()
export class FirebaseService {
  private readonly firebaseApp: FirebaseApp;
  private readonly firestore: Firestore;

  constructor() {
    // 1. Firebaseアプリケーションの初期化
    // ESLintの警告を抑制するため、特定ルールを無効化します。
    // initializeAppの戻り値をFirebaseApp型として明示的にアサートします。
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.firebaseApp = initializeApp(firebaseConfig) as FirebaseApp;

    // 2. Firestoreインスタンスの取得
    // ESLintの警告を抑制するため、特定ルールを無効化します。
    // getFirestoreの戻り値をFirestore型として明示的にアサートします。
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.firestore = getFirestore(this.firebaseApp) as Firestore;

    console.log('Firebase App initialized.');
  }

  /**
   * Firestoreインスタンスを返すメソッド。
   * これを他のサービスが呼び出してDB操作を行います。
   * @returns Firestore
   */
  getFirestore(): Firestore {
    return this.firestore;
  }

  /**
   * FirebaseAppインスタンスを返すメソッド。
   * @returns FirebaseApp
   */
  getApp(): FirebaseApp {
    return this.firebaseApp;
  }
}
