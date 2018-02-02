import {Problems} from "../classes/Euler/Problems";

export class Index {

	public static problems() {
		let probs = new Problems();
		return function(req, res, next) {
			let num = Number(req.params.num ? req.params.num : 1);
			if (probs['problem' + num]) {
				return Promise.resolve().then(() => {
					return res.json({ result : probs['problem' + num]() });
				}).catch(next);
			} else {
				return Promise.resolve().then(() => {
					return res.json({ result : 'ERROR' });
				}).catch(next);
			}
		};
	}

}

