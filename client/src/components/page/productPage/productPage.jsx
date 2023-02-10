import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import TabItem from '../../common/tab/tabItem';
import TabContent from '../../common/tab/tabContent';
import Reviews from '../../ui/reviews/reviews';
import CharacteristicsProduct from '../../ui/characteristicsProduct/characteristicsProduct';
import DescriptionProduct from '../../ui/descriptionProduct/descriptionProduct';
import Modal from '../../common/modal/modal';
import EditProductForm from '../../ui/editProductForm/editProductForm';
import Login from '../../ui/login/login';
import ProductCardDetailed from '../../common/productCard/productCardDetailed';

import { getFoodById } from '../../../store/foods';
import { getIsLoggedIn } from '../../../store/users';

const ProductPage = ({ productId }) => {
  const food = useSelector(getFoodById(productId));
  const [activeTab, setActiveTab] = useState('tab3');
  const [isOpen, setIsOpen] = useState(false);
  const modalIsClose = isOpen !== false;
  const isLoggedIn = useSelector(getIsLoggedIn());

  const toggleVisibleModal = () => {
    setIsOpen(!isOpen);
  };

  if (food) {
    return (
      <>
        <Breadcrumbs name={food.name} productId={productId} />
        <ProductCardDetailed
          productId={productId}
          toggleVisibleModal={toggleVisibleModal}
          isLoggedIn={isLoggedIn}
          {...food}
        />
        <div className='border border-[#E4E4E4]'></div>
        <div className='max-w-[1170px] mx-auto px-4'>
          <div className='max-w-[690px] mx-auto mt-[30px] mb-[120px]'>
            <ul className='flex mb-[30px]'>
              <li className='mr-[60px]'>
                <TabItem title='Описание' id='tab1' activeTab={activeTab} setActiveTab={setActiveTab} />
              </li>
              <li className='mr-[60px]'>
                <TabItem title='Характеристики' id='tab2' activeTab={activeTab} setActiveTab={setActiveTab} />
              </li>
              <li>
                <TabItem title='Отзывы (2)' id='tab3' activeTab={activeTab} setActiveTab={setActiveTab} />
              </li>
            </ul>
            <TabContent id='tab1' activeTab={activeTab}>
              <DescriptionProduct />
            </TabContent>
            <TabContent id='tab2' activeTab={activeTab}>
              <CharacteristicsProduct />
            </TabContent>
            <TabContent id='tab3' activeTab={activeTab}>
              <Reviews />
            </TabContent>
          </div>
        </div>
        {!isLoggedIn ? (
          <Modal isOpen={modalIsClose} close={toggleVisibleModal}>
            {modalIsClose ? <Login /> : false}
          </Modal>
        ) : (
          <Modal isOpen={modalIsClose} close={toggleVisibleModal}>
            {modalIsClose ? <EditProductForm currentProductId={productId} close={toggleVisibleModal} /> : false}
          </Modal>
        )}
      </>
    );
  }

  return 'Загрузка...';
};

export default ProductPage;
