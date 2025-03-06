# Ingredient.py

class Ingredient:
    def __init__(self, name, quantity, expiration_date):
        self.name = name
        self.quantity = quantity
        self.expiration_date = expiration_date

    def __str__(self):
        return ( self.name+" / Quantity: "+str(self.quantity)+" / Expiration Date: "+str(self.expiration_date) )