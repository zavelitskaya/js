import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const imageUrls = {
            1: "https://standfortrees.org/wp-content/uploads/2020/03/SFT-Logo-Long-Color.png",
            2: "https://standfortrees.org/wp-content/uploads/Untitled-800-x-1200-px-800-x-200-px-800-x-400-px-2.png",
            3: "https://standfortrees.org/wp-content/uploads/nordic-wirstbands-768x245.png"
        };
    
        const titles = {
            1: "Спасём нашу планету!",
            2: "Мультинациональная семья",
            3: "Наши друзья"
        };

        const texts = {
            1: "Спасём деревья, спасём наше будущее!",
            2: "Различные проекты в разных странах",
            3: "Международные бренды, такие как Нетфликс и Майкрософт нас поддерживают"
        };

        return {
            id: this.id,
            src: imageUrls[this.id],
            title: titles[this.id],
            text: texts[this.id] 
        };
    }
    

    getHTML() {
        return `
            <div id="product-page">
                <div id="product-container"></div> 
                <div id="back-button-container"></div>
            </div>
        `;
    }
    
    
    

    clickBack() {
        console.log("[ProductPage] Клик по кнопке 'Назад', возврат на MainPage");

        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        console.log(`[ProductPage] Открывается ProductPage для id: ${this.id}`);

        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(document.getElementById("back-button-container"));
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(document.getElementById("product-container"));
        product.render(data);
    }
}
