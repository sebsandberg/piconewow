
function loadArtistData(index,callback){
	var artist = unseen[index].artist;
	var showId = unseen[index].showId;
	var callbackCount = 0;
	if(showId==301){
		artist = "CHIC";
	}
	$.ajax({
		url: "https://api.spotify.com/v1/search",
		data: {
		  q: artist,
		  type:"track"
		},
		success:function(data){
			var audio = new Audio();
		  	audio.src = data.tracks.items[0].preview_url;
		  	unseen[index].audio = audio;
		  	if(callbackCount>0){
		  		callback();
		  	}else{
		  		callbackCount++;
		  	}
		}
	});
	if(showId==209){
		artist="EMMYLOU HARRIS";
	}
	$.ajax({
		url: "https://api.spotify.com/v1/search",
		data: {
			q: artist,
			type:"artist"
		},
		success:function(data){
			var img = new Image();
			img.src=data.artists.items[0].images[1].url;
			unseen[index].artistImgPath = data.artists.items[0].images[0].url;
			var artistId = data.artists.items[0].id;
			$.ajax({
				url: "http://developer.echonest.com/api/v4/artist/biographies?api_key=BKTYVQYVRUPS203VV&id=spotify:artist:"+artistId+"&format=json&results=1&start=0&license=cc-by-sa",
				success:function(d){
					if(d.response.biographies.length>0){
						var bio = d.response.biographies[0];
						unseen[index].artistBio = bio.text;
					}
					if(callbackCount>0){
				  		callback();
				  	}else{
				  		callbackCount++;
				  	}
		
				}
			});

		}
	});
}

function fetchArtistData(show,callback){
	var artist = show.artist;
	var showId = show.showId;
	var callbackCount = 0;
	if(showId==301){
		artist = "CHIC";
	}
	$.ajax({
		url: "https://api.spotify.com/v1/search",
		data: {
		  q: artist,
		  type:"track"
		},
		success:function(data){
			var audio = new Audio();
		  	audio.src = data.tracks.items[0].preview_url;
		  	show.audio = audio;
		  	if(callbackCount>0){
		  		callback();
		  	}else{
		  		callbackCount++;
		  	}
		}
	});
	if(showId==209){
		artist="EMMYLOU HARRIS";
	}
	$.ajax({
		url: "https://api.spotify.com/v1/search",
		data: {
			q: artist,
			type:"artist"
		},
		success:function(data){
			var img = new Image();
			img.src=data.artists.items[0].images[1].url;
			show.artistImgPath = data.artists.items[0].images[0].url;
			var artistId = data.artists.items[0].id;
			$.ajax({
				url: "http://developer.echonest.com/api/v4/artist/biographies?api_key=BKTYVQYVRUPS203VV&id=spotify:artist:"+artistId+"&format=json&results=1&start=0&license=cc-by-sa",
				success:function(d){
					if(d.response.biographies.length>0){
						var bio = d.response.biographies[0];
						show.artistBio = bio.text;
					}
					if(callbackCount>0){
				  		callback(show);
				  	}else{
				  		callbackCount++;
				  	}
		
				}
			});

		}
	});
}