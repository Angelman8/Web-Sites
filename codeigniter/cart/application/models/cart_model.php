<?php

class Cart_model extends Model {
    function retrieve_products() {
        $query = $this->db->get('products');
        return $query->result_array();
    }
}
