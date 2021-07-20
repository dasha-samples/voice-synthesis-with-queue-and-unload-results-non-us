
# How to start the demo app

Этот пример приложения на синтезированной речи с возможностью загрузки номеров из файла (т.е. можно делать много звонков очередью) и выгрузкой результатов в файл в csv формате. Если вам нужна какая-либо помощь - обращайтесь в наше комьюнити разработчиков
[Developer Community](http://community.dasha.ai).


1. Клонируйте репозиторий и установите необходимые дополнения:

```sh
git clone https://github.com/dasha-samples/intro-main-non-us
cd intro-main-non-us
npm install
```

2. Создайте или войдите в ваш аккаунт используя инструмент Dasha CLI:

```sh
npm i -g "@dasha.ai/cli"
npx dasha account login
```

3. Запустите одну из команд:
    * Чтобы начать исходящий звонок, запустите
    ```sh
    npm start <phone_number>
    ```
     (phone number - номер телефона в международном формате, без `+`, для примера `79997775533`).


     
    * Чтобы запустить чат
    ```sh
    npm start chat <user_id>
    ```
    * Для примера, `npm start chat 1`


