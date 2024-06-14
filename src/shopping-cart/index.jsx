import "./index.scss";
import NavBar from "./components/NavBar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import FoodsCategory from "./components/FoodsCategory";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetFoodsList } from "../store/modules/shoppingCartStore";

const ShoppingCart = () => {
  const { foodsList, activeIndex } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetFoodsList());
  }, [dispatch]);
  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu />

          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {foodsList.map((item, index) => {
                return (
                  activeIndex === index && (
                    <FoodsCategory
                      key={item.tag}
                      // 列表标题
                      name={item.name}
                      // 列表商品
                      foods={item.foods}
                    />
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 购物车 */}
      <Cart />
    </div>
  );
};

export default ShoppingCart;
