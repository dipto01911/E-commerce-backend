
import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';

import ProductStore from '../store/ProductStore';
import FeatureStore from '../store/FeatureStore';

import Brands from '../components/product/Brands';
import Slider from '../components/product/Slider';
import Features from '../components/features/Features';
import Categories from '../components/product/Categories';
// import Products from '../components/product/Products';


const HomePage = () => {
    const {BrandListRequest,CategoryListRequest,SliderListRequest,
    }=ProductStore();

    const {FeatureListRequest}=FeatureStore();

useEffect(()=>{
    (async()=>{
       await SliderListRequest();
       await FeatureListRequest();
        await CategoryListRequest();
       await BrandListRequest();
    //   await ListByRemarkRequest("new")
    })();
},[])



    return (
        <Layout>
            <Slider/>
            <Features/>
            <Categories/>
            {/* <Products/> */}
          <Brands/>

 

        </Layout>
    );
};

export default HomePage;
