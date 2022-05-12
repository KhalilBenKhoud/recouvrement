import {
	registerDecorator,
	ValidationArguments,
	buildMessage,
} from 'class-validator';

export function IsValidCin() {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isValidCin',
			target: object.constructor,
			propertyName: propertyName,
			validator: {
				validate(value: string, _args: ValidationArguments) {
					return (
						!!value &&
						typeof value === 'string' &&
						typeof +value === 'number' &&
						value.trim().length === 8
					);
				},
				defaultMessage: buildMessage(
					(eachPrefix) => `${eachPrefix} property must be a valid cin`,
				),
			},
		});
	};
}
