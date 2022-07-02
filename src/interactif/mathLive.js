import { ComputeEngine } from '@cortex-js/compute-engine';
import Grandeur from '../modules/Grandeur';
import FractionEtendue from '../modules/FractionEtendue';
import { texteExposant } from '../modules/outils';
export function verifQuestionMathLive(exercice, i) {
    const engine = new ComputeEngine();
    let saisieParsee, num, den, fSaisie, fReponse;
    const formatInteractif = exercice.autoCorrection[i].reponse.param.formatInteractif;
    const spanReponseLigne = document.querySelector(`#resultatCheckEx${exercice.numeroExercice}Q${i}`);
    // On compare le texte avec la réponse attendue en supprimant les espaces pour les deux
    let reponse, saisie, nombreSaisi, grandeurSaisie, mantisseSaisie, expoSaisi, nombreAttendu, mantisseReponse, expoReponse;
    let reponses = [];
    let champTexte;
    if (!Array.isArray(exercice.autoCorrection[i].reponse.valeur)) {
        reponses = [exercice.autoCorrection[i].reponse.valeur];
    }
    else {
        reponses = exercice.autoCorrection[i].reponse.valeur;
    }
    try {
        // Ici on va s'occuper de ce champTexte qui pose tant de problèmes
        champTexte = document.getElementById(`champTexteEx${exercice.numeroExercice}Q${i}`);
        if (champTexte === undefined)
            champTexte = { value: '' };
        let resultat = 'KO';
        let j = 0;
        while ((resultat === 'KO') && (j < reponses.length)) {
            reponse = reponses[j];
            switch (formatInteractif) {
                case 'Num':
                    num = parseInt(champTexte.value.replace(',', '.'));
                    if (isNaN(num) || num === undefined)
                        num = 9999;
                    den = reponse.den;
                    fSaisie = new FractionEtendue(num, den);
                    if (fSaisie.isEqual(reponse)) {
                        resultat = 'OK';
                    }
                    break;
                case 'Den':
                    den = parseInt(champTexte.value.replace(',', '.'));
                    if (isNaN(den) || den === undefined)
                        den = 9999;
                    num = reponse.num;
                    fSaisie = new FractionEtendue(num, den);
                    if (fSaisie.isEqual(reponse)) {
                        resultat = 'OK';
                    }
                    break;
                case 'calcul':
                    // Le format par défaut
                    saisie = champTexte.value.replace(',', '.');
                    // La réponse est transformée en chaine compatible avec engine.parse()
                    reponse = reponse.toString().replaceAll(',', '.').replaceAll('dfrac', 'frac');
                    saisie = saisie.replace(/\((\+?-?\d+)\)/, '$1'); // Pour les nombres négatifs, supprime les parenthèses
                    if (engine.parse(reponse).canonical.isSame(engine.parse(saisie).canonical)) {
                        resultat = 'OK';
                    }
                    break;
                case 'nombreDecimal':
                    saisie = champTexte.value.replace(',', '.');
                    // La réponse est ici arrondie en fonction de reponse.param.decimals
                    reponse = Number(reponse.toString().replaceAll(',', '.')).toFixed(exercice.autoCorrection[i].reponse.param.decimals);
                    saisie = saisie.replace(/\((\+?-?\d+)\)/, '$1'); // Pour les nombres négatifs, supprime les parenthèses
                    if (engine.parse(reponse).isSame(engine.parse(saisie))) {
                        resultat = 'OK';
                    }
                    break;
                case 'ecritureScientifique': // Le résultat, pour être considéré correct, devra être saisi en écriture scientifique
                    saisie = champTexte.value.replace(',', '.');
                    if (typeof reponse === 'string') {
                        reponse = reponse.replace(',', '.').replace('{.}', '.');
                    }
                    if (engine.parse(reponse).canonical.isSame(engine.parse(saisie).canonical)) {
                        saisie = saisie.split('\\times');
                        if (Number(saisie[0]) >= 1 && Number(saisie[0]) < 10) {
                            resultat = 'OK';
                        }
                    }
                    break;
                case 'texte':
                    if (champTexte !== undefined)
                        saisie = champTexte.value;
                    else
                        saisie = '';
                    // console.log('saisie : ', saisie) // NE PAS SUPPRIMER CAR UTILE POUR LE DEBUGGAGE
                    // console.log('reponse : ', reponse) // NE PAS SUPPRIMER CAR UTILE POUR LE DEBUGGAGE
                    if (saisie === reponse) {
                        resultat = 'OK';
                    }
                    break;
                case 'ignorerCasse':
                    saisie = champTexte.value;
                    if (saisie.toLowerCase() === reponse.toLowerCase()) {
                        resultat = 'OK';
                        // Pour les exercices de simplifications de fraction
                    }
                    break;
                case 'fractionPlusSimple':
                    saisie = champTexte.value.replace(',', '.');
                    if (!isNaN(parseFloat(saisie))) {
                        saisieParsee = engine.parse(`\\frac{${saisie}}{1}`).canonical;
                    }
                    else {
                        saisieParsee = engine.parse(saisie);
                    }
                    fReponse = engine.parse(reponse.texFSD.replace('dfrac', 'frac'));
                    if (saisieParsee.isEqual(fReponse) && saisieParsee.json[1] < fReponse.json[1])
                        resultat = 'OK';
                    break;
                case 'fractionEgale': // Pour les exercices de calcul où on attend une fraction peu importe son écriture (3/4 ou 300/400 ou 30 000/40 000...)
                    // Si l'utilisateur entre un nombre décimal n, on transforme en n/1
                    saisie = champTexte.value.replace(',', '.'); // On remplace la virgule éventuelle par un point.
                    if (!isNaN(parseFloat(saisie))) {
                        const newFraction = new FractionEtendue(parseFloat(saisie));
                        saisieParsee = engine.parse(`${newFraction.toLatex().replace('dfrac', 'frac')}`).canonical;
                    }
                    else {
                        saisieParsee = engine.parse(saisie).canonical;
                    }
                    fReponse = engine.parse(reponse.texFSD.replace('dfrac', 'frac')).canonical;
                    if (saisieParsee) {
                        if (saisieParsee.isEqual(fReponse))
                            resultat = 'OK';
                    }
                    break;
                case 'fraction': // Pour les exercices où l'on attend un écriture donnée d'une fraction
                    saisie = champTexte.value.replace(',', '.');
                    if (!isNaN(parseFloat(saisie))) {
                        saisieParsee = engine.parse(new FractionEtendue(saisie, 1).texFSD);
                    }
                    else {
                        saisieParsee = engine.parse(saisie.replace('frac', 'dfrac').replace('ddfrac', 'dfrac'));
                    }
                    fReponse = engine.parse(reponse.texFSD);
                    if (saisieParsee.isEqual(fReponse))
                        resultat = 'OK';
                    break;
                case 'unites': // Pour les exercices où l'on attend une mesure avec une unité au choix
                    saisie = champTexte.value.replace('²', '^2').replace('³', '^3');
                    grandeurSaisie = saisieToGrandeur(saisie);
                    if (grandeurSaisie) {
                        if (grandeurSaisie.estEgal(reponse))
                            resultat = 'OK';
                    }
                    else {
                        resultat = 'essaieEncoreAvecUneSeuleUnite';
                    }
                    break;
                case 'intervalleStrict': // Pour les exercice où la saisie doit être dans un intervalle
                    saisie = champTexte.value.replace(',', '.');
                    nombreSaisi = Number(saisie);
                    if (saisie !== '' && nombreSaisi > exercice.autoCorrection[i].reponse.valeur[0] && nombreSaisi < exercice.autoCorrection[i].reponse.valeur[1])
                        resultat = 'OK';
                    break;
                case 'intervalle':
                    saisie = champTexte.value.replace(',', '.');
                    nombreSaisi = Number(saisie);
                    if (saisie !== '' && nombreSaisi >= exercice.autoCorrection[i].reponse.valeur[0] && nombreSaisi <= exercice.autoCorrection[i].reponse.valeur[1])
                        resultat = 'OK';
                    break;
                case 'puissance':
                    saisie = champTexte.value.replace(',', '.');
                    // formatOK et formatKO sont deux variables globales,
                    // sinon dans le cas où reponses est un tableau, la valeur n'est pas conservée d'un tour de boucle sur l'autre
                    // eslint-disable-next-line no-var
                    var formatOK, formatKO;
                    if (saisie.indexOf('^') !== -1) {
                        nombreSaisi = saisie.split('^');
                        mantisseSaisie = nombreSaisi[0];
                        expoSaisi = nombreSaisi[1] ? nombreSaisi[1].replace(/[{}]/g, '') : '';
                        nombreAttendu = reponse.split('^');
                        mantisseReponse = nombreAttendu[0];
                        expoReponse = nombreAttendu[1] ? nombreAttendu[1].replace(/[{}]/g, '') : '';
                        if (mantisseReponse === mantisseSaisie && expoReponse === expoSaisi) {
                            formatOK = true;
                        }
                        // gérer le cas mantisse négative a et exposant impair e, -a^e est correct mais pas du format attendu
                        // si la mantisse attendue est négative on nettoie la chaine des parenthèses
                        if (parseInt(mantisseReponse.replace(/[()]/g, '')) < 0 && expoReponse % 2 === 1) {
                            if ((saisie === `${mantisseReponse.replace(/[()]/g, '')}^{${expoReponse}}`) || (saisie === `${mantisseReponse.replace(/[()]/g, '')}^${expoReponse}`)) {
                                formatKO = true;
                            }
                        }
                        // si l'exposant est négatif, il se peut qu'on ait une puissance au dénominateur
                        if (parseInt(expoReponse) < 0) {
                            // Si la mantisse est positive
                            if ((saisie === `\\frac{1}{${parseInt(mantisseReponse)}^{${-expoReponse}}`) || (saisie === `\\frac{1}{${parseInt(mantisseReponse)}^${-expoReponse}}`)) {
                                formatKO = true;
                            }
                        }
                    }
                    else {
                        // Dans tous ces cas on est sûr que le format n'est pas bon
                        // Toutefois la valeur peut l'être donc on vérifie
                        nombreSaisi = saisie;
                        nombreAttendu = reponse.split('^');
                        mantisseReponse = nombreAttendu[0];
                        expoReponse = nombreAttendu[1] ? nombreAttendu[1].replace(/[{}]/g, '') : '';
                        if (parseInt(expoReponse) < 0) {
                            // Si la mantisse est positive
                            if (nombreSaisi === `\\frac{1}{${mantisseReponse ** (-expoReponse)}}`) {
                                formatKO = true;
                            }
                            // Si elle est négative, le signe - peut être devant la fraction ou au numérateur  ou au dénominateur
                            if (parseInt(mantisseReponse.replace(/[()]/g, '')) < 0 && ((-expoReponse) % 2 === 1)) {
                                if ((nombreSaisi === `-\\frac{1}{${((-1) * parseInt(mantisseReponse.replace(/[()]/g, ''))) ** (-expoReponse)}}`) || (nombreSaisi === `\\frac{-1}{${((-1) * parseInt(mantisseReponse.replace(/[()]/g, ''))) ** (-expoReponse)}}`) || (nombreSaisi === `\\frac{1}{-${((-1) * parseInt(mantisseReponse.replace(/[()]/g, ''))) ** (-expoReponse)}}`)) {
                                    formatKO = true;
                                }
                            }
                        }
                        if (parseInt(expoReponse) > 0) {
                            if (nombreSaisi === `${mantisseReponse ** (expoReponse)}`) {
                                formatKO = true;
                            }
                        }
                        if (parseInt(expoReponse) === 0) {
                            if (nombreSaisi === '1') {
                                formatKO = true;
                            }
                        }
                    }
                    if (formatOK) {
                        resultat = 'OK';
                    }
                    if (formatKO) {
                        resultat = 'essaieEncorePuissance';
                    }
                    // if (mantisseReponse === mantisseSaisie && expoReponse === expoSaisi) {
                    //   resultat = 'OK'
                    // } else {
                    //   resultat = 'KO'
                    // }
                    break;
            }
            j++;
        }
        console.log(resultat);
        if (resultat === 'OK') {
            spanReponseLigne.innerHTML = '😎';
            spanReponseLigne.style.fontSize = 'large';
            if (champTexte !== undefined)
                champTexte.readOnly = true;
        }
        else if (resultat === 'essaieEncoreAvecUneSeuleUnite') {
            spanReponseLigne.innerHTML = '<em>Il faut saisir une valeur numérique et une seule unité (' +
                (reponse.uniteDeReference.indexOf('^') > 0
                    ? reponse.uniteDeReference.split('^')[0] + texteExposant(reponse.uniteDeReference.split('^')[1])
                    : reponse.uniteDeReference) +
                ' par exemple).</em>';
            spanReponseLigne.style.color = '#f15929';
            spanReponseLigne.style.fontWeight = 'bold';
        }
        else if (resultat === 'essaieEncorePuissance') {
            spanReponseLigne.innerHTML = '<br><em>Attention, la réponse est mathématiquement correcte mais n\'a pas le format demandé.</em>';
            spanReponseLigne.style.color = '#f15929';
            spanReponseLigne.style.fontWeight = 'bold';
        }
        else {
            spanReponseLigne.innerHTML = '☹️';
            spanReponseLigne.style.fontSize = 'large';
            if (champTexte !== undefined)
                champTexte.readOnly = true;
        }
        return resultat;
    }
    catch (error) {
        // window.notify(`Erreur dans verif QuestionMathLive : ${error} <br> Avec les métadonnées : `, { champTexteValue: champTexte._slotValue, exercice: exercice.id, i, autoCorrection: exercice.autoCorrection[i], formatInteractif, spanReponseLigne })
    }
}
function saisieToGrandeur(saisie) {
    if (saisie.indexOf('°') > 0) {
        const split = saisie.split('°');
        return new Grandeur(parseFloat(split[0].replace(',', '.')), '°');
    }
    if (saisie.split('operatorname').length !== 2) {
        return false;
    }
    else {
        const split = saisie.split('\\operatorname{');
        const mesure = parseFloat(split[0].replace(',', '.'));
        if (split[1]) {
            const split2 = split[1].split('}');
            const unite = split2[0] + split2[1];
            return new Grandeur(mesure, unite);
        }
        else {
            return false;
        }
    }
}
//# sourceMappingURL=mathLive.js.map