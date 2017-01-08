import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { Recipe } from "./recipe";
import { Ingredient } from "../shared";

import { environment } from "../../environments/environment";

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();
  
  private recipes: Recipe[] = [
    new Recipe('Chicken Tandoori', 'Awesome!!!', 'http://howcanido.co.uk/wp-content/uploads/2013/02/how-to-make-indian-tandori-chicken.png', [
      new Ingredient('Chicken', 2),
      new Ingredient('Yogurt', 1)
    ]),
    new Recipe('Steamed Hilsa', 'Great', 'http://www.daily-sun.com/assets/news_images/2016/04/11/Recipie-2.jpg', [])
  ];

  constructor(private http: Http) {}

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put(environment.recipe_service, body, {headers: headers});
  }

  fetchData() {
    return this.http.get(environment.recipe_service)
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }

}
