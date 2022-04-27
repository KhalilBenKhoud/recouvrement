class ConfigService {
	isNullOrEmpty(x: string | object | undefined | null): boolean {
		return (
			x === null ||
			x === undefined ||
			typeof x === 'undefined' ||
			(typeof x === 'string' && !x.length) ||
			(typeof x === 'object' && !Object.keys(x))
		);
	}
}
