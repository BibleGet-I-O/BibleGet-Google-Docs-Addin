/**
 * @OnlyCurrentDoc
 */

const VERSION = 21; //corresponds with version in the store; local version is -1!
const ADDONSTATE = {
  PRODUCTION: "production",
  DEVELOPMENT: "development"
};

const CURRENTSTATE = ADDONSTATE.DEVELOPMENT; //make sure to switch to PRODUCTION before publishing!
//const CURRENTSTATE = ADDONSTATE.PRODUCTION;

const REQUESTPARAMS = {"rettype":"json","appid":"googledocs"};
const ENDPOINTURL = "https://query.bibleget.io/";
const ENDPOINTURLMETADATA = "https://query.bibleget.io/metadata.php";
const SETTINGSWINDOW = { HEIGHT: 580, WIDTH: 900 };

//DEFINE CONSTANTS FOR USER PREFERENCES
//these will be used throughout scripts
//and in the html interfaces and client javascript
//to ensure consistency
const BGET = {
  ALIGN: {
    LEFT:        "left",       //make sure these are text values
    RIGHT:       "right",      //that correspond to actual CSS properties for the for text-align rule
    CENTER:      "center",     //
    JUSTIFY:     "justify"     //they will be used as is in the stylesheet definitions
  },
  VALIGN: {
    SUPERSCRIPT: 1,
    SUBSCRIPT:   2,
    NORMAL:      3
  },
  WRAP: {
    NONE:        1,
    PARENTHESES: 2,
    BRACKETS:    3
  },
  POS: {
    TOP:         1,
    BOTTOM:      2,
    BOTTOMINLINE:3
  },
  FORMAT: {
    USERLANG:        1, // if Google Docs is used in chinese, the names of the books of the bible will be given in chinese 
    BIBLELANG:       2, // if Google Docs is used in chinese, the abbreviated names of the books of the bible in chinese will be given
    USERLANGABBREV:  3, // if you are quoting from a Latin Bible, the names of the books of the bible will be given in latin
    BIBLELANGABBREV: 4  // if you are quoting from a Latin Bible, the abbreviated names of the books of the bible in latin will be given
  },
  VISIBILITY: {
    SHOW:            1,
    HIDE:            2
  },
  TEXTSTYLE: {
    BOLD:            1,
    ITALIC:          2,
    UNDERLINE:       3,
    STRIKETHROUGH:   4
  },
  PTYPE: {               //PARAGRAPH TYPE : useful when creating a new paragraph, 
    BIBLEVERSION:    1,  //  to let the paragraph creation function newPar know what kind of paragraph we're dealing with
    BOOKCHAPTER:     2,  //  and consequently choose which styles to set from user preferences
    VERSENUMBER:     3,
    VERSETEXT:       4
  },
  TYPECASTING: {        //just for quality assurance and good measure, let's explicitly define typecasting of our UserProperties, don't just rely on JSON.parse
                        //this way we know that floats will be floats and ints will be ints and we don't have to worry about it every time in our code when we use the values
    BOOLEANVALS : ["NoVersionFormatting","BOLD","ITALIC","UNDERLINE","STRIKETHROUGH","BookChapterFullQuery","InterfaceInCM"],
    FLOATVALS   : ["Lineheight","LeftIndent","RightIndent"],
    INTVALS     : ["FONT_SIZE","VALIGN","ShowBibleVersion","BibleVersionPosition","BibleVersionWrap","BookChapterPosition","BookChapterWrap","BookChapterFormat","ShowVerseNumbers"],
    STRINGVALS  : ["FONT_FAMILY","ParagraphAlign","FOREGROUND_COLOR","BACKGROUND_COLOR","BibleVersionAlignment","BookChapterAlignment"],
    STRINGARRAYS: ["RecentSelectedVersions"]
  }
};

