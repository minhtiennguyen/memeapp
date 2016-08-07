var { Router,
      Route,
      IndexRoute,
      IndexLink,
      Link } = ReactRouter;

var App = React.createClass({
	render: function() {
		//console.log(this.props.location);
		var path_name = this.props.location.pathname;
		if(path_name.indexOf("comment") !== -1) {
			return(
				<div>			
					<ul className="nav w3-navbar w3-border">					
						<li className="w3-green"><Link to="/photos">Back</Link></li>
					</ul>			
				{this.props.children}			
				</div>
		);
		}
		return(
			<div>			
				<ul className="nav w3-navbar w3-border">
					<li className={(path_name.indexOf("profile") !== -1) ? "w3-green" : null }><Link to="/profile">Profile</Link></li>
					<li className={(path_name.indexOf("photos") !== -1) ? "w3-green" : null }><Link to="/photos">Photos</Link></li>
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
							<td><em>bio</em></td>
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
							<td><em>address</em></td>
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
							<td><em>geo</em></td>
							<td>lat</td>
							<td>{this.state.profile.address.geo.lat}</td>
						</tr>
						<tr>
							<td></td>
							<td>long</td>
							<td>{this.state.profile.address.geo.lng}</td>
						</tr>
						<tr>
							<td><em>company</em></td>
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
				<div className="w3-row-padding">
					<div className="w3-col m4 l4 s4">
						<Link to={'/comment/'+this.props.id}><img src={this.props.thumbnailUrl} /></Link>
					</div>
					<div className="w3-col m8 l8 s8 w3-container">											
						<p><strong>ID:</strong> {this.props.id}</p>
						<p><strong>Title:</strong> {this.props.title}</p>
					</div>
				</div>
				<hr/>
			</div>
		);
	}
});

var Comment = React.createClass({
	getInitialState: function() {
		return {comment: undefined, img: undefined};
	},
	loadCommentFromServer: function() {
		$.ajax({
			url: 'http://jsonplaceholder.typicode.com/comments?id='+this.props.params.id,
			dataType: 'json',	
			cache: false,		
			success: function(data) {
				this.setState({comment: data});	
				//console.log(this.state.comment);			
			}.bind(this),
			error: function(xhr, status, err) {
	        	console.error(profile_url, status, err.toString());
	      }.bind(this)
		});		
	},
	getImg: function() {
		$.ajax({
			url: 'http://jsonplaceholder.typicode.com/photos/'+this.props.params.id,
			dataType: 'json',	
			cache: false,		
			success: function(data) {
				this.setState({img: data});	
				//console.log(this.state.img);			
			}.bind(this),
			error: function(xhr, status, err) {
	        	console.error(profile_url, status, err.toString());
	      }.bind(this)
		});	
	},
	componentDidMount: function() {
		this.loadCommentFromServer();
		this.getImg();
	},
	render: function() {
		if (!this.state.comment) {         
        	return <div>Loading comment...</div>
     	}
     	if (!this.state.comment) {         
        	return <div>Loading image...</div>
     	}
		return(
			<div className="comment">
				<div className="w3-row">
					<p><strong>Photo Id:</strong> {this.props.params.id}</p>
					<p><strong>Name:</strong> {this.state.comment[0].name}</p>
					<p><strong>Email:</strong> {this.state.comment[0].email}</p>
					<p><strong>Body:</strong> {this.state.comment[0].body}</p>	
					<hr/>
					<img src={this.state.img.url} />				
				</div>
			</div>				
		);
	}
});

ReactDOM.render(
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Profile} />
			<Route path="/profile" component={Profile} />
			<Route path="/photos" component={Photos} />
			<Route path="/comment/:id" component={Comment} />
		</Route>
	</Router>,
	document.getElementById('container')
);

