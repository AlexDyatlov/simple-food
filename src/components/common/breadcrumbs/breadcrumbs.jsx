import React from 'react';
import { NavLink } from 'react-router-dom';

const Breadcrumbs = ({ productId, name }) => {
  return (
    <>
      <div className='bg-[#FF7A50]/10'>
        <div className='max-w-[1170px] mx-auto px-4'>
          <ul className='flex py-5'>
            <li className='mr-5 last:mr-0 relative before:absolute before:top-[9px] before:-right-[14px] before:w-2 before:h-2 before:rounded-full before:bg-[#C1C1C1] last:before:content-none'>
              <NavLink
                className='inline-block text-sm tracking-[.003em] text-[#505050]/90 hover:text-black'
                exact
                to='/'
              >
                Главная
              </NavLink>
            </li>
            <li className='mr-5 last:mr-0 relative before:absolute before:top-[9px] before:-right-[14px] before:w-2 before:h-2 before:rounded-full before:bg-[#C1C1C1] last:before:content-none'>
              <NavLink
                className={
                  'inline-block text-sm tracking-[.003em] text-[#505050] hover:text-black ' +
                  (!productId && 'text-[#000] pointer-events-none')
                }
                to='/catalog'
              >
                Каталог товаров
              </NavLink>
            </li>
            {productId && (
              <li className='mr-5 last:mr-0 relative before:absolute before:top-[9px] before:-right-[14px] before:w-2 before:h-2 before:rounded-full before:bg-[#C1C1C1] last:before:content-none'>
                <NavLink
                  className={
                    'inline-block text-sm tracking-[.003em] text-[#505050] hover:text-black ' +
                    (productId && 'text-[#000] pointer-events-none')
                  }
                  to=''
                >
                  {name}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Breadcrumbs;
