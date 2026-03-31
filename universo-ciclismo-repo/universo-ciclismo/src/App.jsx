import { useState, useEffect, useRef, useMemo } from "react";

// ── DATABASE ────────────────────────────────────────────────────────────
// WorldTour + ProTeams 2025 — role = specialità, value = valore stimato (M€)
const DB = [
  // UAE Team Emirates
  { name:"Tadej Pogačar", surname:"Pogacar", club:"UAE Team Emirates", league:"WorldTour", role:"Scalatore", nation:"Slovenia", continent:"Europa", age:26, value:120 },
  { name:"Adam Yates", surname:"Yates", club:"UAE Team Emirates", league:"WorldTour", role:"Scalatore", nation:"Inghilterra", continent:"Europa", age:33, value:8 },
  { name:"Juan Ayuso", surname:"Ayuso", club:"UAE Team Emirates", league:"WorldTour", role:"Scalatore", nation:"Spagna", continent:"Europa", age:22, value:30 },
  { name:"João Almeida", surname:"Almeida", club:"UAE Team Emirates", league:"WorldTour", role:"Scalatore", nation:"Portogallo", continent:"Europa", age:26, value:20 },
  { name:"Marc Hirschi", surname:"Hirschi", club:"UAE Team Emirates", league:"WorldTour", role:"Puncher", nation:"Svizzera", continent:"Europa", age:26, value:12 },
  { name:"Tim Wellens", surname:"Wellens", club:"UAE Team Emirates", league:"WorldTour", role:"Puncher", nation:"Belgio", continent:"Europa", age:34, value:3 },
  { name:"Nils Politt", surname:"Politt", club:"UAE Team Emirates", league:"WorldTour", role:"Classiche", nation:"Germania", continent:"Europa", age:31, value:5 },
  { name:"Jay Vine", surname:"Vine", club:"UAE Team Emirates", league:"WorldTour", role:"Scalatore", nation:"Australia", continent:"Oceania", age:29, value:8 },
  { name:"Mikkel Bjerg", surname:"Bjerg", club:"UAE Team Emirates", league:"WorldTour", role:"Cronoman", nation:"Danimarca", continent:"Europa", age:26, value:5 },
  { name:"Isaac Del Toro", surname:"Del Toro", club:"UAE Team Emirates", league:"WorldTour", role:"Scalatore", nation:"Messico", continent:"Nord America", age:20, value:10 },
  { name:"Pavel Sivakov", surname:"Sivakov", club:"UAE Team Emirates", league:"WorldTour", role:"Scalatore", nation:"Francia", continent:"Europa", age:28, value:7 },
  // Visma-Lease a Bike
  { name:"Jonas Vingegaard", surname:"Vingegaard", club:"Visma-Lease a Bike", league:"WorldTour", role:"Scalatore", nation:"Danimarca", continent:"Europa", age:28, value:80 },
  { name:"Wout van Aert", surname:"Van Aert", club:"Visma-Lease a Bike", league:"WorldTour", role:"Classiche", nation:"Belgio", continent:"Europa", age:31, value:40 },
  { name:"Matteo Jorgenson", surname:"Jorgenson", club:"Visma-Lease a Bike", league:"WorldTour", role:"Passista", nation:"USA", continent:"Nord America", age:25, value:18 },
  { name:"Sepp Kuss", surname:"Kuss", club:"Visma-Lease a Bike", league:"WorldTour", role:"Scalatore", nation:"USA", continent:"Nord America", age:30, value:10 },
  { name:"Dylan van Baarle", surname:"Van Baarle", club:"Visma-Lease a Bike", league:"WorldTour", role:"Classiche", nation:"Olanda", continent:"Europa", age:33, value:6 },
  { name:"Wilco Kelderman", surname:"Kelderman", club:"Visma-Lease a Bike", league:"WorldTour", role:"Scalatore", nation:"Olanda", continent:"Europa", age:34, value:4 },
  { name:"Olav Kooij", surname:"Kooij", club:"Visma-Lease a Bike", league:"WorldTour", role:"Velocista", nation:"Olanda", continent:"Europa", age:23, value:12 },
  { name:"Christophe Laporte", surname:"Laporte", club:"Visma-Lease a Bike", league:"WorldTour", role:"Classiche", nation:"Francia", continent:"Europa", age:32, value:8 },
  { name:"Tiesj Benoot", surname:"Benoot", club:"Visma-Lease a Bike", league:"WorldTour", role:"Classiche", nation:"Belgio", continent:"Europa", age:31, value:5 },
  { name:"Robert Gesink", surname:"Gesink", club:"Visma-Lease a Bike", league:"WorldTour", role:"Scalatore", nation:"Olanda", continent:"Europa", age:39, value:1 },
  { name:"Cian Uijtdebroeks", surname:"Uijtdebroeks", club:"Visma-Lease a Bike", league:"WorldTour", role:"Scalatore", nation:"Belgio", continent:"Europa", age:22, value:15 },
  // INEOS Grenadiers
  { name:"Egan Bernal", surname:"Bernal", club:"INEOS Grenadiers", league:"WorldTour", role:"Scalatore", nation:"Colombia", continent:"Sud America", age:28, value:15 },
  { name:"Tom Pidcock", surname:"Pidcock", club:"INEOS Grenadiers", league:"WorldTour", role:"Puncher", nation:"Inghilterra", continent:"Europa", age:26, value:18 },
  { name:"Carlos Rodríguez", surname:"Rodriguez", club:"INEOS Grenadiers", league:"WorldTour", role:"Scalatore", nation:"Spagna", continent:"Europa", age:24, value:15 },
  { name:"Geraint Thomas", surname:"Thomas", club:"INEOS Grenadiers", league:"WorldTour", role:"Scalatore", nation:"Galles", continent:"Europa", age:39, value:2 },
  { name:"Filippo Ganna", surname:"Ganna", club:"INEOS Grenadiers", league:"WorldTour", role:"Cronoman", nation:"Italia", continent:"Europa", age:29, value:12 },
  { name:"Jonathan Narváez", surname:"Narvaez", club:"INEOS Grenadiers", league:"WorldTour", role:"Passista", nation:"Ecuador", continent:"Sud America", age:28, value:6 },
  { name:"Jhonatan Narváez", surname:"Jhonatan Narvaez", club:"INEOS Grenadiers", league:"WorldTour", role:"Passista", nation:"Ecuador", continent:"Sud America", age:28, value:6 },
  { name:"Laurence Pithie", surname:"Pithie", club:"INEOS Grenadiers", league:"WorldTour", role:"Classiche", nation:"Nuova Zelanda", continent:"Oceania", age:23, value:5 },
  { name:"Ben Turner", surname:"Turner", club:"INEOS Grenadiers", league:"WorldTour", role:"Classiche", nation:"Inghilterra", continent:"Europa", age:25, value:4 },
  { name:"Luke Plapp", surname:"Plapp", club:"INEOS Grenadiers", league:"WorldTour", role:"Cronoman", nation:"Australia", continent:"Oceania", age:24, value:7 },
  // Soudal Quick-Step
  { name:"Remco Evenepoel", surname:"Evenepoel", club:"Soudal Quick-Step", league:"WorldTour", role:"Scalatore", nation:"Belgio", continent:"Europa", age:25, value:60 },
  { name:"Mikel Landa", surname:"Landa", club:"Soudal Quick-Step", league:"WorldTour", role:"Scalatore", nation:"Spagna", continent:"Europa", age:36, value:4 },
  { name:"Julian Alaphilippe", surname:"Alaphilippe", club:"Soudal Quick-Step", league:"WorldTour", role:"Puncher", nation:"Francia", continent:"Europa", age:33, value:6 },
  { name:"Tim Merlier", surname:"Merlier", club:"Soudal Quick-Step", league:"WorldTour", role:"Velocista", nation:"Belgio", continent:"Europa", age:32, value:8 },
  { name:"Kasper Asgreen", surname:"Asgreen", club:"Soudal Quick-Step", league:"WorldTour", role:"Classiche", nation:"Danimarca", continent:"Europa", age:30, value:6 },
  { name:"Ilan Van Wilder", surname:"Van Wilder", club:"Soudal Quick-Step", league:"WorldTour", role:"Cronoman", nation:"Belgio", continent:"Europa", age:24, value:4 },
  { name:"Yves Lampaert", surname:"Lampaert", club:"Soudal Quick-Step", league:"WorldTour", role:"Classiche", nation:"Belgio", continent:"Europa", age:34, value:3 },
  { name:"Jan Hirt", surname:"Hirt", club:"Soudal Quick-Step", league:"WorldTour", role:"Scalatore", nation:"Rep. Ceca", continent:"Europa", age:34, value:3 },
  // Lidl-Trek
  { name:"Mads Pedersen", surname:"Pedersen", club:"Lidl-Trek", league:"WorldTour", role:"Classiche", nation:"Danimarca", continent:"Europa", age:29, value:12 },
  { name:"Giulio Ciccone", surname:"Ciccone", club:"Lidl-Trek", league:"WorldTour", role:"Scalatore", nation:"Italia", continent:"Europa", age:31, value:6 },
  { name:"Tao Geoghegan Hart", surname:"Geoghegan Hart", club:"Lidl-Trek", league:"WorldTour", role:"Scalatore", nation:"Inghilterra", continent:"Europa", age:30, value:5 },
  { name:"Jonathan Milan", surname:"Milan", club:"Lidl-Trek", league:"WorldTour", role:"Velocista", nation:"Italia", continent:"Europa", age:24, value:15 },
  { name:"Jasper Stuyven", surname:"Stuyven", club:"Lidl-Trek", league:"WorldTour", role:"Classiche", nation:"Belgio", continent:"Europa", age:33, value:4 },
  { name:"Bauke Mollema", surname:"Mollema", club:"Lidl-Trek", league:"WorldTour", role:"Passista", nation:"Olanda", continent:"Europa", age:38, value:1.5 },
  { name:"Elisa Longo Borghini", surname:"Longo Borghini", club:"Lidl-Trek", league:"WorldTour", role:"Classiche", nation:"Italia", continent:"Europa", age:33, value:8 },
  { name:"Juan Pedro López", surname:"Lopez", club:"Lidl-Trek", league:"WorldTour", role:"Scalatore", nation:"Spagna", continent:"Europa", age:27, value:5 },
  // Alpecin-Deceuninck
  { name:"Mathieu van der Poel", surname:"Van der Poel", club:"Alpecin-Deceuninck", league:"WorldTour", role:"Classiche", nation:"Olanda", continent:"Europa", age:30, value:50 },
  { name:"Jasper Philipsen", surname:"Philipsen", club:"Alpecin-Deceuninck", league:"WorldTour", role:"Velocista", nation:"Belgio", continent:"Europa", age:27, value:18 },
  { name:"Kaden Groves", surname:"Groves", club:"Alpecin-Deceuninck", league:"WorldTour", role:"Velocista", nation:"Australia", continent:"Oceania", age:26, value:8 },
  { name:"Silvan Dillier", surname:"Dillier", club:"Alpecin-Deceuninck", league:"WorldTour", role:"Gregario", nation:"Svizzera", continent:"Europa", age:35, value:2 },
  { name:"Gianni Vermeersch", surname:"Vermeersch", club:"Alpecin-Deceuninck", league:"WorldTour", role:"Classiche", nation:"Belgio", continent:"Europa", age:32, value:4 },
  { name:"Søren Kragh Andersen", surname:"Kragh Andersen", club:"Alpecin-Deceuninck", league:"WorldTour", role:"Passista", nation:"Danimarca", continent:"Europa", age:30, value:5 },
  { name:"Axel Laurance", surname:"Laurance", club:"Alpecin-Deceuninck", league:"WorldTour", role:"Puncher", nation:"Francia", continent:"Europa", age:23, value:5 },
  // Bahrain Victorious
  { name:"Pello Bilbao", surname:"Bilbao", club:"Bahrain Victorious", league:"WorldTour", role:"Scalatore", nation:"Spagna", continent:"Europa", age:35, value:5 },
  { name:"Santiago Buitrago", surname:"Buitrago", club:"Bahrain Victorious", league:"WorldTour", role:"Scalatore", nation:"Colombia", continent:"Sud America", age:25, value:8 },
  { name:"Jack Haig", surname:"Haig", club:"Bahrain Victorious", league:"WorldTour", role:"Scalatore", nation:"Australia", continent:"Oceania", age:31, value:4 },
  { name:"Phil Bauhaus", surname:"Bauhaus", club:"Bahrain Victorious", league:"WorldTour", role:"Velocista", nation:"Germania", continent:"Europa", age:31, value:4 },
  { name:"Fred Wright", surname:"Wright", club:"Bahrain Victorious", league:"WorldTour", role:"Puncher", nation:"Inghilterra", continent:"Europa", age:25, value:5 },
  { name:"Matej Mohorič", surname:"Mohoric", club:"Bahrain Victorious", league:"WorldTour", role:"Passista", nation:"Slovenia", continent:"Europa", age:30, value:6 },
  { name:"Antonio Tiberi", surname:"Tiberi", club:"Bahrain Victorious", league:"WorldTour", role:"Scalatore", nation:"Italia", continent:"Europa", age:23, value:10 },
  // Bora-hansgrohe
  { name:"Primož Roglič", surname:"Roglic", club:"Bora-hansgrohe", league:"WorldTour", role:"Scalatore", nation:"Slovenia", continent:"Europa", age:36, value:20 },
  { name:"Aleksandr Vlasov", surname:"Vlasov", club:"Bora-hansgrohe", league:"WorldTour", role:"Scalatore", nation:"Russia", continent:"Europa", age:29, value:10 },
  { name:"Jai Hindley", surname:"Hindley", club:"Bora-hansgrohe", league:"WorldTour", role:"Scalatore", nation:"Australia", continent:"Oceania", age:29, value:8 },
  { name:"Sam Welsford", surname:"Welsford", club:"Bora-hansgrohe", league:"WorldTour", role:"Velocista", nation:"Australia", continent:"Oceania", age:29, value:4 },
  { name:"Danny van Poppel", surname:"Van Poppel", club:"Bora-hansgrohe", league:"WorldTour", role:"Velocista", nation:"Olanda", continent:"Europa", age:31, value:3 },
  { name:"Patrick Gamper", surname:"Gamper", club:"Bora-hansgrohe", league:"WorldTour", role:"Gregario", nation:"Austria", continent:"Europa", age:28, value:2 },
  { name:"Bob Jungels", surname:"Jungels", club:"Bora-hansgrohe", league:"WorldTour", role:"Classiche", nation:"Lussemburgo", continent:"Europa", age:33, value:4 },
  { name:"Cian Uijtdebroeks", surname:"Uijtdebroeks Bora", club:"Bora-hansgrohe", league:"WorldTour", role:"Scalatore", nation:"Belgio", continent:"Europa", age:22, value:15 },
  // Movistar Team
  { name:"Enric Mas", surname:"Mas", club:"Movistar Team", league:"WorldTour", role:"Scalatore", nation:"Spagna", continent:"Europa", age:30, value:10 },
  { name:"Nairo Quintana", surname:"Quintana", club:"Movistar Team", league:"WorldTour", role:"Scalatore", nation:"Colombia", continent:"Sud America", age:35, value:3 },
  { name:"Alex Aranburu", surname:"Aranburu", club:"Movistar Team", league:"WorldTour", role:"Puncher", nation:"Spagna", continent:"Europa", age:29, value:4 },
  { name:"Einer Rubio", surname:"Rubio", club:"Movistar Team", league:"WorldTour", role:"Scalatore", nation:"Colombia", continent:"Sud America", age:27, value:5 },
  { name:"Oier Lazkano", surname:"Lazkano", club:"Movistar Team", league:"WorldTour", role:"Puncher", nation:"Spagna", continent:"Europa", age:25, value:4 },
  { name:"Pelayo Sánchez", surname:"Pelayo Sanchez", club:"Movistar Team", league:"WorldTour", role:"Passista", nation:"Spagna", continent:"Europa", age:26, value:3 },
  // EF Education-EasyPost
  { name:"Richard Carapaz", surname:"Carapaz", club:"EF Education-EasyPost", league:"WorldTour", role:"Scalatore", nation:"Ecuador", continent:"Sud America", age:31, value:10 },
  { name:"Ben Healy", surname:"Healy", club:"EF Education-EasyPost", league:"WorldTour", role:"Puncher", nation:"Irlanda", continent:"Europa", age:24, value:8 },
  { name:"Neilson Powless", surname:"Powless", club:"EF Education-EasyPost", league:"WorldTour", role:"Passista", nation:"USA", continent:"Nord America", age:28, value:6 },
  { name:"Stefan Bissegger", surname:"Bissegger", club:"EF Education-EasyPost", league:"WorldTour", role:"Cronoman", nation:"Svizzera", continent:"Europa", age:26, value:5 },
  { name:"Alberto Bettiol", surname:"Bettiol", club:"EF Education-EasyPost", league:"WorldTour", role:"Classiche", nation:"Italia", continent:"Europa", age:31, value:5 },
  { name:"Marijn van den Berg", surname:"Van den Berg", club:"EF Education-EasyPost", league:"WorldTour", role:"Velocista", nation:"Olanda", continent:"Europa", age:24, value:4 },
  // AG2R Citroën
  { name:"Ben O'Connor", surname:"O Connor", club:"AG2R Citroën", league:"WorldTour", role:"Scalatore", nation:"Australia", continent:"Oceania", age:30, value:10 },
  { name:"Felix Gall", surname:"Gall", club:"AG2R Citroën", league:"WorldTour", role:"Scalatore", nation:"Austria", continent:"Europa", age:27, value:7 },
  { name:"Benoît Cosnefroy", surname:"Cosnefroy", club:"AG2R Citroën", league:"WorldTour", role:"Puncher", nation:"Francia", continent:"Europa", age:29, value:5 },
  { name:"Lilian Calmejane", surname:"Calmejane", club:"AG2R Citroën", league:"WorldTour", role:"Baroudeur", nation:"Francia", continent:"Europa", age:32, value:2 },
  { name:"Sam Bennett", surname:"Bennett", club:"AG2R Citroën", league:"WorldTour", role:"Velocista", nation:"Irlanda", continent:"Europa", age:34, value:3 },
  // Groupama-FDJ
  { name:"David Gaudu", surname:"Gaudu", club:"Groupama-FDJ", league:"WorldTour", role:"Scalatore", nation:"Francia", continent:"Europa", age:28, value:8 },
  { name:"Thibaut Pinot", surname:"Pinot", club:"Groupama-FDJ", league:"WorldTour", role:"Scalatore", nation:"Francia", continent:"Europa", age:35, value:2 },
  { name:"Arnaud Démare", surname:"Demare", club:"Groupama-FDJ", league:"WorldTour", role:"Velocista", nation:"Francia", continent:"Europa", age:33, value:4 },
  { name:"Stefan Küng", surname:"Kung", club:"Groupama-FDJ", league:"WorldTour", role:"Cronoman", nation:"Svizzera", continent:"Europa", age:31, value:5 },
  { name:"Valentin Madouas", surname:"Madouas", club:"Groupama-FDJ", league:"WorldTour", role:"Classiche", nation:"Francia", continent:"Europa", age:29, value:4 },
  { name:"Lenny Martínez", surname:"Lenny Martinez", club:"Groupama-FDJ", league:"WorldTour", role:"Scalatore", nation:"Francia", continent:"Europa", age:22, value:8 },
  // Cofidis
  { name:"Guillaume Martin", surname:"Martin", club:"Cofidis", league:"ProTeam", role:"Scalatore", nation:"Francia", continent:"Europa", age:32, value:3 },
  { name:"Bryan Coquard", surname:"Coquard", club:"Cofidis", league:"ProTeam", role:"Velocista", nation:"Francia", continent:"Europa", age:33, value:2 },
  { name:"Ion Izagirre", surname:"Izagirre", club:"Cofidis", league:"ProTeam", role:"Passista", nation:"Spagna", continent:"Europa", age:36, value:2 },
  { name:"Axel Zingle", surname:"Zingle", club:"Cofidis", league:"ProTeam", role:"Classiche", nation:"Francia", continent:"Europa", age:25, value:4 },
  // Astana Qazaqstan
  { name:"Mark Cavendish", surname:"Cavendish", club:"Astana Qazaqstan", league:"WorldTour", role:"Velocista", nation:"Inghilterra", continent:"Europa", age:40, value:2 },
  { name:"Alexey Lutsenko", surname:"Lutsenko", club:"Astana Qazaqstan", league:"WorldTour", role:"Puncher", nation:"Kazakistan", continent:"Asia", age:33, value:4 },
  { name:"Harold Tejada", surname:"Tejada", club:"Astana Qazaqstan", league:"WorldTour", role:"Scalatore", nation:"Colombia", continent:"Sud America", age:28, value:3 },
  { name:"Cees Bol", surname:"Bol", club:"Astana Qazaqstan", league:"WorldTour", role:"Velocista", nation:"Olanda", continent:"Europa", age:29, value:2 },
  // Intermarché-Circus-Wanty
  { name:"Biniam Girmay", surname:"Girmay", club:"Intermarché-Circus-Wanty", league:"WorldTour", role:"Velocista", nation:"Eritrea", continent:"Africa", age:25, value:15 },
  { name:"Louis Meintjes", surname:"Meintjes", club:"Intermarché-Circus-Wanty", league:"WorldTour", role:"Scalatore", nation:"Sudafrica", continent:"Africa", age:33, value:3 },
  { name:"Gerben Thijssen", surname:"Thijssen", club:"Intermarché-Circus-Wanty", league:"WorldTour", role:"Velocista", nation:"Belgio", continent:"Europa", age:26, value:3 },
  { name:"Rui Costa", surname:"Rui Costa", club:"Intermarché-Circus-Wanty", league:"WorldTour", role:"Passista", nation:"Portogallo", continent:"Europa", age:38, value:1.5 },
  // Jayco AlUla
  { name:"Simon Yates", surname:"Simon Yates", club:"Jayco AlUla", league:"WorldTour", role:"Scalatore", nation:"Inghilterra", continent:"Europa", age:33, value:6 },
  { name:"Michael Matthews", surname:"Matthews", club:"Jayco AlUla", league:"WorldTour", role:"Puncher", nation:"Australia", continent:"Oceania", age:34, value:5 },
  { name:"Eddie Dunbar", surname:"Dunbar", club:"Jayco AlUla", league:"WorldTour", role:"Scalatore", nation:"Irlanda", continent:"Europa", age:28, value:4 },
  { name:"Caleb Ewan", surname:"Ewan", club:"Jayco AlUla", league:"WorldTour", role:"Velocista", nation:"Australia", continent:"Oceania", age:31, value:4 },
  { name:"Dylan Groenewegen", surname:"Groenewegen", club:"Jayco AlUla", league:"WorldTour", role:"Velocista", nation:"Olanda", continent:"Europa", age:32, value:5 },
  // DSM-Firmenich PostNL
  { name:"Romain Bardet", surname:"Bardet", club:"DSM-Firmenich PostNL", league:"WorldTour", role:"Scalatore", nation:"Francia", continent:"Europa", age:35, value:4 },
  { name:"Thymen Arensman", surname:"Arensman", club:"DSM-Firmenich PostNL", league:"WorldTour", role:"Scalatore", nation:"Olanda", continent:"Europa", age:25, value:6 },
  { name:"Nils Eekhoff", surname:"Eekhoff", club:"DSM-Firmenich PostNL", league:"WorldTour", role:"Classiche", nation:"Olanda", continent:"Europa", age:27, value:3 },
  { name:"John Degenkolb", surname:"Degenkolb", club:"DSM-Firmenich PostNL", league:"WorldTour", role:"Classiche", nation:"Germania", continent:"Europa", age:36, value:2 },
  { name:"Max Walscheid", surname:"Walscheid", club:"DSM-Firmenich PostNL", league:"WorldTour", role:"Velocista", nation:"Germania", continent:"Europa", age:31, value:2 },
  // Lotto Dstny
  { name:"Arnaud De Lie", surname:"De Lie", club:"Lotto Dstny", league:"ProTeam", role:"Classiche", nation:"Belgio", continent:"Europa", age:23, value:10 },
  { name:"Maxim Van Gils", surname:"Van Gils", club:"Lotto Dstny", league:"ProTeam", role:"Puncher", nation:"Belgio", continent:"Europa", age:25, value:7 },
  { name:"Lennert Van Eetvelt", surname:"Van Eetvelt", club:"Lotto Dstny", league:"ProTeam", role:"Scalatore", nation:"Belgio", continent:"Europa", age:23, value:6 },
  { name:"Viktor Verschaeve", surname:"Verschaeve", club:"Lotto Dstny", league:"ProTeam", role:"Gregario", nation:"Belgio", continent:"Europa", age:24, value:2 },
  // Israel-Premier Tech
  { name:"Chris Froome", surname:"Froome", club:"Israel-Premier Tech", league:"WorldTour", role:"Scalatore", nation:"Inghilterra", continent:"Europa", age:40, value:2 },
  { name:"Jakob Fuglsang", surname:"Fuglsang", club:"Israel-Premier Tech", league:"WorldTour", role:"Scalatore", nation:"Danimarca", continent:"Europa", age:40, value:1.5 },
  { name:"Pascal Ackermann", surname:"Ackermann", club:"Israel-Premier Tech", league:"WorldTour", role:"Velocista", nation:"Germania", continent:"Europa", age:31, value:3 },
  { name:"Derek Gee", surname:"Gee", club:"Israel-Premier Tech", league:"WorldTour", role:"Passista", nation:"Canada", continent:"Nord America", age:27, value:5 },
  { name:"Corbin Strong", surname:"Strong", club:"Israel-Premier Tech", league:"WorldTour", role:"Passista", nation:"Nuova Zelanda", continent:"Oceania", age:24, value:3 },
  // Decathlon AG2R La Mondiale
  { name:"Romain Bardet", surname:"Bardet AG2R", club:"Decathlon AG2R", league:"WorldTour", role:"Scalatore", nation:"Francia", continent:"Europa", age:35, value:4 },
  // Total Energies / Uno-X / Others
  { name:"Peter Sagan", surname:"Sagan", club:"Ritirato", league:"Ritirato", role:"Classiche", nation:"Slovacchia", continent:"Europa", age:35, value:1 },
  { name:"Vincenzo Nibali", surname:"Nibali", club:"Ritirato", league:"Ritirato", role:"Scalatore", nation:"Italia", continent:"Europa", age:40, value:1 },
  { name:"Filippo Zana", surname:"Zana", club:"Jayco AlUla", league:"WorldTour", role:"Passista", nation:"Italia", continent:"Europa", age:26, value:4 },
  { name:"Lorenzo Fortunato", surname:"Fortunato", club:"Astana Qazaqstan", league:"WorldTour", role:"Scalatore", nation:"Italia", continent:"Europa", age:28, value:3 },
  { name:"Mattias Skjelmose", surname:"Skjelmose", club:"Lidl-Trek", league:"WorldTour", role:"Passista", nation:"Danimarca", continent:"Europa", age:24, value:10 },
  { name:"Magnus Cort", surname:"Cort", club:"Uno-X Mobility", league:"ProTeam", role:"Baroudeur", nation:"Danimarca", continent:"Europa", age:29, value:5 },
  { name:"Tobias Halland Johannessen", surname:"Johannessen", club:"Uno-X Mobility", league:"ProTeam", role:"Scalatore", nation:"Norvegia", continent:"Europa", age:24, value:6 },
  { name:"Alexander Kristoff", surname:"Kristoff", club:"Uno-X Mobility", league:"ProTeam", role:"Velocista", nation:"Norvegia", continent:"Europa", age:38, value:2 },
  { name:"Jhonatan Caicedo", surname:"Caicedo", club:"EF Education-EasyPost", league:"WorldTour", role:"Scalatore", nation:"Ecuador", continent:"Sud America", age:31, value:2 },
  { name:"Andrea Vendrame", surname:"Vendrame", club:"Decathlon AG2R", league:"WorldTour", role:"Puncher", nation:"Italia", continent:"Europa", age:30, value:3 },
  { name:"Davide Formolo", surname:"Formolo", club:"Movistar Team", league:"WorldTour", role:"Scalatore", nation:"Italia", continent:"Europa", age:33, value:3 },
  { name:"Diego Ulissi", surname:"Ulissi", club:"UAE Team Emirates", league:"WorldTour", role:"Puncher", nation:"Italia", continent:"Europa", age:36, value:2 },
  { name:"Gianni Moscon", surname:"Moscon", club:"Soudal Quick-Step", league:"WorldTour", role:"Classiche", nation:"Italia", continent:"Europa", age:31, value:3 },
  { name:"Elia Viviani", surname:"Viviani", club:"INEOS Grenadiers", league:"WorldTour", role:"Velocista", nation:"Italia", continent:"Europa", age:36, value:2 },
  { name:"Damiano Caruso", surname:"Caruso", club:"Bahrain Victorious", league:"WorldTour", role:"Scalatore", nation:"Italia", continent:"Europa", age:37, value:2 },
  { name:"Lorenzo Rota", surname:"Rota", club:"Intermarché-Circus-Wanty", league:"WorldTour", role:"Baroudeur", nation:"Italia", continent:"Europa", age:30, value:2 },
  { name:"Davide Ballerini", surname:"Ballerini", club:"Astana Qazaqstan", league:"WorldTour", role:"Classiche", nation:"Italia", continent:"Europa", age:30, value:2 },
  { name:"Stefano Oldani", surname:"Oldani", club:"Cofidis", league:"ProTeam", role:"Passista", nation:"Italia", continent:"Europa", age:28, value:2 },
  { name:"Andrea Bagioli", surname:"Bagioli", club:"Soudal Quick-Step", league:"WorldTour", role:"Puncher", nation:"Italia", continent:"Europa", age:25, value:5 },
  { name:"Matteo Trentin", surname:"Trentin", club:"Lidl-Trek", league:"WorldTour", role:"Classiche", nation:"Italia", continent:"Europa", age:36, value:2 },
  { name:"Fernando Gaviria", surname:"Gaviria", club:"Movistar Team", league:"WorldTour", role:"Velocista", nation:"Colombia", continent:"Sud America", age:30, value:3 },
  { name:"Daniel Felipe Martínez", surname:"Martinez", club:"Bora-hansgrohe", league:"WorldTour", role:"Scalatore", nation:"Colombia", continent:"Sud America", age:29, value:8 },
  { name:"Sergio Higuita", surname:"Higuita", club:"Bora-hansgrohe", league:"WorldTour", role:"Scalatore", nation:"Colombia", continent:"Sud America", age:28, value:7 },
  { name:"Jhonatan Restrepo", surname:"Restrepo", club:"Arkéa-B&B Hotels", league:"ProTeam", role:"Velocista", nation:"Colombia", continent:"Sud America", age:30, value:1 },
  { name:"Tadej Pogačar", surname:"Pogacar UAE", club:"UAE Team Emirates", league:"WorldTour", role:"Scalatore", nation:"Slovenia", continent:"Europa", age:26, value:120 },
];

