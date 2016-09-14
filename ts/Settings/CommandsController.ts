import {IResult} from "../Search/IResult";
import {Config} from "../helper/Config";


export class CommandsController {

  commands: IResult[] = Config.get('Commands');
  commandsList: HTMLElement = document.getElementById('commandList');

  newCommand: HTMLInputElement = <HTMLInputElement>document.getElementById('newCommand');
  newCommandType: HTMLInputElement = <HTMLInputElement>document.getElementById('newCommandType');
  newCommandContainer: HTMLElement = document.getElementById('newCommandActionContainer');
  newCommandAction: HTMLInputElement;


  contructor(){
  }

  init():void{
    this.populateCommandList();
    this.listen();
  }

  listen():void{

      let self: CommandsController = this;
      this.newCommandType.addEventListener('change', function(){
          self.changeActionInput();
      });

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

  changeActionInput():void {

    let actionInput: string = "";

    switch(this.newCommandType.value){
      case "terminal":
        actionInput = "<input type='text' id='newCommandAction' placeholder='Enter command you want ran in terminal...' />";
        break;
    }


    if(actionInput !=""){
      this.newCommandContainer.innerHTML = actionInput;
      this.newCommandAction = <HTMLInputElement>document.getElementById('newCommandAction');
    }

  }



}
