<?php header('Content-type: text/css'); ?>

<?php

$cssfile = '../css/espaceclient-ea.css';

echo file_get_contents($cssfile);
?>

.header .menu > li > a {font-size:14px; font-weight:normal}
#espace a{color:#333333; font-size:14px; font-weight:normal}
.ico a {font-size: 0.8em !important}
.footer .menu{border:none; height:auto; text-align:left !important}
TABLE.tabs tr td tr td{border-radius:0 !important}
.espaceclient .espaceClientHabillageHome {width: 125px !important}
.espaceclient .client-bottom{padding: 10px; line-height: 1.3em;}
.espaceclient .client-bottom h3{color: red; margin: 10px 0;}
/*.client-login .col-1{width:490px}*/
.client-login .col-1 { width: 490px; position: absolute; }

.listLineLite, .ListLineLite {background-color: #DCEEC9 !important}
.listHeader {background-color: #05285B !important}
.listLineDark, .ListLineDark {background-color: #9ECB6A !important}
.listLineLite td div, .listLineDark td div,  .ListLineDark td div{color:#3B3B3D !important; font-weight:bold}

/*detail contrat*/
#corps DIV#workWindow.detailContrat h1{border-bottom:none}
#corps DIV#workWindow.detailContrat .listHeader, .listLineSelected td, .listLineSelected td a  {color: #FFF !important}
/*
#corps DIV#workWindow.AUTO h1{color:#249AFF; border-color:#249AFF}
#corps DIV#workWindow.MOTO h1{color:#FA6000; border-color:#FA6000}
#corps DIV#workWindow.MRH h1{ color:#6D20C4; border-color:#6D20C4}
#corps DIV#workWindow.SANTE h1{color:#28A700; border-color:#28A700}
#corps DIV#workWindow.ANIM h1{ color:#706050; border-color:#706050}
*/
/*.espaceclient div#page,.espaceclient .content{width:1100px;padding:0 auto}
.espaceclient .headerbis, .espaceclient .header, .espaceclient #mainmenu{width:1100px}
.espaceclient h1{margin-bottom:5px; width:1035px}*/
.espaceclient div#page, .espaceclient .content { width: 988px; padding: 0 auto; }  
.espaceclient .headerbis, .espaceclient .header, .espaceclient #mainmenu { width: 100%; }  
.espaceclient h1 { margin-bottom: 5px; width: 925px; }
.espaceclient #mainmenu{top:0}
.espaceclient .menu_haut a{color:#5C5C5C;text-decoration:none;font-size:10px;font-weight:normal}

#coordonneesBody #workWindow tr.listHeader td{color:#fff}
.ongletTextEna{padding-top:5px}

.espaceclient #corps DIV#workWindow h1 {min-height:0 !important;background:#E3E3E3 !important}
.espaceclient #corps #ctr{margin:0}

.espaceclient DIV.menuTemplate { left:0 !important;  margin:0 !important}
.client-droite .col-1 {/*width: 890px;*/}

.espaceclient #corps DIV#workWindow h1,
.espaceclient .menuTemplate .menu, .espaceclient .menuTemplate .menu:hover, .espaceclient .menuTemplate .menu_over, .espaceclient .menuTemplate .menu_over:hover, .espaceclient .menuTemplate .menu_onclick, .espaceclient .menuTemplate .menu_onclick:hover {background:#E3E3E3}
/*.footer{width:auto;}*/
.footer { width: 988px; margin: auto; }

/*sante*/
.espaceclient DIV#workWindow.detailContrat .infoContrat .listHeader td,
.espaceclient DIV#workWindow.detailContrat tr.listLineLiteMenuWithoutCursor td div{color:#fff}
.espaceclient DIV#workWindow.detailContrat .infoContrat .listHeader tr.listLineLiteMenu td{ color:#333}


.prospect .item-page{min-height:0; margin-bottom:1em}
.prospect #corps DIV#workWindow,.prospect .mentionsLegales {width:640px !important; margin-left:0}
.prospect #corps DIV#workWindow{border-left:none; font-size:13px;padding: 0 0 10px 50px !important}
.prospect div.clientsatisfait {font-weight:bold;}
.prospect DIV#workWindow form table td {padding-top:5px}
.prospect DIV#workWindow form table td td td{padding:0}
.prospect DIV#workWindow form table td td td select{margin-left:5px;}
.prospect DIV#workWindow form table td td td.libelle{padding-left:5px}
.prospect DIV#workWindow form table td td td td{padding:0}
.prospect DIV#workWindow form table td fieldset{padding:0; border:none; margin-top:-5px}
.prospect td.libelle {padding-left:0}
.prospect #telephone{margin-left: -3px}
.prospect .label {padding-right: 5px}
#callback fieldset{border: none; padding :0}

table.buttonContainer{margin:10px}


/* client-login responsive */
@media screen and (max-width:767px) {
	.espaceclient.tplproximeo.client-login div#page, .espaceclient.tplproximeo.client-login .content, .espaceclient.tplproximeo.client-login .headerbis, .espaceclient.tplproximeo.client-login .header {
 		width:100%;
	}
	.espaceclient.tplproximeo.client-login #logosite {
    left: 0;
	}
	.espaceclient.tplproximeo.client-login .headerbis, .espaceclient.tplproximeo.client-login .header, .espaceclient.tplproximeo.client-login .footer, .espaceclient.tplproximeo.client-login .content {margin-left: 0px}
	.espaceclient.tplproximeo.client-login h1 {
	  padding: 0;
    text-align: left;
    width: auto;
    height: auto;
    background: none;
    font-size: 16px;
    padding: 0;
    min-height: 0;
    margin: 5px;
  }
  .espaceclient.tplproximeo.client-login .col-1, .espaceclient.tplproximeo.client-login .col-2, .tplproximeo.client-login .col-2 .espaceClientContenuHome {
  	width:auto;
  	margin: 10px;
  }
  
  .client-login #corps, .client-login #corps .login {
  	width: auto;
  	min-width: 0px;
  }
  
  .login p {
    padding: 0 0.5em 0 0.5em;
	}
	
	.client-login #corps p {
	 line-height : 1em;
	}
	
	TD.ongletTextEna, TD.ongletTextDis, .client-login .ongletMain {
		border-width:6px;
	}

	.client-login .ongletMain {
			padding: 6px !important;
	}
	A.ongletTextDis {
		padding-bottom: 3px;
	}
	
	span#aideIdentifiant {
		display:block;
		float:left;
	}
}
