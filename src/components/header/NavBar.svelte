<script>
  import { displayOptions } from "../store"

  import NavBarMenu from "./NavBarMenu.svelte"
  let isNavBarVisible = false
  const menus = {
    mathalea: {
      titre: "MathAléa",
      id: "mathalea",
      entrees: [
        "Comment utiliser MathAléa",
        "Évaluations personnalisées",
        "Évaluations à la carte",
        "Exporter en PDF via LaTeX",
        "Exporter en Moodle",
        "Créer un QCM de type AMC",
        "Programmation de figures géométriques",
        "Animations avec des instruments de géométrie",
        "Outils pour le professeur",
      ],
      actions: [
        "/",
        "https://coopmaths.fr/mathalea_tuto/",
        () => {
          document.location.href = urlV2("latex")
        },
        () => {
          document.location.href = urlV2("moodle")
        },
        "https://coopmaths.fr/mathalea2d.html",
        "https://coopmaths.fr/mathalea2iep.html",
        "https://coopmaths.fr/mathalea.html?filtre=outils",
        "/",
        "/",
      ],
      isMenuOpen: false,
    },
    referentiels: {
      titre: "Coopmaths",
      id: "classes",
      // entrees: ["Sixième", "Cinquième", "Quatrième", "Troisième", "Seconde", "CRPE"],
      entrees: ["Présentation", "Actualités", "Blog"],
      actions: ["https://coopmaths.fr/6e", "https://coopmaths.fr/5e", "https://coopmaths.fr/4e", "https://coopmaths.fr/3e", "https://coopmaths.fr/2e", "https://coopmaths.fr/crpe"],
      isMenuOpen: false,
    },
    liensUtiles: {
      titre: "Liens utiles",
      id: "liens",
      entrees: ["Calcul mental", "Sesamath", "APMEP"],
      actions: ["https://coopmaths.fr/calculmental/", "https://www.sesamath.net/", "https://www.apmep.fr/"],
      isMenuOpen: false,
    },
    aPropos: {
      // titre: "À Propos",
      titre: "À propos",
      id: "apropos",
      entrees: ["Objectifs généraux", "Nous contacter", "Documentation pour les développeurs"],
      actions: ["https://coopmaths.fr/a_propos/", "mailto:contact@coopmaths.fr", "https://coopmaths.fr/documentation"],
      isMenuOpen: false,
    },
    // export: {
    //   titre: "",
    //   id: "export",
    //   entrees: ["Plein écran", "Plein écran élève", "Diaporama", "Lien", "LaTeX", "Moodle", "AMC"],
    //   actions: [
    //     () =>
    //       displayOptions.update((params) => {
    //         params.v = "l"
    //         return params
    //       }),
    //     () =>
    //       displayOptions.update((params) => {
    //         params.v = "eleve"
    //         return params
    //       }),
    //     () =>
    //       displayOptions.update((params) => {
    //         params.v = "diaporama"
    //         return params
    //       }), // () => {document.location.href = urlV2('diap')},
    //     () => {
    //       alert("Non disponible")
    //     },
    //     () => {
    //       document.location.href = urlV2("latex")
    //     },
    //     () => {
    //       document.location.href = urlV2("moodle")
    //     },
    //     () => {
    //       document.location.href = urlV2("amc")
    //     },
    //   ],
    //   isMenuOpen: false,
    // },
  }

  function urlV2(vue) {
    const params = new URLSearchParams(document.location.search)
    if (vue) params.set("v", vue)
    params.delete("uuid")
    return ("https://coopmaths.fr/mathalea.html?" + params.toString()).replaceAll("id=", "ex=").replaceAll("&s", ",s").replaceAll("&n", ",n")
  }
</script>

<nav class="h-16 bg-coopmaths z-50">
  <!-- container -->
  <div class="h-16 flex flex-wrap w-full mx-auto lg:space-x-6 lg:items-end">
    <!-- bouton menu -->
    <div class="h-16 flex flex-row justify-start space-x-2">
      <button class="lg:hidden inline-flex ml-auto items-center justify-center text-white font-bold text-xl" on:click={() => (isNavBarVisible = !isNavBarVisible)}>
        <i class="bx bx-menu" />
      </button>
      <!-- logo -->
      <!-- <a href={"#"} class="inline-flex p-2 py-4 font-bold text-2xl font-logo1 text-white uppercase ">Coopmaths</a> -->
      <a href={"#"} class="inline-flex p-2 py-4 font-bold text-2xl font-logo1 text-white"><span class="uppercase">Coopmaths&nbsp;&nbsp;&nbsp;</span> <span style="color: #E5E3E4;"> >&nbsp;&nbsp; MathAléa</span></a>
    </div>
    <!-- menu -->
    <div class="flex flex-col mt-2 justify-end lg:inline-flex lg:grow lg:flex-row lg:mt-0 {isNavBarVisible ? 'flex' : 'hidden'}">
      <ul class="flex flex-col space-y-2 lg:flex-row lg:space-y-0">
        <!-- <li>
             <a href={"https://coopmaths.fr/calculmental/"} class="h-16 bg-coopmaths hover:bg-coopmaths-light text-white text-xl font-extrabold relative block py-4 px-4  items-center"><div style="padding-top:2px;"><span>Calcul mental</span><div></a>
             </li> -->
        <li>
          <NavBarMenu {...menus.mathalea} bind:isNavBarVisible />
        </li>
        <li>
          <!-- <NavBarMenu {...menus.referentiels} bind:isNavBarVisible /> -->
        </li>
        <li>
          <NavBarMenu {...menus.liensUtiles} bind:isNavBarVisible />
        </li>
        <li>
          <NavBarMenu {...menus.aPropos} bind:isNavBarVisible />
        </li>
      </ul>
      <!-- <div class="flex flex-1 pt-6 lg:pt-0 items-center justify-start lg:justify-end">
           <NavBarMenu {...menus.export} bind:isNavBarVisible />
           </div> -->
    </div>
  </div>
</nav>

<style></style>
