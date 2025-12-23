package com.estore.api.estoreapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "product")
public class Product {
    static final String STRING_FORMAT = "Product [id=%d, name=%s price=%f quantity=%d description=%s type=%s]";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;

    @JsonProperty("name")
    private String name;
    @JsonProperty("price")
    private float price;
    @JsonProperty("quantity")
    private int quantity;
    @JsonProperty("description")
    private String description;
    @JsonProperty("type")
    private String type;
    @JsonProperty("image")
    private String image;

    public Product() {
    }

    public Product(@JsonProperty("id") int id, @JsonProperty("name") String name, @JsonProperty("price") float price,
            @JsonProperty("quantity") int quantity, @JsonProperty("description") String description,
            @JsonProperty("type") String type, @JsonProperty("image") String image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.type = type;
        this.image = image;
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

    public void setPrice(float price) {
        this.price = price;
    }

    public float getPrice() {
        return price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return this.image;
    }

    @Override
    public String toString() {
        return String.format(STRING_FORMAT, id, name, price, quantity, description, type);
    }
}