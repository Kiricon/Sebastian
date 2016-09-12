/// <reference path="../../node.d.ts" />
import {Config} from "../helper/Config";
import * as fs from "fs";
import {CommandsController} from "./CommandsController";
import {HotKeysController} from "./HotKeysController";
import {StyleController} from "./StyleController";
import {PreferenceController} from "./PreferencesController";

export class SettingsController {
  content : HTMLElement = document.getElementById('content');
  menuItems : NodeListOf<HTMLDivElement> = document.getElementById('menu').getElementsByTagName('div');
  pageController : any;
  controllers : Array<any> = ['', CommandsController, '', '', ''];
  constructor(){

    //Makes config file if one doesn't exist
    if(!Config.exists()){
      Config.create();
    }

  }

  //Change the content to the partials input.
  display(name: string, index: number):void{
    let partialPath: string = __dirname+"/../../pages/partials/"+name+".html";
    let partial: string = fs.readFileSync(partialPath, "utf8");

    this.content.innerHTML = partial;
    this.setController(index);

    for(let i = 0; i < this.menuItems.length; i++){
      if(i == index-1){
        this.menuItems[i].className = "menu-item selected";
      }else{
        this.menuItems[i].className = "menu-item";
      }
    }
  }

  setController(index){
    switch(index){
      case 2:
        this.pageController = new CommandsController();
        break;
      case 3:
        this.pageController = new HotKeysController();
        break;
      case 4:
        this.pageController = new StyleController();
        break;
      case 5:
        this.pageController = new PreferenceController();
        break;
    }
    if(index > 1){
      this.pageController.init();
    }
  }


}
