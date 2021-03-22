# FrontPuck
## Установка
1. `npm install` -- утсановка всех модулей
2. `npm run h:init` -- инициализация husky
## Скрипты
1. `npm run dev` -- разработка проекта
2. `npm run build` -- бандл проекта
3. `npm run lint` -- првоерить **./src** линтером
4. `npm run lint:fix` -- попробовать очистить ошибки линтером
5. `npm run test` -- не желательно вызывать, при коммите husky вызывает данную команду автоматически
6. `npm run prepare` -- устанавливает husky, аналог `npx husky install`
## Карта проекта
### 1 webpack
Включает в себя 3 файла:
1. **webpack.base.conf.js** -- основонй webpack config
2. **webpack.dev.conf.js** -- merge config для разработки
3. **webpack.build.conf.js** -- merge config для бандла
### 2 src
Входная папка: 
1. **index.js** -- точка входка webpack
2. **index.html** -- html файл
3. **assets** -- папка всех ассетов
### 3 Конфиг файлы
Служат для конфигурации:
1. **.babelrc** -- конфиг плагинов и пресетов для babel
2. **.editorconfig** -- конфиг для настройки редактора
3. **.eslintrc** -- конифг для линтера
4. **.gitignore** -- конфиг для игнорирования гита
## Сборка проекта
После бандла на выходе появиться папка **dist** с такой же архитектурой как и **src**
