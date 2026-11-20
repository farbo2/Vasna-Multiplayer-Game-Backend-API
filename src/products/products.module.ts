import { AdminGuard } from '../guards/jwt-auth/admin.guard';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductCategoriesRepository } from './product-category.repository';
import { UserPurchasesRepository } from './user-purchase.repository';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';
import { UserPurchase } from './entities/user-purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory, UserPurchase])],
  providers: [AdminGuard, 
    ProductsService,
    ProductsRepository,
    ProductCategoriesRepository,
    UserPurchasesRepository,
    JwtAuthGuard,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
