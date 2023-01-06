// # Bienvenu à Codepital:
// >Dans cet exercice nous aurons des malades qui iront se faire débuger chez un doctor. Le doctor les diagnostiquera et leur préscrira un remède. Par la suite les malades iront à la pharmacie afin d'acheter leur remède puis le prendront et seront guérris.

// ## Description des patients
// >les malades ont un nom, une maladie, de l'argent, une poche, un état de santé,ils savent aller à un endroit, prendre un médicamment et payer. Au début, les patients sont dans un salle d'attente. 

// |nom|maladie|argent|poche|etatSante|traitement|goTo|takeCare|paye|
// |---|---|---|---|---|---|---|---|---|
// |Marcus|mal indenté|100|vide|malade
// |Optimus|unsave|200|vide|malade
// |Sangoku|404|80|vide|malade
// |DarthVader|azmatique|110|vide|malade
// |Semicolon|syntaxError|60|vide|malade

class PersonneMalade {
    constructor(nom,maladie,argent,poche,etatSante){
        this.nom = nom;
        this.maladie = maladie;
        this.argent = argent;
        this.poche = poche;
        this.etatSante = etatSante;
    }
    traitement(etat){
        this.etatSante = etat;
    }
    goTo(depart, destination){
        depart.splice(depart.indexOf(this),1);
        destination.push(this);
    }
    takeCare(){
        pharmacie.tarif(this);
    }
    paye(prix, destinataire){
        this.argent -= prix;
        destinataire.argent += prix;
    }
}

let Marcus = new PersonneMalade (`Marcus`,`malIndenté`,100,`vide`,`malade`)
let Optimus = new PersonneMalade (`Optimus`,`unsave`,200,`vide`,`malade`)
let Sangoku = new PersonneMalade (`Sangoku`,`Err404`,80,`vide`,`malade`)
let DarthVader = new PersonneMalade (`DarthVader`,`azmatique`,110,`vide`,`malade`)
let Semicolon = new PersonneMalade (`Semicolon`,`syntaxError`,60,`vide`,`malade`)

let salleAttente = [Marcus, Optimus, Sangoku, DarthVader, Semicolon];

/*

class Maladie {
    constructor(nom,maladie,argent,poche,etatSante){
        this.nom = nom;
        this.maladie = maladie;
        this.argent = argent;
        this.poche = poche;
        this.etatSante = etatSante;
    }
    debug(){
        
    }
}

let malIndenté = new Maladie (`Marcus`,`malIndenté`,100,`vide`,`malade`)
let unsave = new Maladie (`Optimus`,`unsave`,200,`vide`,`malade`)
let Err404 = new Maladie (`Sangoku`,`Err404`,80,`vide`,`malade`)
let azmatique = new Maladie (`DarthVader`,`azmatique`,110,`vide`,`malade`)
let syntaxError = new Maladie (`Semicolon`,`syntaxError`,60,`vide`,`malade`)

*/

// ## Description du doctor
// >Le doctor lui reçoit les patients dans son cabinet. Tout d'abord il les diagnostique puis se fait payer avant de préscrire un traitement. Attention le doctor fait à chaque fois sortir le patient de son cabinet avant de prendre le suivant. Dans son cabinet il y a son chat de race sphynx pour garder un environemment stérile. Son chat miaule toutes les deux secondes dans la console(bonus). La consultation coûte 50€. Les patients sont dans un état de traitement avant de sortir du cabinet.

// |nom|argent|cabinet|diagnostique|patientIn|patientOut
// |---|---|---|---|---|---|
// |Debugger|0|[chat]


// ### Grille des diagnostiques
// |maladie|traitement|
// |---|---|
// |mal indenté|`ctrl+maj+f`|
// |unsave|`saveOnFocusChange`|
// |404|`CheckLinkRelation`|
// |azmatique|`Ventoline`|
// |syntaxError|`f12+doc`|

/*
let traitement = {
    malIndenté : "ctrl+maj+f",
    unsave : "saveOnFocusChange",
    Err404 : "CheckLinkRelation",
    azmatique : "Ventoline",
    syntaxError : "f12+doc",
}
*/

// class Medecin{
//     constructor(nom,argent,cabinet,diagnostic,patientIn,patientOut){
//         this.nom = nom;
//         this.argent = argent;
//         this.cabinet = cabinet;
//         this.diagnostic = diagnostic;
//         this.patientIn = patientIn;
//         this.patientOut = patientOut;
//     }
// }


