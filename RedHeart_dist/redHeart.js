const rhVersion = "0.0.2";
var jsonObj;
async function rhInit(){
	const pageHeader = document.getElementById( "pageHeader" );
	pageHeader.innerHTML = pageTitle;
	if ( includeBranding === true ) {
		document.title = pageTitle + " - RedHeart v" + rhVersion;
	} else {
		document.title = pageTitle;
	};
	await initJson( dbUrl );
	await initTeams();
	showTeam( "sum" );
};
function showTeam( listValue ){
	const teamList = document.getElementById( "teamList" );
	const teamTitle = document.getElementById( "teamTitle" );
	var teamDiv = document.createElement( "div" );
	teamDiv.id = "teamList";
	let headerDiv = document.createElement( "div" );
	let headerDivCol1 = document.createElement ( "div" );
	let headerDivCol2 = document.createElement ( "div" );
	headerDiv.classList.add( "divRow" );
	headerDivCol1.classList.add( "divCol", "divHeader" );
	headerDivCol2.classList.add( "divCol", "divHeader" );
	if ( listValue === "sum" ) {
		teamTitle.innerHTML = "Summary";
		headerDivCol1.appendChild( document.createTextNode( headerTeam ) );
		headerDivCol2.appendChild( document.createTextNode( headerTeamCount ) );
		headerDiv.appendChild( headerDivCol1 );
		headerDiv.appendChild( headerDivCol2 );
		teamDiv.appendChild( headerDiv );
		for ( let i = 0; i < objectLen( jsonObj.teams._teams ); i++ ) {
			let newDiv = document.createElement( "div" );
			let nameCol = document.createElement( "div" );
			let teamCol = document.createElement( "div" );
			let newContent = document.createTextNode( jsonObj.teams._teams[i].name );
			let teamCount = document.createTextNode( objectLen( jsonObj.teams._teams[i] ) );
			newDiv.classList.add( "divRow" );
			nameCol.classList.add( "divCol" );
			teamCol.classList.add( "divCol" );
			nameCol.appendChild( newContent );
			teamCol.appendChild( teamCount );
			newDiv.appendChild( nameCol );
			newDiv.appendChild( teamCol );
			teamDiv.appendChild( newDiv );
		};
	} else {
		let headerDivCol3 = document.createElement ( "div" );
		headerDivCol3.classList.add( "divCol", "divHeader" );
		teamTitle.innerHTML = jsonObj.teams._teams[parseInt( listValue )].name;
		headerDivCol1.appendChild( document.createTextNode( headerMemberName ) );
		headerDivCol2.appendChild( document.createTextNode( headerMemberDate ) );
		headerDivCol3.appendChild( document.createTextNode( headerMemberVerify ) );
		headerDiv.appendChild( headerDivCol1 );
		headerDiv.appendChild( headerDivCol2 );
		headerDiv.appendChild( headerDivCol3 );
		teamDiv.appendChild( headerDiv );
		for ( let i = 0; i < objectLen( jsonObj.teams._teams[parseInt( listValue )].members ); i++ ) {
			let newDiv = document.createElement( "div" );
			newDiv.classList.add( "divRow" );
			for ( let n = 0; n < objectLen( jsonObj.teams._teams[parseInt( listValue )].members[i] ); n++ ) {
				let newCol = document.createElement( "div" );
				let newContent = document.createTextNode( Object.values( jsonObj.teams._teams[parseInt( listValue )].members[i] )[n] );
				newCol.classList.add( "divCol" );
				newCol.appendChild( newContent );
				newDiv.appendChild( newCol );
			}
			teamDiv.appendChild( newDiv );
		};
	};
	teamList.parentNode.replaceChild( teamDiv, teamList );
};
function initTeams(){
	const teamList = document.getElementById( "teamDrop" );
	for ( let i = 0; i < objectLen( jsonObj.teams._teams ); i++ ) {
		let teamOption = document.createElement( "option" );
		teamOption.text = jsonObj.teams._teams[i].name;
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
async function initJson( jsonUrl ){
	const response = await fetch( jsonUrl );
	const jsonData = await response.text();
	jsonObj = await JSON.parse( jsonData );
	console.log( "JSON data v" + jsonObj.teams._meta.version + " loaded!" );
};