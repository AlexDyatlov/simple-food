import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Title from '../../common/title/title';
import SideBar from '../../common/sideBar/sideBar';
import Food from '../../ui/food/food';
import Pagination from '../../common/pagination/pagination';
import CustomSelect from '../../common/customSelect/customSelect';

import { paginate } from '../../../utils/paginate';

const CatalogPage = () => {
  const [pageSize, setPageSize] = useState(8);
  const pageSizeOptions = [4, 8, 12];
  const BASE_URL = 'http://localhost:3001';
  const [error, setError] = useState(null);
  const [food, setFood] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCateg, setSelectedCateg] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState({ value: 'price', order: 'asc' });
  const sortOptions = [
    {
      label: 'популярности',
      value: 'rating'
    },
    {
      label: 'названию',
      value: 'name'
    },
    {
      label: 'цене',
      value: 'price'
    }
  ];

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

  const handleCategorySelect = (item) => {
    item?.value === selectedCateg?.value
      ? setSelectedCateg()
      : setSelectedCateg(item);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCateg]);

  const handleChangePage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleChangeSort = (item) => {
    setSortValue(item);
  };

  const handleChangeSize = (number) => {
    setPageSize(number);
  };

  if (error) {
    return (
      <>
        <Breadcrumbs />
        <div className='product-catalog max-w-[1170px] mx-auto px-4'>
          <div className='flex my-[60px]'>
            <Title className='text-4xl font-medium text-[#363853]' tag='h2'>Каталог продуктов</Title>
          </div>
          <div className='flex'>
            {
              category && <div className='mr-[30px] max-w-[270px] w-full'>
                <SideBar
                  title='Категории'
                  items={category}
                  selectedItem={selectedCateg}
                  onItemSelect={handleCategorySelect}
                />
              </div>
            }
            <div>Ошибка: {error.status + ' - ' + error.statusText}</div>;
          </div>
        </div>
      </>
    );
  } else if (food) {
    let filteredFood = [...food];

    if (selectedCateg) {
      filteredFood = filteredFood.filter(food => food.category === selectedCateg.value);
    };

    const count = filteredFood.length;
    const sortedFood = _.orderBy(filteredFood, [sortValue.value], [sortValue.order]);
    const foodCrop = paginate(sortedFood, currentPage, pageSize);

    return (
      <>
        <Breadcrumbs />
        <div className='product-catalog max-w-[1170px] mx-auto px-4'>
          <div className='flex justify-between my-[60px]'>
            <Title className='text-4xl font-medium text-[#363853]' tag='h2'>Каталог продуктов</Title>
            <div className='flex w-6/12 justify-end'>
              <CustomSelect
                className='max-w-[180px] w-full mr-[15px]'
                defaultLabel='По'
                selectedSort={sortValue}
                onSort={handleChangeSort}
                options={sortOptions}
              />
              <CustomSelect
                className='max-w-[92px] w-full'
                defaultLabel='По'
                selectedSort={pageSize}
                onSort={handleChangeSize}
                options={pageSizeOptions}
              />
            </div>
          </div>
          <div className='flex mb-28'>
            {
              category && <div className='mr-[30px] max-w-[270px] w-full'>
                <SideBar
                  title='Категории'
                  items={category}
                  selectedItem={selectedCateg}
                  onItemSelect={handleCategorySelect}
                />
              </div>
            }
            <div className='w-full'>
              {
                !isLoaded
                  ? 'Загрузка...'
                  : (
                    <>
                      <Food className='grid grid-cols-4 gap-2.5 mb-[60px] auto-rows-[minmax(320px,_0)]' items={foodCrop} />
                      <div className='flex justify-center'>
                        <Pagination
                          totalCount={count}
                          pageSize={pageSize}
                          currentPage={currentPage}
                          onPageChange={handleChangePage}
                        />
                      </div>
                    </>
                  )
              }
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <div className='product-catalog max-w-[1170px] mx-auto px-4'>
        <div className='flex my-[60px]'>
          <Title className='text-4xl font-medium text-[#363853]' tag='h2'>Каталог продуктов</Title>
        </div>
        <div className='flex'>
          {
            category && <div className='mr-[30px] max-w-[270px] w-full'>
              <SideBar
                title='Категории'
                items={category}
                selectedItem={selectedCateg}
                onItemSelect={handleCategorySelect}
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
