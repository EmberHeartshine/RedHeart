/*
This file is used to configure your RedHeart installation.
It is recommended that you back this file up when upgrading to avoid data loss.
All variables are declared as globals. This file WILL be visible on your Web server so be careful what you put here!
*/

var dbUrl = "db.json"; // the URL of the database file (note that if your RedHeart instance is served over HTTPS, then dbUrl must also be HTTPS)
var pageTitle = "Example Config"; // title of the page (pretty self-explanatory)
var includeBranding = true; // include the RedHeart branding with version number at the end of the title above