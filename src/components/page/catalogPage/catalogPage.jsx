import React, { useEffect, useState } from 'react';

import Header from '../../ui/header/header';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Title from '../../common/title/title';
import SideBar from '../../common/sideBar/sideBar';
import ProductCard from '../../common/productCard/productCard';

const CatalogPage = () => {
  const BASE_URL = 'http://localhost:3001';
  const [error, setError] = useState(null);
  const [food, setFood] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchAllFood = () => {
    return fetch(`${BASE_URL}/food`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(
        (res) => {
          setTimeout(() => {
            setIsLoaded(true);
            setFood(res);
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
    fetchAllFood().then((data) => setFood(data));
    fetchAllCategories().then((data) => setCategory(data));
  }, []);

  return (
    <div className='App bg-[#F9FAFF] h-screen'>
      <Header />
      <Breadcrumbs />
      <div className='product-catalog max-w-[1170px] mx-auto px-4'>
        <div className='flex my-[60px]'>
          <Title className='text-4xl font-medium text-[#363853]' tag='h2'>Каталог продуктов</Title>
        </div>
        <div className='flex'>
          {category && (
            <>
              <div className="mr-[30px] max-w-[270px] w-full">
                <SideBar
                  title='Категории'
                  items={category}
                />
              </div>
            </>
          )}
          {error
            ? <div>Ошибка: {error.status + ' - ' + error.statusText}</div>
            : !isLoaded
              ? <div>Загрузка...</div>
              : <ul className='grid grid-cols-4 gap-2.5'>
                {
                  food.map(item => (
                    <li className='' key={item.id}>
                      <ProductCard img={item.imageUrl} name={item.name} price={item.price} productId={item.id} />
                    </li>
                  ))
                }
              </ul>
          }
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
