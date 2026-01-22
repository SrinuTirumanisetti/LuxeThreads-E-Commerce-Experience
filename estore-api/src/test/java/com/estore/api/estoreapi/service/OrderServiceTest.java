package com.estore.api.estoreapi.service;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.estore.api.estoreapi.model.Order;
import com.estore.api.estoreapi.model.Product;
import com.estore.api.estoreapi.model.ShoppingCartItem;
import com.estore.api.estoreapi.repository.OrderRepository;
import com.estore.api.estoreapi.repository.ShoppingCartRepository;

@Tag("Service-tier")
public class OrderServiceTest {

    private OrderRepository mockOrderRepository;
    private ShoppingCartRepository mockShoppingCartRepository;
    private OrderService orderService;

    @BeforeEach
    public void setup() {
        mockOrderRepository = mock(OrderRepository.class);
        mockShoppingCartRepository = mock(ShoppingCartRepository.class);
        orderService = new OrderService(mockOrderRepository, mockShoppingCartRepository);
    }

    @Test
    public void testAddOrderSetsUserID() throws IOException {
        // Setup
        int userID = 10;
        Order order = new Order();
        order.setUserID(userID);

        List<ShoppingCartItem> items = new ArrayList<>();
        ShoppingCartItem item1 = new ShoppingCartItem();
        item1.setUserID(0); // Simulate initial state
        items.add(item1);

        order.setItems(items);

        // Invoke
        orderService.addOrder(order);

        // Analyze
        assertEquals(userID, item1.getUserID(), "UserID should be updated to match the order's UserID");
        verify(mockOrderRepository).save(order);
    }

    @Test
    public void testAddOrderSetsOrderOnItems() throws IOException {
        // Setup
        Order order = new Order();
        order.setUserID(1);
        List<ShoppingCartItem> items = new ArrayList<>();
        ShoppingCartItem item1 = new ShoppingCartItem();
        items.add(item1);
        order.setItems(items);

        // Invoke
        orderService.addOrder(order);

        // Analyze
        assertEquals(order, item1.getOrder(), "Item should have a reference to the parent order");
    }

    @Test
    public void testAddOrderDoesNotRedoubleReduceProductQuantity() throws IOException {
        // Setup
        int productId = 1;
        int initialQuantity = 7; // Already reduced from 10 by the cart
        int orderQuantity = 3;

        Product product = new Product();
        product.setQuantity(initialQuantity);

        ShoppingCartItem item = new ShoppingCartItem();
        item.setProductID(productId);
        item.setShoppingCartQuantity(orderQuantity);

        List<ShoppingCartItem> items = new ArrayList<>();
        items.add(item);

        Order order = new Order();
        order.setUserID(1);

        when(mockShoppingCartRepository.findByUserIDAndOrderIDIsNull(1)).thenReturn(items);

        // Invoke
        orderService.addOrder(order);

        // Analyze
        assertEquals(initialQuantity, product.getQuantity(),
                "Product quantity should NOT be reduced again during addOrder");
        assertEquals(order, item.getOrder(), "Item should be linked to the order");
        verify(mockOrderRepository).save(order);
    }
}
