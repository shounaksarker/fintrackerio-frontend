import React from 'react';
import InputField from '@/components/fields/Input';
import Modal from '@/components/fields/Modal';
import Button from '@/components/fields/Button';

const EditUserModal = ({ modalOpen, setModalOpen, info, data, setData, loading, handleSubmit }) => {
  const handleInfo = (e) => {
    const edited = { ...data };
    edited[e.target.name] = e.target.value;
    setData(edited);
  };
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl shadow-black/40'}
    >
      <div className="text-sBlack">
        <h1 className="mb-8 text-center text-lg font-semibold text-pBlack">Edit User Info</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            className="w-full"
            type="text"
            name="name"
            label="Name"
            onChange={(e) => handleInfo(e)}
            value={data.name}
            placeholder={info.username}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          <InputField
            className="w-full"
            type="email"
            name="email"
            label="Email"
            onChange={(e) => handleInfo(e)}
            value={data.email}
            placeholder={info.email}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          <InputField
            className="w-full"
            type="tel"
            name="mobile"
            label="Phone Number"
            onChange={(e) => handleInfo(e)}
            value={data.mobile}
            placeholder={info.phone}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          <Button
            type="submit"
            className="flex w-full justify-center"
            loading={loading}
            disabled={!data.name && !data.mobile && !data.email}
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditUserModal;
