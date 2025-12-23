package com.estore.api.estoreapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.estore.api.estoreapi.model.Order;

import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o FROM Order o WHERE o.userID = ?1")
    List<Order> findByUserID(int userID);
}
