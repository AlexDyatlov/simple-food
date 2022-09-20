import React from "react";

import SvgIcon from "./ui/SvgIcon/SvgIcon";
import Button from "./ui/Button/Button";

import logo from './assets/img/logo.svg';
import burgerImg from './assets/img/burger.png';

function App() {
  return (
    <div className="App bg-[#F9FAFF]">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex justify-between py-14">
          <a className="" href="/">
            <img src={logo} alt="Логотип SimpleFood" />
          </a>
          <nav className="flex">
            <ul className="flex mr-16">
              <li className="mr-11">
                <a className='text-lg text-gray-800 text-[#FF6838]' href="/">
                  Главная
                </a>
              </li>
              <li className="mr-11">
                <a className='text-lg text-gray-800' href="/">
                  Блюда
                </a>
              </li>
              <li className="mr-11 last:mr-0">
                <a className='text-lg text-gray-800' href="/">
                  Контакты
                </a>
              </li>
            </ul>
            <div className="">
              <a className="inline-block mr-8" href="/">
                <SvgIcon name='search' size='24' className='text-transparent' />
              </a>
              <a className="inline-block" href="/">
                <SvgIcon name='cart' size='24' className='text-transparent' />
              </a>
            </div>
          </nav>
        </div>
        <div className="categoris">
          <h2 className="text-4xl font-medium text-[#363853] text-center mb-14">
            Популярные категории
          </h2>
          <ul className="flex mb-11 overflow-x-auto snap-x">
            <li className="mr-5 snap-start snap-always shrink-0">
              <Button className='text-xl text-[#363853] py-3 px-8 bg-white rounded-[5px] !border-[#ECECEC] flex items-center hover:bg-[#FF6838] hover:text-white' tag='btn' type='button'>
                <SvgIcon name='burger' size='44' className='mr-2.5' />
                Бургеры
              </Button>
            </li>
            <li className="mr-5 snap-start snap-always shrink-0">
              <Button className='text-xl text-[#363853] py-3 px-8 bg-white rounded-[5px] !border-[#ECECEC] flex items-center hover:bg-[#FF6838] hover:text-white' tag='btn' type='button'>
                <SvgIcon name='pizza' size='44' className='mr-2.5' />
                Пицца
              </Button>
            </li>
            <li className="mr-5 snap-start snap-always shrink-0">
              <Button className='text-xl text-[#363853] py-3 px-8 bg-white rounded-[5px] !border-[#ECECEC] flex items-center hover:bg-[#FF6838] hover:text-white' tag='btn' type='button'>
                <SvgIcon name='sandwich' size='44' className='mr-2.5' />
                Сендвичи
              </Button>
            </li>
            <li className="mr-5 snap-start snap-always shrink-0">
              <Button className='text-xl text-[#363853] py-3 px-8 bg-white rounded-[5px] !border-[#ECECEC] flex items-center hover:bg-[#FF6838] hover:text-white' tag='btn' type='button'>
                <SvgIcon name='chicken' size='44' className='mr-2.5' />
                Азиатская кухня
              </Button>
            </li>
            <li className="snap-start snap-always shrink-0">
              <Button className='text-xl text-[#363853] py-3 px-8 bg-white rounded-[5px] !border-[#ECECEC] flex items-center hover:bg-[#FF6838] hover:text-white' tag='btn' type='button'>
                <SvgIcon name='dishes' size='44' className='mr-2.5' />
                Cеты
              </Button>
            </li>
          </ul>
          <ul className="grid grid-cols-5 gap-[30px]">
            <li className="">
              <div className="py-5 px-4 h-full bg-white border text-center rounded-[5px] border-[#ECECEC] flex flex-col items-center">
                <img className="mb-2.5" src={burgerImg} width="140" height="140" alt="text" />
                <div className="text-[15px] mb-2.5">
                  Чизбургер с листьями салата
                </div>
                <div className="text-[15px] font-medium mb-2.5 mt-auto">
                  160 руб.
                </div>
                <Button className='text-sm py-[7px] px-4 rounded-md flex items-center text-white bg-[#FF6838]' tag='btn' type='button'>
                  В корзину
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
