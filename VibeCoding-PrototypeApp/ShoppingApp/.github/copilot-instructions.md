# Workspace Copilot Instructions

Use the product requirements and wireframes below as the authoritative specification for the fruit shopping prototype. Preserve the client-side-only scope and do not add real payment processing, backend services, authentication, database integration, taxes, or shipping calculations.

Breakpoint update: The collapsed left navigation requirement is **below 600 CSS pixels** (expanded at 600px and above). This updated 600px cutoff supersedes any earlier breakpoint in copied source material. At widths below 600px, show a page-specific emoji centered horizontally in each navigation item, replacing the abbreviation while preserving accessible names.

## Product Requirements Document

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

The app contains four pages or client-side views: **Products**, **ProductDetails**, **ShoppingCart**, and **Checkout**. A navigation menu on the left side of the screen provides direct access to all four pages. Show a distinct, page-appropriate emoji for each destination. On screens narrower than 600 CSS pixels, show its emoji centered horizontally in place of the menu label while keeping every destination accessible.

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
- Show brief visual feedback after a product is added using an in-app toast or notification banner; never use a native `alert()` popup.

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
- On **Process Order**, show an explicit thank-you and simulated-order confirmation without performing a transaction. After confirmation, clear the cart and provide a way to return to Products.

### Shared Navigation and State
- All four navigation items must work from every page.
- Visually identify the current page and show the total quantity of items in a navigation badge, hiding the badge when the cart is empty. Keep the badge and its accessible name synchronized with cart changes.
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
- Keep navigation on the left when space permits. Below 600 CSS pixels, replace its visible labels with a centered, page-specific emoji and preserve accessible names with `aria-label` or an equivalent accessible label.
- Use emoji as product imagery; external image assets are not required.
- Use semantic elements, visible control labels, clear keyboard focus, and descriptive button names. Move focus to the new page heading after client-side navigation and preserve focus on equivalent controls after in-place updates.
- Basic styling and responsiveness are sufficient; a fully polished design is not required.

## 9. Technical Requirements

- Implement a client-side web app using HTML, CSS, and JavaScript.
- Do not use a server, backend, authentication, database, or payment service.
- Keep the sample dataset in the project and cart state in memory for the current session.
- Implement navigation between the four views without a full-page reload. Hash-based URLs or another simple client-side approach are acceptable; support direct access to views when practical.
- Use in-app toast/banner notifications instead of native alert dialogs. Manage keyboard focus after view changes and dynamic rerenders.
- No external libraries or frameworks are required.
- The prototype should be straightforward to open or serve locally from the generated project files, without backend setup.

## 10. Acceptance Criteria

- The catalog displays exactly 10 fruits, each with a name, emoji, and price with a unit; each product has a description available on its details view.
- All four pages are reachable from the left navigation, and the active page is visually identifiable.
- The navigation badge shows the total quantity in the cart and updates after add, quantity change, removal, and order processing; it is hidden when the cart is empty.
- Below 600 CSS pixels, the navigation shows a page-specific emoji centered horizontally in each item, and each destination remains accessible.
- Selecting a product opens the correct details; the return link opens Products.
- Adding a selected quantity creates or updates the corresponding cart item, and the chosen quantity appears in the cart.
- Adding or removing a product gives brief in-app feedback without a native alert popup.
- Updating or removing items correctly recalculates subtotals and the total; the empty-cart state links back to the catalog.
- Checkout shows the correct items and total, cannot process an empty cart, and, when processed with items, shows a thank-you confirmation that clearly identifies the order as simulated and clears the cart.
- Keyboard focus moves to the new page heading after navigation and remains on the equivalent control after an in-place update when that control still exists.
- The interface remains usable on desktop and phone screens without overlapping content or horizontal scrolling in the main content.
- No flow requests login or payment details, and no real transaction takes place.

## 11. Deliverables

Deliver the files required to run the prototype in the workspace, keeping the implementation simple and readable. Include a brief note explaining how to open or run it locally. The result is a static demonstration of a shopping flow, not a production-ready store.

