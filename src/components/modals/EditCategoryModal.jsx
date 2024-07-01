import React from 'react';
import InputField from '@/components/fields/Input';
import Modal from '@/components/fields/Modal';
import Button from '@/components/fields/Button';

const EditCategoryModal = ({
  modalOpen,
  setModalOpen,
  handleCategory,
  data,
  title,
  loading,
  handleSubmit,
  placeholder = 'Enter Your New Category Name',
}) => {
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl shadow-black/40'}
    >
      <div className="text-sBlack">
        <h1 className="mb-8 text-center text-lg font-semibold text-pBlack">{title}</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            className="size-full "
            type="text"
            name="name"
            label="New Name"
            onChange={(e) => handleCategory(e)}
            value={data.name || ''}
            placeholder={placeholder}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          <InputField
            className="size-full "
            type="text"
            name="description"
            label="New Description"
            onChange={(e) => handleCategory(e)}
            value={data.description}
            placeholder={placeholder}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          <Button type="submit" className="flex w-full justify-center" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
