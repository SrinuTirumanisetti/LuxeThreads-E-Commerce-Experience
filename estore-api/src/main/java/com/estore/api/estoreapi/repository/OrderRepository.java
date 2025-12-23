package com.estore.api.estoreapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.estore.api.estoreapi.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserID(int userID);
}
