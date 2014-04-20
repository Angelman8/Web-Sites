<?php
# Block Page content
# 
# Tag:
#   <permit>user_id</permit>
# Ex:
#   <permit>Pr0;Root;H1;127.0.0.1</permit>
# 
# Enjoy!

 
$wgExtensionCredits['parserhook'][] = array(
        'name' => 'Page permit',
        'description' => 'Block content',
        'author' => 'Ury Yakovlev',
        'url' => 'http://www.mediawiki.org/wiki/Extension:PagePolice'
);
 
$wgHooks['ArticlePageDataAfter'][] = 'check_permit';
$wgHooks['ParserFirstCallInit'][] = 'pp_setup';
 
function pp_setup( Parser $parser ) {
        $parser->setHook( 'permit', 'permit_render' );
       return true;
}
 
function check_permit( $article, $row ) {
  global $wgUser;
  global $wgPPError;
 
  if (!$wgPPError) {
    $wgPPError = "<h1>403 ACCESS DENIED</h1> <meta http-equiv='Refresh' content='5;url=/'>";
  }
 
  $dbw = wfGetDB( DB_MASTER );
  $text_data_row = $dbw->selectRow( 'text',
          array( 'old_text', 'old_flags' ),
          array( 'old_id' => $row->page_latest ),
          __METHOD__ );
  $content = $text_data_row->old_text;
        preg_match('|<permit>(.*)</permit>|Uis', $content, $users_str);
 
        if ($users_str[1]) {
              $input = $users_str[1];
        } else {
              return true;
        }
 
         $users = explode(";", $input);
 
        $allow = false;
        $i=0;
        while ($users[$i]) {
              if ($wgUser->getName() == $users[$i]) {
                    $allow = true;
                    break;
              }
              $i++;
        }
 
        if ($allow) {
              return true;
        } else {
              echo $wgPPError;
              exit;
              return false;
        }
 
  return 0;
}
 
# The callback function for converting the input text to HTML output
function permit_render($input) {
 
        global $wgPPMessage;
 
        if (!$wgPPMessage) {
                $wgPPMessage = "SECURE ZONE (access only for %s)";
        }
 
        $output = sprintf($wgPPMessage, $input);
        return $output;
}