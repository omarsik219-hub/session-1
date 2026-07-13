"""
E-Commerce Checkout System
- Calculates subtotal, applies category discount, coupon, payment method discount
- Applies VAT (value-added tax)
- Generates a complete invoice
- Final price never negative (bonus)
"""

class Checkout:
    # Discount rates by category
    CATEGORY_DISCOUNTS = {
        "electronics": 0.10,
        "clothing": 0.15,
        "books": 0.20,
        "other": 0.05
    }
    
    # Valid coupon codes and their discount percentages
    COUPONS = {
        "SAVE10": 0.10,
        "SAVE20": 0.20,
        "FREESHIP": 0.05   # For demonstration
    }
    
    # Payment method extra discounts
    PAYMENT_DISCOUNTS = {
        "credit": 0.02,
        "debit": 0.01,
        "paypal": 0.03,
        "cash": 0.00
    }
    
    VAT_RATE = 0.15  # 15%

    def __init__(self, customer_name, category, price, quantity, coupon_code=None, payment_method="cash"):
        self.customer_name = customer_name
        self.category = category.lower()
        self.price = price
        self.quantity = quantity
        self.coupon_code = coupon_code.upper() if coupon_code else None
        self.payment_method = payment_method.lower()
        
        self.subtotal = self.price * self.quantity
        self.category_discount = 0.0
        self.coupon_discount = 0.0
        self.payment_discount = 0.0
        self.vat_amount = 0.0
        self.final_price = 0.0

    def calculate(self):
        # 1. Subtotal (already stored)
        # 2. Category discount
        cat_rate = self.CATEGORY_DISCOUNTS.get(self.category, 0.05)
        self.category_discount = self.subtotal * cat_rate
        
        # 3. Coupon discount (if valid)
        if self.coupon_code and self.coupon_code in self.COUPONS:
            self.coupon_discount = self.subtotal * self.COUPONS[self.coupon_code]
        else:
            if self.coupon_code:
                print(f"Invalid coupon code '{self.coupon_code}'. No coupon discount applied.")
        
        # 4. Payment method discount
        pay_rate = self.PAYMENT_DISCOUNTS.get(self.payment_method, 0.0)
        self.payment_discount = self.subtotal * pay_rate
        
        # 5. Calculate price after discounts (before VAT)
        price_after_discounts = self.subtotal - self.category_discount - self.coupon_discount - self.payment_discount
        # Bonus: ensure non-negative
        if price_after_discounts < 0:
            price_after_discounts = 0
        
        # 6. VAT
        self.vat_amount = price_after_discounts * self.VAT_RATE
        self.final_price = price_after_discounts + self.vat_amount
        
        return self.final_price

    def generate_invoice(self):
        print("\n" + "="*50)
        print("INVOICE")
        print("="*50)
        print(f"Customer: {self.customer_name}")
        print(f"Category: {self.category.capitalize()}")
        print(f"Price per unit: ${self.price:.2f}")
        print(f"Quantity: {self.quantity}")
        print(f"Subtotal: ${self.subtotal:.2f}")
        print(f"Category discount ({self.CATEGORY_DISCOUNTS.get(self.category, 0.05)*100:.0f}%): -${self.category_discount:.2f}")
        if self.coupon_code and self.coupon_code in self.COUPONS:
            print(f"Coupon discount ({self.COUPONS[self.coupon_code]*100:.0f}%): -${self.coupon_discount:.2f}")
        else:
            print("Coupon discount: $0.00")
        print(f"Payment method discount ({self.PAYMENT_DISCOUNTS.get(self.payment_method, 0.0)*100:.0f}%): -${self.payment_discount:.2f}")
        print(f"VAT ({self.VAT_RATE*100:.0f}%): ${self.vat_amount:.2f}")
        print("-"*50)
        print(f"TOTAL: ${self.final_price:.2f}")
        print("="*50)

def main():
    print("E-Commerce Checkout")
    name = input("Customer name: ")
    category = input("Product category (electronics/clothing/books/other): ")
    price = float(input("Product price: "))
    qty = int(input("Quantity: "))
    coupon = input("Coupon code (or leave empty): ").strip() or None
    payment = input("Payment method (credit/debit/paypal/cash): ").strip().lower()
    
    checkout = Checkout(name, category, price, qty, coupon, payment)
    checkout.calculate()
    checkout.generate_invoice()

if __name__ == "__main__":
    main()