const DefaultUserProperties = {
  //Will be handled first thing on TAB 1 of the Settings UI
  ParagraphStyles: {
    Lineheight:          1.5,                //FLOAT
    LeftIndent:          0,                  //FLOAT
    RightIndent:         0,                  //FLOAT
    FONT_FAMILY:         "Times New Roman",  //STRING
    ParagraphAlign:      BGET.ALIGN.JUSTIFY, //STRING   possible vals 'left','center','right', 'justify' (use ENUM, e.g. BGET.ALIGN.LEFT)
    NoVersionFormatting: false,               //BOOLEAN
    InterfaceInCM:       false
  },  
  //Will be handled right under ParagraphStyles on TAB 1 of the Settings UI
  BookChapterStyles: {
    BOLD:                true,      //BOOLEAN
    ITALIC:              false,     //BOOLEAN
    UNDERLINE:           false,     //BOOLEAN
    STRIKETHROUGH:       false,     //BOOLEAN
    FOREGROUND_COLOR:    "#000044", //STRING
    BACKGROUND_COLOR:    "#FFFFFF", //STRING
    FONT_SIZE:           10,        //INT
    VALIGN:              BGET.VALIGN.NORMAL //const will resolve to INT
  },
  //Will be handled right under BookChapterStyles on TAB 1 of the Settings UI
  VerseNumberStyles: {
    BOLD:                true,      //BOOLEAN
    ITALIC:              false,     //BOOLEAN
    UNDERLINE:           false,     //BOOLEAN
    STRIKETHROUGH:       false,     //BOOLEAN
    FOREGROUND_COLOR:    "#AA0000", //STRING
    BACKGROUND_COLOR:    "#FFFFFF", //STRING
    FONT_SIZE:           10,        //INT
    VALIGN:              BGET.VALIGN.SUPERSCRIPT //const will resolve to INT
  },
  //Will be handled right under VerseNumberStyles on TAB 1 of the Settings UI
  VerseTextStyles: {
    BOLD:                false,     //BOOLEAN
    ITALIC:              false,     //BOOLEAN
    UNDERLINE:           false,     //BOOLEAN
    STRIKETHROUGH:       false,     //BOOLEAN
    FOREGROUND_COLOR:    "#666666", //STRING
    BACKGROUND_COLOR:    "#FFFFFF", //STRING
    FONT_SIZE:           10,        //INT
    VALIGN:              BGET.VALIGN.NORMAL //const will resolve to INT
  },
  //Will be handled right on TAB 2 of the Settings UI
  LayoutPrefs: {
    ShowBibleVersion:      BGET.VISIBILITY.SHOW, //const will resolve to INT    (use ENUM, e.g. BGET.VISIBILITY.SHOW)
    BibleVersionAlignment: BGET.ALIGN.LEFT,      //const will resolve to STRING (use ENUM, e.g. BGET.ALIGN.LEFT)
    BibleVersionPosition:  BGET.POS.TOP,         //const will resolve to INT    (use ENUM, e.g. BGET.POS.TOP. Can only be TOP or BOTTOM)
    BibleVersionWrap:      BGET.WRAP.NONE,       //const will resolve to INT    (use ENUM, e.g. BGET.WRAP.NONE)
    BookChapterAlignment:  BGET.ALIGN.LEFT,      //const will resolve to STRING (use ENUM, e.g. BGET.ALIGN.LEFT)
    BookChapterPosition:   BGET.POS.TOP,         //const will resolve to INT    (use ENUM, e.g. BGET.POS.BOTTOMINLINE. Can be TOP, BOTTOM, or BOTTOMINLINE)
    BookChapterWrap:       BGET.WRAP.NONE,       //const will resolve to INT    (use ENUM, e.g. BGET.WRAP.NONE)
    BookChapterFormat:     BGET.FORMAT.BIBLELANG,//const will resolve to INT    (use ENUM, e.g. BGET.FORMAT.BIBLELANG
    BookChapterFullQuery:  false,                //false: just the name of the book and the chapter will be shown (i.e. 1 John 4)
                                                 //true: the full reference including the verses will be shown (i.e. 1 John 4:7-8) 
                                                 //[great idea btw, but now how to tackle it practically during docInsert!!!]
    ShowVerseNumbers:      BGET.VISIBILITY.SHOW  //const will resolve to INT    (use ENUM, e.g. BGET.VISIBILITY.SHOW)
  },
  //Will be handled from the Sidebar UI when sending queries
  RecentSelectedVersions:  []                    //Array of STRING values
};


function onInstall(e){

  // Show instructions for usage only on first install
  openHelpSidebar();

  // Add plugin menu to the toolbar (according to AuthMode)
  onOpen(e); 

}

function onOpen(e) {
  var locale = getUserLocale();

  if (e && (e.authMode == ScriptApp.AuthMode.NONE)) {
    //User has not yet granted permissions, we will just make a basic menu to start workflow
    DocumentApp.getUi().createAddonMenu()
    .addItem(__('Start',locale), 'openSimpleSidebar')
    .addSeparator()
    .addItem(__('Instructions',locale), 'openHelpSidebar')
    .addItem(__('Contribute',locale), 'openContributionModal')
    .addToUi();
    //consoleLog('Permissions not yet granted');
  }
  else{ //(e && (e.authMode == ScriptApp.AuthMode.LIMITED || e.authMode == ScriptApp.AuthMode.FULL))
    // Initialize user preferences ONLY after user has granted permission to the Properties Service!
    DocumentApp.getUi().createAddonMenu()
    .addItem(__('Start',locale), 'openMainSidebar')
    .addSeparator()
    .addItem(__('Instructions',locale), 'openHelpSidebar')
    .addItem(__('Settings',locale), 'openSettings')
    .addItem(__('Send Feedback',locale), 'openSendFeedback')
    .addItem(__('Contribute',locale), 'openContributionModal')
    .addToUi();
    if(CURRENTSTATE == ADDONSTATE.DEVELOPMENT){
      consoleLog('about to run setDefaultProperties from onOpen');
    }   
    // Check if preferences have been set, if not set defaults (check will be done one by one against default prefs)
    setDefaultUserProperties();
  }
}

/***************************************************/
/*     UI CREATION FUNCTIONS (SIDEBARS, MODALS)    */
/***************************************************/
function openSettings(){
  let locale = getUserLocale();
  let html = HtmlService.createTemplateFromFile('Settings');
  //docLog(html.getCode());
  
  html.activetab = 0;
  let evaluated = html.evaluate()
      .setWidth(SETTINGSWINDOW.WIDTH)
      .setHeight(SETTINGSWINDOW.HEIGHT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(evaluated, __('Settings',locale));
  
}

/** 
 * Send email to plugin creator with feedback
 * (email body from custom dialog prompt) 
 */
function openSendFeedback(){
  let locale = getUserLocale();
  let html = HtmlService.createTemplateFromFile('Feedback')
      .evaluate()
      .setWidth(400)
      .setHeight(300)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, __('Send Feedback',locale));
}


function openContributionModal(){
  let locale = getUserLocale();
  let html = HtmlService.createTemplateFromFile('Contribute')
      .evaluate()
      .setWidth(400)
      .setHeight(300)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html,__('Support BibleGet I/O',locale));
}

function openSimpleSidebar(){
  let html = HtmlService.createTemplateFromFile('SimpleSidebar');
  DocumentApp.getUi().showSidebar(html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('BibleGet I/O'));
}

