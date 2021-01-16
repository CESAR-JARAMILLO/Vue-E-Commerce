// Creates new Vue instance
// Root of application, connects to element in the DOM
// That element can use a {{ expression }} to display that instances data
// Contains multiple option properties used to store data and perform actions
var app = new Vue({
    el: '#app', // element property, connects to div with "app" id
    data: {
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        image: './images/vmSocks-green-onWhite.jpg',
        link: 'https://www.vuemastery.com',
        inStock: true,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "Green",
                variantImage: './images/vmSocks-green-onWhite.jpg'
            },
            {
                variantId: 2235,
                variantColor: "Blue",
                variantImage: './images/vmSocks-blue-onWhite.jpg'
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XLL'],
        cart: 0
    },
    methods : {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            this.cart -= 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})