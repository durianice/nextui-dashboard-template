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
import { putJSON, postJSON } from "@/util/request";
import toast from "react-hot-toast";

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
  {
    name: "userid",
    hidden: true,
  },
];

interface UserFormProps<T> {
  mode: "add" | "edit";
  onSuccess?: (data?: any) => void;
  row?: T;
}

const UserForm = <T,>({ mode, onSuccess, row }: UserFormProps<T>) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleFormSubmitRef = React.useRef<() => void>(() => {});

  const defaultValues = React.useMemo(() => {
    return mode === "edit" ? { ...row } : ({ userid: Date.now() } as any);
  }, [mode, row]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      setIsLoading(true);
      if (mode === "edit") {
        const body = { ...row, ...data };
        await toast.promise(putJSON("/api/members", { data: body }), {
          loading: "Updating...",
          success: (data) => {
            if (data.ok) {
              onClose();
              onSuccess && onSuccess(body);
              return "Success";
            }
            return "Failed";
          },
          error: (err) => `${err.toString()}`,
        });
      } else {
        await toast.promise(postJSON("/api/members", { data }), {
          loading: "Adding...",
          success: (data) => {
            if (data.ok) {
              onClose();
              onSuccess && onSuccess();
              return "Success";
            }
            return "Failed";
          },
          error: (err) => `${err.toString()}`,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <>
        {mode === "edit" ? (
          <Tooltip content="Edit" color="secondary">
            <button onClick={onOpen}>
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
        ) : (
          <Button onPress={onOpen} color="primary">
            New
          </Button>
        )}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {mode === "edit" ? "Edit" : "Add"}
                </ModalHeader>
                <ModalBody>
                  <FormComponent
                    readOnly={isLoading}
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
                    {mode === "edit" ? "Edit" : "Add"}
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

export default UserForm;
