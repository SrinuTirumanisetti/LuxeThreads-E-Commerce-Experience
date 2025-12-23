package com.estore.api.estoreapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "users")
public class User {
    static final String STRING_FORMAT = "User [id=%d, name=%s]";

    @Id
    @JsonProperty("id")
    private int id;
    @JsonProperty("name")
    private String name;

    public User() {
    }

    public User(@JsonProperty("id") int id, @JsonProperty("name") String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return String.format(STRING_FORMAT, id, name);
    }

}
