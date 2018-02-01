import {Problems} from "../classes/Euler/Problems";

export class Index {

	public static problems() {
		let probs = new Problems();
		return function(req, res, next) {
			let num = Number(req.params.num ? req.params.num : 1);
			switch (num) {
				case 1: return Promise.resolve().then(() => {
					return res.json({ result : probs.problem1() });
				}).catch(next);
				case 2: return Promise.resolve().then(() => {
					return res.json({ result : probs.problem2() });
				}).catch(next);
				default: return Promise.resolve().then(() => {
					return res.json({ result : 'ERROR' });
				}).catch(next);
			}

		};
	}

}

