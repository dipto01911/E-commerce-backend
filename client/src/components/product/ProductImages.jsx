import React from 'react';
import ProductStore from '../../store/ProductStore';
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

const ProductImages = () => {
    const {Details}=ProductStore();
    let images=[
   {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
{
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },


       {original:Details[0]['Details']['img1'],thumbnail:Details[0]['Details']['img1']} ,
       {original:Details[0]['Details']['img2'],thumbnail:Details[0]['Details']['img2']} ,
       {original:Details[0]['Details']['img3'],thumbnail:Details[0]['Details']['img3']} ,
       {original:Details[0]['Details']['img4'],thumbnail:Details[0]['Details']['img4']} ,
       {original:Details[0]['Details']['img5'],thumbnail:Details[0]['Details']['img5']} ,
       {original:Details[0]['Details']['img6'],thumbnail:Details[0]['Details']['img6']} ,
       {original:Details[0]['Details']['img7'],thumbnail:Details[0]['Details']['img7']} ,
       {original:Details[0]['Details']['img8'],thumbnail:Details[0]['Details']['img8']} ,
    ]

    return (
        <div>
            <ImageGallery autoPlay={true} items={images}/>
        </div>
    );
};

export default ProductImages;