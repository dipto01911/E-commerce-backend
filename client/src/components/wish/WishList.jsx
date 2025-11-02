
import React, { useEffect } from 'react';
import WishStore from '../../store/WishStore';
import ProductS from '../../skeleton/ProductS';

import Nodata from '../layout/Nodata';
import { Link } from 'react-router-dom';

const WishList = () => {

    const {WishListRequest,Wishlist,RemoveWishListRequest}=WishStore();
//console.log(Wishlist);
    useEffect(()=>{
        (async()=>{
    await WishListRequest()
        })()
    },[])

    const remove=async(productID)=>{
        await RemoveWishListRequest(productID)
        await WishListRequest();
    }

    if(Wishlist===null){
        return(
            <div className='container'>
                <div className='row'>
               <ProductS/> 
                </div>
                
            </div>
        );
    }else if(Wishlist.length === 0){
        return(
<Nodata/>
        )
    }
    else{
return (
        <div className='container mt-3'>
            <div className='row'>
                {
                    Wishlist.map((item,i)=>{
                      
                       let price=<p className="bodyMedium  text-dark my-1">Price: ${item['product']['price']} </p>
                            if(item['product']['discount']===true){
                                price=<p className="bodyMedium  text-dark my-1">Price:<strike> ${item['product']['price']} </strike> ${item['product']['discountPrice']} </p>
                            }

                        return(
                            <div key={i} className='col-md-3 p-2 col-lg-3 col-sm-6 col-12'>

                            <div className='card shadow-sm h-100 rounded bg-white'>
                                <img  className="w-100 rounded-top-2" src={item.product.image} /> 
                                <div className='card-body'>
    <p className="bodySmall text-secondary my-1">{item['product']['title']}</p>
    {price}
            <p className="mt-3">
<button onClick={async ()=>{await remove(item['productID'])}} className="btn  btn-outline-danger btn-sm">Remove</button>
<Link className="btn mx-2 btn-outline-success btn-sm" to={`/details/${item['productID']}`}>Details</Link>
                     </p>

                                </div>
                                </div> 
                            </div>
                        )
                    })
                }
                </div> 
            
        </div>
    );
    }
    
};

export default WishList;