<script lang="ts">
  import { login, userStore } from "../auth.svelte";
  import { setLocalStorage } from "../utils.mts";
  let { isDialog = true } = $props();
  let email = "";
  let password = "";
  // this is a state rune because we need the UI to update if it changes.
  let errorMessage = $state("");
  async function loginHandler(e: SubmitEvent) {
    e.preventDefault();
    try {
      const theForm = e.target as HTMLFormElement;
      const results = await login(email, password);
      userStore.user = results.user;
      userStore.isLoggedIn = true;
      userStore.token = results.token;
      setLocalStorage("so-user", userStore);
      // console.log(results);
      if (e.target && isDialog) {
        const inDialog = theForm.closest("dialog");
        if (inDialog) inDialog.close();
      }
    } catch (error: any) {
      console.log(error);
      errorMessage = error.message;
    }
  }
</script>

<form onsubmit={loginHandler}>
  <label for="email">Email</label>
  <input type="text" id="email" bind:value={email} />
  <label for="password">Password</label>
  <input type="password" id="password" bind:value={password} />
  <p class="error">{errorMessage}</p>
  <button>Login</button>
</form>
<button class="link-style-button">Register</button>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2em;
    line-height: 1;
  }
  input {
    padding: 0.5rem;
    border-radius: 4px;

    font-size: 20px;
  }
</style>