## Combined Wireframe Document

# Low-Fidelity Wireframes: Fruit Shop Prototype

These text wireframes describe page structure and key controls from the PRD. They are intentionally schematic: labels, spacing, and visual styling can change during implementation as long as the required content and interactions remain clear.

### Shared App Shell: Expanded Navigation

Use this left-side navigation when the viewport is at least 600 CSS pixels wide. Show a page-specific emoji beside each label, highlight the active destination, and show the total cart quantity as a badge when the cart is not empty.

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Page content                                 |
|                      |                                              |
| > 🍎 Products         |                                              |
|   🔎 ProductDetails   |                                              |
|   🛒 ShoppingCart (2) |                                              |
|   🧾 Checkout         |                                              |
|                      |                                              |
|                      |                                              |
+----------------------+----------------------------------------------+
```

### Shared App Shell: Collapsed Navigation

When the viewport is narrower than 600 CSS pixels, replace the menu labels with the page-specific emoji, centered horizontally in each navigation item. Each item remains a link with an accessible name such as `aria-label="Products"`. Use a tooltip or equivalent label where practical.

```text
+------+------------------------------+
| FR   | Page content                 |
|      |                              |
| > 🍎 |                              |
|   🔎 |                              |
|   🛒2 |                              |
|   🧾 |                              |
|      |                              |
+------+------------------------------+

🍎 = Products       🔎 = ProductDetails
🛒 = ShoppingCart   🧾 = Checkout
🛒2 = ShoppingCart with 2 items
```

### Products

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Products                                       |
| > 🍎 Products         | Browse fresh fruit                             |
|   🔎 ProductDetails   |                                                |
|   🛒 ShoppingCart (2) | +------------------+ +------------------+      |
|   🧾 Checkout         | |       🍎         | |       🍌         |      |
|                      | | Apple            | | Banana           |      |
|                      | | $1.20 / item     | | $0.60 / item     |      |
|                      | | Qty [-] 1 [+]    | | Qty [-] 1 [+]    |      |
|                      | | [Add to Cart]    | | [Add to Cart]    |      |
|                      | | [View details]   | | [View details]   |      |
|                      | +------------------+ +------------------+      |
|                      | ...remaining products in a wrapping grid/list...|
|                      |                                                |
|                      |                Added to cart: Apple            |
+----------------------+------------------------------------------------+
```

Each product item provides a quantity selector, add action, and a way to open that product's details. The product name or **View details** link opens ProductDetails for the selected product. On narrower screens, product items stack or wrap to fit the available content width.

### ProductDetails

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Product details                                |
|   🍎 Products         |                                                |
| > 🔎 ProductDetails   | [< Back to Products]                          |
|   🛒 ShoppingCart (2) |                                                |
|   🧾 Checkout         | +--------------------------------------------+ |
|                      | |                    🍎                      | |
|                      | | Apple                                      | |
|                      | | Crisp, sweet apples, great for a snack.    | |
|                      | | $1.20 / item                              | |
|                      | +--------------------------------------------+ |
+----------------------+------------------------------------------------+
```

The details view reflects the selected product. The back link returns to Products. If no valid product is selected, replace the product information with a short not-found message and a **Back to Products** link.

### ShoppingCart: Items Present

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Shopping cart                                 |
|   🍎 Products         |                                                |
|   🔎 ProductDetails   | Item           Unit price   Quantity   Subtotal|
| > 🛒 ShoppingCart (2) | ------------------------------------------------|
|   🧾 Checkout         | 🍎 Apple       $1.20 / item  [-] 2 [+]  $2.40  |
|                      |                              [Remove]          |
|                      | 🍌 Banana      $0.60 / item  [-] 3 [+]  $1.80  |
|                      |                              [Remove]          |
|                      |                                                |
|                      | Cart total:                            $4.20   |
|                      | [Continue shopping]       [Proceed to Checkout]|
+----------------------+------------------------------------------------+
```

