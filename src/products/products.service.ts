import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { ProductCategoriesRepository } from './product-category.repository';
import { UserPurchasesRepository } from './user-purchase.repository';
import { createProductDto } from './dtos/create-product.dto';
import { updateProductDto } from './dtos/update-product.dto';
import { createProductCategoryDto } from './dtos/create-product-category.dto';
import { updateProductCategoryDto } from './dtos/update-product-category.dto';
import { createUserPurchaseDto } from './dtos/create-user-purchase.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepo: ProductsRepository,
    @InjectRepository(ProductCategoriesRepository)
    private productCategoriesRepo: ProductCategoriesRepository,
    @InjectRepository(UserPurchasesRepository)
    private userPurchasesRepo: UserPurchasesRepository,
  ) {}

  async createProduct(data: createProductDto) {
    const product = this.productsRepo.create(data);

    return this.productsRepo.save(product);
  }

  async findProductById(id: number) {
    try {
      this.logger.log('Attempting to fetch a Product by Id');
      const product = await this.productsRepo.findProductById(id);
      if (!product) {
        this.logger.warn('No Product record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Product with ID ${id}`);
      return product;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Product by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Product data. Please try again later',
      );
    }
  }

  async findProductsByCategoryId(categoryId: number) {
    try {
      this.logger.log('Attempting to fetch a Products by Category Id');
      const products =
        await this.productsRepo.findProductsByCategoryId(categoryId);
      if (!products) {
        this.logger.warn('No Product record found in the database');
        return null;
      }
      this.logger.log(
        `Successfully fetched Products with Category ID ${categoryId}`,
      );
      return products;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Products by Category ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Product data. Please try again later',
      );
    }
  }

  async findAllProducts() {
    try {
      this.logger.log('Attempting to fetch Products');
      const products = await this.productsRepo.findAllProducts();
      if (!products) {
        this.logger.warn('No Products record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Products`);
      return products;
    } catch (error) {
      this.logger.error('Error occurred while fetching Products', error.stack);
      throw new InternalServerErrorException(
        'An error occurred while retrieving Products data. Please try again later',
      );
    }
  }
  async deleteProduct(productId: number) {
    this.productsRepo.deleteProduct(productId);
  }

  async updateProduct(productId: number, updateData: updateProductDto) {
    this.productsRepo.updateProduct(productId, updateData);
    return { message: 'Product Updated' };
  }

  //Product Category Services
  async createProductCategory(data: createProductCategoryDto) {
    const productCategory = this.productCategoriesRepo.create(data);

    return this.productCategoriesRepo.save(productCategory);
  }

  async findProductCategoryById(id: number) {
    try {
      this.logger.log('Attempting to fetch a Product Category by Id');
      const productCategory =
        await this.productCategoriesRepo.findProductCategoryById(id);
      if (!productCategory) {
        this.logger.warn('No Product Category record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Product Category with ID ${id}`);
      return productCategory;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Product Category by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Product Category data. Please try again later',
      );
    }
  }

  async findAllProductCategories() {
    try {
      this.logger.log('Attempting to fetch Product Categories');
      const productCategories =
        await this.productCategoriesRepo.findAllProductCategories();
      if (!productCategories) {
        this.logger.warn('No Product Categories record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched Product Categories`);
      return productCategories;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching Product Categories',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving Product Categories data. Please try again later',
      );
    }
  }
  async deleteProductCategory(productCategoryId: number) {
    this.productCategoriesRepo.deleteProductCategory(productCategoryId);
  }

  async updateProductCategory(
    productCategoryId: number,
    updateData: updateProductCategoryDto,
  ) {
    this.productCategoriesRepo.updateProductCategory(
      productCategoryId,
      updateData,
    );
    return { message: 'Product Category Updated' };
  }

  //User Purchase Services
  async createUserPurchase(data: createUserPurchaseDto) {
    const userPurchase = this.userPurchasesRepo.create(data);

    return this.userPurchasesRepo.save(userPurchase);
  }

  async findUserPurchasesByUserId(id: number) {
    try {
      this.logger.log('Attempting to fetch a User Purchase by Id');
      const userPurchases =
        await this.userPurchasesRepo.findUserPurchasesByUserId(id);
      if (!userPurchases) {
        this.logger.warn('No User Purchases record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched User Purchases with ID ${id}`);
      return userPurchases;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching User Purchases by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving User Purchases data. Please try again later',
      );
    }
  }

  async findUserPurchaseById(id: number) {
    try {
      this.logger.log('Attempting to fetch a User Purchase by Id');
      const userPurchase =
        await this.userPurchasesRepo.findUserPurchaseById(id);
      if (!userPurchase) {
        this.logger.warn('No User Purchase record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched User Purchase with ID ${id}`);
      return userPurchase;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching User Purchase by ID',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving User Purchase data. Please try again later',
      );
    }
  }

  async findAllUserPurchases() {
    try {
      this.logger.log('Attempting to fetch User Purchases');
      const userPurchases = await this.userPurchasesRepo.findAllUserPurchases();
      if (!userPurchases) {
        this.logger.warn('No User Purchases record found in the database');
        return null;
      }
      this.logger.log(`Successfully fetched User Purchases`);
      return userPurchases;
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching User Purchases',
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving User Purchases data. Please try again later',
      );
    }
  }
  async deleteUserPurchase(userPurchaseId: number) {
    this.userPurchasesRepo.deleteUserPurchase(userPurchaseId);
  }

  async updateUserPurchase(
    userPurchaseId: number,
    updateData: updateProductCategoryDto,
  ) {
    this.userPurchasesRepo.updateUserPurchase(userPurchaseId, updateData);
    return { message: 'User Purchase Updated' };
  }
}
