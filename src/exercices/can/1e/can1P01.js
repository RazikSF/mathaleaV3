import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, choice, texNombre, sp } from '../../../modules/outils.js'
import Decimal from 'decimal.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Ecrire une probabilté avec les notations'
export const dateDePublication = '21/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora
 *
*/
export const uuid = '15f6d'
export const ref = 'can1P01'
export default function ProbabilitesNotation () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 1 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, cpt = 0, p1, p2, p3, p4, p5, p6, texte, texteCorr, choix; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2, 3])) { //
        case 1:
          p1 = randint(25, 80)
          p2 = new Decimal(p1).div(100)
          choix = choice(['q1', 'q2', 'q3', 'q4', 'q5'])//
          texte = `Dans un lycée, on choisit au hasard un élève. On note : <br>
      $\\bullet$ $F$ : "L'élève choisi est une fille" ;<br>
      $\\bullet$ $R$ : "L'élève choisi est un demi-pensionnaire".<br>
      `
          if (choix === 'q1') {
            texte += ` Dans ce lycée il y a $${p1}$ $\\%$ de filles demi-pensionnaires.<br>
            En utilisant les événements $F$ et $R$, compléter l'égalité  à l'aide d'une probabilité :`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p2, 2)}$`
            texteCorr = `Il ne s'agit pas d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des élèves du lycée.<br>
            $P(F\\cap R)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['p(F\\bigcap R)', 'p(R\\bigcap F)', 'P(F\\bigcap R)', 'P(R\\bigcap F)'])
          }
          if (choix === 'q2') {
            if (choice([true, false])) {
              texte += ` Dans ce lycée, $${p1}$ $\\%$ des filles sont demi-pensionnaires.<br>`
            } else { texte += ` Parmi les filles de ce lycée,  $${p1}$ $\\%$ sont demi-pensionnaires.<br>` }
            texte += ' En utilisant les événements $F$ et $R$, compléter  suivante à l\'aide d\'une probabilité :'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $= ${texNombre(p2, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur l'ensemble des filles.<br>
            $P_F(R)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['P_{F}({R})', 'P_{F}(R)', 'p_{F}({R})', 'p_{F}(R)'])
          }
          if (choix === 'q3') {
            if (choice([true, false])) {
              texte += ` Dans ce lycée $${p1}$ $\\%$ des garçons sont demi-pensionnaires.<br>`
            } else { texte += ` Parmi les garçons de ce lycée,  $${p1}$ $\\%$ sont demi-pensionnaires.<br>` }
            texte += ' En utilisant les événements $F$ et $R$, compléter  avec une probabilité :'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $= ${texNombre(p2, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur l'ensemble des garçons.<br>
            $P_{\\overline{F}}(R)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['P_{\\overline{F}}({R})', 'p_{\\overline{F}}({R})', 'P{_\\overline{F}}({R})', 'P\\overline{_F}({R})', 'P\\overline{_F}({R})'])
          }
          if (choix === 'q4') {
            texte += ` Dans ce lycée, il y a $${p1}$ $\\%$ de garçons demi-pensionnaires.<br>
            En utilisant les événements $F$ et $R$, compléter l'égalité à l'aide d'une probabilité :<br>`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p2, 2)}$`
            texteCorr = `Il ne s'agit pas d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des élèves du lycée.<br>
            $P(\\overline{F}\\cap R)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['p(\\overline{F}\\bigcap R)', 'p(R\\bigcap \\overline{F})', 'P(\\overline{F}\\bigcap R)', 'P(R\\bigcap \\overline{F})'])
          }
          if (choix === 'q5') {
            if (choice([true, false])) {
              texte += ` Dans ce lycée $${p1}$ $\\%$ des demi-pensionnaires sont des garçons.<br>`
            } else { texte += `Parmi les demi-pensionnaires de ce lycée,  $${p1}$ $\\%$ sont des garçons.<br>` }
            texte += ' En utilisant les événements $F$ et $R$, compléter avec une probabilité :'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $= ${texNombre(p2, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur l'ensemble des demi-pensionnaires.<br>
            $P_{R}(\\overline{F})=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['P_{R}({\\overline{F}})', 'p_{R}({\\overline{F}})', 'P{_R}({\\overline{F}})', 'P_R({\\overline{F}})', 'P{_R}({\\overline{F}})'])
          }
          break

        case 2:
          p1 = randint(80, 95)
          p2 = new Decimal(p1).div(100)
          p3 = randint(2, 7)
          p4 = new Decimal(p3).div(100)
          p5 = randint(35, 55)
          p6 = new Decimal(p5).div(100)
          choix = choice(['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'])//,
          texte = `Dans un stock de pommes provenant de deux fournisseurs (A et B), on prend au hasard une pomme. On note :<br>
            A : « La pomme provient du fournisseur A » ;<br>
            C : « La pomme est commercialisable ». <br>
        `
          if (choix === 'q1') {
            if (choice([true, false])) {
              texte += ` $${p1}$ $\\%$ des pommes provenant du fournisseur A sont commercialisables.<br>
              En utilisant les événements $A$ et $C$, compléter avec une probabilité :`
            } else {
              texte += `Parmi les pommes provenant du fournisseur A,  $${p1}$ $\\%$  sont commercialisables.<br>
              En utilisant les événements $A$ et $C$, compléter avec une probabilité :`
            }
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p2, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des pommes du fournisseur A.<br>
              $P_A(C)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['P_{A}({C})', 'P_{A}(C)', 'p_{A}({C})', 'p_{A}(C)'])
          }
          if (choix === 'q2') {
            if (choice([true, false])) {
              texte += ` $${p3}$ $\\%$ des pommes provenant du fournisseur A ne sont pas commercialisables.<br>
              En utilisant les événements $A$ et $C$, compléter avec une probabilité :`
            } else {
              texte += `Parmi les pommes provenant du fournisseur A,  $${p3}$ $\\%$ ne sont pas  commercialisables.<br>
              En utilisant les événements $A$ et $C$, compléter avec une probabilité :`
            }
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p4, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des pommes du fournisseur A.<br>
              $P_A(\\overline{C})=${texNombre(p4, 2)}$.`
            setReponse(this, i, ['P_{A}({\\overline{C}})', 'p_{A}({\\overline{C}})', 'P_A({\\overline{C}})', 'P{_A}({\\overline{C}})', 'p_A({\\overline{C}})', 'p{_A}({\\overline{C}})'])
          }
          if (choix === 'q3') {
            if (choice([true, false])) {
              texte += ` $${p5}$ $\\%$ des  pommes commercialisables proviennent du fournisseur A.<br>
              En utilisant les événements $A$ et $C$, compléter avec une probabilité :`
            } else {
              texte += `Parmi les pommes commercialisables,  $${p5}$ $\\%$  proviennent du fournisseur A.<br>
              En utilisant les événements $A$ et $C$, compléter avec une probabilité :`
            }
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p6, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des pommes commercialisables.<br>
              $P_C(A)=${texNombre(p6, 2)}$.`
            setReponse(this, i, ['P_{C}({A})', 'P_{C}(A)', 'p_{C}({A})', 'p_{C}(A)'])
          }
          if (choix === 'q4') {
            if (choice([true, false])) {
              texte += ` $${p5}$ $\\%$ des pommes non commercialisables proviennent du fournisseur B.<br>
              En utilisant les événements $A$ et $C$, compléter avec une probabilité :`
            } else {
              texte += `Parmi les pommes non commercialisables,  $${p5}$ $\\%$ proviennent du fournisseur B.<br>
              En utilisant les événements $A$ et $C$, compléter avec une probabilité :`
            }
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p6, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des pommes non commercialisables.<br>
              $P_{\\overline{C}}(\\overline{A})=${texNombre(p6, 2)}$.`
            setReponse(this, i, ['P_{\\overline{C}}({\\overline{A}})', 'p_{\\overline{C}}({\\overline{A}})', 'P_\\overline{C}({\\overline{A}})', 'P{_\\overline{C}}({\\overline{A}})', 'p_\\overline{C}({\\overline{A}})', 'p{_\\overline{C}}({\\overline{A}})'])
          }
          if (choix === 'q5') {
            texte += ` $${p5}$ $\\%$ des pommes  proviennent du fournisseur A et sont commercialisables.<br>
              En utilisant les événements $A$ et $C$, compléter avec une probabilité :`

            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p6, 2)}$`
            texteCorr = `Il ne s'agit pas  d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des pommes.<br>
              $P(A\\cap C)=${texNombre(p6, 2)}$.`
            setReponse(this, i, ['P(A\\bigcap C)', 'p(A\\bigcap C)', 'P(C\\bigcap A)', 'p(C\\bigcap A)'])
          }

          if (choix === 'q6') {
            texte += ` $${p5}$ $\\%$ des pommes  proviennent du fournisseur B et sont commercialisables.<br>
            En utilisant les événements $A$ et $C$, compléter avec une probabilité :`

            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p6, 2)}$`
            texteCorr = `Il ne s'agit pas  d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des pommes.<br>
            $P(\\overline{A}\\cap C)=${texNombre(p6, 2)}$.`
            setReponse(this, i, ['P(\\overline{A}\\bigcap C)', 'p(\\overline{A}\\bigcap C)', 'P(C\\bigcap\\overline{A})', 'P(C\\bigcap\\overline{A})'])
          }
          if (choix === 'q7') {
            texte += ` $${p5}$ $\\%$ des pommes  proviennent du fournisseur A et ne sont pas commercialisables.<br>
          En utilisant les événements $A$ et $C$, compléter avec une probabilité :`

            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p6, 2)}$`
            texteCorr = `Il ne s'agit pas  d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des pommes.<br>
          $P(A\\cap \\overline{C})=${texNombre(p6, 2)}$.`
            setReponse(this, i, ['P(\\overline{C}\\bigcap A)', 'p(\\overline{C}\\bigcap A)', 'P(A\\bigcap\\overline{C})', 'P(A\\bigcap\\overline{C})'])
          }
          break

        case 3:
          p1 = randint(90, 99)
          p2 = new Decimal(p1).div(100)
          p3 = randint(2, 7)
          p4 = new Decimal(p3).div(100)
          p5 = randint(35, 55)
          p6 = new Decimal(p5).div(100)
          choix = choice(['q1', 'q2', 'q3', 'q4', 'q5', 'q6'])//,
          texte = `Un test est utilisé pour dépister une maladie. On choisit une personne  au hasard. On note :<br>
              M : « La personne est malade » ;<br>
              T : « Le test est positif ». <br>
          `
          if (choix === 'q1') {
            if (choice([true, false])) {
              texte += ` Si une personne est  malade, le test est positif dans $${p1}$ $\\%$ des cas.<br>
                En utilisant les événements $M$ et $T$, compléter avec une probabilité :`
            } else {
              texte += `Parmi les personnes malades,  $${p1}$ $\\%$  ont un test positif.<br>
                En utilisant les événements $M$ et $T$, compléter avec une probabilité :`
            }
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p2, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des personnes malades.<br>
                $P_M(T)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['P_{M}({T})', 'P_{M}(T)', 'p_{M}({T})', 'p_{M}(T)'])
          }
          if (choix === 'q2') {
            if (choice([true, false])) {
              texte += ` Si une personne n'est pas malade, le test est négatif dans $${p1}$ $\\%$ des cas.<br>
                En utilisant les événements $M$ et $T$, compléter avec une probabilité :`
            } else {
              texte += ` $${p1}$ $\\%$ des personnes non malades ont un test négatif.<br>
                En utilisant les événements $M$ et $T$, compléter avec une probabilité :`
            }
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p2, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des personnes non malades.<br>
                $P_{\\overline{M}}(\\overline{T})=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['P_{\\overline{M}}({\\overline{T}})', 'P_{\\overline{M}}(\\overline{T})', 'p_{\\overline{M}}({\\overline{T}})', 'p_{\\overline{M}}(\\overline{T})'])
          }
          if (choix === 'q3') {
            if (choice([true, false])) {
              texte += ` Parmi  les tests  positifs,  $${p3}$ $\\%$ des personnes ne sont pas malades.<br>
                En utilisant les événements $M$ et $T$, compléter avec une probabilité :`
            } else {
              texte += `$${p3}$ $\\%$ des personnes testées positives ne sont pas malades.<br>
                En utilisant les événements $M$ et $T$, compléter avec une probabilité :`
            }
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p2, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des tests positifs.<br>
                $P_{T}(\\overline{M})=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['P_{T}({\\overline{M}})', 'p_{T}({\\overline{M}})', 'P_T({\\overline{M}})', 'P{_T}({\\overline{M}})', 'p_T({\\overline{M}})', 'p{_T}({\\overline{M}})'])
          }
          if (choix === 'q4') {
            if (choice([true, false])) {
              texte += ` Parmi  les tests  négatifs,  $${p3}$ $\\%$ des personnes sont malades.<br>
                En utilisant les événements $M$ et $T$, compléter avec une probabilité :`
            } else {
              texte += `Si le test est négatif,  la personne est malade dans $${p3}$ $\\%$  des cas.<br>
                En utilisant les événements $M$ et $T$, compléter avec une probabilité :`
            }
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p4, 2)}$`
            texteCorr = `Il s'agit d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des tests positifs.<br>
                $P_{\\overline{T}}(M)=${texNombre(p4, 2)}$.`
            setReponse(this, i, ['P_{\\overline{T}}({M})', 'p_{\\overline{T}}({M})', 'P_\\overline{T}({M})', 'P{_\\overline{T}}({M})', 'p_\\overline{T}({M})', 'p{_\\overline{T}}({M})'])
          }
          if (choix === 'q5') {
            texte += ` Dans $${p3}$ $\\%$ des cas, le test est positif et la personne est malade.<br>
                En utilisant les événements $T$ et $M$, compléter avec une probabilité :`

            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p4, 2)}$`
            texteCorr = `Il ne s'agit pas  d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des personnes.<br>
                $P(T\\cap M)=${texNombre(p6, 2)}$.`
            setReponse(this, i, ['P(M\\bigcap T)', 'p(M\\bigcap T)', 'P(T\\bigcap M)', 'p(T\\bigcap M)'])
          }

          if (choix === 'q6') {
            texte += `  $${p3}$ $\\%$ des personnes ont un test positif alors qu'elles ne sont pas malades.<br>
                En utilisant les événements $T$ et $M$, compléter avec une probabilité :`

            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p4, 2)}$`
            texteCorr = `Il ne s'agit pas  d'une probabilité conditionnelle. Le pourcentage s'applique sur  l'ensemble des personnes.<br>
                $P(T\\cap \\overline{M})=${texNombre(p4, 2)}$.`
            setReponse(this, i, ['P(\\overline{M}\\bigcap T)', 'p(\\overline{M}\\bigcap T)', 'P(T\\bigcap \\overline{M})', 'p(T\\bigcap \\overline{M})'])
          }

          break
      }
      if (this.questionJamaisPosee(i, p1, p2, p3, p4, p5, p6)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
