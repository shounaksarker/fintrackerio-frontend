'use client';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/fields/Button';
import CustomTable from '@/components/fields/Table';
import CategoryModal from '@/components/modals/CategoryModal';
import { EXPENSE_CATEGORY_EDIT_URL, EXPENSE_CATEGORY_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import { CATEGORY_VALUE } from '@/assets/constants/stateValue';
import { DataContext } from '@/context/DataContext';
import { getDate } from '@/helpers/frontend/formateDate';
import { handleEdit } from '@/helpers/frontend/handle';
import EditCategoryModal from '@/components/modals/EditCategoryModal';
import EditIcon from '@/assets/svg/Icon/EditIcon';

const Page = () => {
  const { expenseCategory, expenseCategoryLoading, setExpenseCategoryLoading, fetchExpenseCategory } =
    useContext(DataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState(CATEGORY_VALUE);
  const [createLoading, setCreateLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditdata] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  const handleCategory = (e, name) => {
    const catrgories = { ...category };
    if (name) {
      catrgories[name] = e;
    } else {
      catrgories[e.target.name] = e.target.value;
    }
    setCategory(catrgories);
  };

  const handleEditField = (e, name) => {
    const edited = { ...editData };
    if (name) {
      edited[name] = e;
    } else {
      edited[e.target.name] = e.target.value;
    }
    setEditdata(edited);
  };
  const editCategory = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const payload = {
      categoryId: editData.expense_category_id,
      newName: editData.name,
      newDescription: editData.description,
      icon: editData.icon,
      budget: editData.budget,
    };
    const res = await axios.put(EXPENSE_CATEGORY_EDIT_URL, payload);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'createSource' });
      setEditdata({});
      setEditModalOpen(false);
      fetchExpenseCategory();
    } else {
      notification(res.data.msg || 'Failed to edit expense category', { type: 'error', id: 'editSource' });
    }
    setEditLoading(false);
  };

  const createExpenseCategory = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    const res = await axios.post(EXPENSE_CATEGORY_URL, category);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'createExCategory' });
      setCategory(CATEGORY_VALUE);
      setModalOpen(false);
      fetchExpenseCategory();
    } else {
      notification(res.data.msg || 'Failed to add expense category', {
        type: 'error',
        id: 'createExCategory',
      });
    }
    setCreateLoading(false);
  };

  useEffect(() => {
    if (!expenseCategory.length) {
      fetchExpenseCategory();
    } else {
      setExpenseCategoryLoading(false);
    }
  }, []);

  const EXPENSE_CATEGORY_TABLE_HEADER = [
    {
      label: 'Name',
      style: 'w-24 md:w-1/5 text-sm lg:text-md capitalize',
      target: 'name',
      dynamicIcon: 'icon',
    },
    {
      label: 'Created',
      style: 'w-24 md:w-1/5 text-sm lg:text-md',
      target: 'created_at',
      function: getDate,
    },
    {
      label: 'Budget',
      style: 'w-24 md:w-1/5 text-sm lg:text-md capitalize',
      target: 'budget',
    },
    {
      label: 'Description',
      style: 'w-24 md:w-1/5 md:pr-4 text-sm lg:text-md truncate',
      target: 'description',
    },
    {
      label: 'Action',
      style: 'w-24 md:w-1/5 text-sm lg:text-md',
      target: 'action',
      action: [
        {
          label: <EditIcon />,
          style: 'text-blue-500',
          onClick: (row) => handleEdit({ data: row, setModalOpen: setEditModalOpen, setEditdata }),
        },
      ],
    },
  ];
  return (
    <div>
      <Button size="md" color="primary" iconLeft={'+'} onClick={() => setModalOpen(true)}>
        Add Expense Category
      </Button>
      <div className="mt-6">
        <h3 className="mb-4 text-center text-xl font-semibold text-pBlack lg:mb-8">Expense Category List</h3>
        <CustomTable
          headers={EXPENSE_CATEGORY_TABLE_HEADER}
          data={expenseCategory}
          enablePagination
          className={'w-full'}
          tableClass={'rounded-md p-4 shadow-md'}
          loading={expenseCategoryLoading}
          enableDetailsView={false}
        />
      </div>

      <CategoryModal
        name={'expense'}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleCategory={handleCategory}
        data={category}
        title="Add Expense Category"
        handleSubmit={createExpenseCategory}
        loading={createLoading}
        inputTitle="Category Name"
        placeholder="Enter your Expense category name"
      />
      <EditCategoryModal
        categoryName="expense"
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        handleCategory={handleEditField}
        data={editData}
        title="Edit Expense Category"
        handleSubmit={editCategory}
        loading={editLoading}
      />
    </div>
  );
};

export default Page;
