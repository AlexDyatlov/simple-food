import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories } from '../../../store/categories';
import { getFoods, getFoodsLoadingStatus, loadFoodsList } from '../../../store/foods';

import Food from '../../ui/food/food';
import PopularCategory from '../../ui/popularCategory/popularCategory';
import Modal from '../../common/modal/modal';
import Login from '../../ui/login/login';

const MainPage = () => {
  const dispatch = useDispatch();
  const category = useSelector(getCategories());
  const food = useSelector(getFoods());
  const [selectedCateg, setSelectedCateg] = useState();
  const isLoading = useSelector(getFoodsLoadingStatus());
  const [isOpen, setIsOpen] = useState(false);
  const modalIsClose = isOpen !== false;

  const handleCategorySelect = (item) => {
    item?.value === selectedCateg?.value
      ? setSelectedCateg()
      : setSelectedCateg(item);
  };

  const toggleVisibleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(loadFoodsList());
  }, []);

  if (food) {
    let filteredFood = [...food];

    if (selectedCateg) {
      filteredFood = filteredFood.filter(food => food.category === selectedCateg.value);
    };

    return (
      <>
        <div className='categoris max-w-[1170px] mx-auto px-4'>
          {
            category && <PopularCategory
              items={category}
              selectedItem={selectedCateg}
              onItemSelect={handleCategorySelect}
            />
          }
          {
            isLoading
              ? <div>Загрузка....</div>
              : <Food className='grid grid-cols-5 gap-[30px]' items={filteredFood} onLoginBasket={toggleVisibleModal} />
          }
        </div>
        <Modal isOpen={modalIsClose} close={toggleVisibleModal}>
          {modalIsClose ? <Login /> : false}
        </Modal>
      </>
    );
  };

  return (
    <div className='categoris max-w-[1170px] mx-auto px-4'>
      {
        category && <PopularCategory
          items={category}
          selectedItem={selectedCateg}
          onItemSelect={handleCategorySelect}
        />
      }
    </div>
  );
};

export default MainPage;
