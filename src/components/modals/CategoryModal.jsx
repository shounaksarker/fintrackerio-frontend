import React from 'react';
import InputField from '@/components/fields/Input';
import Modal from '@/components/fields/Modal';
import Button from '@/components/fields/Button';
import IconSelect from '../fields/IconSelect';
import { EXPENSE_CATEGORY_ICONS, INCOME_CATEGORY_ICONS } from '@/assets/constants/categoryIcons';
import { BALANCE_TITLE } from '@/assets/constants';

const CategoryModal = ({
  name = '',
  modalOpen,
  setModalOpen,
  handleCategory,
  data,
  title,
  loading,
  handleSubmit,
  inputTitle = 'Source Name',
  placeholder = 'Enter Your Income Source Name',
}) => {
  const CATEGORY_ICONS =
    name.toLowerCase() === BALANCE_TITLE.INCOME.toLowerCase()
      ? [...INCOME_CATEGORY_ICONS, ...EXPENSE_CATEGORY_ICONS]
      : [...EXPENSE_CATEGORY_ICONS, ...INCOME_CATEGORY_ICONS];

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
            label={inputTitle}
            onChange={(e) => handleCategory(e)}
            value={data.name}
            placeholder={placeholder}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
            required
          />
          <InputField
            className="size-full "
            type="text"
            name="description"
            label="Description"
            onChange={(e) => handleCategory(e)}
            value={data.description}
            placeholder="Enter description (optional)"
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          <IconSelect
            className="size-full"
            label="Icon"
            onChange={(e) => handleCategory(e, 'icon')}
            value={data.icon}
            placeholder="Select one"
            labelClass="font-normal"
            options={CATEGORY_ICONS}
            optionLabel={'icon'}
            optionValue={'icon'}
            required
          />
          <Button type="submit" className="flex w-full justify-center" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CategoryModal;
