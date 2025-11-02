import React from 'react';
import ProductStore from '../../store/ProductStore';
import ProductS from '../../skeleton/ProductS';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const ProductList = () => {
      const {ListProduct}=ProductStore();
      console.log(ListProduct)
    return (
      
        <div className='container mt-2'>
            <div className='row'>
                <div className='col-md-3 p-2'>
                  <div className='card h-100 p-3 shadow-sm' >
                    <label className='form-label mt-3'> Brands</label>
                    <select className='form-control form-select'>
                        <option value="">Choose brand</option>
                    </select>

                    <label className='form-label mt-3'>Categories</label>
                    <select className='form-control form-select'>
                        <option value="">Choose Categories</option>
                    </select>
                 <label className='form-label mt-3'>Maximum Price</label>
                 <input min={0} max={10000} step={1000} type='range' className='form-range'/>
                 <label className='form-label mt-3'>Minimum Price</label>
                  <input min={0} max={10000} step={1000} type='range' className='form-range'/>  
                    </div> 
                </div>

<div className='col-md-9 p-2'>
<div className='container'>
    <div className='row'>

{
    ListProduct===null ?(<ProductS/>):(
       <div className="container">
                <div className="row">

   {
       ListProduct.map((item,i)=>{

        let Price = <p className='bodyMedium text-dark my-1'>Price:${item.price}</p>
        if(item.discount === true){
          Price = <p className='bodyMedium text-dark my-1'>Price:<strike> ${item.price}</strike>${item.discountPrice}</p>
        }
        return(
   <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                    <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 rounded-3 bg-white">
                    <img className="w-100 rounded-top-2" src={item.image} />
                    <div className="card-body">
                      <p className="bodySmall text-secondary my-1">{item.title}</p>
                     {Price}
                      {/* <StarRatings rating={parseFloat(item.star)} starRatedColor="red" starDimension="15px" starSpacing="2px" /> */}
                    </div>
                    </Link>
                  </div>
        )
       })
   }

                 
         </div>
    </div>
    )
  }

    </div>

</div>
</div>
            </div>
            
        </div>
    );
};

export default ProductList;