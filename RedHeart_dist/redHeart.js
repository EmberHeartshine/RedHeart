var rhVersion = "0.0.1";
var jsonObj;
async function rhInit(){
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
	if ( listValue === "sum" ) {
		teamTitle.innerHTML = "Summary";
		for ( let i = 0; i < objectLen( jsonObj.teams._teams ); i++ ) {
			let newDiv = document.createElement( "div" );
			newDiv.classList.add( "spacedout" );
			let newContent = document.createTextNode( Object.values( jsonObj.teams._teams )[i].name );
			newDiv.appendChild( newContent );
			teamDiv.appendChild( newDiv );
		};
	} else {
		teamTitle.innerHTML = Object.values( jsonObj.teams._teams )[parseInt( listValue )].name
		for ( let i = 0; i < objectLen( jsonObj.teams._teams[parseInt( listValue )].members ); i++ ) {
			let newDiv = document.createElement( "div" );
			newDiv.classList.add( "spacedout" );
			let newContent = document.createTextNode( Object.values( jsonObj.teams._teams )[parseInt( listValue )].members[i].memberName );
			newDiv.appendChild( newContent );
			teamDiv.appendChild( newDiv );
		};
	};
	teamList.parentNode.replaceChild( teamDiv, teamList );
};
function initTeams(){
	const teamList = document.getElementById( "teamDrop" );
	for ( let i = 0; i < objectLen( jsonObj.teams._teams ); i++ ) {
		let teamOption = document.createElement( "option" );
		teamOption.text = Object.values( jsonObj.teams._teams )[i].name;
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