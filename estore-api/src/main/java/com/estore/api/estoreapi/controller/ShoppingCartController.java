package com.estore.api.estoreapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.estore.api.estoreapi.model.Product;
import com.estore.api.estoreapi.model.ShoppingCartItem;
import com.estore.api.estoreapi.service.ShoppingCartService;

@RestController
@RequestMapping("shoppingcart")
public class ShoppingCartController {
    private static final Logger LOG = Logger.getLogger(ShoppingCartController.class.getName());
    private ShoppingCartService shoppingCartService;

    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingCartItem[]> getShoppingCartItems(@PathVariable int id) {
        LOG.info("GET /shoppingcart/" + id);
        try {
            return new ResponseEntity<ShoppingCartItem[]>(shoppingCartService.getItemsInShoppingCart(id),
                    HttpStatus.OK);
        } catch (IOException e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("")
    public ResponseEntity<ShoppingCartItem> addItemToShoppingCart(@RequestBody ShoppingCartItem item) {
        LOG.info("POST /shoppingcart/" + item);

        try {
            shoppingCartService.addItemtoShoppingCart(item);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("")
    public ResponseEntity<ShoppingCartItem> updateCart(@RequestBody ShoppingCartItem item) {
        LOG.info("PUT /shoppingcart/" + item);

        try {
            shoppingCartService.updateCart(item);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ShoppingCartItem> removeItemFromShoppingCart(@PathVariable int id) {
        LOG.info("DELETE /shoppingcart/" + id);

        try {
            boolean removed = shoppingCartService.removeItemFromShoppingCart(id);
            if (removed == true)
                return new ResponseEntity<>(HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("")
    public ResponseEntity<ShoppingCartItem> clearShoppingCart(@RequestParam(value = "userID") int userID) {
        LOG.info("CLEAR /shoppingcart/" + userID);

        try {
            shoppingCartService.clearShoppingCart(userID);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
