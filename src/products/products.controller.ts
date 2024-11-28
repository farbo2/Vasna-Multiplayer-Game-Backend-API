import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  //PRODUCT HANDLERS
  @Get()
  getAllProducts() {}

  @Get('/:id')
  getProductById(@Param('id') id: number) {}

  @Post()
  createProduct(@Body() body: any) {}

  @Patch()
  updateProduct(@Param('id') id: number, @Body() body: any) {}

  @Delete('/:id')
  removeProduct(@Param('id') id: number) {}

  // PRODUCT CATEGORY HANDLERS
  @Get('/category')
  getAllProductCategories() {}

  @Get('/category/:id')
  getProductCategoryById(@Param('id') id: number) {}

  @Post('/category')
  createProductCategory(@Body() body: any) {}

  @Patch('/category')
  updateProductCategory(@Param('id') id: number, @Body() body: any) {}

  @Delete('/category/:id')
  removeProductCategory(@Param('id') id: number) {}

  //USER PURCHASE HANDLERS
  @Get('/purchase')
  getAllPurchases() {}

  @Get('/purchase/:id')
  getPurchaseById(@Param('id') id: number) {}

  @Get('/purchase/user/:userid')
  getAllPurchasesByUserId(@Param('userid') userId: number) {}

  @Post('/purchase')
  createPurchase(@Body() body: any) {}

  @Patch('/purchase/:id')
  updatePurchase(@Param('id') id: number, @Body() body: any) {}

  @Delete('/purchase/:id')
  removePurchaseById(@Param('id') id: number) {}
}
