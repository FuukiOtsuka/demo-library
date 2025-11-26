// src/types/entities.ts (想定される内容)
export interface Book {
  author: string; // 著者名
  categoryId: string; // カテゴリID（外部キー）
  createdAt: string; // 作成日時 (ISO文字列)
  imageUrl: string; // 書籍の画像URL
  isAvailable: boolean; // 貸出可能かどうか (currentCopies > 0)
  isbn: string; // ISBNコード
  publisher: string; // 出版社名
  title: string; // 書籍のタイトル
  updatedAt: string; // 更新日時 (ISO文字列)
}
