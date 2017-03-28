angular.module('myApp', [])

.controller('MainController', function($http){
	var vm = this;

	/*
	$http.get('/api/items')
	  .then(function(data){
		

		vm.items = data.items;

	  })
	*/

	vm.items = [{"item":"Hetero Drugs Limited","ingredients":["PRAVASTATIN SODIUM","MINI HAND SANITIZER - ORANGE AND LEMON","babies r us gas relief","Diltiazem Hydrochloride","First Aid Antiseptic"]},
	{"item":"NorthStar Rx LLC","ingredients":["PROCHLORPERAZINE MALEATE","HA","Depo-Medrol","ELF TINTED MOISTURIZER"]},
	{"item":"L'Oreal USA Products Inc","ingredients":["Methadone Hydrochloride","Energain","Alclometasone Dipropionate","Apple Cider Antibacterial Foaming Hand Wash"]},
	{"item":"Shield Line LLC","ingredients":["SEREVENT","Secura Two Step Kit","Kleenex Antiseptic Skin Cleanser","donepezil hydrochloride","Strattera"]},
	{"item":"Mylan Pharmaceuticals Inc.","ingredients":["Budesonide","ESIKA","CLEAR PORE SERUM","Garnier Moisture Rescue Lightweight UV"]},
	{"item":"Lake Erie Medical & Surgical Supply DBA Quality Care Products LLC","ingredients":["DR. RECKEWEG R66 Arrhythmin","Banzel"]},
	{"item":"SHISEIDO AMERICA INC.","ingredients":["Benazepril Hydrochloride","CARE ONE","ISOSORBIDE DINITRATE","Head and Shoulders Conditioner","Senna-Lax"]},
	{"item":"Rebel Distributors Corp","ingredients":["risperidone","OSENI"]},
	{"item":"UNITED EXCHANGE CORP","ingredients":["Antiseptic","METOPROLOL TARTRATE"]},
	{"item":"McKesson","ingredients":["HealthMart","Non-Aspirin Sinus Congestion and Pain","Moist SURE","Epstein Barr Virus Remedy"]},
	{"item":"SHISEIDO AMERICA INC.","ingredients":["L DOPA","Health Mart nicotine polacrilex","Zolpidem Tartrate"]},
	{"item":"Qualitest Pharmaceuticals","ingredients":["Amoxicillin","Amlodipine Besylate and Benazepril Hydrochloride","Quetiapine Fumarate","Rhus Tox","Cosyntropin"]},
	{"item":"LUMENE OY","ingredients":["Smut, Wheat","Denti-Care Denti-Foam"]},
	{"item":"APP Pharmaceuticals, LLC","ingredients":["Pinworm","Helminthosporium","Furosemide"]},
	{"item":"Aqua Pharmaceuticals","ingredients":["Mastic Dent Oulo Action","Influenza Remedy","Bacteria"]},
	{"item":"ORIGINS NATURAL RESOURCES INC.","ingredients":["Head and Shoulders","SILICEA","PCXX ONE MINTE GEL WATERMELON SPLASH","MS CONTIN","Ampicillin"]},
	{"item":"Eon Labs, Inc.","ingredients":["enema","CVS Pharmacy Premium Wash","Venlafaxine Hydrochloride","Escitalopram"]},
	{"item":"Pharmaceutical Associates, Inc.","ingredients":["Sheer Genius Liquid Foundation - Medium Dark Look","Minoxidil for Women"]},
	{"item":"Jubilant Cadista Pharmaceuticals Inc.","ingredients":["Adderall","Dipyridamole"]},
	{"item":"DZA Brands LLC","ingredients":["Orajel","Risperidone","Androgel","Levocetirizine dihydrochloride"]}];
})
