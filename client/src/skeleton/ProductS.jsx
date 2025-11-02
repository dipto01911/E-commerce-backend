
import React from 'react';
import Skeleton from "react-loading-skeleton"
import Lottie from "lottie-react"
import image from "../assets/images/image.json"

const ProductS = () => {
    return (
        <>
             <div className="row">
  <div className="col-12">
    <div className="card p-4">
      <div className="row">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="list-group-item d-flex flex-row align-items-start shadow-sm p-3 rounded">
              <Lottie style={{ width: "100px" }} animationData={image} loop={true} />
              <div className="p-3">
                <Skeleton count={3} style={{ width: "200px" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default ProductS;