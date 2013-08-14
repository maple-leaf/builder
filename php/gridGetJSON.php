<?php

    session_start();

    $page = isset($_POST['page']) ? $_POST['page'] : 1;
    $rp = isset($_POST['rp']) ? $_POST['rp'] : 10;
    $sortname = isset($_POST['sortname']) ? $_POST['sortname'] : 'name';
    $sortorder = isset($_POST['sortorder']) ? $_POST['sortorder'] : 'desc';
    $query = isset($_POST['query']) ? $_POST['query'] : false;
    $qtype = isset($_POST['qtype']) ? $_POST['qtype'] : false;


    if(isset($_GET['Add'])){ // this is for adding records

        $rows = $_SESSION['Models'];
        $rows[$_GET['EmpID']] = 
        array(
            'name'=>$_GET['Name']
            , 'category'=>$_GET['FavoriteColor']
            , 'screenshot'=>$_GET['FavoritePet']
            , 'restrict'=>$_GET['PrimaryLanguage']
        );
        $_SESSION['Models'] = $rows;

    }
    elseif(isset($_GET['Edit'])){ // this is for Editing records
        $rows = $_SESSION['Models'];
        
        unset($rows[trim($_GET['OrgEmpID'])]);  // just delete the original entry and add.
        
        $rows[$_GET['EmpID']] = 
        array(
            'name'=>$_GET['Name']
            , 'category'=>$_GET['FavoriteColor']
            , 'screenshot'=>$_GET['FavoritePet']
            , 'restrict'=>$_GET['PrimaryLanguage']
        );
        $_SESSION['Models'] = $rows;
    }
    elseif(isset($_GET['Delete'])){ // this is for removing records
        $rows = $_SESSION['Models'];
        unset($rows[trim($_GET['Delete'])]);  // to remove the \n
        $_SESSION['Models'] = $rows;
    }
    else{

        // if(isset($_SESSION['Models'])){ // get session if there is one
            // $rows = $_SESSION['Models'];
        // }
        // else{ // create session with some data if there isn't
            $rows[1] = array('name'=>'Tony',   'category'=>'green',  'screenshot'=>'hamster',   'restrict'=>'english', 'compability'=>'compability', 'description'=>'description');
            $rows[2] = array('name'=>'Mary',   'category'=>'red',    'screenshot'=>'groundhog', 'restrict'=>'spanish', 'compability'=>'compability', 'description'=>'description');
            $rows[3] = array('name'=>'Seth',   'category'=>'silver', 'screenshot'=>'snake',     'restrict'=>'french', 'compability'=>'compability', 'description'=>'description');
            $rows[4] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[4] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[5] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[6] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[7] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[8] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[9] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[10] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[11] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[12] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $rows[13] = array('name'=>'Sandra', 'category'=>'blue',   'screenshot'=>'cat',       'restrict'=>'mandarin', 'compability'=>'compability', 'description'=>'description');
            $_SESSION['Models'] = $rows;
        // }



        header("Content-type: application/json");
        $jsonData = array('page'=>$page,'total'=>0,'rows'=>array());
        foreach($rows AS $rowNum => $row){
            //If cell's elements have named keys, they must match column names
            //Only cell's with named keys and matching columns are order independent.
            $entry = array('id' => $rowNum,
                'cell'=>array(
                    'No'       => $rowNum,
                    'name'             => $row['name'],
                    'category'   => $row['category'],
                    'screenshot'     => $row['screenshot'],
                    'restrict' => $row['restrict'],
                    'compability' => $row['compability'],
                    'description' => $row['description'],
                )
            );
            $jsonData['rows'][] = $entry;
        }
        $jsonData['total'] = count($rows);
        echo json_encode($jsonData);

}