function openMainSidebar(){
  let html = HtmlService.createTemplateFromFile('Sidebar');
  DocumentApp.getUi().showSidebar(html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('BibleGet I/O'));
}

function openHelpSidebar(){
  let locale = getUserLocale();
  let html = HtmlService.createTemplateFromFile('Help.html');
  DocumentApp.getUi().showSidebar(html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('BibleGet I/O - '+__('Instructions',locale)));
}


/********************************************************************/
/* FUNCTIONS THAT DEAL WITH USER PREFERENCES AND PROPERTIES SERVICE */
/********************************************************************/

/**
  * FUNCTION setDefaultUserProperties
  * checks current user properties against default user properties
  * if a current property is missing compared to the default properties, the default will be defined
  * otherwise current will be preserved
  */
function setDefaultUserProperties(){
  if(CURRENTSTATE == ADDONSTATE.DEVELOPMENT){
    consoleLog('running function setDefaultUserProperties');
  }   
  let userProperties = PropertiesService.getUserProperties();
  if(VERSION>20){
    userProperties.deleteAllProperties();
  }
  
  let usrProperties = userProperties.getProperties();
  let checkedUserProperties = {};
  
  for(let [key,value] of Object.entries(DefaultUserProperties)){      
    if(!usrProperties.hasOwnProperty(key)){
      if(CURRENTSTATE == ADDONSTATE.DEVELOPMENT){
        consoleLog(key+'property not set, now getting from DefaultUserProperties');
      }   
      checkedUserProperties[key] = JSON.stringify(value);
    }
    else if(key=="RecentSelectedVersions"){
      if(CURRENTSTATE == ADDONSTATE.DEVELOPMENT){
        consoleLog(key+'property will be set based on current usrProperties else DefaultUserProperties');
      }   
      checkedUserProperties[key] = (usrProperties[key] != DefaultUserProperties[key] ? usrProperties[key] : DefaultUserProperties[key]);
    }
    else{
      if(CURRENTSTATE == ADDONSTATE.DEVELOPMENT){
        consoleLog(key+'property will be JSON parsed and the obj value will be checked key by key');
      }   
      let decodedUserProperties = JSON.parse(usrProperties[key]);
      let propsObj = {};
      for(let [key1,value1] of Object.entries(DefaultUserProperties[key])){
        if(!decodedUserProperties.hasOwnProperty(key1) || decodedUserProperties[key1] === null || decodedUserProperties[key1] == ""){ propsObj[key1] = value1; }
        else{ propsObj[key1] = decodedUserProperties[key1]; }
      }
      checkedUserProperties[key] = JSON.stringify(propsObj);
    }
  }    
  userProperties.setProperties(checkedUserProperties); 
  if(CURRENTSTATE == ADDONSTATE.DEVELOPMENT){
    consoleLog('userProperties have now been set with the newly populated object between saved user preferences and default user preferences');
  }   
}

/*
 * FUNCTION getDefaultUserProperties
 * returns a JSON obj in which all values are JSON stringified
 * unless "true" is passed in, in which case a pure JSON obj will be returned
*/
function getDefaultUserProperties(nostringify=false){
  let defltUserProperties = {};
  for(let [key, value] of Object.entries(DefaultUserProperties)){
    defltUserProperties[key] = (nostringify ? value : JSON.stringify(value) );
  }
  return defltUserProperties;
}


/*
 * FUNCTION getUserProperties
 * returns a JSON obj in which all values are JSON stringified
 * unless "true" is passed in, in which case a pure JSON obj will be returned
 * and all values will be returned as true booleans, ints, floats...
*/
function getUserProperties(nostringify=false){
  if(CURRENTSTATE == ADDONSTATE.DEVELOPMENT){ consoleLog('function getUserProperties starting with nostringify = ' + nostringify.toString()); }   
  let userProperties = PropertiesService.getUserProperties();
  let usrProperties = userProperties.getProperties();
  let currentProperties = {};
  for(let [key, value] of Object.entries(usrProperties)){
    if(CURRENTSTATE == ADDONSTATE.DEVELOPMENT && nostringify===true){ consoleLog('function getUserProperties will parse = ' + key + ' from saved user properties, with value ['+ (typeof value) +']: ' +value); }    
    currentProperties[key] = (nostringify ? JSON.parse(value) : value);
    
    //for quality insurance and for good measure
    //let's just double check that JSON.parse is actually giving us the right typecasting
    //and enforce it if not
    if(nostringify){
    //we don't worry about string values, just ints, floats and booleans
    //let's start with booleans
      if(BGET.TYPECASTING.FLOATVALS.includes(key)        && typeof currentProperties[key] !== 'float')  { currentProperties[key] = parseFloat(currentProperties[key]); }
      else if(BGET.TYPECASTING.INTVALS.includes(key)     && typeof currentProperties[key] !== 'int')    { currentProperties[key] = parseInt(currentProperties[key]);   }
      else if(BGET.TYPECASTING.BOOLEANVALS.includes(key) && typeof currentProperties[key] !== 'boolean'){ 
        //I'm not even going to try to typecast, because if JSON.parse can't do it then nobody can
        alertMe('JSON.parse has not succeeded in parsing a boolean value for UserProperty '+key+' with value '+value); 
      }
      else if(BGET.TYPECASTING.STRINGVALS.includes(key)  && typeof currentProperties[key] !== 'string') { currentProperties[key] = currentProperties[key].toString(); }
      else if(BGET.TYPECASTING.STRINGARRAYS.includes(key) && typeof currentProperties[key] !== 'object'){
        //Again, not much I can do here, if JSON.parse doesn't succeed then just let the user know
        alertMe('JSON.parse has not succeeded in parsing a string array from UserProperty '+key+' with value '+value);
      }
    }
    if(CURRENTSTATE == ADDONSTATE.DEVELOPMENT && nostringify===true){ consoleLog(key + ' parsed, result : '+currentProperties[key]); }
  }     
  return currentProperties;
}


