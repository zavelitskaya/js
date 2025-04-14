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
                <input type="text" id="filter-input" placeholder="Поиск по названию">
                <div class="cards-row"></div>
            </div>
        `;
    }

    async getData() {
        try {
            const data = await ajax.get(urls.getStocks());
            console.log("Загруженные данные:", data);
            return data;
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
             return null;
        }
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        console.log(`[MainPage] Кликнута карточка с id: ${cardId}, переход на ProductPage`);

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        const data = await this.getData();
        if (!data) return;
    
        const html = this.getContainerHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
    
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }   

}