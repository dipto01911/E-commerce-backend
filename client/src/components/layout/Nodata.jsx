import React from 'react';

import img from "../../assets/images/no-results.png"
const Nodata = () => {
    return (
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-4 text-text-center'>
                    <img alt='' className='w-75' src={img}/>

                </div>

            </div>
            
        </div>
    );
};

export default Nodata;