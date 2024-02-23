/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal as AntdModal } from "antd";
import "./style.css";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { StockInterface } from "../../interface";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  selectedRow,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
  selectedRow: StockInterface;
}) => {
  const queryClient = useQueryClient();

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(selectedRow);
  };

  const [formData, setFormData] = useState(selectedRow);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    let calculatedValue = formData?.value?.split("$")?.[1] || 0;
    let valueFromInput = value;
    if (name === "quantity" && value > 0) {
      //   console.log(formData?.price);
      valueFromInput = parseInt(valueFromInput);
      calculatedValue =
        parseInt(value) * parseInt(formData?.price?.split("$")?.[1] || "0");
    }
    if (name === "price" && value > 0) {
      calculatedValue = parseInt(value) * parseInt(formData?.quantity || "0");
      valueFromInput = "$" + parseInt(value);
    }
    if (name === "price" || name === "quantity") {
      if (value === 0 || value < 0 || value.length === 0) {
        calculatedValue = 0;
        valueFromInput = name === "quantity" ? 0 : "$0";
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: valueFromInput,
      value: "$" + calculatedValue,
    }));
  };

  useEffect(() => {
    setFormData(selectedRow);
  }, [selectedRow]);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    queryClient.setQueryData(["STOCK"], (lastData: StockInterface[]) => {
      return lastData.map((each) => {
        if (each.name === formData.name) {
          return formData;
        } else {
          return each;
        }
      });
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <AntdModal
        wrapClassName="modalWrap"
        open={isModalOpen}
        closeIcon={<X color="rgb(222 255 85)" />}
        onCancel={handleCancel}
        footer={null}
        styles={{
          body: { background: "rgb(41 43 39)" },
          header: { background: "rgb(41 43 39)" },
        }}
        destroyOnClose
      >
        <p className="modal-heading">Edit Product</p>
        {selectedRow?.name || ""}

        {formData?.name ? (
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="form">
              <div className="formItem">
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  defaultValue={formData.category}
                  onChange={handleChange}
                  required
                />
                {!formData?.category ? (
                  <span className="error">Please Enter a valid category</span>
                ) : (
                  <span className="error"></span>
                )}
              </div>

              <div className="formItem">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={formData?.price?.split("$")?.[1]}
                  onChange={handleChange}
                  min="0"
                  required
                />
                {!parseInt(formData?.price?.split("$")?.[1]) ? (
                  <span className="error">Please Enter a valid price</span>
                ) : (
                  <span className="error"></span>
                )}
              </div>
              <div className="formItem">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  defaultValue={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  required
                />
                {!formData?.quantity ? (
                  <span className="error">Please Enter a valid quantity</span>
                ) : (
                  <span className="error"></span>
                )}
              </div>
              <div className="formItem">
                <label htmlFor="value">Value:</label>
                <input
                  type="text"
                  id="value"
                  name="value"
                  value={formData.value}
                  disabled={true}
                  readOnly
                />

                <span className="error"></span>
              </div>
            </div>
            <div className="controlButtons">
              <Button
                type="link"
                className="cancel"
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData(selectedRow);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (formRef.current)
                    if (formRef.current.checkValidity()) {
                      formRef?.current.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                    }
                }}
              >
                Save
              </Button>
            </div>
          </form>
        ) : (
          <></>
        )}
      </AntdModal>
    </>
  );
};

export default Modal;
