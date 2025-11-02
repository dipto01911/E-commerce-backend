import React from 'react';
import ProductStore from '../../store/ProductStore';

const ReviewList = () => {
    const {ReviewList}=ProductStore();
    return (
        <div>
            <ul className='list-group list-group-flush'>
              {
                ReviewList!==null ?(
                    ReviewList.map((item,i)=>{
                        return <li key={i} className='list-group-item bg-transparent'>
                            <h6>{item['Profile']['cus_name']}</h6>
                            <p>{item['Product']['shortDes']}</p>
                        </li>
                    })
                ):(<span></span>)
              }
        
       
            </ul>
        </div>
    );
};

export default ReviewList;