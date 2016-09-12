import {IResult} from "../Search/IResult";
import {Config} from "../helper/Config";


export class CommandsController {

  commands: IResult[] = Config.get('Commands');
  commandsList: HTMLElement = document.getElementById('commandList');

  contructor(){
  }

  init():void{
    this.populateCommandList();
  }

  populateCommandList():void{
    //Clear out list
    this.commandsList.innerHTML = "";

    if(this.commands.length > 0){
      //Populate with all commands
      this.commands.forEach(function(command){
        let commandElement: string = "";
        commandElement = "<div class='command'>"+command.text+" + "+command.type+"</div>";
        this.commandsList.innerHTML += commandElement;
      });

    }else{

      this.commandsList.innerHTML = "No commands currently set. Create a new one!";

    }


  }



}
