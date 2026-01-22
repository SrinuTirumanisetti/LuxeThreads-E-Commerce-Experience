package com.estore.api.estoreapi.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.estore.api.estoreapi.model.ShoppingCartItem;
import com.estore.api.estoreapi.repository.ShoppingCartRepository;

@Service
public class ShoppingCartService {

    private ShoppingCartRepository repository;
    private ProductService productService;

    public ShoppingCartService(ShoppingCartRepository repository, ProductService productService) {
        this.repository = repository;
        this.productService = productService;
    }

    public ShoppingCartItem[] getItemsInShoppingCart(int userID) throws IOException {
        List<ShoppingCartItem> items = repository.findByUserIDAndOrderIDIsNull(userID);
        return items.toArray(new ShoppingCartItem[0]);
    }

    public ShoppingCartItem getShoppingCartItem(int id) throws IOException {
        Optional<ShoppingCartItem> item = repository.findById(id);
        return item.orElse(null);
    }

    @Transactional
    public void addItemtoShoppingCart(ShoppingCartItem shoppingCartItem) throws IOException {
        boolean reserved = productService.decrementStock(shoppingCartItem.getProductID(),
                shoppingCartItem.getShoppingCartQuantity());
        if (!reserved) {
            throw new RuntimeException("Product is out of stock or insufficient quantity");
        }
        repository.save(shoppingCartItem);
    }

    @Transactional
    public void updateCart(ShoppingCartItem shoppingCartItem) throws IOException {
        Optional<ShoppingCartItem> existingItemOpt = repository.findById(shoppingCartItem.getShoppingCartID());
        if (existingItemOpt.isPresent()) {
            ShoppingCartItem existingItem = existingItemOpt.get();
            int delta = shoppingCartItem.getShoppingCartQuantity() - existingItem.getShoppingCartQuantity();

            if (delta > 0) {
                boolean reserved = productService.decrementStock(existingItem.getProductID(), delta);
                if (!reserved) {
                    throw new RuntimeException("Insufficient stock to increase quantity");
                }
            } else if (delta < 0) {
                productService.incrementStock(existingItem.getProductID(), Math.abs(delta));
            }

            existingItem.setShoppingCartQuantity(shoppingCartItem.getShoppingCartQuantity());
            repository.save(existingItem);
        }
    }

    @Transactional
    public boolean removeItemFromShoppingCart(int id) throws IOException {
        Optional<ShoppingCartItem> itemOpt = repository.findById(id);
        if (itemOpt.isPresent()) {
            ShoppingCartItem item = itemOpt.get();

            // Release product quantity
            productService.incrementStock(item.getProductID(), item.getShoppingCartQuantity());

            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public void clearShoppingCart(int userId) throws IOException {
        List<ShoppingCartItem> items = repository.findByUserIDAndOrderIDIsNull(userId);
        for (ShoppingCartItem item : items) {
            // Release product quantity
            productService.incrementStock(item.getProductID(), item.getShoppingCartQuantity());
        }
        repository.deleteByUserIDAndOrderIDIsNull(userId);
    }
}
