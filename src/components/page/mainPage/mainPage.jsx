import React, { useEffect, useState } from 'react';

import Header from '../../ui/header/header';
import Title from '../../common/title/title';
import SvgIcon from '../../common/svgIcon/svgIcon';
import Button from '../../common/button/button';
import ProductCard from '../../common/productCard/productCard';

const MainPage = () => {
  const BASE_URL = 'http://localhost:3001';
  const [error, setError] = useState(null);
  const [category, setCategory] = useState([]);
  const [burgers, setBurgers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchAllBurgers = () => {
    return fetch(`${BASE_URL}/burgers`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(
        (res) => {
          setTimeout(() => {
            setIsLoaded(true);
            setBurgers(res);
          }, 500);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const fetchAllCategories = () => {
    return fetch(`${BASE_URL}/categories`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(
        (res) => {
          setTimeout(() => {
            setCategory(res);
          }, 0);
        },
        (error) => {
          setError(error);
        }
      );
  };

  useEffect(() => {
    fetchAllBurgers().then((data) => setBurgers(data));
    fetchAllCategories().then((data) => setCategory(data));
  }, []);

  return (
    <div className='App bg-[#F9FAFF]'>
      <Header />
      <div className='categoris max-w-[1170px] mx-auto px-4'>
        <Title className='text-4xl font-medium text-[#363853] text-center mb-14' tag='h2'>Популярные категории</Title>
        <ul className='flex mb-11 overflow-x-auto snap-x'>
          {
            category && (
              category.map((item, index) => (
                <li className='mr-5 last:mr-0 snap-start snap-always shrink-0' key={index}>
                  <Button
                    className='text-xl text-[#363853] py-3 px-8 bg-white rounded-[5px] !border-[#ECECEC] flex items-center hover:bg-[#FF6838] hover:text-white'
                    tag='btn'
                    type='button'
                  >
                    <SvgIcon name={item.value} size='44' className='mr-2.5' />
                    {item.name}
                  </Button>
                </li>
              ))
            )
          }
        </ul>
        {error
          ? <div>Ошибка: {error.status + ' - ' + error.statusText}</div>
          : !isLoaded
            ? <div>Загрузка...</div>
            : <ul className='grid grid-cols-5 gap-[30px]'>
              {
                burgers.map(burger => (
                  <li className='' key={burger.id}>
                    <ProductCard img={burger.imageUrl} name={burger.name} price={burger.price} />
                  </li>
                ))
              }
            </ul>
        }
      </div>
    </div>
  );
};

export default MainPage;
