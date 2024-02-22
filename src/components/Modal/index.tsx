import { Button, Modal as AntdModal } from "antd";
import "./style.css";
import { X } from "lucide-react";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
}) => {
  //   const [isModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <AntdModal
        wrapClassName="modalWrap"
        open={isModalOpen}
        closeIcon={<X color="white" />}
        onCancel={handleCancel}
        footer={null}
        styles={{
          body: { background: "rgb(22 23 24)" },
          header: { background: "rgb(22 23 24)" },
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </AntdModal>
    </>
  );
};

export default Modal;
