import { Controller, Get, Param } from '@nestjs/common';
import { BookListService } from './book-list.service';
import { Book } from './entities/book-list.entity';

@Controller('books')
export class BookListController {
  // BookListServiceを注入
  constructor(private readonly bookListService: BookListService) {}

  /**
   * GET /books
   * 書籍の一覧を取得します。
   */
  @Get()
  async findAll(): Promise<Book[]> {
    // サービス層の findAll() メソッドを呼び出し、書籍リストを取得
    const books = await this.bookListService.findAll();

    // データが空の場合でも、ここではNotFoundではなく空の配列を返します
    return books;
  }

  /**
   * GET /books/:id
   * 特定の書籍の詳細を取得します。（findAll() に合わせて型定義を更新）
   */
  @Get(':id')
  findOne(@Param('id') id: string): string {
    // 実際にはサービス層でFirestoreからデータを取得するロジックが必要です
    // findOne(id) メソッドはまだ未実装のため、サービスからの文字列をそのまま返します
    const result = this.bookListService.findOne(parseInt(id, 10));
    return result;
  }
}
