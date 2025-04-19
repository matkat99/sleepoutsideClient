<script>
  let { label, children } = $props();
  let dialog;
  function close() {
    dialog.close();
    dialog.setAttribute("aria-hidden", true);
  }

  function open() {
    console.log(dialog);
    dialog.showModal();
    dialog.setAttribute("aria-hidden", false);
  }
</script>

<button class="link-style-button" onclick={open}>{label}</button>

<dialog bind:this={dialog} class="modal">
  <button onclick={close}>X</button>
  {@render children()}
</dialog>

<style>
  dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30rem;
    border-radius: 1rem;
    background-color: white;
  }
  dialog button {
    position: absolute;
    right: 16px;
    cursor: pointer;
    background: transparent;
    padding: 0;
    color: black;
  }
  ::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
  /* button {
    background: transparent;
    padding: 0;
    color: black;
  } */
</style>
