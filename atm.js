"""
ATM Banking System
- PIN validation (max 3 attempts, then lock)
- Withdraw, deposit, check balance, change PIN
- Prevents overdraw, deposit > 0, new PIN exactly 4 digits
"""

class ATM:
    def __init__(self, pin, balance=0):
        self.pin = pin
        self.balance = balance
        self.attempts = 0
        self.locked = False

    def authenticate(self, entered_pin):
        if self.locked:
            print("Account is locked due to too many failed attempts.")
            return False
        if entered_pin == self.pin:
            self.attempts = 0  # reset on success
            return True
        else:
            self.attempts += 1
            remaining = 3 - self.attempts
            if self.attempts >= 3:
                self.locked = True
                print("Account locked after 3 incorrect PIN attempts.")
            else:
                print(f"Incorrect PIN. {remaining} attempt(s) remaining.")
            return False

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return
        if amount > self.balance:
            print("Insufficient balance.")
            return
        self.balance -= amount
        print(f"Withdrew ${amount:.2f}. New balance: ${self.balance:.2f}")

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be greater than zero.")
            return
        self.balance += amount
        print(f"Deposited ${amount:.2f}. New balance: ${self.balance:.2f}")

    def check_balance(self):
        print(f"Current balance: ${self.balance:.2f}")

    def change_pin(self, old_pin, new_pin):
        if not self.authenticate(old_pin):
            return
        if not new_pin.isdigit() or len(new_pin) != 4:
            print("New PIN must contain exactly four digits.")
            return
        self.pin = new_pin
        print("PIN changed successfully.")

def main():
    atm = ATM(pin="1234", balance=1000.0)
    print("Welcome to the ATM.")
    
    # Login loop
    while True:
        entered = input("Enter your PIN (or 'q' to quit): ")
        if entered.lower() == 'q':
            break
        if atm.authenticate(entered):
            break
        if atm.locked:
            return
    
    while not atm.locked:
        print("\nOptions:")
        print("1. Withdraw")
        print("2. Deposit")
        print("3. Check Balance")
        print("4. Change PIN")
        print("5. Exit")
        choice = input("Choose an option: ").strip()
        
        if choice == "1":
            amount = float(input("Amount to withdraw: "))
            atm.withdraw(amount)
        elif choice == "2":
            amount = float(input("Amount to deposit: "))
            atm.deposit(amount)
        elif choice == "3":
            atm.check_balance()
        elif choice == "4":
            old = input("Enter current PIN: ")
            new = input("Enter new PIN (4 digits): ")
            atm.change_pin(old, new)
        elif choice == "5":
            print("Thank you for using the ATM.")
            break
        else:
            print("Invalid option.")

if __name__ == "__main__":
    main()