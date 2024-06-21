import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { EditIcon } from "../icons/table/edit-icon";
import LoadingSpinner from "../common/spinner";
import { FormComponent } from "../form";
import { SubmitHandler } from "react-hook-form";
import { putJSON } from "@/util/request";

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
  },
  {
    name: "nickName",
    label: "Nick name",
    validation: {
      pattern: {
        value: /^[a-zA-Z0-9_]{3,20}$/i,
        message: "Invalid nick name",
      },
    },
  },
];

export const EditUser = <T,>({
  onSuccess,
  row,
}: {
  onSuccess?: (data: any) => void;
  row: T;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleFormSubmitRef = React.useRef<() => void>(() => {});

  const defaultValues = { ...row } as any;

  const onSubmit: SubmitHandler<any> = async (data) => {
    const body = { ...row, ...data };
    console.log(body);
    const res = await putJSON("/api/members", { data: body });
    if (res.ok) {
      onClose();
      onSuccess && onSuccess(body);
    }
  };

  return (
    <div>
      <>
        <Tooltip content="Edit user" color="secondary">
          <button onClick={onOpen}>
            <EditIcon size={20} fill="#979797" />
          </button>
        </Tooltip>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit User
                </ModalHeader>
                <ModalBody>
                  <FormComponent
                    fields={fields}
                    onSubmit={onSubmit}
                    formSubmit={(submitHandler) =>
                      (handleFormSubmitRef.current = submitHandler)
                    }
                    showSubmitButton={false}
                    defaultValues={defaultValues}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={isLoading}
                    color="primary"
                    onPress={() => {
                      handleFormSubmitRef.current();
                    }}
                  >
                    Edit User
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
