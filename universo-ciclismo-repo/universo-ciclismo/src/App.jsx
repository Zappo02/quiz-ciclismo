import { useState, useEffect, useRef, useMemo } from "react";

// ── DATABASE ────────────────────────────────────────────────────────────
const DB = [
  { name:"Ballerstedt Maurice", surname:"Maurice", team:"Alpecin-Premier Tech", nation:"Germania", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Bayer Tobias", surname:"Tobias", team:"Alpecin-Premier Tech", nation:"Austria", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Belmans Lennert", surname:"Lennert", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Busatto Francesco", surname:"Francesco", team:"Alpecin-Premier Tech", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"De Vylder Lindsay", surname:"Lindsay", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Debruyne Ramses", surname:"Ramses", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Dehairs Simon", surname:"Simon", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Del Grosso Tibor", surname:"Tibor", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Dillier Silvan", surname:"Silvan", team:"Alpecin-Premier Tech", nation:"Svizzera", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Dockx Aaron", surname:"Aaron", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Geens Jonas", surname:"Jonas", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Glivar Gal", surname:"Gal", team:"Alpecin-Premier Tech", nation:"Slovenia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Gogl Michael", surname:"Michael", team:"Alpecin-Premier Tech", nation:"Austria", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Groves Kaden", surname:"Kaden", team:"Alpecin-Premier Tech", nation:"Australia", continent:"Oceania", age:27, uciPts:1420, uciRank:51 },
  { name:"Houle Hugo", surname:"Hugo", team:"Alpecin-Premier Tech", nation:"Canada", continent:"Nord America", age:35, uciPts:0, uciRank:0 },
  { name:"Marsman Tim", surname:"Tim", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Philipsen Jasper", surname:"Jasper", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:28, uciPts:2438, uciRank:17 },
  { name:"Planckaert Edward", surname:"Edward", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Plowright Jensen", surname:"Jensen", team:"Alpecin-Premier Tech", nation:"Australia", continent:"Oceania", age:25, uciPts:0, uciRank:0 },
  { name:"Price-Pejtersen Johan", surname:"Johan", team:"Alpecin-Premier Tech", nation:"Danimarca", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Remijn Senna", surname:"Senna", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Rickaert Jonas", surname:"Jonas", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Riesebeek Oscar", surname:"Oscar", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Sénéchal Florian", surname:"Florian", team:"Alpecin-Premier Tech", nation:"Francia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Sentjens Sente", surname:"Sente", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Thijssen Gerben", surname:"Gerben", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Uhlig Henri", surname:"Henri", team:"Alpecin-Premier Tech", nation:"Germania", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"van der Poel Mathieu", surname:"Mathieu", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:31, uciPts:3838, uciRank:8 },
  { name:"Vergallito Luca", surname:"Luca", team:"Alpecin-Premier Tech", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Verstrynge Emiel", surname:"Emiel", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Arndt Nikias", surname:"Nikias", team:"Bahrain Victorious", nation:"Germania", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Bauhaus Phil", surname:"Phil", team:"Bahrain Victorious", nation:"Germania", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Bilbao Pello", surname:"Pello", team:"Bahrain Victorious", nation:"Spagna", continent:"Europa", age:36, uciPts:1078, uciRank:74 },
  { name:"Borgo Alessandro", surname:"Alessandro", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Bruttomesso Alberto", surname:"Alberto", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Buitrago Santiago", surname:"Santiago", team:"Bahrain Victorious", nation:"Colombia", continent:"Sud America", age:26, uciPts:1077, uciRank:75 },
  { name:"Caruso Damiano", surname:"Damiano", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:38, uciPts:871, uciRank:95 },
  { name:"Ermakov Roman", surname:"Roman", team:"Bahrain Victorious", nation:"Russia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Erzen Zak", surname:"Zak", team:"Bahrain Victorious", nation:"Slovenia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Eulalio Afonso", surname:"Afonso", team:"Bahrain Victorious", nation:"Portogallo", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Govekar Matevz", surname:"Matevz", team:"Bahrain Victorious", nation:"Slovenia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Gradek Kamil", surname:"Kamil", team:"Bahrain Victorious", nation:"Polonia", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Kepplinger Rainer", surname:"Rainer", team:"Bahrain Victorious", nation:"Austria", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Martinez Lenny", surname:"Lenny", team:"Bahrain Victorious", nation:"Francia", continent:"Europa", age:22, uciPts:1873, uciRank:31 },
  { name:"Miholjevic Fran", surname:"Fran", team:"Bahrain Victorious", nation:"Croazia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Miquel Delgado Pau", surname:"Pau", team:"Bahrain Victorious", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Mohoric Matej", surname:"Matej", team:"Bahrain Victorious", nation:"Slovenia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Omrzel Jakob", surname:"Jakob", team:"Bahrain Victorious", nation:"Slovenia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Paasschens Mathijs", surname:"Mathijs", team:"Bahrain Victorious", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Segaert Alec", surname:"Alec", team:"Bahrain Victorious", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Skerl Daniel", surname:"Daniel", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Stannard Robert", surname:"Robert", team:"Bahrain Victorious", nation:"Australia", continent:"Oceania", age:27, uciPts:0, uciRank:0 },
  { name:"Stockwell Oliver", surname:"Oliver", team:"Bahrain Victorious", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Tiberi Antonio", surname:"Antonio", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:24, uciPts:1109, uciRank:69 },
  { name:"Valter Attila", surname:"Attila", team:"Bahrain Victorious", nation:"Ungheria", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"van der Meulen Max", surname:"Max", team:"Bahrain Victorious", nation:"Olanda", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Van Mechelen Vlad", surname:"Vlad", team:"Bahrain Victorious", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Zambanini Edoardo", surname:"Edoardo", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Benoot Tiesj", surname:"Tiesj", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:32, uciPts:1295, uciRank:54 },
  { name:"Bisiaux Léo", surname:"Léo", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Bissegger Stefan", surname:"Stefan", team:"Decathlon CMA CGM Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Bol Cees", surname:"Cees", team:"Decathlon CMA CGM Team", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Chamberlain Oscar", surname:"Oscar", team:"Decathlon CMA CGM Team", nation:"Australia", continent:"Oceania", age:21, uciPts:0, uciRank:0 },
  { name:"De Pestel Sander", surname:"Sander", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Dewulf Stan", surname:"Stan", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Gall Felix", surname:"Felix", team:"Decathlon CMA CGM Team", nation:"Austria", continent:"Europa", age:28, uciPts:2216, uciRank:22 },
  { name:"Gautherat Pierre", surname:"Pierre", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Ghys Robbe", surname:"Robbe", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Gudmestad Tord", surname:"Tord", team:"Decathlon CMA CGM Team", nation:"Norvegia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Hoole Daan", surname:"Daan", team:"Decathlon CMA CGM Team", nation:"Olanda", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Isidore Noa", surname:"Noa", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Kooij Olav", surname:"Olav", team:"Decathlon CMA CGM Team", nation:"Olanda", continent:"Europa", age:24, uciPts:2123, uciRank:26 },
  { name:"L'Hote Antoine", surname:"Antoine", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Labrosse Jordan", surname:"Jordan", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Lapeira Paul", surname:"Paul", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Lund Andresen Tobias", surname:"Tobias", team:"Decathlon CMA CGM Team", nation:"Danimarca", continent:"Europa", age:23, uciPts:1252, uciRank:57 },
  { name:"Mühlberger Gregor", surname:"Gregor", team:"Decathlon CMA CGM Team", nation:"Austria", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Naesen Oliver", surname:"Oliver", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Paret-Peintre Aurélien", surname:"Aurélien", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Pedersen Rasmus Søjberg", surname:"Søjberg", team:"Decathlon CMA CGM Team", nation:"Danimarca", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Pollefliet Gianluca", surname:"Gianluca", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Prodhomme Nicolas", surname:"Nicolas", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:29, uciPts:1108, uciRank:70 },
  { name:"Riccitello Matthew", surname:"Matthew", team:"Decathlon CMA CGM Team", nation:"USA", continent:"Nord America", age:24, uciPts:1019, uciRank:78 },
  { name:"Scotson Callum", surname:"Callum", team:"Decathlon CMA CGM Team", nation:"Australia", continent:"Oceania", age:29, uciPts:0, uciRank:0 },
  { name:"Seixas Paul", surname:"Paul", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:19, uciPts:1128, uciRank:67 },
  { name:"Staune-Mittet Johannes", surname:"Johannes", team:"Decathlon CMA CGM Team", nation:"Norvegia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Agostinacchio Mattia", surname:"Mattia", team:"EF Education-EasyPost", nation:"Italia", continent:"Europa", age:18, uciPts:0, uciRank:0 },
  { name:"Albanese Vincenzo", surname:"Vincenzo", team:"EF Education-EasyPost", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Asgreen Kasper", surname:"Kasper", team:"EF Education-EasyPost", nation:"Danimarca", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Battistella Samuele", surname:"Samuele", team:"EF Education-EasyPost", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Baudin Alex", surname:"Alex", team:"EF Education-EasyPost", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Beloki Markel", surname:"Markel", team:"EF Education-EasyPost", nation:"Spagna", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Carapaz Richard", surname:"Richard", team:"EF Education-EasyPost", nation:"Ecuador", continent:"Sud America", age:32, uciPts:1807, uciRank:33 },
  { name:"Cepeda Alexander", surname:"Alexander", team:"EF Education-EasyPost", nation:"Ecuador", continent:"Sud America", age:27, uciPts:0, uciRank:0 },
  { name:"Healy Ben", surname:"Ben", team:"EF Education-EasyPost", nation:"Irlanda", continent:"Europa", age:25, uciPts:2742, uciRank:13 },
  { name:"Hobbs Noah", surname:"Noah", team:"EF Education-EasyPost", nation:"Regno Unito", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Honore Mikkel", surname:"Mikkel", team:"EF Education-EasyPost", nation:"Danimarca", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Lamperti Luke", surname:"Luke", team:"EF Education-EasyPost", nation:"USA", continent:"Nord America", age:23, uciPts:0, uciRank:0 },
  { name:"Leonard Michael", surname:"Michael", team:"EF Education-EasyPost", nation:"Canada", continent:"Nord America", age:22, uciPts:0, uciRank:0 },
  { name:"Mackellar Alastair", surname:"Alastair", team:"EF Education-EasyPost", nation:"Australia", continent:"Oceania", age:24, uciPts:0, uciRank:0 },
  { name:"Mihkels Madis", surname:"Madis", team:"EF Education-EasyPost", nation:"Estonia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Nerurkar Lukas", surname:"Lukas", team:"EF Education-EasyPost", nation:"Regno Unito", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Powless Neilson", surname:"Neilson", team:"EF Education-EasyPost", nation:"USA", continent:"Nord America", age:29, uciPts:1610, uciRank:39 },
  { name:"Quinn Sean", surname:"Sean", team:"EF Education-EasyPost", nation:"USA", continent:"Nord America", age:25, uciPts:0, uciRank:0 },
  { name:"Rafferty Darren", surname:"Darren", team:"EF Education-EasyPost", nation:"Irlanda", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Ryan Archie", surname:"Archie", team:"EF Education-EasyPost", nation:"Irlanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Schwarzbacher Matthias", surname:"Matthias", team:"EF Education-EasyPost", nation:"Slovacchia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Shaw James", surname:"James", team:"EF Education-EasyPost", nation:"Regno Unito", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Simmons Colby", surname:"Colby", team:"EF Education-EasyPost", nation:"USA", continent:"Nord America", age:22, uciPts:0, uciRank:0 },
  { name:"Steinhauser Georg", surname:"Georg", team:"EF Education-EasyPost", nation:"Germania", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Sweeny Harry", surname:"Harry", team:"EF Education-EasyPost", nation:"Australia", continent:"Oceania", age:27, uciPts:0, uciRank:0 },
  { name:"Valgren Michael", surname:"Michael", team:"EF Education-EasyPost", nation:"Danimarca", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"van den Berg Marijn", surname:"Marijn", team:"EF Education-EasyPost", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Van Der Lee Jardi", surname:"Jardi", team:"EF Education-EasyPost", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Walker Max", surname:"Max", team:"EF Education-EasyPost", nation:"Regno Unito", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Barthe Cyril", surname:"Cyril", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Berthet Clément", surname:"Clément", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Bower Lewis", surname:"Lewis", team:"Groupama-FDJ United", nation:"Nuova Zelanda", continent:"Oceania", age:21, uciPts:0, uciRank:0 },
  { name:"Braz Afonso Clément", surname:"Clément", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Cavagna Remi", surname:"Remi", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Costiou Ewen", surname:"Ewen", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Decomble Maxime", surname:"Maxime", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Donnenwirth Tom", surname:"Tom", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Fontaine Titouan", surname:"Titouan", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Gaudu David", surname:"David", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Geniets Kevin", surname:"Kevin", team:"Groupama-FDJ United", nation:"Lussemburgo", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Germani Lorenzo", surname:"Lorenzo", team:"Groupama-FDJ United", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Grégoire Romain", surname:"Romain", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:23, uciPts:1790, uciRank:34 },
  { name:"Gruel Thibaud", surname:"Thibaud", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Huens Axel", surname:"Axel", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Jacobs Johan", surname:"Johan", team:"Groupama-FDJ United", nation:"Svizzera", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Kench Josh", surname:"Josh", team:"Groupama-FDJ United", nation:"Nuova Zelanda", continent:"Oceania", age:24, uciPts:0, uciRank:0 },
  { name:"Le Gac Olivier", surname:"Olivier", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Madouas Valentin", surname:"Valentin", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Martin-Guyonnet Guillaume", surname:"Guillaume", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Milan Matteo", surname:"Matteo", team:"Groupama-FDJ United", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Molard Rudy", surname:"Rudy", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Pacher Quentin", surname:"Quentin", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Paleni Enzo", surname:"Enzo", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Penhoët Paul", surname:"Paul", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Rochas Rémy", surname:"Rémy", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Rolland Brieuc", surname:"Brieuc", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Russo Clément", surname:"Clément", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Tronchon Bastien", surname:"Bastien", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Arensman Thymen", surname:"Thymen", team:"INEOS Grenadiers", nation:"Olanda", continent:"Europa", age:26, uciPts:1548, uciRank:41 },
  { name:"August AJ", surname:"AJ", team:"INEOS Grenadiers", nation:"USA", continent:"Nord America", age:20, uciPts:0, uciRank:0 },
  { name:"Bernal Egan", surname:"Egan", team:"INEOS Grenadiers", nation:"Colombia", continent:"Sud America", age:29, uciPts:1742, uciRank:36 },
  { name:"De Plus Laurens", surname:"Laurens", team:"INEOS Grenadiers", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Foss Tobias", surname:"Tobias", team:"INEOS Grenadiers", nation:"Norvegia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Ganna Filippo", surname:"Filippo", team:"INEOS Grenadiers", nation:"Italia", continent:"Europa", age:29, uciPts:2152, uciRank:24 },
  { name:"Godon Dorian", surname:"Dorian", team:"INEOS Grenadiers", nation:"Francia", continent:"Europa", age:29, uciPts:1069, uciRank:76 },
  { name:"Haig Jack", surname:"Jack", team:"INEOS Grenadiers", nation:"Australia", continent:"Oceania", age:32, uciPts:0, uciRank:0 },
  { name:"Hamilton Lucas", surname:"Lucas", team:"INEOS Grenadiers", nation:"Australia", continent:"Oceania", age:30, uciPts:0, uciRank:0 },
  { name:"Heiduk Kim", surname:"Kim", team:"INEOS Grenadiers", nation:"Germania", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Jungels Bob", surname:"Bob", team:"INEOS Grenadiers", nation:"Lussemburgo", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Kwiatkowski Michal", surname:"Michal", team:"INEOS Grenadiers", nation:"Polonia", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Langellotti Victor", surname:"Victor", team:"INEOS Grenadiers", nation:"Monaco", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Laurance Axel", surname:"Axel", team:"INEOS Grenadiers", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Onley Oscar", surname:"Oscar", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:23, uciPts:2910, uciRank:9 },
  { name:"Rivera Brandon", surname:"Brandon", team:"INEOS Grenadiers", nation:"Colombia", continent:"Sud America", age:30, uciPts:0, uciRank:0 },
  { name:"Rodriguez Carlos", surname:"Carlos", team:"INEOS Grenadiers", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Rodríguez Óscar", surname:"Óscar", team:"INEOS Grenadiers", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Sheffield Magnus", surname:"Magnus", team:"INEOS Grenadiers", nation:"USA", continent:"Nord America", age:23, uciPts:904, uciRank:92 },
  { name:"Shmidt Artem", surname:"Artem", team:"INEOS Grenadiers", nation:"USA", continent:"Nord America", age:22, uciPts:0, uciRank:0 },
  { name:"Svestad-Bårdseng Embret", surname:"Embret", team:"INEOS Grenadiers", nation:"Norvegia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Swift Ben", surname:"Ben", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:38, uciPts:0, uciRank:0 },
  { name:"Swift Connor", surname:"Connor", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Tarling Joshua", surname:"Joshua", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Turner Ben", surname:"Ben", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Vauquelin Kévin", surname:"Kévin", team:"INEOS Grenadiers", nation:"Francia", continent:"Europa", age:24, uciPts:2459, uciRank:16 },
  { name:"Watson Sam", surname:"Sam", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:24, uciPts:894, uciRank:93 },
  { name:"Welsford Sam", surname:"Sam", team:"INEOS Grenadiers", nation:"Australia", continent:"Oceania", age:30, uciPts:0, uciRank:0 },
  { name:"Øxenberg Peter", surname:"Peter", team:"INEOS Grenadiers", nation:"Danimarca", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Ayuso Juan", surname:"Juan", team:"Lidl-Trek", nation:"Spagna", continent:"Europa", age:23, uciPts:2602, uciRank:14 },
  { name:"Bagioli Andrea", surname:"Andrea", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:27, uciPts:917, uciRank:90 },
  { name:"Bernard Julien", surname:"Julien", team:"Lidl-Trek", nation:"Francia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Ciccone Giulio", surname:"Giulio", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:31, uciPts:2752, uciRank:12 },
  { name:"Consonni Simone", surname:"Simone", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Gee-West Derek", surname:"Derek", team:"Lidl-Trek", nation:"Canada", continent:"Nord America", age:28, uciPts:1620, uciRank:38 },
  { name:"Geoghegan Hart Tao", surname:"Tao", team:"Lidl-Trek", nation:"Regno Unito", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Ghebreigzabhier Amanuel", surname:"Amanuel", team:"Lidl-Trek", nation:"Eritrea", continent:"Africa", age:31, uciPts:0, uciRank:0 },
  { name:"Konrad Patrick", surname:"Patrick", team:"Lidl-Trek", nation:"Austria", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Kragh Andersen Søren", surname:"Søren", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Kämna Lennard", surname:"Lennard", team:"Lidl-Trek", nation:"Germania", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Milan Jonathan", surname:"Jonathan", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:25, uciPts:2144, uciRank:25 },
  { name:"Mollema Bauke", surname:"Bauke", team:"Lidl-Trek", nation:"Olanda", continent:"Europa", age:39, uciPts:0, uciRank:0 },
  { name:"Mosca Jacopo", surname:"Jacopo", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Norsgaard Mathias Sunekær", surname:"Sunekær", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Nys Thibau", surname:"Thibau", team:"Lidl-Trek", nation:"Belgio", continent:"Europa", age:23, uciPts:846, uciRank:98 },
  { name:"Oomen Sam", surname:"Sam", team:"Lidl-Trek", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Pedersen Mads", surname:"Mads", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:30, uciPts:5074, uciRank:4 },
  { name:"Simmons Quinn", surname:"Quinn", team:"Lidl-Trek", nation:"USA", continent:"Nord America", age:24, uciPts:1280, uciRank:55 },
  { name:"Skjelmose Mattias", surname:"Mattias", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:25, uciPts:2254, uciRank:21 },
  { name:"Skujins Toms", surname:"Toms", team:"Lidl-Trek", nation:"Lettonia", continent:"Europa", age:34, uciPts:1091, uciRank:72 },
  { name:"Sobrero Matteo", surname:"Matteo", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Söderqvist Jakob", surname:"Jakob", team:"Lidl-Trek", nation:"Svezia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Teutenberg Tim Torn", surname:"Torn", team:"Lidl-Trek", nation:"Germania", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Theuns Edward", surname:"Edward", team:"Lidl-Trek", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Vacek Mathias", surname:"Mathias", team:"Lidl-Trek", nation:"Rep. Ceca", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Vergaerde Otto", surname:"Otto", team:"Lidl-Trek", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Verona Carlos", surname:"Carlos", team:"Lidl-Trek", nation:"Spagna", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Walscheid Max", surname:"Max", team:"Lidl-Trek", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Withen Philipsen Albert", surname:"Albert", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Aerts Toon", surname:"Toon", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Artz Huub", surname:"Huub", team:"Lotto-Intermarché", nation:"Olanda", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Berckmoes Jenno", surname:"Jenno", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Beullens Cédric", surname:"Cédric", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Braet Vito", surname:"Vito", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Craps Lars", surname:"Lars", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"De Buyst Jasper", surname:"Jasper", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"De Lie Arnaud", surname:"Arnaud", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:24, uciPts:2781, uciRank:11 },
  { name:"De Schuyteneer Steffen", surname:"Steffen", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Fox Matthew", surname:"Matthew", team:"Lotto-Intermarché", nation:"Australia", continent:"Oceania", age:23, uciPts:0, uciRank:0 },
  { name:"Giddings Joshua", surname:"Joshua", team:"Lotto-Intermarché", nation:"Regno Unito", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Grignard Sébastien", surname:"Sébastien", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Grisel Matys", surname:"Matys", team:"Lotto-Intermarché", nation:"Francia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Gualdi Simone", surname:"Simone", team:"Lotto-Intermarché", nation:"Italia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Kockelmann Mathieu", surname:"Mathieu", team:"Lotto-Intermarché", nation:"Lussemburgo", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Menten Milan", surname:"Milan", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Orins Robin", surname:"Robin", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Rota Lorenzo", surname:"Lorenzo", team:"Lotto-Intermarché", nation:"Italia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Rutsch Jonas", surname:"Jonas", team:"Lotto-Intermarché", nation:"Germania", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Slock Liam", surname:"Liam", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Taminiaux Lionel", surname:"Lionel", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Thompson Reuben", surname:"Reuben", team:"Lotto-Intermarché", nation:"Nuova Zelanda", continent:"Oceania", age:25, uciPts:0, uciRank:0 },
  { name:"Van Boven Luca", surname:"Luca", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"van der Hoorn Taco", surname:"Taco", team:"Lotto-Intermarché", nation:"Olanda", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Van Eetvelt Lennert", surname:"Lennert", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"van Sintmaartensdijk Roel", surname:"Roel", team:"Lotto-Intermarché", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Veistroffer Baptiste", surname:"Baptiste", team:"Lotto-Intermarché", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Widar Jarno", surname:"Jarno", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Zimmermann Georg", surname:"Georg", team:"Lotto-Intermarché", nation:"Germania", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Ørn-Kristoff Felix", surname:"Felix", team:"Lotto-Intermarché", nation:"Norvegia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Adrià Roger", surname:"Roger", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Arcas Jorge", surname:"Jorge", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Aular Orluis", surname:"Orluis", team:"Movistar Team", nation:"Venezuela", continent:"Sud America", age:29, uciPts:1155, uciRank:65 },
  { name:"Barrenetxea Jon", surname:"Jon", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Canal Carlos", surname:"Carlos", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Castrillo Pablo", surname:"Pablo", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Cepeda Jefferson", surname:"Jefferson", team:"Movistar Team", nation:"Ecuador", continent:"Sud America", age:30, uciPts:0, uciRank:0 },
  { name:"Formolo Davide", surname:"Davide", team:"Movistar Team", nation:"Italia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"García Raúl", surname:"Raúl", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"García Cortina Iván", surname:"Iván", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Heßmann Michel", surname:"Michel", team:"Movistar Team", nation:"Germania", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Lopez Juan Pedro", surname:"Pedro", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Maciejuk Filip", surname:"Filip", team:"Movistar Team", nation:"Polonia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Mas Enric", surname:"Enric", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:31, uciPts:1021, uciRank:77 },
  { name:"Milesi Lorenzo", surname:"Lorenzo", team:"Movistar Team", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Moro Manlio", surname:"Manlio", team:"Movistar Team", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Novak Pavel", surname:"Pavel", team:"Movistar Team", nation:"Rep. Ceca", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Oliveira Nelson", surname:"Nelson", team:"Movistar Team", nation:"Portogallo", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"Pescador Diego", surname:"Diego", team:"Movistar Team", nation:"Colombia", continent:"Sud America", age:21, uciPts:0, uciRank:0 },
  { name:"Quintana Nairo", surname:"Nairo", team:"Movistar Team", nation:"Colombia", continent:"Sud America", age:36, uciPts:0, uciRank:0 },
  { name:"Romeo Iván", surname:"Iván", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Romo Javier", surname:"Javier", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:27, uciPts:1089, uciRank:73 },
  { name:"Rubio Einer", surname:"Einer", team:"Movistar Team", nation:"Colombia", continent:"Sud America", age:28, uciPts:0, uciRank:0 },
  { name:"Sanchez Pelayo", surname:"Pelayo", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Serrano Gonzalo", surname:"Gonzalo", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Tesfazion Natnael", surname:"Natnael", team:"Movistar Team", nation:"Eritrea", continent:"Africa", age:26, uciPts:0, uciRank:0 },
  { name:"Torres Albert", surname:"Albert", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Uijtdebroeks Cian", surname:"Cian", team:"Movistar Team", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Askey Lewis", surname:"Lewis", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Bennett George", surname:"George", team:"NS CYCLING TEAM", nation:"Nuova Zelanda", continent:"Oceania", age:35, uciPts:0, uciRank:0 },
  { name:"Blackmore Joe", surname:"Joe", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Boivin Guillaume", surname:"Guillaume", team:"NS CYCLING TEAM", nation:"Canada", continent:"Nord America", age:36, uciPts:0, uciRank:0 },
  { name:"Côté Pier-André", surname:"Pier-André", team:"NS CYCLING TEAM", nation:"Canada", continent:"Nord America", age:28, uciPts:0, uciRank:0 },
  { name:"Einhorn Itamar", surname:"Itamar", team:"NS CYCLING TEAM", nation:"Israele", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Frigo Marco", surname:"Marco", team:"NS CYCLING TEAM", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Gilmore Brady", surname:"Brady", team:"NS CYCLING TEAM", nation:"Australia", continent:"Oceania", age:24, uciPts:0, uciRank:0 },
  { name:"Girmay Biniam", surname:"Biniam", team:"NS CYCLING TEAM", nation:"Eritrea", continent:"Africa", age:25, uciPts:1646, uciRank:37 },
  { name:"Hirt Jan", surname:"Jan", team:"NS CYCLING TEAM", nation:"Rep. Ceca", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Hofstetter Hugo", surname:"Hugo", team:"NS CYCLING TEAM", nation:"Francia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Kogut Oded", surname:"Oded", team:"NS CYCLING TEAM", nation:"Israele", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Louvel Matis", surname:"Matis", team:"NS CYCLING TEAM", nation:"Francia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Lutsenko Alexey", surname:"Alexey", team:"NS CYCLING TEAM", nation:"Kazakistan", continent:"Asia", age:33, uciPts:0, uciRank:0 },
  { name:"Martí Pau", surname:"Pau", team:"NS CYCLING TEAM", nation:"Spagna", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Mullen Ryan", surname:"Ryan", team:"NS CYCLING TEAM", nation:"Irlanda", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Neilands Krists", surname:"Krists", team:"NS CYCLING TEAM", nation:"Lettonia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Pinarello Alessandro", surname:"Alessandro", team:"NS CYCLING TEAM", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Raisberg Nadav", surname:"Nadav", team:"NS CYCLING TEAM", nation:"Israele", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Schultz Nick", surname:"Nick", team:"NS CYCLING TEAM", nation:"Australia", continent:"Oceania", age:31, uciPts:0, uciRank:0 },
  { name:"Sheehan Riley", surname:"Riley", team:"NS CYCLING TEAM", nation:"USA", continent:"Nord America", age:25, uciPts:0, uciRank:0 },
  { name:"Smith Dion", surname:"Dion", team:"NS CYCLING TEAM", nation:"Nuova Zelanda", continent:"Oceania", age:33, uciPts:0, uciRank:0 },
  { name:"Stewart Jake", surname:"Jake", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Strong Corbin", surname:"Corbin", team:"NS CYCLING TEAM", nation:"Nuova Zelanda", continent:"Oceania", age:25, uciPts:1450, uciRank:47 },
  { name:"Tene Rotem", surname:"Rotem", team:"NS CYCLING TEAM", nation:"Israele", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Van Asbroeck Tom", surname:"Tom", team:"NS CYCLING TEAM", nation:"Belgio", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Van Tricht Floris", surname:"Floris", team:"NS CYCLING TEAM", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Vernon Ethan", surname:"Ethan", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Williams Stephen", surname:"Stephen", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Aleotti Giovanni", surname:"Giovanni", team:"Red Bull-BORA-hansgrohe", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Boichis Adrien", surname:"Adrien", team:"Red Bull-BORA-hansgrohe", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Cattaneo Mattia", surname:"Mattia", team:"Red Bull-BORA-hansgrohe", nation:"Italia", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Denz Nico", surname:"Nico", team:"Red Bull-BORA-hansgrohe", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Drizners Jarrad", surname:"Jarrad", team:"Red Bull-BORA-hansgrohe", nation:"Australia", continent:"Oceania", age:26, uciPts:0, uciRank:0 },
  { name:"Etxeberria Haimar", surname:"Haimar", team:"Red Bull-BORA-hansgrohe", nation:"Spagna", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Evenepoel Remco", surname:"Remco", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:26, uciPts:4118, uciRank:6 },
  { name:"Fisher-Black Finn", surname:"Finn", team:"Red Bull-BORA-hansgrohe", nation:"Nuova Zelanda", continent:"Oceania", age:24, uciPts:0, uciRank:0 },
  { name:"Hajek Alexander", surname:"Alexander", team:"Red Bull-BORA-hansgrohe", nation:"Austria", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Herzog Emil", surname:"Emil", team:"Red Bull-BORA-hansgrohe", nation:"Germania", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Hindley Jai", surname:"Jai", team:"Red Bull-BORA-hansgrohe", nation:"Australia", continent:"Oceania", age:29, uciPts:1540, uciRank:42 },
  { name:"Lipowitz Florian", surname:"Florian", team:"Red Bull-BORA-hansgrohe", nation:"Germania", continent:"Europa", age:25, uciPts:2552, uciRank:15 },
  { name:"Marit Arne", surname:"Arne", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Martinez Daniel", surname:"Daniel", team:"Red Bull-BORA-hansgrohe", nation:"Colombia", continent:"Sud America", age:29, uciPts:0, uciRank:0 },
  { name:"Meeus Jordi", surname:"Jordi", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:27, uciPts:1235, uciRank:59 },
  { name:"Moscon Gianni", surname:"Gianni", team:"Red Bull-BORA-hansgrohe", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Pellizzari Giulio", surname:"Giulio", team:"Red Bull-BORA-hansgrohe", nation:"Italia", continent:"Europa", age:22, uciPts:1473, uciRank:45 },
  { name:"Pithie Laurence", surname:"Laurence", team:"Red Bull-BORA-hansgrohe", nation:"Nuova Zelanda", continent:"Oceania", age:23, uciPts:0, uciRank:0 },
  { name:"Roglic Primoz", surname:"Primoz", team:"Red Bull-BORA-hansgrohe", nation:"Slovenia", continent:"Europa", age:36, uciPts:1856, uciRank:32 },
  { name:"Thornley Callum", surname:"Callum", team:"Red Bull-BORA-hansgrohe", nation:"Regno Unito", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Tratnik Jan", surname:"Jan", team:"Red Bull-BORA-hansgrohe", nation:"Slovenia", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Tuckwell Luke", surname:"Luke", team:"Red Bull-BORA-hansgrohe", nation:"Australia", continent:"Oceania", age:21, uciPts:0, uciRank:0 },
  { name:"van Dijke Mick", surname:"Mick", team:"Red Bull-BORA-hansgrohe", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"van Dijke Tim", surname:"Tim", team:"Red Bull-BORA-hansgrohe", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Van Gils Maxim", surname:"Maxim", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"van Poppel Danny", surname:"Danny", team:"Red Bull-BORA-hansgrohe", nation:"Olanda", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Vermeersch Gianni", surname:"Gianni", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Vlasov Aleksandr", surname:"Aleksandr", team:"Red Bull-BORA-hansgrohe", nation:"Russia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Wandahl Frederik", surname:"Frederik", team:"Red Bull-BORA-hansgrohe", nation:"Danimarca", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Zwiehoff Ben", surname:"Ben", team:"Red Bull-BORA-hansgrohe", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Bastiaens Ayco", surname:"Ayco", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Cras Steff", surname:"Steff", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Dainese Alberto", surname:"Alberto", team:"Soudal Quick-Step", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Eenkhoorn Pascal", surname:"Pascal", team:"Soudal Quick-Step", nation:"Olanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Garofoli Gianmarco", surname:"Gianmarco", team:"Soudal Quick-Step", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Gelders Gil", surname:"Gil", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Hayter Ethan", surname:"Ethan", team:"Soudal Quick-Step", nation:"Regno Unito", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Lampaert Yves", surname:"Yves", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Landa Mikel", surname:"Mikel", team:"Soudal Quick-Step", nation:"Spagna", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Lecerf Junior", surname:"Junior", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Magnier Paul", surname:"Paul", team:"Soudal Quick-Step", nation:"Francia", continent:"Europa", age:21, uciPts:2327, uciRank:19 },
  { name:"Merlier Tim", surname:"Tim", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:33, uciPts:1951, uciRank:30 },
  { name:"Paret-Peintre Valentin", surname:"Valentin", team:"Soudal Quick-Step", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Pedersen Casper", surname:"Casper", team:"Soudal Quick-Step", nation:"Danimarca", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Raccagni Noviero Andrea", surname:"Andrea", team:"Soudal Quick-Step", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Reinderink Pepijn", surname:"Pepijn", team:"Soudal Quick-Step", nation:"Olanda", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Rex Laurenz", surname:"Laurenz", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Schachmann Max", surname:"Max", team:"Soudal Quick-Step", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Stuyven Jasper", surname:"Jasper", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Svrcek Martin", surname:"Martin", team:"Soudal Quick-Step", nation:"Slovacchia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"van Baarle Dylan", surname:"Dylan", team:"Soudal Quick-Step", nation:"Olanda", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Van den Bossche Fabio", surname:"Fabio", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"van Gestel Dries", surname:"Dries", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Van Lerberghe Bert", surname:"Bert", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Van Wilder Ilan", surname:"Ilan", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:25, uciPts:947, uciRank:88 },
  { name:"Vangheluwe Warre", surname:"Warre", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Vansevenant Mauri", surname:"Mauri", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Vervaeke Louis", surname:"Louis", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Vervenne Jonathan", surname:"Jonathan", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Zana Filippo", surname:"Filippo", team:"Soudal Quick-Step", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Ackermann Pascal", surname:"Pascal", team:"Team Jayco-AlUla", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Bouwman Koen", surname:"Koen", team:"Team Jayco-AlUla", nation:"Olanda", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Capiot Amaury", surname:"Amaury", team:"Team Jayco-AlUla", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Conca Filippo", surname:"Filippo", team:"Team Jayco-AlUla", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Covi Alessandro", surname:"Alessandro", team:"Team Jayco-AlUla", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"De Bondt Dries", surname:"Dries", team:"Team Jayco-AlUla", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"De Pooter Dries", surname:"Dries", team:"Team Jayco-AlUla", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"De Pretto Davide", surname:"Davide", team:"Team Jayco-AlUla", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Donaldson Robert", surname:"Robert", team:"Team Jayco-AlUla", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Double Paul", surname:"Paul", team:"Team Jayco-AlUla", nation:"Regno Unito", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Durbridge Luke", surname:"Luke", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:34, uciPts:0, uciRank:0 },
  { name:"Engelhardt Felix", surname:"Felix", team:"Team Jayco-AlUla", nation:"Germania", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Foldager Anders", surname:"Anders", team:"Team Jayco-AlUla", nation:"Danimarca", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Gamper Patrick", surname:"Patrick", team:"Team Jayco-AlUla", nation:"Austria", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Hatherly Alan", surname:"Alan", team:"Team Jayco-AlUla", nation:"Sudafrica", continent:"Africa", age:30, uciPts:0, uciRank:0 },
  { name:"Hellemose Asbjørn", surname:"Asbjørn", team:"Team Jayco-AlUla", nation:"Danimarca", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Juul-Jensen Christopher", surname:"Christopher", team:"Team Jayco-AlUla", nation:"Danimarca", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Krijnsen Jelte", surname:"Jelte", team:"Team Jayco-AlUla", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Matthews Michael", surname:"Michael", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:35, uciPts:1780, uciRank:35 },
  { name:"McKenzie Hamish", surname:"Hamish", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:21, uciPts:0, uciRank:0 },
  { name:"Mezgec Luka", surname:"Luka", team:"Team Jayco-AlUla", nation:"Slovenia", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"O'Brien Kelland", surname:"Kelland", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:27, uciPts:0, uciRank:0 },
  { name:"O'Connor Ben", surname:"Ben", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:30, uciPts:944, uciRank:89 },
  { name:"Pickering Finlay", surname:"Finlay", team:"Team Jayco-AlUla", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Plapp Luke", surname:"Luke", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:25, uciPts:997, uciRank:81 },
  { name:"Porter Rudy", surname:"Rudy", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:25, uciPts:0, uciRank:0 },
  { name:"Schmid Mauro", surname:"Mauro", team:"Team Jayco-AlUla", nation:"Svizzera", continent:"Europa", age:26, uciPts:1193, uciRank:61 },
  { name:"Sütterlin Jasha", surname:"Jasha", team:"Team Jayco-AlUla", nation:"Germania", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Vendrame Andrea", surname:"Andrea", team:"Team Jayco-AlUla", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Barguil Warren", surname:"Warren", team:"Team Picnic PostNL", nation:"Francia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Biesterbos Frits", surname:"Frits", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Bittner Pavel", surname:"Pavel", team:"Team Picnic PostNL", nation:"Rep. Ceca", continent:"Europa", age:23, uciPts:1126, uciRank:68 },
  { name:"Corkery Dillon", surname:"Dillon", team:"Team Picnic PostNL", nation:"Irlanda", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"de Jong Timo", surname:"Timo", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Degenkolb John", surname:"John", team:"Team Picnic PostNL", nation:"Germania", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"Dhondt Robbe", surname:"Robbe", team:"Team Picnic PostNL", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Dinham Matthew", surname:"Matthew", team:"Team Picnic PostNL", nation:"Australia", continent:"Oceania", age:25, uciPts:0, uciRank:0 },
  { name:"Eekhoff Nils", surname:"Nils", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Faure-Prost Alexy", surname:"Alexy", team:"Team Picnic PostNL", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Flynn Sean", surname:"Sean", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Gaffuri Mattia", surname:"Mattia", team:"Team Picnic PostNL", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Hamilton Chris", surname:"Chris", team:"Team Picnic PostNL", nation:"Australia", continent:"Oceania", age:30, uciPts:0, uciRank:0 },
  { name:"Haquin Henri-Francois", surname:"Henri-Francois", team:"Team Picnic PostNL", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Jakobsen Fabio", surname:"Fabio", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Knox James", surname:"James", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Koerdt Bjoern", surname:"Bjoern", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Leemreize Gijs", surname:"Gijs", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Martinez Juan", surname:"Juan", team:"Team Picnic PostNL", nation:"Colombia", continent:"Sud America", age:21, uciPts:0, uciRank:0 },
  { name:"Märkl Niklas", surname:"Niklas", team:"Team Picnic PostNL", nation:"Germania", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Naberman Tim", surname:"Tim", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Peace Oliver", surname:"Oliver", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Poole Max", surname:"Max", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Roosen Timo", surname:"Timo", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"van den Berg Julius", surname:"Julius", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"van den Broek Frank", surname:"Frank", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"van Uden Casper", surname:"Casper", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Welten Bram", surname:"Bram", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Affini Edoardo", surname:"Edoardo", team:"Team Visma | Lease a Bike", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Armirail Bruno", surname:"Bruno", team:"Team Visma | Lease a Bike", nation:"Francia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Barré Louis", surname:"Louis", team:"Team Visma | Lease a Bike", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Behrens Niklas", surname:"Niklas", team:"Team Visma | Lease a Bike", nation:"Germania", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Brennan Matthew", surname:"Matthew", team:"Team Visma | Lease a Bike", nation:"Regno Unito", continent:"Europa", age:20, uciPts:1507, uciRank:43 },
  { name:"Campenaerts Victor", surname:"Victor", team:"Team Visma | Lease a Bike", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Doull Owain", surname:"Owain", team:"Team Visma | Lease a Bike", nation:"Regno Unito", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Fiorelli Filippo", surname:"Filippo", team:"Team Visma | Lease a Bike", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Graat Tijmen", surname:"Tijmen", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Hagenes Per Strand", surname:"Strand", team:"Team Visma | Lease a Bike", nation:"Norvegia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Huising Menno", surname:"Menno", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Jorgenson Matteo", surname:"Matteo", team:"Team Visma | Lease a Bike", nation:"USA", continent:"Nord America", age:26, uciPts:1962, uciRank:29 },
  { name:"Kelderman Wilco", surname:"Wilco", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Kielich Timo", surname:"Timo", team:"Team Visma | Lease a Bike", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Kruijswijk Steven", surname:"Steven", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:38, uciPts:0, uciRank:0 },
  { name:"Kuss Sepp", surname:"Sepp", team:"Team Visma | Lease a Bike", nation:"USA", continent:"Nord America", age:31, uciPts:861, uciRank:97 },
  { name:"Laporte Christophe", surname:"Christophe", team:"Team Visma | Lease a Bike", nation:"Francia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Lemmen Bart", surname:"Bart", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Mattio Pietro", surname:"Pietro", team:"Team Visma | Lease a Bike", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Nordhagen Jørgen", surname:"Jørgen", team:"Team Visma | Lease a Bike", nation:"Norvegia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Piganzoli Davide", surname:"Davide", team:"Team Visma | Lease a Bike", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Rex Tim", surname:"Tim", team:"Team Visma | Lease a Bike", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Schiffer Anton", surname:"Anton", team:"Team Visma | Lease a Bike", nation:"Germania", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Tulett Ben", surname:"Ben", team:"Team Visma | Lease a Bike", nation:"Regno Unito", continent:"Europa", age:24, uciPts:990, uciRank:82 },
  { name:"van Aert Wout", surname:"Wout", team:"Team Visma | Lease a Bike", nation:"Belgio", continent:"Europa", age:31, uciPts:2908, uciRank:10 },
  { name:"van Belle Loe", surname:"Loe", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Vingegaard Jonas", surname:"Jonas", team:"Team Visma | Lease a Bike", nation:"Danimarca", continent:"Europa", age:29, uciPts:5944, uciRank:2 },
  { name:"Zingle Axel", surname:"Axel", team:"Team Visma | Lease a Bike", nation:"Francia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Almeida João", surname:"João", team:"UAE Team Emirates-XRG", nation:"Portogallo", continent:"Europa", age:27, uciPts:4331, uciRank:5 },
  { name:"Arrieta Igor", surname:"Igor", team:"UAE Team Emirates-XRG", nation:"Spagna", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Baroncini Filippo", surname:"Filippo", team:"UAE Team Emirates-XRG", nation:"Italia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Bjerg Mikkel", surname:"Mikkel", team:"UAE Team Emirates-XRG", nation:"Danimarca", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Christen Jan", surname:"Jan", team:"UAE Team Emirates-XRG", nation:"Svizzera", continent:"Europa", age:21, uciPts:1347, uciRank:52 },
  { name:"Cosnefroy Benoît", surname:"Benoît", team:"UAE Team Emirates-XRG", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"del Toro Isaac", surname:"Isaac", team:"UAE Team Emirates-XRG", nation:"Messico", continent:"Nord America", age:22, uciPts:5514, uciRank:3 },
  { name:"Giaimi Luca", surname:"Luca", team:"UAE Team Emirates-XRG", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Großschartner Felix", surname:"Felix", team:"UAE Team Emirates-XRG", nation:"Austria", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Herregodts Rune", surname:"Rune", team:"UAE Team Emirates-XRG", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Johansen Julius", surname:"Julius", team:"UAE Team Emirates-XRG", nation:"Danimarca", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Laengen Vegard Stake", surname:"Stake", team:"UAE Team Emirates-XRG", nation:"Norvegia", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"McNulty Brandon", surname:"Brandon", team:"UAE Team Emirates-XRG", nation:"USA", continent:"Nord America", age:27, uciPts:2153, uciRank:23 },
  { name:"Molano Sebastian", surname:"Sebastian", team:"UAE Team Emirates-XRG", nation:"Colombia", continent:"Sud America", age:31, uciPts:0, uciRank:0 },
  { name:"Morgado António", surname:"António", team:"UAE Team Emirates-XRG", nation:"Portogallo", continent:"Europa", age:22, uciPts:985, uciRank:84 },
  { name:"Narvaez Jhonatan", surname:"Jhonatan", team:"UAE Team Emirates-XRG", nation:"Ecuador", continent:"Sud America", age:29, uciPts:1497, uciRank:44 },
  { name:"Novak Domen", surname:"Domen", team:"UAE Team Emirates-XRG", nation:"Slovenia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Oliveira Ivo", surname:"Ivo", team:"UAE Team Emirates-XRG", nation:"Portogallo", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Oliveira Rui", surname:"Rui", team:"UAE Team Emirates-XRG", nation:"Portogallo", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Pericas Adria", surname:"Adria", team:"UAE Team Emirates-XRG", nation:"Spagna", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Pogacar Tadej", surname:"Tadej", team:"UAE Team Emirates-XRG", nation:"Slovenia", continent:"Europa", age:27, uciPts:11680, uciRank:1 },
  { name:"Politt Nils", surname:"Nils", team:"UAE Team Emirates-XRG", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Sivakov Pavel", surname:"Pavel", team:"UAE Team Emirates-XRG", nation:"Francia", continent:"Europa", age:28, uciPts:1155, uciRank:64 },
  { name:"Soler Marc", surname:"Marc", team:"UAE Team Emirates-XRG", nation:"Spagna", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Torres Pablo", surname:"Pablo", team:"UAE Team Emirates-XRG", nation:"Spagna", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Vermaerke Kevin", surname:"Kevin", team:"UAE Team Emirates-XRG", nation:"USA", continent:"Nord America", age:25, uciPts:0, uciRank:0 },
  { name:"Vermeersch Florian", surname:"Florian", team:"UAE Team Emirates-XRG", nation:"Belgio", continent:"Europa", age:27, uciPts:1015, uciRank:79 },
  { name:"Vine Jay", surname:"Jay", team:"UAE Team Emirates-XRG", nation:"Australia", continent:"Oceania", age:30, uciPts:2320, uciRank:20 },
  { name:"Wellens Tim", surname:"Tim", team:"UAE Team Emirates-XRG", nation:"Belgio", continent:"Europa", age:34, uciPts:1250, uciRank:58 },
  { name:"Yates Adam", surname:"Adam", team:"UAE Team Emirates-XRG", nation:"Regno Unito", continent:"Europa", age:33, uciPts:1322, uciRank:53 },
  { name:"Abrahamsen Jonas", surname:"Jonas", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:30, uciPts:989, uciRank:83 },
  { name:"Bevort Carl-Frederik", surname:"Carl-Frederik", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Blikra Erlend", surname:"Erlend", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Blume Levy William", surname:"William", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Bugge Martin Urianstad", surname:"Urianstad", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Bystrøm Sven Erik", surname:"Erik", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Charmig Anthon", surname:"Anthon", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Cort Magnus", surname:"Magnus", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Dalby Simon", surname:"Simon", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Dversnes Fredrik", surname:"Fredrik", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Fredheim Stian", surname:"Stian", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Hoelgaard Markus", surname:"Markus", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Holter Ådne", surname:"Ådne", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Hvideberg Jonas Hem", surname:"Hem", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Ingebrigtsen Storm", surname:"Storm", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Johannessen Anders Halland", surname:"Halland", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:26, uciPts:1441, uciRank:50 },
  { name:"Johannessen Tobias Halland", surname:"Halland", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:26, uciPts:1441, uciRank:50 },
  { name:"Kamp Alexander", surname:"Alexander", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Kron Andreas", surname:"Andreas", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Kulset Johannes", surname:"Johannes", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Leknessund Andreas", surname:"Andreas", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Løland Sakarias Koller", surname:"Koller", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Pedersen Henrik", surname:"Henrik", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Resell Erik", surname:"Erik", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Skaarseth Anders", surname:"Anders", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Svarre Tobias", surname:"Tobias", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Tiller Rasmus", surname:"Rasmus", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Tjøtta Martin", surname:"Martin", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Træen Torstein", surname:"Torstein", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Wærenskjold Søren", surname:"Søren", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:26, uciPts:1183, uciRank:62 },
  { name:"Ballerini Davide", surname:"Davide", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Bettiol Alberto", surname:"Alberto", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Champoussin Clément", surname:"Clément", team:"XDS Astana Team", nation:"Francia", continent:"Europa", age:27, uciPts:957, uciRank:86 },
  { name:"Conci Nicola", surname:"Nicola", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Fedorov Yevgeniy", surname:"Yevgeniy", team:"XDS Astana Team", nation:"Kazakistan", continent:"Asia", age:26, uciPts:0, uciRank:0 },
  { name:"Fortunato Lorenzo", surname:"Lorenzo", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:29, uciPts:1447, uciRank:48 },
  { name:"Gate Aaron", surname:"Aaron", team:"XDS Astana Team", nation:"Nuova Zelanda", continent:"Oceania", age:35, uciPts:0, uciRank:0 },
  { name:"Gonov Lev", surname:"Lev", team:"XDS Astana Team", nation:"Russia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Higuita Sergio", surname:"Sergio", team:"XDS Astana Team", nation:"Colombia", continent:"Sud America", age:28, uciPts:0, uciRank:0 },
  { name:"Kajamini Florian", surname:"Florian", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Kanter Max", surname:"Max", team:"XDS Astana Team", nation:"Germania", continent:"Europa", age:28, uciPts:1004, uciRank:80 },
  { name:"Kuzmin Anton", surname:"Anton", team:"XDS Astana Team", nation:"Kazakistan", continent:"Asia", age:29, uciPts:0, uciRank:0 },
  { name:"Livyns Arjen", surname:"Arjen", team:"XDS Astana Team", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"López Martin", surname:"Martin", team:"XDS Astana Team", nation:"Ecuador", continent:"Sud America", age:25, uciPts:869, uciRank:96 },
  { name:"Malucelli Matteo", surname:"Matteo", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Mulubrhan Henok", surname:"Henok", team:"XDS Astana Team", nation:"Eritrea", continent:"Africa", age:26, uciPts:983, uciRank:85 },
  { name:"Rodriguez Cristian", surname:"Cristian", team:"XDS Astana Team", nation:"Spagna", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Romele Alessandro", surname:"Alessandro", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Scaroni Christian", surname:"Christian", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:28, uciPts:2399, uciRank:18 },
  { name:"Schrettl Marco", surname:"Marco", team:"XDS Astana Team", nation:"Austria", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Silva Thomas", surname:"Thomas", team:"XDS Astana Team", nation:"Uruguay", continent:"Sud America", age:24, uciPts:913, uciRank:91 },
  { name:"Su Haoyu", surname:"Haoyu", team:"XDS Astana Team", nation:"Cina", continent:"Asia", age:25, uciPts:0, uciRank:0 },
  { name:"Syritsa Gleb", surname:"Gleb", team:"XDS Astana Team", nation:"Russia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Tejada Harold", surname:"Harold", team:"XDS Astana Team", nation:"Colombia", continent:"Sud America", age:28, uciPts:0, uciRank:0 },
  { name:"Teunissen Mike", surname:"Mike", team:"XDS Astana Team", nation:"Olanda", continent:"Europa", age:33, uciPts:846, uciRank:98 },
  { name:"Toneatti Davide", surname:"Davide", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Ulissi Diego", surname:"Diego", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:36, uciPts:957, uciRank:86 },
  { name:"van Bekkum Darren", surname:"Darren", team:"XDS Astana Team", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Velasco Simone", surname:"Simone", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:30, uciPts:1464, uciRank:46 },
  { name:"Vinokurov Nicolas", surname:"Nicolas", team:"XDS Astana Team", nation:"Kazakistan", continent:"Asia", age:23, uciPts:0, uciRank:0 },
  { name:"Azparren Xabier", surname:"Xabier", team:"Pinarello Q36.5", nation:"Spagna", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Badilatti Matteo", surname:"Matteo", team:"Pinarello Q36.5", nation:"Svizzera", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Bax Sjoerd", surname:"Sjoerd", team:"Pinarello Q36.5", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Bennett Sam", surname:"Sam", team:"Pinarello Q36.5", nation:"Irlanda", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Calzoni Walter", surname:"Walter", team:"Pinarello Q36.5", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Camprubí Marcel", surname:"Marcel", team:"Pinarello Q36.5", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Christen Fabio", surname:"Fabio", team:"Pinarello Q36.5", nation:"Svizzera", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"De Gendt Aimé", surname:"Aimé", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"de la Cruz David", surname:"David", team:"Pinarello Q36.5", nation:"Spagna", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Donovan Mark", surname:"Mark", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Dunbar Edward", surname:"Edward", team:"Pinarello Q36.5", nation:"Irlanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Frison Frederik", surname:"Frederik", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Gloag Thomas", surname:"Thomas", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"González David", surname:"David", team:"Pinarello Q36.5", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Harper Chris", surname:"Chris", team:"Pinarello Q36.5", nation:"Australia", continent:"Oceania", age:31, uciPts:0, uciRank:0 },
  { name:"Hermans Quinten", surname:"Quinten", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Houcou Emmanuel", surname:"Emmanuel", team:"Pinarello Q36.5", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Howson Damien", surname:"Damien", team:"Pinarello Q36.5", nation:"Australia", continent:"Oceania", age:33, uciPts:0, uciRank:0 },
  { name:"Liepins Emils", surname:"Emils", team:"Pinarello Q36.5", nation:"Lettonia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Malecki Kamil", surname:"Kamil", team:"Pinarello Q36.5", nation:"Polonia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Meurisse Xandro", surname:"Xandro", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Moschetti Matteo", surname:"Matteo", team:"Pinarello Q36.5", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Parisini Nicolò", surname:"Nicolò", team:"Pinarello Q36.5", nation:"Italia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Pidcock Joseph", surname:"Joseph", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Pidcock Tom", surname:"Tom", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:26, uciPts:3904, uciRank:7 },
  { name:"Vader Milan", surname:"Milan", team:"Pinarello Q36.5", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Van Moer Brent", surname:"Brent", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Vanhoucke Harm", surname:"Harm", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Wright Fred", surname:"Fred", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:26, uciPts:1093, uciRank:71 },
  { name:"Zukowsky Nickolas", surname:"Nickolas", team:"Pinarello Q36.5", nation:"Canada", continent:"Nord America", age:27, uciPts:0, uciRank:0 },
  { name:"Alaphilippe Julian", surname:"Julian", team:"Tudor Pro Cycling Team", nation:"Francia", continent:"Europa", age:33, uciPts:1446, uciRank:49 },
  { name:"Barta William", surname:"William", team:"Tudor Pro Cycling Team", nation:"USA", continent:"Nord America", age:30, uciPts:0, uciRank:0 },
  { name:"Brenner Marco", surname:"Marco", team:"Tudor Pro Cycling Team", nation:"Germania", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"de Kleijn Arvid", surname:"Arvid", team:"Tudor Pro Cycling Team", nation:"Olanda", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Donzé Robin", surname:"Robin", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Eriksson Jacob", surname:"Jacob", team:"Tudor Pro Cycling Team", nation:"Svezia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Froidevaux Robin", surname:"Robin", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Haller Marco", surname:"Marco", team:"Tudor Pro Cycling Team", nation:"Austria", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Hirschi Marc", surname:"Marc", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:1262, uciRank:56 },
  { name:"Kelemen Petr", surname:"Petr", team:"Tudor Pro Cycling Team", nation:"Rep. Ceca", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Kluckers Arthur", surname:"Arthur", team:"Tudor Pro Cycling Team", nation:"Lussemburgo", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Kolze Changizi Sebastian", surname:"Sebastian", team:"Tudor Pro Cycling Team", nation:"Danimarca", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Küng Stefan", surname:"Stefan", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Lienhard Fabian", surname:"Fabian", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Mayrhofer Marius", surname:"Marius", team:"Tudor Pro Cycling Team", nation:"Germania", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Mikutis Aivaras", surname:"Aivaras", team:"Tudor Pro Cycling Team", nation:"Lituania", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Mozzato Luca", surname:"Luca", team:"Tudor Pro Cycling Team", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Pluimers Rick", surname:"Rick", team:"Tudor Pro Cycling Team", nation:"Olanda", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Rondel Mathys", surname:"Mathys", team:"Tudor Pro Cycling Team", nation:"Francia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Storer Michael", surname:"Michael", team:"Tudor Pro Cycling Team", nation:"Australia", continent:"Oceania", age:29, uciPts:2083, uciRank:27 },
  { name:"Stork Florian", surname:"Florian", team:"Tudor Pro Cycling Team", nation:"Germania", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Suter Joel", surname:"Joel", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Thalmann Roland", surname:"Roland", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Trentin Matteo", surname:"Matteo", team:"Tudor Pro Cycling Team", nation:"Italia", continent:"Europa", age:36, uciPts:890, uciRank:94 },
  { name:"Voisard Yannis", surname:"Yannis", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Warbasse Lawrence", surname:"Lawrence", team:"Tudor Pro Cycling Team", nation:"USA", continent:"Nord America", age:35, uciPts:0, uciRank:0 },
  { name:"Weiss Fabian", surname:"Fabian", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Wilksch Hannes", surname:"Hannes", team:"Tudor Pro Cycling Team", nation:"Germania", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Wirtgen Luc", surname:"Luc", team:"Tudor Pro Cycling Team", nation:"Lussemburgo", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Zijlaard Maikel", surname:"Maikel", team:"Tudor Pro Cycling Team", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Bais Davide", surname:"Davide", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Bais Mattia", surname:"Mattia", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Belletta Dario", surname:"Dario", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Benito Adrián", surname:"Adrián", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Bessega Gabriele", surname:"Gabriele", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Bessega Tommaso", surname:"Tommaso", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Buttigieg Aidan", surname:"Aidan", team:"Team Polti VisitMalta", nation:"Malta", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Crescioli Ludovico", surname:"Ludovico", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Crozzolo Fabrizio", surname:"Fabrizio", team:"Team Polti VisitMalta", nation:"Argentina", continent:"Sud America", age:21, uciPts:0, uciRank:0 },
  { name:"Garcia Pablo", surname:"Pablo", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Giuliano Dario", surname:"Dario", team:"Team Polti VisitMalta", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Gómez Germán Dario", surname:"Dario", team:"Team Polti VisitMalta", nation:"Colombia", continent:"Sud America", age:25, uciPts:0, uciRank:0 },
  { name:"Lonardi Giovanni", surname:"Giovanni", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Maestri Mirco", surname:"Mirco", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Mifsud Andrea", surname:"Andrea", team:"Team Polti VisitMalta", nation:"Malta", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Muñoz Francisco", surname:"Francisco", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Peñalver Manuel", surname:"Manuel", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Pesenti Thomas", surname:"Thomas", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Pietrobon Andrea", surname:"Andrea", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Raccagni Gabriele", surname:"Gabriele", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Serrano Javier", surname:"Javier", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Sevilla Diego", surname:"Diego", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Tercero Fernando", surname:"Fernando", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Tonelli Alessandro", surname:"Alessandro", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Allegaert Piet", surname:"Piet", team:"Cofidis", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Aniolkowski Stanislaw", surname:"Stanislaw", team:"Cofidis", nation:"Polonia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Aranburu Alex", surname:"Alex", team:"Cofidis", nation:"Spagna", continent:"Europa", age:30, uciPts:1167, uciRank:63 },
  { name:"Biermans Jenthe", surname:"Jenthe", team:"Cofidis", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Buchmann Emanuel", surname:"Emanuel", team:"Cofidis", nation:"Germania", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Carr Simon", surname:"Simon", team:"Cofidis", nation:"Regno Unito", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Charret Camille", surname:"Camille", team:"Cofidis", nation:"Francia", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Coquard Bryan", surname:"Bryan", team:"Cofidis", nation:"Francia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Debeaumarché Nicolas", surname:"Nicolas", team:"Cofidis", nation:"Francia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Ferron Valentin", surname:"Valentin", team:"Cofidis", nation:"Francia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Fretin Milan", surname:"Milan", team:"Cofidis", nation:"Belgio", continent:"Europa", age:25, uciPts:1130, uciRank:66 },
  { name:"Izagirre Ion", surname:"Ion", team:"Cofidis", nation:"Spagna", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"Izquierdo Clement", surname:"Clement", team:"Cofidis", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Joalland Yaël", surname:"Yaël", team:"Cofidis", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Kirsch Alex", surname:"Alex", team:"Cofidis", nation:"Lussemburgo", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Knight Oliver", surname:"Oliver", team:"Cofidis", nation:"Regno Unito", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Maas Jan", surname:"Jan", team:"Cofidis", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Maisonobe Sam", surname:"Sam", team:"Cofidis", nation:"Francia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Meehan Jamie", surname:"Jamie", team:"Cofidis", nation:"Irlanda", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Moniquet Sylvain", surname:"Sylvain", team:"Cofidis", nation:"Belgio", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Ourselin Paul", surname:"Paul", team:"Cofidis", nation:"Francia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Page Hugo", surname:"Hugo", team:"Cofidis", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Renard Alexis", surname:"Alexis", team:"Cofidis", nation:"Francia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Robeet Ludovic", surname:"Ludovic", team:"Cofidis", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Rouland Louis", surname:"Louis", team:"Cofidis", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Samitier Sergio", surname:"Sergio", team:"Cofidis", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Teuns Dylan", surname:"Dylan", team:"Cofidis", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Thomas Benjamin", surname:"Benjamin", team:"Cofidis", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Touzé Damien", surname:"Damien", team:"Cofidis", nation:"Francia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Zamperini Edoardo", surname:"Edoardo", team:"Cofidis", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Cettolin Filippo", surname:"Filippo", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Colnaghi Luca", surname:"Luca", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Conforti Lorenzo", surname:"Lorenzo", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Covili Luca", surname:"Luca", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Cruz Martínez Edward", surname:"Edward", team:"Bardiani-CSF", nation:"Colombia", continent:"Sud America", age:19, uciPts:0, uciRank:0 },
  { name:"Ferraro Santiago", surname:"Santiago", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Herreño Martín", surname:"Martín", team:"Bardiani-CSF", nation:"Colombia", continent:"Sud America", age:19, uciPts:0, uciRank:0 },
  { name:"Magli Filippo", surname:"Filippo", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Manenti Marco", surname:"Marco", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Marcellusi Martin", surname:"Martin", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Martinelli Alessio", surname:"Alessio", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Montagner Andrea", surname:"Andrea", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Paletti Luca", surname:"Luca", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Pinazzi Mattia", surname:"Mattia", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Rojas Vicente", surname:"Vicente", team:"Bardiani-CSF", nation:"Cile", continent:"Sud America", age:23, uciPts:0, uciRank:0 },
  { name:"Rostovtsev Sergei", surname:"Sergei", team:"Bardiani-CSF", nation:"Uzbekistan", continent:"Asia", age:28, uciPts:0, uciRank:0 },
  { name:"Stenico Mattia", surname:"Mattia", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Tarozzi Manuele", surname:"Manuele", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Tolio Alex", surname:"Alex", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Tsvetkov Nikita", surname:"Nikita", team:"Bardiani-CSF", nation:"Uzbekistan", continent:"Asia", age:21, uciPts:0, uciRank:0 },
  { name:"Turconi Filippo", surname:"Filippo", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Turconi Matteo", surname:"Matteo", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:18, uciPts:0, uciRank:0 },
  { name:"Zanoncello Enrico", surname:"Enrico", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
];

// ── CARRIERE ────────────────────────────────────────────────────────────
const CAREERS = [
  { answer:"Eddy Merckx", clues:[
    { team:"Peugeot-BP", period:"1966-1967", days:130, note:"Primo contratto da professionista a 21 anni" },
    { team:"Faema", period:"1968-1969", days:200, note:"Primo Tour de France vinto nel 1969" },
    { team:"Molteni", period:"1971-1976", days:450, note:"Dominio assoluto: 4 Tour, 3 Giri, 3 Mondiali" },
    { team:"Fiat France / C&A", period:"1977-1978", days:90, note:"Ultime stagioni prima del ritiro" },
  ]},
  { answer:"Fausto Coppi", clues:[
    { team:"Legnano", period:"1940-1942", days:45, note:"Primo Giro d'Italia vinto a 20 anni" },
    { team:"Bianchi", period:"1946-1954", days:280, note:"2 Tour, 3 Giri, Mondiale 1953, Ora record" },
    { team:"Bianchi-Pirelli", period:"1955-1959", days:80, note:"Ultimi anni, tragica scomparsa nel 1960" },
  ]},
  { answer:"Marco Pantani", clues:[
    { team:"Carrera Jeans", period:"1992-1996", days:120, note:"Prime imprese sulle salite del Giro" },
    { team:"Mercatone Uno", period:"1997-2003", days:180, note:"Storica doppietta Tour-Giro nel 1998" },
  ]},
  { answer:"Tadej Pogačar", clues:[
    { team:"UAE Team Emirates", period:"2019-oggi", days:350, note:"3 Tour, Giro 2024, Mondiale 2024, tutte le Monumento vinte" },
  ]},
  { answer:"Chris Froome", clues:[
    { team:"Barloworld", period:"2008-2009", days:40, note:"Esordio da pro, nato in Kenya" },
    { team:"Team Sky / INEOS", period:"2010-2023", days:450, note:"4 Tour de France, 1 Giro, 1 Vuelta" },
    { team:"Israel-Premier Tech", period:"2023-2025", days:60, note:"Dopo il grave incidente del 2019" },
  ]},
  { answer:"Alberto Contador", clues:[
    { team:"ONCE / Discovery Channel", period:"2003-2007", days:120, note:"Primo Tour de France nel 2007" },
    { team:"Astana", period:"2008-2010", days:100, note:"Tour 2009, Giro 2008, seconda stella al Tour" },
    { team:"Saxo Bank / Tinkoff", period:"2011-2017", days:250, note:"2 Giri e 2 Vuelta, chiude a Madrid" },
  ]},
  { answer:"Vincenzo Nibali", clues:[
    { team:"Liquigas", period:"2005-2012", days:200, note:"Primo Giro d'Italia nel 2010" },
    { team:"Astana", period:"2013-2016", days:180, note:"Tour de France 2014, Giro 2016" },
    { team:"Bahrain / Trek-Segafredo", period:"2017-2022", days:150, note:"Sanremo 2018, ritiro al Giro 2022" },
  ]},
  { answer:"Peter Sagan", clues:[
    { team:"Liquigas-Cannondale", period:"2010-2014", days:250, note:"Si impone subito come velocista completo" },
    { team:"Tinkoff", period:"2015-2016", days:120, note:"Primo Mondiale a Richmond nel 2015" },
    { team:"Bora-hansgrohe", period:"2017-2021", days:200, note:"3 Mondiali consecutivi, 7 maglie verdi al Tour" },
    { team:"TotalEnergies", period:"2022-2023", days:80, note:"Ultime stagioni, ritiro a fine 2023" },
  ]},
  { answer:"Bernard Hinault", clues:[
    { team:"Renault-Gitane", period:"1975-1983", days:300, note:"3 Tour, 2 Giri, Vuelta, Mondiale 1980" },
    { team:"La Vie Claire", period:"1984-1986", days:120, note:"Quinto Tour de France nel 1985" },
  ]},
  { answer:"Miguel Indurain", clues:[
    { team:"Reynolds / Banesto", period:"1985-1996", days:350, note:"5 Tour consecutivi, 2 Giri, oro Olimpico 1996" },
  ]},
  { answer:"Alejandro Valverde", clues:[
    { team:"Kelme", period:"2002-2003", days:60, note:"Esordio da professionista" },
    { team:"Caisse d'Épargne / Movistar", period:"2004-2022", days:700, note:"Mondiale 2018, 4 Liegi, Vuelta 2009" },
  ]},
  { answer:"Primož Roglič", clues:[
    { team:"Adria Mobil", period:"2013-2015", days:40, note:"Ex saltatore con gli sci sloveno" },
    { team:"LottoNL / Jumbo-Visma", period:"2016-2023", days:300, note:"3 Vuelta consecutive, oro Olimpico Tokyo 2020" },
    { team:"Red Bull-BORA-hansgrohe", period:"2024-oggi", days:50, note:"Quarta Vuelta vinta nel 2024" },
  ]},
  { answer:"Jonas Vingegaard", clues:[
    { team:"ColoQuick", period:"2019-2020", days:40, note:"Da squadra Continental danese" },
    { team:"Jumbo-Visma / Visma | Lease a Bike", period:"2021-oggi", days:150, note:"2 Tour de France consecutivi (2022-2023)" },
  ]},
  { answer:"Remco Evenepoel", clues:[
    { team:"Deceuninck-Quick-Step / Soudal Quick-Step", period:"2019-2024", days:200, note:"Vuelta 2022, Mondiale 2022, oro Olimpico crono Parigi" },
    { team:"Red Bull-BORA-hansgrohe", period:"2025-oggi", days:20, note:"Nuovo capitolo dopo il trasferimento" },
  ]},
  { answer:"Tom Boonen", clues:[
    { team:"US Postal", period:"2002-2003", days:60, note:"Gregario di Armstrong al Tour" },
    { team:"Quick-Step", period:"2003-2017", days:500, note:"4 Roubaix, 3 Fiandre, Mondiale 2005" },
  ]},
  { answer:"Fabian Cancellara", clues:[
    { team:"Mapei / Fassa Bortolo", period:"2001-2005", days:150, note:"Prime vittorie a cronometro" },
    { team:"CSC / Saxo / Trek", period:"2006-2016", days:350, note:"3 Fiandre, 3 Roubaix, 2 ori Olimpici crono" },
  ]},
  { answer:"Mark Cavendish", clues:[
    { team:"T-Mobile / HTC", period:"2007-2011", days:200, note:"Mondiale 2011, dominio nelle volate" },
    { team:"Sky / Dimension Data / Bahrain", period:"2012-2020", days:250, note:"Periodo altalenante con infortuni" },
    { team:"Quick-Step / Astana", period:"2021-2024", days:100, note:"Record storico 35 tappe al Tour de France" },
  ]},
  { answer:"Mathieu van der Poel", clues:[
    { team:"Corendon-Circus", period:"2014-2018", days:200, note:"Dominio nel ciclocross, più Mondiali CX" },
    { team:"Alpecin-Deceuninck", period:"2019-oggi", days:250, note:"Mondiale 2023, Fiandre, Roubaix, Sanremo" },
  ]},
  { answer:"Wout van Aert", clues:[
    { team:"Vérandas Willems / Crelan", period:"2017-2018", days:60, note:"Dal ciclocross alla strada" },
    { team:"Jumbo-Visma / Visma", period:"2019-oggi", days:220, note:"Sanremo, tappe al Tour, Mondiali CX" },
  ]},
  { answer:"Philippe Gilbert", clues:[
    { team:"Française des Jeux", period:"2003-2008", days:200, note:"Crescita nelle classiche del nord" },
    { team:"Omega Pharma / BMC / QS / Lotto", period:"2009-2023", days:500, note:"5 Monumento, Mondiale 2012 a Valkenburg" },
  ]},
  { answer:"Gino Bartali", clues:[
    { team:"Legnano (pre-guerra)", period:"1935-1943", days:150, note:"2 Giri d'Italia, Tour de France 1938" },
    { team:"Legnano (post-guerra)", period:"1946-1954", days:200, note:"Tour de France 1948, a 10 anni di distanza" },
  ]},
  { answer:"Lance Armstrong", clues:[
    { team:"Motorola", period:"1992-1996", days:120, note:"Mondiale 1993, diagnosi di cancro nel 1996" },
    { team:"US Postal / Discovery", period:"1998-2005", days:200, note:"7 Tour de France vinti (tutti revocati)" },
    { team:"Astana / RadioShack", period:"2009-2011", days:60, note:"Ritorno e squalifica a vita per doping" },
  ]},
];

// ── LISTA QUIZ ──────────────────────────────────────────────────────────
const LISTA_CATEGORIES = [
  { id:1, title:"Vincitori Tour de France dal 2010", desc:"Un vincitore per ogni edizione",
    answers:["Contador","Schleck","Evans","Wiggins","Froome","Nibali","Froome","Froome","Froome","Thomas","Bernal","Pogacar","Vingegaard","Vingegaard","Pogacar","Pogacar"],
    unique:["Contador","Schleck","Evans","Wiggins","Froome","Nibali","Thomas","Bernal","Pogacar","Vingegaard"] },
  { id:2, title:"Vincitori Giro d'Italia dal 2010", desc:"Un trionfatore per ogni anno",
    answers:["Basso","Contador","Hesjedal","Nibali","Quintana","Contador","Nibali","Dumoulin","Froome","Carapaz","Hart","Bernal","Hindley","Roglic","Pogacar","del Toro"],
    unique:["Basso","Contador","Hesjedal","Nibali","Quintana","Dumoulin","Froome","Carapaz","Hart","Bernal","Hindley","Roglic","Pogacar","del Toro"] },
  { id:3, title:"Vincitori Vuelta a España dal 2010", desc:"Chi ha vinto la Vuelta negli ultimi 15 anni",
    answers:["Nibali","Cobo","Contador","Horner","Contador","Aru","Quintana","Froome","Yates","Roglic","Roglic","Roglic","Evenepoel","Kuss","Almeida","Vingegaard"],
    unique:["Nibali","Cobo","Contador","Horner","Aru","Quintana","Froome","Yates","Roglic","Evenepoel","Kuss","Almeida","Vingegaard"] },
  { id:4, title:"Le 5 Classiche Monumento", desc:"Le gare più prestigiose del calendario",
    answers:["Milano-Sanremo","Giro delle Fiandre","Parigi-Roubaix","Liegi-Bastogne-Liegi","Giro di Lombardia"],
    unique:["Milano-Sanremo","Giro delle Fiandre","Parigi-Roubaix","Liegi-Bastogne-Liegi","Giro di Lombardia"] },
  { id:5, title:"Campioni del Mondo strada dal 2010", desc:"La maglia iridata ogni anno",
    answers:["Hushovd","Cavendish","Gilbert","Rui Costa","Kwiatkowski","Sagan","Sagan","Sagan","Valverde","Pedersen","Alaphilippe","Alaphilippe","Evenepoel","van der Poel","Pogacar","Pogacar"],
    unique:["Hushovd","Cavendish","Gilbert","Rui Costa","Kwiatkowski","Sagan","Valverde","Pedersen","Alaphilippe","Evenepoel","van der Poel","Pogacar"] },
  { id:6, title:"Vincitori Milano-Sanremo dal 2010", desc:"La Classicissima di Primavera",
    answers:["Freire","Goss","Gerrans","Ciolek","Kristoff","Degenkolb","Nibali","Kwiatkowski","Nibali","Alaphilippe","van Aert","Stuyven","Mohoric","van der Poel","Philipsen","Pogacar"],
    unique:["Freire","Goss","Gerrans","Ciolek","Kristoff","Degenkolb","Nibali","Kwiatkowski","Alaphilippe","van Aert","Stuyven","Mohoric","van der Poel","Philipsen","Pogacar"] },
  { id:7, title:"Vincitori Parigi-Roubaix dal 2010", desc:"L'Inferno del Nord",
    answers:["Cancellara","Vansummeren","Boonen","Cancellara","Terpstra","Degenkolb","Hayman","van Avermaet","Sagan","Gilbert","van der Poel","Colbrelli","van Aert","van der Poel","van der Poel"],
    unique:["Cancellara","Vansummeren","Boonen","Terpstra","Degenkolb","Hayman","van Avermaet","Sagan","Gilbert","van der Poel","Colbrelli","van Aert"] },
  { id:8, title:"Vincitori Giro delle Fiandre dal 2010", desc:"La Ronde van Vlaanderen",
    answers:["Cancellara","Nuyens","Boonen","Cancellara","Kristoff","Cancellara","Sagan","van Avermaet","Terpstra","Bettiol","van der Poel","Asgreen","van der Poel","Pogacar","van der Poel","Pogacar"],
    unique:["Cancellara","Nuyens","Boonen","Kristoff","Sagan","van Avermaet","Terpstra","Bettiol","van der Poel","Asgreen","Pogacar"] },
  { id:9, title:"Vincitori Liegi-Bastogne-Liegi dal 2010", desc:"La Doyenne",
    answers:["Vinokourov","Gilbert","Iglinskiy","Dan Martin","Gerrans","Valverde","Wout Poels","Valverde","Valverde","Fuglsang","Roglic","Pogacar","Evenepoel","Evenepoel","Pogacar","Pogacar"],
    unique:["Vinokourov","Gilbert","Iglinskiy","Dan Martin","Gerrans","Valverde","Wout Poels","Fuglsang","Roglic","Pogacar","Evenepoel"] },
  { id:10, title:"Vincitori Giro di Lombardia dal 2015", desc:"La Classica delle Foglie Morte",
    answers:["Nibali","Nibali","Pinot","Nibali","Mollema","Fuglsang","Pogacar","Pogacar","Pogacar","Pogacar","Pogacar"],
    unique:["Nibali","Pinot","Mollema","Fuglsang","Pogacar"] },
  { id:11, title:"Le 4 Maglie del Tour de France", desc:"I simboli cromatici della Grande Boucle",
    answers:["Gialla","Verde","Pois","Bianca"],
    unique:["Gialla","Verde","Pois","Bianca"] },
  { id:12, title:"Specialità del ciclismo su strada", desc:"I ruoli che contraddistinguono un corridore",
    answers:["Scalatore","Velocista","Passista","Cronoman","Classicomane","Puncher","Baroudeur","Gregario"],
    unique:["Scalatore","Velocista","Passista","Cronoman","Classicomane","Puncher","Baroudeur","Gregario"] },
];

// ── SALITE ──────────────────────────────────────────────────────────────
const SALITE = [
  { answer:"Alpe d'Huez", km:13.8, pendenza:7.4, quota:1860, nazione:"Francia", indizio:"21 tornanti leggendari, simbolo del Tour" },
  { answer:"Passo dello Stelvio", km:24.3, pendenza:7.1, quota:2758, nazione:"Italia", indizio:"La Cima Coppi, il passo più alto del Giro" },
  { answer:"Col du Tourmalet", km:17.1, pendenza:7.3, quota:2115, nazione:"Francia", indizio:"Il gigante dei Pirenei" },
  { answer:"Mortirolo", km:12.4, pendenza:10.5, quota:1852, nazione:"Italia", indizio:"Muro della Valtellina, pendenze micidiali" },
  { answer:"Monte Zoncolan", km:10.1, pendenza:11.9, quota:1730, nazione:"Italia", indizio:"Il mostro della Carnia" },
  { answer:"Mont Ventoux", km:21.5, pendenza:7.5, quota:1909, nazione:"Francia", indizio:"Il Gigante della Provenza, Mont Chauve" },
  { answer:"Alto de l'Angliru", km:12.5, pendenza:9.8, quota:1570, nazione:"Spagna", indizio:"La salita simbolo della Vuelta, nelle Asturie" },
  { answer:"Col du Galibier", km:18.1, pendenza:6.9, quota:2642, nazione:"Francia", indizio:"Gigante delle Alpi, spesso tappa regina del Tour" },
  { answer:"Passo Gavia", km:16.5, pendenza:7.9, quota:2621, nazione:"Italia", indizio:"Lombardia, celebre per la tappa nella bufera del 1988" },
  { answer:"Monte Grappa", km:28.0, pendenza:5.5, quota:1712, nazione:"Italia", indizio:"Lunga salita veneta, teatro di tappe storiche" },
  { answer:"Blockhaus", km:13.6, pendenza:8.4, quota:2145, nazione:"Italia", indizio:"Salita abruzzese, affrontata spesso al Giro" },
  { answer:"Col d'Izoard", km:14.1, pendenza:7.3, quota:2360, nazione:"Francia", indizio:"Alpi del Sud, attraversa la Casse Déserte" },
  { answer:"Passo Pordoi", km:11.8, pendenza:6.8, quota:2239, nazione:"Italia", indizio:"Dolomiti, tappa classica del Giro" },
  { answer:"Plateau de Beille", km:15.8, pendenza:7.9, quota:1780, nazione:"Francia", indizio:"Arrivo in vetta sui Pirenei" },
  { answer:"Superga", km:5.0, pendenza:9.1, quota:672, nazione:"Italia", indizio:"Arrivo tradizionale della Milano-Torino, a Torino" },
];

// ── TIMELINE ────────────────────────────────────────────────────────────
const TIMELINE_EVENTS = [
  { id:1, title:"Eventi Tour de France",
    events:[
      { label:"Primo Tour di Pantani", year:1998 },
      { label:"Primo Tour di Froome", year:2013 },
      { label:"Primo Tour di Pogačar", year:2020 },
      { label:"Primo Tour di Vingegaard", year:2022 },
    ]},
  { id:2, title:"Prime vittorie alla Parigi-Roubaix",
    events:[
      { label:"Prima Roubaix di Boonen", year:2005 },
      { label:"Prima Roubaix di Cancellara", year:2006 },
      { label:"Prima Roubaix di Sagan", year:2018 },
      { label:"Prima Roubaix di van der Poel", year:2023 },
    ]},
  { id:3, title:"Doppiette storiche Tour + Giro",
    events:[
      { label:"Merckx Tour+Giro", year:1970 },
      { label:"Hinault Tour+Giro", year:1982 },
      { label:"Pantani Tour+Giro", year:1998 },
      { label:"Pogačar Tour+Giro", year:2024 },
    ]},
  { id:4, title:"Vincitori Tour nel XXI secolo",
    events:[
      { label:"Armstrong vince il primo Tour", year:1999 },
      { label:"Nibali vince il Tour", year:2014 },
      { label:"Bernal vince il Tour", year:2019 },
      { label:"Pogačar vince il primo Tour", year:2020 },
    ]},
  { id:5, title:"Record dell'Ora",
    events:[
      { label:"Record dell'Ora - Merckx", year:1972 },
      { label:"Record dell'Ora - Moser", year:1984 },
      { label:"Record dell'Ora - Boardman", year:1996 },
      { label:"Record dell'Ora - Pogačar", year:2024 },
    ]},
  { id:6, title:"Pionieri del ciclismo italiano",
    events:[
      { label:"Coppi vince il primo Giro", year:1940 },
      { label:"Bartali vince l'ultimo Tour", year:1948 },
      { label:"Merckx vince il primo Tour", year:1969 },
      { label:"Indurain vince il primo Tour", year:1991 },
    ]},
  { id:7, title:"Grandi vittorie 2020-2023",
    events:[
      { label:"van Aert vince la Sanremo", year:2020 },
      { label:"Evenepoel vince la Vuelta", year:2022 },
      { label:"Pogačar vince la Liegi", year:2023 },
      { label:"van der Poel vince il Mondiale", year:2023 },
    ]},
  { id:8, title:"Nascita delle Grandi Corse",
    events:[
      { label:"Prima Parigi-Roubaix", year:1896 },
      { label:"Fondazione UCI", year:1900 },
      { label:"Prima edizione Tour de France", year:1903 },
      { label:"Prima edizione Giro d'Italia", year:1909 },
    ]},
  { id:9, title:"Mondiali storici",
    events:[
      { label:"Primo Mondiale femminile", year:1958 },
      { label:"Armstrong vince il primo Tour", year:1999 },
      { label:"Sagan vince il primo Mondiale", year:2015 },
      { label:"Prima edizione Tour de France Femmes moderno", year:2022 },
    ]},
  { id:10, title:"Campioni del Mondo recenti",
    events:[
      { label:"Valverde campione del mondo", year:2018 },
      { label:"Pedersen campione del mondo", year:2019 },
      { label:"Alaphilippe campione del mondo", year:2020 },
      { label:"Pogačar campione del mondo", year:2024 },
    ]},
];
// ── HELPERS ─────────────────────────────────────────────────────────────
function seedRandom(s){let x=s;return()=>{x=(x*1664525+1013904223)&0xffffffff;return(x>>>0)/0xffffffff;};}
function todaySeed(){const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}
function dayIndex(){const epoch=new Date(2020,0,1);const now=new Date();now.setHours(0,0,0,0);return Math.floor((now-epoch)/(1000*60*60*24));}
function seedForDaysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}
function dateForDaysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.toLocaleDateString("it-IT",{day:"numeric",month:"long"});}
function archiveNum(poolSize){return poolSize;}
function daysAgoForNum(num,poolSize){return poolSize-num;}
function seedForNum(num,poolSize){return seedForDaysAgo(daysAgoForNum(num,poolSize));}
function shuffle(arr,rng){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function normStr(s){if(!s)return "";return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function normLow(s){return s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function levenshtein(a,b){
  const m=a.length,n=b.length;
  const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i===0?j:j===0?i:0));
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[m][n];
}
function fuzzyMatch(input,answer){
  const i=normLow(input),a=normLow(answer);
  if(i===a)return true;
  if(a.split(" ").some(w=>w===i))return true;
  if(i.length>=3&&levenshtein(i,a)<=1)return true;
  if(i.length>=3&&a.split(" ").some(w=>w.length>=3&&levenshtein(i,w)<=1))return true;
  return false;
}

// ── STORAGE ─────────────────────────────────────────────────────────────
function todayKey(){const d=new Date();return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;}
const _mem={};
function _cookieGet(k){try{const m=document.cookie.match(new RegExp("(?:^|; )"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"=([^;]*)"));return m?decodeURIComponent(m[1]):null;}catch(e){return null;}}
function _cookieSet(k,v){try{const exp=new Date();exp.setFullYear(exp.getFullYear()+1);document.cookie=k+"="+encodeURIComponent(v)+";expires="+exp.toUTCString()+";path=/;SameSite=None;Secure";}catch(e){}}
function _get(k){const c=_cookieGet(k);if(c!=null)return c;try{const v=localStorage.getItem(k);if(v!=null)return v;}catch(e){}return _mem[k]??null;}
function _set(k,v){_cookieSet(k,v);try{localStorage.setItem(k,v);}catch(e){}_mem[k]=v;}
function saveResult(gameKey,data){
  try{
    const k=`uc_${gameKey}_${todayKey()}`;
    if(_get(k))return;
    _set(k,JSON.stringify(data));
  }catch(e){}
}
function loadResult(gameKey){
  try{const k=`uc_${gameKey}_${todayKey()}`;const r=_get(k);return r?JSON.parse(r):null;}catch(e){return null;}
}
function saveStats(gameKey,won){
  try{
    const k=`uc_stats_${gameKey}`;
    const raw=_get(k);
    const s=raw?JSON.parse(raw):{played:0,won:0};
    s.played+=1;if(won)s.won+=1;
    _set(k,JSON.stringify(s));
  }catch(e){}
}
function loadStats(gameKey){
  try{const r=_get(`uc_stats_${gameKey}`);return r?JSON.parse(r):{played:0,won:0};}catch(e){return{played:0,won:0};}
}

function Confetti({active}){
  if(!active)return null;
  const pieces=Array.from({length:80},(_,i)=>({
    id:i,left:Math.random()*100,delay:Math.random()*0.8,duration:2.5+Math.random()*1.5,
    color:["#f5e000","#16a34a","#dc2626","#2563eb","#f97316","#a855f7","#ec4899","#06b6d4"][i%8],
    size:9+Math.random()*10,shape:i%3===0?"50%":i%3===1?"2px":"4px"
  }));
  return(<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,pointerEvents:"none",zIndex:9999,overflow:"hidden"}}>{pieces.map(p=><div key={p.id} className="confetti-piece" style={{left:`${p.left}%`,top:"-12px",width:`${p.size}px`,height:`${p.size}px`,background:p.color,borderRadius:p.shape,animationDelay:`${p.delay}s`,animationDuration:`${p.duration}s`}}/>)}</div>);
}
function useCountdown(){
  const[t,sT]=useState("");
  useEffect(()=>{
    function calc(){const now=new Date(),next=new Date();next.setHours(24,0,0,0);const d=next-now;sT(`${String(Math.floor(d/3600000)).padStart(2,"0")}:${String(Math.floor((d%3600000)/60000)).padStart(2,"0")}:${String(Math.floor((d%60000)/1000)).padStart(2,"0")}`);}
    calc();const id=setInterval(calc,1000);return()=>clearInterval(id);
  },[]);
  return t;
}

// ── COLORI / STILI ───────────────────────────────────────────────────────
const US={black:"#111",orange:"#f5e000",bg:"#f4f4f4",surface:"#fafaf8",border:"#e2e2e2",muted:"#888",green:"#16a34a",greenL:"#dcfce7",red:"#dc2626",redL:"#fee2e2",yellow:"#d97706"};
const T={
  app:{minHeight:"100vh",background:US.bg,fontFamily:"'Helvetica Neue',Arial,sans-serif",overflowX:"hidden",maxWidth:"100vw",animation:"fadeSlideIn 0.35s ease forwards"},
  hdr:{background:US.black,color:"#fff",padding:"13px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`3px solid ${US.orange}`},
  ey:{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:US.orange,marginBottom:"2px",fontWeight:"700"},
  ht:{fontSize:"17px",fontWeight:"700",margin:0},
  body:{padding:"18px 18px 48px",maxWidth:"620px",margin:"0 auto",boxSizing:"border-box"},
  bk:{background:"none",border:"1.5px solid #444",borderRadius:"4px",color:"#aaa",padding:"5px 11px",fontSize:"9px",letterSpacing:"1px",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"},
  pb:{background:US.orange,color:US.black,border:"none",borderRadius:"4px",padding:"9px 16px",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"},
  sb:{background:"#fff",color:US.black,border:`1.5px solid ${US.black}`,borderRadius:"4px",padding:"8px 16px",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"},
  lb:{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.muted,marginBottom:"7px",display:"block"},
  ip:{border:`1.5px solid ${US.border}`,borderRadius:"4px",padding:"9px 11px",fontSize:"13px",fontFamily:"inherit",outline:"none",color:US.black,boxSizing:"border-box"},
};

// ── HEADER ───────────────────────────────────────────────────────────────
function dayToDate(num,poolSize){return dateForDaysAgo(daysAgoForNum(num,poolSize));}

function ShareButton({text}){
  const[copied,setCopied]=useState(false);
  function share(){
    try{navigator.clipboard.writeText(text).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});}
    catch(e){const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);setCopied(true);setTimeout(()=>setCopied(false),2000);}
  }
  return(<button onClick={share} style={{display:"flex",alignItems:"center",gap:"6px",justifyContent:"center",
    width:"100%",marginTop:"10px",padding:"11px",borderRadius:"8px",cursor:"pointer",
    fontFamily:"inherit",fontWeight:"700",fontSize:"13px",border:"none",
    background:copied?"#dcfce7":"#f5e000",color:copied?"#15803d":"#111",
    transition:"all 0.2s",letterSpacing:"0.2px"}}>
    {copied?"✓ Copiato negli appunti!":"📤 Condividi risultato"}
  </button>);
}

function DoneScreen({gameKey,day,isToday,onHome,onArchive,children}){
  const saved=isToday?loadResult(gameKey):null;
  if(saved)return(
    <div style={{...T.body,textAlign:"center",paddingTop:"24px"}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:"6px",background:US.greenL,
        borderRadius:"20px",padding:"5px 14px",marginBottom:"14px"}}>
        <span style={{fontSize:"12px",color:US.green,fontWeight:"700",letterSpacing:"0.5px",textTransform:"uppercase"}}>
          ✓ Già giocato oggi
        </span>
      </div>
      <div style={{background:US.surface,borderRadius:"10px",padding:"16px",marginBottom:"12px",
        border:`1px solid ${US.border}`}}>
        {children(saved)}
      </div>
      {isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginBottom:"8px",color:US.black}}>
        📂 Gioca le sfide passate
      </button>}
      <button onClick={onHome} style={{...T.pb,width:"100%"}}>← Torna alla Home</button>
    </div>
  );
  return null;
}

function Hdr({title,sub,onHome,archiveNav,countdown}){
  return(
    <div style={T.hdr}>
      <div style={{flex:1,minWidth:0}}>
        <div style={T.ey}>Universo Sportivo</div>
        <div style={T.ht}>{title}</div>
        {sub&&<div style={{fontSize:"9px",color:"#777",marginTop:"1px"}}>{sub}</div>}
        {countdown&&<div style={{fontSize:"8px",color:"#555",marginTop:"1px"}}>🔄 {countdown}</div>}
      </div>
      {archiveNav&&<div style={{display:"flex",alignItems:"center",gap:"4px",marginRight:"10px"}}>
        <button onClick={archiveNav.prev} disabled={archiveNav.day<=1} style={{...T.bk,padding:"5px 10px",fontSize:"12px",opacity:archiveNav.day<=1?0.3:1}}>◀</button>
        <div style={{textAlign:"center",minWidth:"44px"}}>
          <div style={{fontSize:"11px",color:"#fff",fontWeight:"700"}}>#{archiveNav.day}</div>
          <div style={{fontSize:"8px",color:"#888"}}>{dayToDate(archiveNav.day,archiveNav.poolSize)}</div>
        </div>
        <button onClick={archiveNav.next} disabled={archiveNav.day>=archiveNav.max} style={{...T.bk,padding:"5px 10px",fontSize:"12px",opacity:archiveNav.day>=archiveNav.max?0.3:1}}>▶</button>
      </div>}
      {onHome&&<button style={T.bk} onClick={onHome} onMouseEnter={e=>{e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="#fff";}} onMouseLeave={e=>{e.currentTarget.style.color="#aaa";e.currentTarget.style.borderColor="#444";}}>← Home</button>}
    </div>
  );
}

// ── ARCHIVE WRAPPER ──────────────────────────────────────────────────────
const DB_TOP100=DB.filter(p=>p.uciPts>0);
const POOL_SIZES={ciclodle:DB_TOP100.length,wordle:DB_TOP100.length,hangman:DB_TOP100.length,higherlower:DB_TOP100.length,carriera:CAREERS.length,lista:LISTA_CATEGORIES.length,salita:SALITE.length,timeline:TIMELINE_EVENTS.length};

const PAGE_SIZE=10;
function ArchiveWrapper({gameKey,children,todayDay}){
  const poolSize=POOL_SIZES[gameKey]||DB.length;
  const todayN=todayDay||poolSize;
  const[num,setNum]=useState(Math.max(1,todayN-1));
  const[page,setPage]=useState(0);
  const SEED_OFFSET={ciclodle:0,wordle:100001,hangman:200002,higherlower:300011,carriera:400003,lista:500004,salita:600005,timeline:700006};
  const seed=seedForNum(num,todayN)+(SEED_OFFSET[gameKey]||0);
  const isToday=num===todayN;

  const pageStart=todayN-1-page*PAGE_SIZE;
  const pageEnd=Math.max(1,pageStart-PAGE_SIZE+1);
  const chips=[];
  for(let n=pageEnd;n<=pageStart;n++)chips.push(n);
  const hasOlder=pageStart-PAGE_SIZE>=1;
  const hasNewer=page>0;

  const archiveNav={
    day:num,max:todayN,poolSize,
    prev:()=>setNum(n=>Math.max(1,n-1)),
    next:()=>setNum(n=>Math.min(todayN,n+1))
  };

  const chipBar=(
    <div style={{background:"#1a1a1a",padding:"8px 14px",borderBottom:"1px solid #2a2a2a"}}>
      <div style={{display:"flex",alignItems:"center",gap:"4px"}}>
        {hasOlder&&<button onClick={()=>setPage(p=>p+1)} style={{...T.bk,padding:"4px 7px",fontSize:"10px",flexShrink:0}}>◀</button>}
        <div style={{display:"flex",gap:"5px",overflowX:"auto",flex:1,paddingBottom:"2px"}}
          ref={el=>{if(el)el.scrollLeft=el.scrollWidth;}}>
          {chips.map(n=>(
            <div key={n} onClick={()=>setNum(n)}
              style={{flexShrink:0,background:num===n?"#2a2200":"#222",
                border:`1.5px solid ${num===n?US.orange:n===todayN&&loadResult(gameKey)?"#22c55e":"#333"}`,
                borderRadius:"6px",padding:"4px 8px",cursor:"pointer",textAlign:"center",minWidth:"46px",position:"relative"}}>
              {n===todayN&&loadResult(gameKey)&&<div style={{position:"absolute",top:"-3px",right:"-3px",width:"8px",height:"8px",borderRadius:"50%",background:"#22c55e",border:"1.5px solid #111"}}/>}
              <div style={{fontSize:"10px",fontWeight:"700",color:num===n?US.orange:"#ccc"}}>#{n}</div>
              <div style={{fontSize:"7px",color:num===n?US.orange:"#555",marginTop:"1px"}}>{dayToDate(n,todayN)}</div>
            </div>
          ))}
        </div>
        {hasNewer&&<button onClick={()=>setPage(p=>Math.max(0,p-1))} style={{...T.bk,padding:"4px 7px",fontSize:"10px",flexShrink:0}}>▶</button>}
      </div>
    </div>
  );

  return children({day:num,seed,isToday,archiveNav,chipBar});
}
// ── CICLODLE ─────────────────────────────────────────────────────────────
const COLS=[{key:"team",label:"Team"},{key:"nation",label:"Naz."},{key:"continent",label:"Cont."},{key:"age",label:"Età"},{key:"uciPts",label:"Pts UCI"},{key:"uciRank",label:"Rank"}];
const CLR={green:{bg:US.green,tx:"#fff"},yellow:{bg:US.yellow,tx:"#fff"},red:{bg:US.red,tx:"#fff"},empty:{bg:"#fff",tx:"#ccc"},active:{bg:"#fffbea",tx:"#bbb"}};
function eC(k,g,t){
  if(k==="age"){const d=Math.abs(g-t);return d===0?"green":d<=3?"yellow":"red";}
  if(k==="uciPts"){const d=Math.abs(g-t);return d===0?"green":d<=500?"yellow":"red";}
  if(k==="uciRank"){const d=Math.abs(g-t);return d===0?"green":d<=10?"yellow":"red";}
  return g===t?"green":"red";
}
function aD(k,g,t){if(k!=="age"&&k!=="uciPts"&&k!=="uciRank")return null;return g===t?null:g<t?"▲":"▼";}

function CiclodleFlipCell({value,arrow,color,flipped,colIdx}){
  const delay=colIdx*250;
  const bg=CLR[color]?.bg||"#e0e0e0";
  const borderCol=CLR[color]?.bg||"transparent";
  const[isFlipped,setIsFlipped]=useState(false);
  useEffect(()=>{setIsFlipped(false);},[value,color]);
  useEffect(()=>{if(flipped){const t=setTimeout(()=>setIsFlipped(true),delay);return()=>clearTimeout(t);}},[flipped]);
  return(
    <div style={{flex:1,minWidth:0,height:"46px",perspective:"400px"}}>
      <div style={{position:"relative",width:"100%",height:"100%",transformStyle:"preserve-3d",transition:`transform 1.4s ease`,transform:isFlipped?"rotateX(180deg)":"rotateX(0deg)"}}>
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",background:"#e8e8e8",borderRadius:"4px"}}/>
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateX(180deg)",background:bg,borderRadius:"4px",border:color!=="empty"&&color!=="active"?`2.5px solid ${borderCol}`:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",boxSizing:"border-box"}}>
          <span style={{fontWeight:"800",fontSize:"9px",color:"#fff",lineHeight:1.2,textAlign:"center",padding:"0 3px",letterSpacing:"0.2px"}}>{value}</span>
          {arrow&&<span style={{fontSize:"8px",color:"rgba(255,255,255,0.9)",fontWeight:"700"}}>{arrow}</span>}
        </div>
      </div>
    </div>
  );
}

function CiclodleGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const dailyPool=useMemo(()=>shuffle([...DB_TOP100],seedRandom(seed)),[seed]);
  const target=useMemo(()=>dailyPool[0],[dailyPool]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("ciclodle"):null;
  const[G,sG]=useState([]);const[inp,sI]=useState("");const[sg,sSg]=useState([]);const[ov,sO]=useState(false);const[won,sW]=useState(false);const[mo,sMo]=useState(false);const[animRows,setAnimRows]=useState([]);const[hintUsed,setHintUsed]=useState(false);
  const[hintCol,setHintCol]=useState(null);
  useEffect(()=>{sG([]);sI("");sSg([]);sO(false);sW(false);sMo(false);setAnimRows([]);setHintUsed(false);setHintCol(null);},[seed]);
  function useHint(){
    if(hintUsed||ov)return;
    const cols=COLS.map(c=>c.key);
    const neverGreen=cols.filter(k=>G.length===0||G.every(g=>eC(k,g[k],target[k])!=="green"));
    const pick=neverGreen.length>0?neverGreen[Math.floor(Math.random()*neverGreen.length)]:null;
    if(pick){setHintCol(pick);setHintUsed(true);}
  }
  function normSearch(s){if(!s)return "";return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
  function onI(v){sI(v);if(v.length<2){sSg([]);return;}const q=normSearch(v);const avail=DB_TOP100.filter(p=>!G.find(x=>x.name===p.name));const bySurname=avail.filter(p=>normSearch(p.surname).includes(q));const byName=avail.filter(p=>normSearch(p.name).includes(q)&&!bySurname.includes(p));sSg([...bySurname,...byName].slice(0,8));}
  function sub(p){
    if(ov)return;
    const ri=G.length;
    const ng=[...G,p];const w=p.name===target.name,o=ng.length>=6;
    sG(ng);sI("");sSg([]);
    setTimeout(()=>setAnimRows(s=>[...s,ri]),50);
    if(w){sW(true);sO(true);if(isToday){saveResult("ciclodle",{won:true,attempts:ng.length});saveStats("ciclodle",true);}setTimeout(()=>sMo(true),COLS.length*120+600);}
    else if(o){sO(true);if(isToday){saveResult("ciclodle",{won:false,attempts:6});saveStats("ciclodle",false);}setTimeout(()=>sMo(true),COLS.length*120+600);}
  }

  if(savedToday)return(<div style={T.app}><Hdr title="Ciclodle" sub={`🗓 Giornaliero • #${day}`} onHome={onHome}/><DoneScreen gameKey="ciclodle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"40px",marginBottom:"4px"}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,marginBottom:"2px"}}>{s.won?`Trovato in ${s.attempts}/6`:"Non trovato"}</div>
    <div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{target.name}</div>
    <div style={{display:"flex",gap:"4px",justifyContent:"center",marginBottom:"12px"}}>
      {Array.from({length:s.attempts||(s.won?1:6)}).map((_,i)=>(
        <div key={i} style={{width:"28px",height:"28px",borderRadius:"4px",
          background:s.won&&i===(s.attempts-1)?"#22c55e":"#ef4444",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px"}}>
          {s.won&&i===(s.attempts-1)?"✓":"✗"}
        </div>
      ))}
    </div>
    <ShareButton text={`🚴 Ciclodle #${day}\n${s.won?"Trovato in "+s.attempts+"/6":"Non trovato"}\nquiz-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={{...T.app,position:"relative"}}><Hdr title="Ciclodle" sub={`${label} • #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{display:"flex",gap:"4px",padding:"6px 12px",background:"#f8f8f6",borderBottom:`1px solid ${US.border}`,justifyContent:"center",flexWrap:"wrap"}}>
      {[["🟩","Esatto"],["🟨","Simile"],["🟥","Diverso"],["↑↓","Più alto/basso"]].map(([ic,lb])=>(
        <div key={lb} style={{display:"flex",alignItems:"center",gap:"3px",fontSize:"10px",color:US.muted}}>
          <span style={{fontSize:"11px"}}>{ic}</span><span>{lb}</span>
        </div>
      ))}
    </div>
    <div style={T.body}>
      {!ov&&<div style={{marginBottom:"14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
          <span style={T.lb}>Inserisci un corridore ({G.length}/6)</span>
          <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
            {!hintUsed?<button onClick={useHint} style={{background:"#eff6ff",border:"1px solid #2563eb",borderRadius:"4px",padding:"3px 8px",fontSize:"9px",cursor:"pointer",color:"#1d4ed8",fontFamily:"inherit"}}>💡 Indizio</button>:<span style={{fontSize:"9px",color:"#bbb"}}>💡 Usato</span>}
            {G.length>=4&&!ov&&<button onClick={()=>{sO(true);sW(false);if(isToday)saveResult("ciclodle",{won:false,attempts:G.length});sMo(true);}} style={{background:"#fef2f2",border:"1px solid #dc2626",borderRadius:"4px",padding:"3px 8px",fontSize:"9px",cursor:"pointer",color:"#dc2626",fontFamily:"inherit"}}>🏳 Arresa</button>}
          </div>
        </div>
        <div style={{position:"relative"}}>
          <input style={{...T.ip,width:"100%"}} value={inp} onChange={e=>onI(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&sg.length)sub(sg[0]);}} placeholder="Cerca corridore..." autoFocus/>
          {sg.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #e0e0e0",borderRadius:"2px",zIndex:10,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",marginTop:"2px"}}>
            {sg.map((p,i)=><div key={i} onClick={()=>sub(p)} style={{padding:"7px 11px",cursor:"pointer",fontSize:"12px",borderBottom:"1px solid #f5f5f5",display:"flex",justifyContent:"space-between"}} onMouseEnter={e=>e.currentTarget.style.background="#f8f8f6"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
              <span>{p.name}</span><span style={{color:"#bbb",fontSize:"10px"}}>{p.team}</span>
            </div>)}
          </div>}
        </div>
      </div>}
      {hintCol&&!ov&&<div style={{marginBottom:"8px",padding:"7px 12px",background:"#eff6ff",border:"1.5px solid #2563eb",borderRadius:"6px",textAlign:"center",fontSize:"11px",color:"#1d4ed8"}}>💡 <strong>{COLS.find(c=>c.key===hintCol)?.label}:</strong> {hintCol==="uciPts"?`${target[hintCol]} pts`:hintCol==="uciRank"?`#${target[hintCol]}`:target[hintCol]}</div>}
      {ov&&<div style={{marginBottom:"12px",padding:"9px 12px",background:won?US.greenL:US.redL,borderRadius:"6px",textAlign:"center",fontSize:"12px",fontWeight:"700",color:won?US.green:US.red}}>{won?`✓ Trovato in ${G.length}/6`:`✗ Era ${target.name}`}</div>}
      <div style={{display:"flex",gap:"10px",marginBottom:"10px"}}>{[[US.green,"Esatto"],[US.yellow,"Vicino"],[US.red,"Sbagliato"]].map(([c,l])=><div key={c} style={{display:"flex",alignItems:"center",gap:"3px",fontSize:"9px",color:"#999"}}><div style={{width:"8px",height:"8px",borderRadius:"2px",background:c}}/>{l}</div>)}</div>
      <div style={{width:"100%"}}>
        <div style={{display:"flex",gap:"3px",marginBottom:"4px",paddingLeft:"56px"}}>{COLS.map(c=><div key={c.key} style={{flex:1,fontSize:"8px",letterSpacing:"0.5px",textTransform:"uppercase",color:hintCol===c.key?"#fbbf24":"#fff",textAlign:"center",fontWeight:"700",background:hintCol===c.key?"#1d4ed8":"#222",borderRadius:"3px",padding:"3px 1px"}}>{c.label}{hintCol===c.key?" ★":""}</div>)}</div>
        {G.map((g,ri)=>(
          <div key={ri} style={{display:"flex",gap:"4px",alignItems:"center",marginBottom:"4px",borderRadius:"5px",outline:won&&ri===G.length-1?"2.5px solid #16a34a":"none",outlineOffset:"2px"}}>
            <div style={{width:"54px",fontSize:"9px",color:"#333",fontWeight:"600",textAlign:"right",paddingRight:"5px",flexShrink:0,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{g.name.split(" ").pop()}</div>
            {COLS.map((c,ci)=>{
              const cl=eC(c.key,g[c.key],target[c.key]);
              const ar=aD(c.key,g[c.key],target[c.key]);
              const val=c.key==="uciRank"?`#${g[c.key]}`:`${g[c.key]}`;
              return<CiclodleFlipCell key={`${ri}-${ci}`} value={val} arrow={ar} color={cl} colIdx={ci} flipped={animRows.includes(ri)}/>;
            })}
          </div>
        ))}
      </div>
    </div>
    {mo&&(()=>{
      const st=loadStats("ciclodle");
      const winPct=st.played>0?Math.round(st.won/st.played*100):0;
      const msg=won?(G.length===1?"🤯 Fenomeno! Al primo tentativo!":G.length===2?"🔥 Straordinario! Solo 2 tentativi!":G.length===3?"⚡ Ottimo! Trovato al 3° tentativo":G.length===4?"👍 Ben fatto! Al 4° tentativo":"😅 Ce l'hai fatta!"):"😔 Peccato, ci riproverai!";
      return(<>{won&&<Confetti active={mo}/>}<div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px",minHeight:"100%"}} onClick={()=>sMo(false)}><div style={{background:"#fff",borderRadius:"8px",maxWidth:"300px",width:"100%",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}} onClick={e=>e.stopPropagation()}>
        <div style={{background:won?"linear-gradient(135deg,#16a34a,#15803d)":"linear-gradient(135deg,#dc2626,#b91c1c)",color:"#fff",padding:"16px",textAlign:"center"}}>
          <div style={{fontSize:"36px",marginBottom:"4px"}}>{won?"🎉":"😔"}</div>
          <div style={{fontSize:"18px",fontWeight:"700",marginBottom:"2px"}}>{won?"Complimenti!":"Game Over"}</div>
          <div style={{fontSize:"12px",opacity:0.85}}>{msg}</div>
        </div>
        <div style={{padding:"14px 16px"}}>
          <div style={{border:"1.5px solid #e8e8e8",borderRadius:"6px",padding:"10px",marginBottom:"10px"}}>
            <div style={{fontWeight:"700",fontSize:"14px",marginBottom:"4px"}}>{target.name}</div>
            {[["Team",target.team],["Nazione",target.nation],["Età",target.age+" anni"],["UCI",`${target.uciPts} pts (#${target.uciRank})`]].map(([k,v])=><div key={k} style={{fontSize:"11px",color:"#777",marginBottom:"1px"}}><strong>{k}:</strong> {v}</div>)}
          </div>
          {isToday&&st.played>0&&<div style={{display:"flex",gap:"8px",marginBottom:"10px"}}>
            {[["Partite",st.played],["Vittorie",st.won],["%Vinte",winPct+"%"]].map(([l,v])=><div key={l} style={{flex:1,textAlign:"center",background:"#f9f9f9",borderRadius:"6px",padding:"8px 4px"}}>
              <div style={{fontSize:"18px",fontWeight:"700",color:US.black}}>{v}</div>
              <div style={{fontSize:"8px",color:"#999",textTransform:"uppercase",letterSpacing:"1px"}}>{l}</div>
            </div>)}
          </div>}
          <button onClick={()=>sMo(false)} style={{...T.pb,width:"100%",marginBottom:"6px"}}>Chiudi</button>
          <ShareButton text={`🚴 Ciclodle #${day}\n${won?"Trovato in "+G.length+"/6":"Non trovato"}\n${G.map((_,i)=>won&&i===G.length-1?"🟩":"🟥").join("")}\nquiz-ciclismo.vercel.app`}/>
          {!isToday&&archiveNav&&archiveNav.day<archiveNav.max&&<button onClick={archiveNav.next} style={{...T.pb,width:"100%",marginBottom:"6px"}}>→ Prossima sfida</button>}{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
          {!isToday&&<button onClick={()=>{sG([]);sI("");sSg([]);sO(false);sW(false);sMo(false);setAnimRows([]);setHintUsed(false);setHintCol(null);}} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>🔀 Rigioca</button>}
        </div>
      </div></div></> );
    })()}
  </div>);
}
function Ciclodle({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB_TOP100.length,s=todaySeed();return<CiclodleGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="ciclodle">{({day,seed,isToday,archiveNav,chipBar})=><CiclodleGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}
// ── WORDLE COGNOME ───────────────────────────────────────────────────────
function WordleFlipCell({letter,color,colIdx,cellSize=52,cellFont=22}){
  const[revealed,setRevealed]=useState(false);
  const delay=colIdx*220;
  useEffect(()=>{const t=setTimeout(()=>setRevealed(true),delay);return()=>clearTimeout(t);},[]);
  return(
    <div style={{width:`${cellSize}px`,height:`${cellSize}px`,borderRadius:"4px",background:revealed?color:"#e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:`${cellFont}px`,fontWeight:"800",color:"#fff",transition:`background 0.15s ${delay}ms, transform 0.5s ${delay}ms`,transform:revealed?"scaleY(1)":"scaleY(0.01)",letterSpacing:"1px"}}>
      {revealed?letter:""}
    </div>
  );
}
function WordleGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const MAX_ATT=6;
  const pool=useMemo(()=>{const daily=shuffle([...DB_TOP100],seedRandom(seed));return daily.filter(p=>normStr(p.surname).length>=4&&normStr(p.surname).length<=8).slice(1);},[seed]);
  const rider=pool[0]||DB_TOP100[0];
  const word=normStr(rider.surname);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("wordle"):null;
  const[attempts,setAttempts]=useState([]);
  const[current,setCurrent]=useState("");
  const[status,setStatus]=useState("playing");
  const[showConfetti,setShowConfetti]=useState(false);
  useEffect(()=>{setAttempts([]);setCurrent("");setStatus("playing");setShowConfetti(false);},[seed]);

  function evalGuess(guess){
    const g=normStr(guess).slice(0,word.length).padEnd(word.length," ");
    return g.split("").map((c,i)=>{
      if(c===word[i])return{c,s:"green"};
      if(word.includes(c))return{c,s:"yellow"};
      return{c,s:"gray"};
    });
  }
  function submit(){
    if(status!=="playing")return;
    const g=normStr(current);
    if(g.length!==word.length)return;
    const ev=evalGuess(g);
    const newAttempts=[...attempts,ev];
    setAttempts(newAttempts);
    setCurrent("");
    if(ev.every(x=>x.s==="green")){setStatus("won");setShowConfetti(true);if(isToday)saveResult("wordle",{won:true,attempts:newAttempts.length,word});}
    else if(newAttempts.length>=MAX_ATT){setStatus("lost");if(isToday)saveResult("wordle",{won:false,attempts:MAX_ATT,word});}
  }

  const used={};
  attempts.flat().forEach(({c,s})=>{if(!used[c]||used[c]==="gray"||(used[c]==="yellow"&&s==="green"))used[c]=s;});
  const colBg={green:"#22c55e",yellow:"#eab308",gray:"#6b7280"};

  const[hint,setHint]=useState(false);
  if(savedToday)return(<div style={T.app}><Hdr title="Wordle Cognome" sub={`🗓 Giornaliero • #${day}`} onHome={onHome}/><DoneScreen gameKey="wordle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"40px",marginBottom:"4px"}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,marginBottom:"2px"}}>{s.won?`Trovato in ${s.attempts}/6`:"Non trovato"}</div>
    <div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{word}</div>
    <div style={{display:"flex",gap:"4px",justifyContent:"center",marginBottom:"12px"}}>
      {Array.from({length:s.attempts||(s.won?1:6)}).map((_,i)=>(
        <div key={i} style={{width:"28px",height:"28px",borderRadius:"4px",
          background:s.won&&i===(s.attempts-1)?"#22c55e":"#ef4444",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px"}}>
          {s.won&&i===(s.attempts-1)?"✓":"✗"}
        </div>
      ))}
    </div>
    <ShareButton text={`🔤 Wordle #${day}\n${s.won?"Trovato in "+s.attempts+"/6":"Non trovato"}\n${word}\nquiz-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={{...T.app,position:"relative"}}>{showConfetti&&<Confetti active={showConfetti}/>}<Hdr title="Wordle Cognome" sub={`${label} • #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"400px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <div style={{display:"flex",gap:"10px",alignItems:"center"}}><span style={{fontSize:"11px",color:"#888",fontWeight:"600"}}>{word.length} lettere</span><span style={{fontSize:"11px",color:attempts.length>0?US.orange:"#aaa",fontWeight:"700"}}>{attempts.length}/{MAX_ATT}</span></div>
        <button onClick={()=>setHint(h=>!h)} style={{background:"none",border:`1px solid ${hint?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:hint?US.yellow:"#aaa",cursor:"pointer",fontFamily:"inherit"}}>💡 {hint?"Nascondi":"Indizio"}</button>
      </div>
      {hint&&<div style={{fontSize:"10px",color:"#777",marginBottom:"10px",padding:"6px 10px",background:"#fffbea",border:"1px solid #fde68a",borderRadius:"4px"}}>{rider.nation} • {rider.team} • #{rider.uciRank} UCI</div>}
      {(()=>{const cellSize=word.length<=6?52:word.length===7?44:37;const cellFont=word.length<=6?22:word.length===7?18:15;const cg=word.length<=6?"6px":"5px";return(
      <div style={{display:"flex",flexDirection:"column",gap:cg,marginBottom:"16px",alignItems:"center"}}>
        {Array.from({length:MAX_ATT}).map((_,ri)=>{
          const att=attempts[ri];
          const isActive=ri===attempts.length&&status==="playing";
          const disp=isActive?normStr(current).padEnd(word.length," ").slice(0,word.length).split(""):Array(word.length).fill(" ");
          return(<div key={ri} style={{display:"flex",gap:cg,padding:"2px 0"}}>
            {Array.from({length:word.length}).map((_,ci)=>{
              const filled=att?att[ci]:null;
              if(filled){
                return(<WordleFlipCell key={ci} letter={filled.c} color={colBg[filled.s]||"#e0e0e0"} colIdx={ci} cellSize={cellSize} cellFont={cellFont}/>);
              }
              const hasletter=isActive&&disp[ci].trim();return(<div key={ci} style={{width:`${cellSize}px`,height:`${cellSize}px`,borderRadius:"4px",background:hasletter?"#fff":"#f3f3f3",border:hasletter?"2.5px solid #888":"2px solid #d0d0d0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:`${cellFont}px`,fontWeight:"800",color:US.black,transform:hasletter?"scale(1.05)":"scale(1)",transition:"transform 0.1s ease"}}>{isActive?disp[ci].trim():""}</div>);
            })}
          </div>);
        })}
      </div>);})()}
      {status==="playing"&&<div>
        <input value={current} onChange={e=>{const raw=e.target.value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');const v=raw.replace(/[^A-Z]/g,'').slice(0,word.length);setCurrent(v);}} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();submit();}}} placeholder={`${word.length} lettere...`} style={{...T.ip,width:"100%",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"3px",textAlign:"center",fontSize:"16px"}} autoFocus/>
        <button onClick={submit} disabled={normStr(current).length!==word.length} style={{...T.pb,width:"100%",opacity:normStr(current).length===word.length?1:0.4}}>Invio</button>
        <div style={{marginTop:"12px"}}>{[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]].map((row,ri)=><div key={ri} style={{display:"flex",justifyContent:"center",gap:"5px",marginBottom:"5px"}}>{row.map(k=>{const st=used[k];return<button key={k} onClick={()=>setCurrent(c=>(c.length<word.length?c+k:c))} style={{background:st?(colBg[st]||"#9ca3af"):"#e0e0e0",color:st?"#fff":"#333",border:"none",padding:"10px 4px",minWidth:"30px",fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit",borderRadius:"5px"}}>{k}</button>;})} </div>)}</div>
      </div>}
      {(status==="won"||status==="lost")&&<div className="pop-in" style={{textAlign:"center",padding:"14px",background:status==="won"?US.greenL:US.redL,borderRadius:"6px",color:status==="won"?US.green:US.red}}>
        <div style={{fontSize:"14px",fontWeight:"700",marginBottom:"4px"}}>{status==="won"?"Corretto!":"Era..."}</div>
        <div style={{fontSize:"18px",fontWeight:"700",letterSpacing:"3px"}}>{word}</div>
        <div style={{fontSize:"11px",marginTop:"2px",color:"#666"}}>{rider.name} • {rider.team}</div>
        <ShareButton text={`🔤 Wordle #${day} — ${word}\n${attempts.map(a=>a.map(x=>x.s==="green"?"🟩":x.s==="yellow"?"🟨":"⬛").join("")).join("\n")}\nquiz-ciclismo.vercel.app`}/>{!isToday&&archiveNav&&archiveNav.day<archiveNav.max&&<button onClick={archiveNav.next} style={{...T.pb,width:"100%",marginBottom:"6px"}}>→ Prossima sfida</button>}{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
        {!isToday&&<button onClick={()=>{setAttempts([]);setCurrent("");setStatus("playing");}} style={{...T.sb,marginTop:"10px",color:US.black}}>🔀 Rigioca</button>}
      </div>}
    </div>
  </div>);
}
function WordleCognome({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB_TOP100.length,s=todaySeed()+100001;return<WordleGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="wordle">{({day,seed,isToday,archiveNav,chipBar})=><WordleGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── IMPICCATO ────────────────────────────────────────────────────────────
function HangmanGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const M=7;
  const pool=useMemo(()=>{const daily=shuffle([...DB_TOP100],seedRandom(seed));return daily.filter(p=>normStr(p.surname).length>=4).slice(2);},[seed]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("hangman"):null;
  const[gu,sGu]=useState(new Set());const[st,sSt]=useState("p");
  useEffect(()=>{sGu(new Set());sSt("p");},[seed]);
  const rd=pool[0]||DB_TOP100[0],wd=normStr(rd.surname),wr=[...gu].filter(c=>!wd.includes(c)),wc=wr.length,rv=wd.split("").every(c=>gu.has(c));
  useEffect(()=>{if(rv&&st==="p"){sSt("w");if(isToday)saveResult("hangman",{won:true,word:wd,errors:wc});}else if(wc>=M&&st==="p"){sSt("l");if(isToday)saveResult("hangman",{won:false,word:wd,errors:wc});}},[gu]);
  function g(c){if(st!=="p"||gu.has(c))return;sGu(x=>new Set([...x,c]));}
  const isAlive=st!=="l";
  const bc=isAlive?"#2563eb":"#dc2626";
  const fc=isAlive?"#eff6ff":"#fef2f2";

  const[hint,setHint]=useState(false);const[hgConfetti,setHgConfetti]=useState(false);
  useEffect(()=>{if(st==="w"&&!hgConfetti)setTimeout(()=>setHgConfetti(true),500);},[st]);
  if(savedToday)return(<div style={T.app}><Hdr title="Impiccato" sub={`🗓 Giornaliero • #${day}`} onHome={onHome}/><DoneScreen gameKey="hangman" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"40px",marginBottom:"6px"}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,marginBottom:"4px"}}>{s.won?"Trovato!":"Non trovato"}</div>
    <div style={{fontSize:"18px",fontWeight:"800",letterSpacing:"4px",color:US.black,marginBottom:"6px"}}>{s.word}</div>
    <ShareButton text={`🪢 Impiccato #${day}\n${s.won?"Trovato":"Non trovato"}: ${s.word}\n${s.errors||0} errori\nquiz-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={{...T.app,position:"relative"}}>{hgConfetti&&<Confetti active={hgConfetti}/>}<Hdr title="Impiccato" sub={`${label} • #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"400px"}}>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"6px"}}>
        <button onClick={()=>setHint(h=>!h)} style={{background:"none",border:`1px solid ${hint?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:hint?US.yellow:"#aaa",cursor:"pointer",fontFamily:"inherit"}}>💡 {hint?"Nascondi":"Indizio"}</button>
      </div>
      {hint&&<div style={{fontSize:"10px",color:"#777",marginBottom:"6px",padding:"6px 10px",background:"#fffbea",border:"1px solid #fde68a",borderRadius:"4px"}}>{rd.nation} • {rd.team} • #{rd.uciRank} UCI</div>}
      <div style={{display:"flex",justifyContent:"center",marginBottom:"8px"}}><svg width="110" height="96" viewBox="0 0 110 96">
              <line x1="8" y1="90" x2="102" y2="90" stroke="#ccc" strokeWidth="3" strokeLinecap="round"/>
              <line x1="24" y1="90" x2="24" y2="4" stroke="#aaa" strokeWidth="3" strokeLinecap="round"/>
              <line x1="24" y1="4" x2="54" y2="4" stroke="#aaa" strokeWidth="3" strokeLinecap="round"/>
              <line x1="54" y1="4" x2="54" y2="10" stroke="#888" strokeWidth="2.5" strokeLinecap="round"/>
              {wc>=1&&<circle cx="54" cy="19" r="9" stroke={bc} strokeWidth="2.5" fill={fc}/>}
              {wc>=1&&(st==="w"?<><circle cx="51" cy="17" r="1.5" fill="#22c55e"/><circle cx="57" cy="17" r="1.5" fill="#22c55e"/><path d="M49 22 Q54 26 59 22" stroke="#22c55e" strokeWidth="1.8" fill="none" strokeLinecap="round"/></>:st==="l"?<><line x1="49" y1="15" x2="53" y2="19" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/><line x1="53" y1="15" x2="49" y2="19" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/><line x1="55" y1="15" x2="59" y2="19" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/><line x1="59" y1="15" x2="55" y2="19" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/><path d="M49 24 Q54 20 59 24" stroke="#dc2626" strokeWidth="1.8" fill="none" strokeLinecap="round"/></>:<><circle cx="51" cy="17" r="1.5" fill={bc}/><circle cx="57" cy="17" r="1.5" fill={bc}/><path d="M50 22 Q54 24 58 22" stroke={bc} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>)}
              {wc>=2&&<line x1="54" y1="28" x2="54" y2="58" stroke={bc} strokeWidth="3" strokeLinecap="round"/>}
              {wc>=3&&<line x1="54" y1="36" x2="38" y2="50" stroke={bc} strokeWidth="2.5" strokeLinecap="round"/>}
              {wc>=4&&<line x1="54" y1="36" x2="70" y2="50" stroke={bc} strokeWidth="2.5" strokeLinecap="round"/>}
              {wc>=5&&<line x1="54" y1="58" x2="40" y2="76" stroke={bc} strokeWidth="2.5" strokeLinecap="round"/>}
              {wc>=6&&<line x1="54" y1="58" x2="68" y2="76" stroke={bc} strokeWidth="2.5" strokeLinecap="round"/>}
            </svg></div>
      <div style={{display:"flex",justifyContent:"center",gap:"4px",marginBottom:"14px",flexWrap:"wrap"}}>{wd.split("").map((c,i)=><div key={i} style={{width:"28px",height:"36px",borderBottom:`2.5px solid ${st==="l"&&!gu.has(c)?US.red:US.black}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",fontWeight:"700",color:st==="l"&&!gu.has(c)?US.red:US.black}}>{gu.has(c)||st==="l"?c:""}</div>)}</div>
      <div style={{textAlign:"center",marginBottom:"10px",fontSize:"10px",color:"#999"}}>Errori: <strong style={{color:wc>=5?US.red:"#333"}}>{wc}/{M}</strong></div>
      {st==="p"&&<div>{[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]].map((row,ri)=><div key={ri} style={{display:"flex",justifyContent:"center",gap:"2px",marginBottom:"2px"}}>{row.map(k=>{const u=gu.has(k),cr=wd.includes(k)&&u,wr2=!wd.includes(k)&&u;return<button key={k} onClick={()=>g(k)} disabled={u} style={{background:cr?"#22c55e":wr2?"#ef4444":u?"#d1d5db":"#e8e8e8",color:u?"#fff":"#111",border:cr?"2px solid #16a34a":wr2?"2px solid #dc2626":"1px solid #ccc",borderRadius:"4px",padding:"8px 4px",minWidth:"26px",fontSize:"11px",fontWeight:"700",cursor:u?"default":"pointer",fontFamily:"inherit"}}>{k}</button>;})} </div>)}</div>}
      {(st==="w"||st==="l")&&<div className="pop-in" style={{textAlign:"center",marginTop:"10px"}}><div style={{padding:"9px",borderRadius:"2px",background:st==="w"?US.greenL:US.redL,color:st==="w"?US.green:US.red,fontSize:"13px",fontWeight:"700",marginBottom:"8px"}}>{st==="w"?"🎉 Trovato!":"💀 Non trovato — "+wd}</div><ShareButton text={`🪢 Impiccato #${day} — ${st==="w"?"Trovato":"Non trovato"} (${wc}/${M} errori)\n${wd}\nquiz-ciclismo.vercel.app`}/>{!isToday&&archiveNav&&archiveNav.day<archiveNav.max&&<button onClick={archiveNav.next} style={{...T.pb,width:"100%",marginBottom:"6px"}}>→ Prossima sfida</button>}{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}<button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button></div>}
    </div>
  </div>);
}
function Hangman({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB_TOP100.length,s=todaySeed()+200002;return<HangmanGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="hangman">{({day,seed,isToday,archiveNav,chipBar})=><HangmanGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── CHI HA PIÙ PUNTI UCI ────────────────────────────────────────────────
function HigherOrLowerGame({onHome}){
  function rndRider(exclude){
    let p,tries=0;
    do{p=DB_TOP100[Math.floor(Math.random()*DB_TOP100.length)];tries++;}
    while(exclude&&p.name===exclude.name&&tries<50);
    return p;
  }

  const[base,setBase]=useState(()=>rndRider(null));
  const[challenger,setChallenger]=useState(()=>{const b=rndRider(null);return rndRider(b);});
  const[chosen,setChosen]=useState(null);
  const[streak,setStreak]=useState(0);
  const[best,setBest]=useState(()=>{try{return parseInt(localStorage.getItem('uc_hl_best')||'0');}catch{return 0;}});
  const[done,setDone]=useState(false);
  const[round,setRound]=useState(1);
  const[confetti,setConfetti]=useState(false);

  const tied=base.uciPts===challenger.uciPts;
  const winner=base.uciPts>=challenger.uciPts?'base':'challenger';

  function choose(who){
    if(chosen||done)return;
    setChosen(who);
    const ok=who===winner||tied;
    setTimeout(()=>{
      if(ok){
        const ns=streak+1;
        setStreak(ns);
        setRound(r=>r+1);
        if(ns>best){setBest(ns);try{localStorage.setItem('uc_hl_best',String(ns));}catch{}}
        if(ns>0&&(ns%5===0||ns===1))setConfetti(true);
        setTimeout(()=>setConfetti(false),2500);
        const newChallenger=rndRider(challenger);
        setBase(challenger);
        setChallenger(newChallenger);
        setChosen(null);
      } else {
        setDone(true);
      }
    },1400);
  }

  function restart(){
    const nb=rndRider(null);
    setBase(nb);
    setChallenger(rndRider(nb));
    setChosen(null);setStreak(0);setDone(false);setConfetti(false);setRound(1);
  }

  if(done)return(
    <div style={T.app}>
      {confetti&&<Confetti active={confetti}/>}
      <Hdr title="Chi ha più punti UCI" onHome={onHome}/>
      <div style={{...T.body,textAlign:"center",paddingTop:"28px"}} className="pop-in">
        <div style={{fontSize:"52px",marginBottom:"8px"}}>😔</div>
        <div style={{fontSize:"22px",fontWeight:"800",color:US.black,marginBottom:"4px"}}>Streak: {streak}</div>
        <div style={{fontSize:"13px",color:US.muted,marginBottom:"18px"}}>Record personale: {best}</div>
        <div style={{background:US.surface,borderRadius:"10px",padding:"14px",marginBottom:"16px",border:`1px solid ${US.border}`,textAlign:"left"}}>
          <div style={{fontSize:"11px",color:US.muted,marginBottom:"8px",textAlign:"center"}}>La risposta era:</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {[{p:base,label:"Base",who:"base"},{p:challenger,label:"Sfidante",who:"challenger"}].map(({p,label,who})=>(
              <div key={who} style={{background:who===winner?"#f0fdf4":"#fef2f2",borderRadius:"8px",padding:"10px",textAlign:"center",border:`1.5px solid ${who===winner?"#16a34a":"#dc2626"}`}}>
                <div style={{fontSize:"9px",color:US.muted,textTransform:"uppercase",marginBottom:"4px"}}>{label}</div>
                <div style={{fontSize:"12px",fontWeight:"700"}}>{p.name}</div>
                <div style={{fontSize:"10px",color:US.muted}}>{p.team}</div>
                <div style={{fontSize:"18px",fontWeight:"800",color:"#333",marginTop:"6px"}}>{p.uciPts} pts</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={restart} style={{...T.pb,width:"100%",marginBottom:"8px"}}>🔄 Rigioca</button>
        <button onClick={onHome} style={{...T.sb,width:"100%",color:US.black}}>← Home</button>
      </div>
    </div>
  );

  return(
    <div style={T.app}>
      {confetti&&<Confetti active={confetti}/>}
      <Hdr title="Chi ha più punti UCI" sub={`⚖ Confronto #${round}`} onHome={onHome}/>
      <div style={{...T.body,maxWidth:"460px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"28px",fontWeight:"900",color:US.orange,lineHeight:1}}>{streak}</span>
            <div>
              <div style={{fontSize:"11px",fontWeight:"700",color:US.black}}>streak</div>
              <div style={{fontSize:"10px",color:US.muted}}>record: {best}</div>
            </div>
          </div>
          <div style={{fontSize:"12px",color:US.muted,fontWeight:"600"}}>Chi ha più punti UCI?</div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"12px"}}>
          {[
            {p:base,showVal:true,who:"base"},
            {p:challenger,showVal:!!chosen,who:"challenger"}
          ].map(({p,showVal,who})=>{
            let bg=US.bg,bd=`1.5px solid ${US.border}`,vColor=US.black;
            if(chosen){
              const isWinner=who===winner;
              bg=isWinner?"#f0fdf4":"#fef2f2";
              bd=`2px solid ${isWinner?"#16a34a":"#dc2626"}`;
              vColor=isWinner?"#16a34a":"#dc2626";
            }
            return(
              <button key={who} onClick={()=>choose(who)}
                disabled={!!chosen}
                style={{background:bg,border:bd,borderRadius:"12px",padding:"16px 12px",
                  textAlign:"center",cursor:chosen?"default":"pointer",
                  fontFamily:"inherit",transition:"all 0.2s"}}>
                <div style={{fontSize:"13px",fontWeight:"700",color:US.black,marginBottom:"4px",lineHeight:1.3}}>{p.name}</div>
                <div style={{fontSize:"10px",color:US.muted,marginBottom:"2px"}}>{p.team}</div>
                <div style={{fontSize:"10px",color:US.muted,marginBottom:"10px"}}>{p.nation} • {p.age} anni</div>
                {showVal
                  ? <div style={{fontSize:"22px",fontWeight:"900",color:vColor}}>{p.uciPts} pts</div>
                  : chosen
                    ? <div style={{fontSize:"22px",fontWeight:"900",color:vColor}}>{p.uciPts} pts</div>
                    : <div style={{fontSize:"22px",fontWeight:"900",color:"#ccc"}}>?</div>
                }
                {chosen&&(who===winner||tied)&&<div style={{fontSize:"9px",fontWeight:"700",color:"#16a34a",marginTop:"3px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{tied?"= Stessi punti":"✓ Più punti"}</div>}
              </button>
            );
          })}
        </div>

        {chosen&&(
          <div style={{textAlign:"center",padding:"10px",borderRadius:"8px",
            background:chosen===winner||tied?"#f0fdf4":"#fef2f2",
            color:chosen===winner||tied?"#16a34a":"#dc2626",
            fontSize:"13px",fontWeight:"700"}}>
            {tied?"🟰 Stessi punti! "+base.uciPts+" pts — punto valido":chosen===winner
              ? `✅ Corretto! ${winner==="challenger"?challenger.name:base.name} ha più punti`
              : `❌ Sbagliato — ${winner==="challenger"?challenger.name:base.name} aveva ${winner==="challenger"?challenger.uciPts:base.uciPts} pts`}
          </div>
        )}
        {!chosen&&<div style={{textAlign:"center",fontSize:"11px",color:US.muted}}>
          Clicca sul corridore con più punti UCI 2025
        </div>}
      </div>
    </div>
  );
}
function ChiPiuPunti({onHome}){return <HigherOrLowerGame onHome={onHome}/>;}
// ── INDOVINA LA CARRIERA ─────────────────────────────────────────────────
function CarrieraGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const rider=CAREERS[(day-1)%CAREERS.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("carriera"):null;
  const maxC=rider.clues.length;
  const[rev,sRev]=useState(1);const[gu,sGu]=useState("");const[st,sSt]=useState("p");const[sc,sSc]=useState(0);const[fin,sFin]=useState(false);const[shownNotes,sShownNotes]=useState(new Set());const[carConf,setCarConf]=useState(false);
  useEffect(()=>{sRev(1);sGu("");sSt("p");sSc(0);sFin(false);sShownNotes(new Set());},[seed]);
  const pts=Math.max(1,maxC+1-rev);
  function sub(){
    const g=normLow(gu.trim()),a=normLow(rider.answer);
    const ok=g===a||a.split(" ").some(p=>p.length>3&&g===p)||(g.length>4&&a.includes(g));
    if(ok){sSc(x=>x+pts);sSt("c");}
    else{if(rev<maxC){sRev(x=>x+1);sSt("w");setTimeout(()=>sSt("p"),900);}else sSt("r");}
    sGu("");
  }
  if(savedToday&&isToday)return(<div style={{...T.app,position:"relative"}}>{carConf&&<Confetti active={carConf}/>}<Hdr title="Indovina la Carriera" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="carriera" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>🏆</div><div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.score} punti</div><ShareButton text={`🏆 Indovina la Carriera #${day}\n${s.score} punti\nquiz-ciclismo.vercel.app`}/></>}</DoneScreen></div>);
  if(fin)return(<div style={{...T.app,position:"relative"}} className="pop-in">{carConf&&<Confetti active={carConf}/>}<Hdr title="Indovina la Carriera" onHome={onHome}/><div style={{...T.body,textAlign:"center",paddingTop:"40px"}}><div style={{fontSize:"48px",fontWeight:"300",color:US.black}}>{sc}</div><div style={{fontSize:"12px",color:"#888",marginBottom:"18px"}}>punti totali</div><ShareButton text={`🏆 Indovina la Carriera #${day}\n${sc} punti\nquiz-ciclismo.vercel.app`}/>{!isToday&&archiveNav&&archiveNav.day<archiveNav.max&&<button onClick={archiveNav.next} style={{...T.pb,width:"100%",marginBottom:"6px"}}>→ Prossima sfida</button>}{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}<button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button></div></div>);
  return(<div style={T.app}><Hdr title="Indovina la Carriera" sub={`${label} • #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"520px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <div style={{fontSize:"11px",color:"#888"}}>{st==="p"&&<>Vale <strong style={{color:US.black}}>{pts} punt{pts===1?"o":"i"}</strong></>}</div>
        <button onClick={()=>sRev(r=>Math.min(r+1,maxC))} disabled={rev>=maxC||st!=="p"} style={{background:"none",border:`1px solid ${rev<maxC&&st==="p"?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:rev<maxC&&st==="p"?US.yellow:"#bbb",cursor:rev<maxC&&st==="p"?"pointer":"default",fontFamily:"inherit"}}>💡 {rev}/{maxC} {rev<maxC&&st==="p"?"→ Prossimo indizio":"indizi"}</button>
      </div>
      {rider.clues.slice(0,rev).map((c,i)=>{
        const noteVisible=shownNotes.has(i);
        return(<div key={i} style={{border:"1.5px solid #e0e0e0",borderLeftWidth:i===rev-1?"3px":"1.5px",borderLeftColor:i===rev-1?US.black:"#e0e0e0",borderRadius:"2px",padding:"9px 11px",marginBottom:"5px",background:i===rev-1?"#fafaf8":"#fff"}}>
          {i===rev-1&&rev>1&&<div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"2px",fontWeight:"700"}}>Nuovo indizio</div>}
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2px"}}><span style={{fontWeight:"700",fontSize:"13px"}}>{c.team}</span><span style={{fontSize:"10px",color:"#aaa"}}>{c.period}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1px"}}>
            <div style={{display:"flex",gap:"10px"}}><span style={{fontSize:"10px",color:"#555"}}><strong>{c.days}</strong> giorni di gara</span></div>
            {!noteVisible&&<button onClick={()=>sShownNotes(s=>new Set([...s,i]))} style={{background:"none",border:"none",color:"#bbb",fontSize:"8px",cursor:"pointer",fontFamily:"inherit",padding:"0",textDecoration:"underline"}}>💡 nota</button>}
          </div>
          {noteVisible&&<div style={{fontSize:"9px",color:"#888",fontStyle:"italic",marginTop:"2px"}}>{c.note}</div>}
        </div>);
      })}
      <div style={{height:"1px",background:"#e8e8e8",margin:"10px 0"}}/>
      {st!=="c"&&st!=="r"&&<><span style={T.lb}>Chi è questo corridore?</span><div style={{display:"flex",gap:"7px"}}><input style={{...T.ip,flex:1,border:`1.5px solid ${st==="w"?US.red:"#ddd"}`}} value={gu} onChange={e=>sGu(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gu.trim()&&sub()} placeholder="Scrivi il nome..." autoFocus/><button onClick={sub} disabled={!gu.trim()} style={{...T.pb,opacity:gu.trim()?1:0.4}}>Indovina</button></div>{st==="w"&&<div style={{fontSize:"10px",color:US.red,marginTop:"4px"}}>✗ Errato — {rev<maxC?"nuovo indizio!":"nessun indizio rimasto"}</div>}<div style={{textAlign:"right",marginTop:"5px"}}><button onClick={()=>sSt("r")} style={{background:"none",border:"none",color:"#bbb",fontSize:"9px",cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Non lo so</button></div></>}
      {st==="c"&&<><div style={{padding:"8px",background:US.greenL,border:"1px solid #bbf7d0",borderRadius:"2px",color:US.green,fontSize:"12px",marginBottom:"9px"}}>✓ Corretto! Era <strong>{rider.answer}</strong> — <strong>+{pts} punti</strong></div><div style={{textAlign:"right"}}><button onClick={()=>{if(isToday)saveResult("carriera",{score:sc,done:true});sFin(true);setTimeout(()=>setCarConf(true),400);}} style={T.pb}>Risultato →</button></div></>}
      {st==="r"&&<><div style={{padding:"8px",background:"#f8f7f4",border:"1px solid #e0e0e0",borderRadius:"2px",color:"#555",fontSize:"12px",marginBottom:"9px"}}>Era <strong>{rider.answer}</strong></div><div style={{textAlign:"right"}}><button onClick={()=>{if(isToday)saveResult("carriera",{score:sc,done:true});sFin(true);}} style={T.pb}>Risultato →</button></div></>}
    </div>
  </div>);
}
function Carriera({onHome,isDaily,onArchive}){
  const todayCarriera=(dayIndex()+3)%CAREERS.length+1;
  if(isDaily){const d=todayCarriera,s=todaySeed();return<CarrieraGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="carriera" todayDay={todayCarriera}>{({day,seed,isToday,archiveNav,chipBar})=><CarrieraGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── TIMER RING (shared) ──────────────────────────────────────────────────
function TimerRing({seconds,total}){
  const r=32,circ=2*Math.PI*r;
  const color=seconds<=10?US.red:seconds<=20?US.yellow:US.green;
  const frac=Math.min(1,seconds/total);
  return(<svg width="76" height="76" viewBox="0 0 76 76"><circle cx="38" cy="38" r={r} fill="none" stroke="#e0e0e0" strokeWidth="5"/><circle cx="38" cy="38" r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={circ} strokeDashoffset={circ*(1-frac)} strokeLinecap="round" transform="rotate(-90 38 38)" style={{transition:"stroke-dashoffset 1s linear,stroke 0.3s"}}/><text x="38" y="43" textAnchor="middle" fontSize="17" fontWeight="700" fill={color} fontFamily="'Helvetica Neue',Arial,sans-serif">{seconds}</text></svg>);
}

// ── LISTA QUIZ ──────────────────────────────────────────────────────────
function ListaQuizGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const TOTAL=90,BONUS=5;
  const cat=LISTA_CATEGORIES[(day-1)%LISTA_CATEGORIES.length];
  const validAnswers=cat.unique||cat.answers;
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("lista"):null;
  const[input,setInput]=useState("");
  const[found,setFound]=useState([]);
  const[wrong,setWrong]=useState(null);
  const[seconds,setSeconds]=useState(TOTAL);
  const[lastFound,setLastFound]=useState(null);
  const[done,setDone]=useState(false);
  const[listaConf,setListaConf]=useState(false);
  const inputRef=useRef(null);
  const timerRef=useRef(null);
  useEffect(()=>{setInput("");setFound([]);setWrong(null);setSeconds(TOTAL);setLastFound(null);setDone(false);},[seed]);
  useEffect(()=>{
    if(done)return;
    clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>setSeconds(s=>{if(s<=1){clearInterval(timerRef.current);setDone(true);setTimeout(()=>setListaConf(true),300);return 0;}return s-1;}),1000);
    setTimeout(()=>inputRef.current?.focus(),100);
    return()=>clearInterval(timerRef.current);
  },[seed,done]);
  useEffect(()=>{if(done&&isToday)saveResult("lista",{found:found.length,total:validAnswers.length,title:cat.title,foundNames:found,allNames:validAnswers});},[done]);
  function submit(){
    const v=normLow(input);if(!v)return;
    const match=validAnswers.find(p=>fuzzyMatch(input,p)&&!found.includes(p));
    if(match){
      setFound(f=>[...f,match]);setLastFound(match);setWrong(null);setInput("");
      setSeconds(s=>s+BONUS);
      setTimeout(()=>setLastFound(null),1200);
    } else {
      setWrong(input);setInput("");setTimeout(()=>setWrong(null),800);
    }
    inputRef.current?.focus();
  }
  const total=validAnswers.length;
  const pct=Math.round(found.length/total*100);
  if(savedToday&&isToday)return(<div style={{...T.app,position:"relative"}}>{listaConf&&<Confetti active={listaConf}/>}<Hdr title="Sfida a Tempo" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="lista" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=>{
    const fn=s.foundNames||[];const all=s.allNames||[];const ms=all.filter(p=>!fn.includes(p));
    return (<><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>📋</div><div style={{fontSize:"13px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.title}</div><div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{s.found}/{s.total} trovati ({Math.round(s.found/s.total*100)}%)</div>{fn.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"5px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{fn.map(p=>(<div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}{ms.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"5px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{ms.map(p=>(<div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}<ShareButton text={`📋 Lista Quiz #${day}\n${s.title}\n${s.found}/${s.total} trovati\nquiz-ciclismo.vercel.app`}/></>);
  }}</DoneScreen></div>);
  if(done){
    const missed=validAnswers.filter(p=>!found.includes(p));
    const emoji=pct===100?"🏆":pct>=70?"🥇":pct>=40?"👍":"📚";
    return(<div style={T.app}><Hdr title="Sfida a Tempo" sub={`${label} • #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
      <div style={T.body}>
        <div style={{marginBottom:"14px",padding:"10px 13px",background:US.black,borderRadius:"6px"}}>
          <div style={{fontSize:"8px",color:US.orange,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>Categoria</div>
          <div style={{fontSize:"13px",fontWeight:"700",color:"#fff"}}>{cat.title}</div>
        </div>
        <div style={{textAlign:"center",marginBottom:"20px"}}>
          <div style={{fontSize:"36px"}}>{emoji}</div>
          <div style={{fontSize:"50px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}<span style={{fontSize:"18px",color:US.muted}}>/{total}</span></div>
          <div style={{fontSize:"11px",color:US.muted,marginTop:"3px"}}>trovati ({pct}%)</div>
        </div>
        {found.length>0&&<div style={{marginBottom:"14px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"6px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        {missed.length>0&&<div style={{marginBottom:"18px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"6px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{missed.map(p=><div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        <div style={{textAlign:"center"}}>
          <ShareButton text={`📋 Lista Quiz #${day}\n${cat.title}\n${found.length}/${total} trovati (${pct}%)\nquiz-ciclismo.vercel.app`}/>
          {!isToday&&archiveNav&&archiveNav.day<archiveNav.max&&<button onClick={archiveNav.next} style={{...T.pb,width:"100%",marginBottom:"6px"}}>→ Prossima sfida</button>}{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
          <button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button>
        </div>
      </div>
    </div>);
  }
  return(<div style={T.app}><Hdr title="Sfida a Tempo" sub={`${label} • #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={T.body}>
      <div style={{marginBottom:"12px",padding:"10px 13px",background:US.black,borderRadius:"6px"}}>
        <div style={{fontSize:"8px",color:US.orange,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>Categoria di oggi</div>
        <div style={{fontSize:"13px",fontWeight:"700",color:"#fff"}}>{cat.title}</div>
        <div style={{fontSize:"10px",color:"#888",marginTop:"2px"}}>{cat.desc}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <TimerRing seconds={seconds} total={TOTAL}/>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"36px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}<span style={{fontSize:"16px",color:US.muted}}>/{total}</span></div>
          <div style={{fontSize:"9px",color:US.yellow,marginTop:"2px"}}>+{BONUS}s per risposta ✓</div>
          <button onClick={()=>setDone(true)} style={{marginTop:"6px",background:"none",border:`1px solid ${US.border}`,borderRadius:"4px",padding:"3px 10px",fontSize:"9px",color:US.muted,cursor:"pointer",fontFamily:"inherit"}}>⏹ Termina</button>
        </div>
      </div>
      <div style={{height:"6px",background:"#e8e8e8",borderRadius:"3px",marginBottom:"12px",overflow:"hidden"}}>
        <div style={{height:"100%",borderRadius:"3px",background:pct===100?US.green:pct>=70?"#2563eb":pct>=40?US.yellow:US.muted,width:`${pct}%`,transition:"width 0.4s ease"}}/>
      </div>
      <div style={{marginBottom:"12px"}}>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} onFocus={e=>setTimeout(()=>e.target.scrollIntoView({behavior:"smooth",block:"center"}),300)} placeholder="Scrivi un nome..." style={{width:"100%",boxSizing:"border-box",border:`2px solid ${wrong?US.red:lastFound?US.green:US.border}`,borderRadius:"6px",padding:"11px 13px",fontSize:"14px",fontFamily:"inherit",outline:"none",color:US.black,background:wrong?US.redL:lastFound?US.greenL:"#fff",transition:"all 0.2s"}}/>
        {lastFound&&<div style={{fontSize:"12px",color:US.green,marginTop:"4px",fontWeight:"600",display:"flex",alignItems:"center",gap:"8px"}}>✓ {lastFound}<span style={{background:US.green,color:"#fff",borderRadius:"4px",padding:"1px 6px",fontSize:"10px"}}>+{BONUS}s ⏱</span></div>}
        {wrong&&<div style={{fontSize:"12px",color:US.red,marginTop:"4px"}}>✗ "{wrong}" — non in lista</div>}
      </div>
      {found.length>0&&<div><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.muted,marginBottom:"6px"}}>Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
    </div>
  </div>);
}
function ListaQuiz({onHome,isDaily,onArchive}){
  const todayLista=(dayIndex()+5)%LISTA_CATEGORIES.length+1;
  if(isDaily){const d=todayLista,s=todaySeed();return<ListaQuizGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="lista" todayDay={todayLista}>{({day,seed,isToday,archiveNav,chipBar})=><ListaQuizGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}
// ── INDOVINA LA SALITA ───────────────────────────────────────────────────
function SalitaGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const salita=SALITE[(day-1)%SALITE.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("salita"):null;
  const[rev,setRev]=useState(1);
  const[gu,setGu]=useState("");
  const[st,setSt]=useState("p");
  const[fin,setFin]=useState(false);
  const[confRev,setConfRev]=useState(false);
  const maxC=4;
  useEffect(()=>{setRev(1);setGu("");setSt("p");setFin(false);setConfRev(false);},[seed]);
  const pts=Math.max(1,maxC+1-rev);
  // Indizi progressivi: km → pendenza → quota → descrizione
  const clues=[
    {label:"Lunghezza",value:`${salita.km} km`},
    {label:"Pendenza media",value:`${salita.pendenza}%`},
    {label:"Quota",value:`${salita.quota} m`},
    {label:"Indizio finale",value:`${salita.nazione} • ${salita.indizio}`},
  ];
  function sub(){
    const g=normLow(gu.trim()),a=normLow(salita.answer);
    const ok=g===a||a.split(" ").some(p=>p.length>3&&g===p)||(g.length>4&&(a.includes(g)||g.includes(a)));
    if(ok){setSt("c");setTimeout(()=>setConfRev(true),300);}
    else{if(rev<maxC){setRev(x=>x+1);setSt("w");setTimeout(()=>setSt("p"),900);}else setSt("r");}
    setGu("");
  }
  if(savedToday&&isToday)return(<div style={{...T.app,position:"relative"}}>{confRev&&<Confetti active={confRev}/>}<Hdr title="Indovina la Salita" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="salita" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"48px",marginBottom:"4px"}}>🏔</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,marginBottom:"2px"}}>{s.won?`${s.score} punti`:"Non trovata"}</div>
    <div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{salita.answer}</div>
    <ShareButton text={`🏔 Indovina la Salita #${day}\n${s.won?s.score+" punti":"Non trovata"}\nquiz-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={{...T.app,position:"relative"}}>{confRev&&<Confetti active={confRev}/>}<Hdr title="Indovina la Salita" sub={`${label} • #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"520px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <div style={{fontSize:"11px",color:"#888"}}>{st==="p"&&<>Vale <strong style={{color:US.black}}>{pts} punt{pts===1?"o":"i"}</strong></>}</div>
        <button onClick={()=>setRev(r=>Math.min(r+1,maxC))} disabled={rev>=maxC||st!=="p"} style={{background:"none",border:`1px solid ${rev<maxC&&st==="p"?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:rev<maxC&&st==="p"?US.yellow:"#bbb",cursor:rev<maxC&&st==="p"?"pointer":"default",fontFamily:"inherit"}}>💡 {rev}/{maxC} indizi</button>
      </div>
      {clues.slice(0,rev).map((c,i)=>(
        <div key={i} style={{border:"1.5px solid #e0e0e0",borderLeftWidth:i===rev-1?"3px":"1.5px",borderLeftColor:i===rev-1?US.black:"#e0e0e0",borderRadius:"2px",padding:"11px 13px",marginBottom:"6px",background:i===rev-1?"#fafaf8":"#fff"}}>
          {i===rev-1&&rev>1&&<div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"3px",fontWeight:"700"}}>Nuovo indizio</div>}
          <div style={{fontSize:"9px",letterSpacing:"1px",textTransform:"uppercase",color:US.muted,marginBottom:"3px",fontWeight:"700"}}>{c.label}</div>
          <div style={{fontSize:"16px",fontWeight:"700",color:US.black}}>{c.value}</div>
        </div>
      ))}
      <div style={{height:"1px",background:"#e8e8e8",margin:"10px 0"}}/>
      {st!=="c"&&st!=="r"&&<><span style={T.lb}>Che salita è?</span><div style={{display:"flex",gap:"7px"}}><input style={{...T.ip,flex:1,border:`1.5px solid ${st==="w"?US.red:"#ddd"}`}} value={gu} onChange={e=>setGu(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gu.trim()&&sub()} placeholder="Scrivi il nome..." autoFocus/><button onClick={sub} disabled={!gu.trim()} style={{...T.pb,opacity:gu.trim()?1:0.4}}>Indovina</button></div>{st==="w"&&<div style={{fontSize:"10px",color:US.red,marginTop:"4px"}}>✗ Errato — {rev<maxC?"nuovo indizio!":"nessun indizio rimasto"}</div>}<div style={{textAlign:"right",marginTop:"5px"}}><button onClick={()=>setSt("r")} style={{background:"none",border:"none",color:"#bbb",fontSize:"9px",cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Non lo so</button></div></>}
      {st==="c"&&<><div style={{padding:"10px",background:US.greenL,border:"1px solid #bbf7d0",borderRadius:"4px",color:US.green,fontSize:"12px",marginBottom:"10px"}}>✓ Corretto! Era <strong>{salita.answer}</strong> — <strong>+{pts} punti</strong></div><div style={{textAlign:"right"}}><button onClick={()=>{if(isToday)saveResult("salita",{won:true,score:pts});setFin(true);}} style={T.pb}>Fine →</button></div></>}
      {st==="r"&&<><div style={{padding:"10px",background:"#f8f7f4",border:"1px solid #e0e0e0",borderRadius:"4px",color:"#555",fontSize:"12px",marginBottom:"10px"}}>Era <strong>{salita.answer}</strong></div><div style={{textAlign:"right"}}><button onClick={()=>{if(isToday)saveResult("salita",{won:false,score:0});setFin(true);}} style={T.pb}>Fine →</button></div></>}
      {fin&&<div style={{marginTop:"14px",textAlign:"center"}}><ShareButton text={`🏔 Indovina la Salita #${day}\n${st==="c"?pts+" punti":"Non trovata"}: ${salita.answer}\nquiz-ciclismo.vercel.app`}/>{!isToday&&archiveNav&&archiveNav.day<archiveNav.max&&<button onClick={archiveNav.next} style={{...T.pb,width:"100%",marginTop:"6px"}}>→ Prossima sfida</button>}<button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button></div>}
    </div>
  </div>);
}
function Salita({onHome,isDaily,onArchive}){
  const todaySalita=(dayIndex()+7)%SALITE.length+1;
  if(isDaily){const d=todaySalita,s=todaySeed();return<SalitaGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="salita" todayDay={todaySalita}>{({day,seed,isToday,archiveNav,chipBar})=><SalitaGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── TIMELINE ─────────────────────────────────────────────────────────────
function TimelineGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const puzzle=TIMELINE_EVENTS[(day-1)%TIMELINE_EVENTS.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("timeline"):null;
  const correctOrder=[...puzzle.events].sort((a,b)=>a.year-b.year);
  const[order,setOrder]=useState(()=>shuffle([...puzzle.events],seedRandom(seed)));
  const[submitted,setSubmitted]=useState(false);
  const[timelineConf,setTimelineConf]=useState(false);
  useEffect(()=>{setOrder(shuffle([...puzzle.events],seedRandom(seed)));setSubmitted(false);setTimelineConf(false);},[seed]);

  function moveUp(i){if(i<=0)return;const n=[...order];[n[i-1],n[i]]=[n[i],n[i-1]];setOrder(n);}
  function moveDown(i){if(i>=order.length-1)return;const n=[...order];[n[i],n[i+1]]=[n[i+1],n[i]];setOrder(n);}

  function check(){
    setSubmitted(true);
    const allCorrect=order.every((e,i)=>e.label===correctOrder[i].label);
    const correctCount=order.filter((e,i)=>e.label===correctOrder[i].label).length;
    if(isToday)saveResult("timeline",{won:allCorrect,correct:correctCount,total:order.length,title:puzzle.title});
    if(allCorrect)setTimeout(()=>setTimelineConf(true),400);
  }

  if(savedToday&&isToday)return(<div style={{...T.app,position:"relative"}}>{timelineConf&&<Confetti active={timelineConf}/>}<Hdr title="Timeline" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="timeline" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"48px",marginBottom:"4px"}}>🔀</div>
    <div style={{fontSize:"13px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.title}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:s.won?US.green:US.red,marginBottom:"10px"}}>{s.correct}/{s.total} in ordine corretto</div>
    <ShareButton text={`🔀 Timeline #${day}\n${s.title}\n${s.correct}/${s.total} corretti\nquiz-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);

  const correctCount=submitted?order.filter((e,i)=>e.label===correctOrder[i].label).length:0;
  const allOk=submitted&&correctCount===order.length;

  return(<div style={{...T.app,position:"relative"}}>{timelineConf&&<Confetti active={timelineConf}/>}<Hdr title="Timeline" sub={`${label} • #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"520px"}}>
      <div style={{marginBottom:"12px",padding:"10px 13px",background:US.black,borderRadius:"6px"}}>
        <div style={{fontSize:"8px",color:US.orange,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>Sfida di oggi</div>
        <div style={{fontSize:"13px",fontWeight:"700",color:"#fff"}}>{puzzle.title}</div>
        <div style={{fontSize:"10px",color:"#888",marginTop:"2px"}}>Ordina gli eventi dal più vecchio al più recente</div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"14px"}}>
        {order.map((e,i)=>{
          const isCorrect=submitted&&e.label===correctOrder[i].label;
          const isWrong=submitted&&e.label!==correctOrder[i].label;
          return(
            <div key={e.label} style={{
              display:"flex",alignItems:"center",gap:"8px",
              background:isCorrect?US.greenL:isWrong?US.redL:"#fff",
              border:`1.5px solid ${isCorrect?US.green:isWrong?US.red:US.border}`,
              borderRadius:"6px",padding:"10px 12px",transition:"all 0.2s"}}>
              <div style={{fontSize:"14px",fontWeight:"700",color:US.muted,minWidth:"18px"}}>{i+1}.</div>
              <div style={{flex:1}}>
                <div style={{fontSize:"13px",fontWeight:"600",color:US.black}}>{e.label}</div>
                {submitted&&<div style={{fontSize:"11px",color:isCorrect?US.green:US.red,marginTop:"2px",fontWeight:"700"}}>{e.year}{!isCorrect&&` (era #${correctOrder.findIndex(x=>x.label===e.label)+1})`}</div>}
              </div>
              {!submitted&&<div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
                <button onClick={()=>moveUp(i)} disabled={i===0} style={{background:"#f3f3f3",border:"none",borderRadius:"3px",padding:"4px 8px",cursor:i===0?"default":"pointer",fontSize:"10px",opacity:i===0?0.3:1}}>▲</button>
                <button onClick={()=>moveDown(i)} disabled={i===order.length-1} style={{background:"#f3f3f3",border:"none",borderRadius:"3px",padding:"4px 8px",cursor:i===order.length-1?"default":"pointer",fontSize:"10px",opacity:i===order.length-1?0.3:1}}>▼</button>
              </div>}
            </div>
          );
        })}
      </div>

      {!submitted&&<button onClick={check} style={{...T.pb,width:"100%"}}>Verifica ordine</button>}
      {submitted&&<div className="pop-in" style={{padding:"12px",background:allOk?US.greenL:US.redL,borderRadius:"6px",textAlign:"center",color:allOk?US.green:US.red}}>
        <div style={{fontSize:"16px",fontWeight:"700",marginBottom:"3px"}}>{allOk?"🎉 Perfetto!":`${correctCount}/${order.length} corretti`}</div>
        <ShareButton text={`🔀 Timeline #${day}\n${puzzle.title}\n${correctCount}/${order.length} in ordine\nquiz-ciclismo.vercel.app`}/>
        {!isToday&&archiveNav&&archiveNav.day<archiveNav.max&&<button onClick={archiveNav.next} style={{...T.pb,width:"100%",marginTop:"6px"}}>→ Prossima sfida</button>}{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
        <button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button>
      </div>}
    </div>
  </div>);
}
function Timeline({onHome,isDaily,onArchive}){
  const todayTimeline=(dayIndex()+9)%TIMELINE_EVENTS.length+1;
  if(isDaily){const d=todayTimeline,s=todaySeed();return<TimelineGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="timeline" todayDay={todayTimeline}>{({day,seed,isToday,archiveNav,chipBar})=><TimelineGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}
// ── HOME ──────────────────────────────────────────────────────────────────
const MODES=[
  {key:"ciclodle",   label:"Ciclodle",                 icon:"🚴", desc:"Indovina il corridore in 6 tentativi. Ogni risposta rivela indizi.", badge:"97 top 100 UCI",  accent:"#f5e000", badgeBg:"#111",     badgeTx:"#f5e000", size:"big"},
  {key:"wordle",     label:"Wordle Cognome",           icon:"🔤", desc:"Indovina il cognome lettera per lettera in 6 tentativi.",            badge:"Top 100 UCI",    accent:"#378ADD", badgeBg:"#E6F1FB", badgeTx:"#185FA5", size:"big"},
  {key:"hangman",    label:"Impiccato",                icon:"💀", desc:"Scopri il cognome prima che il pupazzo sia completato. 7 errori.",   badge:"Top 100 UCI",    accent:"#1D9E75", badgeBg:"#E1F5EE", badgeTx:"#0F6E56", size:"big"},
  {key:"carriera",   label:"Indovina la Carriera",     icon:"🏆", desc:"Indovina il corridore dalla sua carriera di team e periodi.",        badge:"22 corridori",   accent:"#7F77DD", badgeBg:"#EEEDFE", badgeTx:"#3C3489", size:"big"},
  {key:"higherlower",label:"Chi ha più punti UCI",     icon:"⚖",  desc:"Clicca su chi ha più punti UCI 2025. Streak infinita!",              badge:"∞ Infinito",     accent:"#D85A30", badgeBg:"#FAECE7", badgeTx:"#993C1D", size:"small"},
  {key:"lista",      label:"Sfida a Tempo",            icon:"⏱",  desc:"Trova i nomi in 90 secondi.",                                        badge:"12 categorie",   accent:"#E91E8C", badgeBg:"#FBEAF0", badgeTx:"#993556", size:"small"},
  {key:"salita",     label:"Indovina la Salita",       icon:"🏔", desc:"Dai dati tecnici indovina il passo leggendario.",                    badge:"15 salite",      accent:"#BA7517", badgeBg:"#FAEEDA", badgeTx:"#854F0B", size:"small"},
  {key:"timeline",   label:"Timeline",                 icon:"🔀", desc:"Ordina gli eventi dal più vecchio al più recente.",                  badge:"10 sfide",       accent:"#16a34a", badgeBg:"#dcfce7", badgeTx:"#15803d", size:"small"},
];

function Card({m,onDaily,onArchive}){
  const[hv,sHv]=useState(false);
  const played=loadResult(m.key)!==null;
  const isBig=m.size==="big";
  const borderColor=played?US.green:hv?US.orange:US.border;
  const accentStyle=m.accent?{borderLeft:`3px solid ${m.accent}`}:{};
  const showArchive=m.key!=="higherlower";
  return(<div style={{background:"#fff",border:`1px solid ${borderColor}`,...accentStyle,borderRadius:"8px",padding:"11px",transition:"border-color 0.15s",display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:isBig?"130px":"110px"}} onMouseEnter={()=>sHv(true)} onMouseLeave={()=>sHv(false)}>
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"4px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
          <span style={{fontSize:isBig?"17px":"15px"}}>{m.icon}</span>
          <span style={{fontSize:isBig?"12px":"11px",fontWeight:"700",color:US.black,lineHeight:1.2}}>{m.label}</span>
        </div>
        {played&&<span style={{fontSize:"8px",color:US.green,fontWeight:"700",background:US.greenL,borderRadius:"4px",padding:"1px 5px",flexShrink:0}}>✓</span>}
      </div>
      <span style={{fontSize:"10px",color:US.muted,lineHeight:1.3,display:"block"}}>{m.desc}</span>
      {m.badge&&<div style={{marginTop:"4px"}}><span style={{fontSize:"9px",fontWeight:"600",color:m.badgeTx,background:m.badgeBg||"transparent",borderRadius:"4px",padding:m.badgeBg?"2px 6px":"0"}}>{m.badge}</span></div>}
    </div>
    <div style={{display:"flex",gap:"3px",marginTop:"8px"}}>
      <button onClick={()=>onDaily(m.key)} style={{flex:1,background:US.orange,color:US.black,border:"none",borderRadius:"4px",padding:"8px 2px",fontSize:"9px",fontWeight:"700",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.3px",minHeight:"36px"}}>🗓 {showArchive?"Daily":"Gioca"}</button>
      {showArchive&&<button onClick={()=>onArchive(m.key)} style={{flex:1,background:US.black,color:"#fff",border:"none",borderRadius:"4px",padding:"8px 2px",fontSize:"9px",fontWeight:"700",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.3px",minHeight:"36px"}}>📂 Arch.</button>}
    </div>
  </div>);
}

function Home({onSelect}){
  const today=new Date().toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"});
  const countdown=useCountdown();
  const playedToday=MODES.filter(m=>loadResult(m.key)!==null).length;
  const totalModes=MODES.length;
  const bigModes=MODES.filter(m=>m.size==="big");
  const smallModes=MODES.filter(m=>m.size==="small");
  return(<div style={{...T.app,paddingBottom:"40px"}}>
    <div style={{background:US.black,color:"#fff",padding:"18px 18px 16px",borderBottom:`3px solid ${US.orange}`}}>
      <div style={{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:US.orange,marginBottom:"3px",fontWeight:"700"}}>Universo Sportivo</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <div style={{fontSize:"22px",fontWeight:"700",letterSpacing:"-0.5px",lineHeight:1}}>Quiz Ciclismo</div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:"9px",color:"#555",marginBottom:"1px"}}>nuove sfide in</div>
          <div style={{fontSize:"15px",fontWeight:"700",color:US.orange,fontVariantNumeric:"tabular-nums",letterSpacing:"1px"}}>{countdown}</div>
        </div>
      </div>
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"5px"}}>
          <div style={{fontSize:"10px",color:"#666",textTransform:"capitalize"}}>{today}</div>
          <div style={{fontSize:"9px",color:playedToday===totalModes?US.green:"#888",fontWeight:"700"}}>
            {playedToday}/{totalModes} {playedToday===totalModes?"✓ completate":"completate"}
          </div>
        </div>
        <div style={{height:"4px",background:"#1a1a1a",borderRadius:"2px",overflow:"hidden"}}>
          <div style={{height:"100%",width:`${playedToday/totalModes*100}%`,background:playedToday===totalModes?US.green:US.orange,
            borderRadius:"2px",transition:"width 0.5s ease"}}/>
        </div>
      </div>
    </div>
    <div style={{padding:"12px 12px 40px",maxWidth:"620px",margin:"0 auto",boxSizing:"border-box"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"8px",alignItems:"stretch"}}>
        {bigModes.map(m=><Card key={m.key} m={m} onDaily={k=>onSelect(k+"_daily")} onArchive={k=>onSelect(k+"_archive")}/>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"8px",alignItems:"stretch"}}>
        {smallModes.map(m=><Card key={m.key} m={m} onDaily={k=>onSelect(k+"_daily")} onArchive={k=>onSelect(k+"_archive")}/>)}
      </div>
      <div style={{background:US.black,borderRadius:"10px",padding:"14px 16px",marginBottom:"10px",
        border:"1px solid #2a2a2a"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
          <div>
            <div style={{fontSize:"24px",fontWeight:"700",color:US.orange,lineHeight:1}}>662</div>
            <div style={{fontSize:"9px",color:"#666",textTransform:"uppercase",letterSpacing:"1.5px",marginTop:"2px"}}>corridori nel DB</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:"11px",color:"#fff",fontWeight:"700",marginBottom:"4px"}}>8 modalità • 23 team</div>
            <div style={{fontSize:"9px",color:"#555",lineHeight:1.6}}>
              🗓 <span style={{color:"#aaa"}}>Daily</span> — nuova sfida ogni giorno<br/>
              📂 <span style={{color:"#aaa"}}>Archivio</span> — sfide passate ◀ ▶
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"4px"}}>
          {["🚴 Ciclodle","🔤 Wordle","💀 Impiccato","🏆 Carriera",
            "⚖ Più UCI","⏱ Sfida","🏔 Salita","🔀 Timeline"].map(t=>(
            <div key={t} style={{fontSize:"7px",color:"#666",background:"#1a1a1a",
              borderRadius:"4px",padding:"2px 3px",textAlign:"center",
              overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  </div>);
}

// ── ROOT ──────────────────────────────────────────────────────────────────
export default function App(){
  useEffect(()=>{
    const s=document.createElement("style");
    s.innerHTML=`
      *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;} html,body{overflow-x:hidden;max-width:100vw;} button:active{opacity:0.75;transform:scale(0.97);}
      input,select,textarea{font-size:16px !important;}
      button{touch-action:manipulation;}
      .flip-reveal{animation:flipReveal 0.5s ease forwards;}
      @keyframes flipReveal{0%{transform:scaleY(1);background:#e0e0e0;}49%{transform:scaleY(0);background:#e0e0e0;}50%{transform:scaleY(0);}100%{transform:scaleY(1);}}
      @keyframes fadeSlideIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
      .game-enter{animation:fadeSlideIn 0.45s ease forwards;}
      @keyframes confettiFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1;}100%{transform:translateY(110vh) rotate(720deg);opacity:0;}}
      .confetti-piece{position:absolute;width:8px;height:8px;animation:confettiFall linear forwards;pointer-events:none;}
      @keyframes shake{0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-5px);}40%,80%{transform:translateX(5px);}}
      @keyframes popIn{0%{transform:scale(0.95);opacity:0;}100%{transform:scale(1);opacity:1;}}
      .pop-in{animation:popIn 0.35s ease forwards;}
      @keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
    `;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);
  const[sc,sSc]=useState("home");
  const swipeX=useRef(null);
  const swipeY=useRef(null);
  function onTouchStart(e){swipeX.current=e.touches[0].clientX;swipeY.current=e.touches[0].clientY;}
  function onTouchEnd(e){
    if(swipeX.current===null)return;
    const dx=e.changedTouches[0].clientX-swipeX.current;
    const dy=Math.abs(e.changedTouches[0].clientY-swipeY.current);
    if(dx>60&&dy<40&&swipeX.current<40&&sc!=="home"){sSc("home");}
    swipeX.current=null;swipeY.current=null;
  }
  const home=()=>sSc("home");
  const isDaily=sc.endsWith("_daily");
  const key=sc.replace("_daily","").replace("_archive","");
  if(sc==="home")return<Home onSelect={sSc}/>;
  const goArchive=()=>sSc(key+"_archive");

  if(key==="ciclodle")return(<div className="game-enter" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><Ciclodle onHome={home} isDaily={isDaily} onArchive={goArchive}/></div>);
  if(key==="wordle")return(<div className="game-enter" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><WordleCognome onHome={home} isDaily={isDaily} onArchive={goArchive}/></div>);
  if(key==="hangman")return(<div className="game-enter" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><Hangman onHome={home} isDaily={isDaily} onArchive={goArchive}/></div>);
  if(key==="higherlower")return(<div className="game-enter" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><ChiPiuPunti onHome={home}/></div>);
  if(key==="carriera")return(<div className="game-enter" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><Carriera onHome={home} isDaily={isDaily} onArchive={goArchive}/></div>);
  if(key==="lista")return(<div className="game-enter" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><ListaQuiz onHome={home} isDaily={isDaily} onArchive={goArchive}/></div>);
  if(key==="salita")return(<div className="game-enter" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><Salita onHome={home} isDaily={isDaily} onArchive={goArchive}/></div>);
  if(key==="timeline")return(<div className="game-enter" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><Timeline onHome={home} isDaily={isDaily} onArchive={goArchive}/></div>);
  return<Home onSelect={sSc}/>;
}

