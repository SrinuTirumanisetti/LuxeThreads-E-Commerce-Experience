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

import com.estore.api.estoreapi.service.ShoppingCartService;
import com.estore.api.estoreapi.model.ShoppingCartItem;

@Tag("Controller-tier")
public class ShoppingCartControllerTest {
  private ShoppingCartController shoppingCartController;
  private ShoppingCartService mockShoppingCartService;

  @BeforeEach
  public void setupShoppingCartController() {
    mockShoppingCartService = mock(ShoppingCartService.class);
    shoppingCartController = new ShoppingCartController(mockShoppingCartService);
  }

  @Test
  public void testgetItemsInShoppingCart() throws IOException {
    ShoppingCartItem[] items = new ShoppingCartItem[2];
    items[0] = new ShoppingCartItem(1, 4, "red", "S", "img1", 3, 1);
    items[1] = new ShoppingCartItem(2, 8, "blue", "M", "img2", 5, 10);

    when(mockShoppingCartService.getItemsInShoppingCart(items[0].getUserID())).thenReturn(items);

    ResponseEntity<ShoppingCartItem[]> response = shoppingCartController.getShoppingCartItems(items[0].getUserID());

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(items, response.getBody());
  }

  @Test
  public void testGetItemsInShoppingCartException() throws Exception {
    int id = 99;
    doThrow(new IOException()).when(mockShoppingCartService).getItemsInShoppingCart(id);

    ResponseEntity<ShoppingCartItem[]> response = shoppingCartController.getShoppingCartItems(id);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }

  @Test
  public void testAddItemToShoppingCart() throws IOException {
    ShoppingCartItem item = new ShoppingCartItem(11, 4, "red", "S", "img1", 3, 1);

    mockShoppingCartService.addItemtoShoppingCart(item);

    ResponseEntity<ShoppingCartItem> response = shoppingCartController.addItemToShoppingCart(item);

    assertEquals(HttpStatus.OK, response.getStatusCode());
  }

  @Test
  public void testAddItemToShoppingCartException() throws IOException {
    ShoppingCartItem item = new ShoppingCartItem(11, 4, "red", "S", "img1", 3, 1);

    doThrow(new IOException()).when(mockShoppingCartService).addItemtoShoppingCart(item);

    ResponseEntity<ShoppingCartItem> response = shoppingCartController.addItemToShoppingCart(item);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }

  @Test
  public void testRemoveItemFromShoppingCart() throws IOException {
    int id = 99;

    when(mockShoppingCartService.removeItemFromShoppingCart(id)).thenReturn(true);

    ResponseEntity<ShoppingCartItem> response = shoppingCartController.removeItemFromShoppingCart(id);

    assertEquals(HttpStatus.OK, response.getStatusCode());
  }

  @Test
  public void testRemoveItemFromShoppingCartNotFound() throws IOException {
    int id = 99;

    when(mockShoppingCartService.removeItemFromShoppingCart(id)).thenReturn(false);

    ResponseEntity<ShoppingCartItem> response = shoppingCartController.removeItemFromShoppingCart(id);

    assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
  }

  @Test
  public void testRemoveItemFromShoppingCartException() throws IOException {
    int id = 99;

    doThrow(new IOException()).when(mockShoppingCartService).removeItemFromShoppingCart(id);

    ResponseEntity<ShoppingCartItem> response = shoppingCartController.removeItemFromShoppingCart(id);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }

  @Test
  public void testClearShoppingCart() throws IOException {
    int id = 99;

    mockShoppingCartService.clearShoppingCart(id);

    ResponseEntity<ShoppingCartItem> response = shoppingCartController.clearShoppingCart(id);

    assertEquals(HttpStatus.OK, response.getStatusCode());
  }

  @Test
  public void testClearShoppingCartException() throws IOException {
    int id = 99;

    doThrow(new IOException()).when(mockShoppingCartService).clearShoppingCart(id);

    ResponseEntity<ShoppingCartItem> response = shoppingCartController.clearShoppingCart(id);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }

}
