import ShopGames from "./games-shop/games_shop";

import './app.css';
// Создаем страницу, которая использует Cheap Shark API (https://apidocs.cheapshark.com/)
// для простого поиска сделок по играм в разных магазинах.
// Страница должна позволять:
// 1. При желании можно выбрать магазины, где выполнять поиск.
// Используйте https://www.cheapshark.com/api/1.0/stores ендпоинт
// получить список магазинов
// 2. Введите поисковый запрос для поиска - название игры
// 3. Осуществляем поиск сделок. Для этого используйте следующий API:
// https://www.cheapshark.com/api/1.0/deals?storeID=1,2,3&title=batman
// 4. Отображение результатов в виде списка: thumbnails, titles, deailRating,
// ссылка на metacritic и releaseDate

const App = () => (
    <div className="App">
           <h2>APP</h2>
      <ShopGames/>
    </div>
  );

export default App;
