/// <reference path="../../node.d.ts" />
import {Config} from "../helper/Config";
import * as fs from "fs";

export class SettingsController {
  content : HTMLElement = document.getElementById('content');
  menuItems : NodeListOf<HTMLDivElement> = document.getElementById('menu').getElementsByTagName('div');
  constructor(){

    //Makes config file if one doesn't exist
    if(!Config.exists()){
      Config.create();
    }

  }

  //Change the content to the partials input.
  display(name: string, index: number):void{
    let partialPath: string = __dirname+"/../../settings/partials/"+name+".html";
    let partial: string = fs.readFileSync(partialPath, "utf8");

    this.content.innerHTML = partial;
    for(let i = 0; i < this.menuItems.length; i++){
      if(i == index-1){
        this.menuItems[i].className = "menu-item selected";
      }else{
        this.menuItems[i].className = "menu-item";
      }
    }
  }


}
