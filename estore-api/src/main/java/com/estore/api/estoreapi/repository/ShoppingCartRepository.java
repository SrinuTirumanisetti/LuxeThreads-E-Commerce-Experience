package com.estore.api.estoreapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.estore.api.estoreapi.model.ShoppingCartItem;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCartItem, Integer> {
    List<ShoppingCartItem> findByUserID(int userID);

    void deleteByUserID(int userID);
}
