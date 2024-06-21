import { postJSON } from "@/util/request";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { FormComponent } from "../form";

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

export const AddUser = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleFormSubmitRef = React.useRef<() => void>(() => {});

  const defaultValues = {
    userid: Date.now(),
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    const res = await postJSON("/api/members", { data });
    if (res.ok) {
      onClose();
      onSuccess && onSuccess();
    }
  };
  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add User
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add User
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
                    color="primary"
                    onPress={() => {
                      handleFormSubmitRef.current();
                    }}
                  >
                    Add User
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
