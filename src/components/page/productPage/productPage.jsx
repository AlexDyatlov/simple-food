import React, { useEffect, useState } from 'react';

import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Title from '../../common/title/title';
import SvgIcon from '../../common/svgIcon/svgIcon';
import Button from '../../common/button/button';
import TabItem from '../../common/tab/tabItem';
import TabContent from '../../common/tab/tabContent';

const ProductPage = ({ productId }) => {
  const BASE_URL = 'http://localhost:3001';
  const [food, setFood] = useState();
  const [activeTab, setActiveTab] = useState('tab1');

  const getById = (id) => {
    return fetch(`${BASE_URL}/food`)
      .then(res => res.json())
      .then(res => res.find(res => res.id === id));
  };

  useEffect(() => {
    getById(productId).then((data) => setFood(data));
  }, []);

  if (food) {
    return (
      <>
        <Breadcrumbs name={food.name} productId={productId} />
        <div className='flex max-w-[1170px] mx-auto px-4 pb-[60px] mt-[60px]'>
          <div className='h-[550px] w-[610px] flex items-center justify-center bg-white mr-[30px] border rounded-[5px]'>
            <img src={require(`../../../assets/img/food/${food.imageUrl}.png`)} width='400' height='400' alt='' />
          </div>
          <div className=''>
            <Title className='text-4xl font-medium text-[#363853] mb-[30px]' tag='h2'>{food.name}</Title>
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
          <div className='max-w-[690px] mx-auto mt-[30px]'>
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
              <div className='text-xl text-[#31352B]'>
                <p className='mb-5'>Рубленый бифштекс из натуральной говядины на карамелизованной булочке, с ломтиком сыра «Чеддер», кетчупом, горчицей, луком и маринованными огурчиками.</p>
                <p className='mb-5'>Аллергены: Глютен, Молоко, Горчица, Может содержать сою, яйцо, следы кунжута.</p>
                <p>Внешний вид товара может отличаться от изображений, представленных на сайте.</p>
              </div>
            </TabContent>
            <TabContent id='tab2' activeTab={activeTab}>
              <p>Tab 2</p>
            </TabContent>
            <TabContent id='tab3' activeTab={activeTab}>
              <p>Tab 3</p>
            </TabContent>
          </div>
        </div>
      </>
    );
  }

  return 'Загрузка...';
};

export default ProductPage;
