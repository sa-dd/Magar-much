import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMoneyBill1Wave, faCreditCard} from '@fortawesome/free-solid-svg-icons'
import Success from './orderSuccess'
import {useRouter} from 'next/router'

export default function Checkout(){
    const [items, setItems] = useState([]);
    const [payment, setPayment] = useState('');
    const [amount, setAmount] = useState(0);
    const [orderID, setOrderid] = useState(0);
    const [cartItemQuantity, setCartItemQuantity] = useState([]);


    const handleOption= (event) => {
        setPayment(event.target.value); 
    }
    const router = useRouter();

    useEffect(()=>{
        const item = localStorage.getItem("cartList");
        const quant = localStorage.getItem("itemQuantity");
        setAmount(localStorage.getItem("totalAmount"));
        setItems(JSON.parse(item))
        setCartItemQuantity(JSON.parse(quant));
        const newTotal = items.reduce((total, item) => total + item.Price * cartItemQuantity[item.ID],0);
        if(payment === "Credit Card") setAmount(newTotal-2.5);
        else setAmount(newTotal);
    },[payment])


    useEffect(() => {
        if(orderID){
            items.map((item) => {

                const food = {
                    OrderID: orderID,
                    FoodItemID: item.ID,
                    Quantity: cartItemQuantity[item.ID]
                }

                fetch('http://localhost:8080/api/takeorderdetail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(food)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }) 

        router.push('./orderSuccess');
        }
    }, [orderID])


    const handleOrder = () => {
        let orderID = 0;

        const data = {
            CustomerID: JSON.parse(localStorage.user).ID,
            TotalAmount: amount,
            Status: "pending",
            PaymentMethod: payment , 
        }
        fetch('http://localhost:8080/api/takeorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                setOrderid(data[0][""])
                console.log('Success:', orderID);
            })
            .catch((error) => {
                console.error('Error:', error);
            });




    }


    return (<div className="checkout">
        <div className="order-sum">Order Summary</div>
        <div className="summary-table"> 

            <div className='sum-item-cont'>
        {
            items.map((item)=> {
                return (<span key={item.Name}>  
                    <span className="sum-item">
                        <div className="sum-item-q"> {cartItemQuantity[item.ID]} x </div>
                        <img src={`http://localhost:8080${item.Image}`} />
                        <span> {item.Name} </span>
                    </span>
                </span>)
            }
            )
        }


    </div>

    <div className="bill"> 

        <span className="payment"> 
            <span className="pay-title"> Select Payment Method : </span>

            <div className="pay-method">

                <input type='radio' id='onCash' name='onCash' value='Cash' checked={payment === 'Cash'} onChange={handleOption}/>
                <label className='p1'htmlFor='onCash'>
                    <FontAwesomeIcon icon={faMoneyBill1Wave} size='2xl'/>
                    <span> On Cash </span>
                </label>

                <input type='radio' id='onCard' name='onCard' value='Credit Card' checked={payment === 'Credit Card'} onChange={handleOption}/>
                <label className='p2'htmlFor='onCard'>
                    <FontAwesomeIcon icon={faCreditCard} size='2xl'/>
                    <span> On Card </span>
                </label>

            </div>

        </span>
        <div className="total">
            <span className="total-title"> Your Total : </span>
            <span className="total-quantity">
        $ {amount}
    </span>

</div>

<button onClick={handleOrder} className='checkout-btn'> Proceed To Checkout </button>
    </div>


</div>
</div>)

}