// ── ROSE (squadre 2025) ────────────────────────────────────────────────
const ROSE_LIST = [
  { key:"UAE", nome:"UAE Team Emirates", emoji:"🇦🇪", giocatori:[
    "Pogacar","Yates","Ayuso","Almeida","Hirschi","Wellens","Politt","Vine","Bjerg","Del Toro","Sivakov","Ulissi"
  ]},
  { key:"Visma", nome:"Visma-Lease a Bike", emoji:"🟡", giocatori:[
    "Vingegaard","Van Aert","Jorgenson","Kuss","Van Baarle","Kelderman","Kooij","Laporte","Benoot","Gesink","Uijtdebroeks"
  ]},
  { key:"INEOS", nome:"INEOS Grenadiers", emoji:"🔴", giocatori:[
    "Bernal","Pidcock","Rodriguez","Thomas","Ganna","Narvaez","Pithie","Turner","Plapp","Viviani"
  ]},
  { key:"Soudal", nome:"Soudal Quick-Step", emoji:"🐺", giocatori:[
    "Evenepoel","Landa","Alaphilippe","Merlier","Asgreen","Van Wilder","Lampaert","Hirt","Moscon","Bagioli"
  ]},
  { key:"Trek", nome:"Lidl-Trek", emoji:"🔵", giocatori:[
    "Pedersen","Ciccone","Geoghegan Hart","Milan","Stuyven","Mollema","Lopez","Skjelmose","Trentin"
  ]},
  { key:"Alpecin", nome:"Alpecin-Deceuninck", emoji:"🖤", giocatori:[
    "Van der Poel","Philipsen","Groves","Dillier","Vermeersch","Kragh Andersen","Laurance"
  ]},
  { key:"Bahrain", nome:"Bahrain Victorious", emoji:"🇧🇭", giocatori:[
    "Bilbao","Buitrago","Haig","Bauhaus","Wright","Mohoric","Tiberi","Caruso"
  ]},
  { key:"Bora", nome:"Bora-hansgrohe", emoji:"🟢", giocatori:[
    "Roglic","Vlasov","Hindley","Welsford","Van Poppel","Gamper","Jungels","Martinez","Higuita"
  ]},
  { key:"Movistar", nome:"Movistar Team", emoji:"🔵", giocatori:[
    "Mas","Quintana","Aranburu","Rubio","Lazkano","Pelayo Sanchez","Formolo","Gaviria"
  ]},
  { key:"EF", nome:"EF Education-EasyPost", emoji:"🩷", giocatori:[
    "Carapaz","Healy","Powless","Bissegger","Bettiol","Van den Berg","Caicedo"
  ]},
  { key:"AG2R", nome:"AG2R Citroën", emoji:"🤍", giocatori:[
    "O Connor","Gall","Cosnefroy","Calmejane","Bennett","Vendrame"
  ]},
  { key:"Groupama", nome:"Groupama-FDJ", emoji:"🇫🇷", giocatori:[
    "Gaudu","Pinot","Demare","Kung","Madouas","Lenny Martinez"
  ]},
  { key:"Intermarche", nome:"Intermarché-Circus-Wanty", emoji:"🟤", giocatori:[
    "Girmay","Meintjes","Thijssen","Rui Costa","Rota"
  ]},
  { key:"Jayco", nome:"Jayco AlUla", emoji:"🟢", giocatori:[
    "Simon Yates","Matthews","Dunbar","Ewan","Groenewegen","Zana"
  ]},
  { key:"DSM", nome:"DSM-Firmenich PostNL", emoji:"⬛", giocatori:[
    "Bardet","Arensman","Eekhoff","Degenkolb","Walscheid"
  ]},
  { key:"Lotto", nome:"Lotto Dstny", emoji:"🔴", giocatori:[
    "De Lie","Van Gils","Van Eetvelt","Verschaeve"
  ]},
];

