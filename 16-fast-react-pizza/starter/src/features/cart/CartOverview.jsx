import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {

  const numOfPizzas=useSelector(getTotalCartQuantity)
  const pricefPizzas=useSelector(getTotalCartPrice)

  if (!numOfPizzas) return null

  return (
    <div className="flex items-center justify-between px-4 py-4 text-sm uppercase bg-stone-800 text-stone-200 sm:px-6 md:text-base" >
      <p className="p-4 space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{numOfPizzas} pizzas</span>
        <span>{formatCurrency(pricefPizzas)}</span>
      </p>
      <Link className="uppercase" to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
