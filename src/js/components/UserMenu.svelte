<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import Login from "./Login.svelte";
  import Profile from "./Profile.svelte";

  import { logout } from "../auth.svelte";
  import { setClick } from "../utils.mts";
  import { userStore } from "../auth.svelte";

  $inspect(userStore);
  export function openUserMenu(selector: string) {
    setClick(selector, (e: Event) => {
      e.stopPropagation();
      const el = document.querySelector(".user__menu");
      el?.classList.toggle("open");
    });
    setClick("body", () => {
      const openMenus = document.querySelectorAll(".open");
      openMenus.forEach((el) => {
        el?.classList.remove("open");
      });
    });
  }

  function logoutHandler() {
    logout();
  }
</script>

<div class="user">
  {#if userStore.isLoggedIn}
    <span>{userStore.user?.name}</span>
  {/if}

  <button
    class="user__button"
    aria-label="user management"
    title="User Management"
    popovertarget="userMenu"
    onclick={() => openUserMenu(".user__button")}
  >
    <img src="/images/noun-hiker.svg" alt="user icon" />
  </button>
  <nav class="user__menu" id="userMenu">
    {#if !userStore.isLoggedIn}
      <Dialog label="Login"><Login isDialog={true} /></Dialog>
    {:else}
      <button class="link-style-button" onclick={logoutHandler}>Logout</button>
      <!-- <Dialog label="Profile"><Profile /></Dialog>
        -->
      <a href="/profile/index.html">Profile</a>
      <a href="#">Orders</a>
    {/if}
  </nav>
</div>

<style>
  .user {
    display: flex;
    align-items: flex-end;
  }
  span {
    margin-right: 0.5em;
  }
</style>
