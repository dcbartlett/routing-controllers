import {defaultMetadataArgsStorage} from "../index";
import {ParamMetadataArgs} from "../metadata/args/ParamMetadataArgs";
import {BodyParamOptions} from "../metadata-options/BodyParamOptions";

/**
 * Allows to inject a request body value to the controller action parameter.
 * Applied to class method parameters.
 *
 * @param options Extra parameter options
 */
export function Body(options?: BodyParamOptions) {
    return function (object: Object, methodName: string, index: number) {
        const format = (Reflect as any).getMetadata("design:paramtypes", object, methodName)[index];
        const metadata: ParamMetadataArgs = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: "body",
            reflectedType: format,
            format: format,
            parseJson: false,
            isRequired: options ? options.required : false,
            classTransformOptions: options ? options.transform : undefined,
            validate: options && options.validate ? true : false,
            validationOptions: options && options.validate instanceof Object ? options.validate : undefined
        };
        defaultMetadataArgsStorage().params.push(metadata);
    };
}