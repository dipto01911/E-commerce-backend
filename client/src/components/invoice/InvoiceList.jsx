import React, { useEffect } from 'react';
import CartStore from '../../store/CartStore';
import CartS from '../../skeleton/CartS';
import Nodata from '../layout/Nodata';
import { Link } from 'react-router-dom';

const InvoiceList = () => {

    const {InvoiceList,InvoiceListRequest}=CartStore();
    useEffect(()=>{
        (async()=>{
        await InvoiceListRequest();
        })()
    },[]);

    if(InvoiceList == null){
        return <CartS/>
    }
    else if(InvoiceList.length===0){
        return(
            <Nodata/>
        )
    }
    else{
     return (
        <div className='mt-3'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card p-4'>
                     <ul className='list-group list-group-flush'>
                     {
                        InvoiceList.map((item,i)=>{
                            return(
                                <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                    <div className="">
                                                        <p className="m-1"><b>Invoice No::</b> {item['tran_id']}</p>
                                                        <p className="m-1"><b>Customer:</b> {item['cus_details']}</p>
                                                        <p className="m-1"><b>Shipping: </b>{item['ship_details']}</p>
                                                        <p className="m-1"><b>Payment: </b>{item['payment_status']}</p>
                                                        <p className="m-1"><b>Delivery: </b> {item['delivery_status']}</p>
                                                    </div>
                                                </div>
                                               <Link className="btn btn-success" to={`/invoice/${item['_id']}`}>Details</Link>
                                            </li>

                            )
                        })
                     }
                     </ul>
                    </div>

                </div>

            </div>
        </div>
    );
}
};

export default InvoiceList;