package com.estore.api.estoreapi.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.estore.api.estoreapi.model.Product;
import com.estore.api.estoreapi.repository.ProductRepository;

@Service
public class ProductService {

    private ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Product[] getProducts() throws IOException {
        List<Product> products = repository.findAll();
        return products.toArray(new Product[0]);
    }

    public Product[] findProducts(String containsText) throws IOException {
        List<Product> products = repository.findByNameContainingIgnoreCase(containsText);
        return products.toArray(new Product[0]);
    }

    public Product getProduct(int id) throws IOException {
        Optional<Product> product = repository.findById(id);
        return product.orElse(null);
    }

    public Product createProduct(Product product) throws IOException {
        return repository.save(product);
    }

    public Product updateProduct(Product product) throws IOException {
        if (repository.existsById(product.getId())) {
            return repository.save(product);
        }
        return null;
    }

    public boolean deleteProduct(int id) throws IOException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
