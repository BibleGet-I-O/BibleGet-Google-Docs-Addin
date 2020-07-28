var include = filename => HtmlService.createHtmlOutputFromFile(filename).getContent();

var __ = function(str,ling){
      if(translatables.hasOwnProperty(str)){
        if(translatables[str].hasOwnProperty(ling) && translatables[str][ling] != ""){
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
        if(errormessages[str].hasOwnProperty(ling) && errormessages[str][ling] != ""){
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
      //TEMPLATE: "":{"en":"","it":"","es":"","fr":"","de":"", "pt":""},
      "Start":{"en":"Start","it":"Avvia","es":"Inicia","fr":"Lance","de":"Starten","pt":"Inicia"},
      "Instructions":{"en":"Instructions","it":"Istruzioni","es":"Instrucciones","fr":"Instructions","de":"Anleitung","pt":"Instruções"},
      "Settings":{"en":"Settings","it":"Preferenze","es":"Ajustes","fr":"Paramètres","de":"Einstellungen","pt":"Definições"},
      "Send Feedback":{"en":"Send Feedback","it":"Invia Feedback","es":"Enviar Comentarios","fr":"Envoyer des Commentaires","de":"Feedback Schicken","pt":"Envia comentários"},
      "Contribute":{"en":"Contribute","it":"Contribuisci","es":"Contribuir","fr":"Contribuer","de":"Beitragen","pt":"Contribuir"},
      "Support BibleGet I/O":{
        "en":"Support the BibleGet I/O Project",
        "it":"Sostieni il Progetto BibleGet I/O",
        "es":"Apoya el Proyecto BibleGet I/O",
        "fr":"Soutenir le Projet BibleGet I/O",
        "de":"Unterstützt das Projekt BibleGet I/O",
        "pt":"Apoie o Projeto BibleGet I/O"},
      "Cannot insert text at this document location.":{
        "en":"Cannot insert text at this document location.",
        "it":"Non è possibile inserire testo in questa posizione nel documento.",
        "es":"No es posible insertar el texto en esa posición en el documento.",
        "fr":"Il n'est pas possible d'insérer du texte à cet emplacement dans le document.",
        "de":"Es ist nicht möglich, Text an dieser Stelle in das Dokument einzufügen.",
        "pt":"Não é possível inserir texto nesta posição no documento."},
      "Get bible quotes":{
        "en":"Get bible quotes",
        "it":"Ricerca citazioni bibliche",
        "es":"Busca citas biblicas",
        "fr":"Obtenir citations bibliques",
        "de":"Erhalten Bibelzitate",
        "pt":"Pesquise citações bíblicas"},
      "Please grant permissions":{
        "en":"Please grant permissions so that the BibleGet addon can communicate with the BibleGet server",
        "it":"Devi autorizzare l'estensione di BibleGet a comunicare con il server di BibleGet",
        "es":"Es necesario autorizar la extensión BibleGet para comunicarse con el servidor BibleGet",
        "fr":"Vous devez autoriser l'extension BibleGet à communiquer avec le serveur BibleGet",
        "de":"Sie müssen die BibleGet-Erweiterung autorisieren, um mit dem BibleGet-Server zu kommunizieren",
        "pt":"Você deve autorizar a extensão BibleGet para se comunicar com o servidor BibleGet"},
      "Formatting":{"en":"Formatting","it":"Formattazione","es":"Formato","fr":"Formatage","de":"Formatierung","pt":"Formatação"},
      "Set Font from current selected text":{ //TODO: not used, can remove
        "en":"Set Font from current selected text",
        "it":"Imposta Carattere dal testo selezionato",
        "es":"Configura fuente desde el texto seleccionado",
        "fr":"Définir la police à partir du texte sélectionné",
        "de":"Stellen Sie die Schriftart aus dem ausgewählten Text ein",
        "pt":""},
      "Font for Bible Quotes":{
        "en":"Font for Bible Quotes",
        "it":"Carattere per le Citazioni Bibliche",
        "es":"Fuente para las Citas bíblicas",
        "fr":"Police des Citations bibliques",
        "de":"Schriftart für Bibel Zitate",
        "pt":"Fonte para Citações Bíblicas"},
      "Versions available:":{"en":"Versions available:","it":"Versioni disponibili:","es":"Versiones disponibles:","fr":"Versions disponibles:","de":"Versionen verfügbare:","pt":"Versões disponíveis"},
      "Versions selected:":{"en":"Versions selected:","it":"Versioni selezionate:","es":"Versiones seleccionadas:","fr":"Versions sélectionnées:","de":"Ausgewählten Versionen:","pt":"Versões selecionadas"},
      "Insert query":{"en":"Insert query","it":"Inserisci richiesta","es":"Inserta consulta","fr":"Insérer requête","de":"Legen Sie die Abfrage","pt":"Inserir consulta"},
      "e.g. Matthew 1:1-10,13-15":{
        "en":"e.g. Matthew 1:1-10,13-15",
        "it":"es. Matteo 1,1-10.13-15",
        "es":"ej. Mateo 1,1-10.13-15",
        "fr":"ex. Mathieu 1,1-10.13-15",
        "de":"z.B. Matthäus 1,1-10.13-15",
        "pt":"ex. Mateus 1,1-10.13-15"},
      "e.g. Creation":{"en":"e.g. Creation","it":"es. Creazione","es":"ej. Creación","fr":"ex. Création","de":"z.B. Erschaffung","pt":"ex. Criação"},
      "Search":{"en":"Search","it":"Cerca","es":"Busca","fr":"Recherche","de":"Suchen","pt":"Encontre"},
      "Get verses":{"en":"Get","it":"Richiedi","es":"Solicita","fr":"Demande","de":"Bitte","pt":"Peça"}, //Obtenha ?
      "There are Errors":{"en":"There are errors","it":"Ci sono degli errori","es":"Hay algunos errores","fr":"Il y a des erreurs","de":"Es gibt fehler","pt":"Existem alguns erros"},
      "Result":{"en":"Result","it":"Risultato","es":"Resultado","fr":"Résultat","de":"Ergebnis","pt":""}, //NOT USED?
      "Paragraph Styles":{"en":"Paragraph Styles","it":"Stili Paragrafo","es":"Estilos de Párrafo","fr":"Styles de Paragraphe","de":"Absatzstile","pt":"Estilos de Parágrafo"},
      "Lineheight":{"en":"Linespacing","it":"Interlinea","es":"Interlínea","fr":"Interligne","de":"Zeilenabstand","pt":"Altura da linha"},
      "Left Indent":{"en":"Left Indent","it":"Rientro Sinistro","es":"Sangría Izquierda","fr":"Retrait gauche","de":"Linker Einzug","pt":"Recuo Esquerda"},
      "Left Indent increase":{"en":"Left Indent increase","it":"aumenta Rientro Sinistro","es":"aumentar Sangría Izquierda","fr":"augmente Retrait gauche","de":"Linker Einzug erhöhen","pt":"aumenta Recuo Esquerda"},
      "Left Indent decrease":{"en":"Left Indent decrease","it":"diminuisci Rientro Sinistro","es":"reducir Sangría Izquierda","fr":"diminuer Retrait gauche","de":"Linker Einzug verringern","pt":"desminuir Recuo Esquerda"},
      "Right Indent":{"en":"Right Indent","it":"Rientro Destro","es":"Sangría Derecha","fr":"Retrait droit","de":"Richtiger Einzug","pt":"Recuo Direita"},
      "Right Indent increase":{"en":"Right Indent increase","it":"aumenta Rientro Destro","es":"aumentar Sangría Derecha","fr":"augmente retrait droit","de":"rechten Einzug erhöhen","pt":"aumenta Recuo Direita"},
      "Right Indent decrease":{"en":"Right Indent decrease","it":"diminuisci Rientro Destro","es":"reducir Sangría Derecha","fr":"diminuer retrait droit","de":"rechten Einzug verringern","pt":"desminuir Recuo Direita"},
      "Book / Chapter Format":{"en":"Book / Chapter Format","it":"Formato Libro / Capitolo","es":"Formato Libro / Capítulo","fr":"Format Livre / Chapitre","de":"Buchformat und Kapitel-Format","pt":"Formato Livro / Capítulo"},
      "Verse Number Format":{"en":"Verse Number Format","it":"Formato Numero del Versetto","es":"Formato Número de Versículo","fr":"Format Numéro du Verset","de":"Format der Vers Nummer","pt":"Formato Número de Versículo"},
      "Verse Text Format":{"en":"Verse Text Format","it":"Formato Testo del Versetto","es":"Formato Texto del Versículo","fr":"Format Texte du Verset","de":"Format der Verse Text","pt":"Formato Texto do Versículo"},
      "Text Formatting":{"en":"Text Formatting","it":"Formattazione del Testo","es":"Formato del Texto","fr":"Format du Texte","de":"Textformat","pt":"Formato do Texto"},
      "Preferred Layout":{"en":"Preferred Layout","it":"Disposizione Preferita","es":"Disposición Preferida","fr":"Mise en Page Préférée","de":"Bevorzugte Seitenlayout","pt":"Layout preferido"},
      "Bible version":{"en":"Bible version","it":"Versione biblica","es":"Versión de la biblia","fr":"Version biblique","de":"Bibelversion","pt":"Versão bíblica"},
      "Visibility":{"en":"Visibility","it":"Visibilità","es":"Visibilidad","fr":"Visibilité","de":"Sichtweite","pt":"Visibilidade"},
      "Show":{"en":"Show","it":"Mostra","es":"Muestra","fr":"Affiche","de":"Zeigen","pt":"Mostre"},
      "Hide":{"en":"Hide","it":"Nascondi","es":"Oculta","fr":"Cacher","de":"Verstecken","pt":"Esconda"},
      "Wrap":{"en":"Wrap","it":"Avvolgi","es":"Envoltorio","fr":"Enveloppe","de":"Wickeln","pt":"Embrulho"},
      "None":{"en":"None","it":"Niente","es":"Ninguno","fr":"Aucun","de":"Keine","pt":"Nenhuma"},
      "Parentheses":{"en":"Parentheses","it":"Parentesi","es":"Paréntesis","fr":"Parenthèses","de":"Klammern","pt":"Parênteses"},
      "Brackets":{"en":"Brackets","it":"Parentesi quadre","es":"Corchetes","fr":"Crochets","de":"eckige Klammern","pt":"Colchetes"},
      "Alignment":{"en":"Alignment","it":"Allineamento","es":"Alineación","fr":"Alignement","de":"Ausrichtung","pt":"Alinhamento"},
      "Left":{"en":"Left","it":"Sinistra","es":"Izquierda","fr":"Gauche","de":"Linksbündig","pt":"Esquerda"},
      "Center":{"en":"Center","it":"Centro","es":"Centro","fr":"Centre","de":"Zentriert","pt":"Centro"},
      "Right":{"en":"Right","it":"Destra","es":"Derecha","fr":"Droit","de":"Rechtsbündig","pt":"Direita"},
      "Justify":{"en":"Justify","it":"Giustificato","es":"Justificado","fr":"Justifié","de":"Begründeter","pt":"Justificado"},
      "Positioning":{"en":"Positioning","it":"Posizionamento","es":"Posicionamiento","fr":"Positionnement","de":"Positionierung","pt":"Posicionamiento"},
      "Top":{"en":"Top","it":"In alto","es":"Superior","fr":"Haut","de":"Oben","pt":"Cabeçalho"},
      "Bottom":{"en":"Bottom","it":"In basso","es":"Iferior","fr":"Bas","de":"Unten","pt":"Rodapé"},
      "Bottom Inline":{"en":"Bottom Inline","it":"In linea in basso","es":"Inferior en línea","fr":"Bas en ligne","de":"Unten inline","pt":"Rodapé na linha"},
      "Book and Chapter":{"en":"Book and Chapter","it":"Libro e capitolo","es":"Libro y capitulo","fr":"Livre et chapitre","de":"Buch und Kapitel","pt":"Livro e capítulo"},
      "Format":{"en":"Format","it":"Formato","es":"Presentación","fr":"Présentation","de":"Aufmachung","pt":"Apresentação"},
      "BIBLELANG":{"en":"Language of Bible version","it":"Lingua della versione biblica","es":"Idioma Versión de la biblia","fr":"Langue de la version biblique","de":"Sprache der Bibelversion","pt":"Idioma da versão da Bíblia"},
      "BIBLELANGABBREV":{"en":"Language of Bible version (abbrev)","it":"Lingua della versione biblica (abbrev)","es":"Idioma Versión de la biblia (abrev)","fr":"Langue de la version biblique (abrév)","de":"Sprache der Bibelversion (abkürz)","pt":"Idioma da versão da Bíblia (abrev)"},
      "USERLANG":{"en":"Language of Docs interface","it":"Lingua di Google Docs","es":"Idioma de Google Docs","fr":"Langue de Google Docs","de":"Sprache von Google Docs","pt":"Idioma do Google Docs"},
      "USERLANGABBREV":{"en":"Language of Docs interface (abbrev)","it":"Lingua di Google Docs (abbrev)","es":"Idioma de Google Docs (abrev)","fr":"Langue de Google Docs (abrév)","de":"Sprache von Google Docs (abkürz)","pt":"Idioma do Google Docs (abrev)"},
      "Show full reference":{"en":"Show full reference","it":"Mostra riferimento completo","es":"Muestra referencia completa","fr":"Affiche la référence complète","de":"Vollständige Referenz anzeigen","pt":"Mostra referência completa"},
      "Verse number":{"en":"Verse number","it":"Numero del Versetto","es":"Número de Versículo","fr":"Numéro du Verset","de":"Vers Nummer","pt":"Número do versículo"},
      "RESET PREFERENCES TO DEFAULT OPTIONS":{"en":"RESET PREFERENCES TO DEFAULT OPTIONS","it":"RIPRISTINA LE OPZIONI PREDEFINITE","es":"RESTABLECER LAS OPCIONES POR DEFECTO","fr":"RESTAURER LES PARAMÈTRES PAR DÉFAUT","de":"STEZEN SIE DIE STANDAREINSTELLUNGEN ZURÜCK","pt":"RESTAURAR OPÇÕES PADRÃO"},
      "Insert citation":{"en":"Insert citation","it":"Inserisci citazione","es":"Inserta la cita","fr":"Entrez la citation","de":"Fügen Sie das Zitat","pt":"Inserir a cotação"},
      "Find verses by keyword":{"en":"Find verses by keyword","it":"Trova versetti per parola chiave","es":"Encontra versículos por palabra clave","fr":"Trouver des versets par mot-clé","de":"Finde Verse nach Stichwort","pt":"Encontre versículos por palavra-chave"},
      "Language":{"en":"Language","it":"Lingua","es":"Idioma","fr":"Langue","de":"Sprache","pt":"Linguagem"},
      "Search Results":{"en":"Search Results","it":"Risultati della Ricerca","es":"Resultados de Búsqueda","fr":"Résultats de Recherche","de":"Suchergebnisse","pt":"Resultados de Pesquisa"},
      "ALIGN LEFT":{"en":"ALIGN LEFT","it":"ALLINEA A SINISTRA","es":"ALINEA A IZQUIERDA","fr":"ALIGNEZ À GAUCHE","de":"LINKS AUSRICHTEN","pt":"ALINHA À ESQUERDA"},
      "ALIGN CENTER":{"en":"ALIGN CENTER","it":"ALLINEA AL CENTRO","es":"ALINEA AL CENTRO","fr":"ALIGNEZ AU CENTRE","de":"MITTE AUSRICHTEN","pt":"ALINHA AO CENTRO"},
      "ALIGN RIGHT":{"en":"ALIGN RIGHT","it":"ALLINEA A DESTRA","es":"ALINEA A DERECHA","fr":"ALIGNEZ À DROIT","de":"RECHTS AUSRICHTEN","pt":"ALINHA À DIREITA"},
      "FONT":{"en":"FONT","it":"CARATTERE","es":"FUENTE","fr":"POLICE","de":"SCHRIFTART","pt":"FONTE"},
      "Single":{"en":"Single","it":"Singola","es":"Sencillo","fr":"Unique","de":"Single","pt":"Única"},
      "Double":{"en":"Double","it":"Doppia","es":"Doble","fr":"Double","de":"Doppelt","pt":"Dupla"},
      "FONT SIZE":{"en":"FONT SIZE","it":"GRANDEZZA CARATTERE","es":"TAMAÑO DEL FUENTE","fr":"TAILLE DE CARACTÈRE ","de":"GRÖSSENZEICHEN","pt":"TAMANHO DA FONTE"},
      "TEXT COLOR":{"en":"TEXT COLOR","it":"COLORE DEL TESTO","es":"COLOR DE TEXTO","fr":"COULEUR DU TEXTE","de":"TEXTFARBE","pt":"COR DO TEXTO"},
      "HIGHLIGHT COLOR":{"en":"HIGHLIGHT COLOR","it":"COLORE DI SFONDO","es":"COLOR DE FONDO","fr":"COULEUR DU FOND","de":"HINTERGRUNDFARBE","pt":"COR DE FUNDO"},
      //"":{"en":"","it":"","es":"","fr":"","de":"","pt":""},
      //"":{"en":"","it":"","es":"","fr":"","de":"","pt":""},
      "DocInterfaceInCM":{"en":"My Docs interface is in centimeters","it":"La mia interfaccia di Google Documenti è in centimetri","es":"Mi interfaz de Google Docs está en centímetros.","fr":"Mon interface Google Docs est en centimètres","de":"Meine Google Text & Tabellen-Oberfläche ist in Zentimetern angegeben","pt":"A interface do Google Docs está em centímetros"},
      "B":{"en":"B","it":"G","es":"N","fr":"G","de":"F","pt":"N"}, //BOLD
      "I":{"en":"I","it":"C","es":"C","fr":"I","de":"K","pt":"I"}, //ITALIC
      "U":{"en":"U","it":"S","es":"S","fr":"S","de":"U","pt":"S"}, //UNDERLINE
      "S":{"en":"S","it":"B","es":"T","fr":"B","de":"D","pt":"T"}, //STRIKETHROUGH
      "BOLD":{"en":"BOLD","it":"GRASSETTO","es":"NEGRITA","fr":"GRAS","de":"FETTER","pt":"NEGRITO"}, //BOLD
      "ITALIC":{"en":"ITALIC","it":"CORSIVO","es":"CURSIVA","fr":"ITALIQUE","de":"KURSIVER","pt":"ITÁLICO"}, //ITALIC
      "UNDERLINE":{"en":"UNDERLINE","it":"SOTTOLINEATO","es":"SUBRAYADA","fr":"SOULIGNÉ","de":"UNTERSTRICHENER","pt":"SUBLINHADO"}, //UNDERLINE
      "STRIKETHROUGH":{"en":"STRIKETHROUGH","it":"BARRATO","es":"TACHADA","fr":"BARRÉ","de":"DURCHGESTRICHEN","pt":"TACHADO"}, //STRIKETHROUGH
      "NORMAL":{"en":"NORMAL","it":"NORMALE","es":"NORMAL","fr":"ORDINAIRE","de":"NORMAL","pt":"NORMAL"},
      "SUPERSCRIPT":{"en":"SUPERSCRIPT","it":"APICE","es":"SUPERÍNDICE","fr":"EXPOSANT","de":"SUPERSCRIPT","pt":"SOBRESCRITO"},
      "SUBSCRIPT":{"en":"SUBSCRIPT","it":"PEDICE","es":"SUBÍNDICE","fr":"INDICE","de":"INDEX","pt":"SUBSCRITO"},
      "Versions and Languages":{"en":"Supported Versions and Languages","it":"Versioni e Lingue supportate","es":"Versiones y Idiomas compatibles","fr":"Versions et Idiomes compatibles","de":"Unterstützte Versionen und Sprachen","pt":"Versões e idiomas compatíveis"},
      "Preview":{"en":"Preview","it":"Anteprima","es":"Vista previa","fr":"Aperçu","de":"Vorschau","pt":"Pré-visualização"},
      "ISamuelis2":{"en":"1 Samuel 2","it":"1 Samuele 2","es":"1 Samuel 2","fr":"1 Samuel 2","de":"1 Samuel 2","pt":"1 Samuel 2"},
      "Psalmorum114":{"en":"Psalm 114","it":"Salmo 114","es":"Salmo 114","fr":"Psaume 114","de":"Psalter 114","pt":"Salmo 114"},
      "ISam2":{"en":"1 Sam 2","it":"1 Sam 2","es":"1 Sam 2","fr":"1 Sam 2","de":"1 Sam 2","pt":"1 Sam 2"},
      "Ps114":{"en":"Ps 114","it":"Sal 114","es":"Sal 114","fr":"Ps 114","de":"Ps 114","pt":"Sal 114"},
      "Insert into the Document":{"en":"Insert into the Document","it":"Inserisci nel Documento","es":"Inserta en el Documento","fr":"Insére dans le Document","de":"Legen Sie in das Dokument","pt":"Insira no documento"},
      "Write your observations about BibleGet I/O":{
        "en":"Write your observations about BibleGet I/O",
        "it":"Scrivi le tue osservazioni su BibleGet I/O",
        "es":"Escríbe tus observaciones sobre BibleGet I/O",
        "fr":"Donnez vos commentaires sur BibleGet I/O",
        "de":"Schreiben Sie Ihre Kommentare zu BibleGet I/O",
        "pt":"Escreva suas observações sobre BibleGet I/O"
      },
      "Send Message":{"en":"Send Message","it":"Invia Messaggio","es":"Enviar Mensaje","fr":"Envoyer Message","de":"Nachricht Senden","pt":""},
      "Your message was delivered successfully. Thank you for getting in touch with us!":{
        "en":"Your message was delivered successfully. Thank you for getting in touch with us!",
        "it":"Il tuo messaggio è stato inviato con successo. Grazie per averci contattato!",
        "es":"Tu mensaje se entregó correctamente. Gracias por ponerte en contacto con nosotros!",
        "fr":"Votre message a été livré avec succès. Merci de nous contacter!",
        "de":"Ihre Nachricht wurde erfolgreich übermittelt. Vielen Dank für Ihr Interesse!",
        "pt":"Sua mensagem foi entregue com sucesso. Obrigado por entrar em contato!"
      },
      "CLOSE":{"en":"CLOSE","it":"CHIUDI","es":"CERRA","fr":"FERME","de":"SCHLIEßEN","pt":"FECHA"},
      "Your message was not delivered successfully... Please try to send again.":{
        "en":"Your message was not delivered successfully... Please try to send again.",
        "it":"L'invio del messaggio non è andato a buon fine... Ritenta l'invio.",
        "es":"Tu mensaje no se entregó correctamente... Por favor trate de enviar de nuevo.",
        "fr":"Votre message n'a pas remis correctement... Se il vous plaît essayer d'envoyer à nouveau.",
        "de":"Ihre Nachricht nicht korrekt zugestellt... Bitte versuchen Sie es noch einmal zu senden.",
        "pt":"Sua mensagem não foi entregue corretamente ... Tente enviar novamente."
      },
      "The BibleGet I/O Project with it's server":{
        "en":"The BibleGet I/O Project with it's server, website, and applications were developed entirely by John R. D'Orazio, a priest of the Diocese of Rome, chaplain at the Third University of Rome. The project will survive only thanks to the offerings of those who appreciate and use this service. The server space and the domain name have annual costs. A contribution on your part, even if only €5, is a great help. Please help maintain this project!",
        "it":"Il progetto BibleGet I/O con il relativo server, sito web, e applicazioni sono stati sviluppati interamente da John R. D'Orazio, sacerdote della Diocesi di Roma, cappellano all'Università Roma Tre. Il progetto può sopravvivere soltanto grazie alle offerte di chi apprezza e utilizza questo servizio. Lo spazio server e il nome di dominio hanno dei costi annuali. Un tuo contributo, anche di soli €5, è di grande aiuto. Aiuta anche tu a mantenere vivo questo progetto!",
        "es":"El proyecto BibleGet I/O con sus servidor, sitio web, y aplicaciones se han desarrollado en su totalidad por John R. D'Orazio, sacerdote de la diócesis de Roma, capellán de la Tercera Universidad de Roma. El proyecto sólo puede sobrevivir gracias a las donaciones de aquellos que aprecian y utilizan este servicio. El espacio de el servidor y el nombre de dominio tienen costos anuales. Su contribución, aunque sea sólo €5, es una gran ayuda. Ayuda a mantener vivo este proyecto!",
        "fr":"Le projet BibleGet I/O avec son serveur, site web, et les applications ont été entièrement développé par John R. D'Orazio, prêtre du diocèse de Rome, aumônier de la Troisième Université de Rome. Le projet ne peut survivre que grâce aux dons de ceux qui apprécient et utilisent ce service. L'espace du serveur et le nom de domaine ont des coûts annuels. Sa contribution, même si seulement €5, est d'une grande aide. Aidez à garder ce projet en vie!",
        "de":"Das Projekt mit dem Server, Website und Anwendungen wurden vollständig von John R. D'Orazio entwickelt, priester der Diözese Rom, Kaplan der Dritten Universität von Rom. Das Projekt kann nur überleben dank der Spenden derer, die zu schätzen und nutzen diesen Service. Der Raum des Servers und der Domain-Namen haben jährlichen Kosten. Sein Beitrag, auch wenn nur €5, ist eine große Hilfe. Helfen Sie, dieses Projekt am Leben zu erhalten!",
        "pt":"O projeto BibleGet I/O com seus servidores, site e aplicativos foi desenvolvido inteiramente por John R. D'Orazio, padre da diocese de Roma, capelão da Terceira Universidade de Roma. O projeto só pode sobreviver graças a doações de quem aprecia e utiliza este serviço. O espaço do servidor e o nome de domínio têm custos anuais. Sua contribuição, mesmo que seja apenas €5, é uma grande ajuda. Ajude a manter vivo este projeto!"
      },
      "Formulation of biblical queries":{
        "en":"Formulation of biblical queries",
        "it":"Formulazione delle query bibliche",
        "es":"Formulacion de las consultas biblicas",
        "fr":"Formulation de les requêtes bibliques",
        "de":"Formulierung der biblischen Abfrage",
        "pt":"Formulação da consulta bíblica"
      },
      "p1":{
        "en":"Biblical queries must be formulated according to a precise set of rules, following the standard notation for bible citations (see also <a href=\"http:\/\/en.wikipedia.org\/wiki\/Bible_citation\">Wikipedia:Bible citation<\/a>). A query is composed of at least two elements: the biblical book followed by the chapter. The biblical book can be written in full or in the abbreviated form using the abbreviations as indicated in the table of the <span class=\"internal-link\" id=\"to-bookabbrevs\">Abbreviations of bible books<\/span>. For example, \"Matthew 1\" means the book of Matthew (or better the gospel according to Matthew) at chapter 1. This can also be written as \"Mt 1\".",
        "it":"Le query bibliche vanno formulate secondo regole precise, seguendo la notazione standard italiana per le citazioni bibliche. Una query è composta da almeno due elementi: il libro biblico seguito dal capitolo. Il libro biblico può essere scritto per intero oppure nella forma abbreviata utilizzando le abbreviazioni indicate nella tabella delle <span class=\"internal-link\" id=\"to-bookabbrevs\">Abbreviazioni dei libri biblici<\/span>. Per esempio, \"Matteo 1\" significa il libro di Matteo (ossia il vangelo secondo Matteo) al capitolo 1. Si può scrivere anche \"Mt 1\".",
        "es":"Las consultas bíblicas se formulan de acuerdo con un conjunto de normas precisas, siguiendo la notación estándar para las citas bíblicas. Una consulta consta de al menos dos elementos: el libro bíblico seguido por el capítulo. El libro bíblico puede ser escrito por completo o por la forma abreviada utilizando las abreviaturas que figuran en la tabla de las <span class=\"internal-link\" id=\"to-bookabbrevs\">Abreviaturas de los libros bíblicos<\/span>. Por ejemplo, \"Mateo 1\" significa el libro de Mateo (es decir, el Evangelio según San Mateo) en el capítulo 1. También se puede escribir \"Mt 1\".",
        "fr":"Les requêtes bibliques sont formulées selon un ensemble de règles précises, suivant la notation standard pour les citations bibliques. Une requête se compose d'au moins deux éléments: le livre biblique suivie par le chapitre. Le livre biblique peut être écrit en entier ou abrégé utilisant les abréviations énumérées dans le tableau de les <span class=\"internal-link\" id=\"to-bookabbrevs\">Abréviations des livres bibliques<\/span>. Par exemple, \"Matthieu 1\" signifie que le livre de Matthieu (ie l'évangile selon Matthieu) dans le chapitre 1. Vous pouvez également écrire \"Mt 1\".",
        "de":"Die biblischen Abfragen werden nach genauen Regeln, nach der Standardnotation für Bibelzitate formuliert. Eine Abfrage besteht aus mindestens zwei Elementen: dem biblischen Buch gefolgt vom Kapitel. Die Bibel Buch kann in voller Höhe ausgeschrieben oder abgekürzt wie angegebenen in der Tabelle der <span class=\"internal-link\" id=\"to-bookabbrevs\">Abkürzungen der biblischen Bücher<\/span>. Zum Beispiel: \"Matthäus 1\" ist das Buch von Matthäus (dh das Evangelium nach Matthäus) in Kapitel 1. Sie können auch schreiben, \"Mt 1\".",
        "pt":"As consultas bíblicas são formuladas de acordo com um conjunto de regras precisas, seguindo a notação padrão para citações bíblicas. Uma consulta consiste em pelo menos dois elementos: o livro bíblico seguido pelo capítulo. O livro bíblico pode ser escrito na íntegra ou na forma abreviada usando as abreviações listadas na tabela <span class =\"internal-link\" id =\"to-bookabbrevs\"> Abreviações dos livros bíblicos <\/ span>. Por exemplo, \"Mateus 1\" significa o livro de Mateus (ou seja, o Evangelho segundo São Mateus) no capítulo 1. Você também pode escrever \"Mt 1\"."
      },
      "p2":{
        "en":"Here is a presentation of the signs that serve to indicate exactly which combination of chapters and verses you want to quote.",
        "it":"Ecco di seguito una presentazione dei segni che servono per indicare esattamente quale combinazione di capitoli e versetti si desidera citare.",
        "es":"Lo que sigue es una presentación de los signos que sirven para indicar exactamente qué combinación de capítulos y versículos desea citar.",
        "fr":"Voici une présentation des signes qui servent à indiquer exactement quelle combinaison de chapitres et versets que vous voulez citer.",
        "de":"Es folgt eine Darstellung der Zeichen, die auf genau die Kombination von Kapitel und Verse Sie zitieren wollen zeigen, zu dienen.",
        "pt":"A seguir, apresentamos os sinais que servem para indicar exatamente qual combinação de capítulos e versículos você deseja citar."
      },
      "li1":{
        "en":"\":\": the colon is the chapter-verse separator. \"Matthew 1:5\" means the book (gospel) of Matthew, chapter 1, verse 5.",
        "it":"\",\": la virgola è il separatore capitolo-versetto. \"Matteo 1,5\" significa il libro (vangelo) di Matteo al capitolo 1, versetto 5.",
        "es":"\",\": la coma es el separador capítulo-versículo. \"Mateo 1,5\" significa el libro (Evangelio) de San Mateo, capítulo 1, versículo 5.",
        "fr":"\",\": la virgule est le séparateur chapitre-verset. \"Matthieu 1,5\" signifie le livre (Evangile) de Saint Matthieu, chapitre 1, verset 5.",
        "de":"\",\": das Komma ist das Trenn Kapitel-Vers. \"Matthäus 1,5\" ist das Buch (Evangelium) von Matthäus, Kapitel 1, Vers 5.",
        "pt":"\",\": a vírgula é o separador capítulo-versículo. \"Mateus 1,5\" significa o livro (Evangelho) de São Mateus, capítulo 1, versículo 5."
      },
      "li2":{
        "en":"\",\": the comma is the verse-verse separator. \"Matthew 1:5,7\" means the book (gospel) of Matthew, chapter 1, verse 5 and verse 7.",
        "it":"\".\": il punto è il separatore tra versetto e versetto. \"Matteo 1,5.7\" significa il libro (vangelo) di Matteo al capitolo 1, versetto 5 e versetto 7.",
        "es":"\".\": el punto es el separador versículo-versículo. \"Mateo 1,5.7\" significa el libro (Evangelio) de San Mateo, capítulo 1, versículo 5 y versículo 7.",
        "fr":"\".\": le point est le séparateur verset-verset. \"Matthieu 1,5.7\" signifie le livre (Evangile) de Saint Matthieu, chapitre 1, verset 5 et verset 7.",
        "de":"\".\": der Punkt ist das Trenn Vers-Vers. \"Matthäus 1,5.7\" ist das Buch (Evangelium) von Matthäus, Kapitel 1, Vers 5 und Vers 7.",
        "pt":"\".\": o ponto é o separador verso-verso. \"Mateus 1,5.7\" significa o livro (Evangelho) de São Mateus, capítulo 1, versículo 5 e versículo 7."
      },
      "li3":{
        "en":"\"-\": the dash or hyphen is the separator from - to, and can be used in a variety of ways:",
        "it":"\"-\": il trattino è il separatore da - a, che può essere utilizzato in vari modi:",
        "es":"\"-\": el guión es el separador desde - hasta, que puede ser utilizado en una variedad de maneras:",
        "fr":"\"-\": le trait d'union est le séparateur de - à, et il peut être utilisé dans une variété de façons:",
        "de":"\"-\": der Bindestrich ist das Trenn von - bis, und sie kann in einer Vielzahl von Weisen verwendet werden:",
        "pt":"\"-\": o hífen é o separador de - para, que pode ser usado de várias maneiras:"
      },
      "li4":{
        "en":" from chapter to chapter: \"Matthew 1-2\" means the gospel according to Matthew, from chapter 1 to chapter 2",
        "it":" da capitolo a capitolo: \"Matteo 1-2\" significa il vangelo secondo Matteo, dal capitolo 1 al capitolo 2",
        "es":" desde capítulo hasta capítulo: \"Mateo 1-2\" significa el evangelio según San Mateo, desde el capítulo 1 hasta el capítulo 2",
        "fr":" de chapitre à chapitre: \"Matthieu 1-2\" signifie l'evangile selon Saint Matthieu, du chapitre 1 au chapitre 2",
        "de":" von Kapitel bis Kapitel: \"Matthäus 1-2\" ist das Evangelium von Matthäus, von Kapitel 1 bis Kapitel 2",
        "pt":" de capítulo para capítulo: \"Mateus 1-2\" significa o evangelho segundo São Mateus, do capítulo 1 ao capítulo 2"
      },
      "li5":{
        "en":" from chapter, verse to verse of the same chapter: \"Matthew 1:1-5\" means the gospel according to Matthew, chapter 1, verses 1 to 5",
        "it":" da capitolo, versetto fino a versetto dello stesso capitolo: \"Matteo 1,1-5\" significa il vangelo secondo Matteo, capitolo 1, dal versetto 1 al versetto 5",
        "es":" desde capítulo, versículo hasta versículo del mismo capítulo: \"Mateo 1,1-5\" significa el evangelio según San Mateo, desde el capítulo 1, versículo 1 hasta el versículo 5",
        "fr":" de chapitre, verset à verset du même chapitre: \"Matthieu 1,1-5\" signifie l'evangile selon Saint Matthieu, du chapitre 1, verset 1 au verset 5",
        "de":" von Kapitel, Vers bis Vers des gleichen Kapitels: \"Matthäus 1,1-5\" ist Das Evangelium nach Matthäus, Kapitel 1, Vers 1 bis Vers 5",
        "pt":" do capítulo, versículo a versículo do mesmo capítulo: \"Mateus 1,1-5\" significa o evangelho segundo São Mateus, do capítulo 1, versículo 1 ao versículo 5"
      },
      "li6":{
        "en":" from chapter, verse to chapter, verse: \"Matthew 1:5-2:13\" means the gospel according to Matthew, chapter 1, verse 5 to chapter 2, verse 13",
        "it":" da capitolo, versetto fino a capitolo, versetto: \"Matteo 1,5-2,13\" significa il vangelo secondo Matteo, capitolo 1, versetto 5 fino al capitolo 2, versetto 13",
        "es":" desde capítulo, versículo hasta capítulo, versículo: \"Mateo 1,5-2,13\" significa el evangelio según San Mateo, desde el capítulo 1, versículo 5, hasta el capítulo 2, versículo 13",
        "fr":" de chapitre, verset à chapitre, verset: \"Matthieu 1,5-2,13\" signifie l'evangile selon Saint Matthieu, du chapitre 1, verset 5, au chapitre 2, verset 13",
        "de":" von Kapitel, Vers bis Kapitel, Vers: \"Matthäus 1,5-2,13\" ist Das Evangelium nach Matthäus, Kapitel 1, Vers 5 bis Kapitel 2, Vers 13",
        "pt":""
      },
      "p3":{
        "en":"Different combinations of these signs can be used to formulate more complex queries, for example \"Mt1:1-3,5,7-9\" means the gospel of Matthew, chapter 1 verses 1 to 3, verse 5, and verses 7 to 9. ",
        "it":"Si possono usare varie combinazioni di questi segni per formulare query più complesse, ad esempio \"Mt1,1-3.5.7-9\" significa il vangelo secondo Matteo, capitolo 1, versetti 1 a 3, versetto 5, e versetti 7 a 9. ",
        "es":"Las diferentes combinaciones de estos signos se pueden utilizar para formular consultas más complejas, por ejemplo \"Mt1,1-3.5.7-9\" significa el evangelio según San Mateo, capítulo 1, versículos del 1 al 3, versículo 5, y los versículos 7 a 9.",
        "fr":"Différentes combinaisons de ces signes peuvent être utilisés pour formuler des requêtes plus complexes, par exemple \"Mt1,1-3.5.7-9\" signifie l'évangile selon Saint Matthieu, chapitre 1 versets 1 à 3, verset 5, et les versets 7 à 9.",
        "de":"Verschiedene Kombinationen dieser Zeichen kann verwendet werden, um komplexere Abfragen zu formulieren, zum Beispiel \"Mt1,1-3.5.7-9\" ist die Matthäusevangelium, Kapitel 1 Vers 1 bis 3, Vers 5 und Verse 7 bis 9.",
        "pt":""
      },
      "p4":{
        "en":"Multiple requests can be made at once using the semicolon \";\" to concatenate the queries. If the query following the semicolon refers to the same book as the preceding query, then it is not necessary to indicate the book again. For example, \"Matthew 1:1;2,13\" means the gospel of Matthew chapter 1 verse 1, and chapter 2 verse 13. By combining all these signs, quite complex queries can be made spanning verses taken from various books throughout the bible: \"Genesis 1:3-5,7,9-11,13;2:4-9,11-13;Revelation 3:10,12-14\".",
        "it":"Si possono anche effettuare richieste multiple in una volta utilizzando il punto-virgola \";\" per concatenare le query. Se la query che segue il punto-virgola si riferisce allo stesso libro della query precedente, allora non è necessario indicare nuovamente il libro. Per esempio, \"Matteo 1,1;2,13\" significa il vangelo secondo Matteo capitolo 1 versetto 1, e capitolo 2 versetto 13. Combinando tutti questi segni si possono effettuare query molto complesse che prendono versetti da vari libri: \"Genesi 1,3-5.7.9-11.13;2,4-9.11-13;Apocalisse 3,10.12-14\".",
        "es":"Múltiples consultas se pueden hacer a la vez utilizando un punto y coma \";\" para concatenar las consultas. Si la consulta que sigue el punto y coma se rifiere a el mismo libro de la consulta anterior, entonces no es necesario indicar nuevamente el libro. Por ejemplo, \"Mateo 1,1;2,13\" significa el evangelio según San Mateo capítulo 1 versículo 1 y capítulo 2 versículo 13. Combinando todos estos signos, se pueden hacer consultas mucho más complejas que toman versículos de diferentes libros: \"Génesis 1,3-5.7.9-11.13;2,4-9.11-13;Apocalipsis 3,10.12-14\".",
        "fr":"Plusieurs requêtes peuvent être faites à la fois par un point-virgule \";\" pour concaténer requêtes. Si la requête qui suit le point-virgule est rifiere au même livre de la requête précédente, alors il ne est pas nécessaire d'indiquer de nouveau le livre. Par exemple, \"Matthieu 1,1;2,13\" signifie l'Evangile de Matthieu chapitre 1 verset 1 et le chapitre 2 verset 13. En combinant tous ces signes, vous pouvez faire des requêtes très complexes qui prennent versets de différents livres: \"Genèse 1,3-5.7.9-11.13;2,4-9.11-13;Apocalypse 3,10.12-14\".",
        "de":"Mehrere Anfragen können sowohl durch ein Semikolon gemacht werden \";\" Abfragen verketten. Wird der Antrag nach dem Semikolon ist das gleiche Buch der vorherigen Abfrage rifiere, dann ist es nicht notwendig, das Buch wieder anzuzeigen. Zum Beispiel: \"Matthäus 1,1;2,13\" ist das Evangelium des Matthäus Kapitel 1 Vers 1 und Kapitel 2, Vers 13. Die Kombination all dieser Zeichen können Sie sehr komplexe Abfragen, die verschiedene Verse nehmen machen Bücher: \"1Mose 1,3-5.7.9-11.13;2,4-9.11-13;Offenbarung 3,10.12-14\".",
        "pt":""
      },
      "p5":{
        "en":"It doesn't matter if the queries have spaces, this has no effect on the final result. Just as the usage of uppercase or lowercase makes no difference. \"Genesis 1:1\", \"Gen1:1\", \"genesis1:1\", and \"gEn 1:1\" for example will all work with the same result.",
        "it":"È indifferente se viene utilizzato qualche spazio all'interno delle query, non ha effetto sul risultato finale. Così come l'utilizzo del maiuscolo o del minuscolo è indifferente. \"Genesi 1,1\", \"Gen1,1\", \"genesi1,1\", e \"gEn 1,1\" per esempio funzioneranno tutte con lo stesso risultato.",
        "es":"No importa si las consultas tienen espacios, esto no tiene ningún efecto en el resultado final. Así como el uso de mayúsculas o minúsculas no hace ninguna diferencia. \"Génesis 1,1\", \"Gen1,1\", \"génesis1,1\" y \"gEn 1,1\", por ejemplo, van a funcionar con el mismo resultado.",
        "fr":"Il n'a pas d'importance si les requêtes ont des espaces, cela n'a aucun effet sur le résultat final. De même que l'utilisation de majuscules ou minuscules ne fait aucune différence. \"Genèse 1,1\", \"Gen1,1\", \"genesis1,1\" et \"gEn1,1\" par exemple auront tous le même résultat.",
        "de":"Es spielt keine Rolle, wenn die Anfragen haben Leerzeichen, hat dies keine Auswirkung auf das Endergebnis. Genau wie die Verwendung von Groß- oder Kleinschreibung spielt keine Rolle. \"Genesis 1,1\", \"Gen1,1\", \"genesis1,1\" und \"gEn 1:1\" beispielsweise sie werden alle das gleichen Ergebnis haben.",
        "pt":""
      },
      "p6":{
        "en":"If you find an error in the usage of the extension &#8220;BibleGet I/O&#8221;, or if you have any suggestions to make it work better, you can send a message using the &#8220;Send Feedback&#8221; option in the add-on menu.",
        "it":"Se trovi qualche errore di funzionamento nell'estensione &#8220;BibleGet I/O&#8221;, oppure se hai suggerimenti per farla funzionare meglio, puoi inviare un messaggio utilizzando l'opzione &#8220;Invia Feedback&#8221; nel menu dell'estensione.",
        "es":"Si observa cualquier error de operación en la extensión &#8220;BibleGet I/O&#8221;, o si tiene alguna sugerencia para hacer que funcione mejor, puede enviar un mensaje usando la opcion &#8220;Enviar comentarios&#8221; en el menú de la extensión.",
        "fr":"Si vous trouvez une erreur d'opération dans l'extension &#8220;BibleGet I/O&#8221;, ou si vous avez des suggestions pour le faire fonctionner mieux, vous pouvez envoyer un message en utilisant l'option &#8220;Envoyer des commentaires&#8221; dans le menu de l'extension.",
        "de":"Wenn Sie einen Fehler in der Operation zum Erweiterung &#8220;BibleGet I/O&#8221; zu finden, oder wenn Sie Vorschläge haben, um es besser zu arbeiten, können Sie eine Nachricht über das Option &#8220;Feedback senden&#8221; in der Menü zu Erweiterung.",
        "pt":""
      },
      "Formulate a query":{
        "en":"Formulate a query",
        "it":"Formulare una query",
        "es":"Formular una consulta",
        "fr":"Formuler une requête",
        "de":"Formulieren Anfrage",
        "pt":""
      },
      "Books / Abbreviations":{
        "en":"Books / Abbreviations",
        "it":"Libri / Abbreviazioni",
        "es":"Libros / Abreviaturas",
        "fr":"Livres / Abréviations",
        "de":"Bücher / Abkürzungen",
        "pt":"Livros / Abreviações"
      },
      "BOOK":{
        "en":"BOOK",
        "it":"LIBRO",
        "es":"LIBRO",
        "fr":"LIVRE",
        "de":"BUCH",
        "pt":"LIVRO"
      },
      "CHAPTER":{
        "en":"CHAPTER",
        "it":"CAPITOLO",
        "es":"CAPÍTULO",
        "fr":"CHAPITRE",
        "de":"KAPITEL",
        "pt":"CAPÍTULO"
      },
      "VERSE":{
        "en":"VERSE",
        "it":"VERSETTO",
        "es":"VERSÍCULO",
        "fr":"VERSET",
        "de":"VERS",
        "pt":""
      },
      "VERSE TEXT":{
        "en":"VERSE TEXT",
        "it":"TESTO DEL VERSETTO",
        "es":"TEXTO DEL VERSÍCULO",
        "fr":"TEXTE DU VERSET",
        "de":"TEXT DES VERSES",
        "pt":"TEXTO DO VERSÍCULO"
      },
      "ABBREVIATION":{
        "en":"ABBREVIATION",
        "it":"ABBREVIAZIONE",
        "es":"ABREVIATURA",
        "fr":"ABRÉVIATION",
        "de":"ABKÜRZUNG",
        "pt":"ABREVIAÇÃO"
      },
      "Full Name":{ //referred to the bible version
        "en":"Full Title",
        "it":"Titolo Completo",
        "es":"Título Completo",
        "fr":"Titre Complet",
        "de":"Vollständige Titel",
        "pt":""
      },
      "Year":{
        "en":"Year",
        "it":"Anno",
        "es":"Año",
        "fr":"Année",
        "de":"Erscheinungsjahr",
        "pt":""
      },
      "UPDATE DATA FROM BIBLEGET SERVER":{
        "en":"UPDATE DATA FROM BIBLEGET SERVER",
        "it":"AGGIORNA I DATI DAL SERVER DI BIBLEGET",
        "es":"ACTUALIZAR LOS HECHOS DESDE EL SERVIDOR DE BIBLEGET",
        "fr":"MISE A JOUR DES DONNÉES À PARTIR DU SERVEUR DE BIBLEGET",
        "de":"AKTUALISIEREN DER DATEN VON DER SERVER VON BIBLEGET",
        "pt":""
      },
      "p7A":{
        "en":"The names of the books of the Bible are currently recognized in",
        "it":"I nomi dei libri della Bibbia vengono attualmente riconosciuti in",
        "es":"Los nombres de los libros de la Biblia son reconocidos actualmente en",
        "fr":"Les noms des livres de la Bible sont actuellement reconnus dans",
        "de":"Die Namen der Bücher der Bibel sind zur Zeit in",
        "pt":""
      },
      "p7B":{
        "en":"different languages. Currently supported languages are:",
        "it":"lingue diverse. Le lingue attualmente supportate sono:",
        "es":"idiomas diferentes. Actualmente los idiomas soportados son:",
        "fr":"langues diverses. Les langues actuellement supportées sont:",
        "de":"verschiedenen Sprachen anerkannt. Derzeit unterstützte Sprachen sind:",
        "pt":""
      },
      "p8":{
        "en":"versions of the Bible are currently supported:",
        "it":"versioni della Bibbia sono attualmente supportate:",
        "es":"versiones de la Biblia están soportadas actualmente:",
        "fr":"versions de la Bible sont actuellement supportées:",
        "de":"versionen der Bibel werden derzeit unterstützt:",
        "pt":""
      },
      "p9":{
        "en":"Some Bible versions have their own formatting. This is left by default to keep the text as close as possible to the original. If however you need to have consistent formatting in your document, you may override the Bible version's own formatting.",
        "it":"Alcune versioni bibliche hanno formattazione propria. Questa viene lasciata per impostazione predefinita per mantenere il testo il più vicino possibile all'originale. Se tuttavia hai bisogno di mantenere una formattazione coerente con il resto del documento, puoi spuntare qui per ignorare la formattazione propria del testo biblico.",
        "es":"Algunas versiones de la Biblia tienen su propio formato. Esto está permitido de forma predeterminada para mantener el texto lo más cerca posible al original. Sin embargo, si usted necesita para mantener el formateo consistente con el resto del documento, puede marcar aquí para ignorar el formato propio del texto bíblico.",
        "fr":"Certaines versions de la Bible ont leur propre format. Cette option est activée par défaut pour conserver le texte aussi proche que possible de l'original. Cependant, si vous avez besoin de garder la mise en forme cohérente avec le reste du document, vous pouvez marquer ici pour ignorer le format du texte biblique.",
        "de":"Einige Versionen der Bibel haben ihre eigenen Format. Diese Option ist standardmäßig aktiviert, um den Text so nahe wie möglich am Original zu halten. Allerdings, wenn Sie die Formatierung im Einklang mit dem Rest des Dokuments zu halten brauchen, Sie sich hier zu markieren kann, um der Bibelversion eigenen Formatierung ignorieren.",
        "pt":""
      },
      "lbl1":{
        "en":"Override Bible version formatting",
        "it":"Ignorare la formattazione della versione biblica",
        "es":"Ignorar el formato de la versión bíblica",
        "fr":"Ignorer la mise en forme de la version biblique",
        "de":"Ignorieren Sie die Formatierung der biblischen Version",
        "pt":""
      },
      "Please select a version.":{
        "en":"Please select a Bible version.",
        "it":"Si prega selezionare una versione della Bibbia.",
        "es":"Por favor seleccionar una versión de la Biblia.",
        "fr":"Se il vous plaît sélectionner une version de la Bible.",
        "de":"Bitte wählen Sie eine Version der Bibel.",
        "pt":""
      },
      "I cannot send an empty query.":{
        "en":"I cannot send an empty query.",
        "it":"Non posso inviare una richiesta vuota.",
        "es":"No puedo enviar una consulta vacía.",
        "fr":"Je ne peux pas envoyer une requête vide.",
        "de":"Ich kann eine leere Abfrage nicht senden.",
        "pt":""
      },
      "Mixed notations have been detected. Please use either english notation or european notation.":{
        "en":"Mixed notations have been detected. Please use either english notation or european notation.",
        "it":"Sono state rilevate notazioni multiple. Si prega utilizzare o la notazione inglese, o la notazione europea.",
        "es":"Se han detectado varias notaciónes. Por favor, utilice o la notación Inglés, o la notación internacional.",
        "fr":"Notations multiples ont été détectées. Se il vous plaît utiliser ou la notation anglaise, ou la notation européenne.",
        "de":"Multiple Notationen erkannt wurden. Bitte benutzen Sie entweder Englisch Notation oder europäische Notation.",
        "pt":""
      },
      "When doing a search by keyword, you cannot select more than one version":{
        "en":"When doing a search by keyword, you cannot select more than one version",
        "it":"Quando effettui una ricerca per parola chiave, non puoi selezionare più di una versione",
        "es":"Al realizar una búsqueda por palabra clave, no puede seleccionar más de una versión",
        "fr":"Lorsque vous effectuez une recherche par mot-clé, vous ne pouvez pas sélectionner plusieurs versions",
        "de":"Bei der Suche nach Schlüsselwörtern können Sie nicht mehr als eine Version auswählen",
        "pt":"Ao fazer uma pesquisa por palavra-chave, você não pode selecionar mais de uma versão"
      },
      "The Add-on loaded under the account:" : {
        "en":"The Add-on loaded under the account:",
        "it":"Il componente aggiuntivo è stato caricato con l'account:",
        "es":"El complemento cargó con la cuenta:",
        "fr":"Le module complémentaire a été téléchargé en utilisant le compte",
        "de":"Das Add-On wurde über das Konto geladen:",
        "pt":"O complemento foi carregado através da conta:"
      },
      "However you are also logged into another account in this browser:" : {
        "en":"However you are also logged into another account in this browser:",
        "it":"Tuttavia hai effettuato accesso anche ad un altro account in questo browser:",
        "es":"Sin embargo, también ha iniciado sesión en otra cuenta en este navegador:",
        "fr":"Cependant, vous êtes également connecté à un autre compte dans ce navigateur:",
        "de":"Sie sind jedoch auch in diesem Browser bei einem anderen Konto angemeldet:",
        "pt":"No entanto, você também está conectado a outra conta neste navegador:"
      },
      "Being logged into multiple accounts in the same browser session causes authorization errors." : {
        "en":"Being logged into multiple accounts in the same browser session causes authorization errors.",
        "it":"Effettuare accesso a più account nella stessa sessione di navigazione provoca errori di autorizzazione.",
        "es":"Iniciar sesión con varias cuentas en la misma sesión del navegador provoca errores de autorización.",
        "fr":"La connexion avec plusieurs comptes dans la même session de navigateur entraîne des erreurs d'autorisation.",
        "de":"Das Anmelden mit mehreren Konten in derselben Browsersitzung führt zu Autorisierungsfehlern.",
        "pt":"O login com várias contas na mesma sessão do navegador causa erros de autorização."
      },
      "In order to proceed, you must either log out of all accounts, and log back into the account that installed the add-on, or open an incognito window, log in with the account that installed the add-on and use the add-on from that window." : {
        "en":"In order to proceed, you must either log out of all accounts, and log back into the account that installed the add-on, or open an incognito window, log in with the account that installed the add-on and use the add-on from that window.",
        "it":"Per poter procedere, dovresti uscire da tutti gli account ed effettuare l'accesso con l'account che ha installato l'estensione, oppure aprire una finestra in incognito ed effettuare da là l'accesso all'account che ha installato l'estensione.",
        "es":"Para continuar, debe cerrar la sesión de todas las cuentas, y volver a iniciar sesión en la cuenta que instaló el complemento, o abrir una ventana de incógnito, iniciar sesión con la cuenta que instaló el complemento y usar el complemento desde esa ventana.",
        "fr":"Pour continuer, vous devez soit vous déconnecter de tous les comptes et vous reconnecter au compte qui a installé le module complémentaire, soit ouvrir une fenêtre de navigation privée, vous connecter avec le compte qui a installé le module complémentaire et utiliser le module complémentaire à partir de cette fenêtre.",
        "de":"Um fortzufahren, müssen Sie sich entweder von allen Konten abmelden und wieder bei dem Konto anmelden, das das Add-On installiert hat, oder ein Inkognito-Fenster öffnen, sich mit dem Konto anmelden, das das Add-On installiert hat, und das Add-On verwenden aus diesem Fenster.",
        "pt":"Para continuar, você deve sair de todas as contas e fazer login novamente na conta que instalou o complemento ou abrir uma janela anônima, fazer login com a conta que instalou o complemento e usar o complemento dessa janela."
      },
      "The best practice to avoid these problems is to login to your accounts using the browser's own account manager. That way you have a different browser session for each account that you would like to use." : {
        "en":"The best practice to avoid these problems is to login to your accounts using the browser's own account manager. That way you have a different browser session for each account that you would like to use.",
        "it":"La migliore pratica per evitare questi problemi è accedere ai tuoi account usando il gestore degli account del browser. In questo modo hai una sessione del browser diversa per ogni account che usi.",
        "es":"La mejor práctica para evitar estos problemas es iniciar sesión en sus cuentas utilizando el administrador de cuentas propio del navegador. De esa manera, tendrá una sesión de navegador diferente para cada cuenta que use.",
        "fr":"La meilleure pratique pour éviter ces problèmes consiste à vous connecter à vos comptes à l'aide du gestionnaire de compte du navigateur. De cette façon, vous avez une session de navigateur différente pour chaque compte que vous utilisez.",
        "de":"Die beste Vorgehensweise, um diese Probleme zu vermeiden, besteht darin, sich mit dem eigenen Account Manager Ihres Browsers bei Ihren Konten anzumelden. Auf diese Weise haben Sie für jedes Konto, das Sie verwenden, eine andere Browsersitzung.",
        "pt":"A melhor prática para evitar esses problemas é fazer login nas suas contas usando o gerente de contas próprio do navegador. Dessa forma, você terá uma sessão de navegador diferente para cada conta que usar."
      },
      "Not authorized" : {
        "en":"Not authorized",
        "it":"Non autorizzato",
        "es":"No autorizado",
        "fr":"Pas autorisé",
        "de":"Nicht genehmigt",
        "pt":"Não autorizado"
      }
    },
    errormessages = {
      "There must be a valid book indicator at the start of the query.":{
        "en":"There must be a valid book indicator at the start of the query.",
        "it":"Ci deve essere una valida indicazione di libro all'inizio della query.",
        "es":"Tiene que haber una indicación válida del libro en el inicio de la consulta.",
        "fr":"Il doit y avoir une indication valable de la livre au début de la requête.",
        "de":"Es muss eine gültige Anzeige des Buches zu Beginn der Abfrage sein.",
        "pt":"Deve haver um indicador de livro válido no início da consulta."
      },
      "Every book indicator must be followed by a valid chapter indicator.":{
        "en":"Every book indicator must be followed by a valid chapter indicator.",
        "it":"Ogni indicatore di libro deve essere seguito da un valido indicatore di capitolo.",
        "es":"Cada indicador de libro debe ser seguido por un indicador del capítulo válido.",
        "fr":"Chaque indicateur de livre doit être suivi par un indicateur de chapitre valide.",
        "de":"Jedes Buch-Indikator muss durch eine gültige Kapitel-Indikator folgen.",
        "pt":"Todo indicador de livro deve ser seguido por um indicador de capítulo válido."
      },
      "The query does not have a valid book or book abbreviation: ":{
        "en":"The query does not have a valid book or book abbreviation: ",
        "it":"La richiesta non contiene un libro valido oppure una valida abbreviazione di libro: ",
        "es":"La consulta no contiene un libro válido o una abreviatura de libro válida: ",
        "fr":"La requête ne contient pas un livre ou une abréviation de livre valide: ",
        "de":"Die Abfrage enthält keine gültige Buch oder eine gültige Abkürzung Buch enthalten: ",
        "pt":"A consulta não possui um livro ou abreviação de livro válido: "
      },
      "A query that doesn't start with a book indicator must however start with a valid chapter indicator!":{
        "en":"A query that doesn't start with a book indicator must however start with a valid chapter indicator!",
        "it":"Una richiesta che non inizia con un indicatore di libro deve però iniziare con un indicatore di capitolo valido!",
        "es":"Sin embargo, una consulta que no se inicia con un indicador de libro debe comenzar con un indicador de capítulo válido!",
        "fr":"Une requête qui ne commence pas par un indicateur du livre doit cependant commencer avec un indicateur de chapitre valide!",
        "de":"Eine Abfrage, die nicht mit einem Buch-Anzeige wird anfangen müssen jedoch mit einer gültigen Kapitel Anzeige beginnen!",
        "pt":"Uma consulta que não começa com um indicador de livro deve, no entanto, começar com um indicador de capítulo válido!"
      },
      "You cannot use a period if you haven't first used a comma.":{
        "en":"You cannot use a period if you haven't first used a comma.",
        "it":"Non puoi utilizzare un punto senza prima utilizzare una virgola.",
        "es":"No se puede utilizar un punto, si no se ha utilizado primeramente una coma.",
        "fr":"Vous ne pouvez pas utiliser un point, si vous ne avez pas utilisé d'abord une virgule.",
        "de":"Sie können nicht einen Punkt, wenn Sie nicht zuerst ein Komma verwendet haben.",
        "pt":"Você não pode usar um ponto se não tiver usado uma vírgula."
      },
      "You cannot have more commas than you have periods.":{
        "en":"You cannot have more commas than you have periods.",
        "it":"Non si possono avere più virgole che punti.",
        "es":"No se puede tener más comas que puntos.",
        "fr":"Vous ne pouvez pas avoir plus de virgules que vous avez des points.",
        "de":"Sie können nicht mehr Kommas haben als Sie Punkten haben.",
        "pt":"Você não pode ter mais vírgulas do que pontos."
      },
      "Every period must be preceded and followed by a number having from one to three digits of which the first digit cannot be 0.":{
        "en":"Every period must be preceded and followed by a number having from one to three digits of which the first digit cannot be 0.",
        "it":"Ogni punto deve essere preceduto e seguito da un numero composto da una a tre cifre di cui la prima cifra non può essere 0.",
        "es":"Cada punto debe estar precedido y seguido de un número que tiene de uno a tres dígitos de los cuales el primer dígito no puede ser 0.",
        "fr":"Chaque point doit être précédée et suivie d'un nombre ayant une à trois chiffres dont le premier chiffre ne peut pas être 0.",
        "de":"Jede Punkt ist durch eine Zahl mit einer bis drei Stellen, von denen die erste Ziffer nicht 0 sein kann vorausgehen und folgen.",
        "pt":"Todo período deve ser precedido e seguido por um número com um a três dígitos, dos quais o primeiro dígito não pode ser 0."
      },
      "Every comma must be preceded and followed by a number having from one to three digits of which the first digit cannot be 0.":{
        "en":"Every comma must be preceded and followed by a number having from one to three digits of which the first digit cannot be 0.",
        "it":"Ogni virgola deve essere preceduta e seguita da un numero composto da una a tre cifre di cui la prima cifra non può essere 0.",
        "es":"Cada coma debe estar precedida y seguida de un número que tiene de uno a tres dígitos de los cuales el primer dígito no puede ser 0.",
        "fr":"Chaque virgule doit être précédée et suivie d'un nombre ayant une à trois chiffres dont le premier chiffre ne peut pas être 0.",
        "de":"Jede Komma ist durch eine Zahl mit einer bis drei Stellen, von denen die erste Ziffer nicht 0 sein kann vorausgehen und folgen.",
        "pt":"Cada vírgula deve ser precedida e seguida por um número com um a três dígitos, dos quais o primeiro dígito não pode ser 0."
      },
      "You cannot have more than one dash in the query if there are not at least as many commas minus one.":{
        "en":"You cannot have more than one dash in the query if there are not at least as many commas minus one.",
        "it":"Non puoi avere più di un trattino nella query se non ci sono almeno altrettanto punti meno uno.",
        "es":"No se puede tener más de un guión en la consulta si no hay al menos tantos puntos menos uno.",
        "fr":"Vous ne pouvez pas avoir plus d'un trait d'union dans la requête, si il n'y a pas au moins autant de points moins un.",
        "de":"Sie können nicht mehr als ein Bindestrich in der Abfrage, wenn es nicht mindestens so viele Punkten minus eins.",
        "pt":"Você não pode ter mais de um traço na consulta se não houver pelo menos tantas vírgulas menos um."
      },
      "Every dash must be preceded and followed by a number having from one to three digits of which the first digit cannot be 0.":{
        "en":"Every dash must be preceded and followed by a number having from one to three digits of which the first digit cannot be 0.",
        "it":"Ogni trattino deve essere preceduto e seguito da un numero composto da una a tre cifre di cui la prima cifra non può essere 0.",
        "es":"Cada guión debe estar precedido y seguido de un número que tiene de uno a tres dígitos de los cuales el primer dígito no puede ser 0.",
        "fr":"Chaque trait d'unione doit être précédé et suivi d'un nombre ayant une à trois chiffres dont le premier chiffre ne peut pas être 0.",
        "de":"Jede Bindestrich ist durch eine Zahl mit einer bis drei Stellen, von denen die erste Ziffer nicht 0 sein kann vorausgehen und folgen.",
        "pt":"Todo traço deve ser precedido e seguido por um número com um a três dígitos, dos quais o primeiro dígito não pode ser 0."
      },
      "If a dash is followed by a comma construct, then it must also be preceded by a comma construct.":{
        "en":"If a dash is followed by a comma construct, then it must also be preceded by a comma construct.",
        "it":"Se un trattino è seguito da un costrutto con virgola, allora deve anche essere preceduto da un costrutto con virgola.",
        "es":"Si un guión es seguido por una construcción de coma, entonces debe también estar precedido por una construcción de coma.",
        "fr":"Si un trait d'union est suivi par une construction de virgule, il doit également être précédée d'une construction d'virgule.",
        "de":"Wenn ein Bindestrich durch ein Komma Konstrukt gefolgt, dann muss es auch durch ein Komma Konstrukt vorangestellt werden.",
        "pt":"Se um traço for seguido por uma construção de vírgula, também deverá ser precedido por uma construção de vírgula."
      },
      "A chapter in the query is out of bounds: there is no chapter <{0}> in <{1}> in the requested version <{2}>, the last possible chapter is {3}":{
        "en":"A chapter in the query is out of bounds: there is no chapter <{0}> in <{1}> in the requested version <{2}>, the last possible chapter is {3}",
        "it":"Un capitolo nella query non è valido: non c'è un capitolo <{0}> in <{1}> nella versione richiesta <{2}>, l'ultimo capitolo possibile è {3}",
        "es":"Un capítulo en la consulta no es válido: no hay un capítulo <{0}> en <{1}> en la versión solicitada <{2}>, el último capítulo posible es {3}",
        "fr":"Un chapitre dans la requête n'est pas valide: il n'ya pas un chapitre <{0}> dans <{1}> dans la version sollicité <{2}>, le dernier chapitre possible est {3}",
        "de":"Ein Kapitel in der Abfrage ist ungültig: Es gibt nein Kapitel <{0}> in <{1}> zum der Version angefordert <{2}>, das letzte Kapitel die ist möglich, ist {3}",
        "pt":"Um capítulo na consulta está fora dos limites: não há capítulo <{0}> em <{1}> na versão solicitada <{2}>, o último capítulo possível é {3}"
      },
      "You cannot have more than one colon and not have a dash!":{
        "en":"You cannot have more than one colon and not have a dash!",
        "it":"Non puoi avere più di una virgola e non avere un trattino!",
        "es":"No se puede tener más de una coma y no tener un guión!",
        "fr":"Vous ne pouvez pas avoir plus d'une virgule et ne pas avoir un trait d'union!",
        "de":"Sie können nicht mehr als ein Komma und keinen Bindestrich!",
        "pt":"Você não pode ter mais de um ponto e não ter um traço!"
      },
      "You seem to have a malformed querystring, there should be only one dash.":{
        "en":"You seem to have a malformed querystring, there should be only one dash.",
        "it":"La stringa della query sembra essere malformata, ci dovrebbe essere soltanto un trattino.",
        "es":"La consulta parece estar mal formada, sólo debe haber un guión.",
        "fr":"La requête semble être malformé, il devrait y avoir seulement un trait d'union.",
        "de":"Die Query-String erscheint ungültiger werden, es sollte nur ein Strich sein.",
        "pt":"Você parece ter uma string de consulta malformada, deve haver apenas um traço."
      },
      "A verse in the query is out of bounds: there is no verse <{0}> in <{1}> chapter <{2}> in the requested version <{3}>, the last possible verse is {4}":{
        "en":"A verse in the query is out of bounds: there is no verse <{0}> in <{1}> chapter <{2}> in the requested version <{3}>, the last possible verse is {4}",
        "it":"Un versetto della query non è valido: non c'è un versetto <{0}> in <{1}> capitolo <{2}> nella versione richiesta <{3}>, l'ultimo possibile versetto è {4}",
        "es":"Un versículo de la consulta no es válido: no hay un versículo <{0}> en <{1}> capítulo <{2}> en la versión solicitada <{3}>, el último versículo que es posible es {4}",
        "fr":"Un verset de la requête ne est pas valide: il n'ya pas un verset <{0}> dans <{1}> chapitre <{2}> dans la Version sollicité <{3}>, le dernier verset qui est possible est {4}",
        "de":"Ein Vers der Abfrage ist ungültig: Es gibt nein Vers <{0}> in <{1}> Kapitel <{2}> zum der Version angefordert <{3}>, die letzte Strophe die ist möglich, ist <{4}>",
        "pt":"Um verso na consulta está fora dos limites: não há verso <{0}> no <{1}> capítulo <{2}> na versão solicitada <{3}>, o último verso possível é {4}"
      },
      "the values chained by the dot must be consecutive, instead {0} >= {1} in the expression <{2}>":{
        "en":"the values chained by the dot must be consecutive, instead {0} >= {1} in the expression <{2}>",
        "it":"i valori concatenati dal punto devono essere consecutivi, invece {0} >= {1} nell'espressione <{2}>",
        "es":"los valores encadenados por el punto deben ser consecutivos, mientras {0} >= {1} en la expresión <{2}>",
        "fr":"les valeurs enchaînés par le point doivent être consécutives, tandis que {0}> = {1} dans l'expression <{2}>",
        "de":"die Werte durch die Punkt-Strich müssen fortlaufend sein, anstatt {0} >= {1} in dem Ausdruck <{2}>",
        "pt":"os valores encadeados pelo ponto devem ser consecutivos; em vez disso, {0} >= {1} na expressão <{2}>"
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
				"de":"Afrikaans",
                "pt":"Afrikaans"
		},
		"Albanian":{
				"en":"Albanian",
				"it":"Albanese",
				"es":"Albanés",
				"fr":"Albanais",
				"de":"Albanisch",
                "pt":"Albanês"
		},
		"Arabic":{
				"en":"Arabic",
				"it":"Arabo",
				"es":"Árabe",
				"fr":"Arabe",
				"de":"Arabisch",
                "pt":"Árabe"
		},
		"Chinese":{
				"en":"Chinese",
				"it":"Cinese",
				"es":"Chino",
				"fr":"Chinois",
				"de":"Chinesische",
                "pt":"Chinês"
		},
		"Croatian":{
				"en":"Croatian",
				"it":"Croato",
				"es":"Croata",
				"fr":"Croate",
				"de":"Kroatisch",
                "pt":"Croata"
		},
		"Czech":{
				"en":"Czech",
				"it":"Ceco",
				"es":"Checo",
				"fr":"Tchèque",
				"de":"Tschechisch",
                "pt":"Tcheco"
		},
		"English":{
				"en":"English",
				"it":"Inglese",
				"es":"Inglés",
				"fr":"Anglais",
				"de":"Englisch",
                "pt":"Inglês"
		},
		"French":{
				"en":"French",
				"it":"Francese",
				"es":"Francés",
				"fr":"Français",
				"de":"Französisch",
                "pt":"Francês"
		},
		"German":{
				"en":"German",
				"it":"Tedesco",
				"es":"Alemán",
				"fr":"Allemand",
				"de":"Deutsch",
                "pt":"Alemão"
		},
		"Greek":{
				"en":"Greek",
				"it":"Greco",
				"es":"Griego",
				"fr":"Grec",
				"de":"Griechisch",
                "pt":"Grego"
		},
		"Hungarian":{
				"en":"Hungarian",
				"it":"Ungherese",
				"es":"Húngaro",
				"fr":"Hongrois",
				"de":"Ungarisch",
                "pt":"Húngaro"
		},
		"Italian":{
				"en":"Italian",
				"it":"Italiano",
				"es":"Italiano",
				"fr":"Italien",
				"de":"Italienisch",
                "pt":"Italiano"
		},
		"Japanese":{
				"en":"Japanese",
				"it":"Giapponese",
				"es":"Japonés",
				"fr":"Japonais",
				"de":"Japanisch",
                "pt":"Japonês"
		},
		"Korean":{
				"en":"Korean",
				"it":"Coreano",
				"es":"Coreano",
				"fr":"Coréen",
				"de":"Koreanisch",
                "pt":"Coreano"
		},
		"Latin":{
				"en":"Latin",
				"it":"Latino",
				"es":"Latín",
				"fr":"Latin",
				"de":"Lateinisch",
                "pt":"Latim"
		},
		"Polish":{
				"en":"Polish",
				"it":"Polacco",
				"es":"Polaco",
				"fr":"Polonais",
				"de":"Russisch",
                "pt":"Polonês"
		},
		"Portuguese":{
				"en":"Portuguese",
				"it":"Portoghese",
				"es":"Portugués",
				"fr":"Portugais",
				"de":"Portugiesisch",
                "pt":"Português"
		},
		"Romanian":{
				"en":"Romanian",
				"it":"Rumeno",
				"es":"Rumano",
				"fr":"Roumain",
				"de":"Rumänischen",
                "pt":"Romena"
		},
		"Russian":{
				"en":"Russian",
				"it":"Russo",
				"es":"Ruso",
				"fr":"Russe",
				"de":"Russisch",
                "pt":"Russo"
		},
		"Spanish":{
				"en":"Spanish",
				"it":"Spagnolo",
				"es":"Español",
				"fr":"Espagnol",
				"de":"Spanisch",
                "pt":"Espanhol"
		},
		"Tagalog":{
				"en":"Tagalog",
				"it":"Tagalog",
				"es":"Tagalo",
				"fr":"Tagalog",
				"de":"Tagalog",
                "pt":"Tagalo"
		},
		"Tamil":{
				"en":"Tamil",
				"it":"Tamil",
				"es":"Tamil",
				"fr":"Tamoul",
				"de":"Tamilisch",
                "pt":"Tâmil"
		},
		"Thai":{
				"en":"Thai",
				"it":"Thai",
				"es":"Thai",
				"fr":"Thaï",
				"de":"Thailändisch",
                "pt":"Tailandês"
		},
		"Vietnamese":{
				"en":"Vietnamese",
				"it":"Vietnamita",
				"es":"Vietnamita",
				"fr":"Vietnamien",
				"de":"Vietnamesisch",
                "pt":"Vietnamita"
		}
},
    ISOcodeFromLang = {"Afrikaans":"af","Akan":"ak","Albanian":"sq","Amharic":"am","Arabic":"ar","Armenian":"hy","Azerbaijani":"az","Basque":"eu","Belarusian":"be","Bengali":"bn","Bihari":"bh","Bosnian":"bs","Breton":"br","Bulgarian":"bg","Cambodian":"km","Catalan":"ca","Chichewa":"ny","Chinese":"zh","Corsican":"co","Croatian":"hr","Czech":"cs","Danish":"da","Dutch":"nl","English":"en","Esperanto":"eo","Estonian":"et","Faroese":"fo","Filipino":"tl","Finnish":"fi","French":"fr","Frisian":"fy","Galician":"gl","Georgian":"ka","German":"de","Greek":"el","Guarani":"gn","Gujarati":"gu","Haitian Creole":"ht","Hausa":"ha","Hebrew":"iw","Hindi":"hi","Hungarian":"hu","Icelandic":"is","Igbo":"ig","Indonesian":"id","Interlingua":"ia","Irish":"ga","Italian":"it","Japanese":"ja","Javanese":"jw","Kannada":"kn","Kazakh":"kk","Kinyarwanda":"rw","Kirundi":"rn","Kongo":"kg","Korean":"ko","Kurdish":"ku","Kyrgyz":"ky","Laothian":"lo","Latin":"la","Latvian":"lv","Lingala":"ln","Lithuanian":"lt","Luganda":"lg","Macedonian":"mk","Malagasy":"mg","Malay":"ms","Malayalam":"ml","Maltese":"mt","Maori":"mi","Marathi":"mr","Moldavian":"mo","Mongolian":"mn","Nepali":"ne","Norwegian":"no","Occitan":"oc","Oriya":"or","Oromo":"om","Pashto":"ps","Persian":"fa","Polish":"pl","Portuguese":"pt","Punjabi":"pa","Quechua":"qu","Romanian":"ro","Romansh":"rm","Russian":"ru","Scots Gaelic":"gd","Serbian":"sr","Serbo-Croatian":"sh","Sesotho":"st","Setswana":"tn","Shona":"sn","Sindhi":"sd","Sinhalese":"si","Slovak":"sk","Slovenian":"sl","Somali":"so","Spanish":"es","Sundanese":"su","Swahili":"sw","Swedish":"sv","Tajik":"tg","Tamil":"ta","Tatar":"tt","Telugu":"te","Thai":"th","Tigrinya":"ti","Tonga":"to","Turkish":"tr","Turkmen":"tk","Twi":"tw","Uighur":"ug","Ukrainian":"uk","Urdu":"ur","Uzbek":"uz","Vietnamese":"vi","Welsh":"cy","Wolof":"wo","Xhosa":"xh","Yiddish":"yi","Yoruba":"yo","Zulu":"zu"};
