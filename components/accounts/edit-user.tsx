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

export const EditUser = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = React.useState(false);

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
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <Input label="Email" variant="bordered" />
                      <Input label="First Name" variant="bordered" />
                      <Input label="Last Name" variant="bordered" />
                      <Input label="Phone Number" variant="bordered" />

                      <Input
                        label="Password"
                        type="password"
                        variant="bordered"
                      />
                      <Input
                        label="Confirm Password"
                        type="password"
                        variant="bordered"
                      />
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={isLoading}
                    color="primary"
                    onPress={() => {
                      // mock fetch
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        onClose();
                        onSubmit && onSubmit({ data: 666 });
                      }, 2000);
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
