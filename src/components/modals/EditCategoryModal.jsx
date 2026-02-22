import React from 'react';
import InputField from '@/components/fields/Input';
import Modal from '@/components/fields/Modal';
import Button from '@/components/fields/Button';
import { EXPENSE_CATEGORY_ICONS, INCOME_CATEGORY_ICONS } from '@/assets/constants/categoryIcons';
import IconSelect from '../fields/IconSelect';
import { BALANCE_TITLE } from '@/assets/constants';

const EditCategoryModal = ({
  categoryName = '',
  modalOpen,
  setModalOpen,
  handleCategory,
  data,
  title,
  loading,
  handleSubmit,
  placeholder = 'Enter Your New Category Name',
}) => {
  const CATEGORY_ICONS =
    categoryName.toLowerCase() === BALANCE_TITLE.INCOME.toLowerCase()
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
            label="New Name"
            onChange={(e) => handleCategory(e)}
            value={data.name}
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
          {categoryName.toLowerCase() === 'expense' && (
            <InputField
              className="size-full "
              type="number"
              name="budget"
              label="New Monthly Budget"
              onChange={(e) => handleCategory(e)}
              value={data.budget}
              placeholder="Enter new budget (optional)"
              labelClass="font-normal"
              inputClass="placeholder:text-xs border-2"
              min="0"
            />
          )}
          <IconSelect
            name={categoryName}
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

export default EditCategoryModal;