let Medecin = {
    nom :`Medecin`,
    argent : 300,
    cabinet : [],
    diagnostic (patient){
        switch (patient.maladie) {
            case `malIndenté`:
                patient.paye(50, this);
                patient.poche ="ctrl+maj+f";
                break;

            case `unsave`:
                patient.paye(50, this);
                patient.poche = "saveOnFocusChange";
                break;

            case `Err404`:
                patient.paye(50, this);
                patient.poche = "CheckLinkRelation";
                break;

            case `azmatique`:
                patient.paye(50, this);
                patient.poche = "Ventoline";
                break;

            case `syntaxError`:
                patient.paye(50, this);
                patient.poche = "f12+doc";
                break;
            
            default:
                console.log("maladie introuvable");
                break;
        }
    },
    patientIn(patient){
        patient.goTo(salleAttente, this.cabinet);
        patient.traitement("traitement");
    },
    patientOut(patient){
        patient.goTo(this.cabinet, pharmacie.pharma);
    }
}

// ## La pharmacie
// >Les patients iront par après à la pharmacie et recevront leur traitement s'ils ont assez d'argent. Dans le cas ou ils ont assez d'argent ils seront alors en bonne santé sinon ils seront mort et il faudra alors les pousser dans un cimetière.

// ### Tarif des traitements
// |Traitement|prix|
// |---|---|
// |`ctrl+maj+f`|60€
// |`saveOnFocusChange`|100€
// |`CheckLinkRelation`|35€
// |`Ventoline`|40€
// |`f12+doc`|20€

/*
let tarifs = {
    ctrl+maj+f: 60,
    saveOnFocusChange : 100,
    CheckLinkRelation : 35,
    Ventoline : 40,
    f12+doc : 20,
}
*/

let pharmacie = {
    pharma : [],
    argent : 200,
    tarif(patient){
        switch (patient.poche) {
            case `ctrl+maj+f`:
                if(patient.argent >= 60){
                    patient.paye(60, this);
                    patient.traitement(`bonne santé`);
                } else {
                    patient.traitement("mort");
                    cimetiere.push(patient);
                }
                break;
            
            case `saveOnFocusChange`:
                if(patient.argent >= 100){
                    patient.paye(100, this);
                    patient.traitement(`bonne santé`);
                } else {
                    patient.traitement(`mort`);
                    cimetiere.push(patient);
                }
                break;

            case `CheckLinkRelation`:
                if(patient.argent >= 35){
                    patient.paye(35, this);
                    patient.traitement(`bonne santé`);
                } else {
                    patient.traitement(`mort`);
                    cimetiere.push(patient);
                }
                break;

            case `Ventoline`:
                if(patient.argent >= 40){
                    patient.paye(40, this);
                    patient.traitement(`bonne santé`);
                } else {
                    patient.traitement(`mort`);
                    cimetiere.push(patient);
                }
                break;

            case `f12+doc`:
                if(patient.argent >= 20){
                    patient.paye(20, this);
                    patient.traitement(`bonne santé`);
                } else {
                    patient.traitement(`mort`);
                    cimetiere.push(patient);
                }
                break;
                
            default:
                console.log("Le patient est sans prescription");
                break;
        }
    }

}

let cimetiere = [];



/*

switch(`QUE METTRE ICI?`) {
    case (${this.argent} >= ${tarifs.ctrl+maj+f})
        Maladie = `malIndenté`;
        console.log(`${this.argent} est diagnotiqué ctrl+maj+f`);
    break;

    case (${this.argent} >= ${tarifs.saveOnFocusChange})
        console.log(`${this.nom} est diagnotiqué saveOnFocusChange`);
    break;

    case (${this.argent} >= ${tarifs.saveOnFocusChange})
        console.log(`${this.nom} est diagnotiqué CheckLinkRelation`);
        break;

    case (${this.argent} >= ${tarifs.CheckLinkRelation})
        console.log(`${this.nom} est diagnotiqué Ventoline`);
        break;
    
    case (${this.argent} >= ${tarifs.f12+doc})
        console.log(`${this.nom} est diagnotiqué f12+doc`);
        break;

    default:
        console.log(`${this.nom} mort et doit aller au cimetière.`);
        break;
    }
}
*/

/* */

// utiliser un tableau:
// deux arrays
// maladie
// traitements

// for each maladie, lier maladie et traitement

// pour le prix

// for each traitement comparer le prix et le montant disponible dans la poche



// # Vérification

// Grâce à votre débugger suivez à la trace l'évolution de chacun de vos patients. Vérifiez bien qu'il quitte à chaque fois la salle d'attente avant d'entrer dans le cabinet et qu'ils sortent bien du cabinet avant de laisser quelqu'un d'autre entrer.


// Difficile Je ne vois pas tout ce qu'il faudrait faire




//Marcus
console.log(Marcus);
console.log(Medecin);
console.log(salleAttente);




//Optimus
console.log(Marcus);
console.log(Medecin);
console.log(salleAttente);



//Sangoku
console.log(Sangoku);
console.log(Medecin);
console.log(salleAttente);




//DarthVader
console.log(DarthVader);
console.log(Medecin);
console.log(salleAttente);




//Semicolon
console.log(Semicolon);
console.log(Medecin);
console.log(salleAttente);
