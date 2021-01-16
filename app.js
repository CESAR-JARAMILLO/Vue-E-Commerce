// Creates new Vue instance
// Root of application, connects to element in the DOM
// That element can use a {{ expression }} to display that instances data
// Contains multiple option properties used to store data and perform actions
var app = new Vue({
    el: '#app', // element property, connects to div with "app" id
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        description: 'A pair of warm, fuzzy socks',
        selectedVariant: 0,
        link: 'https://www.vuemastery.com',
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "Green",
                variantImage: './images/vmSocks-green-onWhite.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "Blue",
                variantImage: './images/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
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
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
        }
    }
})