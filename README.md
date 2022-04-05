# Frontend test
simple products list and cart

## Project setup
```
npm install
cd server
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
cd server
npm run dev
```
Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
The page will reload if you make edits.

### Compiles and minifies for production
```
npm run build
npm start
```
Builds the app for production to the `dist` folder.\
It correctly bundles in production mode and optimizes the build for the best performance.
Open [http://localhost:5050](http://localhost:5050) to view it in the browser.
The build is minified and the filenames include the hashes.\
___

###  Комментарии

#### _Storage_
 - Хранение состояния, которое разделяется между несколькими компонентами необходимо реализовать во `Vuex`:
     - каждый компонент может получить данные из хранилища
     - эти данные реактивные
     - данные не пердаются между компонентами в `props` - меньше связности
     - более понятная структура, легче поддерживать и расширять

#### _Header.vue_
- Из родительского компонента в `Header` передается пустой массив `cart` с помощью `props`. Сумма элементов пустого массива `= 0`, следовательно в шапке страницы отображается `0`. Элементами заполняется локальный массив `cart` другого компонента `List.vue`.
**Решение**: использовать Vuex для хранения cart

- Лучше использовать `computed` (кэшируется) вместо `watch`

- `let val` - плохое имя переменной, не информативное


#### _List.vue_
- Изменение ширины карточек
   - **вариант 1** (плохой): при создании компонента подписаться на событие `resize` с помощью `window.addEventListener`. При срабатывании вызвать метод, который запишет `width` в `data` компонента и в `computed` уже использовать этот `width` из `data`. В `computed` заменить строки на числа (`840` вместо `840px`). В `beforeDestroy` удалить слушатель событий
   - **вариант2** (лучше): менять ширину элементов с помощью медиа-запросов `@media` в CSS

- В `beforeDestroy` необходимо вызвать `clearInterval` для предотвращения утечек памяти

- Хранить/изменять массив `cart` удобнее во vuex

#### _Cart.vue_
- `spisok_dlya_rendera` - плохое название  😵‍💫

- Массив `cart` надо получать из `store` а не из `props` 

#### _Общее_
- в циклах `v-for` необходимо использовать  директиву `:key` для правильного обновления элементов списка
- для изоляции стилей в компонентах применять `style scoped` (или другие методы, например, БЭМ)
- по возможности применять семантические теги `header`, `main`, `article` и др.


> Для эмуляции базы данных используется чтение/запись в файл  🙃
> реализован мини-сервер на `Node.js`,
> добавлено немного стилей  🤡
 
