Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
            
    <!-- v-bind dynamicly binds an attribute to an expression -->
    <!-- The attribute her is "src", and the expression is inside the quotes "product-image" -->
   <!-- The short hand is just the colon whithout "v-bind" -->
    <div class="product-image">
        <!-- Creates a bond between the data and the attribute -->
        <img v-bind:src="image">
        <a :href="link">View Image</a>
    </div>                
    
    <div class="product-info">
        <!-- Pulls from Vue instance data using expression -->
        <h1>{{ title }}</h1> 
        <p>{{ description }}</p>
        <p>Shipping: {{ shipping }}</p>
        <!-- unlike v-if, v-show toggles visiblity off and on -->
        <!-- v-if removes or adds element, not as efficient -->
        <p v-show="inStock">In Stock</p>
        <p :class="{ outOfStock: !inStock }"
        v-show="!inStock">Out of Stock</p>
        <span v-if="onSale">{{ sale }}</span>

        <!-- v-for can be used to iterate over an array to display data -->
        <product-details :details="details"></product-details>

        <!-- When using v-for it's recommended to give each rendered element it's own unique key. -->
        <div v-for="(variant, index) in variants" 
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)">
        </div>

        <ul>
            <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <button v-on:click="addToCart" 
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }">Add to cart</button>
        <button v-on:click="removeFromCart">Remove from cart</button>

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                <p>Would recommend: {{review.recommend}}</p>
                </li>
            </ul>
        </div>

        <product-review @review-submitted="addReview"></product-review>

    </div>

</div>
    `,
    data() {
        return {
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
            reviews: []
        }
    }, 
    methods : {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>Would you recommend this product?</p>
        <label>
            Yes
            <input type="radio" value="Yes" v-model="recommend">
        </label>
        <label>
            No
            <input type="radio" value="No" v-model="recommend">
        </label>

        <p>
            <input type="submit" value="Submit">
        </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            }
            else {
                if (!this.name) this.errors.push("Name required")
                if (!this.review) this.errors.push("Review required")
                if (!this.rating) this.errors.push("Rating required")
                if (!this.recommend) this.errors.push("Recommendation required")
            }
        }
    }
})

// Creates new Vue instance
// Root of application, connects to element in the DOM
// That element can use a {{ expression }} to display that instances data
// Contains multiple option properties used to store data and perform actions
var app = new Vue({
    el: '#app', // element property, connects to div with "app" id
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        subtractCart(id) {
            if (this.cart.length > 0) {
                this.cart.pop(id)
            }
        }
    }
})