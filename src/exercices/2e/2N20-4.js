import PremierOuPas from '../3e/3A11.js'
export const titre = 'Primalité ou pas'
export const dateDeModifImportante = '29/10/2021'
export { interactifReady, interactifType, amcReady, amcType } from '../3e/3A11.js'
/**
 * Clone de 3A10 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */

export const uuid = '277bf'
export const ref = '2N20-4'
export default function PremierOuPas2nde () {
  PremierOuPas.call(this)
  this.sup = 1
  this.sup2 = false
}
