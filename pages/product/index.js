import { ProductComponent } from "../../components/product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";  // Импортируем MainPage

export class ProductPage {
    constructor(parent, cardId) {
        this.parent = parent;
        this.cardId = cardId;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.cardId), (data) => {
            this.renderData(data);
        });
    }

    getContainerHTML() {
        return `
            <div id="product-page">
              <button id="delete-button">Удалить</button>
              <button id="back-button">Назад</button>
            </div>
        `;
    }

    renderData(item) {
        const productComponent = new ProductComponent(this.pageRoot);
        productComponent.render(item);
    }


    render() {
        console.log("[ProductPage] Рендер страницы продукта");
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getContainerHTML());

        const deleteButton = document.getElementById('delete-button');
        deleteButton.addEventListener('click', () => {
            this.deleteProduct();
        });

        const backButton = document.getElementById('back-button');  // Получаем кнопку "Назад"
        backButton.addEventListener('click', () => {             // Добавляем обработчик клика
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });

        this.getData(); // Получаем данные при первой загрузке
    }


    deleteProduct() {
        console.log("Card ID:", this.cardId);
        console.log("Delete URL:", stockUrls.removeStockById(this.cardId));
        ajax.delete(stockUrls.removeStockById(this.cardId), () => {
            console.log(`Карточка с ID ${this.cardId} удалена`);
            // После удаления возвращаемся на главную страницу
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });
    }
}