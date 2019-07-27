function setup() {

	var search;
	var url_root = "http://lyric-api.herokuapp.com/api/find/"
	var artist_Name = document.getElementById("artistName").value;
	var song_Name = document.getElementById("songName").value;
	var url = url_root + artist_Name + "/" + song_Name;

	//jquery method 
	$.get(url, function(data)  {
		search = data;
		var finalLyric = search.lyric;
		document.getElementById("demo").innerText = finalLyric;
	});
}




