<?php  
 // if(!isset($_SERVER['HTTP_X_REQUESTED_WITH'])) die( 'Restricted access' );

define('JPATH_BASE', dirname(__FILE__) );

define( 'DS', DIRECTORY_SEPARATOR );

require_once ('../configuration.php');
$config = new JConfig();

/*connexion à la base de données*/
$connexion = mysql_connect($config->host, $config->user, $config->password ) 
				or die('Connexion impossible : ' . mysql_error());
@mysql_select_db($config->db) or die("Connexion impossible à la base");


if ($_SERVER['SERVER_NAME'] == "www.assu2000.fr") {
	$suffix="";
}
else {
$suffix = "_rct";
}

// parametres URL
$center_lat = $_REQUEST["lat"];
$center_lng = $_REQUEST["lng"];
//$km = $_REQUEST["cercleDistance"];
$km = 30;


// creation du DOM xml
$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);
			 
// selection des agences dans la BDD
$query = sprintf("SELECT ADRESSE_AGENCE, CP_AGENCE, VILLE_AGENCE, LIB_AGENCE, RSP_NOM_AGENCE, TEL_AGENCE, LATITUDE_AGENCE, LONGITUDE_AGENCE, ( 6366 * acos( cos( radians('%s') ) * cos( radians( LATITUDE_AGENCE ) ) * cos( radians( LONGITUDE_AGENCE ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( LATITUDE_AGENCE ) ) ) ) AS distance, m.alias AS url FROM fra2_data".$suffix.".dlpx8_agences a inner join fra2_data".$suffix.".dlpx8_coordonnees_gps_agences b ON a.ID_AGENCE=b.ID_AGENCE LEFT JOIN dlpx8_agences_menu am ON (a.ID_AGENCE = am.agence_id) LEFT JOIN dlpx8_menu m ON am.menu_id=m.id WHERE LATITUDE_AGENCE IS NOT NULL
AND LONGITUDE_AGENCE IS NOT NULL HAVING distance < '%s' ORDER BY distance LIMIT 0 , 5",
  mysql_real_escape_string($center_lat),
  mysql_real_escape_string($center_lng),
  mysql_real_escape_string($center_lat),
  mysql_real_escape_string($km));

$result = mysql_query($query) or die('<br />Requête invalide  : '. mysql_error());
// faire un inner join sur la table menu pour récupérer l'alias   

header("Content-type: text/xml");

// ajout d'un noeud xml pour chaque agence trouvée
while($infoagence = mysql_fetch_assoc($result)){
  $node = $dom->createElement("marker");
  $newnode = $parnode->appendChild($node);
  $newnode->setAttribute("name", $infoagence['VILLE_AGENCE']);
  $newnode->setAttribute("email", $infoagence['LIB_AGENCE']);
  $newnode->setAttribute("address", utf8_encode($infoagence['ADRESSE_AGENCE']).'<BR/>'.$infoagence['CP_AGENCE'].' '.$infoagence['VILLE_AGENCE']);
  $newnode->setAttribute("lat", $infoagence['LATITUDE_AGENCE']);
  $newnode->setAttribute("lng", $infoagence['LONGITUDE_AGENCE']);
  $newnode->setAttribute("distance", $infoagence['distance']);
  $newnode->setAttribute("alias", $infoagence['url']);
}
mysql_free_result($result);

echo $dom->saveXML();
?>