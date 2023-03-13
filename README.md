# Simple-food — Интернет-магазин

### Обзор:
+ [Стек технологий](#stack);
+ [Реализованный функционал](#functional);
+ [Изображения проекта](#images);
+ [Структура веб-приложения](#structure);
+ [Планируется добавить](#iterations);


##  <a name="stack"></a> Стек технологий
#### Frontend:
    - ReactJs v17 - JavaScript библиотека
    - Redux Toolkit - управление состоянием данных 
    - React Hooks - хуки
    - React Router v5 - маршрутизация в приложении
    - Axios - выполнение HTTP-запросов
    - PropTypes - проверка типов
    - ESLint - линтер
    - Tailwind CSS - библиотека для стилизации
    - React Modal - модальные окна
    - Lodash - работа с массивами

#### Backend:
    - Node.js - серверная платформа
    - Express - веб-фреймворк для приложений Node.js
    - Mongoose - библиотека для работы с MongoDB
    - Bcryptjs - хэширование данных
    - JWT - создание токенов доступа
    - Express-validator - валидация данных формы


#### Проектирование и тестирование запросов:
    - Postman
<p align="center">
  <img src="https://github.com/student476/sf-screens/blob/main/postman.png">
</p>


### <a name="functional"></a> Реализованный функционал
## Frontend:
    - Рендер списков
    - Условный рендеринг
    - Навигация по страницам без перезагрузки
    - Хлебные крошки (breadcrumbs)
    - Фильтрация товаров
    - Сортировка товаров
    - Пагинация (постраничный вывод данных)
    - Табы (вкладки)
    - Модальные окна
    - Хранение данных (создание редьюсеров)
    - Добавление http сервисов (методы GET, PUT, POST, PATCH, DELETE)
    - Регистрация (создание пользователя)
    - Авторизация (процесс входа в приложение, предоставление прав)
    - Выход из профиля
    - Валидация форм
    - Работы с токенами доступа (JWT)
    - Работы с рефреш токенами (refresh token)
    - Protected route (приватный роут)
    - Страница пользователя и администратора
    - Админ-панель (создание, редактирование и удаление товаров)
    - Корзина товаров (добавление/удаление в коризну, подсчет количества и суммы, сохранение/удаление на бэкенде)
    - Доступность (управление сайтом с помощью клавиатуры, клавиша tab)

### Backend:
    - Настройка сервера
    - Подключение MongoDB
    - Создание моделей
    - Создание маршрутов (роуты)
    - Создание логики для регистрации
    - Создание сервиса для работы с токенами (accessToken, refreshToken)
    - Валидация данных формы
    - Создание логики для авторизации
    - Cоздание промежуточного ПО для авторизации (middleware)
    - Создание логики для пользователя, товаров, категорий
    - Добавлены методы GET, POST, PATCH, DELETE

### <a name="images"></a> Изображения готового проекта:
#### Страницы:

#### Главная страница
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/main-page.png">
</p>

#### Каталог продуктов
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/catalog-page.png">
</p>

#### Детальная страница
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/product-page.png">
</p>

#### Модальное окно

#### Регистрация
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/sign-up.png">
</p>

#### Пользователь

#### Страница пользователя
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/user-page.png">
</p>

#### Пустая корзина
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/empty-basket.png">
</p>

#### Корзина с товарами
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/basket.png">
</p>

#### Администратор

#### Страница администратора
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/admin-page.png">
</p>

#### Панель администратора
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/admin-panel.png">
</p>

#### Редактирование товара
<p align="center">
  <img src="https://raw.githubusercontent.com/student476/sf-screens/main/edit-product.png">
</p>

## <a name="structure"></a> Структура веб-приложения:

```
Simple-food
├── client                             # Клиентская часть приложения
|    ├── node_modules/                 # Внешние библиотеки
|    |
|    ├── public/                       # Корневые ресурсы проекта
|    |    └── index.html
|    |
|    ├── src/                          # Разработка
|    │   ├── api                       # Моковые данные
|    |   |    └── db.json              # Локальная БД
|    │   │
|    │   ├── assets                    # Изображения и шрифты
|    │   │              
|    │   ├── components                # Компоненты
|    |   |   ├── common                # Переиспользуемые компоненты  
|    |   |   |    └── button 
|    |   |   | 
|    │   │   ├── page                  # Компоненты для страниц которые используются в layouts
|    |   |   |    └── mainPage
|    |   |   |
|    │   |   └── ui                    # Непереиспользуемые компоненты для приложения,
|    |   |        |                      которые содержат определенную специфическую информацию 
|    |   |        └── header
|    |   |
|    │   ├── layouts                   # Шаблоны готовых страниц
|    │   |     └── main
|    |   |
|    |   ├── services                  # http сервисы
|    |   |     └── httpService.js
|    |   |
|    |   ├── store                     # Хранилище Redux  
|    |   |     └── createStore.js
|    |   |
|    |   └── utils                     # Вспомогательные функции
|    |
|    ├── App.js                        # Основной компонент приложения
|    └── index.js                      # Основной файл для приложения
|
|
└── server                             # Серверная часть приложения
    ├── config                         # Конфигурация приложения
    |      └── default.json
    |
    ├── middleware                     # Промежуточное ПО
    |      └── auth.middleware.js
    |
    ├── mock                           # Моковые данные
    |     └── categories.json
    |
    ├── models                         # Модели
    |     └── User.js
    |
    ├── routes                         # Описание всех маршрутов
    |     └── index.js                 # Структурированные маршруты
    |
    ├── services                       # Классы
    |     └── token.service.js
    |
    ├── startUp                        # Инициализация моковых данных
    |     └── initDatabase.js
    |
    └── app.js                         # Главный файл для приложения
```

### <a name="iterations"></a> Планируется добавить:
    - TypeScript
    - Адаптив
    - Публикация на сервере