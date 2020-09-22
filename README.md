![RedHeart Logo](/_img/rhLogo.svg)
# RedHeart
A team donation/goal contest tracking tool utilizing simple, human-readable JSON to store data. RedHeart is intended to be simple to set up and deploy, and offers very minor customization options.

## Getting Started
RedHeart is designed to run on a simple web server and should require very little configuration. Simply place all of the files in the [\_dist directory](/RedHeart_dist) into a Web-facing directory on a HTTP/S server and edit the `_config` database object to your liking. Note that due to security settings in both Chrome and Firefox RedHeart ***will not*** work if `db.json` is stored locally. It ***must*** be on an accessible Web server (such as GitHub). The "database" itself is simple flat JSON following this format:

``` json
{
	"_meta": {
		"version": 1
	},
	"_config": {
		"pageTitle": "Example Config",
		"includeBranding": true,
		"contestMode": 1,
		"sumHeaders": {
			"headerTeam": "Team Name",
			"headerScore": "Score"
		},
		"teamHeaders": {
			"headerMemberName": "Name/Handle",
			"headerMemberDate": "Date Donated",
			"headerMemberScore": "Score",
			"headerMemberVerify": "Verified By"
		}
	},
	"_teams": [
		{
			"name": "Team 1 Name Here",
			"members": [
				{
					"memberName": "Team 1 Member 1 Name Here",
					"memberDate": "2020-08-20",
					"memberScore": 1,
					"verifiedBy": "somePerson"
				},
				{
					"memberName": "Team 1 Member 2 Name here",
					"memberDate": "2020-08-25",
					"memberScore": 3,
					"verifiedBy": "someOtherPerson"
				}
			]
		}
	]
}
```
A few caveats:
* The database JSON file does not need to be stored on the same server as the rest of the files, but be sure to edit the `dbUrl` variable in `redHeart.js` to point to the new location.
* Date strings under `memberDate` should be in the format `YYYY-MM-DD`. If it isn't, the column won't sort properly.
* I took a shortcut to generate the table that speeds up parsing, but it also means that all fields under each `members` object must be in the same order as all of `_config.teamHeaders[x]` items. The order given is probably the easiest way to go.
* All fields are required (including `memberScore` if using mode 1, though its value will get ignored).
  * It is possible to remove `memberScore` from each `members[x]` object, but then you must also delete `_config.teamHeaders.headerMemberScore` otherwise you will have one too many column headers.
* You can use the `_meta` object to store any kind of extra data you want, such as a last-changed date. Everything except `version` will be ignored by RedHeart.

As I work on this project more I plan to create a page that can generate valid JSON for the purposes of this tool, but that's very far in the future and may never happen.

If you're unfamiliar with JSON, I recommend a generator such as [ObjGen](https://beta5.objgen.com/json/) to help you out.

## Config Values
* `pageTitle`: Defines both the title of the page and the header text above the team selector.
* `includeBranding`: If set to `true`, the RedHeart version number will be included in the page title (but not in the header text).
* `contestMode`: See [Modes](#modes) below.
* `headerTeam`: The header item above the team names in summary view.
* `headerScore`: The header item above the score or number of members in summary view.
* `headerMemberName`: The header item above the member names in team view.
* `headerMemberDate`: The header item above the member join/donate dates in team view.
* `headerMemberScore`: The header item above the score in team view. This will usually be the same as `headerScore` above.
* `headerMemberVerify`: The header item above the verifying name in team view. You could hypothetically use this column for any arbitrary extra data you want to display.

### Modes
* **Mode 1** (`"contestMode": 1,`) is recruitment mode; that is, the team's total score will be determined by the number of members on that team. This can be useful for individual events, such as blood donation or one-time volunteering opportunities. In mode 1, a member's score will read as "N/A" regardless of `memberScore` value and will not contribute to the total team score in the summary view.
* **Mode 2** (`"contestMode": 2,`) is score accrual mode; that is, the team's total score will be determined by the sum of each member's `memberScore` value. This is useful for events that can have multiple individual contributions, such as charity walks or food drives.

## Stylesheet
There is an `overrides.css` file included, that gets loaded *after* `redHeart.css` (i.e. it will override, since it is lower on the cascade). I suggest putting any style changes you want into this file, and backing it up when you update. This will make sure your style doesn't break in the unlikely event that `index.html` changes.

## Demo
There is a demo of this site located [here](https://emberheartshine.github.io/RedHeart/RedHeart_dist/). All information is loaded directly from this repo, and the site automatically updates whenever a change is pushed.

The demo is in mode 2.
