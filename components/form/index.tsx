import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";

interface FieldConfig {
  readOnly?: boolean;
  name: keyof IFormInput;
  label?: string;
  validation?: any;
  type?: string;
  hidden?: boolean;
}

interface IFormInput {
  [key: string]: any;
}

interface FormComponentProps {
  fields: FieldConfig[];
  onSubmit: SubmitHandler<IFormInput>;
  formSubmit: (submitHandler: () => void) => void;
  showSubmitButton?: boolean;
  defaultValues?: Partial<IFormInput>;
  readOnly?: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({
  fields,
  onSubmit,
  formSubmit,
  showSubmitButton = true,
  defaultValues = {},
  readOnly,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>();

  React.useEffect(() => {
    formSubmit(handleSubmit(onSubmit));
    fields.forEach((field) => {
      if (defaultValues[field.name] !== undefined) {
        setValue(field.name as string, defaultValues[field.name]);
      }
    });
  }, [defaultValues, fields, formSubmit, handleSubmit, onSubmit, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col gap-3 py-2"
    >
      {fields
        .filter(({ hidden }) => !hidden)
        .map((field) => (
          <div key={field.name as string}>
            <Input
              label={field?.label || "Label"}
              {...register(field.name as string, field?.validation)}
              type={field.type || "text"}
              variant="bordered"
              readOnly={readOnly || field.readOnly}
            />
            {errors[field.name] && (
              <span className="text-[#F31260] text-base ml-1">
                {(errors[field.name] as FieldError)?.message}
              </span>
            )}
          </div>
        ))}
      {showSubmitButton && (
        <Button color="primary" type="submit">
          Submit
        </Button>
      )}
    </form>
  );
};

export { FormComponent };
