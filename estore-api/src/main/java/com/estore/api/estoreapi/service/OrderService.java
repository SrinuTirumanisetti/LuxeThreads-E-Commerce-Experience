package com.estore.api.estoreapi.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.estore.api.estoreapi.model.Order;
import com.estore.api.estoreapi.model.ShoppingCartItem;
import com.estore.api.estoreapi.repository.OrderRepository;
import com.estore.api.estoreapi.repository.ShoppingCartRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private OrderRepository repository;
    private ShoppingCartRepository shoppingCartRepository;

    public OrderService(OrderRepository repository, ShoppingCartRepository shoppingCartRepository) {
        this.repository = repository;
        this.shoppingCartRepository = shoppingCartRepository;
    }

    @Transactional(readOnly = true)
    public Order[] getOrders(int userID) throws IOException {
        List<Order> orders = repository.findByUserID(userID);
        return orders.toArray(new Order[0]);
    }

    @Transactional
    public void addOrder(Order order) throws IOException {
        // Fetch existing cart items to preserve their mapping and quantity reservation
        List<ShoppingCartItem> cartItems = shoppingCartRepository.findByUserIDAndOrderIDIsNull(order.getUserID());

        if (cartItems != null && !cartItems.isEmpty()) {
            for (ShoppingCartItem item : cartItems) {
                item.setOrder(order);
            }
            order.setItems(cartItems);
        }

        repository.save(order);
    }
}
