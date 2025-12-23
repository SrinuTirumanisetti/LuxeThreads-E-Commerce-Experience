package com.estore.api.estoreapi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "shopping_cart_item")
public class ShoppingCartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shopping_cart_id")
    @JsonProperty("shoppingCartID")
    private int shoppingCartID;

    @Column(name = "product_id")
    @JsonProperty("productID")
    private int productID;

    @JsonProperty("color")
    private String color;
    @JsonProperty("size")
    private String size;
    @JsonProperty("image")
    private String image;

    @Column(name = "user_id")
    @JsonProperty("userID")
    private int userID;

    @Column(name = "shopping_cart_quantity")
    @JsonProperty("shoppingCartQuantity")
    private int shoppingCartQuantity;

    public ShoppingCartItem() {
    }

    public ShoppingCartItem(@JsonProperty("shoppingCartID") int shoppingCartID,
            @JsonProperty("productID") int productID, @JsonProperty("color") String color,
            @JsonProperty("size") String size, @JsonProperty("image") String image, @JsonProperty("userID") int userID,
            @JsonProperty("shoppingCartQuantity") int shoppingCartQuantity) {
        this.shoppingCartID = shoppingCartID;
        this.productID = productID;
        this.color = color;
        this.size = size;
        this.image = image;
        this.userID = userID;
        this.shoppingCartQuantity = shoppingCartQuantity;
    }

    public int getProductID() {
        return this.productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }

    public String getColor() {
        return this.color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return this.size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getShoppingCartQuantity() {
        return this.shoppingCartQuantity;
    }

    public void setShoppingCartQuantity(int shoppingCartQuantity) {
        this.shoppingCartQuantity = shoppingCartQuantity;
    }

    public int getShoppingCartID() {
        return this.shoppingCartID;
    }

    public void setShoppingCartID(int shoppingCartID) {
        this.shoppingCartID = shoppingCartID;
    }

    @Override
    public String toString() {
        return "ShoppingCartItem [ID=" + shoppingCartID + ", product=" + productID + ", qty=" + shoppingCartQuantity
                + "]";
    }
}
