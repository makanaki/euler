//noinspection TypeScriptCheckImport
import * as path from 'path';
export class WAMG_Assets {

	public static getFullPath(filename : string) {
		return path.join(__dirname, '../../assets/' + filename);
	}

}
