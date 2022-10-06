import React, { useEffect, useState } from 'react';

import Food from '../../ui/food/food';

import PopularCategory from '../../ui/popularCategory/popularCategory';

const MainPage = () => {
  const BASE_URL = 'http://localhost:3001';
  const [error, setError] = useState(null);
  const [category, setCategory] = useState([]);
  const [food, setFood] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCateg, setSelectedCateg] = useState();

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

  if (error) {
    return (
      <div className='categoris max-w-[1170px] mx-auto px-4'>
        {
          category && <PopularCategory
            items={category}
            selectedItem={selectedCateg}
            onItemSelect={handleCategorySelect}
          />
        }
        <div>Ошибка: {error.status + ' - ' + error.statusText}</div>
      </div>
    );
  } else if (food) {
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
          !isLoaded
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
