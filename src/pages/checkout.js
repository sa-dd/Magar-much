import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMoneyBill1Wave, faCreditCard} from '@fortawesome/free-solid-svg-icons'

export default function Checkout(){
    const [items, setItems] = useState([]);
    const [payment, setPayment] = useState('');


    const handleOption= (event) => {
        setPayment(event.target.value); 
    }

    useEffect(()=>{
        const item = localStorage.getItem("cartList");
        setItems(JSON.parse(item))
        console.log(payment);
    },[payment])

    return (
        <div className="checkout">
            <div className="order-sum">Order Summary</div>
            <div className="summary-table"> 

                <div className='sum-item-cont'>
        {
            items.map((item)=> {
                return (<span key={item.Name}>  
                    <span className="sum-item">
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

                <input type='radio' id='onCash' name='onCash' value='oncash' checked={payment === 'oncash'} onChange={handleOption}/>
                <label className='p1'htmlFor='onCash'>
                    <FontAwesomeIcon icon={faMoneyBill1Wave} size='2xl'/>
                    <span> On Cash </span>
                </label>

                <input type='radio' id='onCard' name='onCard' value='oncard' checked={payment === 'oncard'} onChange={handleOption}/>
                <label className='p2'htmlFor='onCard'>
                    <FontAwesomeIcon icon={faCreditCard} size='2xl'/>
                    <span> On Card </span>
                </label>

            </div>

        </span>

            <span className="total-title"> Your Total : </span>
    </div>


</div>
</div>
    )
}
