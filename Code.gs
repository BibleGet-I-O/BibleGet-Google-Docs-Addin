/**
 * @OnlyCurrentDoc
 */

const VERSION = 21; //corresponds with version in the store; local version is -1!
const REQUESTPARAMS = {'rettype':'json','appid':'googledocs'};
const ENDPOINTURL = "https://query.bibleget.io/";
const ENDPOINTURLMETADATA = "https://query.bibleget.io/metadata.php";

const BGET = {
  ALIGN: {
    LEFT:   'left',
    RIGHT:  'right',
    CENTER: 'center'
  },
  WRAP: {
    NONE:        'none',
    PARENTHESES: 'parentheses',
    BRACKETS:    'brackets'
  },
  POS: {
    TOP:    'top',
    BOTTOM: 'bottom',
    INLINE: 'inline'
  },
  FORMAT: {
    QUERY: 'query',
    USERLANG: 'userLang',
    BIBLELANG: 'bibleLang'
  },
  VISIBILITY: {
    SHOW: 'show',
    HIDE: 'hide'
  }
};


function consoleLog(str){
  Logger.log(str);   //internal log (not very efficient?)
  console.info(str); //stackdriver logs
}

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
    .addItem(__('Send Feedback',locale), 'openSendFeedback')
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
        
    // Check if preferences have been set yet, if not set defaults. 
    var userProperties = PropertiesService.getUserProperties();
    //consoleLog("getting properties service");
    // Seeing that some properties have been added in VERSION 22,
    // we will check for the existence of these properties
    // Perhaps preferences that had already been set will be overwritten,
    // but it's not the end of the world, it's easy enough to set them again
    // Add-on needs to be republished anyways, so no big worry
    if(userProperties.getProperty("FONT_FAMILY")==null || userProperties.getProperty("RightIndent")==null ){      
      //consoleLog("preferences have not been set, now setting defaults");      
      userProperties.setProperties(getDefaultProperties());
      //consoleLog('default font-family now set:'+newProperties.FONT_FAMILY);
      //consoleLog("default preferences now set in properties service");      
    }
    else{
      //consoleLog('Seems we already have preferences set, no need to override. VERSION = '+VERSION);
    }
  }
}

