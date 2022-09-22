import React from 'react';

const Breadcrumbs = () => {
  return (
    <div className="bg-[#FF7A50]/10">
      <div className='max-w-[1170px] mx-auto px-4'>
        <ul className="flex py-5">
          <li className="mr-5">
            <a className="inline-block text-sm tracking-[.003em] text-[#505050] hover:text-black relative before:absolute before:top-[6px] before:-right-[14px] before:w-2 before:h-2 before:rounded-full before:bg-[#C1C1C1]" href="#">Главная</a>
          </li>
          <li className="">
            <a className="inline-block text-sm tracking-[.003em] text-[#505050] hover:text-black" href="#">Каталог товаров</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
