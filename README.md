![RedHeart Logo](/_img/rhLogo.svg)
# RedHeart
A team donation/goal contest tracking tool utilizing JSON ~~and IndexedDB~~ and nothing else because I'm bad at JavaScript and IndexedDB is beyond my capabilities right now.

## Getting Started
RedHeart is designed to run on a simple web server and should require very little configuration. Simply place all of the files in the [\_dist directory](/RedHeart_dist) into a Web-facing directory and edit `config.js` to your liking. The "database" itself is simple flat JSON following this format:

``` json
{
	"teams": {
		"_meta": {
			"version": 1,
			"date": "2020-09-15",
			"updatedBy": "somePerson"
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
}
```
The database JSON file does not need to be stored on the same server as the rest of the files, but be sure to edit the `dbUrl` variable in `config.js` to point to the new location.

The following fields are optional and can be safely deleted:
* `_meta.date`
* `_meta.updatedBy`

The `memberScore` field is intended for mode 2, but **must** be included. In mode 1, the score will read as "N/A" regardless of value and will not contribute to the total team score in the summary view.

As I work on this project more I plan to create a page that can generate valid JSON for the purposes of this tool, but that's very far in the future and may never happen.

If you're unfamiliar with JSON, I recommend a generator such as [ObjGen](http://www.objgen.com/json) to help you out.

## Modes
* **Mode 1** (`contestMode = 1;`) is recruitment mode; that is, the team's total score will be determined by the number of members on that team. This can be useful for individual events, such as blood donation or one-time volunteering opportunities.
* **Mode 2** (`contestMode = 2;`) is score accrual mode; that is, the team's total score will be determined by the sum of each member's `memberScore` value. This is useful for events that can have multiple individual contributions, such as charity walks or food drives.

## Demo
There is a demo of this site located [here](https://emberheartshine.github.io/RedHeart/RedHeart_dist/). All information is loaded directly from this repo, and the site automatically updates whenever a change is pushed. This is the actual ideal use case model I am building around.
