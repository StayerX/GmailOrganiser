# GmailOrganiser

This allows you to automatically organise your emails into subdirectories based on the sender.
Specifically the default will see all the emails with the label `in:trash` and for each one of them, see all the people involved in the conversation, create a label for each one of them and finaly label the email with all the labes. 

## Customisation
The scrit allows some basic easy customisation. In the top of it wou may find : 
```js
var LABEL = "in:trash"; // which mail to organize ("in:trash","in:to-organise","is:read AND in:inbox")
var limit = 30; //maximum mail to process at one itteration (10-40: too many emails will cause google to block the script)
var freqInMinutes = 30; // How often to execute this script (every 10-50 minutes is great)
var createSumarry = true; // Create and email a summary of the processed emails (true/false).
```
* `LABEL`: the [label](http://weblogs.asp.net/craigshoemaker/search-multiple-labels-in-gmail) for the emails that we will process.
* `limit`: maximum mail to process at one itteration (10-40: too many emails will cause google to block the script).
* `freqInMinutes`: How often to execute this script (every 10-50 minutes is great).
* `createSumarry`: Create and email a summary of the processed emails (true/false). An email is then send to the email owner with a reference to all the processed emails.

Furthermore since it is open source you can modify it in any way you desire, but make sure what you are doing since it could mess up your email.

## Installation
* Copy the script file to [https://script.google.com/intro](https://script.google.com/intro). 
* Rename the script ![Script Rename](https://cdn.rawgit.com/StayerX/GmailOrganiser/master/visual/rename_script.png).
* Select `Install` and  then `run` ![Script Install](https://cdn.rawgit.com/StayerX/GmailOrganiser/master/visual/install_script.png).

## Unstallation
* Find the script in google drive and open it in google script.
* Select `Uninstall` and  then `run` ![Script Unstall](https://cdn.rawgit.com/StayerX/GmailOrganiser/master/visual/uninstall_script.png).
