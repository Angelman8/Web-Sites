<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Magazine extends CI_Controller {
    //Index page for Magazine controller
    public function index() {
        $this->load->view('bootstrap/header');
        $this->load->library('table');
        $magazines = array();
        $this->load->model(array('Issue', 'Publication'));
        $issues = $this->Issue->get();
        foreach($issues as $issue) {
            $publication = new Publication();
            $publication->load($issue->publication_id);
            $magazines[] = array(
                $publication->publication_name,
                $issue->issue_number,
                $issue->issue_date_publication,
            );
        }
        $this->load->view('magazines', array(
            'magazines' => $magazines,
            
        ));  
        $this->load->view('bootstrap/footer');
    }
    
    //Add a Magazine
    public function add() {
        
        $this->load->view('bootstrap/header');
        
        //Populate publications
        $this->load->model('Publication');
        $publications = $this->Publication->get();
        $publication_form_options = array();
        foreach($publications as $id => $publication) {
            $publication_form_options[$id] = $publication->publication_name;
        }
        
        $this->load->library('form_validation');
        $this->form_validation->set_rules(array(
            array(
                'field' => 'publication_id',
                'label' => 'Publication',
                'rules' => 'required',
            ),
            array(
                'field' => 'issue_number',
                'label' => 'Issue number',
                'rules' => 'required|is_numeric',
            ),
            array(
                'field' => 'issue_date_publication',
                'label' => 'Publication Date',
                'rules' => 'required|callback_date_validation',
            ),
        ));
        
        $this->form_validation->set_error_delimiters('<div class="alert alert-error">', '</div>');
        if(!$this->form_validation->run()) {
            $this->load->view('magazine_form', array(
                'publication_form_options' => $publication_form_options,
            ));
        } else {
            $this->load->model('Issue');
            $issue = new Issue();
            $issue->publication_id = $this->input->post('publication_id');
            $issue->issue_number = $this->input->post('issue_number');
            $issue->issue_date_publication = $this->input->post('issue_date_publication');
            $issue->save();
            $this->load->view('magazine_form_success', array(
                'issue' => $issue,
            ));
        }
        $this->load->view('bootstrap/footer');
    }
    
    //Date Validation Callback
    public function date_validation($input) {
        $test_date = explode('-', $input);
        if (!@checkdate($test_date[1], $test_date[2], $test_date[0])) {
            $this->form_validation->set_message('date_validation', 'The %s field must be in YYYY-MM-DD');
            return FALSE;
        }
        return TRUE;
    }
}