//let profile_arr = [];
var ProfileBox = React.createClass({	
	getInitialState: function() {
		return {profile: undefined, photos: undefined};
	},	
	loadProfileFromServer: function() {
		$.ajax({
			url: this.props.profile_url,
			dataType: 'json',	
			cache: false,		
			success: function(data) {
				this.setState({profile: data});	
				//console.log(this.state.profile);			
			}.bind(this),
			error: function(xhr, status, err) {
	        	console.error(this.props.profile_url, status, err.toString());
	      }.bind(this)
		});		
	},
	loadPhotosFromServer: function() {
		$.ajax({
			url: this.props.photos_url,
			dataType: 'json',	
			cache: false,		
			success: function(data) {
				this.setState({photos: data});	
				//console.log(this.state.photos);			
			}.bind(this),
			error: function(xhr, status, err) {
	        	console.error(this.props.profile_url, status, err.toString());
	      }.bind(this)
		});		
	},
	componentDidMount: function(){		
		this.loadProfileFromServer();
		this.loadPhotosFromServer();
		//setInterval(this.loadProfileFromServer, this.props.pollInterval);
	},
	render: function() {
		if (!this.state.profile) {         
        	return <div>Loading profile from server</div>
     	}
     	if (!this.state.photos) {         
        	return <div>Loading photos from server</div>
     	}
     	/*
		if (this.state.profile.length === 0) {         
        	return <div>No result found</div>
     	}*/	
     	//console.log(this.state.photos);		
     	return(
     		<div className="profileBox">
				<Profile profile={this.state.profile} />	
				<Photos photos={this.state.photos} />						
			</div>
     	);	
	}
});

var Profile = React.createClass({
	render: function() {	
		return(
			<div className="profile">				
				<div className="w3-third">
					<img src="text.png" />
				</div>
				<div className="w3-twothird">
					<table className="w3-table">
						<tr>
							<td>bio</td>
							<td>name</td>
							<td>{this.props.profile.name}</td>
						</tr>
						<tr>
							<td></td>
							<td>username</td>
							<td>{this.props.profile.username}</td>
						</tr>
						<tr>
							<td></td>
							<td>email</td>
							<td>{this.props.profile.email}</td>
						</tr>
						<tr>
							<td></td>
							<td>phone</td>
							<td>{this.props.profile.phone}</td>
						</tr>
						<tr>
							<td></td>
							<td>website</td>
							<td>{this.props.profile.website}</td>
						</tr>
						<tr>
							<td>address</td>
							<td>street</td>
							<td>{this.props.profile.address.street}</td>
						</tr>
						<tr>
							<td></td>
							<td>suite</td>
							<td>{this.props.profile.address.suite}</td>
						</tr>
						<tr>
							<td></td>
							<td>city</td>
							<td>{this.props.profile.address.city}</td>
						</tr>
						<tr>
							<td>geo</td>
							<td>lat</td>
							<td>{this.props.profile.address.geo.lat}</td>
						</tr>
						<tr>
							<td></td>
							<td>long</td>
							<td>{this.props.profile.address.geo.lng}</td>
						</tr>
						<tr>
							<td>company</td>
							<td>name</td>
							<td>{this.props.profile.company.name}</td>
						</tr>
						<tr>
							<td></td>
							<td>catch phrase</td>
							<td>{this.props.profile.company.catchPhrase}</td>
						</tr>
						<tr>
							<td></td>
							<td>bs</td>
							<td>{this.props.profile.company.bs}</td>
						</tr>
					</table>
				</div>
			</div>
		);
	}
});

var Photos = React.createClass({
	render: function() {		
		var photoNodes =  this.props.photos.map(function(photo) {
			return (
				<Photo albumId={photo.albumId} id={photo.id} title={photo.title} url={photo.url} thumbnailUrl={photo.thumbnailUrl} />			
			);
		}); 
		return (
			<div className="photos">
				{photoNodes}
			</div>
		); 
	}
});

var Photo = React.createClass({
	render: function() {
		return(
			<div className="photo">
				<div className="w3-row">
					<div className="w3-col s3">
						<a href={this.props.url}><img src={this.props.thumbnailUrl} /></a>
					</div>
					<div className="w3-col s9 w3-container">
						<h3>ID: {this.props.id}</h3>
						<p>Title: {this.props.title}</p>
					</div>
				</div>
				<hr/>
			</div>
		);
	}
});

ReactDOM.render(
	<ProfileBox 
		profile_url="http://jsonplaceholder.typicode.com/users/1" 
		photos_url="http://jsonplaceholder.typicode.com/photos" 		
		pollInterval={2000}
	/>, 
	document.getElementById('container')
);