/***************************************************/
/* FUNCTIONS THAT MANAGE THE UI (SIDEBARS, MODALS) */
/***************************************************/
function openSettings(){
  let locale = getUserLocale();
  let html = HtmlService.createTemplateFromFile('Settings');
  html.activetab = 0;
  let evaluated = html.evaluate()
      .setWidth(800)
      .setHeight(500)
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


// Helper function for MailPrompt
function sendMail(txt) {
    MailApp.sendEmail({
     to: "bibleget.io@gmail.com",
     subject: "Google Apps Script Feedback",
     htmlBody: txt
   });
  //}
}

function openContributionModal(){
  let locale = getUserLocale();
  let html = HtmlService.createTemplateFromFile('Contributo')
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
  //Logger.log(html.getCode());
  //MailApp.sendEmail("bibleget.io@gmail.com", "Sidebar Code", html.getCode());
  DocumentApp.getUi().showSidebar(html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('BibleGet I/O'));
}

function openHelpSidebar(){
  let locale = getUserLocale();
  let html = HtmlService.createTemplateFromFile('Help.html');
  DocumentApp.getUi().showSidebar(html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('BibleGet I/O - '+__('Instructions',locale)));
}

/***********************************************/
/* FUNCTIONS THAT RUN FROM THE SIDEBAR SCRIPTS */
/***********************************************/
/*
function getFontFamilies(){
  var fontfamilies = [""];//DocumentApp.FontFamily.values().toString();
  Logger.log(fontfamilies);
  return fontfamilies;
}
*/
function alertMe(str){
  DocumentApp.getUi().alert(str);
}

function getDefaultProperties(){
  
  //consoleLog("returning default properties");
  
      let bookChapterStylesObj = {
        UNDERLINE:false,
        LINK_URL:null,
        ITALIC:false,
        BOLD:true,
        BACKGROUND_COLOR:"#FFFFFF",
        FONT_SIZE:10,
        STRIKETHROUGH:false,
        FOREGROUND_COLOR:"#000044"
      };
      let bookChapterStylesStr = JSON.stringify(bookChapterStylesObj);
      
      //consoleLog("prepared bookChapterStylesStr");
      
      let verseNumberStylesObj = {
        UNDERLINE:false,
        LINK_URL:null,
        ITALIC:false,
        BOLD:true,
        BACKGROUND_COLOR:"#FFFFFF",
        FONT_SIZE:10,
        STRIKETHROUGH:false,
        FOREGROUND_COLOR:"#AA0000"
      };
      let verseNumberStylesStr = JSON.stringify(verseNumberStylesObj);

      //consoleLog("prepared verseNumberStylesStr");
      
      let verseTextStylesObj = {
        UNDERLINE:false,
        LINK_URL:null,
        ITALIC:false,
        BOLD:false,
        BACKGROUND_COLOR:"#FFFFFF",
        FONT_SIZE:10,
        STRIKETHROUGH:false,
        FOREGROUND_COLOR:"#666666"
      };
      let verseTextStylesStr = JSON.stringify(verseTextStylesObj);
      
      //consoleLog("prepared verseTextStylesStr");
      
      //ShowBibleVersion: possible vals 'show', 'hide' (use ENUM, e.g. BGET.VISIBILITY.SHOW)
      //BibleVersionAlignment: possible vals 'left','center','right' (use ENUM, e.g. BGET.ALIGN.LEFT)
      //BibleVersionPosition: possible vals 'top','bottom'. (Use ENUM, e.g. BGET.POS.TOP)
      //  N.B. if BookChapterPosition is also bottom, then they will be placed next to each other and BibleVersionAlignment will have no effect, only BookChapterAlignment will
      //BibleVersionWrap: possible vals 'none', 'parentheses', 'brackets' (use ENUM, e.g. BGET.WRAP.NONE)
      
      //BookChapterPosition: possible vals 'inline', 'bottom'. If 'bottom' then the original query will be shown. (Use ENUM, e.g. BGET.POS.INLINE)
      //BookChapterAlignment: possible vals 'left','center','right' (use ENUM, e.g. BGET.ALIGN.LEFT)
      //BookChapterWrap: possible vals 'none', 'parentheses', 'brackets' (use ENUM, e.g. BGET.WRAP.NONE)
      //BookChapterFormat: possible vals 'query', 'userLang', 'bibleLang' (use ENUM, e.g. BGET.FORMAT.BIBLELANG
      //  Meaning: 1) like the original query = if '1Jn4:7-8' was requested '1Jn4:7-8' will be shown
      //           2) according to user lang = if Google Docs is used in chinese, the names of the books of the bible will be in chinese
      //           3) according to bible lang = if you are quoting from a Latin Bible, the names of the books of the bible will be in latin
      //  N.B. only holds when position = BGET.POS.BOTTOM
      
      //ShowVerseNumbers: possible vals 'show', 'hide' (use ENUM, e.g. BGET.VISIBILITY.SHOW)
      let layoutPrefsObj = {
        ShowBibleVersion: BGET.VISIBILITY.SHOW,
        BibleVersionPosition: BGET.POS.TOP,
        BibleVersionAlignment: BGET.ALIGN.LEFT,
        BibleVersionWrap: BGET.WRAP.NONE,
        BookChapterPosition: BGET.POS.INLINE,
        BookChapterAlignment: BGET.ALIGN.LEFT,
        BookChapterWrap: BGET.WRAP.NONE,
        BookChapterFormat: BGET.FORMAT.BIBLELANG,
        ShowVerseNumbers: BGET.VISIBILITY.SHOW
      };
      let layoutPrefsStr = JSON.stringify(layoutPrefsObj);

      let defaultProperties = {
        BookChapterStyles:bookChapterStylesStr,
        BookChapterAlignment:"NORMAL",
        VerseNumberStyles:verseNumberStylesStr,
        VerseNumberAlignment:"SUPERSCRIPT",
        VerseTextStyles:verseTextStylesStr,
        VerseTextAlignment:"NORMAL",
        Lineheight:1.5,
        LeftIndent:0,
        RightIndent:0,
        FONT_FAMILY:"Times New Roman",
        NoVersionFormatting:false,
        RecentSelectedVersions:"[]",
        LayoutPrefs:layoutPrefsStr
      };
  
  return defaultProperties;
}

function getUserProperties(){

  //consoleLog("getting user preferences.");
  
  let userProperties = PropertiesService.getUserProperties();
  
  consoleLog("first trying properties service:");
  
  //if for any reason defaults have not been set, let's return an object with default values
  if(userProperties.getProperty("FONT_FAMILY")===null){
    
    consoleLog("preferences not yet set in properties service, will get default preferences...");
    
    let defaultProperties = getDefaultProperties();
    return defaultProperties;
    
  }
  
  //otherwise we will retrieve the user preferences set in the properties service
  else{
    
    //consoleLog("preferences have been set in properties service, retrieving now...");
    
    let usrProperties = userProperties.getProperties();
    let currentProperties = {};
    
    consoleLog("will now parse json strings from properties service");
    
    //consoleLog(usrProperties.BookChapterStyles);
    currentProperties.BookChapterStyles = JSON.parse(usrProperties.BookChapterStyles);    
    //consoleLog("usrProperties.BookChapterStyles parsed!");
    
    currentProperties.BookChapterAlignment = usrProperties.BookChapterAlignment;

    currentProperties.VerseNumberStyles = JSON.parse(usrProperties.VerseNumberStyles);
    //consoleLog("usrProperties.BookChapterStyles parsed!");

    currentProperties.VerseNumberAlignment = usrProperties.VerseNumberAlignment;

    currentProperties.VerseTextStyles = JSON.parse(usrProperties.VerseTextStyles);
    //consoleLog("usrProperties.BookChapterStyles parsed!");

    currentProperties.VerseTextAlignment = usrProperties.VerseTextAlignment;
    currentProperties.Lineheight = usrProperties.Lineheight;
    currentProperties.LeftIndent = usrProperties.LeftIndent;
    currentProperties.RightIndent = usrProperties.RightIndent;
    currentProperties.FONT_FAMILY = usrProperties.FONT_FAMILY;
    //consoleLog('FONT_FAMILY = '+currentProperties.FONT_FAMILY);
    currentProperties.NoVersionFormatting = usrProperties.NoVersionFormatting;
    currentProperties.LayoutPrefs = JSON.parse(usrProperties.LayoutPrefs);
    //consoleLog("now returning preferences retrieved from properties service.");
    return currentProperties;
    
  }

}

function setUserProperties(jsonobj){

  //consoleLog("setting preferences in properties service");
  
  let newProperties = {};
  newProperties.BookChapterStyles = JSON.stringify(jsonobj.BookChapterStyles);
  newProperties.BookChapterAlignment = jsonobj.BookChapterAlignment;
  newProperties.VerseNumberStyles = JSON.stringify(jsonobj.VerseNumberStyles);
  newProperties.VerseNumberAlignment = jsonobj.VerseNumberAlignment;
  newProperties.VerseTextStyles = JSON.stringify(jsonobj.VerseTextStyles);
  newProperties.VerseTextAlignment = jsonobj.VerseTextAlignment;
  newProperties.Lineheight = jsonobj.Lineheight;
  newProperties.LeftIndent = jsonobj.LeftIndent;
  newProperties.RightIndent = jsonobj.RightIndent;
  newProperties.FONT_FAMILY = jsonobj.FONT_FAMILY;
  newProperties.NoVersionFormatting = jsonobj.NoVersionFormatting;
  newProperties.LayoutPrefs = JSON.stringify(jsonobj.LayoutPrefs);
  //Logger.log("saving property NoVersionFormatting with value: "+jsonobj.NoVersionFormatting);
  let userProperties = PropertiesService.getUserProperties();
  userProperties.setProperties(newProperties);
  
  //consoleLog("preferences now set in properties service, userProperties.FONT_FAMILY = "+newProperties.FONT_FAMILY);
}

function setUserProperty(propKey,propVal){
  let userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(propKey, propVal);
}

function getUserProperty(propKey){
  let userProperties = PropertiesService.getUserProperties();
  Logger.log("getting user property: "+propKey);
  var userProp = userProperties.getProperty(propKey);
  Logger.log(userProp);
  return userProp;
}

function resetUserProperties(){
  let userProperties = PropertiesService.getScriptProperties();
  userProperties.deleteAllProperties();
  getUserProperties();
}

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

function docInsert(json){
  
  //docLog("retrieved json object from server, now inserting into document... "+JSON.stringify(json));
  //returns an already parsed json object, whether from user preferences set in properties service, or from default values
  var verses = json.results;
  //docLog("retrieved json object from server, now inserting into document... "+JSON.stringify(verses));
  
  var biblequote = "";
  
  var newelement = {"thisversion":"","newversion":false,"thisbook":"","newbook":false,"thischapter":0,"newchapter":false,"thisverse":0,"newverse":false};
  var BibleGetProperties = prepareProperties();
  //docLog("got results from server, now preparing to elaborate... BibleGetProperties object = "+JSON.stringify(BibleGetProperties));

  var BibleGetGlobal = {"iterateNewPar":false,"currentPar":null};
  BibleGetGlobal.body = DocumentApp.getActiveDocument().getBody();
  BibleGetGlobal.idx = getCursorIndex();
  BibleGetGlobal.locale = getUserLocale();
  BibleGetGlobal.firstFmtVerse = false;
  //docLog("got results from server, now preparing to elaborate... BibleGetGlobal object = "+JSON.stringify(BibleGetGlobal));
  
  var versenum;
  var newPar;  

  //Logger.log("index of cursor element in body = "+idx);
  if(newPar = BibleGetGlobal.body.insertParagraph(BibleGetGlobal.idx,"")){ // we'll be inserting our paragraph below the current position because we've had to choose the parent element...      
    //docLog("successfully created a new paragraph...");
    newPar.setAlignment(DocumentApp.HorizontalAlignment.JUSTIFY);
    newPar.setLineSpacing(BibleGetProperties.linespacing);
    //DocumentApp.getUi().alert("Left Indent = "+LeftIndent+" >> "+leftindent+"pt");
    newPar.setIndentFirstLine(BibleGetProperties.leftindent);
    newPar.setIndentStart(BibleGetProperties.leftindent);
    newPar.setIndentEnd(BibleGetProperties.rightindent);
    let ffStyle = {};
    ffStyle[DocumentApp.Attribute.FONT_FAMILY] = BibleGetProperties.FONT_FAMILY;
    newPar.setAttributes(ffStyle);
    BibleGetGlobal.currentPar = newPar;
  } else {
    DocumentApp.getUi().alert(__('Cannot insert text at this document location.',locale));
    return;
  }
    
  for(var i=0;i<verses.length;i++){
    
    verses[i].verse = parseInt(verses[i].verse);
    verses[i].chapter = parseInt(verses[i].chapter);
    //verses[i].partialverse_isdescr = parseInt(verses.partialverse_isdescr);
    //docLog("initial value of newelement >> "+JSON.stringify(newelement));
    //docLog("value of verses["+i+"] >> "+JSON.stringify(verses[i]));
    newelement = checkNewElements(verses[i],newelement);
    //docLog("checking new elements... >> "+JSON.stringify(newelement));
    if(newelement.newversion){          
      var versionpargr;
      if(i==0){ versionpargr = BibleGetGlobal.currentPar.appendText(verses[i].version); }
      else { 
        BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent,BibleGetProperties.rightindent,BibleGetProperties.FONT_FAMILY);
        versionpargr = BibleGetGlobal.currentPar.appendText(verses[i].version); 
      }
      setVerseStyles(versionpargr,BibleGetProperties.bcStyles,BibleGetProperties.bookchapteralignment,BibleGetProperties.FONT_FAMILY);
      BibleGetGlobal.firstFmtVerse = false;
    }
    //docLog("so far so good");
    
    if(newelement.newbook || newelement.newchapter){
      //if(i==0 || newversion){ var bookpargr = currentPar.appendText(verses[i].book + " " + verses[i].chapter); }
      //else{ 
      BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent,BibleGetProperties.rightindent,BibleGetProperties.FONT_FAMILY);
      var bookpargr = BibleGetGlobal.currentPar.appendText(verses[i].book + " " + verses[i].chapter); 
      //}
      setVerseStyles(bookpargr,BibleGetProperties.bcStyles,BibleGetProperties.bookchapteralignment,BibleGetProperties.FONT_FAMILY);
      BibleGetGlobal.firstFmtVerse = false;
    }
    //docLog("so far so good");
    
    if(newelement.newverse){
      if(BibleGetGlobal.iterateNewPar || newelement.newchapter){
        BibleGetGlobal.iterateNewPar = false;
        BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent,BibleGetProperties.rightindent,BibleGetProperties.FONT_FAMILY);
      }
      versenum = BibleGetGlobal.currentPar.appendText(" " + verses[i].verse + " ");
      setVerseStyles(versenum,BibleGetProperties.vnStyles,BibleGetProperties.versenumberalignment,BibleGetProperties.FONT_FAMILY);
    }
    //docLog("so far so good");
    
    
    //var partial = element.appendText(" " + verses[i].partialverse + " ");
    //partial.setBold(false).setItalic(true).setFontSize(6).setForegroundColor("#FF0000");
    
    //before appending the verse text, we need to parse it to see if it contains special markup
    if(/<[\/]{0,1}(?:sm|po|speaker)[f|l|s|i]{0,1}[f|l]{0,1}>/.test(verses[i].text)){
      //docLog("looks like we have special formatting in this verse... <"+verses[i].text+">");
      
      verses[i].text = verses[i].text.replace(/(\n|\r)/gm,"");
      //we have special formatting to deal with
      if(BibleGetProperties.noVersionFormatting){
        //if user preferences ask to override version formatting, we just need to remove the formatting tags from the text
        verses[i].text = verses[i].text.replace(/<[\/]{0,1}(?:po|speaker)[f|l|s|i]{0,1}[f|l]{0,1}>/g," "); 
        verses[i].text = verses[i].text.replace(/<[\/]{0,1}sm>/g,""); 
        var versetext = BibleGetGlobal.currentPar.appendText(verses[i].text);
        setVerseStyles(versetext,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment,BibleGetProperties.FONT_FAMILY);
        //Logger.log(verses[i].text);
      }else{
        BibleGetGlobal = formatSections(verses[i].text,BibleGetProperties,newelement,BibleGetGlobal);
      }
      
    }
    else{
      BibleGetGlobal.firstFmtVerse = true;
      var versetext = BibleGetGlobal.currentPar.appendText(verses[i].text);
      setVerseStyles(versetext,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment,BibleGetProperties.FONT_FAMILY);
    }
  
  }            

}

