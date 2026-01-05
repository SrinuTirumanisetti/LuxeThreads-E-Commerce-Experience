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

import com.estore.api.estoreapi.model.ShoppingCartItem;
import com.estore.api.estoreapi.repository.ShoppingCartRepository;

@Tag("Service-tier")
public class ShoppingCartServiceTest {

    private ShoppingCartRepository mockShoppingCartRepository;
    private ShoppingCartService shoppingCartService;

    @BeforeEach
    public void setup() {
        mockShoppingCartRepository = mock(ShoppingCartRepository.class);
        shoppingCartService = new ShoppingCartService(mockShoppingCartRepository);
    }

    @Test
    public void testGetItemsInShoppingCartFiltersOrderedItems() throws IOException {
        // Setup
        int userID = 10;
        List<ShoppingCartItem> items = new ArrayList<>();
        items.add(new ShoppingCartItem());

        when(mockShoppingCartRepository.findByUserIDAndOrderIDIsNull(userID)).thenReturn(items);

        // Invoke
        ShoppingCartItem[] result = shoppingCartService.getItemsInShoppingCart(userID);

        // Analyze
        assertEquals(1, result.length);
        verify(mockShoppingCartRepository).findByUserIDAndOrderIDIsNull(userID);
    }
}
