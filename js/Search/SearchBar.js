class SearchBar {
	//Build out our searchbar and pre define properties
	constructor(){
		this.element = document.getElementById('search');
		this.results = [];
		this.options = [];
		this.selected = 0;
		this.resultsElement = document.getElementById('results');
	}

	Listen(){
		document.getElementById('search').addEventListener('change', this.AnalyzeInput(this));
	}

	//Analyzes input text and returns a list of results that are suitable
	AnalyzeInput(context){
		
		this.selected = 0;
		context.results = [];
		var input = document.getElementById('search').value;
		if(input.trim() != ""){
		input = input.trim().split(' ');
		context.options.forEach(function(value){
			input.forEach(function(string, index){
				if(value.text.toLowerCase().indexOf(string.toLowerCase()) >= 0 && input.length == 1){
					if(!context.results.includes(value)){
						context.results.push(value); 
					} 
				}else{
					string = string.trim().split(" ");
					string.forEach(function(part){
						if(part.toLowerCase() == value.text.toLowerCase() ){
							if(!context.results.includes(value)){
								context.results.push(value);
							}
						}
					});
				}
			});
			
		});
		}
		context.Update();
	}


	//Updates the html results based on the current list of results.
	//This command is usually run after the Analyze Input Method is complete
	Update(){
		var resultList = "";
		var resultListHeight = 0;
		var self = this;
		this.results.forEach(function(value, index){
			if(index == self.selected){
				resultList += '<div class="result selected">'+value.text+'</div>';
			}else{
				resultList += '<div class="result">'+value.text+'</div>';
			}
			
			if(resultListHeight <= 300){
				resultListHeight += 50
			}
		});
		this.resultsElement.innerHTML = resultList;
		win.setSize(
			win.getSize()[0],
			resultListHeight+56
		);
		this.resultsElement.style.height = resultListHeight+"px";
		if(this.results.length > 0){
			this.element.parentNode.className = "active";
		}else{
			this.element.parentNode.className = "";
		}
	}

	MoveUp(){
		if(this.selected > 0){
			this.selected--;
			this.Update();
		}
	}

	MoveDown(){
		if(this.selected < this.results.length-1){
			this.selected++;
			this.Update();
		}
	}

	
}