function getUserLocale(){
  return Session.getActiveUserLocale();
}

function doNestedTagStuff(speakerTagBefore,speakerTagContents,speakerTagAfter,thisPar,vtStyles,versetextalignment){
  //Logger.log("We have a nested tag, and we should have extracted it's parts: ");
  //Logger.log("speakerTagBefore = {"+speakerTagBefore+"}, speakerTagContents = {"+speakerTagContents+"}, speakerTagAfter = {"+speakerTagAfter+"}");
  var nabreStyleText;
  if(speakerTagBefore != ""){
    nabreStyleText = thisPar.appendText(speakerTagBefore);
    //Logger.log("we have now appended speakerTagBefore");
    setVerseStyles(nabreStyleText,vtStyles,versetextalignment);
  }
  
  nabreStyleText = thisPar.appendText(" "+speakerTagContents+" ");
  //Logger.log("we have now appended speakerTagContents");
  nabreStyleText.setBold(true).setItalic(false).setUnderline(false).setStrikethrough(false).setFontSize(vtStyles["FONT_SIZE"]).setForegroundColor("#000000").setBackgroundColor("#9A9A9A").setTextAlignment(versetextalignment);
  
  if(speakerTagAfter != ""){
    nabreStyleText = thisPar.appendText(speakerTagAfter);
    //Logger.log("we have now appended speakerTagAfter");
    setVerseStyles(nabreStyleText,vtStyles,versetextalignment);
  } 
}

