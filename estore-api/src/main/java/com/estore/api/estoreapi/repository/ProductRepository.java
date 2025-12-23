package com.estore.api.estoreapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.estore.api.estoreapi.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCase(String text);
}
