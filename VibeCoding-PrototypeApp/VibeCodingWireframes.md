# Low-Fidelity Wireframes: Fruit Shop Prototype

These text wireframes describe page structure and key controls from the PRD. They are intentionally schematic: labels, spacing, and visual styling can change during implementation as long as the required content and interactions remain clear.

## Shared App Shell: Expanded Navigation

Use this left-side navigation when the viewport is at least 600 CSS pixels wide. Highlight the active destination. The cart count is optional per the PRD.

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Page content                                 |
|                      |                                              |
| > Products           |                                              |
|   ProductDetails     |                                              |
|   ShoppingCart  (2)  |                                              |
|   Checkout           |                                              |
|                      |                                              |
|                      |                                              |
+----------------------+----------------------------------------------+
```

## Shared App Shell: Collapsed Navigation

When the viewport is narrower than 600 CSS pixels, replace the menu labels with one- or two-letter abbreviations. Each item remains a link with an accessible name such as `aria-label="Products"`. Use a tooltip or equivalent label where practical.

```text
+------+------------------------------+
| FR   | Page content                 |
|      |                              |
| > P  |                              |
|   D  |                              |
|   C2 |                              |
|   O  |                              |
|      |                              |
+------+------------------------------+

P = Products       D = ProductDetails
C = ShoppingCart   O = Checkout
C2 = ShoppingCart with 2 items
```

## Products

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Products                                       |
| > Products           | Browse fresh fruit                             |
|   ProductDetails     |                                                |
|   ShoppingCart  (2)  | +------------------+ +------------------+      |
|   Checkout           | |       🍎         | |       🍌         |      |
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

## ProductDetails

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Product details                                |
|   Products           |                                                |
| > ProductDetails     | [< Back to Products]                          |
|   ShoppingCart  (2)  |                                                |
|   Checkout           | +--------------------------------------------+ |
|                      | |                    🍎                      | |
|                      | | Apple                                      | |
|                      | | Crisp, sweet apples, great for a snack.    | |
|                      | | $1.20 / item                              | |
|                      | +--------------------------------------------+ |
+----------------------+------------------------------------------------+
```

The details view reflects the selected product. The back link returns to Products. If no valid product is selected, replace the product information with a short not-found message and a **Back to Products** link.

## ShoppingCart: Items Present

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Shopping cart                                 |
|   Products           |                                                |
|   ProductDetails     | Item           Unit price   Quantity   Subtotal|
| > ShoppingCart  (2)  | ------------------------------------------------|
|   Checkout           | 🍎 Apple       $1.20 / item  [-] 2 [+]  $2.40  |
|                      |                              [Remove]          |
|                      | 🍌 Banana      $0.60 / item  [-] 3 [+]  $1.80  |
|                      |                              [Remove]          |
|                      |                                                |
|                      | Cart total:                            $4.20   |
|                      | [Continue shopping]       [Proceed to Checkout]|
+----------------------+------------------------------------------------+
```

Changing a quantity updates its line subtotal and the cart total. Removing a line removes that product. If quantity is set to 0, remove the item.

## ShoppingCart: Empty

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Shopping cart                                 |
|   Products           |                                                |
|   ProductDetails     | Your cart is empty.                            |
| > ShoppingCart       |                                                |
|   Checkout           | [Browse products]                              |
|                      |                                                |
|                      | Proceed to Checkout is unavailable.            |
+----------------------+------------------------------------------------+
```

## Checkout

```text
+----------------------+------------------------------------------------+
| FRUIT SHOP           | Checkout                                      |
|   Products           |                                                |
|   ProductDetails     | Order summary                                 |
|   ShoppingCart  (2)  | Item                  Qty   Unit price  Subtotal|
| > Checkout           | ------------------------------------------------|
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

## Narrow Viewport Notes

- Keep the same page content and actions on narrow viewports; reflow product cards and item summaries vertically rather than allowing horizontal overflow.
- At widths below 600 CSS pixels, use the collapsed navigation shown above. Keep each link's accessible name even when only an abbreviation is visible.
- Maintain readable labels and controls. If a cart row cannot fit, stack its product, quantity controls, subtotal, and remove action into a compact vertical group.
