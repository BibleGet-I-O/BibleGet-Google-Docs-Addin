/**
 * @OnlyCurrentDoc
 */

const version = 21; //corresponds with version in the store; local version is -1!
const requestparameters = "&return=json&appid=googledocs&pluginversion="+version;

function onInstall(e){
  
  // Show instructions for usage only on first install
  openHelpUI();

  // Add plugin menu to the toolbar
  onOpen(e); 

}

function onOpen(e) {
  var locale = getUserLocale();
  DocumentApp.getUi().createAddonMenu()
  .addItem(__('Avvia',locale), 'openCoolUI')
  .addSeparator()
  .addItem(__('Istruzioni',locale), 'openHelpUI')
  .addItem(__('Impostazioni',locale), 'openSettings')
  .addItem(__('Invia Feedback',locale), 'mailPrompt')
  .addItem(__('Contribuisci',locale), 'contributo')
  .addToUi();

  // Initialize user preferences ONLY after user has granted permission to the Properties Service!
  if (e && (e.authMode == ScriptApp.AuthMode.LIMITED || e.authMode == ScriptApp.AuthMode.FULL)) {
    var userProperties = PropertiesService.getUserProperties();
    //consoleLog("getting properties service");
    
    // Check if preferences have been set yet, if not set defaults
    if(userProperties.getProperty("BookChapterStyles")==null){
      
      //consoleLog("preferences have not been set, now setting defaults");
      
      var bookChapterStylesObj = {UNDERLINE:false,LINK_URL:null,ITALIC:false,BOLD:true,BACKGROUND_COLOR:"#FFFFFF",FONT_SIZE:10,FONT_FAMILY:"Times New Roman",STRIKETHROUGH:false,FOREGROUND_COLOR:"#000044"};
      var bookChapterStylesStr = JSON.stringify(bookChapterStylesObj);
      
      //consoleLog("prepared bookChapterStylesStr");
      
      var verseNumberStylesObj = {UNDERLINE:false,LINK_URL:null,ITALIC:false,BOLD:true,BACKGROUND_COLOR:"#FFFFFF",FONT_SIZE:10,FONT_FAMILY:"Times New Roman",STRIKETHROUGH:false,FOREGROUND_COLOR:"#AA0000"};
      var verseNumberStylesStr = JSON.stringify(verseNumberStylesObj);

      //consoleLog("prepared verseNumberStylesStr");
      
      var verseTextStylesObj = {UNDERLINE:false,LINK_URL:null,ITALIC:false,BOLD:false,BACKGROUND_COLOR:"#FFFFFF",FONT_SIZE:10,FONT_FAMILY:"Times New Roman",STRIKETHROUGH:false,FOREGROUND_COLOR:"#666666"};
      var verseTextStylesStr = JSON.stringify(verseTextStylesObj);
      
      //consoleLog("prepared verseTextStylesStr");

      var newProperties = {BookChapterStyles:bookChapterStylesStr,BookChapterAlignment:"NORMAL",VerseNumberStyles:verseNumberStylesStr,VerseNumberAlignment:"SUPERSCRIPT",VerseTextStyles:verseTextStylesStr,VerseTextAlignment:"NORMAL",Interlinea:1.5,RientroSinistro:0,NoVersionFormatting:false,RecentSelectedVersions:"[]"};
      userProperties.setProperties(newProperties);

      //consoleLog("default preferences now set in properties service");
      
    }    
  }
  else {
    //consoleLog("we do not yet have full permissions");
  }
}

function openSettings(){
  var locale = getUserLocale();
  var html = HtmlService.createTemplateFromFile('Settings');
  html.activetab = 0;
  var evaluated = html.evaluate()
      .setWidth(800)
      .setHeight(500)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(evaluated, __('Impostazioni',locale));
}

/** 
 * Send email to plugin creator with feedback
 * (email body from custom dialog prompt) 
 */
