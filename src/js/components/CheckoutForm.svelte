<script lang="ts">
  import {
    getLocalStorage,
    setLocalStorage,
    formDataToJSON,
    removeAllAlerts,
    alertMessage
  } from "../utils.mjs";
  import { submitOrder } from "../ordersService.mjs";
  import { onMount } from "svelte";
  import type { Order } from "../types.mts";
  import { userStore } from "../auth.svelte";
  // props
  let { key = "" } = $props();

  // state vars
  let list = $state([]);
  let itemTotal = $state(0);
  let shipping = $state(0);
  let tax = $state(0);
  let orderTotal = $state(0);

  // initial setup
  const init = function () {
    list = getLocalStorage(key);
    calculateItemSummary();
  };
  // calculate order subtotal from the cart items
  const calculateItemSummary = function () {
    // calculate the total of all the items in the cart. If you have implemented quantity make sure to take that into account.
    const amounts = list.map((item) => item.finalPrice);
    itemTotal = amounts.reduce((sum, item) => sum + item);
  };
  // calculate the shipping, tax, and orderTotal
  const calculateOrdertotal = function () {
    shipping = 10.0 + (list.length - 1) * 2;
    tax = (itemTotal * 0.06).toFixed(2);
    orderTotal = (
      parseFloat(itemTotal) +
      parseFloat(shipping) +
      parseFloat(tax)
    ).toFixed(2);
  };
  // transform the current cart contents to a simpler format keeping just the things we need to send to checkout
  const packageItems = function (items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        productId: item.id,
        finalPrice: item.finalPrice,
        price: item.listPrice,
        productName: item.name,
        quantity: 1,
        productImageSrc: item.images.primaryMedium,
        productUrl: item.url,
        productCategory: item.category,
        productColor: item.color,
        productSize: item.size
      };
    });
    return simplifiedItems;
  };
  const handleSubmit = async function (e) {
    e.preventDefault();
    // convert the form into an object
    const json = formDataToJSON(this);
    // build the order,
    const order: Order = {
      name: json.name,
      userId: userStore.user._id,
      shippingAddress: {
        street: json.street,
        city: json.city,
        state: json.state,
        zipCode: json.zip,
        country: "US"
      },

      createdAt: new Date(),
      modifiedAt: new Date(),
      totalAmount: orderTotal,
      status: "pending",
      paymentMethod: "credit card",
      tax,
      shipping,
      orderItems: packageItems(list)
    };

    console.log(order);
    try {
      const { error, data } = await submitOrder(order);
      console.log(data);
      if (error) {
        throw error;
      }
      // clear the cart
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      console.log(err);
      // get rid of any preexisting alerts.
      removeAllAlerts();
      alertMessage(err);
    }
  };
  // initial setup
  onMount(init);
</script>

<form name="checkout" onsubmit={handleSubmit}>
  <fieldset>
    <legend>Shipping</legend>
    <div class="checkout__name">
      <label for="name">Name</label>
      <input id="name" name="name" required />
    </div>
    <div class="checkout__address">
      <label for="street">Street</label>
      <input id="street" name="street" minlength="5" required />
      <label for="city">City</label>
      <input id="city" name="city" required />
      <!-- This should probably be a select with the allowed list of states -->
      <label for="state">State</label>
      <input id="state" name="state" required />
      <label for="zip">Zip</label>
      <input
        id="zip"
        name="zip"
        required
        minlength="5"
        onblur={calculateOrdertotal}
      />
    </div>
  </fieldset>
  <fieldset>
    <legend>Payment</legend>
    <label for="cardNumber">Card number</label>
    <input
      id="cardNumber"
      name="cardNumber"
      required
      placeholder="No spaces or dashes!"
      maxlength="16"
      minlength="16"
    />
    <label for="expiration">Expiration</label>
    <input id="expiration" name="expiration" required placeholder="mm/yy" />
    <label for="code">Security Code</label>
    <input
      id="code"
      name="code"
      required
      placeholder="xxx"
      maxlength="3"
      minlength="3"
    />
  </fieldset>
  <fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <ul>
      <li>
        <label for="cartTotal">Item Subtotal({list.length})</label>
        <input
          id="cartTotal"
          name="cartTotal"
          disabled
          value={"$" + itemTotal}
        />
      </li>
      <li>
        <label for="shipping">Shipping Estimate</label>
        <input
          id="shipping"
          name="shipping"
          disabled
          value={shipping
            ? new Intl.NumberFormat("lookup", {
                minimumFractionDigits: 2,
                style: "currency",
                currency: "USD"
              }).format(shipping)
            : ""}
        />
      </li>
      <li>
        <label for="tax">Tax</label>
        <input id="tax" name="tax" disabled value={tax ? "$" + tax : ""} />
      </li>
      <li>
        <label for="totalAmount"><b>Order Total</b></label>
        <input
          id="totalAmount"
          name="totalAmount"
          disabled
          value={orderTotal ? "$" + orderTotal : ""}
        />
      </li>
    </ul>

    <button id="checkoutSubmit" type="submit">Checkout</button>
  </fieldset>
</form>

<style>
  form {
    max-width: 500px;
    margin: 0 auto;
  }
  * + fieldset {
    margin-top: 1em;
  }
  label {
    display: block;
  }
  input {
    width: 100%;
    font-size: 1.2em;
  }

  .checkout-summary > ul {
    padding-left: 0;
    list-style-type: none;
  }
  .checkout-summary li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .checkout-summary input {
    width: fit-content;
    border: 0;
    text-align: right;
    background-color: transparent;
  }
</style>
