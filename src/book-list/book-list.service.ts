/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import {
  CollectionReference,
  getDocs,
  collection,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { Book } from './entities/book-list.entity';
// Bookのインポートパスを一般的な共有パスに戻します (必要に応じて調整してください)
// Firestoreのコレクション名
const BOOK_COLLECTION = 'books';

// Book型からidプロパティを除外した型を定義（Firestoreドキュメントの本体の型）
type BookDocument = Omit<Book, 'id'>;

@Injectable()
export class BookListService {
  // CollectionReferenceの型引数として BookDocument を使用し、Firestoreのデータ本体の型であることを明確にする
  private readonly booksCollection: CollectionReference<
    BookDocument,
    DocumentData
  >;

  constructor(private readonly firebaseService: FirebaseService) {
    // getFirestore() の結果を Firestore 型として明示的に扱う
    const db = this.firebaseService.getFirestore();

    // v9 SDKの collection() 関数を使用してコレクション参照を生成し、型をキャスト
    // CollectionReferenceはBookDocument型に明示的にキャストされます
    this.booksCollection = collection(
      db,
      BOOK_COLLECTION,
    ) as CollectionReference<BookDocument, DocumentData>;
  }

  /**
   * Firestoreからすべての書籍リストを取得します。
   * (簡略化のため、ここではフィルタリングやページネーションは含まず、全件取得とします)
   */
  async findAll(): Promise<Book[]> {
    try {
      // QuerySnapshotにも型引数を適用
      const snapshot: QuerySnapshot<BookDocument> = await getDocs(
        this.booksCollection,
      );

      // スナップショットからドキュメントを抽出し、Book型に整形
      const books: Book[] = snapshot.docs.map((doc) => {
        // doc.data() は BookDocument (idを含まない) の型を持つことを前提とする
        const data = doc.data();

        return {
          id: doc.id, // doc.id は上書きの心配なく設定できる
          ...data, // idを含まないデータ本体を展開
        } as Book; // 最終的に Book 型であることを明示
      });

      return books;
    } catch (error) {
      console.error('Error fetching books from Firestore:', error);
      // エラー発生時は空のリストまたは適切なエラーを返す
      return [];
    }
  }

  // findOneメソッドは、IDで特定の書籍を取得するロジックに更新できます
  findOne(id: number) {
    // 実際には getDoc(doc(this.booksCollection, id.toString())) のようなロジックが必要
    return `This action returns a #${id} bookList (DB logic pending)`;
  }

  create() {
    return 'This action adds a new bookList (DB logic pending)';
  }
}
