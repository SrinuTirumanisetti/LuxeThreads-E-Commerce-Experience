package com.estore.api.estoreapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "estore_orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @javax.persistence.Column(name = "order_id")
    @JsonProperty("orderID")
    private int orderID;

    @javax.persistence.Column(name = "user_id")
    @JsonProperty("userID")
    private int userID;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    @JsonProperty("items")
    private List<ShoppingCartItem> items;

    @javax.persistence.Column(name = "order_date")
    @JsonProperty("orderDate")
    private String orderDate;

    @javax.persistence.Column(name = "address")
    @JsonProperty("address")
    private String address;

    public Order() {
    }

    public Order(@JsonProperty("orderID") int orderID, @JsonProperty("userID") int userID,
            @JsonProperty("items") List<ShoppingCartItem> items, @JsonProperty("orderDate") String orderDate,
            @JsonProperty("address") String address) {
        this.orderID = orderID;
        this.userID = userID;
        this.items = items;
        this.orderDate = orderDate;
        this.address = address;
    }

    public int getOrderID() {
        return this.orderID;
    }

    public int getUserId() {
        return this.userID;
    }

    public void setUserId(int userID) {
        this.userID = userID;
    }

    public List<ShoppingCartItem> getItems() {
        return this.items;
    }

    public void setItems(List<ShoppingCartItem> items) {
        this.items = items;
    }

    public String getOrderDate() {
        return this.orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
