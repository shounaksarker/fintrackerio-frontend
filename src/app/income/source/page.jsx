'use client';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/fields/Button';
import CustomTable from '@/components/fields/Table';
import CategoryModal from '@/components/modals/CategoryModal';
import { INCOME_SOURCE_EDIT_URL, INCOME_SOURCE_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import { CATEGORY_VALUE } from '@/assets/constants/stateValue';
import { DataContext } from '@/context/DataContext';
import EditCategoryModal from '@/components/modals/EditCategoryModal';
import { handleEdit } from '@/helpers/frontend/handle';
import { getDate } from '@/helpers/frontend/formateDate';

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditdata] = useState({});
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [category, setCategory] = useState(CATEGORY_VALUE);
  const { incomeSourceLoading, setIncomeSourceLoading, incomeSources, fetchIncomeSource } =
    useContext(DataContext);

  const handleCategory = (e) => {
    const catrgories = { ...category };
    catrgories[e.target.name] = e.target.value;
    setCategory(catrgories);
  };

  const handleEditField = (e) => {
    const edited = { ...editData };
    edited[e.target.name] = e.target.value;
    setEditdata(edited);
  };
  const editCategory = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const payload = {
      categoryId: editData.income_category_id,
      newName: editData.name,
      newDescription: editData.description,
    };
    const res = await axios.put(INCOME_SOURCE_EDIT_URL, payload);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'createSource' });
      setEditdata({});
      setEditModalOpen(false);
      fetchIncomeSource();
    } else {
      notification(res.data.msg || 'Failed to edit income source', { type: 'error', id: 'editSource' });
    }
    setEditLoading(false);
  };

  const createIncomeSource = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    const res = await axios.post(INCOME_SOURCE_URL, category);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'createSource' });
      setCategory(CATEGORY_VALUE);
      setModalOpen(false);
      fetchIncomeSource();
    } else {
      notification(res.data.msg || 'Failed to add income source', { type: 'error', id: 'createSource' });
    }
    setCreateLoading(false);
  };
  useEffect(() => {
    if (!incomeSources.length) {
      fetchIncomeSource();
    } else {
      setIncomeSourceLoading(false);
    }
  }, []);
  const INCOME_SOURCE_HEADER = [
    {
      label: 'Name',
      style: 'w-24 md:w-1/4 text-sm lg:text-md capitalize',
      target: 'name',
    },
    {
      label: 'Created',
      style: 'w-24 md:w-1/4 text-sm lg:text-md',
      target: 'created_at',
      function: getDate,
    },
    {
      label: 'Description',
      style: 'w-24 md:w-1/4 md:pr-4 text-sm lg:text-md truncate',
      target: 'description',
      showInModal: true,
    },
    {
      label: 'Action',
      style: 'w-24 md:w-1/4 text-sm lg:text-md',
      target: 'action',
      action: [
        {
          label: 'Edit',
          style: 'text-blue-500',
          onClick: (row) => handleEdit({ data: row, setModalOpen: setEditModalOpen, setEditdata }),
        },
        // { label: 'Delete', onClick: (row) => handleDelete(row), style: 'text-pRed' },
      ],
    },
  ];
  return (
    <div>
      <Button size="md" color="primary" iconLeft={'+'} onClick={() => setModalOpen(true)}>
        Add Income Source
      </Button>
      <div className="mt-6">
        <h3 className="mb-4 text-center text-xl font-semibold text-pBlack lg:mb-8">Income Source List</h3>
        <CustomTable
          headers={INCOME_SOURCE_HEADER}
          data={incomeSources}
          enablePagination
          dataPerPage={10}
          className={'w-full'}
          tableClass={'rounded-md p-4 shadow-md'}
          loading={incomeSourceLoading}
        />
      </div>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleCategory={handleCategory}
        data={category}
        title="Add Income Source"
        handleSubmit={createIncomeSource}
        loading={createLoading}
      />
      <EditCategoryModal
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        handleCategory={handleEditField}
        data={editData}
        title="Edit Income Source"
        handleSubmit={editCategory}
        loading={editLoading}
      />
    </div>
  );
};

export default Page;