/**
  * Function setUserProperties
  *
  * Set User Properties based on a JSON obj
  * stringify each one of the values that is an obj
  */
function setUserProperties(jsonobj){
  //consoleLog("setting preferences in properties service");
  let newProperties = {};
  for (let [key, value] of Object.entries(jsonobj)) {
    newProperties[key] = JSON.stringify(value);
  }
  let userProperties = PropertiesService.getUserProperties();
  userProperties.setProperties(newProperties);
  return newProperties;
}

/**
  * Function setUserProperty
  * (I believe this function is never actually used, we just set all the properties each time there is a change)
  * Set User Properties based on a stringified JSON obj
  * stringify each one of the values that is an obj
  */
function setUserProperty(propKey,propVal){
  let userProperties = PropertiesService.getUserProperties();
  if(typeof propVal === 'object'){
    userProperties.setProperty(propKey, JSON.stringify(propVal));
  }
  else { userProperties.setProperty(propKey, propVal); }
}

/**
  * Function getUserProperty
  * (I believe this function is never actually used, we just get all the properties at once as one big object)
  * Get User Property choosing whether to return a string or an object
  */
function getUserProperty(propKey,nostringify=false){
  let userProperties = PropertiesService.getUserProperties();
  let userProp = (nostringify ? JSON.parse(userProperties.getProperty(propKey)) : userProperties.getProperty(propKey));
  //Logger.log(userProp);
  return userProp;
}

function resetUserProperties(nostringify=false){
  let locale = getUserLocale();
  let userProperties = PropertiesService.getUserProperties();
  userProperties.deleteAllProperties();
  //when we set the properties in the properties service, they must be stringified
  //so here we don't pass in any nostringify boolean, it must be false (or empty)
  //nostringify=false = stringify=true, values that are obj's will be stringified
  userProperties.setProperties(getDefaultUserProperties());
  let html2 = HtmlService.createTemplateFromFile('Settings');
  html2.activetab = 2;
  let evaluated = html2.evaluate()
      .setWidth(SETTINGSWINDOW.WIDTH)
      .setHeight(SETTINGSWINDOW.HEIGHT)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(evaluated, __('Impostazioni',locale));
}



/***********************************************/
/* FUNCTIONS THAT RUN FROM THE UI SCRIPTS      */
/***********************************************/

//Function alertMe @ used in SidebarJS.html and Processing.gs and in other scripts here in Code.gs to show error messages to the end user
function alertMe(str){
  DocumentApp.getUi().alert(str);
}

//Function sendmail @ used in feedback UI to actually send the email
function sendMail(txt) {
    MailApp.sendEmail({
     to: "bibleget.io@gmail.com",
     subject: "Google Apps Script Feedback",
     htmlBody: txt
   });
}

//Function fetchData @ used in SidebarJS and in other scripts here in Code.gs (which are called from SidebarJS), to communicate with the BibleGet endpoints
function fetchData(request){
  let {query,version} = request;
  let {rettype,appid} = REQUESTPARAMS;
  var payload = {'query':query,'version':version,'return':rettype,'appid':appid,'pluginversion':VERSION};
  try{
    var response = UrlFetchApp.fetch(ENDPOINTURL,{'method':'post','payload':payload});
    var responsecode = response.getResponseCode();
    if(responsecode==200){
      //Logger.log("Response code was 200.");
      let content = response.getContentText();
      //Logger.log("Contents:");
      //Logger.log(content);
      return content;
    }
    else{
      alertMe('BIBLEGET SERVER ERROR (response '+responsecode+'). Please wait a few minutes and try again.');
    }
  }catch(e){
    alertMe('ERROR in communication with BibleGet Server. Please wait a few minutes and try again. ('+e.message+')');
    return false;
  }
}

//Function getUserLocale @ used in pretty much every UI in order to determine the Docs interface locale
function getUserLocale(){
  return Session.getActiveUserLocale();
}


function makeUnique(str) {
  return String.prototype.concat(...new Set(str));
}


/**********************************************************
 * FUNCTIONS THAT PROCESS THE BIBLE QUOTES IN JSON FORMAT *
 * AFTER THEY ARE RETRIEVED FROM THE BIBLEGET ENDPOINT    *
 * AND PROCESS THE INJECTION INTO THE DOCUMENT            *
 * BASED ON USER PREFERENCE FOR ELEMENT STYLING           *
 **********************************************************/


