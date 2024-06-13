import classNames from "classnames";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveIndex } from "../../../store/modules/shoppingCartStore";

const Menu = () => {
  const { foodsList, activeIndex } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const menus = foodsList.map((item) => ({ tag: item.tag, name: item.name }));
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((item, index) => {
        return (
          <div
            key={item.tag}
            className={classNames("list-menu-item", { active: index === activeIndex })}
            onClick={() => dispatch(changeActiveIndex(index))}
          >
            {item.name}
          </div>
        );
      })}
    </nav>
  );
};

export default Menu;
