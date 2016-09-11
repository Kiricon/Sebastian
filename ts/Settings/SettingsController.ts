import {Config} from "../helper/Config";
export class SettingsController {

  constructor(){

    if(!Config.exists()){
      Config.create();
    }
  }
}
