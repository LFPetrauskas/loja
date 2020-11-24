import React from 'react';
import AddButton from '../Buttons/AddButton';
import RemoveButton from '../Buttons/RemoveButton';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Cart(props) {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  React.useEffect(() => {
    let { cartItems } = cart;
    let total =
      cartItems.length > 0
        ? cartItems
            .map((x) => x.quantity * x.price)
            .reduce((x, y) => x + y)
            .toFixed(2)
        : 0;
    dispatch({ type: 'SET_TOTAL', payload: total });
  }, [props, dispatch]);

  return (
    <Div>
      <DivAux>
        <Link to={'/'}>
          <Button>{`<`}</Button>
        </Link>
        <DivQtdeItems>
          Itens:{' '}
          {cart.cartItems.length > 0
            ? cart.cartItems.map((x) => x.quantity).reduce((x, y) => x + y)
            : 0}
        </DivQtdeItems>
        <DivTotal>R$ {props.total}</DivTotal>
        <Button
          onClick={() =>
            dispatch({
              type: props.expanded ? 'COLLAPSE_CART' : 'EXPAND_CART',
            })
          }
        >
          <img
            alt="Ícone do carrinho de compras"
            width="20px"
            height="20px"
            src="https://image.flaticon.com/icons/png/512/126/126510.png"
          />
        </Button>
      </DivAux>
      {props.expanded
        ? cart.cartItems.map((item) => (
            <DivCarItems>
              <div key={item.id}>
                <h4>{item.name}</h4>
                <Section>Quantidade: {item.quantity}</Section>
                <Section> R$ {item.price} (por unidade)</Section>
                <Section>Código: {item.id}</Section>
                <Section>
                  <AddButton product={item}>+</AddButton>
                  <RemoveButton product={item}>-</RemoveButton>
                </Section>
              </div>
            </DivCarItems>
          ))
        : false}
    </Div>
  );
}

export default Cart;

const DivQtdeItems = styled.div`
  /* margin-left: 10px;
  margin-right: 10px;
  width: fit-content; */
`;

const DivTotal = styled.div`
  align-items: center;
  left: 0px;
  margin-left: 10px;
  margin-right: 10px;
  width: fit-content;
`;

const Div = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
  height: 100%;
  justify-content: flex-start;
  margin: 1vh;
`;

const DivCarItems = styled.div`
  background-color: #fefefe;
  border: 1px solid #222222;
  color: #222222;
  padding: 0px 10px 10px 10px;
`;

const DivAux = styled.div`
  display: flex;
  margin: 10px;
`;

const Button = styled.button`
  border: 1px solid #222222;
  padding: 5px 10px 5px 10px;
`;

const Section = styled.section`
  font-size: 1rem;
  margin: 5px;
`;
