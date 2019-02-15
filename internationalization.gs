function include(filename){
  //if(authMode==ScriptApp.AuthMode.LIMITED || authMode==ScriptApp.AuthMode.FULL){
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  //}
}

var __ = function(str,ling){
      if(translatables.hasOwnProperty(str)){
        if(translatables[str].hasOwnProperty(ling)){
          return translatables[str][ling]; 
        }
        else if(translatables[str].hasOwnProperty("en")){
          return translatables[str].en;
        }
        else{
          return str;
        }
      } 
      else{ return str; }
    },
    _c = function(str){
      return langcodes[str];
    },
    _l = function(str,ling){
      if(worldlanguages.hasOwnProperty(str)){ 
        if(worldlanguages[str].hasOwnProperty(ling)){
          return worldlanguages[str][ling]; 
        }
        else if(worldlanguages[str].hasOwnProperty("en")){
          return worldlanguages[str].en;
        }
        else{ return str; }
      } 
      else{
        return str;
      }
    },
    _r = function(str,ling){
      if(errormessages.hasOwnProperty(str)){ 
        if(errormessages[str].hasOwnProperty(ling)){
          return errormessages[str][ling]; 
        }
        else if(errormessages[str].hasOwnProperty("en")){
          return errormessages[str].en;
        }
        else{
          return str;
        }
      } 
      else{ return str; }      
    },
    translatables = {
      "Avvia":{"en":"Start","it":"Avvia","es":"Iniciar","fr":"Lancer","de":"Starten"},
      "Istruzioni":{"en":"Instructions","it":"Istruzioni","es":"Instrucciones","fr":"Instructions","de":"Anleitung"},
      "Impostazioni":{"en":"Settings","it":"Impostazioni","es":"Ajustes","fr":"Paramètres","de":"Einstellungen"},
      "Invia Feedback":{"en":"Send Feedback","it":"Invia Feedback","es":"Enviar Comentarios","fr":"Envoyer des Commentaires","de":"Feedback Schicken"},
      "Contribuisci":{"en":"Contribute","it":"Contribuisci","es":"Contribuir","fr":"Contribuer","de":"Beitragen"},
      "Sostieni BibleGet I/O":{"en":"Support the BibleGet I/O Project","it":"Sostieni il Progetto BibleGet I/O","es":"Apoya el Proyecto BibleGet I/O","fr":"Soutenir le Projet BibleGet I/O","de":"Unterstützt das Projekt BibleGet I/O"},
      "Cannot insert text at this document location.":{"en":"Cannot insert text at this document location.","it":"Non è possibile inserire testo in questa posizione nel documento.","es":"No es posible insertar el texto en esa posición en el documento.","fr":"Il n'est pas possible d'insérer du texte à cet emplacement dans le document.","de":"Es ist nicht möglich, Text an dieser Stelle in das Dokument einzufügen."},
      "Get bible quotes":{"en":"Get bible quotes","it":"Ricerca citazioni bibliche","es":"Buscar citas biblicas","fr":"Obtenir citations bibliques","de":"Erhalten Bibelzitate"},
      "Formattazione":{"en":"Formatting","it":"Formattazione","es":"Formato","fr":"Formatage","de":"Formatierung"},
      "Versions available:":{"en":"Versions available:","it":"Versioni disponibili:","es":"Versiones disponibles:","fr":"Versions disponibles:","de":"Versionen verfügbare:"},
      "Versions selected:":{"en":"Versions selected:","it":"Versioni selezionate:","es":"Versiones seleccionadas:","fr":"Versions sélectionnées:","de":"Ausgewählten Versionen:"},
      "Insert query":{"en":"Insert query","it":"Inserisci richiesta","es":"Insertar consulta","fr":"Insérer requête","de":"Legen Sie die Abfrage"},
      "e.g. Matthew 1:1-10,13-15":{"en":"e.g. Matthew 1:1-10,13-15","it":"e.g. Matteo 1,1-10.13-15","es":"ej. Mateo 1,1-10.13-15","fr":"e.g. Mathieu 1,1-10.13-15","de":"e.g. Matthäus 1,1-10.13-15"},
      "Search":{"en":"Search","it":"Cerca","es":"Buscar","fr":"Rechercher","de":"Suchen"},
      "There are Errors":{"en":"There are Errors","it":"Ci sono degli Errori","es":"Hay algunos Errores","fr":"Il y a des Erreurs","de":"Es gibt Fehler"},
      "Risultato":{"en":"Result","it":"Risultato","es":"Resultado","fr":"Résultat","de":"Ergebnis"},
      "Formato Paragrafo e Testo":{"en":"Paragraph Format","it":"Formato Paragrafo","es":"Formato de Párrafo","fr":"Format de Paragraphe","de":"Absatzformat"},
      "Interlinea":{"en":"Linespacing","it":"Interlinea","es":"Interlínea","fr":"Interligne","de":"Zeilenabstand"},
      "Rientro Sinistro":{"en":"Left Indent","it":"Rientro Sinistro","es":"Sangría Izquierda","fr":"Tiret Gauche","de":"Linken Einzug"},
      "Formato Libro / Capitolo":{"en":"Book / Chapter Format","it":"Formato Libro / Capitolo","es":"Formato Libro / Capítulo","fr":"Format Livre / Chapitre","de":"Buchformat und Kapitel-Format"},
      "Formato Numero del Versetto":{"en":"Verse Number Format","it":"Formato Numero del Versetto","es":"Formato Número de Versículo","fr":"Format Numéro du Verset","de":"Format der Vers Nummer"},
      "Formato Testo del Versetto":{"en":"Verse Text Format","it":"Formato Testo del Versetto","es":"Formato Texto de Versículo","fr":"Format Texte du Verset","de":"Format der Verse Text"},
      "Text Formatting":{"en":"Text Formatting","it":"Formattazione del Testo","es":"Formato del Texto","fr":"Format du Texte","de":"Textformat"},
      "Preferred Layout":{"en":"Preferred Layout","it":"Disposizione Preferita","es":"Disposición Preferida","fr":"Mise en Page Préférée","de":"Bevorzugte Seitenlayout"},
      "Versions and Languages":{"en":"Supported Versions and Languages","it":"Versioni e Lingue supportate","es":"Versiones y Idiomas compatibles","fr":"Versions et Idiomes compatibles","de":"Unterstützte Versionen und Sprachen"},
      "Anteprima":{"en":"Preview","it":"Anteprima","es":"Pre estreno","fr":"Avant-première","de":"Vorschau"},
      "Genesi":{"en":"Genesis","it":"Genesi","es":"Génesis","fr":"Genèse","de":"Genesis"},
      "Gen1:1":{
        "en":"In the beginning, when God created the heavens and the earth—",
        "it":"In principio Dio creò il cielo e la terra.",
        "es":"En el principio, cuando Dios creó los cielos y la tierra,",
        "fr":"Au commencement, Dieu créa le ciel et la terre.",
        "de":"Im Anfang schuf Gott Himmel und Erde;"
      },
      "Gen1:2":{
        "en":"and the earth was without form or shape, with darkness over the abyss and a mighty wind sweeping over the waters—",
        "it":"La terra era informe e deserta e le tenebre ricoprivano l'abisso e lo spirito di Dio aleggiava sulle acque.",
        "es":"todo era confusión y no había nada en la tierra. Las tinieblas cubrían los abismos mientras el espíritu de Dios aleteaba sobre la superficie de las aguas.",
        "fr":"Or la terre était vide et vague, les ténèbres couvraient l'abîme, un vent de Dieu tournoyait sur les eaux.",
        "de":"die Erde aber war wüst und wirr, Finsternis lag über der Urflut und Gottes Geist schwebte über dem Wasser."
      },
      "Gen1:3":{
        "en":"Then God said: Let there be light, and there was light.",
        "it":"Dio disse: \"Sia la luce!\". E la luce fu.",
        "es":"Dijo Dios: «Haya luz», y hubo luz.",
        "fr":"Dieu dit : Que la lumière soit et la lumière fut.",
        "de":"Gott sprach: Es werde Licht. Und es wurde Licht."
      },
      "Inserisci nel Documento":{"en":"Insert into the Document","it":"Inserisci nel Documento","es":"Insertar en el Documento","fr":"Insérer dans le Document","de":"Legen Sie in das Dokument"},
      "Scrivi le tue osservazioni su BibleGet I/O":{
        "en":"Write your observations about BibleGet I/O",
        "it":"Scrivi le tue osservazioni su BibleGet I/O",
        "es":"Escríbe tus observaciones sobre BibleGet I/O",
        "fr":"Donnez vos commentaires sur BibleGet",
        "de":"Schreiben Sie Ihre Kommentare zu BibleGet I/O"
      },
      "Invia Messaggio":{"en":"Send Message","it":"Invia Messaggio","es":"Enviar Mensaje","fr":"Envoyer Message","de":"Nachricht Senden"},
      "Il tuo messaggio è stato inviato con successo. Grazie per averci contattato!":{
        "en":"Your message was delivered successfully. Thank you for getting in touch with us!",
        "it":"Il tuo messaggio è stato inviato con successo. Grazie per averci contattato!",
        "es":"Tu mensaje se entregó correctamente. Gracias por ponerte en contacto con nosotros!",
        "fr":"Votre message a été livré avec succès. Merci de nous contacter!",
        "de":"Ihre Nachricht wurde erfolgreich übermittelt. Vielen Dank für Ihr Interesse!"
      },
      "CHIUDI":{"en":"CLOSE","it":"CHIUDI","es":"CERRAR","fr":"FERMER","de":"SCHLIEßEN"},
      "L'invio del messaggio non è andato a buon fine... Ritenta l'invio.":{
        "en":"Your message was not delivered successfully... Please try to send again.",
        "it":"L'invio del messaggio non è andato a buon fine... Ritenta l'invio.",
        "es":"Tu mensaje no se entregó correctamente... Por favor trate de enviar de nuevo.",
        "fr":"Votre message n'a pas remis correctement... Se il vous plaît essayer d'envoyer à nouveau.",
        "de":"Ihre Nachricht nicht korrekt zugestellt... Bitte versuchen Sie es noch einmal zu senden."  
      },
      "Il progetto BibleGet I/O con il relativo server web":{
        "en":"The BibleGet I/O Project with it's server, website, and applications were developed entirely by John R. D'Orazio, a priest of the Diocese of Rome, chaplain at the Third University of Rome. The project will survive only thanks to the offerings of those who appreciate and use this service. The server space and the domain name have annual costs. A contribution on your part, even if only €5, is a great help. Please help maintain this project!",
        "it":"Il progetto BibleGet I/O con il relativo server, sito web, e applicazioni sono stati sviluppati interamente da John R. D'Orazio, sacerdote della Diocesi di Roma, cappellano all'Università Roma Tre. Il progetto può sopravvivere soltanto grazie alle offerte di chi apprezza e utilizza questo servizio. Lo spazio server e il nome di dominio hanno dei costi annuali. Un tuo contributo, anche di soli €5, è di grande aiuto. Aiuta anche tu a mantenere vivo questo progetto!",
        "es":"El proyecto BibleGet I/O con sus servidor, sitio web, y aplicaciones se han desarrollado en su totalidad por John R. D'Orazio, sacerdote de la diócesis de Roma, capellán de la Tercera Universidad de Roma. El proyecto sólo puede sobrevivir gracias a las donaciones de aquellos que aprecian y utilizan este servicio. El espacio de el servidor y el nombre de dominio tienen costos anuales. Su contribución, aunque sea sólo €5, es una gran ayuda. Ayuda a mantener vivo este proyecto!",
        "fr":"Le projet BibleGet I/O avec son serveur, site web, et les applications ont été entièrement développé par John R. D'Orazio, prêtre du diocèse de Rome, aumônier de la Troisième Université de Rome. Le projet ne peut survivre que grâce aux dons de ceux qui apprécient et utilisent ce service. L'espace du serveur et le nom de domaine ont des coûts annuels. Sa contribution, même si seulement €5, est d'une grande aide. Aidez à garder ce projet en vie!",
        "de":"Das Projekt mit dem Server, Website und Anwendungen wurden vollständig von John R. D'Orazio entwickelt, priester der Diözese Rom, Kaplan der Dritten Universität von Rom. Das Projekt kann nur überleben dank der Spenden derer, die zu schätzen und nutzen diesen Service. Der Raum des Servers und der Domain-Namen haben jährlichen Kosten. Sein Beitrag, auch wenn nur €5, ist eine große Hilfe. Helfen Sie, dieses Projekt am Leben zu erhalten!"
      },
      "Formulazione delle query bibliche":{
        "en":"Formulation of biblical queries",
        "it":"Formulazione delle query bibliche",
        "es":"Formulacion de las consultas biblicas",
        "fr":"Formulation de les requêtes bibliques",
        "de":"Formulierung der biblischen Abfrage"
      },
      "p1":{
        "en":"Biblical queries must be formulated according to a precise set of rules, following the standard notation for bible citations (see also <a href=\"http:\/\/en.wikipedia.org\/wiki\/Bible_citation\">Wikipedia:Bible citation<\/a>). A query is composed of at least two elements: the biblical book followed by the chapter. The biblical book can be written in full or in the abbreviated form using the abbreviations as indicated in the table of the <span class=\"internal-link\" id=\"to-bookabbrevs\">Abbreviations of bible books<\/span>. For example, \"Matthew 1\" means the book of Matthew (or better the gospel according to Matthew) at chapter 1. This can also be written as \"Mt 1\".",
        "it":"Le query bibliche vanno formulate secondo regole precise, seguendo la notazione standard italiana per le citazioni bibliche. Una query è composta da almeno due elementi: il libro biblico seguito dal capitolo. Il libro biblico può essere scritto per intero oppure nella forma abbreviata utilizzando le abbreviazioni indicate nella tabella delle <span class=\"internal-link\" id=\"to-bookabbrevs\">Abbreviazioni dei libri biblici<\/span>. Per esempio, \"Matteo 1\" significa il libro di Matteo (ossia il vangelo secondo Matteo) al capitolo 1. Si può scrivere anche \"Mt 1\".",
        "es":"Las consultas bíblicas se formulan de acuerdo con un conjunto de normas precisas, siguiendo la notación estándar para las citas bíblicas. Una consulta consta de al menos dos elementos: el libro bíblico seguido por el capítulo. El libro bíblico puede ser escrito por completo o por la forma abreviada utilizando las abreviaturas que figuran en la tabla de las <span class=\"-internal-lini\" id=\"to-bookabbrevs\">Abreviaturas de los libros bíblicos<\/span>. Por ejemplo, \"Mateo 1\" significa el libro de Mateo (es decir, el Evangelio según San Mateo) en el capítulo 1. También se puede escribir \"Mt 1\".",
        "fr":"Les requêtes bibliques sont formulées selon un ensemble de règles précises, suivant la notation standard pour les citations bibliques. Une requête se compose d'au moins deux éléments: le livre biblique suivie par le chapitre. Le livre biblique peut être écrit en entier ou abrégé utilisant les abréviations énumérées dans le tableau de les <span class=\"internal-link\" id=\"to-bookabbrevs\">Abréviations des livres bibliques<\/span>. Par exemple, \"Matthieu 1\" signifie que le livre de Matthieu (ie l'évangile selon Matthieu) dans le chapitre 1. Vous pouvez également écrire \"Mt 1\".",
        "de":"Die biblischen Abfragen werden nach genauen Regeln, nach der Standardnotation für Bibelzitate formuliert. Eine Abfrage besteht aus mindestens zwei Elementen: dem biblischen Buch gefolgt vom Kapitel. Die Bibel Buch kann in voller Höhe ausgeschrieben oder abgekürzt wie angegebenen in der Tabelle der <span class=\"internal-link\" id=\"to-bookabbrevs\">Abkürzungen der biblischen Bücher<\/span>. Zum Beispiel: \"Matthäus 1\" ist das Buch von Matthäus (dh das Evangelium nach Matthäus) in Kapitel 1. Sie können auch schreiben, \"Mt 1\"."
      },
      "p2":{
        "en":"Here is a presentation of the signs that serve to indicate exactly which combination of chapters and verses you want to quote.",
        "it":"Ecco di seguito una presentazione dei segni che servono per indicare esattamente quale combinazione di capitoli e versetti si desidera citare.",
        "es":"Lo que sigue es una presentación de los signos que sirven para indicar exactamente qué combinación de capítulos y versículos desea citar.",
        "fr":"Voici une présentation des signes qui servent à indiquer exactement quelle combinaison de chapitres et versets que vous voulez citer.",
        "de":"Es folgt eine Darstellung der Zeichen, die auf genau die Kombination von Kapitel und Verse Sie zitieren wollen zeigen, zu dienen."
      },
      "li1":{
        "en":"\":\": the colon is the chapter-verse separator. \"Matthew 1:5\" means the book (gospel) of Matthew, chapter 1, verse 5.",
        "it":"\",\": la virgola è il separatore capitolo-versetto. \"Matteo 1,5\" significa il libro (vangelo) di Matteo al capitolo 1, versetto 5.",
        "es":"\",\": la coma es el separador capítulo-versículo. \"Mateo 1,5\" significa el libro (Evangelio) de San Mateo, capítulo 1, versículo 5.",
        "fr":"\",\": la virgule est le séparateur chapitre-verset. \"Matthieu 1,5\" signifie le livre (Evangile) de Saint Matthieu, chapitre 1, verset 5.",
        "de":"\",\": das Komma ist das Trenn Kapitel-Vers. \"Matthäus 1,5\" ist das Buch (Evangelium) von Matthäus, Kapitel 1, Vers 5."
      },
      "li2":{
        "en":"\",\": the comma is the verse-verse separator. \"Matthew 1:5,7\" means the book (gospel) of Matthew, chapter 1, verse 5 and verse 7.",
        "it":"\".\": il punto è il separatore tra versetto e versetto. \"Matteo 1,5.7\" significa il libro (vangelo) di Matteo al capitolo 1, versetto 5 e versetto 7.",
        "es":"\".\": el punto es el separador versículo-versículo. \"Mateo 1,5.7\" significa el libro (Evangelio) de San Mateo, capítulo 1, versículo 5 y versículo 7.",
        "fr":"\".\": le point est le séparateur verset-verset. \"Matthieu 1,5.7\" signifie le livre (Evangile) de Saint Matthieu, chapitre 1, verset 5 et verset 7.",
        "de":"\".\": der Punkt ist das Trenn Vers-Vers. \"Matthäus 1,5.7\" ist das Buch (Evangelium) von Matthäus, Kapitel 1, Vers 5 und Vers 7."
      },
      "li3":{
        "en":"\"-\": the dash or hyphen is the separator from - to, and can be used in a variety of ways:",
        "it":"\"-\": il trattino è il separatore da - a, che può essere utilizzato in vari modi:",
        "es":"\"-\": el guión es el separador desde - hasta, que puede ser utilizado en una variedad de maneras:",
        "fr":"\"-\": le trait d'union est le séparateur de - à, et il peut être utilisé dans une variété de façons:",
        "de":"\"-\": der Bindestrich ist das Trenn von - bis, und sie kann in einer Vielzahl von Weisen verwendet werden:"
      },
      "li4":{
        "en":" from chapter to chapter: \"Matthew 1-2\" means the gospel according to Matthew, from chapter 1 to chapter 2",
        "it":" da capitolo a capitolo: \"Matteo 1-2\" significa il vangelo secondo Matteo, dal capitolo 1 al capitolo 2",
        "es":" desde capítulo hasta capítulo: \"Mateo 1-2\" significa el evangelio según San Mateo, desde el capítulo 1 hasta el capítulo 2",
        "fr":" de chapitre à chapitre: \"Matthieu 1-2\" signifie l'evangile selon Saint Matthieu, du chapitre 1 au chapitre 2",
        "de":" von Kapitel bis Kapitel: \"Matthäus 1-2\" ist das Evangelium von Matthäus, von Kapitel 1 bis Kapitel 2"
      },
      "li5":{
        "en":" from chapter, verse to verse of the same chapter: \"Matthew 1:1-5\" means the gospel according to Matthew, chapter 1, verses 1 to 5",
        "it":" da capitolo, versetto fino a versetto dello stesso capitolo: \"Matteo 1,1-5\" significa il vangelo secondo Matteo, capitolo 1, dal versetto 1 al versetto 5",
        "es":" desde capítulo, versículo hasta versículo del mismo capítulo: \"Mateo 1,1-5\" significa el evangelio según San Mateo, desde el capítulo 1, versículo 1 hasta el versículo 5",
        "fr":" de chapitre, verset à verset du même chapitre: \"Matthieu 1,1-5\" signifie l'evangile selon Saint Matthieu, du chapitre 1, verset 1 au verset 5",
        "de":" von Kapitel, Vers bis Vers des gleichen Kapitels: \"Matthäus 1,1-5\" ist Das Evangelium nach Matthäus, Kapitel 1, Vers 1 bis Vers 5"
      },
      "li6":{
        "en":" from chapter, verse to chapter, verse: \"Matthew 1:5-2:13\" means the gospel according to Matthew, chapter 1, verse 5 to chapter 2, verse 13",
        "it":" da capitolo, versetto fino a capitolo, versetto: \"Matteo 1,5-2,13\" significa il vangelo secondo Matteo, capitolo 1, versetto 5 fino al capitolo 2, versetto 13",
        "es":" desde capítulo, versículo hasta capítulo, versículo: \"Mateo 1,5-2,13\" significa el evangelio según San Mateo, desde el capítulo 1, versículo 5, hasta el capítulo 2, versículo 13",
        "fr":" de chapitre, verset à chapitre, verset: \"Matthieu 1,5-2,13\" signifie l'evangile selon Saint Matthieu, du chapitre 1, verset 5, au chapitre 2, verset 13",
        "de":" von Kapitel, Vers bis Kapitel, Vers: \"Matthäus 1,5-2,13\" ist Das Evangelium nach Matthäus, Kapitel 1, Vers 5 bis Kapitel 2, Vers 13"
      },
      "p3":{
        "en":"Different combinations of these signs can be used to formulate more complex queries, for example \"Mt1:1-3,5,7-9\" means the gospel of Matthew, chapter 1 verses 1 to 3, verse 5, and verses 7 to 9. ",
        "it":"Si possono usare varie combinazioni di questi segni per formulare query più complesse, ad esempio \"Mt1,1-3.5.7-9\" significa il vangelo secondo Matteo, capitolo 1, versetti 1 a 3, versetto 5, e versetti 7 a 9. ",
        "es":"Las diferentes combinaciones de estos signos se pueden utilizar para formular consultas más complejas, por ejemplo \"Mt1,1-3.5.7-9\" significa el evangelio según San Mateo, capítulo 1, versículos del 1 al 3, versículo 5, y los versículos 7 a 9.",
        "fr":"Différentes combinaisons de ces signes peuvent être utilisés pour formuler des requêtes plus complexes, par exemple \"Mt1,1-3.5.7-9\" signifie l'évangile selon Saint Matthieu, chapitre 1 versets 1 à 3, verset 5, et les versets 7 à 9.",
        "de":"Verschiedene Kombinationen dieser Zeichen kann verwendet werden, um komplexere Abfragen zu formulieren, zum Beispiel \"Mt1,1-3.5.7-9\" ist die Matthäusevangelium, Kapitel 1 Vers 1 bis 3, Vers 5 und Verse 7 bis 9."
      },
      "p4":{
        "en":"Multiple requests can be made at once using the semicolon \";\" to concatenate the queries. If the query following the semicolon refers to the same book as the preceding query, then it is not necessary to indicate the book again. For example, \"Matthew 1:1;2,13\" means the gospel of Matthew chapter 1 verse 1, and chapter 2 verse 13. By combining all these signs, quite complex queries can be made spanning verses taken from various books throughout the bible: \"Genesis 1:3-5,7,9-11,13;2:4-9,11-13;Revelation 3:10,12-14\".",
        "it":"Si possono anche effettuare richieste multiple in una volta utilizzando il punto-virgola \";\" per concatenare le query. Se la query che segue il punto-virgola si riferisce allo stesso libro della query precedente, allora non è necessario indicare nuovamente il libro. Per esempio, \"Matteo 1,1;2,13\" significa il vangelo secondo Matteo capitolo 1 versetto 1, e capitolo 2 versetto 13. Combinando tutti questi segni si possono effettuare query molto complesse che prendono versetti da vari libri: \"Genesi 1,3-5.7.9-11.13;2,4-9.11-13;Apocalisse 3,10.12-14\".",
        "es":"Múltiples consultas se pueden hacer a la vez utilizando un punto y coma \";\" para concatenar las consultas. Si la consulta que sigue el punto y coma se rifiere a el mismo libro de la consulta anterior, entonces no es necesario indicar nuevamente el libro. Por ejemplo, \"Mateo 1,1;2,13\" significa el evangelio según San Mateo capítulo 1 versículo 1 y capítulo 2 versículo 13. Combinando todos estos signos, se pueden hacer consultas mucho más complejas que toman versículos de diferentes libros: \"Génesis 1,3-5.7.9-11.13;2,4-9.11-13;Apocalipsis 3,10.12-14\".",
        "fr":"Plusieurs requêtes peuvent être faites à la fois par un point-virgule \";\" pour concaténer requêtes. Si la requête qui suit le point-virgule est rifiere au même livre de la requête précédente, alors il ne est pas nécessaire d'indiquer de nouveau le livre. Par exemple, \"Matthieu 1,1;2,13\" signifie l'Evangile de Matthieu chapitre 1 verset 1 et le chapitre 2 verset 13. En combinant tous ces signes, vous pouvez faire des requêtes très complexes qui prennent versets de différents livres: \"Genèse 1,3-5.7.9-11.13;2,4-9.11-13;Apocalypse 3,10.12-14\".",
        "de":"Mehrere Anfragen können sowohl durch ein Semikolon gemacht werden \";\" Abfragen verketten. Wird der Antrag nach dem Semikolon ist das gleiche Buch der vorherigen Abfrage rifiere, dann ist es nicht notwendig, das Buch wieder anzuzeigen. Zum Beispiel: \"Matthäus 1,1;2,13\" ist das Evangelium des Matthäus Kapitel 1 Vers 1 und Kapitel 2, Vers 13. Die Kombination all dieser Zeichen können Sie sehr komplexe Abfragen, die verschiedene Verse nehmen machen Bücher: \"1Mose 1,3-5.7.9-11.13;2,4-9.11-13;Offenbarung 3,10.12-14\"."
      },
      "p5":{
        "en":"It doesn't matter if the queries have spaces, this has no effect on the final result. Just as the usage of uppercase or lowercase makes no difference. \"Genesis 1:1\", \"Gen1:1\", \"genesis1:1\", and \"gEn 1:1\" for example will all work with the same result.",
        "it":"È indifferente se viene utilizzato qualche spazio all'interno delle query, non ha effetto sul risultato finale. Così come l'utilizzo del maiuscolo o del minuscolo è indifferente. \"Genesi 1,1\", \"Gen1,1\", \"genesi1,1\", e \"gEn 1,1\" per esempio funzioneranno tutte con lo stesso risultato.",
        "es":"No importa si las consultas tienen espacios, esto no tiene ningún efecto en el resultado final. Así como el uso de mayúsculas o minúsculas no hace ninguna diferencia. \"Génesis 1,1\", \"Gen1,1\", \"génesis1,1\" y \"gEn 1,1\", por ejemplo, van a funcionar con el mismo resultado.",
        "fr":"Il n'a pas d'importance si les requêtes ont des espaces, cela n'a aucun effet sur le résultat final. De même que l'utilisation de majuscules ou minuscules ne fait aucune différence. \"Genèse 1,1\", \"Gen1,1\", \"genesis1,1\" et \"gEn1,1\" par exemple auront tous le même résultat.",
        "de":"Es spielt keine Rolle, wenn die Anfragen haben Leerzeichen, hat dies keine Auswirkung auf das Endergebnis. Genau wie die Verwendung von Groß- oder Kleinschreibung spielt keine Rolle. \"Genesis 1,1\", \"Gen1,1\", \"genesis1,1\" und \"gEn 1:1\" beispielsweise sie werden alle das gleichen Ergebnis haben."
      },
      "p6":{
        "en":"If you find an error in the usage of the extension &#8220;BibleGet I/O&#8221;, or if you have any suggestions to make it work better, you can send a message using the &#8220;Send Feedback&#8221; option in the add-on menu.",
        "it":"Se trovi qualche errore di funzionamento nell'estensione &#8220;BibleGet I/O&#8221;, oppure se hai suggerimenti per farla funzionare meglio, puoi inviare un messaggio utilizzando l'opzione &#8220;Invia Feedback&#8221; nel menu dell'estensione.",
        "es":"Si observa cualquier error de operación en la extensión &#8220;BibleGet I/O&#8221;, o si tiene alguna sugerencia para hacer que funcione mejor, puede enviar un mensaje usando la opcion &#8220;Enviar comentarios&#8221; en el menú de la extensión.",
        "fr":"Si vous trouvez une erreur d'opération dans l'extension &#8220;BibleGet I/O&#8221;, ou si vous avez des suggestions pour le faire fonctionner mieux, vous pouvez envoyer un message en utilisant l'option &#8220;Envoyer des commentaires&#8221; dans le menu de l'extension.",
        "de":"Wenn Sie einen Fehler in der Operation zum Erweiterung &#8220;BibleGet I/O&#8221; zu finden, oder wenn Sie Vorschläge haben, um es besser zu arbeiten, können Sie eine Nachricht über das Option &#8220;Feedback senden&#8221; in der Menü zu Erweiterung."
      },
      "Formare una query":{
        "en":"Formulate a query",
        "it":"Formulare una query",
        "es":"Formular una consulta",
        "fr":"Formuler une requête",
        "de":"Formulieren Anfrage"
      },
      "Libri / Abbreviazioni":{
        "en":"Books / Abbreviations",
        "it":"Libri / Abbreviazioni",
        "es":"Libros / Abreviaturas",
        "fr":"Livres / Abréviations",
        "de":"Bücher / Abkürzungen"
      },
      "LIBRO":{
        "en":"BOOK",
        "it":"LIBRO",
        "es":"LIBRO",
        "fr":"LIVRE",
        "de":"BUCH"
      },
      "ABBREVIAZIONE":{
        "en":"ABBREVIATION",
        "it":"ABBREVIAZIONE",
        "es":"ABREVIATURA",
        "fr":"ABRÉVIATION",
        "de":"ABKÜRZUNG"
      },
      "Full Name":{
        "en":"Full Title",
        "it":"Titolo Completo",
        "es":"Título Completo",
        "fr":"Titre Complet",
        "de":"Vollständige Titel"
      },
      "Year":{
        "en":"Year",
        "it":"Anno",
        "es":"Año",
        "fr":"Année",
        "de":"Erscheinungsjahr"
      },
      "UPDATE DATA FROM BIBLEGET SERVER":{
        "en":"UPDATE DATA FROM BIBLEGET SERVER",
        "it":"AGGIORNA I DATI DAL SERVER DI BIBLEGET",
        "es":"ACTUALIZAR LOS HECHOS DESDE EL SERVIDOR DE BIBLEGET",
        "fr":"MISE A JOUR DES DONNÉES À PARTIR DU SERVEUR DE BIBLEGET",
        "de":"AKTUALISIEREN DER DATEN VON DER SERVER VON BIBLEGET"
      },
      "p7A":{
        "en":"The names of the books of the Bible are currently recognized in",
        "it":"I nomi dei libri della Bibbia vengono attualmente riconosciuti in",
        "es":"Los nombres de los libros de la Biblia son reconocidos actualmente en",
        "fr":"Les noms des livres de la Bible sont actuellement reconnus dans",
        "de":"Die Namen der Bücher der Bibel sind zur Zeit in"
      },
      "p7B":{
        "en":"different languages. Currently supported languages are:",
        "it":"lingue diverse. Le lingue attualmente supportate sono:",
        "es":"idiomas diferentes. Actualmente los idiomas soportados son:",
        "fr":"langues diverses. Les langues actuellement supportées sont:",
        "de":"verschiedenen Sprachen anerkannt. Derzeit unterstützte Sprachen sind:"
      },
      "p8":{
        "en":"versions of the Bible are currently supported:",
        "it":"versioni della Bibbia sono attualmente supportate:",
        "es":"versiones de la Biblia están soportadas actualmente:",
        "fr":"versions de la Bible sont actuellement supportées:",
        "de":"versionen der Bibel werden derzeit unterstützt:"
      },
      "Currently in development":{
        "en":"Currently in development",
        "it":"Attualmente in via di sviluppo",
        "es":"Actualmente en desarrollo",
        "fr":"Actuellement en développement",
        "de":"In Entwicklung"
      },
      "Some Bible versions have their own formatting. This is left by default to keep the text as close as possible to the original. If however you need to have consistent formatting in your document, you may override the Bible version's own formatting.":{
        "en":"Some Bible versions have their own formatting. This is left by default to keep the text as close as possible to the original. If however you need to have consistent formatting in your document, you may override the Bible version's own formatting.",
        "it":"Alcune versioni bibliche hanno formattazione propria. Questa viene lasciata per impostazione predefinita per mantenere il testo il più vicino possibile all'originale. Se tuttavia hai bisogno di mantenere una formattazione coerente con il resto del documento, puoi spuntare qui per ignorare la formattazione propria del testo biblico.",
        "es":"Algunas versiones de la Biblia tienen su propio formato. Esto está permitido de forma predeterminada para mantener el texto lo más cerca posible al original. Sin embargo, si usted necesita para mantener el formateo consistente con el resto del documento, puede marcar aquí para ignorar el formato propio del texto bíblico.",
        "fr":"Certaines versions de la Bible ont leur propre format. Cette option est activée par défaut pour conserver le texte aussi proche que possible de l'original. Cependant, si vous avez besoin de garder la mise en forme cohérente avec le reste du document, vous pouvez marquer ici pour ignorer le format du texte biblique.",
        "de":"Einige Versionen der Bibel haben ihre eigenen Format. Diese Option ist standardmäßig aktiviert, um den Text so nahe wie möglich am Original zu halten. Allerdings, wenn Sie die Formatierung im Einklang mit dem Rest des Dokuments zu halten brauchen, Sie sich hier zu markieren kann, um der Bibelversion eigenen Formatierung ignorieren."
      },
      "Override Bible version formatting":{
        "en":"Override Bible version formatting",
        "it":"Ignorare la formattazione della versione biblica",
        "es":"Ignorar el formato de la versión bíblica",
        "fr":"Ignorer la mise en forme de la version biblique",
        "de":"Ignorieren Sie die Formatierung der biblischen Version"
      }
    },
    errormessages = {
      "Ci deve essere una valida indicazione di libro all'inizio della query.":{
        "en":"There must be a valid book indicator at the start of the query.",
        "it":"Ci deve essere una valida indicazione di libro all'inizio della query.",
        "es":"Tiene que haber una indicación válida del libro en el inicio de la consulta.",
        "fr":"Il doit y avoir une indication valable de la livre au début de la requête.",
        "de":"Es muss eine gültige Anzeige des Buches zu Beginn der Abfrage sein."
      },
      "Ogni indicazione di libro deve essere seguita da una valida indicazione di capitolo.":{
        "en":"Every book indicator must be followed by a valid chapter indicator.",
        "it":"Ogni indicatore di libro deve essere seguito da un valido indicatore di capitolo.",
        "es":"Cada indicador de libro debe ser seguido por un indicador del capítulo válido.",
        "fr":"Chaque indicateur de livre doit être suivi par un indicateur de chapitre valide.",
        "de":"Jedes Buch-Indikator muss durch eine gültige Kapitel-Indikator folgen."
      },
      "The query does not have a valid book or book abbreviation: ":{
        "en":"The query does not have a valid book or book abbreviation: ",
        "it":"La richiesta non contiene un libro valido oppure una valida abbreviazione di libro.",
        "es":"La consulta no contiene un libro válido o una abreviatura de libro válida.",
        "fr":"La requête ne contient pas un livre ou une abréviation de livre valide.",
        "de":"Die Abfrage enthält keine gültige Buch oder eine gültige Abkürzung Buch enthalten."
      },
      "A query that doesn't start with a book indicator must however start with a valid chapter indicator!":{
        "en":"A query that doesn't start with a book indicator must however start with a valid chapter indicator!",
        "it":"Una richiesta che non inizia con un indicatore di libro deve però iniziare con un indicatore di capitolo valido!",
        "es":"Sin embargo, una consulta que no se inicia con un indicador de libro debe comenzar con un indicador de capítulo válido!",
        "fr":"Une requête qui ne commence pas par un indicateur du livre doit cependant commencer avec un indicateur de chapitre valide!",
        "de":"Eine Abfrage, die nicht mit einem Buch-Anzeige wird anfangen müssen jedoch mit einer gültigen Kapitel Anzeige beginnen!"
      },
      "Non puoi utilizzare un punto senza prima utilizzare una virgola.":{
        "en":"You cannot use a period if you haven't first used a comma.",
        "it":"Non puoi utilizzare un punto senza prima utilizzare una virgola.",
        "es":"No se puede utilizar un punto, si no se ha utilizado primeramente una coma.",
        "fr":"Vous ne pouvez pas utiliser un point, si vous ne avez pas utilisé d'abord une virgule.",
        "de":"Sie können nicht einen Punkt, wenn Sie nicht zuerst ein Komma verwendet haben."
      },
      "Non si possono avere più virgole che punti.":{
        "en":"You cannot have more commas than you have periods.",
        "it":"Non si possono avere più virgole che punti.",
        "es":"No se puede tener más comas que puntos.",
        "fr":"Vous ne pouvez pas avoir plus de virgules que vous avez des points.",
        "de":"Sie können nicht mehr Kommas haben als Sie Punkten haben."
      },
      "Ogni punto deve essere preceduto e seguito da un numero composto da una a tre cifre di cui la prima cifra non può essere 0.":{
        "en":"Every period must be preceded and followed by a number having from one to three digits of which the first digit cannot be 0.",
        "it":"Ogni punto deve essere preceduto e seguito da un numero composto da una a tre cifre di cui la prima cifra non può essere 0.",
        "es":"Cada punto debe estar precedido y seguido de un número que tiene de uno a tres dígitos de los cuales el primer dígito no puede ser 0.",
        "fr":"Chaque point doit être précédée et suivie d'un nombre ayant une à trois chiffres dont le premier chiffre ne peut pas être 0.",
        "de":"Jede Punkt ist durch eine Zahl mit einer bis drei Stellen, von denen die erste Ziffer nicht 0 sein kann vorausgehen und folgen."
      },
      "Ogni virgola deve essere preceduta e seguita da un numero composto da una a tre cifre, di cui la prima cifra non può essere 0.":{
        "en":"Every comma must be preceded and followed by a number having from one to three digits of which the first digit cannot be 0.",
        "it":"Ogni virgola deve essere preceduta e seguita da un numero composto da una a tre cifre di cui la prima cifra non può essere 0.",
        "es":"Cada coma debe estar precedida y seguida de un número que tiene de uno a tres dígitos de los cuales el primer dígito no puede ser 0.",
        "fr":"Chaque virgule doit être précédée et suivie d'un nombre ayant une à trois chiffres dont le premier chiffre ne peut pas être 0.",
        "de":"Jede Komma ist durch eine Zahl mit einer bis drei Stellen, von denen die erste Ziffer nicht 0 sein kann vorausgehen und folgen."
      },
      "Non ci possono essere più trattini nella query se non ci sono almeno altrettanto punti meno uno.":{
        "en":"You cannot have more than one dash in the query if there are not at least as many commas minus one.",
        "it":"Non puoi avere più di un trattino nella query se non ci sono almeno altrettanto punti meno uno.",
        "es":"No se puede tener más de un guión en la consulta si no hay al menos tantos puntos menos uno.",
        "fr":"Vous ne pouvez pas avoir plus d'un trait d'union dans la requête, si il n'y a pas au moins autant de points moins un.",
        "de":"Sie können nicht mehr als ein Bindestrich in der Abfrage, wenn es nicht mindestens so viele Punkten minus eins."
      },
      "Ogni trattino deve essere preceduto e seguito da un numero composto da una a tre cifre, di cui la prima cifra non può essere 0.":{
        "en":"Every dash must be preceded and followed by a number having from one to three digits of which the first digit cannot be 0.",
        "it":"Ogni trattino deve essere preceduto e seguito da un numero composto da una a tre cifre di cui la prima cifra non può essere 0.",
        "es":"Cada guión debe estar precedido y seguido de un número que tiene de uno a tres dígitos de los cuales el primer dígito no puede ser 0.",
        "fr":"Chaque trait d'unione doit être précédé et suivi d'un nombre ayant une à trois chiffres dont le premier chiffre ne peut pas être 0.",
        "de":"Jede Bindestrich ist durch eine Zahl mit einer bis drei Stellen, von denen die erste Ziffer nicht 0 sein kann vorausgehen und folgen."
      },
      "Se un trattino è seguito da un costrutto con virgola, allora deve anche essere preceduto da un costrutto con virgola.":{
        "en":"If a dash is followed by a comma construct, then it must also be preceded by a comma construct.",
        "it":"Se un trattino è seguito da un costrutto con virgola, allora deve anche essere preceduto da un costrutto con virgola.",
        "es":"Si un guión es seguido por una construcción de coma, entonces debe también estar precedido por una construcción de coma.",
        "fr":"Si un trait d'union est suivi par une construction de virgule, il doit également être précédée d'une construction d'virgule.",
        "de":"Wenn ein Bindestrich durch ein Komma Konstrukt gefolgt, dann muss es auch durch ein Komma Konstrukt vorangestellt werden."
      },
      "A chapter in the query is out of bounds: there is no chapter <{0}> in <{1}> in the requested version <{2}>, the last possible chapter is {3}":{
        "en":"A chapter in the query is out of bounds: there is no chapter <{0}> in <{1}> in the requested version <{2}>, the last possible chapter is {3}",
        "it":"Un capitolo nella query non è valido: non c'è un capitolo <{0}> in <{1}> nella versione richiesta <{2}>, l'ultimo capitolo possibile è {3}",
        "es":"Un capítulo en la consulta no es válido: no hay un capítulo <{0}> en <{1}> en la versión solicitada <{2}>, el último capítulo posible es {3}",
        "fr":"Un chapitre dans la requête n'est pas valide: il n'ya pas un chapitre <{0}> dans <{1}> dans la version sollicité <{2}>, le dernier chapitre possible est {3}",
        "de":"Ein Kapitel in der Abfrage ist ungültig: Es gibt nein Kapitel <{0}> in <{1}> zum der Version angefordert <{2}>, das letzte Kapitel die ist möglich, ist {3}"
      },
      "You cannot have more than one colon and not have a dash!":{
        "en":"You cannot have more than one colon and not have a dash!",
        "it":"Non puoi avere più di una virgola e non avere un trattino!",
        "es":"No se puede tener más de una coma y no tener un guión!",
        "fr":"Vous ne pouvez pas avoir plus d'une virgule et ne pas avoir un trait d'union!",
        "de":"Sie können nicht mehr als ein Komma und keinen Bindestrich!"
      },
      "You seem to have a malformed querystring, there should be only one dash.":{
        "en":"You seem to have a malformed querystring, there should be only one dash.",
        "it":"La stringa della query sembra essere malformata, ci dovrebbe essere soltanto un trattino.",
        "es":"La consulta parece estar mal formada, sólo debe haber un guión.",
        "fr":"La requête semble être malformé, il devrait y avoir seulement un trait d'union.",
        "de":"Die Query-String erscheint ungültiger werden, es sollte nur ein Strich sein."
      },
      "A verse in the query is out of bounds: there is no verse <{0}> in <{1}> chapter <{2}> in the requested version <{3}>, the last possible verse is {4}":{
        "en":"A verse in the query is out of bounds: there is no verse <{0}> in <{1}> chapter <{2}> in the requested version <{3}>, the last possible verse is {4}",
        "it":"Un versetto della query non è valido: non c'è un versetto <{0}> in <{1}> capitolo <{2}> nella versione richiesta <{3}>, l'ultimo possibile versetto è {4}",
        "es":"Un versículo de la consulta no es válido: no hay un versículo <{0}> en <{1}> capítulo <{2}> en la versión solicitada <{3}>, el último versículo que es posible es {4}",
        "fr":"Un verset de la requête ne est pas valide: il n'ya pas un verset <{0}> dans <{1}> chapitre <{2}> dans la Version sollicité <{3}>, le dernier verset qui est possible est {4}",
        "de":"Ein Vers der Abfrage ist ungültig: Es gibt nein Vers <{0}> in <{1}> Kapitel <{2}> zum der Version angefordert <{3}>, die letzte Strophe die ist möglich, ist <{4}>"
      },
      "i valori concatenati dal punto devono essere consecutivi, invece {0} >= {1} nell'espressione <{2}>":{
        "en":"the values chained by the dot must be consecutive, instead {0} >= {1} in the expression <{2}>",
        "it":"i valori concatenati dal punto devono essere consecutivi, invece {0} >= {1} nell'espressione <{2}>",
        "es":"los valores encadenados por el punto deben ser consecutivos, mientras {0} >= {1} en la expresión <{2}>",
        "fr":"les valeurs enchaînés par le point doivent être consécutives, tandis que {0}> = {1} dans l'expression <{2}>",
        "de":"die Werte durch die Punkt-Strich müssen fortlaufend sein, anstatt {0} >= {1} in dem Ausdruck <{2}>"        
      }
    },
    langcodes={
      "af":"Afrikaans",
      "ak":"Akan",
      "sq":"Albanian",
      "am":"Amharic",
      "ar":"Arabic",
      "hy":"Armenian",
      "az":"Azerbaijani",
      "eu":"Basque",
      "be":"Belarusian",
      "bn":"Bengali",
      "bh":"Bihari",
      "bs":"Bosnian",
      "br":"Breton",
      "bg":"Bulgarian",
      "km":"Cambodian",
      "ca":"Catalan",
      "ny":"Chichewa",
      "zh":"Chinese",
      "co":"Corsican",
      "hr":"Croatian",
      "cs":"Czech",
      "da":"Danish",
      "nl":"Dutch",
      "en":"English",
      "eo":"Esperanto",
      "et":"Estonian",
      "fo":"Faroese",
      "tl":"Filipino",
      "fi":"Finnish",
      "fr":"French",
      "fy":"Frisian",
      "gl":"Galician",
      "ka":"Georgian",
      "de":"German",
      "el":"Greek",
      "gn":"Guarani",
      "gu":"Gujarati",
      "ht":"Haitian Creole",
      "ha":"Hausa",
      "iw":"Hebrew",
      "hi":"Hindi",
      "hu":"Hungarian",
      "is":"Icelandic",
      "ig":"Igbo",
      "id":"Indonesian",
      "ia":"Interlingua",
      "ga":"Irish",
      "it":"Italian",
      "ja":"Japanese",
      "jw":"Javanese",
      "kn":"Kannada",
      "kk":"Kazakh",
      "rw":"Kinyarwanda",
      "rn":"Kirundi",
      "kg":"Kongo",
      "ko":"Korean",
      "ku":"Kurdish",
      "ky":"Kyrgyz",
      "lo":"Laothian",
      "la":"Latin",
      "lv":"Latvian",
      "ln":"Lingala",
      "lt":"Lithuanian",
      "lg":"Luganda",
      "mk":"Macedonian",
      "mg":"Malagasy",
      "ms":"Malay",
      "ml":"Malayalam",
      "mt":"Maltese",
      "mi":"Maori",
      "mr":"Marathi",
      "mo":"Moldavian",
      "mn":"Mongolian",
      "ne":"Nepali",
      "no":"Norwegian",
      "oc":"Occitan",
      "or":"Oriya",
      "om":"Oromo",
      "ps":"Pashto",
      "fa":"Persian",
      "pl":"Polish",
      "pt":"Portuguese",
      "pa":"Punjabi",
      "qu":"Quechua",
      "ro":"Romanian",
      "rm":"Romansh",
      "ru":"Russian",
      "gd":"Scots Gaelic",
      "sr":"Serbian",
      "sh":"Serbo-Croatian",
      "st":"Sesotho",
      "tn":"Setswana",
      "sn":"Shona",
      "sd":"Sindhi",
      "si":"Sinhalese",
      "sk":"Slovak",
      "sl":"Slovenian",
      "so":"Somali",
      "es":"Spanish",
      "su":"Sundanese",
      "sw":"Swahili",
      "sv":"Swedish",
      "tg":"Tajik",
      "ta":"Tamil",
      "tt":"Tatar",
      "te":"Telugu",
      "th":"Thai",
      "ti":"Tigrinya",
      "to":"Tonga",
      "tr":"Turkish",
      "tk":"Turkmen",
      "tw":"Twi",
      "ug":"Uighur",
      "uk":"Ukrainian",
      "ur":"Urdu",
      "uz":"Uzbek",
      "vi":"Vietnamese",
      "cy":"Welsh",
      "wo":"Wolof",
      "xh":"Xhosa",
      "yi":"Yiddish",
      "yo":"Yoruba",
      "zu":"Zulu"
    },
    worldlanguages = {
		"Afrikaans":{
				"en":"Afrikaans",
				"it":"Afrikaans",
				"es":"Afrikáans",
				"fr":"Afrikaans",
				"de":"Afrikaans" 
		},
		"Albanian":{
				"en":"Albanian",
				"it":"Albanese",
				"es":"Albanés",
				"fr":"Albanais",
				"de":"Albanisch" 
		},
		"Arabic":{
				"en":"Arabic",
				"it":"Arabo",
				"es":"Árabe",
				"fr":"Arabe",
				"de":"Arabisch" 
		},
		"Chinese":{
				"en":"Chinese",
				"it":"Cinese",
				"es":"Chino",
				"fr":"Chinois",
				"de":"Chinesische" 
		},
		"Croatian":{
				"en":"Croatian",
				"it":"Croato",
				"es":"Croata",
				"fr":"Croate",
				"de":"Kroatisch" 
		},
		"Czech":{
				"en":"Czech",
				"it":"Ceco",
				"es":"Checo",
				"fr":"Tchèque",
				"de":"Tschechisch" 
		},
		"English":{
				"en":"English",
				"it":"Inglese",
				"es":"Inglés",
				"fr":"Anglais",
				"de":"Englisch" 
		},
		"French":{
				"en":"French",
				"it":"Francese",
				"es":"Francés",
				"fr":"Français",
				"de":"Französisch" 
		},
		"German":{
				"en":"German",
				"it":"Tedesco",
				"es":"Alemán",
				"fr":"Allemand",
				"de":"Deutsch" 
		},
		"Greek":{
				"en":"Greek",
				"it":"Greco",
				"es":"Griego",
				"fr":"Grec",
				"de":"Griechisch" 
		},
		"Hungarian":{
				"en":"Hungarian",
				"it":"Ungherese",
				"es":"Húngaro",
				"fr":"Hongrois",
				"de":"Ungarisch" 
		},
		"Italian":{
				"en":"Italian",
				"it":"Italiano",
				"es":"Italiano",
				"fr":"Italien",
				"de":"Italienisch" 
		},
		"Japanese":{
				"en":"Japanese",
				"it":"Giapponese",
				"es":"Japonés",
				"fr":"Japonais",
				"de":"Japanisch" 
		},
		"Korean":{
				"en":"Korean",
				"it":"Coreano",
				"es":"Coreano",
				"fr":"Coréen",
				"de":"Koreanisch" 
		},
		"Latin":{
				"en":"Latin",
				"it":"Latino",
				"es":"Latín",
				"fr":"Latin",
				"de":"Lateinisch" 
		},
		"Polish":{
				"en":"Polish",
				"it":"Polacco",
				"es":"Polaco",
				"fr":"Polonais",
				"de":"Russisch" 
		},
		"Portuguese":{
				"en":"Portuguese",
				"it":"Portoghese",
				"es":"Portugués",
				"fr":"Portugais",
				"de":"Portugiesisch" 
		},
		"Romanian":{
				"en":"Romanian",
				"it":"Rumeno",
				"es":"Rumano",
				"fr":"Roumain",
				"de":"Rumänischen" 
		},
		"Russian":{
				"en":"Russian",
				"it":"Russo",
				"es":"Ruso",
				"fr":"Russe",
				"de":"Russisch" 
		},
		"Spanish":{
				"en":"Spanish",
				"it":"Spagnolo",
				"es":"Español",
				"fr":"Espagnol",
				"de":"Spanisch" 
		},
		"Tagalog":{
				"en":"Tagalog",
				"it":"Tagalog",
				"es":"Tagalo",
				"fr":"Tagalog",
				"de":"Tagalog" 
		},
		"Tamil":{
				"en":"Tamil",
				"it":"Tamil",
				"es":"Tamil",
				"fr":"Tamoul",
				"de":"Tamilisch" 
		},
		"Thai":{
				"en":"Thai",
				"it":"Thai",
				"es":"Thai",
				"fr":"Thaï",
				"de":"Thailändisch" 
		},
		"Vietnamese":{
				"en":"Vietnamese",
				"it":"Vietnamita",
				"es":"Vietnamita",
				"fr":"Vietnamien",
				"de":"Vietnamesisch" 
		}
};