// ── CARRIERE ────────────────────────────────────────────────────────────
const CAREERS = [
  { answer:"Eddy Merckx", clues:[
    { club:"Peugeot-BP", period:"1966–1967", apps:131, goals:45, note:"Primo contratto professionistico" },
    { club:"Faema/Molteni", period:"1968–1976", apps:620, goals:350, note:"5 Tour, 5 Giro, 3 Mondiali, 19 Classiche Monumento" },
    { club:"C&A", period:"1977–1978", apps:90, goals:15, note:"Ultimi anni di carriera, ritiro a 33 anni" },
  ]},
  { answer:"Fausto Coppi", clues:[
    { club:"Legnano", period:"1940–1942", apps:45, goals:18, note:"Primo Giro d'Italia a 20 anni nel 1940" },
    { club:"Bianchi", period:"1946–1954", apps:280, goals:150, note:"2 Tour, 5 Giro, Mondiale 1953, dominio assoluto" },
    { club:"Bianchi-Pirelli", period:"1955–1959", apps:80, goals:10, note:"Declino e tragica morte nel 1960" },
  ]},
  { answer:"Marco Pantani", clues:[
    { club:"Carrera Jeans", period:"1992–1996", apps:120, goals:25, note:"Prime vittorie di tappa al Giro, scalatore puro" },
    { club:"Mercatone Uno", period:"1997–2003", apps:180, goals:45, note:"Doppietta Tour-Giro 1998, unico italiano del XX secolo" },
  ]},
  { answer:"Tadej Pogačar", clues:[
    { club:"Rog Ljubljana (juniores)", period:"2016–2018", apps:60, goals:20, note:"Campione del mondo juniores" },
    { club:"UAE Team Emirates", period:"2019–", apps:350, goals:95, note:"3 Tour de France, Giro, Mondiale, tutte le Classiche Monumento" },
  ]},
  { answer:"Chris Froome", clues:[
    { club:"Barloworld", period:"2008–2009", apps:40, goals:2, note:"Esordio professionistico, nato in Kenya" },
    { club:"Team Sky/INEOS", period:"2010–2023", apps:450, goals:55, note:"4 Tour de France, 1 Giro, 1 Vuelta, dominio 2013-2017" },
    { club:"Israel-Premier Tech", period:"2023–", apps:60, goals:0, note:"Ultimi anni dopo il grave incidente del 2019" },
  ]},
  { answer:"Alberto Contador", clues:[
    { club:"ONCE/Discovery", period:"2003–2007", apps:120, goals:30, note:"Primo Tour de France nel 2007 a 24 anni" },
    { club:"Astana", period:"2008–2010", apps:100, goals:25, note:"Tour 2009 e Giro 2008" },
    { club:"Saxo Bank/Tinkoff", period:"2011–2017", apps:250, goals:55, note:"2 Giro, 2 Vuelta, rivale di Froome e Nibali" },
  ]},
  { answer:"Vincenzo Nibali", clues:[
    { club:"Fassa Bortolo/Liquigas", period:"2005–2012", apps:200, goals:20, note:"Primo Giro d'Italia nel 2010, classe pura" },
    { club:"Astana", period:"2013–2016", apps:180, goals:30, note:"Tour de France 2014, Giro 2016" },
    { club:"Bahrain/Astana/Trek", period:"2017–2022", apps:150, goals:10, note:"3° Giro d'Italia, Sanremo 2018, ritiro nel 2022" },
  ]},
  { answer:"Peter Sagan", clues:[
    { club:"Liquigas-Cannondale", period:"2010–2014", apps:250, goals:60, note:"3 maglie verdi, vittorie al Giro e classiche" },
    { club:"Tinkoff", period:"2015–2016", apps:120, goals:35, note:"Mondiale 2015, campione del mondo dominante" },
    { club:"Bora-hansgrohe", period:"2017–2021", apps:200, goals:40, note:"3 Mondiali consecutivi (2015-17), record maglia verde" },
    { club:"TotalEnergies", period:"2022–2023", apps:80, goals:5, note:"Ultimi anni, ritiro nel 2024" },
  ]},
  { answer:"Gino Bartali", clues:[
    { club:"Legnano", period:"1935–1943", apps:150, goals:50, note:"2 Giro d'Italia, inizio della leggenda" },
    { club:"Legnano/Bartali", period:"1946–1954", apps:200, goals:40, note:"Tour de France 1938 e 1948 (a 10 anni di distanza)" },
  ]},
  { answer:"Bernard Hinault", clues:[
    { club:"Renault-Gitane", period:"1975–1983", apps:300, goals:150, note:"3 Tour, 2 Giro, Vuelta, Mondiale 1980" },
    { club:"La Vie Claire", period:"1984–1986", apps:120, goals:50, note:"Tour 1985, ultimo Tour vinto, ritiro a 32 anni" },
  ]},
  { answer:"Miguel Indurain", clues:[
    { club:"Reynolds/Banesto", period:"1985–1996", apps:350, goals:60, note:"5 Tour de France consecutivi (1991-95), 2 Giro, Olimpiade 1996" },
  ]},
  { answer:"Lance Armstrong", clues:[
    { club:"Motorola", period:"1992–1996", apps:120, goals:20, note:"Mondiale 1993, diagnosi cancro 1996" },
    { club:"US Postal/Discovery", period:"1998–2005", apps:200, goals:40, note:"7 Tour (tutti revocati per doping)" },
    { club:"Astana/RadioShack", period:"2009–2011", apps:60, goals:2, note:"Ritorno e poi squalifica a vita nel 2012" },
  ]},
  { answer:"Alejandro Valverde", clues:[
    { club:"Kelme", period:"2002–2003", apps:60, goals:8, note:"Esordio professionistico, subito vincente" },
    { club:"Caisse d'Épargne/Movistar", period:"2004–2022", apps:700, goals:133, note:"Mondiale 2018 a 38 anni, 4 Liegi, Vuelta 2009, record di longevità" },
  ]},
  { answer:"Primož Roglič", clues:[
    { club:"Adria Mobil", period:"2013–2015", apps:40, goals:5, note:"Ex saltatore con gli sci, passato al ciclismo tardi" },
    { club:"LottoNL-Jumbo/Visma", period:"2016–2023", apps:300, goals:80, note:"3 Vuelta, Olimpiade Tokyo 2021, Parigi-Nizza, rivale di Pogačar" },
    { club:"Bora-hansgrohe", period:"2024–", apps:50, goals:8, note:"Vuelta 2024, ancora competitivo a 35 anni" },
  ]},
  { answer:"Jonas Vingegaard", clues:[
    { club:"ColoQuick (Continental)", period:"2019–2020", apps:40, goals:3, note:"Da team Continental danese alla ribalta" },
    { club:"Jumbo-Visma/Visma-Lease a Bike", period:"2021–", apps:150, goals:25, note:"2 Tour de France (2022-23), rivale di Pogačar, caduta grave 2024" },
  ]},
  { answer:"Remco Evenepoel", clues:[
    { club:"Deceuninck-Quick-Step/Soudal QS", period:"2019–", apps:200, goals:45, note:"Vuelta 2022, Mondiale 2022, Oro Olimpico 2024, Liegi 2023, prodigio belga" },
  ]},
  { answer:"Tom Boonen", clues:[
    { club:"US Postal", period:"2002–2003", apps:60, goals:5, note:"Primi anni, gregario di Armstrong" },
    { club:"Quick-Step", period:"2003–2017", apps:500, goals:120, note:"4 Roubaix, 3 Fiandre, Mondiale 2005, re delle classiche" },
  ]},
  { answer:"Fabian Cancellara", clues:[
    { club:"Mapei/Fassa Bortolo", period:"2001–2005", apps:150, goals:15, note:"Primi successi nelle crono" },
    { club:"CSC/Saxo Bank/Trek", period:"2006–2016", apps:350, goals:60, note:"3 Fiandre, 3 Roubaix, 2 Olimpiadi crono, il re del pavé" },
  ]},
  { answer:"Mark Cavendish", clues:[
    { club:"T-Mobile/HTC", period:"2007–2011", apps:200, goals:80, note:"Mondiale 2011, dominio nelle volate al Tour" },
    { club:"Sky/Dimension Data/Bahrain", period:"2012–2020", apps:250, goals:50, note:"Periodo difficile, depressione, rinascita" },
    { club:"Quick-Step/Astana", period:"2021–2024", apps:100, goals:10, note:"Record 35 tappe al Tour (2024), ritiro leggendario" },
  ]},
  { answer:"Mathieu van der Poel", clues:[
    { club:"BKCP-Corendon (CX)", period:"2014–2018", apps:200, goals:100, note:"Dominio nel ciclocross, talento multigenerazionale" },
    { club:"Alpecin-Deceuninck", period:"2019–", apps:250, goals:40, note:"Mondiale 2023, Fiandre, Roubaix, Sanremo, classicissimo totale" },
  ]},
  { answer:"Wout van Aert", clues:[
    { club:"Vérandas Willems/Crelan", period:"2017–2018", apps:60, goals:10, note:"Dal ciclocross alla strada" },
    { club:"Jumbo-Visma/Visma-Lease a Bike", period:"2019–", apps:220, goals:55, note:"Sanremo, Fiandre, tappe al Tour, gregario di lusso e campione" },
  ]},
  { answer:"Philippe Gilbert", clues:[
    { club:"La Française des Jeux", period:"2003–2008", apps:200, goals:20, note:"Crescita nelle classiche francesi" },
    { club:"Omega Pharma/BMC/Quick-Step/Lotto", period:"2009–2023", apps:500, goals:80, note:"5 Classiche Monumento diverse, Mondiale 2012, record assoluto" },
  ]},
];

