
import ProductStore from '../store/ProductStore';
import Layout from '../components/layout/Layout';
import ProductList from '../components/product/ProductList';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ProductByCatPage = () => {
    const {ListByCategoryRequest}=ProductStore();
    const {id}=useParams();

    useEffect(()=>{
       (async()=>{
     await ListByCategoryRequest(id)
       })()
      },[id])

    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByCatPage;