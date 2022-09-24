import React from 'react';
import { useParams } from 'react-router';

import ProductPage from '../../components/page/productPage';
import CatalogPage from '../../components/page/catalogPage';

const Catalog = () => {
  const params = useParams();
  const { productId } = params;

  return (
    <>
      {productId
        ? <ProductPage productId={productId} />
        : <CatalogPage />
      }
    </>
  );
};

export default Catalog;
