import { Button, Input } from "@nextui-org/react";
import React from "react";
import {
  useForm,
  SubmitHandler,
  FieldError,
  RegisterOptions,
  Controller,
  Control,
} from "react-hook-form";

export interface RenderItemProps {
  readOnly?: boolean;
  label?: string;
  field: any;
  value?: any;
}

interface FieldConfig {
  readOnly?: boolean;
  name: keyof IFormInput;
  label?: string;
  validation?: RegisterOptions<IFormInput, string> | undefined;
  type?: string;
  hidden?: boolean;
  render?: (props: RenderItemProps & { field: any }) => React.ReactElement;
  format?: (value: any) => any; // 提交时格式化
  parse?: (value: any) => any; // 回显时格式化
}

export interface IFormInput {
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
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({
    defaultValues,
  });

  const formatSubmitData = React.useCallback(
    (data: IFormInput) => {
      const formattedData: IFormInput = { ...data };
      fields.forEach((field) => {
        if (field.format && data[field.name] !== undefined) {
          formattedData[field.name] = field.format(data[field.name]);
        }
      });
      return formattedData;
    },
    [fields]
  );

  React.useEffect(() => {
    formSubmit(
      handleSubmit((data) => {
        const formattedData = formatSubmitData(data);
        onSubmit(formattedData);
      })
    );
  }, [
    defaultValues,
    fields,
    formSubmit,
    formatSubmitData,
    handleSubmit,
    onSubmit,
    setValue,
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col gap-3 py-2"
    >
      {fields
        .filter(({ hidden }) => !hidden)
        .map((field) => (
          <div key={field.name as string}>
            {
              <Controller
                name={field.name as string}
                control={control}
                rules={field.validation}
                render={({ field: controllerField }) => {
                  return field.render ? (
                    field.render({
                      readOnly: readOnly || field.readOnly,
                      label: field.label,
                      field: controllerField,
                    })
                  ) : (
                    <>{field?.label}</>
                  );
                }}
              />
            }
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

// 调用方式：
const fields = [
  {
    name: "username",
    label: "Username",
    validation: {
      required: "Username is required",
      pattern: {
        value: /^[a-zA-Z0-9_]{3,20}$/i,
        message: "Invalid username",
      },
    },
    render: ({ field, readOnly, label }: RenderItemProps & { field: any }) => (
      <Input
        isRequired
        {...field}
        variant="bordered"
        readOnly={readOnly}
        label={label}
      />
    ),
  },
];
