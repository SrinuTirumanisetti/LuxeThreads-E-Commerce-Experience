package com.estore.api.estoreapi.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.estore.api.estoreapi.model.Order;
import com.estore.api.estoreapi.repository.OrderRepository;

@Service
public class OrderService {

    private OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public Order[] getOrders(int userID) throws IOException {
        List<Order> orders = repository.findByUserID(userID);
        return orders.toArray(new Order[0]);
    }

    public void addOrder(Order order) throws IOException {
        if (order.getItems() != null) {
            for (com.estore.api.estoreapi.model.ShoppingCartItem item : order.getItems()) {
                item.setShoppingCartId(0);
                item.setUserId(0);
            }
        }
        repository.save(order);
    }
}
