import { app } from "./app";

const PORT = 8000

app.listen({
	host: '0.0.0.0',
	port: PORT
}).then(() => {
	console.log(`Server running on ${PORT}`)
})