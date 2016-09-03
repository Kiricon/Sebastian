class SearchBar {
	//Build out our searchbar and pre define properties
	constructor(){
		//this.element = document.getElementById('search');
		this.results = [];
		this.options = [
			{text: "hotdog"},
			{text: "hotdong"},
			{text: "wutang"}
		];
		this.resultsElement = document.getElementById('results');
	}

	Listen(){
		document.getElementById('search').addEventListener('change', this.AnalyzeInput(this));
	}

	AnalyzeInput(context){
		console.log('y');
		context.results = [];
		var input = document.getElementById('search').value;
		if(input != ""){
		input = input.split(' ');
		console.log(context);
		context.options.forEach(function(value){
			input.forEach(function(string){
				if(value.text.indexOf(string) >= 0){
					console.log('hellooo');
					context.results.push(value);
				}
			});
			
		});
		context.Update();
		}
	}

	Update(){
		var resultList = "";
		this.results.forEach(function(value){
			resultList += '<div class="result">'+value.text+'</div>';
		});
		this.resultsElement.innerHTML = resultList;
	}

	
}
