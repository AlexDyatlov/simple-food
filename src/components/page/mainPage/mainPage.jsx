import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories } from '../../../store/categories';
import { getFoods, getFoodsLoadingStatus, loadFoodsList } from '../../../store/foods';

import Food from '../../ui/food/food';
import PopularCategory from '../../ui/popularCategory/popularCategory';

const MainPage = () => {
  const dispatch = useDispatch();
  const category = useSelector(getCategories());
  const food = useSelector(getFoods());
  const [selectedCateg, setSelectedCateg] = useState();
  const isLoading = useSelector(getFoodsLoadingStatus());

  const handleCategorySelect = (item) => {
    item?.value === selectedCateg?.value
      ? setSelectedCateg()
      : setSelectedCateg(item);
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
            : <Food className='grid grid-cols-5 gap-[30px]' items={filteredFood} />
        }
      </div>
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