// ── TRASFERIMENTI CICLISMO ─────────────────────────────────────────────
const TRANSFERS = [
  {player:"Tadej Pogačar",     from:"Rog Ljubljana",       to:"UAE Team Emirates",     year:2019, fee:2.5},
  {player:"Chris Froome",      from:"INEOS Grenadiers",    to:"Israel-Premier Tech",   year:2021, fee:5.5},
  {player:"Remco Evenepoel",   from:"Lotto Soudal (dev)",  to:"Deceuninck-Quick-Step",  year:2019, fee:0},
  {player:"Peter Sagan",       from:"Bora-hansgrohe",      to:"TotalEnergies",          year:2022, fee:0},
  {player:"Egan Bernal",       from:"Androni Giocattoli",  to:"Team Sky",               year:2018, fee:0.5},
  {player:"Primož Roglič",     from:"Jumbo-Visma",         to:"Bora-hansgrohe",         year:2024, fee:0},
  {player:"Mark Cavendish",    from:"Bahrain Victorious",  to:"Quick-Step",             year:2021, fee:0},
  {player:"Tom Pidcock",       from:"Trinity Racing",      to:"INEOS Grenadiers",       year:2021, fee:0.3},
  {player:"Mathieu van der Poel", from:"Corendon-Circus", to:"Alpecin-Fenix",          year:2019, fee:0},
  {player:"Wout van Aert",     from:"Vérandas Willems",    to:"Jumbo-Visma",            year:2019, fee:0},
  {player:"Vincenzo Nibali",   from:"Astana",              to:"Bahrain-Merida",         year:2017, fee:3},
  {player:"Alberto Contador",  from:"Astana",              to:"Saxo Bank",              year:2011, fee:0},
  {player:"Jonas Vingegaard",  from:"ColoQuick",           to:"Jumbo-Visma",            year:2019, fee:0.1},
  {player:"Nairo Quintana",    from:"Movistar",            to:"Arkéa-Samsic",           year:2020, fee:0},
  {player:"Fernando Gaviria",  from:"Quick-Step",          to:"UAE Team Emirates",      year:2019, fee:2},
];

// ── LISTA QUIZ CATEGORIE ────────────────────────────────────────────────
const LISTA_CATEGORIES = [
  { id:1, title:"Vincitori Tour de France dal 2000", desc:"Chi ha vinto la Grande Boucle?",
    answers:["Armstrong","Armstrong","Armstrong","Armstrong","Armstrong","Pereiro","Sastre","Contador","Schleck","Evans","Wiggins","Froome","Nibali","Froome","Froome","Froome","Thomas","Bernal","Pogacar","Pogacar","Vingegaard","Vingegaard","Pogacar","Pogacar"],
    unique:["Pereiro","Sastre","Contador","Schleck","Evans","Wiggins","Froome","Nibali","Thomas","Bernal","Pogacar","Vingegaard"] },
  { id:2, title:"Vincitori Giro d'Italia dal 2000", desc:"Tutti i vincitori della Corsa Rosa",
    answers:["Garzelli","Simoni","Savoldelli","Simoni","Cunego","Savoldelli","Basso","Di Luca","Contador","Menchov","Basso","Contador","Hesjedal","Nibali","Quintana","Contador","Nibali","Dumoulin","Froome","Carapaz","Hart","Bernal","Hindley","Roglic","Pogacar","Tiberi"],
    unique:["Garzelli","Simoni","Savoldelli","Cunego","Basso","Di Luca","Contador","Menchov","Hesjedal","Nibali","Quintana","Dumoulin","Froome","Carapaz","Hart","Bernal","Hindley","Roglic","Pogacar","Tiberi"] },
  { id:3, title:"Vincitori Vuelta a España dal 2005", desc:"I re della corsa spagnola",
    answers:["Heras","Vinokourov","Contador","Contador","Valverde","Nibali","Cobo","Contador","Horner","Contador","Aru","Quintana","Froome","Yates","Roglic","Roglic","Roglic","Evenepoel","Kuss","Roglic"],
    unique:["Heras","Vinokourov","Contador","Valverde","Nibali","Cobo","Horner","Aru","Quintana","Froome","Yates","Roglic","Evenepoel","Kuss"] },
  { id:4, title:"Vincitori Milano-Sanremo dal 2000", desc:"La Classicissima di Primavera",
    answers:["Tchmil","Freire","Cipollini","Bettini","Freire","Pozzato","Sanchez","Freire","Bennati","Cavendish","Freire","Goss","Gerrans","Ciolek","Kristoff","Degenkolb","Nibali","Kwiatkowski","Nibali","Alaphilippe","Van Aert","Stuyven","Mohoric","Pogacar","Pogacar","Pogacar"],
    unique:["Tchmil","Freire","Cipollini","Bettini","Pozzato","Sanchez","Bennati","Cavendish","Goss","Gerrans","Ciolek","Kristoff","Degenkolb","Nibali","Kwiatkowski","Alaphilippe","Van Aert","Stuyven","Mohoric","Pogacar"] },
  { id:5, title:"5 Classiche Monumento", desc:"Nomina le 5 Monumento del ciclismo",
    answers:["Milano-Sanremo","Giro delle Fiandre","Parigi-Roubaix","Liegi-Bastogne-Liegi","Giro di Lombardia"] },
  { id:6, title:"Maglie del Tour de France", desc:"Nomina i 4 colori/maglie",
    answers:["Gialla","Verde","Pois","Bianca"],
    unique:["Gialla","Verde","Pois","Bianca"] },
  { id:7, title:"Vincitori Parigi-Roubaix dal 2005", desc:"I re dell'Inferno del Nord",
    answers:["Boonen","Cancellara","Ballan","Boonen","Cancellara","Cancellara","Van Summeren","Boonen","Cancellara","Terpstra","Degenkolb","Hayman","Van Avermaet","Sagan","Gilbert","Van der Poel","Colbrelli","Van Aert","Van der Poel","Laporte"],
    unique:["Boonen","Cancellara","Ballan","Van Summeren","Terpstra","Degenkolb","Hayman","Van Avermaet","Sagan","Gilbert","Van der Poel","Colbrelli","Van Aert","Laporte"] },
  { id:8, title:"Campioni del Mondo su strada dal 2000", desc:"Tutti gli iridati",
    answers:["Vainsteins","Freire","Cipollini","Astarloa","Freire","Boonen","Bettini","Bettini","Ballan","Evans","Hushovd","Cavendish","Gilbert","Sagan","Costa","Kwiatkowski","Sagan","Sagan","Sagan","Valverde","Pedersen","Alaphilippe","Alaphilippe","Evenepoel","Van der Poel","Pogacar"],
    unique:["Vainsteins","Freire","Cipollini","Astarloa","Boonen","Bettini","Ballan","Evans","Hushovd","Cavendish","Gilbert","Costa","Kwiatkowski","Sagan","Valverde","Pedersen","Alaphilippe","Evenepoel","Van der Poel","Pogacar"] },
  { id:9, title:"Italiani vincitori Giro d'Italia (dopoguerra)", desc:"I campioni italiani della Corsa Rosa",
    answers:["Coppi","Magni","Bartali","Nencini","Balmamion","Gimondi","Adorni","Moser","Saronni","Pantani","Simoni","Cunego","Di Luca","Basso","Nibali"],
    unique:["Coppi","Magni","Bartali","Nencini","Balmamion","Gimondi","Adorni","Moser","Saronni","Pantani","Simoni","Cunego","Di Luca","Basso","Nibali"] },
  { id:10, title:"Top 10 ciclisti più vittorie di tappa al Tour", desc:"All-time, chi ha vinto di più?",
    answers:["Merckx","Cavendish","Hinault","Leducq","Zabel","Kittel","Sagan","Cipollini","Darrigade","Greipel"] },
  { id:11, title:"Vincitori Giro delle Fiandre dal 2005", desc:"I re del Fiandre",
    answers:["Boonen","Boonen","Ballan","Devolder","Devolder","Cancellara","Nuyens","Boonen","Cancellara","Terpstra","Kristoff","Sagan","Gilbert","Terpstra","Bettiol","Van der Poel","Asgreen","Van der Poel","Van der Poel","Pedersen"],
    unique:["Boonen","Ballan","Devolder","Cancellara","Nuyens","Terpstra","Kristoff","Sagan","Gilbert","Bettiol","Van der Poel","Asgreen","Pedersen"] },
  { id:12, title:"Specialità ciclismo su strada", desc:"Tutte le specialità dei corridori",
    answers:["Scalatore","Velocista","Passista","Cronoman","Classiche","Puncher","Baroudeur","Gregario"] },
];

// Pool size per lista
const LISTA_POOL = LISTA_CATEGORIES.length;

// ── HELPERS ─────────────────────────────────────────────────────────────
function seedRandom(s){let x=s;return()=>{x=(x*1664525+1013904223)&0xffffffff;return(x>>>0)/0xffffffff;};}
function todaySeed(){const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}
function seedForDaysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}
function dateForDaysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.toLocaleDateString("it-IT",{day:"numeric",month:"long"});}
function archiveNum(poolSize){return poolSize;}
function daysAgoForNum(num,poolSize){return poolSize-num;}
function seedForNum(num,poolSize){return seedForDaysAgo(daysAgoForNum(num,poolSize));}
function shuffle(arr,rng){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function normStr(s){return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
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

// ── STORAGE HELPERS ─────────────────────────────────────────────────────
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
    const sk="uc_streak";
    const raw=_get(sk);
    const streak=raw?JSON.parse(raw):{count:0,lastDate:""};
    const today=todayKey();
    if(streak.lastDate===today)return;
    const yest=(()=>{const d=new Date();d.setDate(d.getDate()-1);return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;})();
    const newCount=streak.lastDate===yest?streak.count+1:1;
    _set(sk,JSON.stringify({count:newCount,lastDate:today}));
  }catch(e){}
}
function loadResult(gameKey){
  try{const k=`uc_${gameKey}_${todayKey()}`;const r=_get(k);return r?JSON.parse(r):null;}catch(e){return null;}
}
function loadStreak(){
  try{const r=_get("uc_streak");return r?JSON.parse(r):{count:0,lastDate:""};}catch(e){return{count:0,lastDate:""};}
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
const US={black:"#111",orange:"#f5e000",bg:"#f4f4f4",border:"#e2e2e2",muted:"#888",green:"#16a34a",greenL:"#dcfce7",red:"#dc2626",redL:"#fee2e2",yellow:"#d97706"};
const T={
  app:{minHeight:"100vh",background:US.bg,fontFamily:"'Helvetica Neue',Arial,sans-serif",animation:"fadeSlideIn 0.35s ease forwards"},
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
  return(<button onClick={share} style={{...T.sb,display:"flex",alignItems:"center",gap:"6px",justifyContent:"center",width:"100%",marginTop:"8px",background:copied?US.greenL:"#fff",borderColor:copied?US.green:"#333",color:copied?US.green:US.black}}>
    {copied?"✓ Copiato!":"📤 Condividi risultato"}
  </button>);
}

function DoneScreen({gameKey,day,isToday,onHome,onArchive,children}){
  const saved=isToday?loadResult(gameKey):null;
  if(saved)return(
    <div style={{...T.body,textAlign:"center",paddingTop:"32px"}}>
      <div style={{fontSize:"11px",color:US.muted,marginBottom:"4px",letterSpacing:"1px",textTransform:"uppercase"}}>Hai già giocato oggi</div>
      {children(saved)}
      {isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
      <button onClick={onHome} style={{...T.pb,marginTop:"8px",width:"100%"}}>Home</button>
    </div>
  );
  return null;
}

function Hdr({title,sub,onHome,archiveNav}){
  return(
    <div style={T.hdr}>
      <div style={{flex:1,minWidth:0}}>
        <div style={T.ey}>Universo Sportivo</div>
        <div style={T.ht}>{title}</div>
        {sub&&<div style={{fontSize:"9px",color:"#777",marginTop:"1px"}}>{sub}</div>}
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
const POOL_SIZES={ciclodle:DB.length,wordle:DB.length,hangman:DB.length,valore2:DB.length,carriera:CAREERS.length,rosa:ROSE_LIST.length,lista:LISTA_POOL,transfer:TRANSFERS.length};

const PAGE_SIZE=10;
function ArchiveWrapper({gameKey,children}){
  const poolSize=POOL_SIZES[gameKey]||DB.length;
  const todayN=poolSize;
  const[num,setNum]=useState(Math.max(1,todayN-1));
  const[page,setPage]=useState(0);
  const SEED_OFFSET={ciclodle:0,wordle:100001,hangman:200002,valore2:300011,carriera:0,rosa:0,lista:0,transfer:0};
  const seed=seedForNum(num,poolSize)+(SEED_OFFSET[gameKey]||0);
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
              style={{flexShrink:0,background:num===n?"#2a2200":"#222",border:`1.5px solid ${num===n?US.orange:"#333"}`,
                borderRadius:"6px",padding:"4px 8px",cursor:"pointer",textAlign:"center",minWidth:"46px"}}>
              <div style={{fontSize:"10px",fontWeight:"700",color:num===n?US.orange:"#ccc"}}>#{n}</div>
              <div style={{fontSize:"7px",color:num===n?US.orange:"#555",marginTop:"1px"}}>{dayToDate(n,poolSize)}</div>
            </div>
          ))}
        </div>
        {hasNewer&&<button onClick={()=>setPage(p=>Math.max(0,p-1))} style={{...T.bk,padding:"4px 7px",fontSize:"10px",flexShrink:0}}>▶</button>}
      </div>
    </div>
  );

  return children({day:num,seed,isToday,archiveNav,chipBar});
}

