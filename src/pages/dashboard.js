import { useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import nookies from 'nookies'
import { useRouter } from 'next/router';


import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)
    const order = await fetch("http://localhost:8080/api/orders");
    const orderDetail = await fetch("http://localhost:8080/api/orderdetails");
    const foodItem = await fetch("http://localhost:8080/api/fooditems");
    const customer = await fetch("http://localhost:8080/api/customers");
    const deliveryBoy = await fetch("http://localhost:8080/api/deliveryboys");

    const orders = await order.json();

    const orderDetails = await orderDetail.json();

    const foodItems= await foodItem.json();

    const customers= await customer.json();

    const deliveryBoys = await deliveryBoy.json();

    return {
        props: {
            orders: orders,
            orderDetails: orderDetails,
            foodItems: foodItems,
            customers: customers,
            deliveryBoys: deliveryBoys,
            cookies: cookies
        }
    };

}


export default function Dashboard(props){
    const [tab, setTab] = useState("pending");
    const router = useRouter();

    const handleCancel = (id) =>{

        console.log("id is", id)

        fetch(`http://localhost:8080/api/ordercancelled/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        router.reload();


    }

    return (
        <div className="dashboard">
            <div className="arrow-back">
                <a className="fa-solid fa-arrow-down" href="/">
                    <FontAwesomeIcon icon={faArrowDown} size = "2x" />
                </a>
            </div>
            <span className="dash-title"> Your Orders </span>
            <div className="dash-tabs">
                <button className="pending"onClick={()=>setTab("pending")}> Pending </button>
                <button className="delivered"onClick={()=>setTab("Delivered")}> Delivered</button>
                <button className="cancelled" onClick={()=>setTab("Cancelled")}> Cancelled</button>
            </div>
            <table className="orderTable">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>CustomerID</th>
                        <th>DeliveryBoyID</th>
                        <th>OrderDate</th>
                        <th>DeliveryDate</th>
                        <th>TotalAmount</th>
                        <th>Status</th>
                        <th>PaymentMethod</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        {
            props.orders.map((order) =>{
                if(order.CustomerID ==  JSON.parse(props.cookies.user).ID && order.Status === tab){ 

                    return ( <tr key={order.OrderDate}className="orderTableItems">
                        <td key={order.ID}> {order.ID} </td>
                        <td> {order.CustomerID} </td>
                        <td> {order.DeliveryBoyID} </td>
                        <td> {order.OrderDate} </td>
                        <td> {order.DeliveryDate} </td>
                        <td> $ {order.TotalAmount} </td>
                        <td> {order.Status} </td>
                        <td> {order.PaymentMethod} </td>
                        <td> {tab === "pending" ? <button className="cancel" onClick={()=>handleCancel(order.ID)}> Cancel </button> : null}</td>
                    </tr>

                    )
                }
            }) 
        }
    </tbody>
</table>

    </div>
    )
}
