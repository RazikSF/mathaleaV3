<script lang="ts">
 import Exercice from "./exercice/Exercice.svelte"
 import NavBar from "./header/NavBar.svelte"
 import Footer from "./Footer.svelte"
 import Header2 from "./header2/Header2.svelte"
 import NiveauListeExos from "./sidebar/NiveauListeExos.svelte"
 import { exercicesParams, displayOptions } from "./store"
 import codeList from "../json/codeToLevelList.json"
 import referentiel from "../json/referentiel2022.json"
 import referentielStatic from "../json/referentielStatic.json"
 import { Mathalea } from "../Mathalea"
 import { flip } from "svelte/animate"
 import { onMount } from "svelte"
 import { toMap } from "./utils/toMap"
 import { ElementButtonInstrumenpoche, ElementInstrumenpoche } from "../modules/ElementInstrumenpoche"

 import { context } from "../modules/context"
 import SearchExercice from "./sidebar/SearchExercice.svelte"

 context.versionMathalea = 3

 customElements.define("alea-instrumenpoche", ElementInstrumenpoche)
 customElements.define("alea-buttoninstrumenpoche", ElementButtonInstrumenpoche)

 let isNavBarVisible = true
 let filtre = "all"

 // ToFix fonction à lier avec bugsnag
 window.notify = (arg) => console.log(arg)

 // Récupération des informations de l'URL
 let isInitialUrlHandled = false
 function urlToDisplay() {
     const urlOptions = Mathalea.loadExercicesFromUrl()
     displayOptions.update(() => {
         return urlOptions
     })
     isInitialUrlHandled = true
 }
 onMount(urlToDisplay)
 addEventListener("popstate", urlToDisplay)

 // Mise à jour de l'URL dès que l'on change exercicesParams (sauf pour l'URL d'arrivée sur la page)
 $: {
     if (isInitialUrlHandled) Mathalea.updateUrl($exercicesParams)
     if ($displayOptions.v === "l") {
         isSideMenuVisible = false
         isNavBarVisible = false
     } else if ($displayOptions.v === "l2") {
         isSideMenuVisible = false
         isNavBarVisible = true
     } else if ($displayOptions.v === "eleve") {
         isSideMenuVisible = false
         isNavBarVisible = false
     } else {
         isSideMenuVisible = true
         isNavBarVisible = true
     }
     // Evènement indispensable pour pointCliquable par exemple
     const exercicesAffiches = new window.Event("exercicesAffiches", {
         bubbles: true,
     })
     document.dispatchEvent(exercicesAffiches)
 }

 // Réorganisation du référentiel
 // Suppression de la rubrique calcul mental
 // On renomme les chapitres pour la partie statique
 let filteredReferentiel = { ...referentiel, static: { ...referentielStatic } }
 delete filteredReferentiel["Calcul mental"]
 filteredReferentiel["3e"]["Brevet des collèges par thèmes - APMEP"] = filteredReferentiel["static"]["Brevet des collèges par thèmes - APMEP"]
 filteredReferentiel["CRPE"]["Concours 2022"] = filteredReferentiel["static"]["CRPE (2022) par année"]
 filteredReferentiel["CRPE"]["Concours 2022 - Par thèmes"] = filteredReferentiel["static"]["CRPE (2022) par thèmes"]
 filteredReferentiel["CRPE"]["CRPE (2015-2019) par thèmes - COPIRELEM"] = filteredReferentiel["static"]["CRPE (2015-2019) par thèmes - COPIRELEM"]
 filteredReferentiel["CRPE"]["CRPE (2015-2019) par année - COPIRELEM"] = filteredReferentiel["static"]["CRPE (2015-2019) par année - COPIRELEM"]
 let referentielMap = toMap(filteredReferentiel)
 let arrayReferentielFiltre = Array.from(referentielMap, ([key, obj]) => ({ key, obj }))

 function updateReferentiel() {
     let itemsAccepted
     if (filtre === "college") {
         itemsAccepted = ["6e", "5e", "4e", "3e", "Calcul mental"]
     } else if (filtre === "lycee") {
         itemsAccepted = ["Seconde", "Première", "Première Technologique", "Terminale exper"]
     } else if (filtre === "crpe") {
         itemsAccepted = ["CRPE"]
     }

     if (filtre === "all") {
         filteredReferentiel = { ...referentiel, static: { ...referentielStatic } }
     } else {
         filteredReferentiel = Object.keys(referentiel)
                                     .filter((key) => itemsAccepted.includes(key))
                                     .reduce((obj, key) => {
                                         return {
                                             ...obj,
                                             [key]: referentiel[key],
                                         }
                                     }, {})
     }
     referentielMap = toMap(filteredReferentiel)
     arrayReferentielFiltre = Array.from(referentielMap, ([key, obj]) => ({ key, obj }))
 }

 /**
  * Retrouve le titre d'un niveau basé sur son
  * @param levelId
  */
 function codeToLevelTitle(code: string) {
     if (codeList[code]) {
         return codeList[code]
     } else {
         return code
     }
 }

 /*---------------------------------------------------------------------
    Gestion du menu de recherche des exercices
    ---------------------------------------------------------------------*/
 let nbExercisesInList: number
 let isSideMenuVisible: boolean = false
 $: {
     nbExercisesInList = $exercicesParams.length
     if (nbExercisesInList === 0) {
         isSideMenuVisible = true
         isNavBarVisible = true
     }
 }
 const searchOptions = [
     {
         value: "list",
         label: "Liste",
     },
     {
         value: "theme",
         label: "Themes",
     },
 ]
 let searchOption = "list"
 function handleSideMenu(event: CustomEvent) {
     isSideMenuVisible = event.detail.isListVisible
     if (!isSideMenuVisible) {
         displayOptions.update((params) => {
             params.v = "l2"
             return params
         })
     } else {
         displayOptions.update((params) => {
             delete params.v
             return params
         })
     }
 }

 function quitFullScreen() {
     displayOptions.update((params) => {
         delete params.v
         return params
     })
 }

 function fullScreen() {
     displayOptions.update((params) => {
         params.v = "l"
         return params
     })
 }

 /**
  * Gestion du redimentionnement des colonnes
  */
 let expanding = null
 // let sidebarWidth = 600
 let sidebarWidth = 30
 function stopResizing() {
     expanding = null
 }

 function startResizing(type, event) {
     expanding = type
 }

 function resizing(event) {
     if (!expanding) return
     sidebarWidth = event.pageX
 }

 function newDataForAll () {
     const newDataForAll = new window.Event("newDataForAll", {
         bubbles: true,
     })
     document.dispatchEvent(newDataForAll)
 }

 function urlV2(vue) {
     const params = new URLSearchParams(document.location.search)
     if (vue) params.set("v", vue)
     params.delete("uuid")
     return ("https://coopmaths.fr/mathalea.html?" + params.toString()).replaceAll("id=", "ex=").replaceAll("&s", ",s").replaceAll("&n", ",n")
 }
