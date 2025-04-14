import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
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
        return [
            { 
                id: 1, 
                src:"https://cdn.culture.ru/images/158ea53d-85cb-5525-ab17-a8b383d562ce",
                title: "Спасём деревья!",
                text: "Узнай о проблемах" 
            },
            { 
                id: 2, 
                src: "https://standfortrees.org/wp-content/uploads/Untitled-800-x-1200-px-800-x-200-px-800-x-400-px-2.png", 
                title: "Наши проекты", 
                text: "Основные проекты" 
            },
            { 
                id: 3, 
                src: "https://standfortrees.org/wp-content/uploads/nordic-wirstbands-768x245.png", 
                title: "Наши партнеры", 
                text: "Узнай больше о наших партнерах" 
            }
        ];
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

        const container = document.querySelector('.cards-row'); // Изменили выбор контейнера

        this.getData().forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}