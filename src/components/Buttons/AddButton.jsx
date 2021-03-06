import React from "react";
import { connect } from "react-redux";
import { Button } from "./ButtonTemplate";

class AddButton extends React.Component {
    addItem = () => {
      let { cartItems } = this.props;
      cartItems = addItemsToCart(cartItems, this.props.product);
      this.props.dispatch({
        type: "UPDATE_ITEM_LIST",
        payload: [...cartItems]
      });
    };

    render() {
      return <Button onClick={this.addItem}>{this.props.children}</Button>
    }
  }

export default connect(store => ({ cartItems: store.cart.cartItems }))(AddButton);

function addItemsToCart(cartItems, product) {
  let items = cartItems.filter(x => x.id === product.id);
  if (items.length === 0) {
    cartItems.push({ ...product, quantity: 1 });
  } else {
    cartItems.map(x => {
      if (x.id === product.id) {
        x.quantity += 1;
      }
      return x;
    })
  }
  return cartItems;
}