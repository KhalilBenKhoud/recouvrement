import {
	registerDecorator,
	ValidationArguments,
	buildMessage,
	ValidateIf,
	ValidationOptions,
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

export function IsNullable(validationOptions?: ValidationOptions) {
	return ValidateIf(
		(_object, value) => value !== null && value !== undefined,
		validationOptions,
	);
}
