package com.estore.api.estoreapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.estore.api.estoreapi.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
