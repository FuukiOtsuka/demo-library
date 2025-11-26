/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsBoolean,
  IsOptional,
} from 'class-validator';

/**
 * 書籍登録 (POST /admin/books) 用のDTO
 * 管理者が新規書籍を追加する際に使用するデータ型
 */
export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  publisher: string;

  @IsNotEmpty()
  @IsString()
  // FirestoreではISBNをドキュメントIDとして使用することも考えられますが、
  // ここではフィールドとして定義
  isbn: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  memo?: string;

  // totalCopiesを削除
}

/**
 * 書籍情報更新 (PATCH /admin/books/:bookId) 用のDTO
 * 管理者が書籍情報を変更する際に使用するデータ型
 */
export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  memo?: string;

  // totalCopiesを削除

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean; // 貸出可否フラグを直接変更（緊急時など）
}
