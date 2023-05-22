## movies-explorer-frontend - фронтенд для приложения "movies-explorer" 

Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.
Стек: `HTML5`, `CSS`, `JS React`, `БЭМ`
Функциональность: Можно добавлять/удалять фильмы в избранное, редактировать информацию о пользователе. Вся информация хранится на сервере [сервере](https://github.com/Evgeniia2405/movies-explorer-api/). Также реализована регистрация и авторизация пользователя.

## Сайт состоит из нескольких страниц:
- Главная. Содержит информацию о выполненном проекте.
- Страница с фильмами. На ней есть форма поиска фильмов и блок с результатами поиска.
- Страница с сохранёнными фильмами. Показывает фильмы, сохранённые пользователем.
- Страница регистрации. Позволяет пользователю зарегистрировать аккаунт.
- Страница авторизации. На ней пользователь может войти в систему.
- Страница редактирования профиля. Пользователь может изменить данные своего аккаунта.
- «404» несуществующая страница.

### Главная страница
![](/image/mainpage.jpg)

### Страница «Фильмы»
![](/image/moviespage.jpg)

### Страница «Сохранённые фильмы»
![](/image/savedmoviespage.jpg)

### Страница «Регистрация»
![](/image/regpage.jpg)

### Страница «Авторизация»
![](/image/authpage.jpg)

### Страница «Аккаунт»
![](/image/profilepage.jpg)

### Страница «404»
![](/image/nfoundpage.jpg)

## Функциональность проекта:
### Общее:
- Если пользователь не залогинился, в шапке отображаются кнопки «Войти» и «Регистрация»; если пользователь залогинился, то кнопки исчезают — и появляются кнопки «Фильмы», «Сохранённые фильмы» и «Аккаунт», в том числе и на главной странице.
- При поиске текст запроса, найденные фильмы и состояние переключателя короткометражек сохраняются в хранилище. Если пользователь повторно переходит на страницу фильмов, то при монтировании компонента данные достаются из локального хранилища. Страница отображается в соответствии с загруженными из хранилища данными.
- Все формы валидируются и на стороне клиента. Пользователь не может отправить запрос с
невалидными данными.

### Страницы «Регистрация» и «Авторизация»:
- На странице «Регистрация» клик по кнопке «Зарегистрироваться» отправляет запрос на роут `/signup` , если данные введены корректно. Если запрос прошёл успешно, то автоматически производится вход и редирект на страницу `/movies`.
- На странице «Авторизация», если данные введены корректно, клик по кнопке «Войти» отправляет запрос на роут `/signin`. Если запрос прошёл успешно, происходит редирект на страницу `/movies` .
- Все формы валидируются и на стороне клиента.

### Страница редактирование профиля:
- На странице редактирования профиля клик по кнопке «Редактировать» отправляет запрос на роут `/users/me` , если данные введены корректно.
- Пользователю отображается уведомление об успешном запросе к серверу при сохранении профиля.
- Если на странице редактирования профиля введённая информация соответствует текущим данным пользователя, кнопка «Сохранить» заблокирована и нельзя отправить запрос сохранения.

### Поиск фильмов:
- Прелоадер "пульсирует" во время выполнения запроса фильмов.
- После успешного сабмита формы поиска появляется блок с результатами.
- Если ничего не найдено, выводится текст: «Ничего не найдено».
- На странице всех фильмов в блоке результата отображается такое же количество карточек, как в макете (количество отображаемых карточек зависит от ширины экрана). Нажатие на кнопку «Ещё» отображает следующий ряд с тем же числом карточек. При отображении всех карточек кнопка "Ещё" скрывается.
- Карточка состоит из изображения, названия фильма и его длительности. Длительность фильма рассчитывается и соответствует формату в макете. Клик по карточке ведёт на трейлер фильма.
- Кнопка лайка меняет состояние, в зависимости от того, добавлен ли фильм в сохранённые или нет.
- При клике на иконку «Лайк» в блоке карточки выполняется запрос к `/movies` [сервера](https://github.com/Evgeniia2405/movies-explorer-api/) API для установки или снятия лайка, в зависимости от текущего состояния.

### На странице «Сохранённые фильмы»:
- Отображается форма поиска. Она позволяет искать фильмы по уже полученным данным о сохранённых фильмах.
- Блок карточки содержит кнопку удаления, а не лайка.
- При нажатии на кнопку удаления выполняется запрос на удаление фильма. После успешного запроса карточка удаляется со страницы.

### Регистрация и авторизация:
- Роуты `/saved-movies` , `/movies` , `/profile` защищены HOC-компонентом ProtectedRoute . Роуты `/` , `/signin` , `/signup` не защищены.
- При попытке перейти на несуществующую страницу происходит редирект на страницу «404». Кнопка «Назад» перводит на предыдущую страницу.

### Ссылки
- [Макет Figma zip](https://disk.yandex.ru/d/HNVNC-MlA1aTlA)
- [Backend](https://github.com/Evgeniia2405/movies-explorer-api)

## Инструкция по запуску приложения локально
- разверните сервер по инструкции описанной в репозитории [movies-explorer-api](https://github.com/Evgeniia2405/movies-explorer-api)
- клонировать данный репозиторий с фронтендом приложения
- выполнить команду `npm i` для установки зависимостей
- выполнить команду `npm run start`
