/*
This file is used to configure your RedHeart installation.
It is recommended that you back this file up when upgrading to avoid data loss.
All variables are declared as globals. This file WILL be visible on your Web server so be careful what you put here!
*/

const dbUrl = "db.json"; // the URL of the database file (note that if your RedHeart instance is served over HTTPS, then dbUrl must also be HTTPS)
const pageTitle = "Example Config"; // title of the page (pretty self-explanatory)
const includeBranding = true; // include the RedHeart branding with version number at the end of the title above
const contestMode = 1; // defines the contest mode: 1 for recruitment mode (i.e. each team member = 1 point for the team; think blood drives or vaccination drives) and 2 for score mode (i.e. each team member can earn any number of "points" that contribute to the group's total; think charity walks or food drives); if mode 2 is used the database will require a "score" field for each team member (This functionality is not implemented yet)
const headerTeam = "Team Name"; // the header item for team names in summary view
const headerTeamCount = "Score"; // the header item for team member number in summary view
const headerMemberName = "Member Name/Handle"; // the header item for a team member's name in team view
const headerMemberDate = "Date Donated"; // the header item for a team member's addition to the team
const headerMemberVerify = "Verified By"; // the header item for the verifying member vouching for a team member