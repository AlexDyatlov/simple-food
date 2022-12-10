import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Title from '../../common/title/title';
import SvgIcon from '../../common/svgIcon/svgIcon';
import Button from '../../common/button/button';
import TabItem from '../../common/tab/tabItem';
import TabContent from '../../common/tab/tabContent';
import Reviews from '../../ui/reviews/reviews';
import CharacteristicsProduct from '../../ui/characteristicsProduct/characteristicsProduct';
import DescriptionProduct from '../../ui/descriptionProduct/descriptionProduct';
import StaticRating from '../../common/starRating/staticRating';
import Modal from '../../common/modal/modal';
import EditProductForm from '../../ui/editProductForm/editProductForm';

import { deleteFood, getFoodById } from '../../../store/foods';
import { getCurrentUserData, getIsLoggedIn } from '../../../store/users';

const ProductPage = ({ productId }) => {
  const dispatch = useDispatch();
  const food = useSelector(getFoodById(productId));
  const [activeTab, setActiveTab] = useState('tab3');
  const [isOpen, setIsOpen] = useState(false);
  const modalIsClose = isOpen !== false;
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUser = useSelector(getCurrentUserData());

  const toggleVisibleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveProduct = (id) => {
    dispatch(deleteFood(id));
  };

  if (food) {
    return (
      <>
        <Breadcrumbs name={food.name} productId={productId} />
        <div className='flex max-w-[1170px] mx-auto px-4 pb-[60px] mt-[60px]'>
          <div className='h-[550px] w-[610px] flex items-center justify-center bg-white mr-[30px] border rounded-[5px] relative'>
            <img src={require(`../../../assets/img/food/${food.imageUrl}.png`)} width='400' height='400' alt='' />
            {
              isLoggedIn
                ? currentUser.isAdmin
                  ? <div className="flex absolute right-5 top-5">
                    <Button
                      className='mr-2.5 flex items-center justify-center w-9 h-9 border border-gray-800 rounded text-gray-500 hover:text-black hover:border-text-black transition-colors'
                      tag='btn'
                      type='button'
                      onClick={toggleVisibleModal}
                    >
                      <SvgIcon name='edit' size='20' className='' />
                    </Button>
                    <Button
                      className='flex items-center justify-center w-9 h-9 border border-gray-800 rounded text-gray-500 hover:text-red-600 hover:border-red-600 transition-colors'
                      tag='btn'
                      type='button'
                      onClick={() => handleRemoveProduct(productId)}
                    >
                      <SvgIcon name='bin' size='20' className='' />
                    </Button>
                  </div>
                  : ''
                : ''
            }
          </div>
          <div className=''>
            <Title className='text-4xl font-medium text-[#363853] mb-[30px]' tag='h2'>{food.name}</Title>
            <div className='mb-[25px]'>
              <StaticRating rating={food.rate} />
            </div>
            <div className='text-[25px] font-medium text-[#363853] mb-[20px]'>{food.price} руб.</div>
            <div className='flex mb-[30px]'>
              <div className='flex mr-5'>
                <Button
                  className='bg-[#FF6838] p-3 text-white rounded-l-[3px] flex items-center justify-center'
                  tag='btn'
                  type='button'
                >
                  <SvgIcon name='minus' size='20' className='' />
                </Button>
                <div className='min-w-[70px] bg-[#FAEDED] text-[#363853] text-[20px] px-[17px] py-2.5 flex items-center justify-center'>1</div>
                <Button
                  className='bg-[#FF6838] p-3 text-white rounded-r-[3px] flex items-center justify-center'
                  tag='btn'
                  type='button'
                >
                  <SvgIcon name='plus' size='20' className='' />
                </Button>
              </div>
              <Button
                className='bg-[#FF6838] py-3.5 px-9 font-medium text-white text-sm rounded-[3px] flex items-center'
                tag='btn'
                type='button'
              >
                <SvgIcon name='cart' size='20' className='mr-4 stroke-[#fff] text-transparent' />
                Добавить в корзину
              </Button>
            </div>
            <Title className='text-2xl text-[#363853] pb-[15px] border-b border-[#E4E4E4] mb-[20px]'>Доставка и оплата</Title>
            <div className='text-base text-[#505050]'>
              <p className='mb-0.5'>Минимальная сумма заказа — 160 руб.</p>
              <p className='mb-0.5'>Время доставки заказа — 80-140 мин.</p>
              <p className='mb-0.5'>Оплата осуществляется только банковской картой.</p>
              <p>Окончательная сумма заказа формируется после сбора товаров.</p>
            </div>
          </div>
        </div>
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
        <Modal isOpen={modalIsClose} close={toggleVisibleModal}>
          {modalIsClose ? <EditProductForm currentProductId={productId} close={toggleVisibleModal} /> : false}
        </Modal>
      </>
    );
  }

  return 'Загрузка...';
};

export default ProductPage;