Changing a quantity updates its line subtotal and the cart total. Removing a line removes that product. If quantity is set to 0, remove the item.

### ShoppingCart: Empty

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Shopping cart                                 |
|   🍎 Products         |                                                |
|   🔎 ProductDetails   | Your cart is empty.                            |
| > 🛒 ShoppingCart    |                                                |
|   🧾 Checkout         | [Browse products]                              |
|                      |                                                |
|                      | Proceed to Checkout is unavailable.            |
+----------------------+------------------------------------------------+
```

### Checkout

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Checkout                                      |
|   🍎 Products         |                                                |
|   🔎 ProductDetails   | Order summary                                 |
|   🛒 ShoppingCart (2) | Item                  Qty   Unit price  Subtotal|
| > 🧾 Checkout         | ------------------------------------------------|
|                      | 🍎 Apple             2     $1.20       $2.40   |
|                      | 🍌 Banana            3     $0.60       $1.80   |
|                      |                                                |
|                      | Order total:                            $4.20  |
|                      |                                                |
|                      | [Process Order]                                |
|                      |                                                |
|                      | No address or payment fields.                 |
+----------------------+------------------------------------------------+
```

After **Process Order**, show a clear simulated-order confirmation in place of or above the summary, clear the cart, and offer a way back to Products. If the cart is empty, do not enable order processing.

### Narrow Viewport Notes

- Keep the same page content and actions on narrow viewports; reflow product cards and item summaries vertically rather than allowing horizontal overflow.
- At widths below 600 CSS pixels, use the collapsed navigation shown above. Keep each link's accessible name even when only its emoji is visible.
- Maintain readable labels and controls. If a cart row cannot fit, stack its product, quantity controls, subtotal, and remove action into a compact vertical group.

## Individual Text Wireframes

### Products.txt

```text
PRODUCTS PAGE - LOW-FIDELITY WIREFRAME

+----------------------+------------------------------------------------+
| FRUIT SHOP           | Products                                       |
| > 🍎 Products         | Browse fresh fruit                             |
|   🔎 ProductDetails   |                                                |
|   🛒 ShoppingCart (2) | +------------------+ +------------------+      |
|   🧾 Checkout         | |       🍎         | |       🍌         |      |
|                      | | Apple            | | Banana           |      |
|                      | | $1.20 / item     | | $0.60 / item     |      |
|                      | | Qty [-] 1 [+]    | | Qty [-] 1 [+]    |      |
|                      | | [Add to Cart]    | | [Add to Cart]    |      |
|                      | | [View details]   | | [View details]   |      |
|                      | +------------------+ +------------------+      |
|                      | ...remaining products in a wrapping grid/list...|
|                      |                                                |
|                      |                Added to cart: Apple            |
+----------------------+------------------------------------------------+

INTERACTIONS
- Each product has a quantity selector (integer, minimum 1), Add to Cart,
  and a way to open ProductDetails.
- Adding an existing product increases its cart quantity.
- Product cards stack or wrap on narrow screens to avoid horizontal overflow.
```

### ProductDetails.txt

```text
PRODUCT DETAILS PAGE - LOW-FIDELITY WIREFRAME

+----------------------+------------------------------------------------+
| FRUIT SHOP           | Product details                                |
|   🍎 Products         |                                                |
| > 🔎 ProductDetails   | [< Back to Products]                          |
|   🛒 ShoppingCart (2) |                                                |
|   🧾 Checkout         | +--------------------------------------------+ |
|                      | |                    🍎                      | |
|                      | | Apple                                      | |
|                      | | Crisp, sweet apples, great for a snack.    | |
|                      | | $1.20 / item                              | |
|                      | +--------------------------------------------+ |
+----------------------+------------------------------------------------+

INTERACTIONS
- Show the selected product's emoji, name, full description, and unit price.
- Back to Products returns to the catalog.
- If no valid product is selected, show a short not-found message and a
  Back to Products link.
```