function preparePropertiesForDocInjection(){
  let userProperties = getUserProperties(true); //will get a pure JSON obj, all stringified values parsed and checked for typecasting
  //Let's make sure we have the right typecasting for each value
  for(let [key,value] of Object.entries(userProperties)){
    for(let [key1,value1] of Object.entries(userProperties[key]) ){
      if(key1 == 'LeftIndent' || key1 == 'RightIndent'){
        //setIndentStart and setIndentEnd etc. take values in points
        //while the ruler at the top of the document is in inches
        //so we store our values in inches, then convert to points
        userProperties[key][key1] = inchesToPoints(value1);
      }
      else if(key1 == 'VALIGN'){
        switch(value1){
          case BGET.VALIGN.NORMAL:
            userProperties[key][key1] = DocumentApp.TextAlignment.NORMAL;
            break;
          case BGET.VALIGN.SUPERSCRIPT:
            userProperties[key][key1] = DocumentApp.TextAlignment.SUPERSCRIPT;
            break;
          case BGET.VALIGN.SUBSCRIPT:
            userProperties[key][key1] = DocumentApp.TextAlignment.SUBSCRIPT;
            break;            
        }
      }
      else if(key1 == 'ParagraphAlign' || key1 =='BibleVersionAlignment' || key1 == 'BookChapterAlignment'){
        switch(value1){
          case BGET.ALIGN.LEFT:
            userProperties[key][key1] = DocumentApp.HorizontalAlignment.LEFT;
            break;
          case BGET.ALIGN.CENTER:
            userProperties[key][key1] = DocumentApp.HorizontalAlignment.CENTER;
            break;
          case BGET.ALIGN.RIGHT:
            userProperties[key][key1] = DocumentApp.HorizontalAlignment.RIGHT;
            break;
          case BGET.ALIGN.JUSTIFY:
            userProperties[key][key1] = DocumentApp.HorizontalAlignment.JUSTIFY;
            break;
          default:
            userProperties[key][key1] = DocumentApp.HorizontalAlignment.JUSTIFY;
        }
      }
    }
  }
  return userProperties;
}

function docInsert(json){
  
  //docLog("retrieved json object from server, now inserting into document... "+JSON.stringify(json));
  //returns an already parsed json object, whether from user preferences set in properties service, or from default values
  var verses = json.results;
  //docLog("retrieved json object from server, now inserting into document... "+JSON.stringify(verses));
  
  var biblequote = "";
  
  var newelement = {"thisversion":"","newversion":false,"thisbook":"","newbook":false,"thischapter":0,"newchapter":false,"thisverse":0,"newverse":false};
  var BibleGetProperties = preparePropertiesForDocInjection();

  var BibleGetGlobal = {"iterateNewPar":false,"currentPar":null};
  BibleGetGlobal.body = DocumentApp.getActiveDocument().getBody();
  BibleGetGlobal.idx = getCursorIndex();
  BibleGetGlobal.locale = getUserLocale();
  BibleGetGlobal.firstFmtVerse = false;
  //docLog("got results from server, now preparing to elaborate... BibleGetGlobal object = "+JSON.stringify(BibleGetGlobal));
  
  var versenum;
  var newPar;  
    
  for(var i=0;i<verses.length;i++){
    
    verses[i].verse = parseInt(verses[i].verse);
    verses[i].chapter = parseInt(verses[i].chapter);
    //verses[i].partialverse_isdescr = parseInt(verses.partialverse_isdescr);
    //docLog("initial value of newelement >> "+JSON.stringify(newelement));
    //docLog("value of verses["+i+"] >> "+JSON.stringify(verses[i]));
    newelement = checkNewElements(verses[i],newelement);
    //docLog("checking new elements... >> "+JSON.stringify(newelement));
    if(newelement.newversion){          
      if((BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties,true) ) === false){ return; } //creating the first paragraph, so set last parameter to true
      BibleGetGlobal.currentPar.setAlignment(BibleGetProperties.LayoutPrefs.BibleVersionAlignment);

      var versionpargr;
      versionpargr = BibleGetGlobal.currentPar.appendText(verses[i].version); 
      setTextStyles(versionpargr,BibleGetProperties,BGET.PTYPE.BIBLEVERSION);
      BibleGetGlobal.firstFmtVerse = false;
    }
    //docLog("so far so good");
    
    if(newelement.newbook || newelement.newchapter){
      BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties);
      BibleGetGlobal.currentPar.setAlignment(BibleGetProperties.LayoutPrefs.BookChapterAlignment);

      var bookpargr = BibleGetGlobal.currentPar.appendText(verses[i].book + " " + verses[i].chapter); 
      setTextStyles(bookpargr,BibleGetProperties,BGET.PTYPE.BOOKCHAPTER);
      BibleGetGlobal.firstFmtVerse = false;
    }
    //docLog("so far so good");
    
    if(newelement.newverse){
      if(BibleGetGlobal.iterateNewPar || newelement.newchapter){
        BibleGetGlobal.iterateNewPar = false;
        BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties);
        BibleGetGlobal.currentPar.setAlignment(BibleGetProperties.ParagraphStyles.ParagraphAlign);
      }
      versenum = BibleGetGlobal.currentPar.appendText(" " + verses[i].verse + " ");
      setTextStyles(versenum,BibleGetProperties,BGET.PTYPE.VERSENUMBER);
    }
    //docLog("so far so good");
    
    
    //var partial = element.appendText(" " + verses[i].partialverse + " ");
    //partial.setBold(false).setItalic(true).setFontSize(6).setForegroundColor("#FF0000");
    
    //before appending the verse text, we need to parse it to see if it contains special markup
    if(/<[\/]{0,1}(?:sm|po|speaker)[f|l|s|i]{0,1}[f|l]{0,1}>/.test(verses[i].text)){
      //docLog("looks like we have special formatting in this verse... <"+verses[i].text+">");
      
      verses[i].text = verses[i].text.replace(/(\n|\r)/gm,"");
      //we have special formatting to deal with
      if(BibleGetProperties.ParagraphStyles.NoVersionFormatting){
        //if user preferences ask to override version formatting, we just need to remove the formatting tags from the text
        verses[i].text = verses[i].text.replace(/<[\/]{0,1}(?:po|speaker)[f|l|s|i]{0,1}[f|l]{0,1}>/g," "); 
        verses[i].text = verses[i].text.replace(/<[\/]{0,1}sm>/g,""); 
        var versetext = BibleGetGlobal.currentPar.appendText(verses[i].text);
        setTextStyles(versetext,BibleGetProperties,BGET.PTYPE.VERSETEXT);
        //Logger.log(verses[i].text);
      }else{
        BibleGetGlobal = formatSections(verses[i].text,BibleGetProperties,newelement,BibleGetGlobal);
      }
      
    }
    else{
      BibleGetGlobal.firstFmtVerse = true;
      var versetext = BibleGetGlobal.currentPar.appendText(verses[i].text);
      setTextStyles(versetext,BibleGetProperties,BGET.PTYPE.VERSETEXT);
    }
  
  }            

}

