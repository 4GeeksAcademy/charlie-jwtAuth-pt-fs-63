const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async ({email, password}) => {
				try{
					const res = await fetch(process.env.BACKEND_URL + "/api/token",
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({ email, password })
						}
					)
					const data = await res.json()

					setStore({ token: data.token })
					localStorage.setItem("access-token", data.token)
				} catch(error) {
					console.log("Error logging in", error)
				}
			},
			getUser: async () => {
				try{
					const res = await fetch(process.env.BACKEND_URL + "/api/user",
						{
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + localStorage.getItem("access-token")
							}
						}
					)
					const data = await res.json()
					setStore({ user: data.user })
				} catch(error) {
					console.log("Error accessing user")
				}
			},
			createUser: async ({ email, password, active }) =>{
				try{
					const res = await fetch(process.env.BACKEND_URL + "/api/user",
						{
							method: 'POST',
							headers: {'Content-Type': 'application/json'},
							body: JSON.stringify({ email, password, active })
						}
					)
					const data = await res.json()
					console.log(data)
				} catch(error) {
					console.log("Error creating user")
				}
			}
		}
	};
};

export default getState;