function createNewPar(BibleGetGlb,linespacing,leftindent,rightindent,fontfamily){
  var newPar;
  if(newPar = BibleGetGlb.body.insertParagraph(++BibleGetGlb.idx,"")){
    newPar.setAlignment(DocumentApp.HorizontalAlignment.JUSTIFY);
    newPar.setLineSpacing(linespacing);
    //DocumentApp.getUi().alert("Left Indent = "+LeftIndent+" >> "+leftindent+"pt");
    newPar.setIndentFirstLine(leftindent);
    newPar.setIndentStart(leftindent);
    newPar.setIndentEnd(rightindent);
    let ffStyle = {};
    ffStyle[DocumentApp.Attribute.FONT_FAMILY] = fontfamily;
    newPar.setAttributes(ffStyle);
    BibleGetGlb.currentPar = newPar;
  }
  return BibleGetGlb;
}

function setVerseStyles(versetext,styles,alignment,fontfamily){
  versetext.setBold(styles["BOLD"]).setItalic(styles["ITALIC"]).setUnderline(styles["UNDERLINE"]).setStrikethrough(styles["STRIKETHROUGH"]).setFontSize(styles["FONT_SIZE"]).setForegroundColor(styles["FOREGROUND_COLOR"]).setBackgroundColor(styles["BACKGROUND_COLOR"]).setTextAlignment(alignment).setFontFamily(fontfamily);
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
      setVerseStyles(versetext,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment);
      remainingText = remainingText.replace(NABREfmtMatch[1],"");
      
      if(NABREfmtMatch[2] != "sm"){
        BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent,BibleGetProperties.rightindent,BibleGetProperties.FONT_FAMILY);
      }
    }
    if(NABREfmtMatch[4] != null && NABREfmtMatch[4] != ""){
      var formattingTagContents = NABREfmtMatch[4].trim();
      Logger.log("{"+formattingTagContents+"}");      
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
            BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent+(7.2*2),BibleGetProperties.rightindent,BibleGetProperties.FONT_FAMILY);                    
            
            if(BibleGetGlobal.firstFmtVerse){
              BibleGetGlobal.firstFmtVerse = false;
            }
            newelement.newverse = false;
          }
          // because if it is the start of a new verse, we probably already have a new paragraph
          else{
            BibleGetGlobal.currentPar.setIndentStart(BibleGetProperties.leftindent+(7.2*2));
            BibleGetGlobal.currentPar.appendText("\t");
            newelement.newverse = false;
          }
          
          if(nestedTag){
            doNestedTagStuff(speakerTag.Before,speakerTag.Contents,speakerTag.After,BibleGetGlobal.currentPar,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment);
            nestedTag = false;
          }
          else{
            nabreStyleText = BibleGetGlobal.currentPar.appendText(formattingTagContents);
            setVerseStyles(nabreStyleText,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment,BibleGetProperties.FONT_FAMILY);
          }
          break;
        case "poif":
        case "poi":
        case "poil":
          BibleGetGlobal.iterateNewPar = true;
          // create a new paragraph only if it's not the start of a new verse
          if(!newelement.newverse){
            Logger.log("not the start of a new verse, so creating a new paragraph... <"+formattingTagContents+">");
            BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent+(7.2*3),BibleGetProperties.rightindent,BibleGetProperties.FONT_FAMILY);
          }
          // because if it is the start of a new verse we probably already have a new paragraph
          else{
            BibleGetGlobal.currentPar.setIndentStart(BibleGetProperties.leftindent+(7.2*3));
            BibleGetGlobal.currentPar.appendText("\t");
            newelement.newverse = false;
          }                      
          if(nestedTag){
            doNestedTagStuff(speakerTag.Before,speakerTag.Contents,speakerTag.After,BibleGetGlobal.currentPar,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment);
            nestedTag = false;
          }
          else{
            nabreStyleText = BibleGetGlobal.currentPar.appendText(formattingTagContents);
            setVerseStyles(nabreStyleText,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment,BibleGetProperties.FONT_FAMILY);
          }                    
          break;
        case "sm":
          BibleGetGlobal.iterateNewPar = false;
          //if(NABREpar != null){
          var smText = BibleGetGlobal.currentPar.appendText(formattingTagContents);
          //}else{
          //  var smText = newPar.appendText(formattingTagContents);
          //}
          var smallCapsFontSize = Math.round(BibleGetProperties.vtStyles["FONT_SIZE"] - (BibleGetProperties.vtStyles["FONT_SIZE"] * .15));
          smText.setFontSize(smallCapsFontSize);
          break;
        case "speaker":
          BibleGetGlobal.iterateNewPar = false;
          //if(NABREpar != null){
          var smText = BibleGetGlobal.currentPar.appendText(formattingTagContents);
          //}else{
          //  var smText = newPar.appendText(formattingTagContents);
          //}
          smText.setBackgroundColor("#6A6A6A").setTextAlignment(BibleGetProperties.versetextalignment);
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
    setVerseStyles(lastText,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment,BibleGetProperties.FONT_FAMILY);
  }
  
  return BibleGetGlobal;
}