function doNestedTagStuff(speakerTagBefore,speakerTagContents,speakerTagAfter,thisPar,BGProperties){
  //Logger.log("We have a nested tag, and we should have extracted it's parts: ");
  //Logger.log("speakerTagBefore = {"+speakerTagBefore+"}, speakerTagContents = {"+speakerTagContents+"}, speakerTagAfter = {"+speakerTagAfter+"}");
  var nabreStyleText;
  if(speakerTagBefore != ""){
    nabreStyleText = thisPar.appendText(speakerTagBefore);
    //Logger.log("we have now appended speakerTagBefore");
    setTextStyles(nabreStyleText,BGProperties,BGET.PTYPE.VERSETEXT);
  }
  
  nabreStyleText = thisPar.appendText(" "+speakerTagContents+" ");
  //Logger.log("we have now appended speakerTagContents");
  nabreStyleText.setBold(true).setItalic(false).setUnderline(false).setStrikethrough(false).setFontSize(BGProperties.VerseTextStyles.FONT_SIZE).setForegroundColor("#000000").setBackgroundColor("#9A9A9A").setTextAlignment(BGProperties.VerseTextStyles.VALIGN);
  
  if(speakerTagAfter != ""){
    nabreStyleText = thisPar.appendText(speakerTagAfter);
    //Logger.log("we have now appended speakerTagAfter");
    setTextStyles(nabreStyleText,BGProperties,BGET.PTYPE.VERSETEXT);
  } 
}

function createNewPar(BibleGetGlb,BibleGetProps,first=false){ 
  if(first===false){ BibleGetGlb.idx++; } //up the index if we're not dealing with the first paragraph at cursor index
  var newPar;
  if(newPar = BibleGetGlb.body.insertParagraph(BibleGetGlb.idx,"")){
    newPar.setLineSpacing(BibleGetProps.ParagraphStyles.Lineheight);
    //DocumentApp.getUi().alert("Left Indent = "+LeftIndent+" >> "+leftindent+"pt");
    newPar.setIndentFirstLine(BibleGetProps.ParagraphStyles.LeftIndent);
    newPar.setIndentStart(BibleGetProps.ParagraphStyles.LeftIndent);
    newPar.setIndentEnd(BibleGetProps.ParagraphStyles.RightIndent);
    let ffStyle = {};
    ffStyle[DocumentApp.Attribute.FONT_FAMILY] = BibleGetProps.ParagraphStyles.FONT_FAMILY;
    newPar.setAttributes(ffStyle);
    BibleGetGlb.currentPar = newPar;
  }
  else {
    DocumentApp.getUi().alert(__('Cannot insert text at this document location.',locale));
    return false;
  }
  return BibleGetGlb;
}

function setTextStyles(text,BGProperties,ptype){
  var styles;
  let fontfamily = BGProperties.ParagraphStyles.FONT_FAMILY;
  switch(ptype){
    case BGET.PTYPE.BIBLEVERSION:
    case BGET.PTYPE.BOOKCHAPTER:
      styles = BGProperties.BookChapterStyles;
      break;
    case BGET.PTYPE.VERSENUMBER:
      styles = BGProperties.VerseNumberStyles;
      break;
    case BGET.PTYPE.VERSETEXT:
      styles = BGProperties.VerseTextStyles;
      break;
  }
  text.setBold(styles.BOLD).setItalic(styles.ITALIC).setUnderline(styles.UNDERLINE).setStrikethrough(styles.STRIKETHROUGH).setFontSize(styles.FONT_SIZE).setForegroundColor(styles.FOREGROUND_COLOR).setBackgroundColor(styles.BACKGROUND_COLOR).setTextAlignment(styles.VALIGN).setFontFamily(fontfamily);
}

function doSpeakerTagThing(formattingTagContents){
  var remainingText2 = formattingTagContents;
  var NABREfmt2 = /(.*?)<(speaker)>(.*?)<\/\2>/g;
  var NABREfmtMatch2;
  var speakerTag = {"Before":"","Contents":"","After":""};
  
  while((NABREfmtMatch2 = NABREfmt2.exec(formattingTagContents)) != null){
    if(NABREfmtMatch2[2] != null && NABREfmtMatch2[2] != "" && NABREfmtMatch2[2] == "speaker"){
      //Logger.log("Now extracting parts from the <speaker> tag...");
      
      if(NABREfmtMatch2[1] != null && NABREfmtMatch2[1] != ""){
        speakerTag.Before = NABREfmtMatch2[1];
        //Logger.log("speakerTagBefore = {"+speakerTagBefore+"}");
        
        remainingText2 = remainingText2.replace(speakerTagBefore, "");
      }
      
      speakerTag.Contents = NABREfmtMatch2[3];
      //Logger.log("speakerTagContents = {"+speakerTagContents+"}");
      
      speakerTag.After = remainingText2.replace("<"+NABREfmtMatch2[2]+">"+speakerTag.Contents+"</"+NABREfmtMatch2[2]+">", "");
      //Logger.log("speakerTagAfter = {"+speakerTagAfter+"}");
    }
  }
  return speakerTag;
}

