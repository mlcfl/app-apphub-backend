import { getServerPort } from "@shared/backend";
import { server } from "./server";

import "dotenv/config";

const port = getServerPort();
const instance = await server();

instance.listen(port, () => {
	console.log(`Server is started on port ${port}`);
});
