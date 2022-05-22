import {
	registerDecorator,
	ValidationArguments,
	buildMessage,
	ValidateIf,
	ValidationOptions,
} from 'class-validator';

export function IsValidDateRange() {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'isValidDateRange',
			target: object.constructor,
			propertyName: propertyName,
			validator: {
				validate(json: any, _args: ValidationArguments) {
					const value = JSON.parse(json);
					const res =
						!value ||
						((value.minDate === null || value.minDate instanceof Date) &&
							(value.maxDate === null || value.maxDate instanceof Date));
					console.log(typeof value);
					console.log(value['minDate']);
					return res;
				},
				defaultMessage: buildMessage((_) => 'Invalid date range'),
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
