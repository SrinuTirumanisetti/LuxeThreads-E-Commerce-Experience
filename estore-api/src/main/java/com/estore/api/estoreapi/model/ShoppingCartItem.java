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
    private int shoppingCartId;

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

    // Optional: link to Order if needed for JPA bidirectional, but strict mapping
    // not required if unidi
    // private Integer order_id;

    public ShoppingCartItem() {
    }

    public ShoppingCartItem(@JsonProperty("shoppingCartID") int shoppingCartId,
            @JsonProperty("productID") int productID, @JsonProperty("color") String color,
            @JsonProperty("size") String size, @JsonProperty("image") String image, @JsonProperty("userID") int userID,
            @JsonProperty("shoppingCartQuantity") int shoppingCartQuantity) {
        this.shoppingCartId = shoppingCartId;
        this.productID = productID;
        this.color = color;
        this.size = size;
        this.image = image;
        this.userID = userID;
        this.shoppingCartQuantity = shoppingCartQuantity;
    }

    public int getProductId() {
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

    public int getUserId() {
        return this.userID;
    }

    public void setUserId(int userID) {
        this.userID = userID;
    }

    public int getshoppingCartQuantity() {
        return this.shoppingCartQuantity;
    }

    public void setshoppingCartQuantity(int shoppingCartQuantity) {
        this.shoppingCartQuantity = shoppingCartQuantity;
    }

    public int getShoppingCartId() {
        return this.shoppingCartId;
    }

    public void setShoppingCartId(int shoppingCartId) {
        this.shoppingCartId = shoppingCartId;
    }

}
