<script lang="ts">
  import SearchById from "./SearchById.svelte"
  import { displayOptions, exercicesParams } from "../store"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  export let sideMenuVisible: boolean
  let isListVisible: boolean
  function toggleSideList() {
    if ($exercicesParams.length > 0) {
      isListVisible = !sideMenuVisible
      dispatch("sideMenuChange", {
        isListVisible,
      })
    }
  }

  function fullScreen() {
    displayOptions.update((params) => {
      params.v = "l"
      return params
    })
  }
</script>

<h1 class="py-2 px-4 text-white text-2xl font-bold  bg-coopmaths-light flex items-center">
  <button type="button" on:click={toggleSideList}><i class="bx bx-menu-alt-left" /></button>
  <div class="inline-flex justify-between items-center text-gray-600 font-normal text-xs ml-8 w-15 max-h-15 w-full">
    <SearchById />
    <button
      type="button"
      on:click={() => {
        $exercicesParams.length = 0
      }}><i class="bx text-white bx-sm bx-trash" /></button
    >
  </div>
</h1>
