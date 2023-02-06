import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';

import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Title from '../../common/title/title';
import SideBar from '../../common/sideBar/sideBar';
import Food from '../../ui/food/food';
import Pagination from '../../common/pagination/pagination';
import CustomSelect from '../../common/customSelect/customSelect';
import Modal from '../../common/modal/modal';
import Login from '../../ui/login/login';

import { paginate } from '../../../utils/paginate';

import { getCategories } from '../../../store/categories';
import { getFoods, getFoodsLoadingStatus } from '../../../store/foods';

const CatalogPage = () => {
  const [pageSize, setPageSize] = useState(8);
  const pageSizeOptions = [4, 8, 12];
  const food = useSelector(getFoods());
  const category = useSelector(getCategories());
  const isLoading = useSelector(getFoodsLoadingStatus());
  const [selectedCateg, setSelectedCateg] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState({ value: 'price', order: 'asc' });
  const [isOpen, setIsOpen] = useState(false);
  const modalIsClose = isOpen !== false;
  const sortOptions = [
    {
      label: 'популярности',
      value: 'rate'
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

  const toggleVisibleModal = () => {
    setIsOpen(!isOpen);
  };

  if (food) {
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
                isLoading
                  ? 'Загрузка...'
                  : (
                    <>
                      <Food className='grid grid-cols-4 gap-2.5 mb-[60px] auto-rows-[minmax(320px,_0)]' items={foodCrop} onLoginBasket={toggleVisibleModal} />
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
        <Modal isOpen={modalIsClose} close={toggleVisibleModal}>
          {modalIsClose ? <Login close={toggleVisibleModal} /> : false}
        </Modal>
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
