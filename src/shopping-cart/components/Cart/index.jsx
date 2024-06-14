import classNames from "classnames";
import Count from "../Count";
import "./index.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  reduceCart,
  clearCart,
} from "../../../store/modules/shoppingCartStore";

const Cart = () => {
  const { cartList } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const cartAllCount = cartList.reduce((total, item) => total + item.count, 0);
  const cartAllPrice = cartList
    .reduce((total, item) => total + item.count * item.price, 0)
    .toFixed(2);
  const [showVisible, setShowVisible] = useState(false);
  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div
        className={classNames("cartOverlay", { visible: showVisible })}
        onClick={() => setShowVisible(!showVisible)}
      />
      <div className="cart" onClick={() => setShowVisible(!showVisible)}>
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div className={classNames("icon", { fill: cartList.length > 0 })}>
          {cartList.length > 0 && (
            <div className="cartCornerMark">{cartAllCount}</div>
          )}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {cartAllPrice}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {cartAllPrice >= 20 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames("cartPanel", { visible: showVisible })}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={() => dispatch(clearCart())}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cartList.map((item) => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    count={item.count}
                    onPlus={() => dispatch(addToCart(item))}
                    onMinus={() => dispatch(reduceCart(item))}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
