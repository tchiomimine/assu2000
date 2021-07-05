<?php 
/*************
* include xiti et tag commander
*************/
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$debug = 0;
$xtsd = "http://logc279";
$xtsite ="542751";
if((strpos($_SERVER["SERVER_NAME"],'www.assu2000.fr') !== false) 
	|| (strpos($_SERVER["SERVER_NAME"],'preprod.assu2000.fr') !== false) ){
if (isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) && (strtolower($_SERVER['HTTPS']) != 'off'))
 {
	$xtsd = "https://logs6";
 }
 else
 {
	$xtsd = "http://logi4";
 }
	$xtsite ="291820"; 
}
$xtniveau2 = "15";
$xtergo ="1";
$xt_pagetype="";
$xt_multc_result="";
$xt_multc = array();
$xt_ac = "1";
$env_template="fiche pratique";

/****************
$xt_ac pour identifier les visiteurs
1 desktop
2 mobile
*****************/
$issmartphone = getenv('issmartphone');
if($issmartphone) $xt_ac = "2";

$nom_page = str_replace("/","::",$path); 
$nom_page = trim($nom_page, "::");
$nom_page = str_replace(".html","",$nom_page); 

if($debug) :
	echo '<div style="font-size:11px;position:fixed;left:0;bottom:0;background:#000;color:#fff;z-index:999;padding:5px 10px;"><b>Xiti</b>';
	echo '<br />path = '.$path;
	echo '<hr>';
	echo 'xtsd = '.$xtsd;
	echo '<br />xtsite = '.$xtsite;
	echo '<br />xtniveau2 = '.$xtniveau2;
	echo '<br />xtpage = '.$nom_page;
	echo '<br />xt_pagetype = '.$xt_pagetype;
	echo '<br />xt_multc ='.$xt_multc_result;
	echo '<br />xt_ac ='.$xt_ac;
	echo '<br />xtergo ='.$xtergo;
	echo '<br />env_template ='.$env_template;
	echo '</div>';
endif;
?>
              
