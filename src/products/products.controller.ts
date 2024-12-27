import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { updateProductDto } from './dtos/update-product.dto';
import { createUserPurchaseDto } from './dtos/create-user-purchase.dto';
import { updateUserPurchaseDto } from './dtos/update-user-purchase.dto';
import { ProductsService } from './products.service';
import { createProductDto } from './dtos/create-product.dto';
import { createProductCategoryDto } from './dtos/create-product-category.dto';
import { updateProductCategoryDto } from './dtos/update-product-category.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  //PRODUCT HANDLERS
  @Get()
  getAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get('/bycategory/:categoryId')
  getProductsByCategoryId(@Param('categoryId') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.findProductsByCategoryId(numericId);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.findProductById(numericId);
  }

  @Post()
  createProduct(@Body() body: createProductDto) {
    return this.productsService.createProduct(body);
  }

  @Patch()
  updateProduct(@Param('id') id: string, @Body() body: updateProductDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.updateProduct(numericId, body);
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.deleteProduct(numericId);
  }

  // PRODUCT CATEGORY HANDLERS
  @Get('/category')
  getAllProductCategories() {
    return this.productsService.findAllProductCategories();
  }

  @Get('/category/:id')
  getProductCategoryById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.findProductCategoryById(numericId);
  }

  @Post('/category')
  createProductCategory(@Body() body: createProductCategoryDto) {
    return this.productsService.createProductCategory(body);
  }

  @Patch('/category')
  updateProductCategory(
    @Param('id') id: string,
    @Body() body: updateProductCategoryDto,
  ) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.updateProductCategory(numericId, body);
  }

  @Delete('/category/:id')
  removeProductCategory(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.deleteProductCategory(numericId);
  }

  //USER PURCHASE HANDLERS
  @Get('/purchase')
  getAllPurchases() {
    return this.productsService.findAllUserPurchases();
  }

  @Get('/purchase/:id')
  getPurchaseById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.findUserPurchaseById(numericId);
  }

  @Get('/purchase/user/:userid')
  getAllPurchasesByUserId(@Param('userid') userId: string) {
    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.findUserPurchasesByUserId(numericUserId);
  }

  @Post('/purchase')
  createPurchase(@Body() body: createUserPurchaseDto) {
    return this.productsService.createUserPurchase(body);
  }

  @Patch('/purchase/:id')
  updatePurchase(@Param('id') id: string, @Body() body: updateUserPurchaseDto) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.updateUserPurchase(numericId, body);
  }

  @Delete('/purchase/:id')
  removePurchaseById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    return this.productsService.deleteUserPurchase(numericId);
  }
}
