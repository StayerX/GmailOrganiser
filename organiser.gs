/**
	* Customisation
*/
// For gmail labels http://weblogs.asp.net/craigshoemaker/search-multiple-labels-in-gmail
var LABEL = "in:trash"; // which mail to organize ("in:trash","in:to-organise","is:read AND in:inbox")
var limit = 30; //maximum mail to process at one itteration (10-40: too many emails will cause google to block the script)
var freqInMinutes = 30; // How often to execute this script (every 10-50 minutes is great)
var createSumarry = true; // Create and email a summary of the processed emails (true/false).
//End of customisation


function Install() {
	ScriptApp.newTrigger("processTrash").timeBased().everyMinutes(freqInMinutes).create();
}

function Uninstall() {
	ScriptApp.deleteTrigger("processTrash");
}

//
/**
	* Retrieves all email threads in trash, moves them to folder "archive" and logs the respective subject lines.
	* For more information on using the GMail API, see
	* https://developers.google.com/apps-script/class_gmailapp
*/
function processTrash() {
	
	var thread, thrd, subject, link, body, from,
	date, html, emails, color, index = [], i;
	
	// get all threads in inbox
	var threads =  GmailApp.search(LABEL); 
	
	for (var i = 0; i < threads.length && i < limit ; i++) {
		// get all messages in a given thread
		var messages = threads[i].getMessages();
		// iterate over each message
		for (var j = 0; j < messages.length ; j++) {
			
			//if it exists
			if (messages[j]) {
				thread    = messages[j];
				subject   = thread.getSubject();
				body      = processHTML(thread.getBody(), 250);
				link      = thread.getId(); // can also use GetPermalink()  
				from      = thread.getFrom();
				date      = Utilities.formatDate(thread.getDate(),
				Session.getScriptTimeZone(), "MMM dd, yyyy");
				// log message subject
				Logger.log(subject);   
				// label the first thread in the inbox with the label MyLabel
				thrd =thread.getThread();
				var label = GmailApp.getUserLabelByName(from);
				//Utilities.sleep(1);
				if(label){
					label.addToThread(thrd);
				}else{
					GmailApp.createLabel(from);
					label = GmailApp.getUserLabelByName(from);
					Logger.log("Created new label: "+from);   
					label.addToThread(thrd);
				}
				if (i%2 == 0) color = "#f0f0f0"; else color = "#f9f9f9";
				html += "<p>On " + date + ", <i>" + from + "</i> wrote: ";
				html += "<strong>" + subject + "</strong><br /><br />";
				html += body  + " <a href='https://mail.google.com/mail/#all/";
				html += link + "'>Click to read »</a></p>";    
			}
			html += "<p><a href='https://drive.google.com/drive/search?q=type:script'>click here</a>, open the mail script and run dissable to > unsubscribe.</p> ";  
		}
	}
	if(threads.length>0 && createSumarry){
		GmailApp.sendEmail(Session.getActiveUser().getEmail(),
		threads.length + " messages archived ", "",
		{ htmlBody: html });
		//To archive:                 
		threads=GmailApp.getTrashThreads();
		for (var i = 0; i < threads.length && i < limit ; i++) {
			GmailApp.moveThreadToArchive( threads[i]);
		}
	}
};

/**
	* Retrieves a given user label by name and logs the number of unread threads
	* associated with that that label.
	* For more information on interacting with GMail labels, see
	* https://developers.google.com/apps-script/class_gmaillabel
*/
function processLabel(labelName) {
	// get the label for given name
	var label = GmailApp.getUserLabelByName(labelName);
	// get count of all threads in the given label
	var threadCount = label.getUnreadCount();
	Logger.log(threadCount);
};


/**
	* Marks the email thread with the specified ID as important.
	* For more information on interacting with GMail threads, see
	* https://developers.google.com/apps-script/class_gmailthread
*/
function markThreadImportant(threadId) {
	var thread = GmailApp.getThreadById(threadId);
	thread.markImportant();
};


/**
	* Remove HTML tags from the Gmail messages
*/
function processHTML(html, count) {
	html = html.replace(/<(?:.|\n)*?>/gm, '');
	html = html.replace(/^\s+|\s+$/g, '');
	return html.substring(0, count);
}