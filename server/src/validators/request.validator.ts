import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { HttpStatus } from '@utils/base-response.util';
import { NextFunction, Request, Response, RequestHandler } from 'express';

export interface AsyncRequestHandler {
	(req: Request, res: Response, next: NextFunction): Promise<void>;
}

function validationFactory<T>(
	metadataKey: Symbol,
	model: { new (...args: any[]): T },
	source: 'body' | 'query',
) {
	return (
		target: any,
		propertyName: string,
		descriptor:
			| TypedPropertyDescriptor<AsyncRequestHandler>
			| TypedPropertyDescriptor<RequestHandler>,
	) => {
		Reflect.defineMetadata(metadataKey, model, target, propertyName);

		const method = descriptor.value;
		descriptor.value = async function () {
			const model = Reflect.getOwnMetadata(metadataKey, target, propertyName);

			const [req, res] = arguments;
			const plain = req[source];
			console.log(plain);

			const errors = await validate(plainToInstance(model, plain));

			if (!!errors.length) {
				res.status(HttpStatus.BAD_REQUEST).json({
					success: false,
					errors: { ...transformValidationErrorsToJSON(errors) },
				});
				return;
			}

			return method?.apply(this, arguments);
		};
	};
}

export const ValidateQuery = (dto: any) =>
	validationFactory(Symbol('validate-query'), dto, 'query');

export const ValidateBody = (dto: any) =>
	validationFactory(Symbol('validate-body'), dto, 'body');

function transformValidationErrorsToJSON(errors: ValidationError[]) {
	return errors.reduce((reducer: any, current: ValidationError) => {
		if (!current.children || !current.children.length) {
			const constraints =
				current?.constraints !== undefined ? current.constraints : {};
			reducer[current.property] = Object.keys(constraints).map(
				(key) => constraints[key],
			);
		} else {
			reducer[current.property] = transformValidationErrorsToJSON(
				current.children,
			);
		}
		return reducer;
	}, {});
}
