/*
This file is used to configure your RedHeart installation.
It is recommended that you back this file up when upgrading to avoid data loss.
All variables are declared as globals. This file WILL be visible on your Web server so be careful what you put here!
*/

// the URL of the database file (note that if your RedHeart instance is served over HTTPS, then dbUrl must also be HTTPS)
const dbUrl = "db.json";

// title of the page (pretty self-explanatory)
const pageTitle = "Example Config";

// include the RedHeart branding with version number at the end of the title above
const includeBranding = true;

// defines the contest mode: 1 for recruitment mode (i.e. each team member = 1 point for the team; think blood drives or vaccination drives) and 2 for score mode (i.e. each team member can earn any number of "points" that contribute to the group's total; think charity walks or food drives)
const contestMode = 1;

// the header item for team names in summary view
const headerTeam = "Team Name";

// the header item for score counting (number of members in mode 1, team score in mode 2)
const headerTeamScore = "Score";

// the header item for a team member's name in team view
const headerMemberName = "Member Name/Handle";

// the header item for a team member's addition to the team or when they last donated
const headerMemberDate = "Date Donated";

// the header item for the verifying member vouching for a team member
const headerMemberVerify = "Verified By";