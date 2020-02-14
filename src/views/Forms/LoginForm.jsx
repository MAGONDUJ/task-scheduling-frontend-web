import React from "react";
import PropTypes from "prop-types";

//redux manenos
import { connect } from "react-redux";
import compose from "recompose/compose";

import { loginUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

import { Paper, withStyles, Grid, TextField, Button } from "@material-ui/core";
import { Face, Fingerprint } from "@material-ui/icons";

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit * 2
	},
	padding: {
		padding: theme.spacing.unit
	}
});

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: "",
			password: ""
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount(){
    if (this.props.auth.isAuthenticated) {
			this.props.history.push("/");
		}
  }

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			phone: this.state.phoneNumber,
			password: this.state.password
		};

	

		this.props.loginUser(userData);
	}
	render() {
		const { classes } = this.props;
		return (
			<Paper
				className={classes.padding}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh"
				}}
			>
				<div className={classes.margin}>
					<form onSubmit={this.onSubmit}>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item>
								<Face />
							</Grid>

							<Grid item md={true} sm={true} xs={true}>
								<TextField
									name="phoneNumber"
									label="Phone Number"
									onChange={this.onChange}
									value={this.state.phoneNumber}
									type="text"
									fullWidth
									autoFocus
									required
								/>
							</Grid>
						</Grid>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item>
								<Fingerprint />
							</Grid>
							<Grid item md={true} sm={true} xs={true}>
								<TextField
									name="password"
									label="Password"
									type="password"
									onChange={this.onChange}
									value={this.state.password}
									fullWidth
									required
								/>
							</Grid>
						</Grid>

						<Grid container justify="center" style={{ marginTop: "10px" }}>
							<Button
								variant="outlined"
								color="primary"
								style={{ textTransform: "none" }}
								type="submit"
							>
								Login
							</Button>
						</Grid>
					</form>
				</div>
			</Paper>
		);
	}
}

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	errors: PropTypes.object
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

const enhance = compose(
	withStyles(styles),
	connect(mapStateToProps, { loginUser })
);

export default enhance(withRouter(LoginForm));
