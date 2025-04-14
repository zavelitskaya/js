export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
        <div class="component-card">    
            <div><h2 class="title">${data.title}</h2></div>
            <div class="img">
                <img src="${data.src}" alt="Image">
            </div>
            <div class="text-card">
                <p>${data.text}</p>
            </div>
        </div>
        `;
    }
        
    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}