function checkNewElements(verses,newelement){
  
  if(verses.verse != newelement.thisverse){
    newelement.newverse = true;
    newelement.thisverse = verses.verse;
  }
  else{
    newelement.newverse = false;
  }
  
  if(verses.chapter != newelement.thischapter){
    newelement.newchapter = true;
    newelement.newverse = true;
    newelement.thischapter = verses.chapter;
  }
  else{ 
    newelement.newchapter = false; 
  }
  
  if(verses.book != newelement.thisbook){
    newelement.newbook = true;
    newelement.newchapter = true;
    newelement.newverse = true;
    newelement.thisbook = verses.book;
  }
  else{ 
    newelement.newbook = false; 
  }
  
  if(verses.version != newelement.thisversion){
    newelement.newversion = true;
    newelement.newbook = true;
    newelement.newchapter = true;
    newelement.newverse = true;
    newelement.thisversion = verses.version;
  }
  else{ newelement.newversion = false; }
  
  return newelement;
}

function formatSections(thistext,BibleGetProperties,newelement,BibleGetGlobal){
  //otherwise we have to divide the text into sections and format each section accordingly...
  var NABREfmt = /(.*?)<((sm|po|speaker)[f|l|s|i|3]{0,1}[f|l]{0,1})>(.*?)<\/\2>/g;
  //Logger.log(verses[i].text);
  var NABREfmtMatch;
  var lastNABREfmtMatch;
  var remainingText = thistext;  
  var NABREpar;
  
  //Logger.log("noVersionFormatting=false, now extracting regex groups...");
  //Logger.log(NABREfmtMatch);
  //NABREfmtMatch = NABREfmt.exec(remainingText);
  //docLog("we are now in the formatSections function...");
  
  while((NABREfmtMatch = NABREfmt.exec(thistext)) !== null){
    //docLog("we have a match <"+thistext+">");
    
    lastNABREfmtMatch = NABREfmtMatch;
    //Logger.log(NABREfmtMatch);
    // matched text: match[0]
    // match start: match.index
    // capturing group n: match[n]
    if(NABREfmtMatch[1] != null && NABREfmtMatch[1] != ""){
      Logger.log("We have some normal text before special formatted text in this verse: {" + NABREfmtMatch[1] + "}");
      //this is normal text!
      var versetext = BibleGetGlobal.currentPar.appendText(NABREfmtMatch[1]);
      setTextStyles(versetext,BibleGetProperties,BGET.PTYPE.VERSETEXT);
      remainingText = remainingText.replace(NABREfmtMatch[1],"");
      
      if(NABREfmtMatch[2] != "sm"){
        BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties);
        BibleGetGlobal.currentPar.setAlignment(BibleGetProperties.ParagraphStyles.ParagraphAlign);
      }
    }
    if(NABREfmtMatch[4] != null && NABREfmtMatch[4] != ""){
      var formattingTagContents = NABREfmtMatch[4].trim();
      //Logger.log("{"+formattingTagContents+"}");      
      //check for nested speaker tags!
      var nestedTag = false;
      var speakerTag = {"Before":"","Contents":"","After":""};
      var nabreStyleText;
      
      if(/<[\/]{0,1}speaker>/.test(formattingTagContents)){
        nestedTag = true;
        speakerTag = doSpeakerTagThing(formattingTagContents);                
      }
      
      switch(NABREfmtMatch[2]){
        case "pof":
        case "pos":
        case "po":
        case "pol":
          BibleGetGlobal.iterateNewPar = true;
          //create a new paragraph only if it's not the start of a new verse, or if it is the start of a new verse but it's also the first verse with special formatting and without any normal text at the start
          if(!newelement.newverse || ((NABREfmtMatch[1] == "" || NABREfmtMatch[1] == null) && BibleGetGlobal.firstFmtVerse)){ // 
            if(!newelement.newverse){Logger.log("case pof|pos|po|pol and not the start of a new verse... creating paragraph... <"+formattingTagContents+">");}
            else{Logger.log("case pof|pos|po|pol and is start of a new verse but is also the first verse with special formatting... creating paragraph... <"+formattingTagContents+">");}
            BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties);
            BibleGetGlobal.currentPar.setAlignment(BibleGetProperties.ParagraphStyles.ParagraphAlign);
            
            if(BibleGetGlobal.firstFmtVerse){
              BibleGetGlobal.firstFmtVerse = false;
            }
            newelement.newverse = false;
          }
          // because if it is the start of a new verse, we probably already have a new paragraph
          else{
            BibleGetGlobal.currentPar.setIndentStart(BibleGetProperties.ParagraphStyles.LeftIndent+(7.2*2));
            BibleGetGlobal.currentPar.appendText("\t");
            newelement.newverse = false;
          }
          
          if(nestedTag){
            doNestedTagStuff(speakerTag.Before,speakerTag.Contents,speakerTag.After,BibleGetGlobal.currentPar,BibleGetProperties);
            nestedTag = false;
          }
          else{
            nabreStyleText = BibleGetGlobal.currentPar.appendText(formattingTagContents);
            setTextStyles(nabreStyleText,BibleGetProperties,BGET.PTYPE.VERSETEXT);
          }
          break;
        case "poif":
        case "poi":
        case "poil":
          BibleGetGlobal.iterateNewPar = true;
          // create a new paragraph only if it's not the start of a new verse
          if(!newelement.newverse){
            //Logger.log("not the start of a new verse, so creating a new paragraph... <"+formattingTagContents+">");
            BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties);
            BibleGetGlobal.currentPar.setAlignment(BibleGetProperties.ParagraphStyles.ParagraphAlign);
          }
          // because if it is the start of a new verse we probably already have a new paragraph
          else{
            BibleGetGlobal.currentPar.setIndentStart(BibleGetProperties.ParagraphStyles.LeftIndent+(7.2*3));
            BibleGetGlobal.currentPar.appendText("\t");
            newelement.newverse = false;
          }                      
          if(nestedTag){
            doNestedTagStuff(speakerTag.Before,speakerTag.Contents,speakerTag.After,BibleGetGlobal.currentPar,BibleGetProperties);
            nestedTag = false;
          }
          else{
            nabreStyleText = BibleGetGlobal.currentPar.appendText(formattingTagContents);
            setTextStyles(nabreStyleText,BibleGetProperties,BGET.PTYPE.VERSETEXT);
          }                    
          break;
        case "sm":
          BibleGetGlobal.iterateNewPar = false;
          //if(NABREpar != null){
          var smText = BibleGetGlobal.currentPar.appendText(formattingTagContents);
          //}else{
          //  var smText = newPar.appendText(formattingTagContents);
          //}
          var smallCapsFontSize = Math.round(BibleGetProperties.VerseTextStyles.FONT_SIZE - (BibleGetProperties.VerseTextStyles.FONT_SIZE * .15));
          smText.setFontSize(smallCapsFontSize);
          break;
        case "speaker":
          BibleGetGlobal.iterateNewPar = false;
          //if(NABREpar != null){
          var smText = BibleGetGlobal.currentPar.appendText(formattingTagContents);
          //}else{
          //  var smText = newPar.appendText(formattingTagContents);
          //}
          smText.setBackgroundColor("#6A6A6A").setTextAlignment(BibleGetProperties.VerseTextStyles.ALIGN);
      }
      remainingText = remainingText.replace("<"+NABREfmtMatch[2]+">"+NABREfmtMatch[4]+"</"+NABREfmtMatch[2]+">", ""); 
      Logger.log("remainingText: {"+remainingText+"}");
    }              
    
  }
  
  //Logger.log("remainingText = {"+remainingText+"}");
  /*
  if(lastNABREfmtMatch[2]=="pol" || lastNABREfmtMatch[2]=="poil"){
  newPar = body.insertParagraph(++idx, "");
  newPar.setAlignment(DocumentApp.HorizontalAlignment.JUSTIFY);
  newPar.setLineSpacing(linespacing);
  newPar.setIndentFirstLine(leftindent);
  newPar.setIndentStart(leftindent);
  currentPar = newPar;
  }
  */
  /*else*/ 
  
  if(remainingText != ""){ //lastNABREfmtMatch[2]=="sm" && 
    var lastText = BibleGetGlobal.currentPar.appendText(remainingText);
    setTextStyles(lastText,BibleGetProperties,BGET.PTYPE.VERSETEXT);
  }
  
  return BibleGetGlobal;
}


