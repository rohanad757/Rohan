import React , { useContext , useEffect } from 'react';
import AppContext from '../../Context/AppContext.jsx';

const ConfirmOrder = () => {
    const { confirmOrder , PaymentAddr } = useContext(AppContext);
    useEffect(() => {
        console.log(confirmOrder);
        console.log(PaymentAddr);
    }, []);
  return (
    <div>
        {
            confirmOrder.length === 0 ? (" No Order Placed Yet ") : (<>
            {
                confirmOrder.map((item) => {
                    return (
                        <div key={item._id}>
                            <h3>Order ID : {item._id}</h3>
                            <h3>Order Date : {item.date}</h3>
                            <h3>Payment Address : {PaymentAddr}</h3>
                            <h3>Order Status : {item.status}</h3>
                            <h3>Order Total : {item.total}</h3>
                        </div>
                    )
                } )
            }
            </>)
        }
    </div>
  )
}

export default ConfirmOrder