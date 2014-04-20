<?php

class Cart extends Controller {
    
    function Cart() {
        parent::Controller();
        $this->load->model('cart_model');
    }
    
    function index() {
        $data['products'] = $this->cart_model->retrieve_products();
        
        $data['content'] = 'cart/products';
        $this->load->view('index', $data);
    }
}

