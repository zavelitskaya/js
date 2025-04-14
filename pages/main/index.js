import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.filterText = ''; // Добавляем состояние для фильтра
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getContainerHTML() {
        return `
            <div id="main-page">
                <h1 class="title">Тут покупают дешёвые авиабилеты</h1>
                <div class="cards-row"></div>
            </div>
        `;
    }

    getData() {
        const filter = this.filterText ? `?title=${this.filterText}` : ''; // Формируем query-параметр
        ajax.get(stockUrls.getStocks(filter), (data) => {  // Передаем filter в getStocks
            this.renderData(data);
        });
    }

    renderData(items) {
        const container = document.querySelector('.cards-row');
        container.innerHTML = ''; // Очищаем контейнер перед рендерингом
        items.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        console.log(`[MainPage] Кликнута карточка с id: ${cardId}, переход на ProductPage`);

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        console.log("[MainPage] Рендер главной страницы");

        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getContainerHTML());

        this.getData(); // Получаем данные при первой загрузке
    }
}