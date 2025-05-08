<script>
  import { getLocalStorage } from "../utils.mjs";

  const cartItems = $state(getLocalStorage("so-cart") || []);
  let total = calculateListTotal(cartItems);

  function calculateListTotal(list) {
    const amounts = list.map((item) => parseFloat(item.finalPrice));
    return amounts.reduce((sum, item) => sum + item, 0);
  }
</script>

<h2>My Cart</h2>
{#if cartItems.length > 0}
  <ul class="product-list">
    {#each cartItems as item}
      <li class="cart-card divider">
        <a
          href="/product_pages/index.html?productid={item.id}"
          class="cart-card__image"
        >
          <img src={item.images.primaryMedium} alt={item.name} />
        </a>
        <a href="../product_pages/index.html?product={item.id}">
          <h2 class="card__name">{item.name}</h2>
        </a>
        <p class="cart-card__color">{item.colors[0].colorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">${item.finalPrice}</p>
      </li>
    {/each}
  </ul>
  <div class="list-footer">
    <a href="/checkout/">Checkout</a>
    <p class="list-total">Total: ${total}</p>
  </div>
{:else}
  <h2>Cart Currently Empty</h2>
{/if}
