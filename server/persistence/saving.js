import { promises as fs } from 'fs';

export async function loadIngredients(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading ingredients file', err);
      return []; // fallback to empty array
    }
};

export async function saveIngredients(filePath, ingredients) {
    try {
      await fs.writeFile(filePath, JSON.stringify(ingredients, null, 2));
    } catch (err) {
      console.error('Error writing ingredients file', err);
    }
};