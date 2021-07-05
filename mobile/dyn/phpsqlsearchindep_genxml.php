<?php  
 if(!isset($_SERVER['HTTP_X_REQUESTED_WITH'])) die( 'Restricted access' );

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

// parametre de l'url
$dep = $_REQUEST["dep"];

// Start XML file, create parent node
$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);
			 
// Search the rows in the markers table
$query = sprintf("SELECT ADRESSE_AGENCE, CP_AGENCE, VILLE_AGENCE, LIB_AGENCE, RSP_NOM_AGENCE, TEL_AGENCE, LATITUDE_AGENCE, LONGITUDE_AGENCE, m.alias AS url FROM fra2_data".$suffix.".dlpx8_agences a inner join fra2_data".$suffix.".dlpx8_coordonnees_gps_agences b on a.ID_AGENCE=b.ID_AGENCE LEFT JOIN dlpx8_agences_menu am ON (a.ID_AGENCE = am.agence_id) LEFT JOIN dlpx8_menu m ON am.menu_id=m.id WHERE LATITUDE_AGENCE IS NOT NULL AND LONGITUDE_AGENCE IS NOT NULL AND SUBSTRING(CP_AGENCE, 1, 2) = '%s' ORDER BY LIB_AGENCE LIMIT 0 , 20",
  mysql_real_escape_string($dep));
$result = mysql_query($query) or die('<br />Requête invalide  : '. mysql_error());
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
  $newnode->setAttribute("alias", $infoagence['url']);
}

mysql_free_result($result);


echo $dom->saveXML();
?>