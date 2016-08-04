var ProfileBox = React.createClass({
	render: function() {		
		return(
			<div className="profileBox">
				<Profile profile={this.props.profile} />
			</div>
		);
	}
});

var Profile = React.createClass({
	render: function() {
		var profileDetails = this.props.profile.map(function(profile){
			return(
				<PhotoDetails profile={profile} />
			);				
		});			
		return(
			<div className="profile">
				{profileDetails}
			</div>
		);
	}
});

var PhotoDetails = React.createClass({
	render: function() {
		return(
			<div className="profileDetails">
				<div className="w3-third">
					img
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
		return(
			<p>Photos</p>
		);
	}
});

var PROFILE = [
	{
		id: 1,
		name: "Leanne Graham",
		username: "Bret",
		email: "Sincere@april.biz",
		address: {
			street: "Kulas Light",
			suite: "Apt. 556",
			city: "Gwenborough",
			zipcode: "92998-3874",
			geo: {
			  lat: "-37.3159",
			  lng: "81.1496"
			}
		},
		phone: "1-770-736-8031 x56442",
		website: "hildegard.org",
		company: {
			name: "Romaguera-Crona",
			catchPhrase: "Multi-layered client-server neural-net",
			bs: "harness real-time e-markets"
		}
	}
];

var PHOTO = [
  { albumId : 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "http://placehold.it/600/92c952",
    thumbnailUrl: "http://placehold.it/150/30ac17"
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "http://placehold.it/600/771796",
    thumbnailUrl: "http://placehold.it/150/dff9f6"
  }
];

ReactDOM.render(
	<ProfileBox profile={PROFILE} photo={PHOTO}/>, 
	document.getElementById('container')
);