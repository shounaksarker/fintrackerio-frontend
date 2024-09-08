'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/fields/Button';
import { notification } from '@/components/notification';
import { SINGLE_NOTE_URL } from '@/helpers/frontend/apiEndpoints';
import Shimmer from '@/components/fields/Shimmer';
import noDataFound from '@/assets/images/nodatafound.png';
import NotesModal from '@/components/modals/NotesModal';
import ConfirmModal from '@/components/modals/ConfirmModal';

const Page = () => {
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(true);

  const [editNote, setEditNote] = useState();
  const [editNoteModal, setEditNoteModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false);

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const fetchNote = async () => {
    setLoading(true);
    const res = await axios.get(SINGLE_NOTE_URL.replace(':id', id));
    if (res.data.success) {
      setNote(res.data.data);
    } else {
      notification(res.data.msg || 'Failed to get note.', { type: 'error', id: 'getNotes' });
    }
    setLoading(false);
  };

  const submitNoteEdit = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    const res = await axios.put(SINGLE_NOTE_URL.replace(':id', id), editNote);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'createSource' });
      setEditNote();
      setEditNoteModal(false);
      fetchNote();
    } else {
      notification(res.data.msg || 'Failed to edit income source', { type: 'error', id: 'editSource' });
    }
    setEditLoading(false);
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    setDeleteConfirmLoading(true);
    const res = await axios.delete(SINGLE_NOTE_URL.replace(':id', id));
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'deletenote' });
      setDeleteModal(false);
      router.push('/notes');
    } else {
      notification(res.data.msg || 'Failed to delete Note.', {
        type: 'error',
        id: 'deletenote',
      });
    }
    setDeleteConfirmLoading(false);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex flex-col gap-y-5">
          <Shimmer className="mx-auto h-8 w-2/3" shimmerClass="mb-6" />
          {[1, 2, 3, 4, 5].map((_, i) => (
            <Shimmer key={i} className="h-4 w-full" />
          ))}
        </div>
      )}

      {!loading && !note && (
        <div className="mt-8 flex min-h-[50vh] w-full items-center justify-center lg:mt-16">
          <Image src={noDataFound} alt="" className="w-72 lg:w-80" />
        </div>
      )}

      {!loading && note && (
        <div className="flex flex-col gap-y-5">
          <h3 className="text-center text-2xl font-semibold">{note.title}</h3>
          <div className="whitespace-pre-wrap text-justify">{note.description}</div>
          <div className="flex justify-center gap-x-2">
            <Button
              onClick={() => {
                setEditNote(note);
                setEditNoteModal(true);
              }}
            >
              Edit
            </Button>
            <Button color="danger" onClick={() => setDeleteModal(true)}>
              Delete
            </Button>
          </div>
        </div>
      )}

      {editNoteModal ? (
        <NotesModal
          modalOpen={editNoteModal}
          setModalOpen={setEditNoteModal}
          heading={'Edit Note'}
          loading={editLoading}
          info={editNote}
          setInfo={setEditNote}
          handleSubmit={submitNoteEdit}
        />
      ) : null}

      {
        <ConfirmModal
          modalOpen={deleteModal}
          setModalOpen={setDeleteModal}
          title={'Do you want to delete the note?'}
          loading={deleteConfirmLoading}
          handleSubmit={confirmDelete}
        />
      }
    </>
  );
};

export default Page;
