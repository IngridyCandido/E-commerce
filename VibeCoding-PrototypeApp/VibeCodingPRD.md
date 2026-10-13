# Product Requirements Document: Fruit Shop Prototype

## 1. Product Summary

Create a static online fruit shop prototype for shoppers to browse products, view product details, build a shopping cart, and simulate placing an order. The client-side web app demonstrates the core shopping flow and is not intended for production use.

## 2. Goals and Non-Goals

### Goals
- Present a catalog of 10 fruit products with a name, description, price per unit, and representative emoji.
- Let shoppers navigate between Products, ProductDetails, ShoppingCart, and Checkout.
- Demonstrate product quantity selection, basic cart management, and price calculations.
- Provide an appealing interface that adapts to desktop and phone screens.

### Non-Goals
- No authentication, user profiles, database, APIs, or server-side persistence.
- No real payment processing, taxes, or shipping charges.
- No live inventory, real order fulfillment, or actual purchase confirmation.
- Production-level visual polish is not required.

## 3. Target Audience

Online shoppers interested in ordering fruit. The interface should be understandable without technical knowledge and usable with either a mouse or touch input.

## 4. Prototype Scope and Navigation

The app contains four pages or client-side views: **Products**, **ProductDetails**, **ShoppingCart**, and **Checkout**. A navigation menu on the left side of the screen provides direct access to all four pages. On screens narrower than 600 CSS pixels, replace each menu label with a one- or two-letter abbreviation while keeping every destination accessible.

Navigation must work entirely in the browser. Selecting a product opens ProductDetails for that product. Preserve cart contents while navigating between pages during the current session. Provide appropriate links to return to the catalog or continue shopping.

## 5. Core Use Cases

1. As a shopper, I want to browse products and choose a quantity to add to my cart.
2. As a shopper, I want to open a fruit's details and return to the catalog.
3. As a shopper, I want to review my cart, update quantities, and remove items.
4. As a shopper, I want to review the order summary and total, then simulate processing the order.

## 6. Functional Requirements

### Products
- Display all 10 products with an emoji, name, and price per unit.
- Provide an integer quantity selector for each product, defaulting to 1 and with a minimum of 1, plus an **Add to Cart** action.
- Allow shoppers to open ProductDetails by selecting a product or its name.
- When a product already exists in the cart, adding it again increases that cart line's quantity instead of creating a duplicate line.
- Show brief visual feedback after a product is added.

### ProductDetails
- Display the selected product's emoji, name, full description, and price per unit.
- Provide a link back to Products.
- If no valid product is selected, show a simple message and a link to Products.

### ShoppingCart
- Display each cart item with its name, unit price, quantity, line subtotal, and a remove action.
- Allow the shopper to update each quantity using accessible controls. Quantities must be whole numbers greater than or equal to 1; setting a quantity to 0 removes the item.
- Recalculate line subtotals and the cart total whenever a quantity changes or an item is removed.
- When the cart is empty, show an empty-cart state with a link to Products. Disable or clearly block navigation to Checkout while the cart is empty.

### Checkout
- Display an order summary with each item's name, quantity, unit price, and line subtotal, plus the order total.
- Do not request personal details or payment information; these are outside the prototype scope.
- Enable **Process Order** only when the cart contains items.
- On **Process Order**, show an explicit simulated-order confirmation without performing a transaction. After confirmation, clear the cart and provide a way to return to Products.

### Shared Navigation and State
- All four navigation items must work from every page.
- Visually identify the current page and, if straightforward, show the total number of items in the cart.
- Preserve cart state while navigating during the current session. Persistence after closing or refreshing the browser is not required.

## 7. Sample Dataset

Use a static local dataset in JavaScript. Prices are illustrative US dollars (USD), with no tax or shipping. Always display the unit alongside the price.

| ID | Product | Description | Unit Price | Emoji |
|---|---|---|---:|:---:|
| apple | Apple | Crisp, sweet apples, great for a snack. | $1.20 / item | 🍎 |
| banana | Banana | Ripe, soft bananas, good for eating or recipes. | $0.60 / item | 🍌 |
| orange | Orange | Juicy oranges with a fresh citrus flavor. | $0.90 / item | 🍊 |
| strawberry | Strawberry | Sweet red strawberries, sold by the basket. | $4.50 / basket (1 lb) | 🍓 |
| grapes | Grapes | Sweet, seedless grapes, sold by the pound. | $3.20 / lb | 🍇 |
| watermelon | Watermelon | Refreshing watermelon, sold by the whole fruit. | $6.00 / item | 🍉 |
| pineapple | Pineapple | Tropical pineapple with a sweet, slightly tart flavor. | $3.50 / item | 🍍 |
| mango | Mango | Ripe, fragrant mangoes, sold individually. | $1.80 / item | 🥭 |
| peach | Peach | Soft, fragrant peaches, sold individually. | $2.00 / item | 🍑 |
| kiwi | Kiwi | Fresh kiwi with a green center and mildly tart flavor. | $0.75 / item | 🥝 |

Each product record must include at least `id`, `name`, `description`, numeric `price`, `unit`, and `emoji`. Use the numeric price for calculations and format displayed prices as USD with two decimal places.

## 8. Visual Design and Responsiveness

- Create a clean, friendly interface appropriate for a fruit shop, with clear visual hierarchy, appealing colors, and readable typography.
- Use responsive CSS so content adapts to small and large screens. Avoid horizontal scrolling in the main content at typical phone widths.
- Keep navigation on the left when space permits. Below 600 CSS pixels, replace its visible labels with one- or two-letter abbreviations and preserve accessible names with `aria-label` or an equivalent accessible label.
- Use emoji as product imagery; external image assets are not required.
- Use semantic elements, visible control labels, clear keyboard focus, and descriptive button names.
- Basic styling and responsiveness are sufficient; a fully polished design is not required.

## 9. Technical Requirements

- Implement a client-side web app using HTML, CSS, and JavaScript.
- Do not use a server, backend, authentication, database, or payment service.
- Keep the sample dataset in the project and cart state in memory for the current session.
- Implement navigation between the four views without a full-page reload. Hash-based URLs or another simple client-side approach are acceptable; support direct access to views when practical.
- No external libraries or frameworks are required.
- The prototype should be straightforward to open or serve locally from the generated project files, without backend setup.

## 10. Acceptance Criteria

- The catalog displays exactly 10 fruits, each with a name, emoji, and price with a unit; each product has a description available on its details view.
- All four pages are reachable from the left navigation, and the active page is visually identifiable.
- Below 600 CSS pixels, the navigation labels become one- or two-letter abbreviations and each destination remains accessible.
- Selecting a product opens the correct details; the return link opens Products.
- Adding a selected quantity creates or updates the corresponding cart item, and the chosen quantity appears in the cart.
- Updating or removing items correctly recalculates subtotals and the total; the empty-cart state links back to the catalog.
- Checkout shows the correct items and total, cannot process an empty cart, and, when processed with items, shows a simulated confirmation and clears the cart.
- The interface remains usable on desktop and phone screens without overlapping content or horizontal scrolling in the main content.
- No flow requests login or payment details, and no real transaction takes place.

## 11. Deliverables

Deliver the files required to run the prototype in the workspace, keeping the implementation simple and readable. Include a brief note explaining how to open or run it locally. The result is a static demonstration of a shopping flow, not a production-ready store.