### ShoppingCart.txt

```text
SHOPPING CART PAGE - LOW-FIDELITY WIREFRAME

POPULATED CART
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Shopping cart                                 |
|   🍎 Products         |                                                |
|   🔎 ProductDetails   | Item           Unit price   Quantity   Subtotal|
| > 🛒 ShoppingCart (2) | ------------------------------------------------|
|   🧾 Checkout         | 🍎 Apple       $1.20 / item  [-] 2 [+]  $2.40  |
|                      |                              [Remove]          |
|                      | 🍌 Banana      $0.60 / item  [-] 3 [+]  $1.80  |
|                      |                              [Remove]          |
|                      |                                                |
|                      | Cart total:                            $4.20   |
|                      | [Continue shopping]       [Proceed to Checkout]|
+----------------------+------------------------------------------------+

EMPTY CART
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Shopping cart                                 |
|   🍎 Products         |                                                |
|   🔎 ProductDetails   | Your cart is empty.                            |
| > 🛒 ShoppingCart    |                                                |
|   🧾 Checkout         | [Browse products]                              |
|                      |                                                |
|                      | Proceed to Checkout is unavailable.            |
+----------------------+------------------------------------------------+

INTERACTIONS
- Updating a quantity recalculates that line subtotal and the cart total.
- Removing an item removes its line. Setting quantity to 0 removes the item.
- Empty state offers a link to Products; checkout is blocked while empty.
- On narrow screens, stack item details, quantity controls, subtotal, and
  remove action vertically rather than allowing horizontal overflow.
```

### Checkout.txt

```text
CHECKOUT PAGE - LOW-FIDELITY WIREFRAME

+----------------------+------------------------------------------------+
| FRUIT SHOP           | Checkout                                      |
|   🍎 Products         |                                                |
|   🔎 ProductDetails   | Order summary                                 |
|   🛒 ShoppingCart (2) | Item                  Qty   Unit price  Subtotal|
| > 🧾 Checkout         | ------------------------------------------------|
|                      | 🍎 Apple             2     $1.20       $2.40   |
|                      | 🍌 Banana            3     $0.60       $1.80   |
|                      |                                                |
|                      | Order total:                            $4.20  |
|                      |                                                |
|                      | [Process Order]                                |
|                      |                                                |
|                      | No address or payment fields.                 |
+----------------------+------------------------------------------------+

AFTER PROCESS ORDER
- Show an explicit simulated-order confirmation; no transaction occurs.
- Clear the cart and offer a way to return to Products.
- Do not enable Process Order when the cart is empty.
- Do not request address or payment information.
```

### Navigation.txt

```text
NAVIGATION - LOW-FIDELITY WIREFRAMES

EXPANDED (VIEWPORT AT LEAST 600 CSS PIXELS)
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Page content                                 |
|                      |                                              |
| > 🍎 Products         |                                              |
|   🔎 ProductDetails   |                                              |
|   🛒 ShoppingCart (2) |                                              |
|   🧾 Checkout         |                                              |
|                      |                                              |
|                      |                                              |
+----------------------+----------------------------------------------+

COLLAPSED (VIEWPORT NARROWER THAN 600 CSS PIXELS)
+------+------------------------------+
| FR   | Page content                 |
|      |                              |
| > 🍎 |                              |
|   🔎 |                              |
|   🛒2 |                              |
|   🧾 |                              |
|      |                              |
+------+------------------------------+

NAVIGATION EMOJIS
🍎 = Products
🔎 = ProductDetails
🛒 = ShoppingCart (🛒2 depicts a cart count badge of 2)
🧾 = Checkout

BEHAVIOR
- Keep the menu on the left and provide access to all four pages.
- Highlight the active page and show the total cart quantity in a badge when the cart is not empty.
- Below 600 CSS pixels, show each page-specific emoji centered horizontally
  and retain each link's full accessible name (for example, aria-label="Products").
- Keep navigation client-side and preserve cart state while navigating
  during the current browser session.
```