// ── CICLODLE ────────────────────────────────────────────────────────────
const COLS=[{key:"role",label:"Spec."},{key:"nation",label:"Naz."},{key:"continent",label:"Cont."},{key:"club",label:"Team"},{key:"age",label:"Età"},{key:"value",label:"Val."}];
const CLR={green:{bg:US.green,tx:"#fff"},yellow:{bg:US.yellow,tx:"#fff"},red:{bg:US.red,tx:"#fff"},empty:{bg:"#fff",tx:"#ccc"},active:{bg:"#fffbea",tx:"#bbb"}};
function eC(k,g,t){if(k==="age"){const d=Math.abs(g-t);return d===0?"green":d<=3?"yellow":"red";}if(k==="value"){const d=Math.abs(g-t);return d===0?"green":d<=15?"yellow":"red";}return g===t?"green":"red";}
function aD(k,g,t){if(k!=="age"&&k!=="value")return null;return g===t?null:g<t?"▲":"▼";}

function CiclodleGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const dailyPool=useMemo(()=>shuffle([...DB],seedRandom(seed)),[seed]);
  const target=useMemo(()=>dailyPool[0],[dailyPool]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("ciclodle"):null;
  const[G,sG]=useState([]);const[inp,sI]=useState("");const[sg,sSg]=useState([]);const[ov,sO]=useState(false);const[won,sW]=useState(false);const[mo,sMo]=useState(false);const[animRows,setAnimRows]=useState(new Set());
  useEffect(()=>{sG([]);sI("");sSg([]);sO(false);sW(false);sMo(false);setAnimRows(new Set());},[seed]);
  function normSearch(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
  function onI(v){sI(v);if(v.length<2){sSg([]);return;}const q=normSearch(v);const avail=DB.filter(p=>!G.find(x=>x.name===p.name));const bySurname=avail.filter(p=>normSearch(p.surname).includes(q));const byName=avail.filter(p=>normSearch(p.name).includes(q)&&!bySurname.includes(p));sSg([...bySurname,...byName].slice(0,8));}
  function sub(p){
    if(ov)return;
    const ri=G.length;
    const ng=[...G,p];const w=p.name===target.name,o=ng.length>=6;
    sG(ng);sI("");sSg([]);
    setTimeout(()=>setAnimRows(s=>new Set([...s,ri])),50);
    if(w){sW(true);sO(true);if(isToday)saveResult("ciclodle",{won:true,attempts:ng.length});setTimeout(()=>sMo(true),COLS.length*120+600);}
    else if(o){sO(true);if(isToday)saveResult("ciclodle",{won:false,attempts:6});setTimeout(()=>sMo(true),COLS.length*120+600);}
  }
  function FlipCell({value,arrow,color,colIdx,rowIdx}){
    const flipped=animRows.has(rowIdx);
    const delay=colIdx*150;
    const bg=CLR[color]?.bg||"#e0e0e0";
    return(
      <div style={{flex:1,minWidth:0,height:"38px",perspective:"400px"}}>
        <div style={{position:"relative",width:"100%",height:"100%",transformStyle:"preserve-3d",transition:`transform 0.7s ease ${delay}ms`,transform:flipped?"rotateX(180deg)":"rotateX(0deg)"}}>
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",background:"#e8e8e8",borderRadius:"3px",display:"flex",alignItems:"center",justifyContent:"center"}}/>
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateX(180deg)",background:bg,borderRadius:"3px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
            <span style={{fontWeight:"700",fontSize:"8px",color:"#fff",lineHeight:1.2,textAlign:"center",padding:"0 2px"}}>{value}</span>
            {arrow&&<span style={{fontSize:"7px",color:"rgba(255,255,255,0.85)"}}>{arrow}</span>}
          </div>
        </div>
      </div>
    );
  }
  if(savedToday)return(<div style={T.app}><Hdr title="Ciclodle" sub={`🗓 Giornaliero · #${day}`} onHome={onHome}/><DoneScreen gameKey="ciclodle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.won?`Trovato in ${s.attempts}/6`:"Non trovato"}</div>
    <div style={{fontSize:"11px",color:US.muted,marginBottom:"12px"}}>{target.name}</div>
    <ShareButton text={`🚴 Ciclodle #${day}\n${s.won?"Trovato in "+s.attempts+"/6":"Non trovato"}\nuniverso-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={T.app}><Hdr title="Ciclodle" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={T.body}>
      {!ov&&<div style={{marginBottom:"14px"}}>
        <span style={T.lb}>Inserisci un corridore ({G.length}/6)</span>
        <div style={{position:"relative"}}>
          <input style={{...T.ip,width:"100%"}} value={inp} onChange={e=>onI(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&sg.length)sub(sg[0]);}} placeholder="Cerca corridore..." autoFocus/>
          {sg.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #e0e0e0",borderRadius:"2px",zIndex:10,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",marginTop:"2px"}}>
            {sg.map((p,i)=><div key={i} onClick={()=>sub(p)} style={{padding:"7px 11px",cursor:"pointer",fontSize:"12px",borderBottom:"1px solid #f5f5f5",display:"flex",justifyContent:"space-between"}} onMouseEnter={e=>e.currentTarget.style.background="#f8f8f6"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
              <span>{p.name}</span><span style={{color:"#bbb",fontSize:"10px"}}>{p.club}</span>
            </div>)}
          </div>}
        </div>
      </div>}
      {ov&&<div style={{marginBottom:"12px",padding:"9px 12px",background:won?US.greenL:US.redL,borderRadius:"6px",textAlign:"center",fontSize:"12px",fontWeight:"700",color:won?US.green:US.red}}>{won?`✓ Trovato in ${G.length}/6`:`✗ Era ${target.name}`}</div>}
      <div style={{display:"flex",gap:"10px",marginBottom:"10px"}}>{[[US.green,"Esatto"],[US.yellow,"Vicino"],[US.red,"Sbagliato"]].map(([c,l])=><div key={c} style={{display:"flex",alignItems:"center",gap:"3px",fontSize:"9px",color:"#999"}}><div style={{width:"8px",height:"8px",borderRadius:"2px",background:c}}/>{l}</div>)}</div>
      <div style={{width:"100%"}}>
        <div style={{display:"flex",gap:"3px",marginBottom:"4px",paddingLeft:"52px"}}>{COLS.map(c=><div key={c.key} style={{flex:1,fontSize:"7px",letterSpacing:"1px",textTransform:"uppercase",color:"#bbb",textAlign:"center"}}>{c.label}</div>)}</div>
        {G.map((g,ri)=>(
          <div key={ri} style={{display:"flex",gap:"3px",alignItems:"center",marginBottom:"3px"}}>
            <div style={{width:"50px",fontSize:"8px",color:"#555",textAlign:"right",paddingRight:"5px",flexShrink:0,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{g.name.split(" ").pop()}</div>
            {COLS.map((c,ci)=>{
              const cl=eC(c.key,g[c.key],target[c.key]);
              const ar=aD(c.key,g[c.key],target[c.key]);
              const val=`${g[c.key]}${c.key==="value"?"M":""}`;
              return<FlipCell key={c.key} value={val} arrow={ar} color={cl} colIdx={ci} rowIdx={ri}/>;
            })}
          </div>
        ))}
      </div>
    </div>
    {mo&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}} onClick={()=>sMo(false)}><div style={{background:"#fff",borderRadius:"4px",maxWidth:"280px",width:"100%",overflow:"hidden"}} onClick={e=>e.stopPropagation()}><div style={{background:US.black,color:"#fff",padding:"11px 16px"}}><div style={{fontSize:"8px",color:"#888",marginBottom:"2px"}}>{won?`Trovato in ${G.length}`:"Game Over"}</div><div style={{fontSize:"16px"}}>{won?"Complimenti!":"Era..."}</div></div><div style={{padding:"12px 16px"}}><div style={{border:"1.5px solid #e8e8e8",borderRadius:"2px",padding:"9px",marginBottom:"9px"}}><div style={{fontWeight:"700",marginBottom:"3px"}}>{target.name}</div>{[["Team",target.club],["Nazione",target.nation],["Valore",`€${target.value}M`]].map(([k,v])=><div key={k} style={{fontSize:"11px",color:"#777"}}><strong>{k}:</strong> {v}</div>)}</div><button onClick={()=>sMo(false)} style={{...T.pb,width:"100%"}}>Chiudi</button>
              <ShareButton text={`🚴 Ciclodle #${day}\n${won?"Trovato in "+G.length+"/6":"Non trovato"}\n${G.map((_,i)=>won&&i===G.length-1?"🟩":"🟥").join("")}\nuniverso-ciclismo.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
              {!isToday&&<button onClick={()=>{sG([]);sI("");sSg([]);sO(false);sW(false);sMo(false);setAnimRows(new Set());}} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>🔀 Rigioca</button>}</div></div></div>}
  </div>);
}
function Ciclodle({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB.length,s=todaySeed();return<CiclodleGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="ciclodle">{({day,seed,isToday,archiveNav,chipBar})=><CiclodleGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── WORDLE COGNOME ───────────────────────────────────────────────────────
function WordleGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const ROUNDS=5,MAX_ATT=6;
  const pool=useMemo(()=>{const daily=shuffle([...DB],seedRandom(seed));return daily.filter(p=>normStr(p.surname).length>=4&&normStr(p.surname).length<=8).slice(1);},[seed]);
  const player=pool[0];
  const word=normStr(player.surname);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("wordle"):null;
  const[attempts,setAttempts]=useState([]);
  const[current,setCurrent]=useState("");
  const[status,setStatus]=useState("playing");
  useEffect(()=>{setAttempts([]);setCurrent("");setStatus("playing");},[seed]);

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
    if(ev.every(x=>x.s==="green")){setStatus("won");if(isToday)saveResult("wordle",{won:true,attempts:newAttempts.length,word});}
    else if(newAttempts.length>=MAX_ATT){setStatus("lost");if(isToday)saveResult("wordle",{won:false,attempts:MAX_ATT,word});}
  }

  const used={};
  attempts.flat().forEach(({c,s})=>{if(!used[c]||used[c]==="gray"||(used[c]==="yellow"&&s==="green"))used[c]=s;});
  const colBg={green:US.green,yellow:US.yellow,gray:"#9ca3af"};

  const[hint,setHint]=useState(false);
  if(savedToday)return(<div style={T.app}><Hdr title="Wordle Cognome" sub={`🗓 Giornaliero · #${day}`} onHome={onHome}/><DoneScreen gameKey="wordle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.won?`Trovato in ${s.attempts}/6`:"Non trovato"}</div>
    <div style={{fontSize:"11px",color:US.muted,marginBottom:"12px"}}>{word}</div>
    <ShareButton text={`🔤 Wordle Ciclismo #${day}\n${s.won?"Trovato in "+s.attempts+"/6":"Non trovato"}\n${word}\nuniverso-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={T.app}><Hdr title="Wordle Cognome" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"400px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <span style={{fontSize:"11px",color:"#aaa"}}>{word.length} lettere</span>
        <button onClick={()=>setHint(h=>!h)} style={{background:"none",border:`1px solid ${hint?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:hint?US.yellow:"#aaa",cursor:"pointer",fontFamily:"inherit"}}>💡 {hint?"Nascondi":"Indizio"}</button>
      </div>
      {hint&&<div style={{fontSize:"10px",color:"#777",marginBottom:"10px",padding:"6px 10px",background:"#fffbea",border:"1px solid #fde68a",borderRadius:"4px"}}>{player.nation} · {player.role} · {player.club}</div>}
      <div style={{display:"flex",flexDirection:"column",gap:"5px",marginBottom:"16px",alignItems:"center"}}>
        {Array.from({length:MAX_ATT}).map((_,ri)=>{
          const att=attempts[ri];
          const isActive=ri===attempts.length&&status==="playing";
          const disp=isActive?normStr(current).padEnd(word.length," ").slice(0,word.length).split(""):Array(word.length).fill(" ");
          return(<div key={ri} style={{display:"flex",gap:"5px"}}>
            {Array.from({length:word.length}).map((_,ci)=>{
              const filled=att?att[ci]:null;
              const bg=filled?(colBg[filled.s]||"#e0e0e0"):isActive&&disp[ci].trim()?"#fff":"#e0e0e0";
              const bd=filled?"transparent":isActive&&disp[ci].trim()?`2px solid ${US.black}`:"2px solid #d0d0d0";
              if(filled){
                return(<div key={ci} className="flip-cell" style={{width:"42px",height:"42px"}}>
                  <div className={`flip-inner flipped`} style={{transitionDelay:`${ci*130}ms`}}>
                    <div className="flip-back" style={{background:colBg[filled.s]||"#e0e0e0",color:"#fff",fontSize:"16px"}}>{filled.c}</div>
                  </div>
                </div>);
              }
              return(<div key={ci} style={{width:"42px",height:"42px",borderRadius:"3px",background:bg,border:bd,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"700",color:US.black}}>{isActive?disp[ci].trim():""}</div>);
            })}
          </div>);
        })}
      </div>
      {status==="playing"&&<div>
        <input value={current} onChange={e=>{const v=e.target.value.toUpperCase().replace(/[^A-Z]/g,"").slice(0,word.length);setCurrent(v);}} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();submit();}}} placeholder={`${word.length} lettere...`} style={{...T.ip,width:"100%",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"3px",textAlign:"center",fontSize:"16px"}} autoFocus/>
        <button onClick={submit} disabled={normStr(current).length!==word.length} style={{...T.pb,width:"100%",opacity:normStr(current).length===word.length?1:0.4}}>Invio</button>
        <div style={{marginTop:"12px"}}>{[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]].map((row,ri)=><div key={ri} style={{display:"flex",justifyContent:"center",gap:"3px",marginBottom:"3px"}}>{row.map(k=>{const st=used[k];return<button key={k} onClick={()=>setCurrent(c=>(c.length<word.length?c+k:c))} style={{background:st?(colBg[st]||"#9ca3af"):"#e0e0e0",color:st?"#fff":"#333",border:"none",borderRadius:"3px",padding:"8px 5px",minWidth:"26px",fontSize:"10px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"}}>{k}</button>;})} </div>)}</div>
      </div>}
      {(status==="won"||status==="lost")&&<div style={{textAlign:"center",padding:"14px",background:status==="won"?US.greenL:US.redL,borderRadius:"6px",color:status==="won"?US.green:US.red}}>
        <div style={{fontSize:"14px",fontWeight:"700",marginBottom:"4px"}}>{status==="won"?"Corretto!":"Era..."}</div>
        <div style={{fontSize:"18px",fontWeight:"700",letterSpacing:"3px"}}>{word}</div>
        <div style={{fontSize:"11px",marginTop:"2px",color:"#666"}}>{player.name} · {player.club}</div>
        <ShareButton text={`🔤 Wordle Ciclismo #${day} — ${word}\n${attempts.map(a=>a.map(x=>x.s==="green"?"🟩":x.s==="yellow"?"🟨":"⬛").join("")).join("\n")}\nuniverso-ciclismo.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
        {!isToday&&<button onClick={()=>{setAttempts([]);setCurrent("");setStatus("playing");}} style={{...T.sb,marginTop:"10px",color:US.black}}>🔀 Rigioca</button>}
      </div>}
    </div>
  </div>);
}
function WordleCognome({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB.length,s=todaySeed()+100001;return<WordleGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="wordle">{({day,seed,isToday,archiveNav,chipBar})=><WordleGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── IMPICCATO ─────────────────────────────────────────────────────────
function HangmanGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const M=7;
  const pool=useMemo(()=>{const daily=shuffle([...DB],seedRandom(seed));return daily.filter(p=>normStr(p.surname).length>=4).slice(2);},[seed]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("hangman"):null;
  const[gu,sGu]=useState(new Set());const[st,sSt]=useState("p");
  useEffect(()=>{sGu(new Set());sSt("p");},[seed]);
  const pl=pool[0],wd=normStr(pl.surname),wr=[...gu].filter(c=>!wd.includes(c)),wc=wr.length,rv=wd.split("").every(c=>gu.has(c));
  useEffect(()=>{if(rv&&st==="p"){sSt("w");if(isToday)saveResult("hangman",{won:true,word:wd});}else if(wc>=M&&st==="p"){sSt("l");if(isToday)saveResult("hangman",{won:false,word:wd});}},[gu]);
  function g(c){if(st!=="p"||gu.has(c))return;sGu(x=>new Set([...x,c]));}
  const bodyParts=[<circle key="h" cx="50" cy="19" r="8" stroke="#333" strokeWidth="2.5" fill="none"/>,<line key="b" x1="50" y1="27" x2="50" y2="58" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="la" x1="50" y1="37" x2="35" y2="49" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="ra" x1="50" y1="37" x2="65" y2="49" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="ll" x1="50" y1="58" x2="37" y2="75" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="rl" x1="50" y1="58" x2="63" y2="75" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="rp" x1="50" y1="6" x2="50" y2="11" stroke="#333" strokeWidth="2.5"/>];

  const[hint,setHint]=useState(false);
  if(savedToday)return(<div style={T.app}><Hdr title="Impiccato" sub={`🗓 Giornaliero · #${day}`} onHome={onHome}/><DoneScreen gameKey="hangman" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.won?"Trovato!":"Non trovato"}</div>
    <div style={{fontSize:"11px",color:US.muted,marginBottom:"12px"}}>{s.word}</div>
    <ShareButton text={`🪢 Impiccato Ciclismo #${day}\n${s.won?"Trovato":"Non trovato"}: ${s.word}\nuniverso-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={T.app}><Hdr title="Impiccato" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"400px"}}>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"6px"}}>
        <button onClick={()=>setHint(h=>!h)} style={{background:"none",border:`1px solid ${hint?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:hint?US.yellow:"#aaa",cursor:"pointer",fontFamily:"inherit"}}>💡 {hint?"Nascondi":"Indizio"}</button>
      </div>
      {hint&&<div style={{fontSize:"10px",color:"#777",marginBottom:"6px",padding:"6px 10px",background:"#fffbea",border:"1px solid #fde68a",borderRadius:"4px"}}>{pl.nation} · {pl.role} · {pl.age} anni</div>}
      <div style={{display:"flex",justifyContent:"center",marginBottom:"8px"}}><svg width="100" height="88" viewBox="0 0 100 88"><line x1="12" y1="84" x2="88" y2="84" stroke="#ddd" strokeWidth="2"/><line x1="24" y1="84" x2="24" y2="6" stroke="#ddd" strokeWidth="2"/><line x1="24" y1="6" x2="50" y2="6" stroke="#ddd" strokeWidth="2"/>{bodyParts.slice(0,wc)}</svg></div>
      <div style={{display:"flex",justifyContent:"center",gap:"4px",marginBottom:"14px",flexWrap:"wrap"}}>{wd.split("").map((c,i)=><div key={i} style={{width:"28px",height:"36px",borderBottom:`2.5px solid ${st==="l"&&!gu.has(c)?US.red:US.black}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",fontWeight:"700",color:st==="l"&&!gu.has(c)?US.red:US.black}}>{gu.has(c)||st==="l"?c:""}</div>)}</div>
      <div style={{textAlign:"center",marginBottom:"10px",fontSize:"10px",color:"#999"}}>Errori: <strong style={{color:wc>=5?US.red:"#333"}}>{wc}/{M}</strong></div>
      {st==="p"&&<div>{[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]].map((row,ri)=><div key={ri} style={{display:"flex",justifyContent:"center",gap:"2px",marginBottom:"2px"}}>{row.map(k=>{const u=gu.has(k),cr=wd.includes(k)&&u,wr2=!wd.includes(k)&&u;return<button key={k} onClick={()=>g(k)} disabled={u} style={{background:cr?US.green:wr2?US.red:u?"#ccc":"#e8e8e8",color:u?"#fff":"#333",border:"none",borderRadius:"3px",padding:"7px 4px",minWidth:"24px",fontSize:"10px",fontWeight:"600",cursor:u?"default":"pointer",fontFamily:"inherit",opacity:u?0.7:1}}>{k}</button>;})} </div>)}</div>}
      {(st==="w"||st==="l")&&<div style={{textAlign:"center",marginTop:"10px"}}><div style={{padding:"9px",borderRadius:"2px",background:st==="w"?US.greenL:US.redL,color:st==="w"?US.green:US.red,fontSize:"13px",fontWeight:"700",marginBottom:"8px"}}>{st==="w"?"🎉 Trovato!":"💀 Non trovato — "+wd}</div><ShareButton text={`🪢 Impiccato Ciclismo #${day} — ${st==="w"?"Trovato":"Non trovato"} (${wc}/${M} errori)\n${wd}\nuniverso-ciclismo.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}<button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button></div>}
    </div>
  </div>);
}
function Hangman({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB.length,s=todaySeed()+200002;return<HangmanGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="hangman">{({day,seed,isToday,archiveNav,chipBar})=><HangmanGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── CHI VALE DI PIÙ ──────────────────────────────────────────────────────
function ValoreGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const pairs=useMemo(()=>{const rng=seedRandom(seed+300011);const sh=shuffle(DB,rng),p=[];for(let i=0;i<sh.length-1;i+=2)if(sh[i].value!==sh[i+1].value)p.push([sh[i],sh[i+1]]);return p;},[seed]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("valore2"):null;
  const RR=Math.min(3,pairs.length);
  const[rn,sRn]=useState(0);const[sc,sSc]=useState(0);const[ch,sCh]=useState(null);const[dn,sDn]=useState(false);const[str,sStr]=useState(0);const[best,sBest]=useState(0);
  useEffect(()=>{sRn(0);sSc(0);sCh(null);sDn(false);sStr(0);sBest(0);},[seed]);
  if(savedToday&&isToday)return(<div style={T.app}><Hdr title="Chi Vale di Più?" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="valore2" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>{s.score===s.total?"🏆":s.score>0?"👍":"😔"}</div><div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.score}/{s.total} corretti</div><ShareButton text={`🆚 Chi Vale di Più? Ciclismo #${day}\n${s.score}/${s.total} corretti\nuniverso-ciclismo.vercel.app`}/></>}</DoneScreen></div>);
  if(!pairs.length||dn)return(<div style={T.app}><Hdr title="Chi Vale di Più?" onHome={onHome}/><div style={{...T.body,textAlign:"center",paddingTop:"40px"}}><div style={{fontSize:"48px",fontWeight:"300",color:US.black}}>{sc}<span style={{fontSize:"18px"}}> / {RR}</span></div><div style={{fontSize:"12px",color:"#888",marginBottom:"3px"}}>risposte corrette</div><div style={{fontSize:"11px",color:"#aaa",marginBottom:"18px"}}>Serie migliore: {best}</div><ShareButton text={`🆚 Chi Vale di Più? Ciclismo #${day}\n${sc}/${RR} corretti\nuniverso-ciclismo.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}<button onClick={onHome} style={T.pb}>Home</button></div></div>);
  const[a,b]=pairs[rn],cor=a.value>b.value?a:b;
  function choose(p){if(ch)return;sCh(p);const ok=p.name===cor.name;if(ok){sSc(x=>x+1);const ns=str+1;sStr(ns);sBest(x=>Math.max(x,ns));}else sStr(0);setTimeout(()=>{sCh(null);const nr=rn+1;if(nr>=RR){if(isToday)saveResult("valore2",{score:sc+(ok?1:0),total:RR});sDn(true);}else sRn(nr);},1500);}
  return(<div style={T.app}><Hdr title="Chi Vale di Più?" sub={`${label} · #${day} · ${rn+1}/${RR}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"480px"}}>
      <div style={{height:"3px",background:"#e0e0e0",borderRadius:"2px",marginBottom:"16px",overflow:"hidden"}}><div style={{height:"100%",width:`${(rn/RR*100).toFixed(0)}%`,background:US.green,transition:"width 0.3s"}}/></div>
      <div style={{fontSize:"11px",color:"#aaa",textAlign:"center",marginBottom:"12px"}}>Chi ha il valore di mercato più alto?</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>{[a,b].map(p=>{let brd="1.5px solid #e0e0e0",bg="#fff";if(ch){if(p.name===cor.name){brd="2px solid "+US.green;bg=US.greenL;}else if(p.name===ch.name){brd="2px solid "+US.red;bg=US.redL;}}return(<button key={p.name} onClick={()=>choose(p)} style={{background:bg,border:brd,borderRadius:"6px",padding:"14px 10px",cursor:ch?"default":"pointer",textAlign:"center",transition:"all 0.2s",fontFamily:"inherit"}} onMouseEnter={e=>{if(!ch){e.currentTarget.style.borderColor=US.orange;e.currentTarget.style.background="#fffbea";}}} onMouseLeave={e=>{if(!ch){e.currentTarget.style.borderColor="#e0e0e0";e.currentTarget.style.background=bg;}}}><div style={{fontSize:"14px",fontWeight:"700",marginBottom:"3px"}}>{p.name}</div><div style={{fontSize:"10px",color:"#888",marginBottom:"1px"}}>{p.club}</div><div style={{fontSize:"10px",color:"#aaa",marginBottom:"7px"}}>{p.role}</div>{ch?<div style={{fontSize:"17px",fontWeight:"700",color:p.name===cor.name?US.green:US.red}}>€{p.value}M</div>:<div style={{fontSize:"20px",color:"#ddd"}}>?</div>}</button>);})}</div>
      {ch&&<div style={{textAlign:"center",marginTop:"10px",fontSize:"11px",color:ch.name===cor.name?US.green:US.red,fontStyle:"italic"}}>{ch.name===cor.name?"Corretto!":"Sbagliato"} — {cor.name} vale €{cor.value}M</div>}
    </div>
  </div>);
}
function ChiValeDiPiu({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB.length,s=todaySeed();return<ValoreGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="valore2">{({day,seed,isToday,archiveNav,chipBar})=><ValoreGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── CARRIERA ─────────────────────────────────────────────────────────────
function CarreiraGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const player=CAREERS[seed%CAREERS.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("carriera"):null;
  const maxC=player.clues.length;
  const[rev,sRev]=useState(1);const[gu,sGu]=useState("");const[st,sSt]=useState("p");const[sc,sSc]=useState(0);const[fin,sFin]=useState(false);const[shownNotes,sShownNotes]=useState(new Set());
  useEffect(()=>{sRev(1);sGu("");sSt("p");sSc(0);sFin(false);sShownNotes(new Set());},[seed]);
  const pts=Math.max(1,maxC+1-rev);
  function sub(){
    const g=gu.trim().toLowerCase(),a=player.answer.toLowerCase();
    const ok=g===a||a.split(" ").some(p=>p.length>3&&g===p)||(g.length>4&&a.includes(g));
    if(ok){sSc(x=>x+pts);sSt("c");}
    else{if(rev<maxC){sRev(x=>x+1);sSt("w");setTimeout(()=>sSt("p"),900);}else sSt("r");}
    sGu("");
  }
  if(savedToday&&isToday)return(<div style={T.app}><Hdr title="Indovina la Carriera" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="carriera" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>🏆</div><div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.score} punti</div><ShareButton text={`🏆 Indovina la Carriera Ciclismo #${day}\n${s.score} punti\nuniverso-ciclismo.vercel.app`}/></>}</DoneScreen></div>);
  if(fin)return(<div style={T.app}><Hdr title="Indovina la Carriera" onHome={onHome}/><div style={{...T.body,textAlign:"center",paddingTop:"40px"}}><div style={{fontSize:"48px",fontWeight:"300",color:US.black}}>{sc}</div><div style={{fontSize:"12px",color:"#888",marginBottom:"18px"}}>punti totali</div><ShareButton text={`🏆 Indovina la Carriera Ciclismo #${day}\n${sc} punti\nuniverso-ciclismo.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}<button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button></div></div>);
  return(<div style={T.app}><Hdr title="Indovina la Carriera" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"520px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <div style={{fontSize:"11px",color:"#888"}}>{st==="p"&&<>Vale <strong style={{color:US.black}}>{pts} punt{pts===1?"o":"i"}</strong></>}</div>
        <button onClick={()=>sRev(r=>Math.min(r+1,maxC))} disabled={rev>=maxC||st!=="p"} style={{background:"none",border:`1px solid ${rev<maxC&&st==="p"?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:rev<maxC&&st==="p"?US.yellow:"#bbb",cursor:rev<maxC&&st==="p"?"pointer":"default",fontFamily:"inherit"}}>💡 {rev}/{maxC} {rev<maxC&&st==="p"?"→ Prossimo indizio":"indizi"}</button>
      </div>
      {player.clues.slice(0,rev).map((c,i)=>{
        const noteVisible=shownNotes.has(i);
        return(<div key={i} style={{border:"1.5px solid #e0e0e0",borderLeftWidth:i===rev-1?"3px":"1.5px",borderLeftColor:i===rev-1?US.black:"#e0e0e0",borderRadius:"2px",padding:"9px 11px",marginBottom:"5px",background:i===rev-1?"#fafaf8":"#fff"}}>
          {i===rev-1&&rev>1&&<div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"2px",fontWeight:"700"}}>Nuovo indizio</div>}
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2px"}}><span style={{fontWeight:"700",fontSize:"13px"}}>{c.club}</span><span style={{fontSize:"10px",color:"#aaa"}}>{c.period}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1px"}}>
            <div style={{display:"flex",gap:"10px"}}><span style={{fontSize:"10px",color:"#555"}}><strong>{c.apps}</strong> gare</span><span style={{fontSize:"10px",color:"#555"}}><strong>{c.goals}</strong> vittorie</span></div>
            {!noteVisible&&<button onClick={()=>sShownNotes(s=>new Set([...s,i]))} style={{background:"none",border:"none",color:"#bbb",fontSize:"8px",cursor:"pointer",fontFamily:"inherit",padding:"0",textDecoration:"underline"}}>💡 nota</button>}
          </div>
          {noteVisible&&<div style={{fontSize:"9px",color:"#888",fontStyle:"italic",marginTop:"2px"}}>{c.note}</div>}
        </div>);
      })}
      <div style={{height:"1px",background:"#e8e8e8",margin:"10px 0"}}/>
      {st!=="c"&&st!=="r"&&<><span style={T.lb}>Chi è questo corridore?</span><div style={{display:"flex",gap:"7px"}}><input style={{...T.ip,flex:1,border:`1.5px solid ${st==="w"?US.red:"#ddd"}`}} value={gu} onChange={e=>sGu(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gu.trim()&&sub()} placeholder="Scrivi il nome..." autoFocus/><button onClick={sub} disabled={!gu.trim()} style={{...T.pb,opacity:gu.trim()?1:0.4}}>Indovina</button></div>{st==="w"&&<div style={{fontSize:"10px",color:US.red,marginTop:"4px"}}>✗ Errato — {rev<maxC?"nuovo indizio!":"nessun indizio rimasto"}</div>}<div style={{textAlign:"right",marginTop:"5px"}}><button onClick={()=>sSt("r")} style={{background:"none",border:"none",color:"#bbb",fontSize:"9px",cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Non lo so</button></div></>}
      {st==="c"&&<><div style={{padding:"8px",background:US.greenL,border:"1px solid #bbf7d0",borderRadius:"2px",color:US.green,fontSize:"12px",marginBottom:"9px"}}>✓ Corretto! Era <strong>{player.answer}</strong> — <strong>+{pts} punti</strong></div><div style={{textAlign:"right"}}><button onClick={()=>{if(isToday)saveResult("carriera",{score:sc,done:true});sFin(true);}} style={T.pb}>Risultato →</button></div></>}
      {st==="r"&&<><div style={{padding:"8px",background:"#f8f7f4",border:"1px solid #e0e0e0",borderRadius:"2px",color:"#555",fontSize:"12px",marginBottom:"9px"}}>Era <strong>{player.answer}</strong></div><div style={{textAlign:"right"}}><button onClick={()=>{if(isToday)saveResult("carriera",{score:sc,done:true});sFin(true);}} style={T.pb}>Risultato →</button></div></>}
    </div>
  </div>);
}
function Carriera({onHome,isDaily,onArchive}){
  if(isDaily){const d=CAREERS.length,s=todaySeed();return<CarreiraGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="carriera">{({day,seed,isToday,archiveNav,chipBar})=><CarreiraGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── ROSA QUIZ ─────────────────────────────────────────────────────────────
function TimerRing({seconds,total}){
  const r=32,circ=2*Math.PI*r;
  const color=seconds<=10?US.red:seconds<=20?US.yellow:US.green;
  const frac=Math.min(1,seconds/total);
  return(<svg width="76" height="76" viewBox="0 0 76 76"><circle cx="38" cy="38" r={r} fill="none" stroke="#e0e0e0" strokeWidth="5"/><circle cx="38" cy="38" r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={circ} strokeDashoffset={circ*(1-frac)} strokeLinecap="round" transform="rotate(-90 38 38)" style={{transition:"stroke-dashoffset 1s linear,stroke 0.3s"}}/><text x="38" y="43" textAnchor="middle" fontSize="17" fontWeight="700" fill={color} fontFamily="'Helvetica Neue',Arial,sans-serif">{seconds}</text></svg>);
}

function RosaQuizGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const TOTAL=60;
  const squadra=ROSE_LIST[seed%ROSE_LIST.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("rosa"):null;
  const BONUS=5;
  const[input,setInput]=useState("");const[found,setFound]=useState([]);const[wrong,setWrong]=useState(null);const[seconds,setSeconds]=useState(TOTAL);const[lastFound,setLastFound]=useState(null);const[done,setDone]=useState(false);const[bonusFlash,setBonusFlash]=useState(false);
  const inputRef=useRef(null);const timerRef=useRef(null);
  useEffect(()=>{setInput("");setFound([]);setWrong(null);setSeconds(TOTAL);setLastFound(null);setDone(false);},[seed]);
  useEffect(()=>{
    if(done)return;
    clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>setSeconds(s=>{if(s<=1){clearInterval(timerRef.current);setDone(true);return 0;}return s-1;}),1000);
    setTimeout(()=>inputRef.current?.focus(),100);
    return()=>clearInterval(timerRef.current);
  },[seed,done]);
  useEffect(()=>{if(done&&isToday)saveResult("rosa",{found:found.length,total:squadra.giocatori.length,nome:squadra.nome,foundNames:found,allNames:squadra.giocatori});},[done]);
  function submit(){
    const v=normLow(input);if(!v)return;
    const match=squadra.giocatori.find(p=>fuzzyMatch(input,p)&&!found.includes(p));
    if(match){setFound(f=>[...f,match]);setLastFound(match);setWrong(null);setInput("");setSeconds(s=>s+BONUS);setBonusFlash(true);setTimeout(()=>{setLastFound(null);setBonusFlash(false);},1200);}
    else{setWrong(input);setInput("");setTimeout(()=>setWrong(null),800);}
    inputRef.current?.focus();
  }
  if(savedToday&&isToday)return(<div style={T.app}><Hdr title="Rosa Quiz" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="rosa" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=>{
    const fn=s.foundNames||[];const all=s.allNames||[];const ms=all.filter(p=>!fn.includes(p));
    return (<><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>🚴</div><div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.nome}</div><div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{s.found}/{s.total} trovati ({Math.round(s.found/s.total*100)}%)</div>{fn.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"5px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{fn.map(p=>(<div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}{ms.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"5px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{ms.map(p=>(<div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}<ShareButton text={`🚴 Rosa Quiz #${day} — ${s.nome}\\n${s.found}/${s.total} trovati\\nuniverso-ciclismo.vercel.app`}/></>);
  }}</DoneScreen></div>);
  if(done){
    const missed=squadra.giocatori.filter(p=>!found.includes(p));
    const pct=Math.round(found.length/squadra.giocatori.length*100);
    const emoji=pct===100?"🏆":pct>=70?"🥇":pct>=40?"👍":"📚";
    return(<div style={T.app}><Hdr title={`Rosa Quiz · ${squadra.nome}`} sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
      <div style={T.body}>
        <div style={{textAlign:"center",marginBottom:"20px"}}><div style={{fontSize:"36px"}}>{emoji}</div><div style={{fontSize:"50px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}<span style={{fontSize:"18px",color:US.muted}}>/{squadra.giocatori.length}</span></div><div style={{fontSize:"11px",color:US.muted,marginTop:"3px"}}>trovati ({pct}%)</div></div>
        {found.length>0&&<div style={{marginBottom:"14px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"6px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        {missed.length>0&&<div style={{marginBottom:"18px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"6px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{missed.map(p=><div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        <div style={{textAlign:"center"}}>
          <ShareButton text={`🚴 Rosa Quiz #${day} — ${squadra.nome}\n${found.length}/${squadra.giocatori.length} trovati (${pct}%)\nuniverso-ciclismo.vercel.app`}/>
          {isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
          <button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button>
        </div>
      </div>
    </div>);
  }
  return(<div style={T.app}><Hdr title={`Rosa Quiz · ${squadra.emoji} ${squadra.nome}`} sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={T.body}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
        <TimerRing seconds={seconds} total={TOTAL}/>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"36px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}</div>
          <div style={{fontSize:"10px",color:US.muted}}>su {squadra.giocatori.length}</div>
          <button onClick={()=>setDone(true)} style={{marginTop:"6px",background:"none",border:`1px solid ${US.border}`,borderRadius:"4px",padding:"3px 10px",fontSize:"9px",color:US.muted,cursor:"pointer",fontFamily:"inherit"}}>⏹ Termina</button>
        </div>
      </div>
      <div style={{marginBottom:"12px"}}>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} onFocus={e=>setTimeout(()=>e.target.scrollIntoView({behavior:"smooth",block:"center"}),300)} placeholder="Scrivi un cognome..." style={{width:"100%",boxSizing:"border-box",border:`2px solid ${wrong?US.red:lastFound?US.green:US.border}`,borderRadius:"6px",padding:"11px 13px",fontSize:"14px",fontFamily:"inherit",outline:"none",color:US.black,background:wrong?US.redL:lastFound?US.greenL:"#fff",transition:"all 0.2s"}}/>
        {lastFound&&<div style={{fontSize:"11px",color:US.green,marginTop:"4px",fontWeight:"600",display:"flex",alignItems:"center",gap:"8px"}}>✓ {lastFound}<span style={{background:US.green,color:"#fff",borderRadius:"4px",padding:"1px 6px",fontSize:"10px"}}>+{BONUS}s ⏱</span></div>}
        {wrong&&<div style={{fontSize:"11px",color:US.red,marginTop:"4px"}}>✗ "{wrong}" — non trovato</div>}
      </div>
      {found.length>0&&<div><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.muted,marginBottom:"6px"}}>Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
    </div>
  </div>);
}
function RosaQuiz({onHome,isDaily,onArchive}){
  if(isDaily){const d=ROSE_LIST.length,s=todaySeed();return<RosaQuizGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="rosa">{({day,seed,isToday,archiveNav,chipBar})=><RosaQuizGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── LISTA QUIZ ────────────────────────────────────────────────────────────
function ListaQuizGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const TOTAL=90,BONUS=5;
  const cat=LISTA_CATEGORIES[(seed%LISTA_POOL)];
  const validAnswers=cat.unique||cat.answers;
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("lista"):null;
  const[input,setInput]=useState("");
  const[found,setFound]=useState([]);
  const[wrong,setWrong]=useState(null);
  const[seconds,setSeconds]=useState(TOTAL);
  const[lastFound,setLastFound]=useState(null);
  const[done,setDone]=useState(false);
  const inputRef=useRef(null);
  const timerRef=useRef(null);
  useEffect(()=>{setInput("");setFound([]);setWrong(null);setSeconds(TOTAL);setLastFound(null);setDone(false);},[seed]);
  useEffect(()=>{
    if(done)return;
    clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>setSeconds(s=>{if(s<=1){clearInterval(timerRef.current);setDone(true);return 0;}return s-1;}),1000);
    setTimeout(()=>inputRef.current?.focus(),100);
    return()=>clearInterval(timerRef.current);
  },[seed,done]);
  useEffect(()=>{if(done&&isToday)saveResult("lista",{found:found.length,total:validAnswers.length,title:cat.title,foundNames:found,allNames:validAnswers});},[done]);
  function submit(){
    const v=normLow(input);if(!v)return;
    const match=validAnswers.find(p=>fuzzyMatch(input,p)&&!found.includes(p));
    if(match){
      setFound(f=>[...f,match]);setLastFound(match);setWrong(null);setInput("");setSeconds(s=>s+BONUS);
      setTimeout(()=>setLastFound(null),1200);
    } else {
      setWrong(input);setInput("");setTimeout(()=>setWrong(null),800);
    }
    inputRef.current?.focus();
  }
  const total=validAnswers.length;
  const pct=Math.round(found.length/total*100);
  if(savedToday&&isToday)return(<div style={T.app}><Hdr title="Lista Quiz" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="lista" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=>{
    const fn=s.foundNames||[];const all=s.allNames||[];const ms=all.filter(p=>!fn.includes(p));
    return (<><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>📋</div><div style={{fontSize:"13px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.title}</div><div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{s.found}/{s.total} trovati ({Math.round(s.found/s.total*100)}%)</div>{fn.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"5px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{fn.map(p=>(<div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}{ms.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"5px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{ms.map(p=>(<div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}<ShareButton text={`📋 Lista Quiz Ciclismo #${day}\\n${s.title}\\n${s.found}/${s.total} trovati\\nuniverso-ciclismo.vercel.app`}/></>);
  }}</DoneScreen></div>);
  if(done){
    const missed=validAnswers.filter(p=>!found.includes(p));
    const emoji=pct===100?"🏆":pct>=70?"🥇":pct>=40?"👍":"📚";
    return(<div style={T.app}><Hdr title="Lista Quiz" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
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
          <ShareButton text={`📋 Lista Quiz Ciclismo #${day}\n${cat.title}\n${found.length}/${total} trovati (${pct}%)\nuniverso-ciclismo.vercel.app`}/>
          {isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
          <button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button>
        </div>
      </div>
    </div>);
  }
  return(<div style={T.app}><Hdr title="Lista Quiz" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={T.body}>
      <div style={{marginBottom:"12px",padding:"10px 13px",background:US.black,borderRadius:"6px"}}>
        <div style={{fontSize:"8px",color:US.orange,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>Categoria di oggi</div>
        <div style={{fontSize:"13px",fontWeight:"700",color:"#fff"}}>{cat.title}</div>
        <div style={{fontSize:"10px",color:"#888",marginTop:"2px"}}>{cat.desc}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
        <TimerRing seconds={seconds} total={TOTAL}/>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"36px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}<span style={{fontSize:"16px",color:US.muted}}>/{total}</span></div>
          <div style={{fontSize:"9px",color:US.yellow,marginTop:"2px"}}>+{BONUS}s per risposta ✓</div>
          <button onClick={()=>setDone(true)} style={{marginTop:"6px",background:"none",border:`1px solid ${US.border}`,borderRadius:"4px",padding:"3px 10px",fontSize:"9px",color:US.muted,cursor:"pointer",fontFamily:"inherit"}}>⏹ Termina</button>
        </div>
      </div>
      <div style={{marginBottom:"12px"}}>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} onFocus={e=>setTimeout(()=>e.target.scrollIntoView({behavior:"smooth",block:"center"}),300)} placeholder="Scrivi un nome..." style={{width:"100%",boxSizing:"border-box",border:`2px solid ${wrong?US.red:lastFound?US.green:US.border}`,borderRadius:"6px",padding:"11px 13px",fontSize:"14px",fontFamily:"inherit",outline:"none",color:US.black,background:wrong?US.redL:lastFound?US.greenL:"#fff",transition:"all 0.2s"}}/>
        {lastFound&&<div style={{fontSize:"11px",color:US.green,marginTop:"4px",fontWeight:"600",display:"flex",alignItems:"center",gap:"8px"}}>✓ {lastFound}<span style={{background:US.green,color:"#fff",borderRadius:"4px",padding:"1px 6px",fontSize:"10px"}}>+{BONUS}s ⏱</span></div>}
        {wrong&&<div style={{fontSize:"11px",color:US.red,marginTop:"4px"}}>✗ "{wrong}" — non in lista</div>}
      </div>
      {found.length>0&&<div><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.muted,marginBottom:"6px"}}>Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
    </div>
  </div>);
}
function ListaQuiz({onHome,isDaily,onArchive}){
  if(isDaily){const d=LISTA_POOL,s=todaySeed();return<ListaQuizGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="lista">{({day,seed,isToday,archiveNav,chipBar})=><ListaQuizGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── INDOVINA IL TRASFERIMENTO ─────────────────────────────────────────────
function TransferGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const tr=TRANSFERS[seed%TRANSFERS.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("transfer"):null;
  const[step,setStep]=useState(0);
  const[results,setResults]=useState({});
  const[inputs,setInputs]=useState({fee:"",from:"",year:""});
  useEffect(()=>{setStep(0);setResults({});setInputs({fee:"",from:"",year:""});},[seed]);

  function evalField(field,val){
    if(field==="fee"){const n=parseFloat(val);if(isNaN(n))return"red";const d=Math.abs(n-tr.fee);return d===0?"green":d<=1?"yellow":"red";}
    if(field==="from"){const g=normLow(val),a=normLow(tr.from);return g===a||a.includes(g)||g.includes(a)?"green":"red";}
    if(field==="year"){const n=parseInt(val);if(isNaN(n))return"red";const d=Math.abs(n-tr.year);return d===0?"green":d<=1?"yellow":"red";}
    return"red";
  }
  function submitField(field){
    const v=inputs[field];if(!v.trim())return;
    const r=evalField(field,v);
    setResults(p=>({...p,[field]:r}));
    setStep(s=>s+1);
  }

  const fields=[
    {key:"fee",label:"Prezzo (M€)",placeholder:"Es: 2.5",hint:`${tr.player} → ${tr.to}`},
    {key:"from",label:"Da quale squadra?",placeholder:"Squadra d'origine",hint:`${tr.player} → ${tr.to} (${tr.year})`},
    {key:"year",label:"Anno del trasferimento?",placeholder:"Es: 2021",hint:`${tr.player}: da ??? a ${tr.to}`},
  ];

  if(savedToday&&isToday)return(<div style={T.app}><Hdr title="Indovina il Trasferimento" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="transfer" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>💸</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{tr.player}</div>
    <div style={{fontSize:"11px",color:US.muted,marginBottom:"12px"}}>{s.score}/3 corretti</div>
    <ShareButton text={`💸 Trasferimento Ciclismo #${day}\n${tr.player} → ${tr.to}\n${s.score}/3\nuniverso-ciclismo.vercel.app`}/>
  </>}</DoneScreen></div>);

  const score=Object.values(results).filter(r=>r==="green").length;

  return(<div style={T.app}><Hdr title="Indovina il Trasferimento" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={T.body}>
      <div style={{marginBottom:"14px",padding:"10px 13px",background:US.black,borderRadius:"6px",textAlign:"center"}}>
        <div style={{fontSize:"8px",color:US.orange,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"4px"}}>Corridore</div>
        <div style={{fontSize:"16px",fontWeight:"700",color:"#fff"}}>{tr.player}</div>
        <div style={{fontSize:"11px",color:"#888",marginTop:"2px"}}>→ {tr.to}</div>
      </div>
      {fields.map((f,i)=>{
        const r=results[f.key];
        const active=i===step&&step<3;
        if(i>step)return null;
        return(<div key={f.key} style={{marginBottom:"10px",padding:"10px 12px",background:r?r==="green"?US.greenL:r==="yellow"?"#fef9c3":US.redL:"#fff",border:`1.5px solid ${r?r==="green"?"#bbf7d0":r==="yellow"?"#fde68a":"#fecaca":"#e0e0e0"}`,borderRadius:"6px"}}>
          <div style={{fontSize:"9px",letterSpacing:"1px",textTransform:"uppercase",color:r?r==="green"?US.green:r==="yellow"?US.yellow:US.red:"#888",marginBottom:"4px",fontWeight:"700"}}>{f.label}</div>
          {active?<div style={{display:"flex",gap:"6px"}}><input value={inputs[f.key]} onChange={e=>setInputs(p=>({...p,[f.key]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submitField(f.key)} placeholder={f.placeholder} style={{...T.ip,flex:1}} autoFocus/><button onClick={()=>submitField(f.key)} style={T.pb}>→</button></div>
          :<div style={{fontSize:"13px",fontWeight:"700",color:r==="green"?US.green:r==="yellow"?US.yellow:US.red}}>
            {inputs[f.key]} {r==="green"?"✓":r==="yellow"?"~":"✗"} <span style={{fontWeight:"400",color:"#888",fontSize:"11px"}}>(era: {f.key==="fee"?tr.fee+"M":f.key==="from"?tr.from:tr.year})</span>
          </div>}
        </div>);
      })}
      {step>=3&&<div style={{textAlign:"center",marginTop:"14px"}}>
        <div style={{fontSize:"28px",fontWeight:"700",color:US.black,marginBottom:"4px"}}>{score}/3</div>
        <div style={{fontSize:"11px",marginTop:"4px",color:"#666"}}>{score===3?"Perfetto!":score===2?"Quasi!":score===1?"Ci sei vicino":"Riprova domani"}</div>
        <ShareButton text={`💸 Trasferimento Ciclismo #${day}\n${tr.player} → ${tr.to}\n${["fee","from","year"].map(k=>results[k]==="green"?"✅":results[k]==="yellow"?"🟨":"❌").join(" ")} ${score}/3\nuniverso-ciclismo.vercel.app`}/>
        {isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
        <button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button>
      </div>}
      {step<3&&<div style={{display:"flex",gap:"10px",marginTop:"10px"}}>{[[US.green,"Esatto"],[US.yellow,"Vicino"],[US.red,"Sbagliato"]].map(([c,l])=><div key={c} style={{display:"flex",alignItems:"center",gap:"3px",fontSize:"9px",color:"#999"}}><div style={{width:"8px",height:"8px",borderRadius:"2px",background:c}}/>{l}</div>)}</div>}
    </div>
  </div>);
}
function IndivinaTransferimento({onHome,isDaily,onArchive}){
  if(isDaily){const d=TRANSFERS.length,s=todaySeed();return<TransferGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="transfer">{({day,seed,isToday,archiveNav,chipBar})=><TransferGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── HOME ──────────────────────────────────────────────────────────────────
const MODES=[
  {key:"ciclodle", label:"Ciclodle",                icon:"🟩", desc:"Indovina il corridore"},
  {key:"wordle",    label:"Wordle Cognome",           icon:"🔤", desc:"Indovina il cognome lettera per lettera"},
  {key:"hangman",   label:"Impiccato",                icon:"🪢", desc:"Indovina il cognome"},
  {key:"valore2",   label:"Chi Vale di Più?",         icon:"⚖️", desc:"Confronta i valori di mercato"},
  {key:"carriera",  label:"Indovina la Carriera",     icon:"🔍", desc:"Indovina da squadre e vittorie"},
  {key:"rosa",      label:"Rosa Quiz",                icon:"🚴", desc:"60 secondi per nominare il roster"},
  {key:"lista",     label:"Lista Quiz",               icon:"📋", desc:"Nomina tutti i nomi della categoria"},
  {key:"transfer",  label:"Indovina il Trasferimento",icon:"💸", desc:"Prezzo, squadra e anno del trasferimento"},
];

function Card({m,onDaily,onArchive}){
  const[hv,sHv]=useState(false);
  return(<div style={{background:"#fff",border:`1.5px solid ${hv?US.orange:US.border}`,borderRadius:"8px",padding:"11px",transition:"all 0.15s",display:"flex",flexDirection:"column",gap:"4px",boxShadow:hv?"0 2px 8px rgba(0,0,0,0.07)":"none"}} onMouseEnter={()=>sHv(true)} onMouseLeave={()=>sHv(false)}>
    <div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{fontSize:"18px"}}>{m.icon}</span><span style={{fontSize:"12px",fontWeight:"700",color:US.black}}>{m.label}</span></div>
    <span style={{fontSize:"9px",color:US.muted,lineHeight:1.4}}>{m.desc}</span>
    <div style={{display:"flex",gap:"4px",marginTop:"3px"}}>
      <button onClick={()=>onDaily(m.key)} style={{flex:1,background:US.orange,color:US.black,border:"none",borderRadius:"4px",padding:"6px 3px",fontSize:"8px",fontWeight:"700",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>🗓 Daily</button>
      <button onClick={()=>onArchive(m.key)} style={{flex:1,background:US.black,color:"#fff",border:"none",borderRadius:"4px",padding:"6px 3px",fontSize:"8px",fontWeight:"700",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>📂 Archivio</button>
    </div>
  </div>);
}

function Home({onSelect}){
  const today=new Date().toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"});
  const countdown=useCountdown();
  const streak=loadStreak();
  return(<div style={{...T.app,paddingBottom:"40px"}}>
    <div style={{background:US.black,color:"#fff",padding:"18px 18px 14px",borderBottom:`3px solid ${US.orange}`}}>
      <div style={{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:US.orange,marginBottom:"2px",fontWeight:"700"}}>Universo Sportivo</div>
      <div style={{fontSize:"21px",fontWeight:"700",letterSpacing:"-0.5px",marginBottom:"7px"}}>Quiz Ciclismo</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
        <div>
          <div style={{fontSize:"10px",color:"#666",textTransform:"capitalize"}}>{today}</div>
          {streak.count>0&&<div style={{fontSize:"9px",color:US.orange,marginTop:"2px",fontWeight:"700"}}>🔥 Serie: {streak.count} {streak.count===1?"giorno":"giorni"}</div>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(255,255,255,0.07)",borderRadius:"6px",padding:"5px 10px"}}>
          <span style={{fontSize:"9px",color:"#555"}}>🔄 refresh in</span>
          <span style={{fontSize:"13px",fontWeight:"700",color:US.orange,fontVariantNumeric:"tabular-nums",letterSpacing:"0.5px"}}>{countdown}</span>
        </div>
      </div>
    </div>
    <div style={{padding:"14px 14px 40px",maxWidth:"620px",margin:"0 auto",boxSizing:"border-box"}}>
      <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}><div style={{width:"3px",height:"13px",background:US.orange,borderRadius:"2px"}}/><span style={{fontSize:"9px",fontWeight:"700",letterSpacing:"1.5px",textTransform:"uppercase",color:US.muted}}>Modalità</span></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        {MODES.map(m=><Card key={m.key} m={m} onDaily={k=>onSelect(k+"_daily")} onArchive={k=>onSelect(k+"_archive")}/>)}
      </div>
      <div style={{marginTop:"12px",padding:"9px 11px",background:"#fff",border:`1px solid ${US.border}`,borderRadius:"6px",fontSize:"9px",color:US.muted,lineHeight:1.6}}>🗓 <strong style={{color:US.black}}>Daily</strong> — sfida unica al giorno &nbsp;·&nbsp; 📂 <strong style={{color:US.black}}>Archivio</strong> — naviga le sfide passate con ◀ ▶</div>
    </div>
  </div>);
}

// ── ROOT ──────────────────────────────────────────────────────────────────
export default function App(){
  useEffect(()=>{
    const s=document.createElement("style");
    s.innerHTML=`
      input,select,textarea{font-size:16px !important;}
      .flip-cell{perspective:300px;}
      .flip-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 0.65s ease;}
      .flip-inner.flipped{transform:rotateX(360deg);}
      .flip-front,.flip-back{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:3px;font-weight:700;}
      .flip-back{backface-visibility:hidden;}
      @keyframes fadeSlideIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
      .game-enter{animation:fadeSlideIn 0.35s ease forwards;}
    `;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);
  const[sc,sSc]=useState("home");
  const home=()=>sSc("home");
  const isDaily=sc.endsWith("_daily");
  const key=sc.replace("_daily","").replace("_archive","");
  if(sc==="home")return<Home onSelect={sSc}/>;
  const goArchive=()=>sSc(key+"_archive");
  if(key==="ciclodle")return<Ciclodle onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="wordle")return<WordleCognome onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="hangman")return<Hangman onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="valore2")return<ChiValeDiPiu onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="carriera")return<Carriera onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="rosa")return<RosaQuiz onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="lista")return<ListaQuiz onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="transfer")return<IndivinaTransferimento onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  return<Home onSelect={sSc}/>;
}
