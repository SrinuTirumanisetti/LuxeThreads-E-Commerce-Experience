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

    public ShoppingCartService(ShoppingCartRepository repository) {
        this.repository = repository;
    }

    public ShoppingCartItem[] getItemsInShoppingCart(int userID) throws IOException {
        List<ShoppingCartItem> items = repository.findByUserID(userID);
        return items.toArray(new ShoppingCartItem[0]);
    }

    public ShoppingCartItem getShoppingCartItem(int id) throws IOException {
        Optional<ShoppingCartItem> item = repository.findById(id);
        return item.orElse(null);
    }

    public void addItemtoShoppingCart(ShoppingCartItem shoppingCartItem) throws IOException {
        repository.save(shoppingCartItem);
    }

    public void updateCart(ShoppingCartItem shoppingCartItem) throws IOException {
        if (repository.existsById(shoppingCartItem.getShoppingCartId())) {
            repository.save(shoppingCartItem);
        }
    }

    public boolean removeItemFromShoppingCart(int id) throws IOException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public void clearShoppingCart(int userId) throws IOException {
        repository.deleteByUserID(userId);
    }
}
