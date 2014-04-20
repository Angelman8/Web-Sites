<?php

class Publication extends MY_Model {
    
    const DB_TABLE = 'publications';
    const DB_TABLE_PK = 'publication_id';
    
    public $publication_id;     //Publication Unique Identifier (INT)
    public $publication_name;   //Name of Publication (String)
}
