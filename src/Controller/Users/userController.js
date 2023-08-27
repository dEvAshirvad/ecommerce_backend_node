const userController = {
	getUsers: (req, res) => {
		return res.status(200).json({
			message: req.user,
		});
	},
};

export default userController;
