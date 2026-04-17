import { useState, useEffect, useRef, useMemo } from "react";

// ── DATABASE ────────────────────────────────────────────────────────────
const DB = [
  { name:"Maurice Ballerstedt", surname:"Ballerstedt", team:"Alpecin-Premier Tech", nation:"Germania", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Tobias Bayer", surname:"Bayer", team:"Alpecin-Premier Tech", nation:"Austria", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Lennert Belmans", surname:"Belmans", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Francesco Busatto", surname:"Busatto", team:"Alpecin-Premier Tech", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Lindsay De Vylder", surname:"De Vylder", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Ramses Debruyne", surname:"Debruyne", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Simon Dehairs", surname:"Dehairs", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Tibor Del Grosso", surname:"Del Grosso", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Silvan Dillier", surname:"Dillier", team:"Alpecin-Premier Tech", nation:"Svizzera", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Aaron Dockx", surname:"Dockx", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Jonas Geens", surname:"Geens", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Gal Glivar", surname:"Glivar", team:"Alpecin-Premier Tech", nation:"Slovenia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Michael Gogl", surname:"Gogl", team:"Alpecin-Premier Tech", nation:"Austria", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Kaden Groves", surname:"Groves", team:"Alpecin-Premier Tech", nation:"Australia", continent:"Oceania", age:27, uciPts:1420, uciRank:51 },
  { name:"Hugo Houle", surname:"Houle", team:"Alpecin-Premier Tech", nation:"Canada", continent:"Nord America", age:35, uciPts:0, uciRank:0 },
  { name:"Tim Marsman", surname:"Marsman", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Jasper Philipsen", surname:"Philipsen", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:28, uciPts:2438, uciRank:17 },
  { name:"Edward Planckaert", surname:"Planckaert", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Jensen Plowright", surname:"Plowright", team:"Alpecin-Premier Tech", nation:"Australia", continent:"Oceania", age:25, uciPts:0, uciRank:0 },
  { name:"Johan Price-Pejtersen", surname:"Price-Pejtersen", team:"Alpecin-Premier Tech", nation:"Danimarca", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Senna Remijn", surname:"Remijn", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Jonas Rickaert", surname:"Rickaert", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Oscar Riesebeek", surname:"Riesebeek", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Florian Sénéchal", surname:"Sénéchal", team:"Alpecin-Premier Tech", nation:"Francia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Sente Sentjens", surname:"Sentjens", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Gerben Thijssen", surname:"Thijssen", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Henri Uhlig", surname:"Uhlig", team:"Alpecin-Premier Tech", nation:"Germania", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Mathieu van der Poel", surname:"van der Poel", team:"Alpecin-Premier Tech", nation:"Olanda", continent:"Europa", age:31, uciPts:3838, uciRank:8 },
  { name:"Luca Vergallito", surname:"Vergallito", team:"Alpecin-Premier Tech", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Emiel Verstrynge", surname:"Verstrynge", team:"Alpecin-Premier Tech", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Nikias Arndt", surname:"Arndt", team:"Bahrain Victorious", nation:"Germania", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Phil Bauhaus", surname:"Bauhaus", team:"Bahrain Victorious", nation:"Germania", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Pello Bilbao", surname:"Bilbao", team:"Bahrain Victorious", nation:"Spagna", continent:"Europa", age:36, uciPts:1078, uciRank:74 },
  { name:"Alessandro Borgo", surname:"Borgo", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Alberto Bruttomesso", surname:"Bruttomesso", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Santiago Buitrago", surname:"Buitrago", team:"Bahrain Victorious", nation:"Colombia", continent:"Sud America", age:26, uciPts:1077, uciRank:75 },
  { name:"Damiano Caruso", surname:"Caruso", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:38, uciPts:871, uciRank:95 },
  { name:"Roman Ermakov", surname:"Ermakov", team:"Bahrain Victorious", nation:"Russia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Zak Erzen", surname:"Erzen", team:"Bahrain Victorious", nation:"Slovenia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Afonso Eulalio", surname:"Eulalio", team:"Bahrain Victorious", nation:"Portogallo", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Matevz Govekar", surname:"Govekar", team:"Bahrain Victorious", nation:"Slovenia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Kamil Gradek", surname:"Gradek", team:"Bahrain Victorious", nation:"Polonia", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Rainer Kepplinger", surname:"Kepplinger", team:"Bahrain Victorious", nation:"Austria", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Lenny Martinez", surname:"Martinez", team:"Bahrain Victorious", nation:"Francia", continent:"Europa", age:22, uciPts:1873, uciRank:31 },
  { name:"Fran Miholjevic", surname:"Miholjevic", team:"Bahrain Victorious", nation:"Croazia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Pau Miquel Delgado", surname:"Miquel Delgado", team:"Bahrain Victorious", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Matej Mohoric", surname:"Mohoric", team:"Bahrain Victorious", nation:"Slovenia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Jakob Omrzel", surname:"Omrzel", team:"Bahrain Victorious", nation:"Slovenia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Mathijs Paasschens", surname:"Paasschens", team:"Bahrain Victorious", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Alec Segaert", surname:"Segaert", team:"Bahrain Victorious", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Daniel Skerl", surname:"Skerl", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Robert Stannard", surname:"Stannard", team:"Bahrain Victorious", nation:"Australia", continent:"Oceania", age:27, uciPts:0, uciRank:0 },
  { name:"Oliver Stockwell", surname:"Stockwell", team:"Bahrain Victorious", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Antonio Tiberi", surname:"Tiberi", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:24, uciPts:1109, uciRank:69 },
  { name:"Attila Valter", surname:"Valter", team:"Bahrain Victorious", nation:"Ungheria", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Max van der Meulen", surname:"van der Meulen", team:"Bahrain Victorious", nation:"Olanda", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Vlad Van Mechelen", surname:"Van Mechelen", team:"Bahrain Victorious", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Edoardo Zambanini", surname:"Zambanini", team:"Bahrain Victorious", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Tiesj Benoot", surname:"Benoot", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:32, uciPts:1295, uciRank:54 },
  { name:"Léo Bisiaux", surname:"Bisiaux", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Stefan Bissegger", surname:"Bissegger", team:"Decathlon CMA CGM Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Cees Bol", surname:"Bol", team:"Decathlon CMA CGM Team", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Oscar Chamberlain", surname:"Chamberlain", team:"Decathlon CMA CGM Team", nation:"Australia", continent:"Oceania", age:21, uciPts:0, uciRank:0 },
  { name:"Sander De Pestel", surname:"De Pestel", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Stan Dewulf", surname:"Dewulf", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Felix Gall", surname:"Gall", team:"Decathlon CMA CGM Team", nation:"Austria", continent:"Europa", age:28, uciPts:2216, uciRank:22 },
  { name:"Pierre Gautherat", surname:"Gautherat", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Robbe Ghys", surname:"Ghys", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Tord Gudmestad", surname:"Gudmestad", team:"Decathlon CMA CGM Team", nation:"Norvegia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Daan Hoole", surname:"Hoole", team:"Decathlon CMA CGM Team", nation:"Olanda", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Noa Isidore", surname:"Isidore", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Olav Kooij", surname:"Kooij", team:"Decathlon CMA CGM Team", nation:"Olanda", continent:"Europa", age:24, uciPts:2123, uciRank:26 },
  { name:"Antoine L'Hote", surname:"L'Hote", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Jordan Labrosse", surname:"Labrosse", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Paul Lapeira", surname:"Lapeira", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Tobias Lund Andresen", surname:"Lund Andresen", team:"Decathlon CMA CGM Team", nation:"Danimarca", continent:"Europa", age:23, uciPts:1252, uciRank:57 },
  { name:"Gregor Mühlberger", surname:"Mühlberger", team:"Decathlon CMA CGM Team", nation:"Austria", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Oliver Naesen", surname:"Naesen", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Aurélien Paret-Peintre", surname:"Paret-Peintre", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Søjberg Pedersen Rasmus", surname:"Pedersen Rasmus", team:"Decathlon CMA CGM Team", nation:"Danimarca", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Gianluca Pollefliet", surname:"Pollefliet", team:"Decathlon CMA CGM Team", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Nicolas Prodhomme", surname:"Prodhomme", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:29, uciPts:1108, uciRank:70 },
  { name:"Matthew Riccitello", surname:"Riccitello", team:"Decathlon CMA CGM Team", nation:"USA", continent:"Nord America", age:24, uciPts:1019, uciRank:78 },
  { name:"Callum Scotson", surname:"Scotson", team:"Decathlon CMA CGM Team", nation:"Australia", continent:"Oceania", age:29, uciPts:0, uciRank:0 },
  { name:"Paul Seixas", surname:"Seixas", team:"Decathlon CMA CGM Team", nation:"Francia", continent:"Europa", age:19, uciPts:1128, uciRank:67 },
  { name:"Johannes Staune-Mittet", surname:"Staune-Mittet", team:"Decathlon CMA CGM Team", nation:"Norvegia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Mattia Agostinacchio", surname:"Agostinacchio", team:"EF Education-EasyPost", nation:"Italia", continent:"Europa", age:18, uciPts:0, uciRank:0 },
  { name:"Vincenzo Albanese", surname:"Albanese", team:"EF Education-EasyPost", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Kasper Asgreen", surname:"Asgreen", team:"EF Education-EasyPost", nation:"Danimarca", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Samuele Battistella", surname:"Battistella", team:"EF Education-EasyPost", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Alex Baudin", surname:"Baudin", team:"EF Education-EasyPost", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Markel Beloki", surname:"Beloki", team:"EF Education-EasyPost", nation:"Spagna", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Richard Carapaz", surname:"Carapaz", team:"EF Education-EasyPost", nation:"Ecuador", continent:"Sud America", age:32, uciPts:1807, uciRank:33 },
  { name:"Alexander Cepeda", surname:"Cepeda", team:"EF Education-EasyPost", nation:"Ecuador", continent:"Sud America", age:27, uciPts:0, uciRank:0 },
  { name:"Ben Healy", surname:"Healy", team:"EF Education-EasyPost", nation:"Irlanda", continent:"Europa", age:25, uciPts:2742, uciRank:13 },
  { name:"Noah Hobbs", surname:"Hobbs", team:"EF Education-EasyPost", nation:"Regno Unito", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Mikkel Honore", surname:"Honore", team:"EF Education-EasyPost", nation:"Danimarca", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Luke Lamperti", surname:"Lamperti", team:"EF Education-EasyPost", nation:"USA", continent:"Nord America", age:23, uciPts:0, uciRank:0 },
  { name:"Michael Leonard", surname:"Leonard", team:"EF Education-EasyPost", nation:"Canada", continent:"Nord America", age:22, uciPts:0, uciRank:0 },
  { name:"Alastair Mackellar", surname:"Mackellar", team:"EF Education-EasyPost", nation:"Australia", continent:"Oceania", age:24, uciPts:0, uciRank:0 },
  { name:"Madis Mihkels", surname:"Mihkels", team:"EF Education-EasyPost", nation:"Estonia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Lukas Nerurkar", surname:"Nerurkar", team:"EF Education-EasyPost", nation:"Regno Unito", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Neilson Powless", surname:"Powless", team:"EF Education-EasyPost", nation:"USA", continent:"Nord America", age:29, uciPts:1610, uciRank:39 },
  { name:"Sean Quinn", surname:"Quinn", team:"EF Education-EasyPost", nation:"USA", continent:"Nord America", age:25, uciPts:0, uciRank:0 },
  { name:"Darren Rafferty", surname:"Rafferty", team:"EF Education-EasyPost", nation:"Irlanda", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Archie Ryan", surname:"Ryan", team:"EF Education-EasyPost", nation:"Irlanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Matthias Schwarzbacher", surname:"Schwarzbacher", team:"EF Education-EasyPost", nation:"Slovacchia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"James Shaw", surname:"Shaw", team:"EF Education-EasyPost", nation:"Regno Unito", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Colby Simmons", surname:"Simmons", team:"EF Education-EasyPost", nation:"USA", continent:"Nord America", age:22, uciPts:0, uciRank:0 },
  { name:"Georg Steinhauser", surname:"Steinhauser", team:"EF Education-EasyPost", nation:"Germania", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Harry Sweeny", surname:"Sweeny", team:"EF Education-EasyPost", nation:"Australia", continent:"Oceania", age:27, uciPts:0, uciRank:0 },
  { name:"Michael Valgren", surname:"Valgren", team:"EF Education-EasyPost", nation:"Danimarca", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Marijn van den Berg", surname:"van den Berg", team:"EF Education-EasyPost", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Jardi Van Der Lee", surname:"Van Der Lee", team:"EF Education-EasyPost", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Max Walker", surname:"Walker", team:"EF Education-EasyPost", nation:"Regno Unito", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Cyril Barthe", surname:"Barthe", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Clément Berthet", surname:"Berthet", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Lewis Bower", surname:"Bower", team:"Groupama-FDJ United", nation:"Nuova Zelanda", continent:"Oceania", age:21, uciPts:0, uciRank:0 },
  { name:"Clément Braz Afonso", surname:"Braz Afonso", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Remi Cavagna", surname:"Cavagna", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Ewen Costiou", surname:"Costiou", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Maxime Decomble", surname:"Decomble", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Tom Donnenwirth", surname:"Donnenwirth", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Titouan Fontaine", surname:"Fontaine", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"David Gaudu", surname:"Gaudu", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Kevin Geniets", surname:"Geniets", team:"Groupama-FDJ United", nation:"Lussemburgo", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Lorenzo Germani", surname:"Germani", team:"Groupama-FDJ United", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Romain Grégoire", surname:"Grégoire", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:23, uciPts:1790, uciRank:34 },
  { name:"Thibaud Gruel", surname:"Gruel", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Axel Huens", surname:"Huens", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Johan Jacobs", surname:"Jacobs", team:"Groupama-FDJ United", nation:"Svizzera", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Josh Kench", surname:"Kench", team:"Groupama-FDJ United", nation:"Nuova Zelanda", continent:"Oceania", age:24, uciPts:0, uciRank:0 },
  { name:"Olivier Le Gac", surname:"Le Gac", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Valentin Madouas", surname:"Madouas", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Guillaume Martin-Guyonnet", surname:"Martin-Guyonnet", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Matteo Milan", surname:"Milan", team:"Groupama-FDJ United", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Rudy Molard", surname:"Molard", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Quentin Pacher", surname:"Pacher", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Enzo Paleni", surname:"Paleni", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Paul Penhoët", surname:"Penhoët", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Rémy Rochas", surname:"Rochas", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Brieuc Rolland", surname:"Rolland", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Clément Russo", surname:"Russo", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Bastien Tronchon", surname:"Tronchon", team:"Groupama-FDJ United", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Thymen Arensman", surname:"Arensman", team:"INEOS Grenadiers", nation:"Olanda", continent:"Europa", age:26, uciPts:1548, uciRank:41 },
  { name:"AJ August", surname:"August", team:"INEOS Grenadiers", nation:"USA", continent:"Nord America", age:20, uciPts:0, uciRank:0 },
  { name:"Egan Bernal", surname:"Bernal", team:"INEOS Grenadiers", nation:"Colombia", continent:"Sud America", age:29, uciPts:1742, uciRank:36 },
  { name:"Laurens De Plus", surname:"De Plus", team:"INEOS Grenadiers", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Tobias Foss", surname:"Foss", team:"INEOS Grenadiers", nation:"Norvegia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Filippo Ganna", surname:"Ganna", team:"INEOS Grenadiers", nation:"Italia", continent:"Europa", age:29, uciPts:2152, uciRank:24 },
  { name:"Dorian Godon", surname:"Godon", team:"INEOS Grenadiers", nation:"Francia", continent:"Europa", age:29, uciPts:1069, uciRank:76 },
  { name:"Jack Haig", surname:"Haig", team:"INEOS Grenadiers", nation:"Australia", continent:"Oceania", age:32, uciPts:0, uciRank:0 },
  { name:"Lucas Hamilton", surname:"Hamilton", team:"INEOS Grenadiers", nation:"Australia", continent:"Oceania", age:30, uciPts:0, uciRank:0 },
  { name:"Kim Heiduk", surname:"Heiduk", team:"INEOS Grenadiers", nation:"Germania", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Bob Jungels", surname:"Jungels", team:"INEOS Grenadiers", nation:"Lussemburgo", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Michal Kwiatkowski", surname:"Kwiatkowski", team:"INEOS Grenadiers", nation:"Polonia", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Victor Langellotti", surname:"Langellotti", team:"INEOS Grenadiers", nation:"Monaco", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Axel Laurance", surname:"Laurance", team:"INEOS Grenadiers", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Oscar Onley", surname:"Onley", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:23, uciPts:2910, uciRank:9 },
  { name:"Brandon Rivera", surname:"Rivera", team:"INEOS Grenadiers", nation:"Colombia", continent:"Sud America", age:30, uciPts:0, uciRank:0 },
  { name:"Carlos Rodriguez", surname:"Rodriguez", team:"INEOS Grenadiers", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Óscar Rodríguez", surname:"Rodríguez", team:"INEOS Grenadiers", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Magnus Sheffield", surname:"Sheffield", team:"INEOS Grenadiers", nation:"USA", continent:"Nord America", age:23, uciPts:904, uciRank:92 },
  { name:"Artem Shmidt", surname:"Shmidt", team:"INEOS Grenadiers", nation:"USA", continent:"Nord America", age:22, uciPts:0, uciRank:0 },
  { name:"Embret Svestad-Bårdseng", surname:"Svestad-Bårdseng", team:"INEOS Grenadiers", nation:"Norvegia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Ben Swift", surname:"Swift", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:38, uciPts:0, uciRank:0 },
  { name:"Connor Swift", surname:"Swift", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Joshua Tarling", surname:"Tarling", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Ben Turner", surname:"Turner", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Kévin Vauquelin", surname:"Vauquelin", team:"INEOS Grenadiers", nation:"Francia", continent:"Europa", age:24, uciPts:2459, uciRank:16 },
  { name:"Sam Watson", surname:"Watson", team:"INEOS Grenadiers", nation:"Regno Unito", continent:"Europa", age:24, uciPts:894, uciRank:93 },
  { name:"Sam Welsford", surname:"Welsford", team:"INEOS Grenadiers", nation:"Australia", continent:"Oceania", age:30, uciPts:0, uciRank:0 },
  { name:"Peter Øxenberg", surname:"Øxenberg", team:"INEOS Grenadiers", nation:"Danimarca", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Juan Ayuso", surname:"Ayuso", team:"Lidl-Trek", nation:"Spagna", continent:"Europa", age:23, uciPts:2602, uciRank:14 },
  { name:"Andrea Bagioli", surname:"Bagioli", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:27, uciPts:917, uciRank:90 },
  { name:"Julien Bernard", surname:"Bernard", team:"Lidl-Trek", nation:"Francia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Giulio Ciccone", surname:"Ciccone", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:31, uciPts:2752, uciRank:12 },
  { name:"Simone Consonni", surname:"Consonni", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Derek Gee-West", surname:"Gee-West", team:"Lidl-Trek", nation:"Canada", continent:"Nord America", age:28, uciPts:1620, uciRank:38 },
  { name:"Tao Geoghegan Hart", surname:"Geoghegan Hart", team:"Lidl-Trek", nation:"Regno Unito", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Amanuel Ghebreigzabhier", surname:"Ghebreigzabhier", team:"Lidl-Trek", nation:"Eritrea", continent:"Africa", age:31, uciPts:0, uciRank:0 },
  { name:"Patrick Konrad", surname:"Konrad", team:"Lidl-Trek", nation:"Austria", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Søren Kragh Andersen", surname:"Kragh Andersen", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Lennard Kämna", surname:"Kämna", team:"Lidl-Trek", nation:"Germania", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Jonathan Milan", surname:"Milan", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:25, uciPts:2144, uciRank:25 },
  { name:"Bauke Mollema", surname:"Mollema", team:"Lidl-Trek", nation:"Olanda", continent:"Europa", age:39, uciPts:0, uciRank:0 },
  { name:"Jacopo Mosca", surname:"Mosca", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Sunekær Norsgaard Mathias", surname:"Norsgaard Mathias", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Thibau Nys", surname:"Nys", team:"Lidl-Trek", nation:"Belgio", continent:"Europa", age:23, uciPts:846, uciRank:98 },
  { name:"Sam Oomen", surname:"Oomen", team:"Lidl-Trek", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Mads Pedersen", surname:"Pedersen", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:30, uciPts:5074, uciRank:4 },
  { name:"Quinn Simmons", surname:"Simmons", team:"Lidl-Trek", nation:"USA", continent:"Nord America", age:24, uciPts:1280, uciRank:55 },
  { name:"Mattias Skjelmose", surname:"Skjelmose", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:25, uciPts:2254, uciRank:21 },
  { name:"Toms Skujins", surname:"Skujins", team:"Lidl-Trek", nation:"Lettonia", continent:"Europa", age:34, uciPts:1091, uciRank:72 },
  { name:"Matteo Sobrero", surname:"Sobrero", team:"Lidl-Trek", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Jakob Söderqvist", surname:"Söderqvist", team:"Lidl-Trek", nation:"Svezia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Torn Teutenberg Tim", surname:"Teutenberg Tim", team:"Lidl-Trek", nation:"Germania", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Edward Theuns", surname:"Theuns", team:"Lidl-Trek", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Mathias Vacek", surname:"Vacek", team:"Lidl-Trek", nation:"Rep. Ceca", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Otto Vergaerde", surname:"Vergaerde", team:"Lidl-Trek", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Carlos Verona", surname:"Verona", team:"Lidl-Trek", nation:"Spagna", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Max Walscheid", surname:"Walscheid", team:"Lidl-Trek", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Albert Withen Philipsen", surname:"Withen Philipsen", team:"Lidl-Trek", nation:"Danimarca", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Toon Aerts", surname:"Aerts", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Huub Artz", surname:"Artz", team:"Lotto-Intermarché", nation:"Olanda", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Jenno Berckmoes", surname:"Berckmoes", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Cédric Beullens", surname:"Beullens", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Vito Braet", surname:"Braet", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Lars Craps", surname:"Craps", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Jasper De Buyst", surname:"De Buyst", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Arnaud De Lie", surname:"De Lie", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:24, uciPts:2781, uciRank:11 },
  { name:"Steffen De Schuyteneer", surname:"De Schuyteneer", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Matthew Fox", surname:"Fox", team:"Lotto-Intermarché", nation:"Australia", continent:"Oceania", age:23, uciPts:0, uciRank:0 },
  { name:"Joshua Giddings", surname:"Giddings", team:"Lotto-Intermarché", nation:"Regno Unito", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Sébastien Grignard", surname:"Grignard", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Matys Grisel", surname:"Grisel", team:"Lotto-Intermarché", nation:"Francia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Simone Gualdi", surname:"Gualdi", team:"Lotto-Intermarché", nation:"Italia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Mathieu Kockelmann", surname:"Kockelmann", team:"Lotto-Intermarché", nation:"Lussemburgo", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Milan Menten", surname:"Menten", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Robin Orins", surname:"Orins", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Lorenzo Rota", surname:"Rota", team:"Lotto-Intermarché", nation:"Italia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Jonas Rutsch", surname:"Rutsch", team:"Lotto-Intermarché", nation:"Germania", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Liam Slock", surname:"Slock", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Lionel Taminiaux", surname:"Taminiaux", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Reuben Thompson", surname:"Thompson", team:"Lotto-Intermarché", nation:"Nuova Zelanda", continent:"Oceania", age:25, uciPts:0, uciRank:0 },
  { name:"Luca Van Boven", surname:"Van Boven", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Taco van der Hoorn", surname:"van der Hoorn", team:"Lotto-Intermarché", nation:"Olanda", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Lennert Van Eetvelt", surname:"Van Eetvelt", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Roel van Sintmaartensdijk", surname:"van Sintmaartensdijk", team:"Lotto-Intermarché", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Baptiste Veistroffer", surname:"Veistroffer", team:"Lotto-Intermarché", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Jarno Widar", surname:"Widar", team:"Lotto-Intermarché", nation:"Belgio", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Georg Zimmermann", surname:"Zimmermann", team:"Lotto-Intermarché", nation:"Germania", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Felix Ørn-Kristoff", surname:"Ørn-Kristoff", team:"Lotto-Intermarché", nation:"Norvegia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Roger Adrià", surname:"Adrià", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Jorge Arcas", surname:"Arcas", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Orluis Aular", surname:"Aular", team:"Movistar Team", nation:"Venezuela", continent:"Sud America", age:29, uciPts:1155, uciRank:65 },
  { name:"Jon Barrenetxea", surname:"Barrenetxea", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Carlos Canal", surname:"Canal", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Pablo Castrillo", surname:"Castrillo", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Jefferson Cepeda", surname:"Cepeda", team:"Movistar Team", nation:"Ecuador", continent:"Sud America", age:30, uciPts:0, uciRank:0 },
  { name:"Davide Formolo", surname:"Formolo", team:"Movistar Team", nation:"Italia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Raúl García", surname:"García", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Iván García Cortina", surname:"García Cortina", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Michel Heßmann", surname:"Heßmann", team:"Movistar Team", nation:"Germania", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Pedro Lopez Juan", surname:"Lopez Juan", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Filip Maciejuk", surname:"Maciejuk", team:"Movistar Team", nation:"Polonia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Enric Mas", surname:"Mas", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:31, uciPts:1021, uciRank:77 },
  { name:"Lorenzo Milesi", surname:"Milesi", team:"Movistar Team", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Manlio Moro", surname:"Moro", team:"Movistar Team", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Pavel Novak", surname:"Novak", team:"Movistar Team", nation:"Rep. Ceca", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Nelson Oliveira", surname:"Oliveira", team:"Movistar Team", nation:"Portogallo", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"Diego Pescador", surname:"Pescador", team:"Movistar Team", nation:"Colombia", continent:"Sud America", age:21, uciPts:0, uciRank:0 },
  { name:"Nairo Quintana", surname:"Quintana", team:"Movistar Team", nation:"Colombia", continent:"Sud America", age:36, uciPts:0, uciRank:0 },
  { name:"Iván Romeo", surname:"Romeo", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Javier Romo", surname:"Romo", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:27, uciPts:1089, uciRank:73 },
  { name:"Einer Rubio", surname:"Rubio", team:"Movistar Team", nation:"Colombia", continent:"Sud America", age:28, uciPts:0, uciRank:0 },
  { name:"Pelayo Sanchez", surname:"Sanchez", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Gonzalo Serrano", surname:"Serrano", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Natnael Tesfazion", surname:"Tesfazion", team:"Movistar Team", nation:"Eritrea", continent:"Africa", age:26, uciPts:0, uciRank:0 },
  { name:"Albert Torres", surname:"Torres", team:"Movistar Team", nation:"Spagna", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Cian Uijtdebroeks", surname:"Uijtdebroeks", team:"Movistar Team", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Lewis Askey", surname:"Askey", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"George Bennett", surname:"Bennett", team:"NS CYCLING TEAM", nation:"Nuova Zelanda", continent:"Oceania", age:35, uciPts:0, uciRank:0 },
  { name:"Joe Blackmore", surname:"Blackmore", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Guillaume Boivin", surname:"Boivin", team:"NS CYCLING TEAM", nation:"Canada", continent:"Nord America", age:36, uciPts:0, uciRank:0 },
  { name:"Pier-André Côté", surname:"Côté", team:"NS CYCLING TEAM", nation:"Canada", continent:"Nord America", age:28, uciPts:0, uciRank:0 },
  { name:"Itamar Einhorn", surname:"Einhorn", team:"NS CYCLING TEAM", nation:"Israele", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Marco Frigo", surname:"Frigo", team:"NS CYCLING TEAM", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Brady Gilmore", surname:"Gilmore", team:"NS CYCLING TEAM", nation:"Australia", continent:"Oceania", age:24, uciPts:0, uciRank:0 },
  { name:"Biniam Girmay", surname:"Girmay", team:"NS CYCLING TEAM", nation:"Eritrea", continent:"Africa", age:25, uciPts:1646, uciRank:37 },
  { name:"Jan Hirt", surname:"Hirt", team:"NS CYCLING TEAM", nation:"Rep. Ceca", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Hugo Hofstetter", surname:"Hofstetter", team:"NS CYCLING TEAM", nation:"Francia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Oded Kogut", surname:"Kogut", team:"NS CYCLING TEAM", nation:"Israele", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Matis Louvel", surname:"Louvel", team:"NS CYCLING TEAM", nation:"Francia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Alexey Lutsenko", surname:"Lutsenko", team:"NS CYCLING TEAM", nation:"Kazakistan", continent:"Asia", age:33, uciPts:0, uciRank:0 },
  { name:"Pau Martí", surname:"Martí", team:"NS CYCLING TEAM", nation:"Spagna", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Ryan Mullen", surname:"Mullen", team:"NS CYCLING TEAM", nation:"Irlanda", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Krists Neilands", surname:"Neilands", team:"NS CYCLING TEAM", nation:"Lettonia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Alessandro Pinarello", surname:"Pinarello", team:"NS CYCLING TEAM", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Nadav Raisberg", surname:"Raisberg", team:"NS CYCLING TEAM", nation:"Israele", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Nick Schultz", surname:"Schultz", team:"NS CYCLING TEAM", nation:"Australia", continent:"Oceania", age:31, uciPts:0, uciRank:0 },
  { name:"Riley Sheehan", surname:"Sheehan", team:"NS CYCLING TEAM", nation:"USA", continent:"Nord America", age:25, uciPts:0, uciRank:0 },
  { name:"Dion Smith", surname:"Smith", team:"NS CYCLING TEAM", nation:"Nuova Zelanda", continent:"Oceania", age:33, uciPts:0, uciRank:0 },
  { name:"Jake Stewart", surname:"Stewart", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Corbin Strong", surname:"Strong", team:"NS CYCLING TEAM", nation:"Nuova Zelanda", continent:"Oceania", age:25, uciPts:1450, uciRank:47 },
  { name:"Rotem Tene", surname:"Tene", team:"NS CYCLING TEAM", nation:"Israele", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Tom Van Asbroeck", surname:"Van Asbroeck", team:"NS CYCLING TEAM", nation:"Belgio", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Floris Van Tricht", surname:"Van Tricht", team:"NS CYCLING TEAM", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Ethan Vernon", surname:"Vernon", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Stephen Williams", surname:"Williams", team:"NS CYCLING TEAM", nation:"Regno Unito", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Giovanni Aleotti", surname:"Aleotti", team:"Red Bull-BORA-hansgrohe", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Adrien Boichis", surname:"Boichis", team:"Red Bull-BORA-hansgrohe", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Mattia Cattaneo", surname:"Cattaneo", team:"Red Bull-BORA-hansgrohe", nation:"Italia", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Nico Denz", surname:"Denz", team:"Red Bull-BORA-hansgrohe", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Jarrad Drizners", surname:"Drizners", team:"Red Bull-BORA-hansgrohe", nation:"Australia", continent:"Oceania", age:26, uciPts:0, uciRank:0 },
  { name:"Haimar Etxeberria", surname:"Etxeberria", team:"Red Bull-BORA-hansgrohe", nation:"Spagna", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Remco Evenepoel", surname:"Evenepoel", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:26, uciPts:4118, uciRank:6 },
  { name:"Finn Fisher-Black", surname:"Fisher-Black", team:"Red Bull-BORA-hansgrohe", nation:"Nuova Zelanda", continent:"Oceania", age:24, uciPts:0, uciRank:0 },
  { name:"Alexander Hajek", surname:"Hajek", team:"Red Bull-BORA-hansgrohe", nation:"Austria", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Emil Herzog", surname:"Herzog", team:"Red Bull-BORA-hansgrohe", nation:"Germania", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Jai Hindley", surname:"Hindley", team:"Red Bull-BORA-hansgrohe", nation:"Australia", continent:"Oceania", age:29, uciPts:1540, uciRank:42 },
  { name:"Florian Lipowitz", surname:"Lipowitz", team:"Red Bull-BORA-hansgrohe", nation:"Germania", continent:"Europa", age:25, uciPts:2552, uciRank:15 },
  { name:"Arne Marit", surname:"Marit", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Daniel Martinez", surname:"Martinez", team:"Red Bull-BORA-hansgrohe", nation:"Colombia", continent:"Sud America", age:29, uciPts:0, uciRank:0 },
  { name:"Jordi Meeus", surname:"Meeus", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:27, uciPts:1235, uciRank:59 },
  { name:"Gianni Moscon", surname:"Moscon", team:"Red Bull-BORA-hansgrohe", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Giulio Pellizzari", surname:"Pellizzari", team:"Red Bull-BORA-hansgrohe", nation:"Italia", continent:"Europa", age:22, uciPts:1473, uciRank:45 },
  { name:"Laurence Pithie", surname:"Pithie", team:"Red Bull-BORA-hansgrohe", nation:"Nuova Zelanda", continent:"Oceania", age:23, uciPts:0, uciRank:0 },
  { name:"Primoz Roglic", surname:"Roglic", team:"Red Bull-BORA-hansgrohe", nation:"Slovenia", continent:"Europa", age:36, uciPts:1856, uciRank:32 },
  { name:"Callum Thornley", surname:"Thornley", team:"Red Bull-BORA-hansgrohe", nation:"Regno Unito", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Jan Tratnik", surname:"Tratnik", team:"Red Bull-BORA-hansgrohe", nation:"Slovenia", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Luke Tuckwell", surname:"Tuckwell", team:"Red Bull-BORA-hansgrohe", nation:"Australia", continent:"Oceania", age:21, uciPts:0, uciRank:0 },
  { name:"Mick van Dijke", surname:"van Dijke", team:"Red Bull-BORA-hansgrohe", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Tim van Dijke", surname:"van Dijke", team:"Red Bull-BORA-hansgrohe", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Maxim Van Gils", surname:"Van Gils", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Danny van Poppel", surname:"van Poppel", team:"Red Bull-BORA-hansgrohe", nation:"Olanda", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Gianni Vermeersch", surname:"Vermeersch", team:"Red Bull-BORA-hansgrohe", nation:"Belgio", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Aleksandr Vlasov", surname:"Vlasov", team:"Red Bull-BORA-hansgrohe", nation:"Russia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Frederik Wandahl", surname:"Wandahl", team:"Red Bull-BORA-hansgrohe", nation:"Danimarca", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Ben Zwiehoff", surname:"Zwiehoff", team:"Red Bull-BORA-hansgrohe", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Ayco Bastiaens", surname:"Bastiaens", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Steff Cras", surname:"Cras", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Alberto Dainese", surname:"Dainese", team:"Soudal Quick-Step", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Pascal Eenkhoorn", surname:"Eenkhoorn", team:"Soudal Quick-Step", nation:"Olanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Gianmarco Garofoli", surname:"Garofoli", team:"Soudal Quick-Step", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Gil Gelders", surname:"Gelders", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Ethan Hayter", surname:"Hayter", team:"Soudal Quick-Step", nation:"Regno Unito", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Yves Lampaert", surname:"Lampaert", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Mikel Landa", surname:"Landa", team:"Soudal Quick-Step", nation:"Spagna", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Junior Lecerf", surname:"Lecerf", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Paul Magnier", surname:"Magnier", team:"Soudal Quick-Step", nation:"Francia", continent:"Europa", age:21, uciPts:2327, uciRank:19 },
  { name:"Tim Merlier", surname:"Merlier", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:33, uciPts:1951, uciRank:30 },
  { name:"Valentin Paret-Peintre", surname:"Paret-Peintre", team:"Soudal Quick-Step", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Casper Pedersen", surname:"Pedersen", team:"Soudal Quick-Step", nation:"Danimarca", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Andrea Raccagni Noviero", surname:"Raccagni Noviero", team:"Soudal Quick-Step", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Pepijn Reinderink", surname:"Reinderink", team:"Soudal Quick-Step", nation:"Olanda", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Laurenz Rex", surname:"Rex", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Max Schachmann", surname:"Schachmann", team:"Soudal Quick-Step", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Jasper Stuyven", surname:"Stuyven", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Martin Svrcek", surname:"Svrcek", team:"Soudal Quick-Step", nation:"Slovacchia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Dylan van Baarle", surname:"van Baarle", team:"Soudal Quick-Step", nation:"Olanda", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Fabio Van den Bossche", surname:"Van den Bossche", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Dries van Gestel", surname:"van Gestel", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Bert Van Lerberghe", surname:"Van Lerberghe", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Ilan Van Wilder", surname:"Van Wilder", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:25, uciPts:947, uciRank:88 },
  { name:"Warre Vangheluwe", surname:"Vangheluwe", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Mauri Vansevenant", surname:"Vansevenant", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Louis Vervaeke", surname:"Vervaeke", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Jonathan Vervenne", surname:"Vervenne", team:"Soudal Quick-Step", nation:"Belgio", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Filippo Zana", surname:"Zana", team:"Soudal Quick-Step", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Pascal Ackermann", surname:"Ackermann", team:"Team Jayco-AlUla", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Koen Bouwman", surname:"Bouwman", team:"Team Jayco-AlUla", nation:"Olanda", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Amaury Capiot", surname:"Capiot", team:"Team Jayco-AlUla", nation:"Belgio", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Filippo Conca", surname:"Conca", team:"Team Jayco-AlUla", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Alessandro Covi", surname:"Covi", team:"Team Jayco-AlUla", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Dries De Bondt", surname:"De Bondt", team:"Team Jayco-AlUla", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Dries De Pooter", surname:"De Pooter", team:"Team Jayco-AlUla", nation:"Belgio", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Davide De Pretto", surname:"De Pretto", team:"Team Jayco-AlUla", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Robert Donaldson", surname:"Donaldson", team:"Team Jayco-AlUla", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Paul Double", surname:"Double", team:"Team Jayco-AlUla", nation:"Regno Unito", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Luke Durbridge", surname:"Durbridge", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:34, uciPts:0, uciRank:0 },
  { name:"Felix Engelhardt", surname:"Engelhardt", team:"Team Jayco-AlUla", nation:"Germania", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Anders Foldager", surname:"Foldager", team:"Team Jayco-AlUla", nation:"Danimarca", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Patrick Gamper", surname:"Gamper", team:"Team Jayco-AlUla", nation:"Austria", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Alan Hatherly", surname:"Hatherly", team:"Team Jayco-AlUla", nation:"Sudafrica", continent:"Africa", age:30, uciPts:0, uciRank:0 },
  { name:"Asbjørn Hellemose", surname:"Hellemose", team:"Team Jayco-AlUla", nation:"Danimarca", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Christopher Juul-Jensen", surname:"Juul-Jensen", team:"Team Jayco-AlUla", nation:"Danimarca", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Jelte Krijnsen", surname:"Krijnsen", team:"Team Jayco-AlUla", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Michael Matthews", surname:"Matthews", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:35, uciPts:1780, uciRank:35 },
  { name:"Hamish McKenzie", surname:"McKenzie", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:21, uciPts:0, uciRank:0 },
  { name:"Luka Mezgec", surname:"Mezgec", team:"Team Jayco-AlUla", nation:"Slovenia", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"Kelland O'Brien", surname:"O'Brien", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:27, uciPts:0, uciRank:0 },
  { name:"Ben O'Connor", surname:"O'Connor", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:30, uciPts:944, uciRank:89 },
  { name:"Finlay Pickering", surname:"Pickering", team:"Team Jayco-AlUla", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Luke Plapp", surname:"Plapp", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:25, uciPts:997, uciRank:81 },
  { name:"Rudy Porter", surname:"Porter", team:"Team Jayco-AlUla", nation:"Australia", continent:"Oceania", age:25, uciPts:0, uciRank:0 },
  { name:"Mauro Schmid", surname:"Schmid", team:"Team Jayco-AlUla", nation:"Svizzera", continent:"Europa", age:26, uciPts:1193, uciRank:61 },
  { name:"Jasha Sütterlin", surname:"Sütterlin", team:"Team Jayco-AlUla", nation:"Germania", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Andrea Vendrame", surname:"Vendrame", team:"Team Jayco-AlUla", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Warren Barguil", surname:"Barguil", team:"Team Picnic PostNL", nation:"Francia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Frits Biesterbos", surname:"Biesterbos", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Pavel Bittner", surname:"Bittner", team:"Team Picnic PostNL", nation:"Rep. Ceca", continent:"Europa", age:23, uciPts:1126, uciRank:68 },
  { name:"Dillon Corkery", surname:"Corkery", team:"Team Picnic PostNL", nation:"Irlanda", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Timo de Jong", surname:"de Jong", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"John Degenkolb", surname:"Degenkolb", team:"Team Picnic PostNL", nation:"Germania", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"Robbe Dhondt", surname:"Dhondt", team:"Team Picnic PostNL", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Matthew Dinham", surname:"Dinham", team:"Team Picnic PostNL", nation:"Australia", continent:"Oceania", age:25, uciPts:0, uciRank:0 },
  { name:"Nils Eekhoff", surname:"Eekhoff", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Alexy Faure-Prost", surname:"Faure-Prost", team:"Team Picnic PostNL", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Sean Flynn", surname:"Flynn", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Mattia Gaffuri", surname:"Gaffuri", team:"Team Picnic PostNL", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Chris Hamilton", surname:"Hamilton", team:"Team Picnic PostNL", nation:"Australia", continent:"Oceania", age:30, uciPts:0, uciRank:0 },
  { name:"Henri-Francois Haquin", surname:"Haquin", team:"Team Picnic PostNL", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Fabio Jakobsen", surname:"Jakobsen", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"James Knox", surname:"Knox", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Bjoern Koerdt", surname:"Koerdt", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Gijs Leemreize", surname:"Leemreize", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Juan Martinez", surname:"Martinez", team:"Team Picnic PostNL", nation:"Colombia", continent:"Sud America", age:21, uciPts:0, uciRank:0 },
  { name:"Niklas Märkl", surname:"Märkl", team:"Team Picnic PostNL", nation:"Germania", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Tim Naberman", surname:"Naberman", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Oliver Peace", surname:"Peace", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Max Poole", surname:"Poole", team:"Team Picnic PostNL", nation:"Regno Unito", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Timo Roosen", surname:"Roosen", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Julius van den Berg", surname:"van den Berg", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Frank van den Broek", surname:"van den Broek", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Casper van Uden", surname:"van Uden", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Bram Welten", surname:"Welten", team:"Team Picnic PostNL", nation:"Olanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Edoardo Affini", surname:"Affini", team:"Team Visma | Lease a Bike", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Bruno Armirail", surname:"Armirail", team:"Team Visma | Lease a Bike", nation:"Francia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Louis Barré", surname:"Barré", team:"Team Visma | Lease a Bike", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Niklas Behrens", surname:"Behrens", team:"Team Visma | Lease a Bike", nation:"Germania", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Matthew Brennan", surname:"Brennan", team:"Team Visma | Lease a Bike", nation:"Regno Unito", continent:"Europa", age:20, uciPts:1507, uciRank:43 },
  { name:"Victor Campenaerts", surname:"Campenaerts", team:"Team Visma | Lease a Bike", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Owain Doull", surname:"Doull", team:"Team Visma | Lease a Bike", nation:"Regno Unito", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Filippo Fiorelli", surname:"Fiorelli", team:"Team Visma | Lease a Bike", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Tijmen Graat", surname:"Graat", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Strand Hagenes Per", surname:"Hagenes Per", team:"Team Visma | Lease a Bike", nation:"Norvegia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Menno Huising", surname:"Huising", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Matteo Jorgenson", surname:"Jorgenson", team:"Team Visma | Lease a Bike", nation:"USA", continent:"Nord America", age:26, uciPts:1962, uciRank:29 },
  { name:"Wilco Kelderman", surname:"Kelderman", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Timo Kielich", surname:"Kielich", team:"Team Visma | Lease a Bike", nation:"Belgio", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Steven Kruijswijk", surname:"Kruijswijk", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:38, uciPts:0, uciRank:0 },
  { name:"Sepp Kuss", surname:"Kuss", team:"Team Visma | Lease a Bike", nation:"USA", continent:"Nord America", age:31, uciPts:861, uciRank:97 },
  { name:"Christophe Laporte", surname:"Laporte", team:"Team Visma | Lease a Bike", nation:"Francia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Bart Lemmen", surname:"Lemmen", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Pietro Mattio", surname:"Mattio", team:"Team Visma | Lease a Bike", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Jørgen Nordhagen", surname:"Nordhagen", team:"Team Visma | Lease a Bike", nation:"Norvegia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Davide Piganzoli", surname:"Piganzoli", team:"Team Visma | Lease a Bike", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Tim Rex", surname:"Rex", team:"Team Visma | Lease a Bike", nation:"Belgio", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Anton Schiffer", surname:"Schiffer", team:"Team Visma | Lease a Bike", nation:"Germania", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Ben Tulett", surname:"Tulett", team:"Team Visma | Lease a Bike", nation:"Regno Unito", continent:"Europa", age:24, uciPts:990, uciRank:82 },
  { name:"Wout van Aert", surname:"van Aert", team:"Team Visma | Lease a Bike", nation:"Belgio", continent:"Europa", age:31, uciPts:2908, uciRank:10 },
  { name:"Loe van Belle", surname:"van Belle", team:"Team Visma | Lease a Bike", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Jonas Vingegaard", surname:"Vingegaard", team:"Team Visma | Lease a Bike", nation:"Danimarca", continent:"Europa", age:29, uciPts:5944, uciRank:2 },
  { name:"Axel Zingle", surname:"Zingle", team:"Team Visma | Lease a Bike", nation:"Francia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"João Almeida", surname:"Almeida", team:"UAE Team Emirates-XRG", nation:"Portogallo", continent:"Europa", age:27, uciPts:4331, uciRank:5 },
  { name:"Igor Arrieta", surname:"Arrieta", team:"UAE Team Emirates-XRG", nation:"Spagna", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Filippo Baroncini", surname:"Baroncini", team:"UAE Team Emirates-XRG", nation:"Italia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Mikkel Bjerg", surname:"Bjerg", team:"UAE Team Emirates-XRG", nation:"Danimarca", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Jan Christen", surname:"Christen", team:"UAE Team Emirates-XRG", nation:"Svizzera", continent:"Europa", age:21, uciPts:1347, uciRank:52 },
  { name:"Benoît Cosnefroy", surname:"Cosnefroy", team:"UAE Team Emirates-XRG", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Isaac del Toro", surname:"del Toro", team:"UAE Team Emirates-XRG", nation:"Messico", continent:"Nord America", age:22, uciPts:5514, uciRank:3 },
  { name:"Luca Giaimi", surname:"Giaimi", team:"UAE Team Emirates-XRG", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Felix Großschartner", surname:"Großschartner", team:"UAE Team Emirates-XRG", nation:"Austria", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Rune Herregodts", surname:"Herregodts", team:"UAE Team Emirates-XRG", nation:"Belgio", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Julius Johansen", surname:"Johansen", team:"UAE Team Emirates-XRG", nation:"Danimarca", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Stake Laengen Vegard", surname:"Laengen Vegard", team:"UAE Team Emirates-XRG", nation:"Norvegia", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"Brandon McNulty", surname:"McNulty", team:"UAE Team Emirates-XRG", nation:"USA", continent:"Nord America", age:27, uciPts:2153, uciRank:23 },
  { name:"Sebastian Molano", surname:"Molano", team:"UAE Team Emirates-XRG", nation:"Colombia", continent:"Sud America", age:31, uciPts:0, uciRank:0 },
  { name:"António Morgado", surname:"Morgado", team:"UAE Team Emirates-XRG", nation:"Portogallo", continent:"Europa", age:22, uciPts:985, uciRank:84 },
  { name:"Jhonatan Narvaez", surname:"Narvaez", team:"UAE Team Emirates-XRG", nation:"Ecuador", continent:"Sud America", age:29, uciPts:1497, uciRank:44 },
  { name:"Domen Novak", surname:"Novak", team:"UAE Team Emirates-XRG", nation:"Slovenia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Ivo Oliveira", surname:"Oliveira", team:"UAE Team Emirates-XRG", nation:"Portogallo", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Rui Oliveira", surname:"Oliveira", team:"UAE Team Emirates-XRG", nation:"Portogallo", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Adria Pericas", surname:"Pericas", team:"UAE Team Emirates-XRG", nation:"Spagna", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Tadej Pogacar", surname:"Pogacar", team:"UAE Team Emirates-XRG", nation:"Slovenia", continent:"Europa", age:27, uciPts:11680, uciRank:1 },
  { name:"Nils Politt", surname:"Politt", team:"UAE Team Emirates-XRG", nation:"Germania", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Pavel Sivakov", surname:"Sivakov", team:"UAE Team Emirates-XRG", nation:"Francia", continent:"Europa", age:28, uciPts:1155, uciRank:64 },
  { name:"Marc Soler", surname:"Soler", team:"UAE Team Emirates-XRG", nation:"Spagna", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Pablo Torres", surname:"Torres", team:"UAE Team Emirates-XRG", nation:"Spagna", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Kevin Vermaerke", surname:"Vermaerke", team:"UAE Team Emirates-XRG", nation:"USA", continent:"Nord America", age:25, uciPts:0, uciRank:0 },
  { name:"Florian Vermeersch", surname:"Vermeersch", team:"UAE Team Emirates-XRG", nation:"Belgio", continent:"Europa", age:27, uciPts:1015, uciRank:79 },
  { name:"Jay Vine", surname:"Vine", team:"UAE Team Emirates-XRG", nation:"Australia", continent:"Oceania", age:30, uciPts:2320, uciRank:20 },
  { name:"Tim Wellens", surname:"Wellens", team:"UAE Team Emirates-XRG", nation:"Belgio", continent:"Europa", age:34, uciPts:1250, uciRank:58 },
  { name:"Adam Yates", surname:"Yates", team:"UAE Team Emirates-XRG", nation:"Regno Unito", continent:"Europa", age:33, uciPts:1322, uciRank:53 },
  { name:"Jonas Abrahamsen", surname:"Abrahamsen", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:30, uciPts:989, uciRank:83 },
  { name:"Carl-Frederik Bevort", surname:"Bevort", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Erlend Blikra", surname:"Blikra", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"William Blume Levy", surname:"Blume Levy", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Urianstad Bugge Martin", surname:"Bugge Martin", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Erik Bystrøm Sven", surname:"Bystrøm Sven", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Anthon Charmig", surname:"Charmig", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Magnus Cort", surname:"Cort", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Simon Dalby", surname:"Dalby", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Fredrik Dversnes", surname:"Dversnes", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Stian Fredheim", surname:"Fredheim", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Markus Hoelgaard", surname:"Hoelgaard", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Ådne Holter", surname:"Holter", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Hem Hvideberg Jonas", surname:"Hvideberg Jonas", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Storm Ingebrigtsen", surname:"Ingebrigtsen", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Halland Johannessen Anders", surname:"Johannessen Anders", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:26, uciPts:1441, uciRank:50 },
  { name:"Halland Johannessen Tobias", surname:"Johannessen Tobias", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:26, uciPts:1441, uciRank:50 },
  { name:"Alexander Kamp", surname:"Kamp", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Andreas Kron", surname:"Kron", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Johannes Kulset", surname:"Kulset", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Andreas Leknessund", surname:"Leknessund", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Koller Løland Sakarias", surname:"Løland Sakarias", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Henrik Pedersen", surname:"Pedersen", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Erik Resell", surname:"Resell", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Anders Skaarseth", surname:"Skaarseth", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Tobias Svarre", surname:"Svarre", team:"Uno-X Mobility", nation:"Danimarca", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Rasmus Tiller", surname:"Tiller", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Martin Tjøtta", surname:"Tjøtta", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Torstein Træen", surname:"Træen", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Søren Wærenskjold", surname:"Wærenskjold", team:"Uno-X Mobility", nation:"Norvegia", continent:"Europa", age:26, uciPts:1183, uciRank:62 },
  { name:"Davide Ballerini", surname:"Ballerini", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Alberto Bettiol", surname:"Bettiol", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Clément Champoussin", surname:"Champoussin", team:"XDS Astana Team", nation:"Francia", continent:"Europa", age:27, uciPts:957, uciRank:86 },
  { name:"Nicola Conci", surname:"Conci", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Yevgeniy Fedorov", surname:"Fedorov", team:"XDS Astana Team", nation:"Kazakistan", continent:"Asia", age:26, uciPts:0, uciRank:0 },
  { name:"Lorenzo Fortunato", surname:"Fortunato", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:29, uciPts:1447, uciRank:48 },
  { name:"Aaron Gate", surname:"Gate", team:"XDS Astana Team", nation:"Nuova Zelanda", continent:"Oceania", age:35, uciPts:0, uciRank:0 },
  { name:"Lev Gonov", surname:"Gonov", team:"XDS Astana Team", nation:"Russia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Sergio Higuita", surname:"Higuita", team:"XDS Astana Team", nation:"Colombia", continent:"Sud America", age:28, uciPts:0, uciRank:0 },
  { name:"Florian Kajamini", surname:"Kajamini", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Max Kanter", surname:"Kanter", team:"XDS Astana Team", nation:"Germania", continent:"Europa", age:28, uciPts:1004, uciRank:80 },
  { name:"Anton Kuzmin", surname:"Kuzmin", team:"XDS Astana Team", nation:"Kazakistan", continent:"Asia", age:29, uciPts:0, uciRank:0 },
  { name:"Arjen Livyns", surname:"Livyns", team:"XDS Astana Team", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Martin López", surname:"López", team:"XDS Astana Team", nation:"Ecuador", continent:"Sud America", age:25, uciPts:869, uciRank:96 },
  { name:"Matteo Malucelli", surname:"Malucelli", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Henok Mulubrhan", surname:"Mulubrhan", team:"XDS Astana Team", nation:"Eritrea", continent:"Africa", age:26, uciPts:983, uciRank:85 },
  { name:"Cristian Rodriguez", surname:"Rodriguez", team:"XDS Astana Team", nation:"Spagna", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Alessandro Romele", surname:"Romele", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Christian Scaroni", surname:"Scaroni", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:28, uciPts:2399, uciRank:18 },
  { name:"Marco Schrettl", surname:"Schrettl", team:"XDS Astana Team", nation:"Austria", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Thomas Silva", surname:"Silva", team:"XDS Astana Team", nation:"Uruguay", continent:"Sud America", age:24, uciPts:913, uciRank:91 },
  { name:"Haoyu Su", surname:"Su", team:"XDS Astana Team", nation:"Cina", continent:"Asia", age:25, uciPts:0, uciRank:0 },
  { name:"Gleb Syritsa", surname:"Syritsa", team:"XDS Astana Team", nation:"Russia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Harold Tejada", surname:"Tejada", team:"XDS Astana Team", nation:"Colombia", continent:"Sud America", age:28, uciPts:0, uciRank:0 },
  { name:"Mike Teunissen", surname:"Teunissen", team:"XDS Astana Team", nation:"Olanda", continent:"Europa", age:33, uciPts:846, uciRank:98 },
  { name:"Davide Toneatti", surname:"Toneatti", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Diego Ulissi", surname:"Ulissi", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:36, uciPts:957, uciRank:86 },
  { name:"Darren van Bekkum", surname:"van Bekkum", team:"XDS Astana Team", nation:"Olanda", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Simone Velasco", surname:"Velasco", team:"XDS Astana Team", nation:"Italia", continent:"Europa", age:30, uciPts:1464, uciRank:46 },
  { name:"Nicolas Vinokurov", surname:"Vinokurov", team:"XDS Astana Team", nation:"Kazakistan", continent:"Asia", age:23, uciPts:0, uciRank:0 },
  { name:"Xabier Azparren", surname:"Azparren", team:"Pinarello Q36.5", nation:"Spagna", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Matteo Badilatti", surname:"Badilatti", team:"Pinarello Q36.5", nation:"Svizzera", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Sjoerd Bax", surname:"Bax", team:"Pinarello Q36.5", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Sam Bennett", surname:"Bennett", team:"Pinarello Q36.5", nation:"Irlanda", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Walter Calzoni", surname:"Calzoni", team:"Pinarello Q36.5", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Marcel Camprubí", surname:"Camprubí", team:"Pinarello Q36.5", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Fabio Christen", surname:"Christen", team:"Pinarello Q36.5", nation:"Svizzera", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Aimé De Gendt", surname:"De Gendt", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"David de la Cruz", surname:"de la Cruz", team:"Pinarello Q36.5", nation:"Spagna", continent:"Europa", age:36, uciPts:0, uciRank:0 },
  { name:"Mark Donovan", surname:"Donovan", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Edward Dunbar", surname:"Dunbar", team:"Pinarello Q36.5", nation:"Irlanda", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Frederik Frison", surname:"Frison", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Thomas Gloag", surname:"Gloag", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"David González", surname:"González", team:"Pinarello Q36.5", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Chris Harper", surname:"Harper", team:"Pinarello Q36.5", nation:"Australia", continent:"Oceania", age:31, uciPts:0, uciRank:0 },
  { name:"Quinten Hermans", surname:"Hermans", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Emmanuel Houcou", surname:"Houcou", team:"Pinarello Q36.5", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Damien Howson", surname:"Howson", team:"Pinarello Q36.5", nation:"Australia", continent:"Oceania", age:33, uciPts:0, uciRank:0 },
  { name:"Emils Liepins", surname:"Liepins", team:"Pinarello Q36.5", nation:"Lettonia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Kamil Malecki", surname:"Malecki", team:"Pinarello Q36.5", nation:"Polonia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Xandro Meurisse", surname:"Meurisse", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Matteo Moschetti", surname:"Moschetti", team:"Pinarello Q36.5", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Nicolò Parisini", surname:"Parisini", team:"Pinarello Q36.5", nation:"Italia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Joseph Pidcock", surname:"Pidcock", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Tom Pidcock", surname:"Pidcock", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:26, uciPts:3904, uciRank:7 },
  { name:"Milan Vader", surname:"Vader", team:"Pinarello Q36.5", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Brent Van Moer", surname:"Van Moer", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Harm Vanhoucke", surname:"Vanhoucke", team:"Pinarello Q36.5", nation:"Belgio", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Fred Wright", surname:"Wright", team:"Pinarello Q36.5", nation:"Regno Unito", continent:"Europa", age:26, uciPts:1093, uciRank:71 },
  { name:"Nickolas Zukowsky", surname:"Zukowsky", team:"Pinarello Q36.5", nation:"Canada", continent:"Nord America", age:27, uciPts:0, uciRank:0 },
  { name:"Julian Alaphilippe", surname:"Alaphilippe", team:"Tudor Pro Cycling Team", nation:"Francia", continent:"Europa", age:33, uciPts:1446, uciRank:49 },
  { name:"William Barta", surname:"Barta", team:"Tudor Pro Cycling Team", nation:"USA", continent:"Nord America", age:30, uciPts:0, uciRank:0 },
  { name:"Marco Brenner", surname:"Brenner", team:"Tudor Pro Cycling Team", nation:"Germania", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Arvid de Kleijn", surname:"de Kleijn", team:"Tudor Pro Cycling Team", nation:"Olanda", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Robin Donzé", surname:"Donzé", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Jacob Eriksson", surname:"Eriksson", team:"Tudor Pro Cycling Team", nation:"Svezia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Robin Froidevaux", surname:"Froidevaux", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Marco Haller", surname:"Haller", team:"Tudor Pro Cycling Team", nation:"Austria", continent:"Europa", age:35, uciPts:0, uciRank:0 },
  { name:"Marc Hirschi", surname:"Hirschi", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:1262, uciRank:56 },
  { name:"Petr Kelemen", surname:"Kelemen", team:"Tudor Pro Cycling Team", nation:"Rep. Ceca", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Arthur Kluckers", surname:"Kluckers", team:"Tudor Pro Cycling Team", nation:"Lussemburgo", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Sebastian Kolze Changizi", surname:"Kolze Changizi", team:"Tudor Pro Cycling Team", nation:"Danimarca", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Stefan Küng", surname:"Küng", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Fabian Lienhard", surname:"Lienhard", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Marius Mayrhofer", surname:"Mayrhofer", team:"Tudor Pro Cycling Team", nation:"Germania", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Aivaras Mikutis", surname:"Mikutis", team:"Tudor Pro Cycling Team", nation:"Lituania", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Luca Mozzato", surname:"Mozzato", team:"Tudor Pro Cycling Team", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Rick Pluimers", surname:"Pluimers", team:"Tudor Pro Cycling Team", nation:"Olanda", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Mathys Rondel", surname:"Rondel", team:"Tudor Pro Cycling Team", nation:"Francia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Michael Storer", surname:"Storer", team:"Tudor Pro Cycling Team", nation:"Australia", continent:"Oceania", age:29, uciPts:2083, uciRank:27 },
  { name:"Florian Stork", surname:"Stork", team:"Tudor Pro Cycling Team", nation:"Germania", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Joel Suter", surname:"Suter", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Roland Thalmann", surname:"Thalmann", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:32, uciPts:0, uciRank:0 },
  { name:"Matteo Trentin", surname:"Trentin", team:"Tudor Pro Cycling Team", nation:"Italia", continent:"Europa", age:36, uciPts:890, uciRank:94 },
  { name:"Yannis Voisard", surname:"Voisard", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Lawrence Warbasse", surname:"Warbasse", team:"Tudor Pro Cycling Team", nation:"USA", continent:"Nord America", age:35, uciPts:0, uciRank:0 },
  { name:"Fabian Weiss", surname:"Weiss", team:"Tudor Pro Cycling Team", nation:"Svizzera", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Hannes Wilksch", surname:"Wilksch", team:"Tudor Pro Cycling Team", nation:"Germania", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Luc Wirtgen", surname:"Wirtgen", team:"Tudor Pro Cycling Team", nation:"Lussemburgo", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Maikel Zijlaard", surname:"Zijlaard", team:"Tudor Pro Cycling Team", nation:"Olanda", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Davide Bais", surname:"Bais", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Mattia Bais", surname:"Bais", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Dario Belletta", surname:"Belletta", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Adrián Benito", surname:"Benito", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Gabriele Bessega", surname:"Bessega", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Tommaso Bessega", surname:"Bessega", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Aidan Buttigieg", surname:"Buttigieg", team:"Team Polti VisitMalta", nation:"Malta", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Ludovico Crescioli", surname:"Crescioli", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Fabrizio Crozzolo", surname:"Crozzolo", team:"Team Polti VisitMalta", nation:"Argentina", continent:"Sud America", age:21, uciPts:0, uciRank:0 },
  { name:"Pablo Garcia", surname:"Garcia", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Dario Giuliano", surname:"Giuliano", team:"Team Polti VisitMalta", nation:"Francia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Dario Gómez Germán", surname:"Gómez Germán", team:"Team Polti VisitMalta", nation:"Colombia", continent:"Sud America", age:25, uciPts:0, uciRank:0 },
  { name:"Giovanni Lonardi", surname:"Lonardi", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Mirco Maestri", surname:"Maestri", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Andrea Mifsud", surname:"Mifsud", team:"Team Polti VisitMalta", nation:"Malta", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Francisco Muñoz", surname:"Muñoz", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Manuel Peñalver", surname:"Peñalver", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Thomas Pesenti", surname:"Pesenti", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Andrea Pietrobon", surname:"Pietrobon", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Gabriele Raccagni", surname:"Raccagni", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Javier Serrano", surname:"Serrano", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Diego Sevilla", surname:"Sevilla", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Fernando Tercero", surname:"Tercero", team:"Team Polti VisitMalta", nation:"Spagna", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Alessandro Tonelli", surname:"Tonelli", team:"Team Polti VisitMalta", nation:"Italia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Piet Allegaert", surname:"Allegaert", team:"Cofidis", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Stanislaw Aniolkowski", surname:"Aniolkowski", team:"Cofidis", nation:"Polonia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Alex Aranburu", surname:"Aranburu", team:"Cofidis", nation:"Spagna", continent:"Europa", age:30, uciPts:1167, uciRank:63 },
  { name:"Jenthe Biermans", surname:"Biermans", team:"Cofidis", nation:"Belgio", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Emanuel Buchmann", surname:"Buchmann", team:"Cofidis", nation:"Germania", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Simon Carr", surname:"Carr", team:"Cofidis", nation:"Regno Unito", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Camille Charret", surname:"Charret", team:"Cofidis", nation:"Francia", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Bryan Coquard", surname:"Coquard", team:"Cofidis", nation:"Francia", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Nicolas Debeaumarché", surname:"Debeaumarché", team:"Cofidis", nation:"Francia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Valentin Ferron", surname:"Ferron", team:"Cofidis", nation:"Francia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Milan Fretin", surname:"Fretin", team:"Cofidis", nation:"Belgio", continent:"Europa", age:25, uciPts:1130, uciRank:66 },
  { name:"Ion Izagirre", surname:"Izagirre", team:"Cofidis", nation:"Spagna", continent:"Europa", age:37, uciPts:0, uciRank:0 },
  { name:"Clement Izquierdo", surname:"Izquierdo", team:"Cofidis", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Yaël Joalland", surname:"Joalland", team:"Cofidis", nation:"Francia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Alex Kirsch", surname:"Kirsch", team:"Cofidis", nation:"Lussemburgo", continent:"Europa", age:33, uciPts:0, uciRank:0 },
  { name:"Oliver Knight", surname:"Knight", team:"Cofidis", nation:"Regno Unito", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Jan Maas", surname:"Maas", team:"Cofidis", nation:"Olanda", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Sam Maisonobe", surname:"Maisonobe", team:"Cofidis", nation:"Francia", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Jamie Meehan", surname:"Meehan", team:"Cofidis", nation:"Irlanda", continent:"Europa", age:22, uciPts:0, uciRank:0 },
  { name:"Sylvain Moniquet", surname:"Moniquet", team:"Cofidis", nation:"Belgio", continent:"Europa", age:28, uciPts:0, uciRank:0 },
  { name:"Paul Ourselin", surname:"Ourselin", team:"Cofidis", nation:"Francia", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Hugo Page", surname:"Page", team:"Cofidis", nation:"Francia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Alexis Renard", surname:"Renard", team:"Cofidis", nation:"Francia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Ludovic Robeet", surname:"Robeet", team:"Cofidis", nation:"Belgio", continent:"Europa", age:31, uciPts:0, uciRank:0 },
  { name:"Louis Rouland", surname:"Rouland", team:"Cofidis", nation:"Francia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Sergio Samitier", surname:"Samitier", team:"Cofidis", nation:"Spagna", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Dylan Teuns", surname:"Teuns", team:"Cofidis", nation:"Belgio", continent:"Europa", age:34, uciPts:0, uciRank:0 },
  { name:"Benjamin Thomas", surname:"Thomas", team:"Cofidis", nation:"Francia", continent:"Europa", age:30, uciPts:0, uciRank:0 },
  { name:"Damien Touzé", surname:"Touzé", team:"Cofidis", nation:"Francia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Edoardo Zamperini", surname:"Zamperini", team:"Cofidis", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Filippo Cettolin", surname:"Cettolin", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Luca Colnaghi", surname:"Colnaghi", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Lorenzo Conforti", surname:"Conforti", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Luca Covili", surname:"Covili", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:29, uciPts:0, uciRank:0 },
  { name:"Edward Cruz Martínez", surname:"Cruz Martínez", team:"Bardiani-CSF", nation:"Colombia", continent:"Sud America", age:19, uciPts:0, uciRank:0 },
  { name:"Santiago Ferraro", surname:"Ferraro", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Martín Herreño", surname:"Herreño", team:"Bardiani-CSF", nation:"Colombia", continent:"Sud America", age:19, uciPts:0, uciRank:0 },
  { name:"Filippo Magli", surname:"Magli", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Marco Manenti", surname:"Manenti", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:23, uciPts:0, uciRank:0 },
  { name:"Martin Marcellusi", surname:"Marcellusi", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:25, uciPts:0, uciRank:0 },
  { name:"Alessio Martinelli", surname:"Martinelli", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Andrea Montagner", surname:"Montagner", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Luca Paletti", surname:"Paletti", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:21, uciPts:0, uciRank:0 },
  { name:"Mattia Pinazzi", surname:"Pinazzi", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:24, uciPts:0, uciRank:0 },
  { name:"Vicente Rojas", surname:"Rojas", team:"Bardiani-CSF", nation:"Cile", continent:"Sud America", age:23, uciPts:0, uciRank:0 },
  { name:"Sergei Rostovtsev", surname:"Rostovtsev", team:"Bardiani-CSF", nation:"Uzbekistan", continent:"Asia", age:28, uciPts:0, uciRank:0 },
  { name:"Mattia Stenico", surname:"Stenico", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:19, uciPts:0, uciRank:0 },
  { name:"Manuele Tarozzi", surname:"Tarozzi", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:27, uciPts:0, uciRank:0 },
  { name:"Alex Tolio", surname:"Tolio", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:26, uciPts:0, uciRank:0 },
  { name:"Nikita Tsvetkov", surname:"Tsvetkov", team:"Bardiani-CSF", nation:"Uzbekistan", continent:"Asia", age:21, uciPts:0, uciRank:0 },
  { name:"Filippo Turconi", surname:"Turconi", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:20, uciPts:0, uciRank:0 },
  { name:"Matteo Turconi", surname:"Turconi", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:18, uciPts:0, uciRank:0 },
  { name:"Enrico Zanoncello", surname:"Zanoncello", team:"Bardiani-CSF", nation:"Italia", continent:"Europa", age:28, uciPts:0, uciRank:0 },
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

// ── HELP MODAL ──────────────────────────────────────────────────────────
function HelpModal({open,onClose,title,children}){
  if(!open)return null;
  return(<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:"16px"}} onClick={onClose}>
    <div style={{background:"#fff",borderRadius:"10px",maxWidth:"360px",width:"100%",maxHeight:"80vh",overflow:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}} onClick={e=>e.stopPropagation()}>
      <div style={{background:US.black,color:"#fff",padding:"14px 16px",borderBottom:`3px solid ${US.orange}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:US.orange,marginBottom:"2px",fontWeight:"700"}}>Come si gioca</div>
          <div style={{fontSize:"15px",fontWeight:"700"}}>{title}</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",color:"#fff",fontSize:"22px",cursor:"pointer",padding:"0 4px",lineHeight:1,fontFamily:"inherit"}}>×</button>
      </div>
      <div style={{padding:"16px",fontSize:"13px",lineHeight:1.55,color:"#333"}}>
        {children}
      </div>
      <div style={{padding:"0 16px 16px"}}>
        <button onClick={onClose} style={{...T.pb,width:"100%"}}>Ho capito, gioca!</button>
      </div>
    </div>
  </div>);
}
function HelpButton({onClick}){
  return(<button onClick={onClick} style={{background:"none",border:"1.5px solid #444",borderRadius:"50%",width:"26px",height:"26px",color:"#aaa",fontSize:"13px",cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",justifyContent:"center",marginRight:"6px",fontWeight:"700"}} title="Come si gioca" onMouseEnter={e=>{e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="#fff";}} onMouseLeave={e=>{e.currentTarget.style.color="#aaa";e.currentTarget.style.borderColor="#444";}}>?</button>);
}

// ── TUTORIALS ────────────────────────────────────────────────────────────
const TUTORIALS={
  ciclodle:{title:"🚴 Ciclodle",body:(<>
    <p style={{marginTop:0}}><strong>Obiettivo:</strong> indovina il corridore misterioso in <strong>6 tentativi</strong>.</p>
    <p>Ogni volta che inserisci un corridore, vedrai 6 caselle colorate che ti dicono quanto è vicino:</p>
    <ul style={{paddingLeft:"18px",marginBottom:"10px"}}>
      <li><span style={{background:"#16a34a",color:"#fff",padding:"1px 6px",borderRadius:"3px",fontSize:"11px",fontWeight:"700"}}>Verde</span> = esatto</li>
      <li><span style={{background:"#d97706",color:"#fff",padding:"1px 6px",borderRadius:"3px",fontSize:"11px",fontWeight:"700"}}>Giallo</span> = vicino (età ±3, punti ±500, rank ±10)</li>
      <li><span style={{background:"#dc2626",color:"#fff",padding:"1px 6px",borderRadius:"3px",fontSize:"11px",fontWeight:"700"}}>Rosso</span> = diverso</li>
      <li>Le frecce <strong>▲▼</strong> indicano se il valore reale è più alto/basso</li>
    </ul>
    <p>Le colonne sono: <strong>Team, Nazione, Continente, Età, Punti UCI, Rank UCI</strong>.</p>
    <p>Puoi usare <strong>💡 Indizio</strong> per svelare gratis una colonna.</p>
    <p style={{color:"#888",fontSize:"11px",marginBottom:0}}>Pool: Top 100 UCI 2025</p>
  </>)},
  wordle:{title:"🔤 Wordle Cognome",body:(<>
    <p style={{marginTop:0}}><strong>Obiettivo:</strong> indovina il <strong>cognome</strong> del corridore in 6 tentativi.</p>
    <p>Il cognome ha una lunghezza fissa (tra 4 e 8 lettere). Per ogni lettera:</p>
    <ul style={{paddingLeft:"18px",marginBottom:"10px"}}>
      <li><span style={{background:"#22c55e",color:"#fff",padding:"1px 6px",borderRadius:"3px",fontSize:"11px",fontWeight:"700"}}>Verde</span> = lettera giusta nel posto giusto</li>
      <li><span style={{background:"#eab308",color:"#fff",padding:"1px 6px",borderRadius:"3px",fontSize:"11px",fontWeight:"700"}}>Giallo</span> = lettera giusta in posto sbagliato</li>
      <li><span style={{background:"#6b7280",color:"#fff",padding:"1px 6px",borderRadius:"3px",fontSize:"11px",fontWeight:"700"}}>Grigio</span> = lettera non presente</li>
    </ul>
    <p>Premi <strong>💡 Indizio</strong> per vedere nazione, team e rank UCI del corridore.</p>
    <p style={{color:"#888",fontSize:"11px",marginBottom:0}}>Pool: Top 100 UCI 2025</p>
  </>)},
  hangman:{title:"💀 Impiccato",body:(<>
    <p style={{marginTop:0}}><strong>Obiettivo:</strong> scopri il <strong>cognome</strong> prima che il pupazzo sia completato.</p>
    <p>Hai <strong>7 errori</strong> a disposizione. Ogni errore aggiunge un pezzo al pupazzo (testa, corpo, braccia, gambe).</p>
    <p>Le lettere corrette diventano <span style={{color:"#22c55e",fontWeight:"700"}}>verdi</span>, quelle sbagliate <span style={{color:"#ef4444",fontWeight:"700"}}>rosse</span>.</p>
    <p>Premi <strong>💡 Indizio</strong> per vedere nazione, team e rank UCI del corridore.</p>
    <p style={{color:"#888",fontSize:"11px",marginBottom:0}}>Pool: Top 100 UCI 2025</p>
  </>)},
  higherlower:{title:"⚖ Chi ha più punti UCI",body:(<>
    <p style={{marginTop:0}}><strong>Obiettivo:</strong> scegli il corridore con <strong>più punti UCI 2025</strong>.</p>
    <p>A sinistra vedi il punteggio del corridore base. A destra lo sfidante, con il punteggio nascosto.</p>
    <p>Se indovini, lo sfidante diventa la nuova base e arriva un nuovo corridore. Se sbagli, la streak si azzera.</p>
    <ul style={{paddingLeft:"18px",marginBottom:"10px"}}>
      <li>🟰 Parità = punto valido</li>
      <li>🎉 Confetti ogni 5 risposte consecutive</li>
      <li>🏆 Il tuo record viene salvato localmente</li>
    </ul>
    <p style={{color:"#888",fontSize:"11px",marginBottom:0}}>Pool: Top 100 UCI 2025 • Streak infinita</p>
  </>)},
  carriera:{title:"🏆 Indovina la Carriera",body:(<>
    <p style={{marginTop:0}}><strong>Obiettivo:</strong> indovina il ciclista dalla sua carriera professionistica.</p>
    <p>Vengono mostrati <strong>team, periodo e giorni di gara</strong>. Più indizi sblocchi, meno punti ottieni.</p>
    <ul style={{paddingLeft:"18px",marginBottom:"10px"}}>
      <li>Indovina al 1° tentativo = punti massimi</li>
      <li>Ogni errore sblocca un indizio in più automaticamente</li>
      <li>Puoi anche premere <strong>💡</strong> per sbloccarli tu</li>
      <li>Clicca <strong>💡 nota</strong> su un team per un extra</li>
    </ul>
    <p style={{color:"#888",fontSize:"11px",marginBottom:0}}>22 carriere curate: da Merckx a Pogačar</p>
  </>)},
  lista:{title:"⏱ Sfida a Tempo",body:(<>
    <p style={{marginTop:0}}><strong>Obiettivo:</strong> in <strong>90 secondi</strong> trova più nomi possibili della categoria di oggi.</p>
    <p>Categorie in rotazione: vincitori Tour/Giro/Vuelta, Monumento, campioni del Mondo, maglie del Tour, specialità…</p>
    <ul style={{paddingLeft:"18px",marginBottom:"10px"}}>
      <li>Scrivi un nome e premi <strong>Invio</strong></li>
      <li>Ogni risposta corretta = <strong>+5 secondi</strong> bonus ⏱</li>
      <li>Piccoli refusi sono accettati (fuzzy match)</li>
    </ul>
    <p style={{color:"#888",fontSize:"11px",marginBottom:0}}>12 categorie diverse</p>
  </>)},
  salita:{title:"🏔 Indovina la Salita",body:(<>
    <p style={{marginTop:0}}><strong>Obiettivo:</strong> riconosci la salita leggendaria dai dati tecnici.</p>
    <p>Gli indizi si sbloccano uno alla volta:</p>
    <ol style={{paddingLeft:"18px",marginBottom:"10px"}}>
      <li>Lunghezza in km</li>
      <li>Pendenza media in %</li>
      <li>Quota finale in metri</li>
      <li>Nazione + descrizione</li>
    </ol>
    <p>Al 1° tentativo: 4 punti. All'ultimo: 1 punto.</p>
    <p style={{color:"#888",fontSize:"11px",marginBottom:0}}>15 salite iconiche di Tour, Giro e Vuelta</p>
  </>)},
  timeline:{title:"🔀 Timeline",body:(<>
    <p style={{marginTop:0}}><strong>Obiettivo:</strong> ordina <strong>4 eventi storici</strong> dal più vecchio al più recente.</p>
    <p>Usa i tasti <strong>▲▼</strong> per muovere gli eventi. Quando sei sicuro, premi <strong>Verifica ordine</strong>.</p>
    <ul style={{paddingLeft:"18px",marginBottom:"10px"}}>
      <li><span style={{background:"#16a34a",color:"#fff",padding:"1px 6px",borderRadius:"3px",fontSize:"11px",fontWeight:"700"}}>Verde</span> = posizione corretta</li>
      <li><span style={{background:"#dc2626",color:"#fff",padding:"1px 6px",borderRadius:"3px",fontSize:"11px",fontWeight:"700"}}>Rosso</span> = posizione sbagliata</li>
    </ul>
    <p>Un solo tentativo: poi viene rivelato l'anno esatto di ogni evento.</p>
    <p style={{color:"#888",fontSize:"11px",marginBottom:0}}>10 timeline storiche</p>
  </>)},
};

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

function Hdr({title,sub,onHome,archiveNav,countdown,onHelp}){
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
      {onHelp&&<HelpButton onClick={onHelp}/>}
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
  const[showHelp,setShowHelp]=useState(false);
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

  if(savedToday)return(<div style={T.app}><Hdr title="Ciclodle" sub={`🗓 Giornaliero • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome}/><DoneScreen gameKey="ciclodle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <HelpModal open={showHelp} onClose={()=>setShowHelp(false)} title={TUTORIALS.ciclodle.title}>{TUTORIALS.ciclodle.body}</HelpModal>
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
  return(<div style={{...T.app,position:"relative"}}><Hdr title="Ciclodle" sub={`${label} • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
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
  const pool=useMemo(()=>{const daily=shuffle([...DB_TOP100],seedRandom(seed));return daily.filter(p=>{const n=normStr(p.surname);return /^[A-Z]+$/.test(n)&&n.length>=4&&n.length<=8;}).slice(1);},[seed]);
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
  const[showHelp,setShowHelp]=useState(false);
  if(savedToday)return(<div style={T.app}><Hdr title="Wordle Cognome" sub={`🗓 Giornaliero • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome}/><DoneScreen gameKey="wordle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <HelpModal open={showHelp} onClose={()=>setShowHelp(false)} title={TUTORIALS.wordle.title}>{TUTORIALS.wordle.body}</HelpModal>
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
  return(<div style={{...T.app,position:"relative"}}>{showConfetti&&<Confetti active={showConfetti}/>}<Hdr title="Wordle Cognome" sub={`${label} • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
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
  const pool=useMemo(()=>{const daily=shuffle([...DB_TOP100],seedRandom(seed));return daily.filter(p=>{const n=normStr(p.surname);return /^[A-Z]+$/.test(n)&&n.length>=4;}).slice(2);},[seed]);
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
  const[showHelp,setShowHelp]=useState(false);
  useEffect(()=>{if(st==="w"&&!hgConfetti)setTimeout(()=>setHgConfetti(true),500);},[st]);
  if(savedToday)return(<div style={T.app}><Hdr title="Impiccato" sub={`🗓 Giornaliero • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome}/><DoneScreen gameKey="hangman" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <HelpModal open={showHelp} onClose={()=>setShowHelp(false)} title={TUTORIALS.hangman.title}>{TUTORIALS.hangman.body}</HelpModal>
    <div style={{fontSize:"40px",marginBottom:"6px"}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,marginBottom:"4px"}}>{s.won?"Trovato!":"Non trovato"}</div>
    <div style={{fontSize:"18px",fontWeight:"800",letterSpacing:"4px",color:US.black,marginBottom:"6px"}}>{s.word}</div>
    <ShareButton text={`🪢 Impiccato #${day}\n${s.won?"Trovato":"Non trovato"}: ${s.word}\n${s.errors||0} errori\nquiz-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={{...T.app,position:"relative"}}>{hgConfetti&&<Confetti active={hgConfetti}/>}<Hdr title="Impiccato" sub={`${label} • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
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
  const[showHelp,setShowHelp]=useState(false);

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
      <Hdr title="Chi ha più punti UCI" onHelp={()=>setShowHelp(true)} onHome={onHome}/>
    <HelpModal open={showHelp} onClose={()=>setShowHelp(false)} title={TUTORIALS.higherlower.title}>{TUTORIALS.higherlower.body}</HelpModal>
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
      <Hdr title="Chi ha più punti UCI" sub={`⚖ Confronto #${round}`} onHelp={()=>setShowHelp(true)} onHome={onHome}/>
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
  const[showHelp,setShowHelp]=useState(false);
  useEffect(()=>{sRev(1);sGu("");sSt("p");sSc(0);sFin(false);sShownNotes(new Set());},[seed]);
  const pts=Math.max(1,maxC+1-rev);
  function sub(){
    const g=normLow(gu.trim()),a=normLow(rider.answer);
    const ok=g===a||a.split(" ").some(p=>p.length>3&&g===p)||(g.length>4&&a.includes(g));
    if(ok){sSc(x=>x+pts);sSt("c");}
    else{if(rev<maxC){sRev(x=>x+1);sSt("w");setTimeout(()=>sSt("p"),900);}else sSt("r");}
    sGu("");
  }
  if(savedToday&&isToday)return(<div style={{...T.app,position:"relative"}}>{carConf&&<Confetti active={carConf}/>}<Hdr title="Indovina la Carriera" sub="🗓 Giornaliero" onHelp={()=>setShowHelp(true)} onHome={onHome}/><DoneScreen gameKey="carriera" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>🏆</div><div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.score} punti</div><ShareButton text={`🏆 Indovina la Carriera #${day}\n${s.score} punti\nquiz-ciclismo.vercel.app`}/></>}</DoneScreen></div>);
    <HelpModal open={showHelp} onClose={()=>setShowHelp(false)} title={TUTORIALS.carriera.title}>{TUTORIALS.carriera.body}</HelpModal>
  if(fin)return(<div style={{...T.app,position:"relative"}} className="pop-in">{carConf&&<Confetti active={carConf}/>}<Hdr title="Indovina la Carriera" onHelp={()=>setShowHelp(true)} onHome={onHome}/><div style={{...T.body,textAlign:"center",paddingTop:"40px"}}><div style={{fontSize:"48px",fontWeight:"300",color:US.black}}>{sc}</div><div style={{fontSize:"12px",color:"#888",marginBottom:"18px"}}>punti totali</div><ShareButton text={`🏆 Indovina la Carriera #${day}\n${sc} punti\nquiz-ciclismo.vercel.app`}/>{!isToday&&archiveNav&&archiveNav.day<archiveNav.max&&<button onClick={archiveNav.next} style={{...T.pb,width:"100%",marginBottom:"6px"}}>→ Prossima sfida</button>}{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}<button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button></div></div>);
  return(<div style={T.app}><Hdr title="Indovina la Carriera" sub={`${label} • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
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
  const[showHelp,setShowHelp]=useState(false);
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
  if(savedToday&&isToday)return(<div style={{...T.app,position:"relative"}}>{listaConf&&<Confetti active={listaConf}/>}<Hdr title="Sfida a Tempo" sub="🗓 Giornaliero" onHelp={()=>setShowHelp(true)} onHome={onHome}/><DoneScreen gameKey="lista" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=>{
    <HelpModal open={showHelp} onClose={()=>setShowHelp(false)} title={TUTORIALS.lista.title}>{TUTORIALS.lista.body}</HelpModal>
    const fn=s.foundNames||[];const all=s.allNames||[];const ms=all.filter(p=>!fn.includes(p));
    return (<><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>📋</div><div style={{fontSize:"13px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.title}</div><div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{s.found}/{s.total} trovati ({Math.round(s.found/s.total*100)}%)</div>{fn.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"5px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{fn.map(p=>(<div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}{ms.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"5px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{ms.map(p=>(<div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}<ShareButton text={`📋 Lista Quiz #${day}\n${s.title}\n${s.found}/${s.total} trovati\nquiz-ciclismo.vercel.app`}/></>);
  }}</DoneScreen></div>);
  if(done){
    const missed=validAnswers.filter(p=>!found.includes(p));
    const emoji=pct===100?"🏆":pct>=70?"🥇":pct>=40?"👍":"📚";
    return(<div style={T.app}><Hdr title="Sfida a Tempo" sub={`${label} • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
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
  return(<div style={T.app}><Hdr title="Sfida a Tempo" sub={`${label} • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
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
  const[showHelp,setShowHelp]=useState(false);
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
  if(savedToday&&isToday)return(<div style={{...T.app,position:"relative"}}>{confRev&&<Confetti active={confRev}/>}<Hdr title="Indovina la Salita" sub="🗓 Giornaliero" onHelp={()=>setShowHelp(true)} onHome={onHome}/><DoneScreen gameKey="salita" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <HelpModal open={showHelp} onClose={()=>setShowHelp(false)} title={TUTORIALS.salita.title}>{TUTORIALS.salita.body}</HelpModal>
    <div style={{fontSize:"48px",marginBottom:"4px"}}>🏔</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,marginBottom:"2px"}}>{s.won?`${s.score} punti`:"Non trovata"}</div>
    <div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{salita.answer}</div>
    <ShareButton text={`🏔 Indovina la Salita #${day}\n${s.won?s.score+" punti":"Non trovata"}\nquiz-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={{...T.app,position:"relative"}}>{confRev&&<Confetti active={confRev}/>}<Hdr title="Indovina la Salita" sub={`${label} • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
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
  const[showHelp,setShowHelp]=useState(false);
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

  if(savedToday&&isToday)return(<div style={{...T.app,position:"relative"}}>{timelineConf&&<Confetti active={timelineConf}/>}<Hdr title="Timeline" sub="🗓 Giornaliero" onHelp={()=>setShowHelp(true)} onHome={onHome}/><DoneScreen gameKey="timeline" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <HelpModal open={showHelp} onClose={()=>setShowHelp(false)} title={TUTORIALS.timeline.title}>{TUTORIALS.timeline.body}</HelpModal>
    <div style={{fontSize:"48px",marginBottom:"4px"}}>🔀</div>
    <div style={{fontSize:"13px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.title}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:s.won?US.green:US.red,marginBottom:"10px"}}>{s.correct}/{s.total} in ordine corretto</div>
    <ShareButton text={`🔀 Timeline #${day}\n${s.title}\n${s.correct}/${s.total} corretti\nquiz-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);

  const correctCount=submitted?order.filter((e,i)=>e.label===correctOrder[i].label).length:0;
  const allOk=submitted&&correctCount===order.length;

  return(<div style={{...T.app,position:"relative"}}>{timelineConf&&<Confetti active={timelineConf}/>}<Hdr title="Timeline" sub={`${label} • #${day}`} onHelp={()=>setShowHelp(true)} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
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
  {key:"ciclodle",   label:"Ciclodle",                 icon:"🚴", desc:"Indovina il corridore in 6 tentativi. Ogni risposta rivela indizi.", badge:"Top 100 UCI",    accent:"#f5e000", badgeBg:"#111",     badgeTx:"#f5e000", size:"big"},
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

