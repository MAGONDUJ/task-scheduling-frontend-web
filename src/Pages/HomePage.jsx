import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

//redux manenos
import { connect } from "react-redux";
import compose from "recompose/compose";
import { getTasks } from "../actions/taskActions";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";

import withStyles from "@material-ui/core/styles/withStyles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
	root: {
		flexGrow: 1
	},

	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
});

const cardStyles = {
	root: {
		minWidth: 275
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)"
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
};

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "",
			limit: "",
			order: "",
			orderMethod: ""
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push("/");
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const queryParams = {
			page: this.state.page,
			limit: this.state.limit,
			order: this.state.order,
			orderMethod: this.state.orderMethod
		};

		this.props.getTasks(queryParams);
	}

	onLogoutClick(e) {
		e.preventDefault();
		this.props.clearCurrentProfile();
		this.props.logoutUser();
	}

	render() {
		const { classes } = this.props;
		const tasks = this.props.tasks.tasks.tasks;

		let tasksData;
		if (tasks && tasks.length > 0) {
			tasksData = tasks.map((task, index) => (
				<GridItem xs={12} sm={12} md={4} key={index}>
					<Card className={classes.cardStyles} variant="outlined">
						<CardContent>
							<Typography variant="body2" component="p">
								Taskid: {task.task_id}
							</Typography>
							<Typography variant="body2" component="p">
								Customer First Name: {task.customer_first_name}
							</Typography>
							<Typography variant="body2" component="p">
								Personnel First Name: {task.personnel_first_name}
							</Typography>
							<Typography variant="body2" component="p">
								Personnel First Name: {task.personnel_other_name}
							</Typography>
							<Typography variant="body2" component="p">
								Customer Last Name: {task.customer_last_name}
							</Typography>
							<Typography variant="body2" component="p">
								Customer Phone: {task.customer_phone}
							</Typography>
							<Typography variant="body2" component="p">
								AgentId: {task.agentId}
							</Typography>
							<Typography variant="body2" component="p">
								Assigned: {task.assigned}
							</Typography>
							<Typography variant="body2" component="p">
								In progress: {task.in_progress}
							</Typography>
							<Typography variant="body2" component="p">
								Completed: {task.completed}
							</Typography>
							<Typography variant="body2" component="p">
								deferred: {task.deferred}
							</Typography>
							<Typography variant="body2" component="p">
								Status: {task.status}
							</Typography>
							<Typography variant="body2" component="p">
								Location: {task.location}
							</Typography>
							<Typography variant="body2" component="p">
							Gender: {task.gender}
							</Typography>
							<Typography variant="body2" component="p">
							Age: {task.age}
							</Typography>
							<Typography variant="body2" component="p">
							Access Code: {task.access_code}
							</Typography>
							<Typography variant="body2" component="p">
							Splash Page: {task.splash_page}
							</Typography>
							<Typography variant="body2" component="p">
								Mpesa: {task.mpesa}
							</Typography>
							<Typography variant="body2" component="p">
							Autoplay: {task.autoplay}
							</Typography>
							<Typography variant="body2" component="p">
							Comments: {task.comments}
							</Typography>
							<Typography variant="body2" component="p">
							Registration: {task.registration}
							</Typography>
			
						</CardContent>
					</Card>
				</GridItem>
			));
		} else {
			tasksData = (
				<GridItem xs={12} sm={12} md={12}>
					<Card className={classes.cardStyles} variant="outlined">
						<CardContent>
							<Typography variant="body2" component="p">
								Enter Query Parameters to view data  e.g
							</Typography>

							<Typography variant="body2" component="p">
							page: 1 limit: 4 order: task_id orderMethod: ASC ||DESC
							</Typography>
						</CardContent>
					</Card>
				</GridItem>
			);
		}
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							task-scheduling-frontend-web
						</Typography>
						<Button color="inherit" onClick={this.onLogoutClick.bind(this)}>
							Logout
						</Button>
					</Toolbar>
				</AppBar>

				<br></br>
				<br></br>

				<form onSubmit={this.onSubmit}>
					<GridContainer>
						<GridItem xs={12} sm={12} md={3}>
							<TextField
								required
								name="page"
								value={this.state.page}
								onChange={this.onChange}
								label="Page"
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={3}>
							<TextField
								required
								name="limit"
								value={this.state.limit}
								onChange={this.onChange}
								label="Limit"
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={3}>
							<TextField
								required
								name="order"
								value={this.state.order}
								onChange={this.onChange}
								label="Order"
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={3}>
							<TextField
								required
								name="orderMethod"
								value={this.state.oderMethod}
								onChange={this.onChange}
								label="Order By"
							/>
						</GridItem>

						<br></br>
						<br></br>

						<GridContainer
							justify="center"
							spacing={3}
							style={{ padding: "50px" }}
						>
							<GridItem xs={12} sm={12} md={12}>
								<Button type="submit" color="primary">
									Get Tasks
								</Button>
							</GridItem>
						</GridContainer>
					</GridContainer>
				</form>

				<GridContainer justify="center" spacing={3} style={{ padding: "50px" }}>
					{tasksData}
				</GridContainer>
			</div>
		);
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object,
	getTasks: PropTypes.func.isRequired,
	tasks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	tasks: state.tasks
});

const enhance = compose(
	withStyles(styles),
	connect(mapStateToProps, { getTasks, logoutUser, clearCurrentProfile })
);

export default enhance(withRouter(HomePage));
