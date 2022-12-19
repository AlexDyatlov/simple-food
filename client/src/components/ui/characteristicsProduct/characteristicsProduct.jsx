import React from 'react';

const CharacteristicsProduct = () => {
  return (
    <dl>
      <div className="flex mb-3 text-xl text-[#31352B]/90">
        <dt className='font-medium mr-1.5'>Диаметр:</dt>
        <dd>20 см</dd>
      </div>
      <div className="flex mb-3 text-xl text-[#31352B]/90">
        <dt className='font-medium mr-1.5'>Вес:</dt>
        <dd>300 гр</dd>
      </div>
      <div className="flex mb-3 text-xl text-[#31352B]/90">
        <dt className='font-medium mr-1.5'>Калорийность (на 100г):</dt>
        <dd>295 ккал</dd>
      </div>
      <div className="flex mb-3 text-xl text-[#31352B]/90">
        <dt className='font-medium mr-1.5'>Срок хранения:</dt>
        <dd>до 3 дней</dd>
      </div>
    </dl>
  );
};

export default CharacteristicsProduct;