</script>

<svelte:window on:mouseup={stopResizing} />
<div class="h-screen  scrollbar-hide">
  <!-- <Header /> -->
  {#if isNavBarVisible}
    <NavBar />
    <Header2 sideMenuVisible={isSideMenuVisible} on:sideMenuChange={handleSideMenu} />
  {/if}
  <!-- Gestion du mode sombre -->
  <main class="flex h-full dark:bg-white dark:text-slate-800" on:mousemove={resizing}>
    <!-- side menu -->
    {#if isSideMenuVisible || nbExercisesInList === 0}
      <aside style="width:{sidebarWidth}%; background: #E5E3E4;" class="flex flex-col   p-4  overflow-hidden h-full transition-width transition-slowest ease duration-500 border-none">
        <div class="flex-none block overflow-y-scroll overscroll-auto h-full">
          <SearchExercice referentiel={filteredReferentiel} />
          <div class="flex flex-auto mb-2 mx-2 text-slate-400" style = "margin-top: 20px;">
            <select style="color: white; font-weight: bold; font-size: 16px; border: 0px solid #E5E3E4; border-radius: 5px; margin-bottom: 20px; margin-top: 5px; text-align: center;  margin-left: auto; margin-right: auto; display: block; width: 200px;  background-color: #5BA199;" class="border-transparent focus:outline-0 focus:ring-0 w-full" bind:value={filtre} on:change={updateReferentiel}>
                <!-- <option value="all">Tous les exercices <iconify-icon icon="bx:chevron-down" color="white"></iconify-icon></option> -->
                <option value="all">Tous les exercices <box-icon name="chevron-down" color="white"></box-icon></option>
              <option value="college">Collège</option>
              <option value="lycee">Lycée</option>
              <option pvalue="crpe">CRPE</option>
            </select>
          </div>
          <ul>
            {#each arrayReferentielFiltre as item}
              <li>
                <NiveauListeExos nestedLevelCount={1} pathToThisNode={[item.key]} levelTitle={codeToLevelTitle(item.key)} items={item.obj} />
              </li>
            {/each}
          </ul>
        </div>
      </aside>
      <!-- drag bar -->
      <!-- <div id="dragbar" class="flex w-[4px] bg-coopmaths-lightest hover:bg-coopmaths-lightest hover:cursor-col-resize" on:mousedown={startResizing.bind(this, "moving")} /> -->
    {/if}
    <!-- content -->
    {#if $exercicesParams.length !== 0}
      <div class="flex-1 flex flex-col p-6 overflow-hidden h-full">
        {#if $displayOptions.v === "l"}
          <div class="flex flex-row justify-end items-center">
            <button type="button" on:click={quitFullScreen}><i class="bx ml-2 bx-sm bx-exit-fullscreen" /></button>
          </div>
        {/if}
        {#if $displayOptions.v !== "l"}
          <div class="flex flex-row justify-center items-center space-x-2 text-slate-500 py-4">
              <!-- <span class="uppercase text-[20px] px-2">Exports</span> -->
              <div class="bg-coopmaths-lightest p-2">
              <button
                  type="button"
                  class="hover:text-coopmaths-dark"
                  title="Nouvelles données"
                  on:click={newDataForAll} >
                  <span class="text-[22px] px-1"><i class="fa-solid fa-arrows-rotate"></i></span>
            </button>
            <!-- <button type="button" class="hover:text-coopmaths-dark"><i class="bx bx-sm bx-code-curly" /></button> -->
            <button
              type="button"
              class="hover:text-coopmaths-dark"
              title="Diaporama"
              on:click={() =>
                displayOptions.update((params) => {
                  params.v = "diaporama"
                  return params
                })}>
                <span class="text-[22px] px-1"><i class="fab-sharp fa-solid fa-display"></i></span>
            </button>
            <button
                type="button"
                class="hover:text-coopmaths-dark"
                title="Exporter en LaTeX/PDF"
                on:click={() => {
                         document.location.href = urlV2('latex')
                         }}>
                <!-- <span class="text-gray-600 text-[24px]">/ LaTeX / </span> -->
                <span class="text-[22px] px-1"><i class="fab-sharp fa-solid fa-file-pdf"></i></span>
                <!-- <i class="bx bx-sm bx-file" /> -->
            </button>
            <button
                type="button"
                class="hover:text-coopmaths-dark"
                title="Exporter vers Moodle"
                on:click={() => {
                         document.location.href = urlV2('moodle')
                         }}>
                <!-- <span class="text-gray-600 text-[24px]">Moodle / </span> -->
                <span class="text-[22px] px-1"><i class="fab-sharp fa-solid fa-building-columns"></i></span>
                <i class="bx bx-sm bx-graduation" />
            </button>
            <button
                type="button"
                class="hover:text-coopmaths-dark"
                title="Créer un QCM de type AMC"
                on:click={() => {
                         document.location.href = urlV2('amc')
                         }}>
                <!-- <span class="text-gray-600 text-[24px]">QCM / </span> -->
                <span class="text-[22px] px-1"><i class="fab-sharp fa-solid fa-list-check"></i></span>
                <!-- <i class="bx bx-sm bx-select-multiple" /> -->
            </button>
            <button
                type="button"
                class="hover:text-coopmaths-dark"
                title="Afficher les exericces en plein écran"
                on:click={() =>
                         displayOptions.update((params) => {
                             params.v = "l"
                             return params
                         })}>
                <span class="text-[22px] px-1"><i class="fa-solid fa-expand"></i></span>
            </button>
            <button
                type="button"
                class="hover:text-coopmaths-dark"
                title="Supprimer tous les exercices"
                on:click={() => {
                         $exercicesParams.length = 0
                         }}>
                <!-- <i class="bx text-white bx-sm bx-trash" /> -->
                <span class="text-[22px] px-1"><i class="fab-sharp fa-solid fa-trash-can"></i></span>
            </button>
              </div>
              </div>
        {/if}
        <div class="flex-1 overflow-y-scroll overscroll-auto">
          {#each $exercicesParams as paramsExercice, i (paramsExercice)}
            <div animate:flip={{ duration: (d) => 30 * Math.sqrt(d) }}>
              <Exercice {paramsExercice} indiceExercice={i} indiceLastExercice={$exercicesParams.length} />
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <!-- <div class="flex flex-col text-slate-400 px-10 py-10"> -->
      <div class="flex-1 flex flex-col p-6 overflow-hidden h-full" style="color: #777777;">
          <h1 style="color: #469597; font-size: 36px; text-align: center;" class="py-4">Bienvenue sur Coopmaths !</h1>
      <div class="text-[18px]">
          <p class=" px-10 py-5">Vous pouvez sélectionner des exercices en cliquant sur leur intitulé via l'arborescence ci-contre ou les recherchant par thème ou par identifiant.</p>
          <p class="px-10">À chaque fois qu'un exercice est sélectionné, il vient s'ajouter à la liste des précédents sur cette partie droite de l'écran, en lieu et place du texte que vous lisez présentement.</p>
          <p class="px-10 py-3">Une fois votre selection terminée, vous pouvez modifier l'ordre des exercices, modifier certains paramètres (comme le nombre de questions), générer de nouvelles données puis choisir le type d'export suivant l'usage que vous souhaitez faire de cette nouvelle fiche d'exercices :</p>
          <ul style="list-style: square; margin-top: 5px; margin-left:20px;" class="px-20">
                  <li>lien vers une page Web ;</li>
                  <li>diaporama ;</li>
                  <li>code LaTeX ou PDF via LaTeX (en passant par Overleaf) ;</li>
                  <li>Moodle ;</li>
                  <li>QCM Auto Multiple Choice.</li>
              </ul>
              <p class="px-10 py-3">Il est également possible de créer des évaluations personnalisées ou à la carte. N'hésitez pas à parcourir nos tutoriels pour plus de détails.</p>
              <p class="px-10">Bonne navigation !</p>
      </div>
      </div>
    {/if}
  </main>
  <!-- Modals ne sont pas utilisés pour le moment
       <Modals>
       <div slot="backdrop" class="backdrop" on:click={closeModal} />
       </Modals> -->
  <Footer />
</div>

<style>
</style>