function mailPrompt(){
  var locale = getUserLocale();
  var html = HtmlService.createTemplateFromFile('Feedback')
      .evaluate()
      .setWidth(400)
      .setHeight(300)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, __('Invia Feedback',locale));
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

function contributo(){
  var locale = getUserLocale();
  var html = HtmlService.createTemplateFromFile('Contributo')
      .evaluate()
      .setWidth(400)
      .setHeight(300)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html,__('Sostieni BibleGet I/O',locale));
}

function openCoolUI(){
  var html = HtmlService.createTemplateFromFile('Sidebar');
  //Logger.log(html.getCode());
  //MailApp.sendEmail("bibleget.io@gmail.com", "Sidebar Code", html.getCode());
  DocumentApp.getUi().showSidebar(html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('BibleGet I/O'));
}

function openHelpUI(){
  var locale = getUserLocale();
  var html = HtmlService.createTemplateFromFile('Help.html');
  DocumentApp.getUi().showSidebar(html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('BibleGet I/O - '+__('Istruzioni',locale)));
}

/***********************************************/
/* FUNCTIONS THAT RUN FROM THE SIDEBAR SCRIPTS */
/***********************************************/

function getFontFamilies(){
  var fontfamilies = [""];//DocumentApp.FontFamily.values().toString();
  Logger.log(fontfamilies);
  return fontfamilies;
}

function alertMe(str){
  DocumentApp.getUi().alert(str);
}

function getDefaultProperties(){
  
  //consoleLog("returning default properties");
  
  var bookChapterStylesObj = {UNDERLINE:false,LINK_URL:null,ITALIC:false,BOLD:true,BACKGROUND_COLOR:"#FFFFFF",FONT_SIZE:10,FONT_FAMILY:"Times New Roman",STRIKETHROUGH:false,FOREGROUND_COLOR:"#000044"};
  var verseNumberStylesObj = {UNDERLINE:false,LINK_URL:null,ITALIC:false,BOLD:true,BACKGROUND_COLOR:"#FFFFFF",FONT_SIZE:10,FONT_FAMILY:"Times New Roman",STRIKETHROUGH:false,FOREGROUND_COLOR:"#AA0000"};
  var verseTextStylesObj = {UNDERLINE:false,LINK_URL:null,ITALIC:false,BOLD:false,BACKGROUND_COLOR:"#FFFFFF",FONT_SIZE:10,FONT_FAMILY:"Times New Roman",STRIKETHROUGH:false,FOREGROUND_COLOR:"#666666"};
  var defaultProperties = {BookChapterStyles:bookChapterStylesObj,BookChapterAlignment:"NORMAL",VerseNumberStyles:verseNumberStylesObj,VerseNumberAlignment:"SUPERSCRIPT",VerseTextStyles:verseTextStylesObj,VerseTextAlignment:"NORMAL",Interlinea:1.5,RientroSinistro:0,NoVersionFormatting:false};
  return defaultProperties;
}

function getUserProperties(){

  //consoleLog("getting user preferences.");
  
  var userProperties = PropertiesService.getUserProperties();
  
  //consoleLog("first trying properties service:");
  
  //if for any reason defaults have not been set, let's return an object with default values
  if(userProperties.getProperty("BookChapterStyles")===null){
    
    //consoleLog("preferences not yet set in properties service, will get default preferences...");
    
    var defaultProperties = getDefaultProperties();
    return defaultProperties;
    
  }
  
  //otherwise we will retrieve the user preferences set in the properties service
  else{
    
    //consoleLog("preferences have been set in properties service, retrieving now...");
    
    var usrProperties = userProperties.getProperties();
    var currentProperties = {};
    
    //consoleLog("will now parse json strings from properties service");
    
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
    currentProperties.Interlinea = usrProperties.Interlinea;
    currentProperties.RientroSinistro = usrProperties.RientroSinistro;
    
    currentProperties.NoVersionFormatting = usrProperties.NoVersionFormatting;
    //consoleLog("now returning preferences retrieved from properties service.");
    return currentProperties;
    
  }

}

