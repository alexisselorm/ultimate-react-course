import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from '../cart/EmptyCart'
import store from '../../store';
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state==="submitting"

  const formErrors = useActionData();
  const {username,status:addressStatus,position,address,error:addressError} = useSelector(state=>state.user)
  const isLoadingAddress = addressStatus==='loading'
  
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice =withPriority ? totalCartPrice*0.2 : 0
  const totalPrice = totalCartPrice+priorityPrice

  const dispatch=useDispatch();

  if (!cart.length) {
    return <EmptyCart/>
  }


  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className=" input grow" type="text" defaultValue={username} name="customer" required />
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="w-full input" type="tel" name="phone" required />
          {formErrors?.phone && <p className="p-2 text-xs text-red-500 bg-red-100 rounded-full">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="relative flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="w-full input" disabled={isLoadingAddress} type="text" name="address" defaultValue={address} required />
             {addressStatus==='error' && <p className="p-2 text-xs text-red-500 bg-red-100 rounded-full">{addressError}</p>}
          </div>
          {
            !position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] sm:right-[5px] sm:top-[5px] z-50">
              <Button disabled={isLoadingAddress} type={'small'} onClick={(e)=>{
                e.preventDefault()
                dispatch(fetchAddress())}
                }>GetPosition</Button>
          </span>
            )
          }
      

        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-6 h-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          {/* <input type="hidden" name="position" value={position.longitude && position.latitude ?  `${position.latitude}, ${position.longitude}`:''}/> */}
          <Button type='primary' disabled={isSubmitting || isLoadingAddress}>{
          isSubmitting ? 'Placing Order':
          `Order now from ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const order = {
    ...data,
    cart:JSON.parse(data.cart),
    priority: data.priority === "true"
  }
  
  const newOrder=await createOrder(order)
  const errors ={}
  if (!isValidPhone(order.phone)) {
    errors.phone="Please give us your correct phone number we will need it contact you"
  }
  if (Object.keys(errors).length>0) {
    return errors;
  }

  // Create order and redirect
  console.log(newOrder);

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`);
}


export default CreateOrder;
