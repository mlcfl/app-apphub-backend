import {
	Router,
	Method,
	GET,
	type Request,
	type Response,
	Controller,
} from "@shared/backend";
import { TokenService } from "../services";
import { UsersRepository } from "../repositories";

@Router("/api")
export class ApiController extends Controller {
	@Method(GET, "/user")
	async getUser(req: Request, res: Response) {
		if (!req.xhr) {
			return res.sendStatus(400);
		}

		const { at: accessToken } = req.cookies;
		const { id } = await TokenService.verify(accessToken);

		if (!id) {
			return res.sendStatus(401);
		}

		const {
			rows: [user],
		} = await UsersRepository.getUserByLogin(id);

		return res.send(user);
	}

	@Method(GET, "/ping")
	async ping(req: Request, res: Response) {
		return res.sendStatus(200);
	}
}