function setAlignmentValue(alignmentvalue){
  var returnalignmentvalue = (alignmentvalue == "NORMAL" ? DocumentApp.TextAlignment.NORMAL : (alignmentvalue == "SUPERSCRIPT" ? DocumentApp.TextAlignment.SUPERSCRIPT : DocumentApp.TextAlignment.SUBSCRIPT));
  return returnalignmentvalue;
}

function prepareProperties(){
  let userProperties = getUserProperties();
  
  let noVersionFormatting = JSON.parse(userProperties.NoVersionFormatting);  
  let bookchapteralignment = setAlignmentValue(userProperties.BookChapterAlignment);  
  let versenumberalignment = setAlignmentValue(userProperties.VerseNumberAlignment);  
  let versetextalignment = setAlignmentValue(userProperties.VerseTextAlignment);  
  let linespacing = parseFloat(userProperties.Lineheight);
  let LeftIndent = parseFloat(userProperties.LeftIndent);
  let RightIndent = parseFloat(userProperties.RightIndent);
  
  let bcStyles = userProperties.BookChapterStyles;
  let vnStyles = userProperties.VerseNumberStyles;
  let vtStyles = userProperties.VerseTextStyles;
  
  bcStyles.FONT_SIZE = parseInt(bcStyles.FONT_SIZE);
  vnStyles.FONT_SIZE = parseInt(vnStyles.FONT_SIZE);
  vtStyles.FONT_SIZE = parseInt(vtStyles.FONT_SIZE);

  //var leftindent = Math.round(LeftIndent * 28.3464567); =centimeters to points conversion
  let leftindent = Math.round(LeftIndent * 72); //=inches to points conversion
  let rightindent = Math.round(RightIndent * 72); //=inches to points conversion

  return {"bcStyles":bcStyles,"vnStyles":vnStyles,"vtStyles":vtStyles,"bookchapteralignment":bookchapteralignment,"versenumberalignment":versenumberalignment,"versetextalignment":versetextalignment,"linespacing":linespacing,"LeftIndent":LeftIndent,"RightIndent":RightIndent,"FONT_FAMILY":userProperties.FONT_FAMILY,"noVersionFormatting":noVersionFormatting,"leftindent":leftindent,"rightindent":rightindent};
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