function setUserProperties(jsonobj){

  //consoleLog("setting preferences in properties service");
  
  var newProperties = {};
  newProperties.BookChapterStyles = JSON.stringify(jsonobj.BookChapterStyles);
  newProperties.BookChapterAlignment = jsonobj.BookChapterAlignment;
  newProperties.VerseNumberStyles = JSON.stringify(jsonobj.VerseNumberStyles);
  newProperties.VerseNumberAlignment = jsonobj.VerseNumberAlignment;
  newProperties.VerseTextStyles = JSON.stringify(jsonobj.VerseTextStyles);
  newProperties.VerseTextAlignment = jsonobj.VerseTextAlignment;
  newProperties.Interlinea = jsonobj.Interlinea;
  newProperties.RientroSinistro = jsonobj.RientroSinistro;
  newProperties.NoVersionFormatting = jsonobj.NoVersionFormatting;
  //Logger.log("saving property NoVersionFormatting with value: "+jsonobj.NoVersionFormatting);
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperties(newProperties);
  
  //consoleLog("preferences now set in properties service.");
}

function setUserProperty(propKey,propVal){
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(propKey, propVal);
}

function getUserProperty(propKey){
  var userProperties = PropertiesService.getUserProperties();
  Logger.log("getting user property: "+propKey);
  var userProp = userProperties.getProperty(propKey);
  Logger.log(userProp);
  return userProp;
}

function consoleLog(str){
  Logger.log(str);
}

function fetchData(request){
  var url = "http://query.bibleget.io/index2.php?query=" + request + requestparameters;
  try{
    var response = UrlFetchApp.fetch(url);
    var responsecode = response.getResponseCode();
    if(responsecode==200){
      //Logger.log("Response code was 200.");
      var content = response.getContentText();
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
    //DocumentApp.getUi().alert("rientro sinistro = "+rientrosinistro+" >> "+leftindent+"pt");
    newPar.setIndentFirstLine(BibleGetProperties.leftindent);
    newPar.setIndentStart(BibleGetProperties.leftindent);
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
        BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent);
        versionpargr = BibleGetGlobal.currentPar.appendText(verses[i].version); 
      }
      setVerseStyles(versionpargr,BibleGetProperties.bcStyles,BibleGetProperties.bookchapteralignment);
      BibleGetGlobal.firstFmtVerse = false;
    }
    //docLog("so far so good");
    
    if(newelement.newbook || newelement.newchapter){
      //if(i==0 || newversion){ var bookpargr = currentPar.appendText(verses[i].book + " " + verses[i].chapter); }
      //else{ 
      BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent);
      var bookpargr = BibleGetGlobal.currentPar.appendText(verses[i].book + " " + verses[i].chapter); 
      //}
      setVerseStyles(bookpargr,BibleGetProperties.bcStyles,BibleGetProperties.bookchapteralignment);
      BibleGetGlobal.firstFmtVerse = false;
    }
    //docLog("so far so good");
    
    if(newelement.newverse){
      if(BibleGetGlobal.iterateNewPar || newelement.newchapter){
        BibleGetGlobal.iterateNewPar = false;
        BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent);
      }
      versenum = BibleGetGlobal.currentPar.appendText(" " + verses[i].verse + " ");
      setVerseStyles(versenum,BibleGetProperties.vnStyles,BibleGetProperties.versenumberalignment);
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
        setVerseStyles(versetext,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment);
        //Logger.log(verses[i].text);
      }else{
        BibleGetGlobal = formatSections(verses[i].text,BibleGetProperties,newelement,BibleGetGlobal);
      }
      
    }
    else{
      BibleGetGlobal.firstFmtVerse = true;
      var versetext = BibleGetGlobal.currentPar.appendText(verses[i].text);
      setVerseStyles(versetext,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment);
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

function createNewPar(BibleGetGlobal,linespacing,leftindent){
  var newPar;
  if(newPar = BibleGetGlobal.body.insertParagraph(++BibleGetGlobal.idx,"")){
    newPar.setAlignment(DocumentApp.HorizontalAlignment.JUSTIFY);
    newPar.setLineSpacing(linespacing);
    //DocumentApp.getUi().alert("rientro sinistro = "+rientrosinistro+" >> "+leftindent+"pt");
    newPar.setIndentFirstLine(leftindent);
    newPar.setIndentStart(leftindent);
    BibleGetGlobal.currentPar = newPar;
  }
  return BibleGetGlobal;
}

function setVerseStyles(versetext,styles,alignment){
  versetext.setBold(styles["BOLD"]).setItalic(styles["ITALIC"]).setUnderline(styles["UNDERLINE"]).setStrikethrough(styles["STRIKETHROUGH"]).setFontSize(styles["FONT_SIZE"]).setForegroundColor(styles["FOREGROUND_COLOR"]).setBackgroundColor(styles["BACKGROUND_COLOR"]).setTextAlignment(alignment);
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
        BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent);
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
            BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent+(7.2*2));                    
            
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
            setVerseStyles(nabreStyleText,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment);
          }
          break;
        case "poif":
        case "poi":
        case "poil":
          BibleGetGlobal.iterateNewPar = true;
          // create a new paragraph only if it's not the start of a new verse
          if(!newelement.newverse){
            Logger.log("not the start of a new verse, so creating a new paragraph... <"+formattingTagContents+">");
            BibleGetGlobal = createNewPar(BibleGetGlobal,BibleGetProperties.linespacing,BibleGetProperties.leftindent+(7.2*3));                    
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
            setVerseStyles(nabreStyleText,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment);
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
    setVerseStyles(lastText,BibleGetProperties.vtStyles,BibleGetProperties.versetextalignment);
  }
  
  return BibleGetGlobal;
}

