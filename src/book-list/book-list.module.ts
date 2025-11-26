import { Module } from '@nestjs/common';
import { BookListService } from './book-list.service';
import { BookListController } from './book-list.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  // FirebaseService を BookListService に注入できるように、FirebaseModuleをインポート
  imports: [FirebaseModule],
  controllers: [BookListController],
  providers: [BookListService],
  // 他のモジュールから BookListService を利用可能にする場合は exports に追加
  // exports: [BookListService]
})
export class BookListModule {}
