import React, { useState } from 'react';
import ProductImages from './ProductImages';
import ProductStore from '../../store/ProductStore';
import DetailsS from '../../skeleton/DetailsS';
import parse from 'html-react-parser'
import ReviewList from './ReviewList';
import CartStore from '../../store/CartStore';
import toast from 'react-hot-toast';
import CartSubmitButton from '../cart/CartSubmitButton';
import WishStore from '../../store/WishStore';
import WishSubmitButton from '../wish/WishSubmitButton';
const Details = () => {
  const {Details}=ProductStore();
const {CartSaveRequest,CartListRequest,CartForm,CartFormChange} =CartStore();
const { WishSaveRequest,WishListRequest}=WishStore();

  const[quantity,SetQuantity]=useState(1);

  const increment=()=>{
  SetQuantity(quantity+1)
  }
  const decrement=()=>{
    if(quantity>1){
   SetQuantity(quantity-1)
    }
  } 

  const AddCart=async(productID,)=>{
    let res= await CartSaveRequest(CartForm,productID,quantity);
    //console.log(res)
    if(res){
      toast.success('CartItem Added');
      await CartListRequest();
    }
  }

  const AddWish=async(productID,)=>{
  let res=await WishSaveRequest(productID);
  if(res){
    toast.success('Wish Item Added')
    await WishListRequest();
  }
  }


    if(Details===null){
        return <DetailsS/>
    }
    else{
 return (
        <div>
 <div className="container mt-2">
 <div className="row">
 <div className="col-md-7 p-3">
 <ProductImages/>
 </div>
 <div className="col-md-5 p-3">
 <h4>{Details[0]['title']}</h4>
 <p className="text-muted bodySmall my-1">{Details[0]['Category']['categoryName']}</p>
 <p className="text-muted bodySmall my-1">{Details[0]['Brand']['brandName']}</p>
 <p className="bodySmall mb-2 mt-1">{Details[0]['shortDes']}</p>
 {
    Details[0]['discount']?(
     <span className='bodyXLarge'>Price:
<strike className="text-secondary"> {Details[0].price}</strike> {Details[0].discountPrice} </span>   
    ):(
    <span className='bodyXLarge'>Price: {Details[0]['price']}</span>

    )
 }
 
 <div className="row">
 <div className="col-4 p-2">
 <label className="bodySmall">Size</label>
 <select value={CartForm.size} onChange={(e)=>{CartFormChange('size',e.target.value)}} className="form-control my-2 form-select">
 <option value="">Size</option>
 {
  Details[0]['Details']['size'] .split(",").map((item,i)=>{
        return <option key={i} value={item}>{item}</option>
    })
 }
 {/* Details?.[0]?.Details?.size? */}
 </select>
 </div>
 <div className="col-4  p-2">
 <label className="bodySmall">Color</label>
 <select value={CartForm.color} onChange={(e)=>{CartFormChange('color',e.target.value)}} className="form-control my-2 form-select">
 <option value="">Color</option>
 {
  Details[0]['Details']['color'] .split(",").map((item,i)=>{
        return <option key={i} value={item}>{item}</option>
    })
 }
 </select>
 </div>
 <div className="col-4  p-2">
 <label className="bodySmall">Quantity</label>
 <div className="input-group my-2">
 <button onClick={decrement} className="btn btn-outline-secondary">-</button>
 <input value={quantity} type="text" className="form-control bg-light text-center" readOnly />
 <button onClick={increment} className="btn btn-outline-secondary">+</button>
 </div>
 </div>
 <div className="col-4  p-2">
 <CartSubmitButton onClick={async()=>{await AddCart(Details[0]['_id'])}} className="btn w-100 btn-success"  text='Add to Cart'/>
 </div>
 <div className="col-4  p-2">
  <WishSubmitButton onClick={async()=>{await AddWish(Details[0]['_id'])}} className='btn w-100 btn-success'  text='Add to wish'/>

 </div>
 </div>
 </div>
</div>
 <div className="row mt-3">
 <ul className="nav nav-tabs" id="myTab" role="tablist">
 <li className="nav-item" role="presentation">
 <button className="nav-link active" id="Speci-tab" data-bs-toggle="tab" data-bs-target="#Speci-tab
pane" type="button" role="tab" aria-controls="Speci-tab-pane" aria-selected="true">Specifications</button>
 </li>
 <li className="nav-item" role="presentation">
 <button className="nav-link" id="Review-tab" data-bs-toggle="tab" data-bs-target="#Review-tab-pane" 
type="button" role="tab" aria-controls="Review-tab-pane" aria-selected="false">Review</button>
 </li>
 </ul>
 <div className="tab-content" id="myTabContent">
 <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel" aria-labelledby="Speci
tab" tabIndex="0">
    { 
    parse(Details[0]['Details']['des'])
    }
</div>
 <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab" 
tabIndex="0">
    
  <ReviewList/>
    
 </div>
 </div>
 </div>
 </div>
 </div>
    );
    }
   
};

export default Details;