package com.estore.api.estoreapi.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.estore.api.estoreapi.model.User;
import com.estore.api.estoreapi.repository.UserRepository;

@Service
public class UserService {

    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    // public User[] getUsers() throws IOException {
    // return repository.findAll().toArray(new User[0]);
    // }

    public User getUser(int id) throws IOException {
        Optional<User> user = repository.findById(id);
        return user.orElse(null);
    }

    public User createUser(User user) throws IOException {
        return repository.save(user);
    }

    public User updateUser(User user) throws IOException {
        if (repository.existsById(user.getId())) {
            return repository.save(user);
        }
        return null;
    }

    public boolean deleteUser(int id) throws IOException {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
