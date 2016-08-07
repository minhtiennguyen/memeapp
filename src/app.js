var { Router,
      Route,
      IndexRoute,
      IndexLink,
      Link } = ReactRouter;

var App = React.createClass({
	render: function() {
		return(
			<div>			
				<ul>
					<li><Link to="/profile">Profile</Link></li>
					<li><Link to="/photos">Photos</Link></li>
				</ul>			
			{this.props.children}
			</div>
		);
	}
});


var Profile = React.createClass({
	getInitialState: function() {
		return {profile: undefined};
	},
	loadProfileFromServer: function () {
		var profile_url = 'http://jsonplaceholder.typicode.com/users/1';	
		$.ajax({
			url: profile_url,
			dataType: 'json',	
			cache: false,		
			success: function(data) {
				this.setState({profile: data});	
				//console.log(this.state.profile);			
			}.bind(this),
			error: function(xhr, status, err) {
	        	console.error(profile_url, status, err.toString());
	      }.bind(this)
		});	
	},	
	componentDidMount: function() {
		this.loadProfileFromServer();
	},
	render: function() {
		if (!this.state.profile) {         
        	return <div>Loading profile from server</div>
     	}
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
							<td>{this.state.profile.name}</td>
						</tr>
						<tr>
							<td></td>
							<td>username</td>
							<td>{this.state.profile.username}</td>
						</tr>
						<tr>
							<td></td>
							<td>email</td>
							<td>{this.state.profile.email}</td>
						</tr>
						<tr>
							<td></td>
							<td>phone</td>
							<td>{this.state.profile.phone}</td>
						</tr>
						<tr>
							<td></td>
							<td>website</td>
							<td>{this.state.profile.website}</td>
						</tr>
						<tr>
							<td>address</td>
							<td>street</td>
							<td>{this.state.profile.address.street}</td>
						</tr>
						<tr>
							<td></td>
							<td>suite</td>
							<td>{this.state.profile.address.suite}</td>
						</tr>
						<tr>
							<td></td>
							<td>city</td>
							<td>{this.state.profile.address.city}</td>
						</tr>
						<tr>
							<td>geo</td>
							<td>lat</td>
							<td>{this.state.profile.address.geo.lat}</td>
						</tr>
						<tr>
							<td></td>
							<td>long</td>
							<td>{this.state.profile.address.geo.lng}</td>
						</tr>
						<tr>
							<td>company</td>
							<td>name</td>
							<td>{this.state.profile.company.name}</td>
						</tr>
						<tr>
							<td></td>
							<td>catch phrase</td>
							<td>{this.state.profile.company.catchPhrase}</td>
						</tr>
						<tr>
							<td></td>
							<td>bs</td>
							<td>{this.state.profile.company.bs}</td>
						</tr>
					</table>
				</div>
			</div>
		);
	}
});

var Photos = React.createClass({
	getInitialState: function() {
		return {photos: undefined};
	},
	loadPhotosFromServer: function() {
		var photos_url = 'http://jsonplaceholder.typicode.com/photos';
		$.ajax({
			url: photos_url,
			dataType: 'json',	
			cache: false,		
			success: function(data) {
				this.setState({photos: data});	
				//console.log(this.state.photos);			
			}.bind(this),
			error: function(xhr, status, err) {
	        	console.error(profile_url, status, err.toString());
	      }.bind(this)
		});		
	},
	componentDidMount: function() {
		this.loadPhotosFromServer();
	},
	render: function() {
		if (!this.state.photos) {         
        	return <div>Loading photos from server</div>
     	}
		var photoNodes =  this.state.photos.map(function(photo) {
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
						<Link to={'/comment/'+this.props.id }>comment</Link>
						<h3>ID: {this.props.id}</h3>
						<p>Title: {this.props.title}</p>
					</div>
				</div>
				<hr/>
			</div>
		);
	}
});

var Comment = React.createClass({
	render: function() {
		return(
			<h3>ID {this.props.params.id}</h3>
		);
	}
});

ReactDOM.render(
	<Router>
		<Route path="/" component={App}>
			<Route path="/profile" component={Profile} />
			<Route path="/photos" component={Photos} />
			<Route path="/comment/:id" component={Comment} />
		</Route>
	</Router>,
	document.getElementById('container')
);
