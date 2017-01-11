/// <reference path="../../node.d.ts" />
import {Config} from "../helper/Config";
import * as fs from "fs";
import {CommandsController} from "./CommandsController";
import {HotKeysController} from "./HotKeysController";
import {StyleController} from "./StyleController";
import {PreferenceController} from "./PreferencesController";

/**
 * Class controller for our settings area. 
 */
export class SettingsController {
  content : HTMLElement = document.getElementById('content');
  menuItems : NodeListOf<HTMLDivElement> = document.getElementById('menu').getElementsByTagName('div');
  pageController : any;
  controllers : Array<any> = ['', CommandsController, '', '', ''];

  /**
   * Our constructor method for creating our config. 
   */
  constructor() {
    if(!Config.exists()){
      Config.create();
    }
  }


  /**
   * Disply the partials in the settings window
   * @param {string} name - Name of the partial to display
   * @param {number} index - Index of controller to set for the display
   */
  display(name: string, index: number):void {
    let partialPath: string = __dirname+"/../../pages/partials/"+name+".html";
    let partial: string = fs.readFileSync(partialPath, "utf8");

    this.content.innerHTML = partial;
    this.setController(index);

    for(let i = 0; i < this.menuItems.length; i++) {
      if(i == index-1) {
        this.menuItems[i].className = "menu-item selected";
      }else {
        this.menuItems[i].className = "menu-item";
      }
    }
  }


  /**
   * Method to set the controller for the setttings view
   * @param {number} index - Index of the controller to set;
   */
  setController(index: number) {
    switch(index) {
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
    if(index > 1) {
      this.pageController.init();
    }
  }


}
