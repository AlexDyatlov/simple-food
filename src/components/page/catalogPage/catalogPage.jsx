import React, { useEffect, useState } from 'react';

import Header from '../../ui/header/header';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Title from '../../common/title/title';
import SideBar from '../../common/sideBar/sideBar';
import ProductCard from '../../common/productCard/productCard';

const CatalogPage = () => {
  const BASE_URL = 'http://localhost:3001';
  const [error, setError] = useState(null);
  const [burgers, setBurgers] = useState([]);
  const [category, setCategory] = useState([]);
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
    </div>
  );
};

export default CatalogPage;
