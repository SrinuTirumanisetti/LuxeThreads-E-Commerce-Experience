package com.estore.api.estoreapi.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.estore.api.estoreapi.service.ProductService;
import com.estore.api.estoreapi.model.Product;

@Tag("Controller-tier")
public class ProductControllerTest {
  private ProductController productController;
  private ProductService mockProductService;

  @BeforeEach
  public void setupProductController() {
    mockProductService = mock(ProductService.class);
    productController = new ProductController(mockProductService);
  }

  @Test
  public void testGetProduct() throws IOException {
    Product product = new Product(4, "placeholder", 8.0f, 100, "Just a placeholder", "Placeholder", "img");
    when(mockProductService.getProduct(product.getId())).thenReturn(product);

    ResponseEntity<Product> response = productController.getProduct(product.getId());

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(product, response.getBody());
  }

  @Test
  public void testGetProductNotFound() throws Exception {
    int productId = 99;
    when(mockProductService.getProduct(productId)).thenReturn(null);

    ResponseEntity<Product> response = productController.getProduct(productId);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
  }

  @Test
  public void testGetProductHandleException() throws Exception {
    int productId = 99;
    doThrow(new IOException()).when(mockProductService).getProduct(productId);

    ResponseEntity<Product> response = productController.getProduct(productId);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }

  // @Test
  // public void testCreateProductFailed() throws IOException {
  // Product product = new Product(99,"Fake Product",99.99f,999);
  // when(mockProductService.createProduct(product)).thenReturn(null);

  // ResponseEntity<Product> response = productController.createProduct(product);
  // assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
  // }

  @Test
  public void testCreateProductHandleException() throws IOException {
    Product product = new Product(4, "placeholder", 8.0f, 100, "Just a placeholder", "Placeholder", "img");
    doThrow(new IOException()).when(mockProductService).createProduct(product);

    ResponseEntity<Product> response = productController.createProduct(product);
    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }

  @Test
  public void testUpdateProduct() throws IOException {
    Product product = new Product(4, "placeholder", 8.0f, 100, "Just a placeholder", "Placeholder", "img");
    when(mockProductService.updateProduct(product)).thenReturn(product);
    ResponseEntity<Product> response = productController.updateProduct(product);
    product.setName("Updated Fake Product");
    product.setPrice(11.11f);
    product.setQuantity(111);

    response = productController.updateProduct(product);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(product, response.getBody());
  }

  @Test
  public void testSearchProducts() throws IOException {
    String searchString = "Fak";
    Product[] products = new Product[2];
    products[0] = new Product(4, "placeholder", 8.0f, 100, "Just a placeholder", "Placeholder", "img1");
    products[1] = new Product(4, "Another placeholder", 8.0f, 100, "Just a placeholder", "Placeholder", "img2");

    when(mockProductService.findProducts(searchString)).thenReturn(products);
    ResponseEntity<Product[]> response = productController.searchProducts(searchString);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(products, response.getBody());
  }

  @Test
  public void testSearchProductsHandleException() throws IOException {
    String searchString = "Fak";
    doThrow(new IOException()).when(mockProductService).findProducts(searchString);

    ResponseEntity<Product[]> response = productController.searchProducts(searchString);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }

  @Test
  public void testDeleteProduct() throws IOException {
    int productId = 99;
    when(mockProductService.deleteProduct(productId)).thenReturn(true);

    ResponseEntity<Product> response = productController.deleteProduct(productId);

    assertEquals(HttpStatus.OK, response.getStatusCode());
  }

  @Test
  public void testDeleteProductNotFound() throws IOException {
    int productId = 99;
    when(mockProductService.deleteProduct(productId)).thenReturn(false);

    ResponseEntity<Product> response = productController.deleteProduct(productId);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
  }

  @Test
  public void testDeleteProductHandleException() throws IOException {
    int heroId = 99;

    doThrow(new IOException()).when(mockProductService).deleteProduct(heroId);

    ResponseEntity<Product> response = productController.deleteProduct(heroId);
    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }

}