<!-- marquage xiti -->
<script type="text/javascript">

	function readCookie(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

<!--
<?php if($xt_pagetype != '') : ?>
xt_pagetype="<?php echo $xt_pagetype; ?>";
if (window.xtparam!=null){window.xtparam+="&ptype="+xt_pagetype;}else{xtparam = "&ptype="+xt_pagetype;};
<?php endif;?>
xtnv = document;                
xtsd = "<?php echo $xtsd; ?>";
xtsite = "<?php echo $xtsite; ?>";
xtn2 = "<?php echo $xtniveau2; ?>";    
xtpage = "<?php echo $nom_page; ?>"; 
xtdi = "";   
xt_ac  = "<?php echo $xt_ac; ?>";
xt_an = "";
<?php if($xtergo != '') : ?>
xtergo = "<?php echo $xtergo; ?>"; 	
<?php endif;?>
xt_multc ="<?php echo $xt_multc_result; ?>";
//do not modify below
if (window.xtparam!=null){window.xtparam+="&ac="+xt_ac+xt_multc;}
else{window.xtparam ="&ac="+xt_ac+xt_multc;};
//-->
</script>
<script type="text/javascript" src="/xtclicks.js"></script>
<script type="text/javascript" src="/xtcore.js"></script>
<noscript>
<img width="1" height="1" alt="" src="<?php echo $xtsd; ?>.xiti.com/hit.xiti?s=<?php echo $xtsite; ?>&s2=<?php echo $xtniveau2; ?>&p=<?php echo $nom_page; ?><?php echo $xt_multc_result; ?>&ac=<?php echo $xt_ac; ?>&di=&" />
</noscript>
<!-- marquage tagcommander -->
<?php
	// type device
	$env_channel="desktop"; 
	if($xt_ac == "2"){$env_channel = "mobile";}
	// environnement
	$env_work="PROD";
	if(strpos($_SERVER['SERVER_NAME'], 'recette') !== false){ 
		$env_work="RCT"; 
	} else if(strpos($_SERVER['SERVER_NAME'], 'preprod') !== false){ 
		$env_work="PROD"; 
	} else if(strpos($_SERVER['SERVER_NAME'], 'local_') !== false){
		$env_work="LOCAL"; 
	}
	
	$user_id="";
	
	$page_cat = explode('::',$nom_page); 
	$page_cat_nb = count($page_cat);
	$page_cat_list = "";
	
	if($page_cat_nb > 1) {
		for($i=0; $i < $page_cat_nb-1 ; $i++) {
			$j = $i+1;
			$page_cat_list .= '"page_cat'.$j.'" :  "'.$page_cat[$i].'" , ';
		}
	}
	$page_name = $page_cat[$page_cat_nb-1];
	
	$page_error = "";
	
	$xt_multc_val="";
	if(count($xt_multc_val)>0){
		foreach($xt_multc as $value){$xt_multc_val .= $value;}
		$xt_multc_val = str_replace('-','_',$xt_multc_val);
	}	

?>
<!-- TAG COMMANDER START //-->
<script type="text/javascript">
//<![CDATA[
var userlogged = "no";
	var user_id=readCookie('numeroSoucripteur');
	if(user_id!=''){ userlogged = "yes"; }

    var tc_vars = {
        "env_template" : "<?php echo $env_template; ?>", 
        "env_work" : "<?php echo $env_work; ?>",
        "env_channel" : "<?php echo $env_channel; ?>", 
        "env_language" : "fr",  
        "env_country" : "France", 
        "env_dnt" : "disabled",  
        "env_site" : "assu2000", 
        "user_id" : user_id, 
        "user_logged" : userlogged,
        <?php echo $page_cat_list; ?> 
        "page_name" : "<?php echo $page_name; ?>", 
        "page_error" : "", 
        "conversion_funnel_name" : "", 
        "conversion_funnel_name2" : "", 
        "conversion_funnel_step" : "",  
        "conversion_simulation_id" : "", 
        "conversion_contract_id" : "",  
        "conversion_file_id" : "",  
        "conversion_amount_ati" : "", 
        "conversion_discount_ati" : "",  
        "conversion_amount_tf" : "",  
        "conversion_discount_tf" : "", 
        "promo_code" : "",  
        "conversion_newcustomer" : "",  
        "conversion_score" : "",  
        "conversion_currency" : "",  
        "conversion_email" : "",  
        "conversion_products" : "", 
        "product_name" : "", 
        "product_url_page" : "", 
        "search_keywords" : "",  //=  xt_mtcl 
        "search_page_number" : "",  //= xt_npg
        "search_results_number" : "", 
        "search_filters" : "", 
        "xtsd" : "<?php echo $xtsd; ?>",
        "xtsite" : "<?php echo $xtsite; ?>",
        "xtergo" : "<?php echo $xtergo; ?>",
        "xtpagetype" : "<?php echo $xt_pagetype; ?>",
        "xt_multc" : "<?php echo $xt_multc_val; ?>", 
        "xt_tags" : "",
        "xtform" : "",  
        "xtn2" : "<?php echo $xtniveau2; ?>",
        "xtncom" : "", 
        "xt_orderid" : "",  
        "xt_roimt" : "",  
        "xt_paym" : "", 
        "xt_promocode" : "", 
        "xt_ordermc" : "" 
    }
//]]>
</script>
<script type="text/javascript" src="/external/assets/tc_body_static_fra2.js"></script>
<noscript><iframe src="//redirect1207.tagcommander.com/utils/noscript.php?id=4&amp;mode=iframe" width="1" height="1" rel="noindex,nofollow"></iframe></noscript>
<script type="text/javascript" src="/external/assets/tc_body_fra2.js"></script>
<noscript><iframe src="//redirect1207.tagcommander.com/utils/noscript.php?id=8&amp;mode=iframe" width="1" height="1" rel="noindex,nofollow"></iframe></noscript>
<!-- TAG COMMANDER END //-->