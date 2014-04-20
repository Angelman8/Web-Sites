<?php

class Issue extends MY_Model {
    const DB_TABLE = 'issues';
    const DB_TABLE_PK = 'issue_id';
    
    public $issue_id;                   //Issue unique identifier (INT)
    public $publication_id;             //Publication foreign key (INT)
    public $issue_number;               //publisher issue number (INT)
    public $issue_date_publication;     //Date the issue was published (STRING)
    public $issue_cover;                //Path to the cover file (STRING)
}