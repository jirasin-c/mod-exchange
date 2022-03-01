import { createApp } from 'vue'
import App from './App.vue'
import Navbar from './components/Navbar.vue'
import Exchange from './components/Exchange.vue'
import EventProp from './components/EventProp.vue'
import './index.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// createApp(App).use(VueSweetalert2).mount('#app');

const app = createApp(App)

app.component('Navbar', Navbar)
app.component('Navbar', Exchange)
app.component('Prop', EventProp)
app.use(VueSweetalert2)
app.mount('#app')
// app.component('Exchange', Exchange).component('Navbar', Navbar)


// createApp(Navbar).mount('#navbar');