function setAlignmentValue(alignmentvalue){
  var returnalignmentvalue = (alignmentvalue == "NORMAL" ? DocumentApp.TextAlignment.NORMAL : (alignmentvalue == "SUPERSCRIPT" ? DocumentApp.TextAlignment.SUPERSCRIPT : DocumentApp.TextAlignment.SUBSCRIPT));
  return returnalignmentvalue;
}

function prepareProperties(){
  var userProperties = getUserProperties();
  
  var bcStyles,bookchapteralignment,vnStyles,versenumberalignment,vtStyles,versetextalignment,linespacing,rientrosinistro,noVersionFormatting;
  
  noVersionFormatting = JSON.parse(userProperties.NoVersionFormatting);  
  bookchapteralignment = setAlignmentValue(userProperties.BookChapterAlignment);  
  versenumberalignment = setAlignmentValue(userProperties.VerseNumberAlignment);  
  versetextalignment = setAlignmentValue(userProperties.VerseTextAlignment);  
  linespacing = parseFloat(userProperties.Interlinea);
  rientrosinistro = parseFloat(userProperties.RientroSinistro);
  
  bcStyles = userProperties.BookChapterStyles;
  vnStyles = userProperties.VerseNumberStyles;
  vtStyles = userProperties.VerseTextStyles;
  
  bcStyles.FONT_SIZE = parseInt(bcStyles.FONT_SIZE);
  vnStyles.FONT_SIZE = parseInt(vnStyles.FONT_SIZE);
  vtStyles.FONT_SIZE = parseInt(vtStyles.FONT_SIZE);

  //var leftindent = Math.round(rientrosinistro * 28.3464567); =centimeters to points conversion
  var leftindent = Math.round(rientrosinistro * 72); //=inches to points conversion

  return {"bcStyles":bcStyles,"vnStyles":vnStyles,"vtStyles":vtStyles,"bookchapteralignment":bookchapteralignment,"versenumberalignment":versenumberalignment,"versetextalignment":versetextalignment,"linespacing":linespacing,"rientrosinistro":rientrosinistro,"noVersionFormatting":noVersionFormatting,"leftindent":leftindent};
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