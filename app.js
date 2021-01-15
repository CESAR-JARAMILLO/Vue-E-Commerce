// Creates new Vue instance
// Root of application, connects to element in the DOM
// That element can use a {{ expression }} to display that instances data
// Contains multiple option properties used to store data and perform actions
var app = new Vue({
    el: '#app', // element property, connects to div with "app" id
    data: {
        product: 'Socks',
        image: './images/vmSocks-green-onWhite.jpg'
    }
})