const dbUrl = "db.json";
// Make sure to edit the line above if your database is stored on a different server or in a different directory than RedHeart

const rhVersion = "0.0.5";
var jsonObj;
async function rhInit(){
	console.log( "Initializing RedHeart..." );
	await initJson( dbUrl );
	await initTeams();
	const pageHeader = document.getElementById( "pageHeader" );
	pageHeader.innerHTML = jsonObj._config.pageTitle;
	if ( jsonObj._config.includeBranding ) {
		document.title = jsonObj._config.pageTitle + " - RedHeart v" + rhVersion;
	} else {
		document.title = jsonObj._config.pageTitle;
	};
	showTeam( "sum" );
	console.log( "RedHeart version " + rhVersion + " loaded." );
};
function showTeam( listValue ){
	const teamList = document.getElementById( "teamList" );
	const teamTitle = document.getElementById( "teamTitle" );
	const teamTable = document.createElement( "table" );
	teamTable.id = "teamList";
	const headerRow = document.createElement( "tr" );
	if ( listValue === "sum" ) {
		teamTitle.innerHTML = "Summary";
		for ( let i = 0; i < 2; i++ ) {
			let newHeader = document.createElement( "th" );
			newHeader.setAttribute( "onclick", "sortTable(" + i + ");" );
			newHeader.appendChild( document.createTextNode( Object.values( jsonObj._config.headers )[i] ) );
			headerRow.appendChild( newHeader );
		};
		teamTable.appendChild( headerRow );
		for ( let i = 0; i < objectLen( jsonObj._teams ); i++ ) {
			let newRow = document.createElement( "tr" );
			let nameCol = document.createElement( "td" );
			let teamCol = document.createElement( "td" );
			let newName = document.createTextNode( jsonObj._teams[i].name );
			let teamScore = null;
			if ( jsonObj._config.contestMode === 1 ) {
				teamScore = document.createTextNode( objectLen( jsonObj._teams[i].members ) );
			} else if ( jsonObj._config.contestMode === 2 ) {
				let scoreSum = 0;
				for ( let n = 0; n < objectLen( jsonObj._teams[i].members ); n++ )
					scoreSum = scoreSum + jsonObj._teams[i].members[n].memberScore;
				teamScore = document.createTextNode( scoreSum );
			} else {
				console.log( "Error: contestMode is not set to a valid integer." );
				return 1;	
			};
			nameCol.appendChild( newName );
			teamCol.appendChild( teamScore );
			newRow.appendChild( nameCol );
			newRow.appendChild( teamCol );
			teamTable.appendChild( newRow );
		};
	} else {
		teamTitle.innerHTML = jsonObj._teams[parseInt( listValue )].name;
		for ( let i = 2; i < objectLen( jsonObj._config.headers ); i++ ) {
			let newHeader = document.createElement( "th" );
			newHeader.setAttribute( "onclick", "sortTable(" + ( i - 2 ) + ");" );
			newHeader.appendChild( document.createTextNode( Object.values( jsonObj._config.headers )[i] ) );
			headerRow.appendChild( newHeader );
		};
		teamTable.appendChild( headerRow );
		for ( let i = 0; i < objectLen( jsonObj._teams[parseInt( listValue )].members ); i++ ) {
			let newRow = document.createElement( "tr" );
			for ( let n = 0; n < objectLen( jsonObj._teams[parseInt( listValue )].members[i] ); n++ ) {
				let newCol = document.createElement( "td" );
				let newContent = null;
				if ( jsonObj._config.contestMode === 1 && n === 2 ) {
					newContent = document.createTextNode( "N/A" );
				} else {
					newContent = document.createTextNode( Object.values( jsonObj._teams[parseInt( listValue )].members[i] )[n] );
				};
				newCol.appendChild( newContent );
				newRow.appendChild( newCol );
			};
			teamTable.appendChild( newRow );
		};
	};
	teamList.parentNode.replaceChild( teamTable, teamList );
};
function initTeams(){
	const teamList = document.getElementById( "teamDrop" );
	for ( let i = 0; i < objectLen( jsonObj._teams ); i++ ) {
		let teamOption = document.createElement( "option" );
		teamOption.text = jsonObj._teams[i].name;
		teamOption.value = i;
		teamList.add( teamOption );
	};
	var teamSum = document.createElement( "option" );
	teamSum.text = "All Teams (Summary)";
	teamSum.value = "sum";
	teamList.add( teamSum, 0 );
	teamList.selectedIndex = 0;
};
function objectLen( obj ){
	return Object.keys( obj ).length;
};
function sortTable( n ){
	let table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
	table = document.getElementById( "teamList" );
	headerTab = document.getElementsByTagName( "TH" )[n];
	switching = true;
	dir = "asc";
	while ( switching ) {
		switching = false;
		rows = table.rows;
		for ( i = 1; i < ( rows.length - 1 ); i++ ) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName( "TD" )[n];
			y = rows[i + 1].getElementsByTagName( "TD" )[n];
			if ( dir === "asc" ) {
				if ( isNaN( parseInt( x.innerHTML ) ) ) {
					if ( x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() ) {
						shouldSwitch = true;
						break;
					};
				} else {
					let tempX = parseInt( x.innerHTML.replace(/-/g, "") );
					let tempY = parseInt( y.innerHTML.replace(/-/g, "") );
					if ( tempX > tempY ) {
						shouldSwitch = true;
						break;
					};
				};
			} else if ( dir == "desc" ) {
				if ( isNaN( parseInt( x.innerHTML ) ) ) {
					if ( x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() ) {
						shouldSwitch = true;
						break;
					};
				} else {
					let tempX = parseInt( x.innerHTML.replace(/-/g, "") );
					let tempY = parseInt( y.innerHTML.replace(/-/g, "") );
					if ( tempX < tempY ) {
						shouldSwitch = true;
						break;
					};
				};
			};
		};
		if ( shouldSwitch ) {
			rows[i].parentNode.insertBefore( rows[i + 1], rows[i] );
			switching = true;
			switchCount++;
		} else {
			if ( switchCount === 0 && dir === "asc" ) {
				dir = "desc";
				switching = true;
			};
		};
	};
	for ( i = 0; i < document.getElementsByTagName( "TH" ).length; i++ ) {
		let changeTab = document.getElementsByTagName( "TH" )[i];
		if ( changeTab.innerHTML.includes( "\u25B2" ) || changeTab.innerHTML.includes( "\u25BC" ) ) {
			changeTab.innerHTML = changeTab.innerHTML.substring( 0, changeTab.innerHTML.length - 1 );
		};
	};
	if ( dir === "asc" ) {
		headerTab.innerHTML = headerTab.innerHTML + "&#x25B2;";
	} else {
		headerTab.innerHTML = headerTab.innerHTML + "&#x25BC;";
	};
};
async function initJson( jsonUrl ){
	const response = await fetch( jsonUrl );
	const jsonData = await response.text();
	jsonObj = await JSON.parse( jsonData );
	console.log( "Database version " + jsonObj._meta.version + " loaded." );
};