function getCursorIndex(){

  var idx;
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var cursor = doc.getCursor();
  var locale = getUserLocale();

  if(cursor){  
    var cursorEl = cursor.getElement();
  
    if(cursorEl.getType() == "TEXT"){ // seems that we can't get a page index or insert paragraphs from the position of an element of type Text?
      cursorEl = cursorEl.getParent(); // so let's get it's parent to avoid getting nasty error messages
      //Logger.log(cursorEl);
    }
    idx = body.getChildIndex(cursorEl);
  }
  else{ //if for example there is a selection, so we can't get a cursor POSITION
    var selection = doc.getSelection();
    if(selection){
      var elements = selection.getRangeElements();
      var element = elements[0].getElement();
      if(element.getType() == 'TEXT'){
        element = element.getParent();
      }
      idx = body.getChildIndex(element);
    }
    else{
      DocumentApp.getUi().alert(__('Cannot insert text at this document location.',locale));
    }
  }
  
  return idx;
}

/***********************************************
 *           UTILITY FUNCTIONS                 *
 **********************************************/

/* requires float, returns int */
function inchesToPoints(inchVal){
  if(typeof inchVal !== 'float'){
    inchVal = parseFloat(inchVal);
  }
  return Math.round(inchVal * 72);
}

/* requires float, returns int */
function centimetersToPoints(cmVal){
  if(typeof cmVal !== 'float'){
    cmVal = parseFloat(cmVal);
  }
  return Math.round(cmVal * 28.3464567);
}

/***********************************************/
/* FUNCTIONS USEFUL FOR DEBUGGING PURPOSES     */
/***********************************************/


function consoleLog(str){
  Logger.log(str);   //internal log (not very efficient?)
  console.info(str); //stackdriver logs
}

//Function docLog @ can be used to help debug scripts when it becomes difficult to know what exactly Apps Script is choking on
function docLog(str){
  var locale = getUserLocale();
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var cursor = doc.getCursor();
  var idx;  
  if(cursor){  
    var cursorEl = cursor.getElement();
  
    if(cursorEl.getType() == "TEXT"){ // seems that we can't get a page index or insert paragraphs from the position of an element of type Text?
      cursorEl = cursorEl.getParent(); // so let's get it's parent to avoid getting nasty error messages
      //Logger.log(cursorEl);
    }
    idx = body.getChildIndex(cursorEl);
  }
  else{ //if for example there is a selection, so we can't get a cursor POSITION
    var selection = doc.getSelection();
    if(selection){
      var elements = selection.getRangeElements();
      var element = elements[0].getElement();
      if(element.getType() == 'TEXT'){
        element = element.getParent();
      }
      idx = body.getChildIndex(element);
    }
    else{  
      DocumentApp.getUi().alert(__('Cannot insert text at this document location.',locale));
    }
  }
  var newPar;
  if (newPar = body.insertParagraph(idx,"")) { // we'll be inserting our paragraph below the current position because we've had to choose the parent element...
    newPar.appendText(str);
  }
}
