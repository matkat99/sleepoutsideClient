<script lang="ts">
  import { onMount } from "svelte";
  import { getProducts } from "../productData.mts";
  import ProductSummary from "./ProductSummary.svelte";
  import type { Product } from "../types.mts";

  // this is how we make a prop in svelte
  let { category } = $props();
  let products = $state([]);

  async function init() {
    const data = await getProducts(category);
    products = data.results as Product;
  }

  onMount(() => {
    init();
  });
</script>

<h2>Top Products: {category}</h2>

<ul class="product-list">
  {#each products as product}
    <li class="product-card">
      <ProductSummary {product} />
    </li>
  {/each}
</ul>
