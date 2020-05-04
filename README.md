# BibleGet-Google-Docs-Addin
Google Docs Add-on for the BibleGet I/O Project

The BibleGet I/O service is allows developers to submit complex queries for Scripture Quotations and receive in return structured data in various formats, the default being JSON. There are published online Bibles, but not services that give structured data responses; or if there are a few such services, they do not however accept complex queries. BibleGet I/O service wishes to provide such functionality.

The BibleGet I/O service (https://www.bibleget.io) supports multiple versions of the Bible. It currently has the Italian version “CEI 2008” as can be found at http://www.bibbiaedu.it, the Italian “Luzzi / Riveduta” version, and the Latin version “Nova Vulgata Bibliorum Sacrorum Editio”.

A Google Docs add-on is the perfect example for a utilization of this service. The “BibleGet I/O” add-on let’s you insert Bible quotes into your document using standard Bible citation queries.

The BibleGet I/O service and it’s Google Docs plugin can understand either of two bible citation notations:
the european format, where a “comma” is the chapter-verse separator, a “dot” is a verse-then-verse separator, and a “dash” is a from-to separator (either for “chapter to chapter”, or “chapter-verse to verse”, or “chapter-verse to chapter-verse”), and a “semi-colon” is a query separator. When there is no book indication at the beginning of a query following a semi-colon, it is intended that the previous book is continued.
the english format, where a “colon” is the chapter-verse separator, a “comma” is a verse-then-verse separator, and a “dash” is again a from-to separator (similarly to the european format); also the semi-colon is similarly a query separator.

Here’s an example: select the following query, open the BibleGet sidebar, and paste the query into the Search box. Click on the Search button. The bible quotations will be retrieved from the server. Make sure you have set your preferred formatting in the Format tab, then when you’re ready click on “Insert into the Document”. The scripture quotes will be inserted at the start of the line of the current cursor position.

Mt5,1-3.7-9;7,4-7;9,15;Mc3,5;Gv1,1;3,5-7

The same query can be formed just so:

Mt5:1-3,7-9;7:4-7;9:15;Mc3:5;Gv1:1;3:5-7

If you have any feedback for bugs that you may have found in the BibleGet I/O service, or for suggestions in making it and the scripts and apps that use it any better, you can send me an email using the “Send Feedback” option in the BibleGet menu.

_______

POST-INSTALL TIP
Insert a quote from the Bible into your document. First set your preferred styles using “Add-ons > BibleGet I/O > Settings”, then go to “Add-ons > BibleGet I/O > Start” where you can type in your desired scripture reference and click on “Get”. The text of the Bible quote will be injected into your document at the current cursor position with the preferred stylings you set previously.
Inserisci una citazione biblica nel tuo documento. Prima imposta la formattazione desiderata da “Componenti aggiuntivi > BibleGet I/O > Preferenze”. Poi apri la barra laterale da “Componenti aggiuntivi > BibleGet I/O > Avvia”. Scrivi la citazione desiderata e fai clic su “Inserisci”, il testo della citazione verrà inserito nel documento alla posizione attuale del puntatore.

TEXT DESCRIPTION
“BibleGet I/O” allows you to easily and quickly insert Bible quotes into your document, using standard Bible citation notation. Even complex citations with multiple book, verse and chapter ranges can be obtained.
“BibleGet I/O” ti permette di effettuare citazioni bibliche nel tuo documento con facilità e rapidità, usando la notazione biblica standard. Si possono effettuare anche citazioni multiple e complesse.
