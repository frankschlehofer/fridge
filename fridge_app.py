# fridge_app.py

from Ingredient import Ingredient
from Date import Date

# This file defines the basic implementation of the object. 
# Allow user to add items that are stored within their fridge.
# Recommend recipes and keep track of expiration dates.

fridge_items = []

# Expiration dates should come in the form MM-DD-YYYY

def add_ingredient(item_name, quantity, expiration_date):
    expiration_date = expiration_date.split("/")
    expiration_date = Date(expiration_date[0], expiration_date[1], expiration_date[2])
    new_ingredient = Ingredient(item_name, quantity, expiration_date)
    fridge_items.append(new_ingredient)

def print_fridge():
    for ingredient in fridge_items:
        print(ingredient)

add_ingredient("Egg", 12, "3/15/2021")
add_ingredient("Milk", 1, "3/16/2021")

print_fridge()