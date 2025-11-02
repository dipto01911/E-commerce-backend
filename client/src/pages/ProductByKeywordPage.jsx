
import React, { useEffect } from 'react';
import ProductStore from '../store/ProductStore';
import Layout from '../components/layout/Layout';
import ProductList from '../components/product/ProductList';
import { useParams } from 'react-router-dom';

const ProductByKeywordPage = () => {
    const {ListByKeywordRequest}=ProductStore();
   const {Keyword}=useParams();

   useEffect(()=>{
       (async()=>{
     await ListByKeywordRequest(Keyword)
       })()
      },[Keyword])

    return (
        <Layout>
           <ProductList/> 
        </Layout>
    );
};

export default ProductByKeywordPage;