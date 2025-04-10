# fridge_app.py

import json
from Ingredient import Ingredient
from Date import Date

# This file defines the basic implementation of the object. 
# Allow user to add items that are stored within their fridge.
# Recommend recipes and keep track of expiration dates.

fridge_items = []

# Expiration dates should come in the form MM-DD-YYYY

# Add Ingredient
# Add an ingredient to the fridge   
def add_ingredient(item_name, quantity, expiration_date):
    expiration_date = expiration_date.split("/")
    expiration_date = Date(expiration_date[0], expiration_date[1], expiration_date[2])
    new_ingredient = Ingredient(item_name, quantity, expiration_date)
    fridge_items.append(new_ingredient)
    save_data()

# Print Fridge
# Print all items in the fridge
def print_fridge():
    print()
    print("Fridge List")
    for index, ingredient in enumerate(fridge_items, start=1):
        print(f"({index}) {ingredient}")
    print()

# Add Ingredient Prompt
# If the quantity is not a number or is less than 0, print "Invalid Quantity"
# If the expiration date is not in the correct format, print "Invalid Date Format"
def add_ingredient_prompt():
    item_name = input("Enter Item Name: ")
    quantity = input("Enter Quantity: ")
    if (quantity.isdigit() == False or int(quantity) < 0):
        print("Invalid Quantity")
        return
    expiration_date = input("Enter Expiration Date (MM/DD/YYYY): ")
    if (expiration_date.count("/") != 2):
        print("Invalid Date Format")
        return
    add_ingredient(item_name, quantity, expiration_date)

# Remove Ingredient by Index
# If the index is invalid, print "Invalid Index"
def remove_ingredient_prompt():
    print_fridge()
    index = int(input("Enter the index of the item you want to remove: "))
    if (index < 0 or index > len(fridge_items)):
        print("Invalid Index")
    else:
        fridge_items.pop(index - 1)
        save_data()

# Save data to JSON file
def save_data():
    with open('fridge_data.json', 'w') as f:
        json.dump([{
            'name': ingredient.name,
            'quantity': ingredient.quantity,
            'expiration_date': ingredient.expiration_date.to_dict()
        } for ingredient in fridge_items], f)

# Load data from JSON file3
def load_data():
    try:
        with open('fridge_data.json', 'r') as f:
            data = json.load(f)
            for item in data:
                expiration_date = Date(item['expiration_date']['month'], item['expiration_date']['day'], item['expiration_date']['year'])
                ingredient = Ingredient(item['name'], item['quantity'], expiration_date)
                fridge_items.append(ingredient)
    except FileNotFoundError:
        pass

# User Interface: Display options to the user
# 1. Add Ingredients To Fridge  (Add Ingredient Name, Quantity, Expiration Date)
# 2. Remove Ingredients From Fridge (Remove Ingredient by Index)
# 3. Print Fridge (Prints all ingredients in the fridge)
# 4. Exit (Exits the program)
def user_interface():
    load_data()
    while True:
        print("(1) Add Ingredients To Fridge")
        print("(2) Remove Ingredients From Fridge")
        print("(3) Print Fridge")
        print("(4) Exit")
        in_ret = input("Enter Choice: ")
        if in_ret == "1":
            while True:
                add_ingredient_prompt()
                add_more = input("Would you like to add more ingredients? (y/n): ")
                if add_more == "n":
                    break
        elif in_ret == "2":
            if len(fridge_items) == 0:
                print("Fridge is empty")
            else:
                while True:
                    remove_ingredient_prompt()
                    add_more = input("Would you like to remove more ingredients? (y/n): ")
                    if add_more == "n":
                        break
        elif in_ret == "3":
            print_fridge()
        elif in_ret == "4":
            break
        else:
            print("Invalid Input")
        
user_interface()