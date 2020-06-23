import axios from "axios";

const submit = ({ endpoint, data, success, setError, setLoading }) => {
	const options = {};
	if (endpoint === "signup") {
		let formData = new FormData();
		formData.append("img", data.img[0]);
		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("password", data.password);
		formData.append("confirmPassword", data.confirmPassword);
		options["headers"] = {
			"content-type": "multipart/form-data",
		};
		data = formData;
	}

	setLoading(true);
	axios
		.post(`/api/v1/${endpoint}`, data, options)
		.then((res) => {
			if (res.data.result === "success") success(res.data.user);
		})
		.catch((err) => {
			console.log(err, err.response);
			// get errors
			const errors =
				err.response && err.response.data && err.response.data.errors;
			// if server responded with errors
			if (errors) errors.map((error) => setError(error.param, null, error.msg));
			// if not
			else setError("connection", null, "Something Went Wrong!");
			setLoading(false);
		});
};

export default submit;
