'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Button from '@/components/fields/Button';
import { NOTES_VALUE } from '@/assets/constants/stateValue';
import NotesModal from '@/components/modals/NotesModal';
import { CREATE_NOTE_URL, GET_ALL_NOTES_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import noDataFound from '@/assets/images/no-data.jpg';
import Shimmer from '@/components/fields/Shimmer';

const borderColors = [
  'border-l-red-500',
  'border-l-green-500',
  'border-l-blue-500',
  'border-l-yellow-500',
  'border-l-purple-500',
];
const textColors = ['text-red-500', 'text-green-500', 'text-blue-500', 'text-yellow-500', 'text-purple-500'];

const Page = () => {
  const [allNotes, setAllNotes] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginationButtons, setPaginationButtons] = useState([]);

  const [notes, setNotes] = useState(NOTES_VALUE);
  const [createLoading, setCreateLoading] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    const res = await axios.get(GET_ALL_NOTES_URL, {
      params: {
        page,
      },
    });
    if (res.data.success) {
      setAllNotes(res.data.data);
      const pagiBtns = Array.from({ length: res.data.data.totalPages }, (_, index) => index + 1);
      setPaginationButtons(pagiBtns);
    } else {
      notification(res.data.msg || 'Failed to get notes.', { type: 'error', id: 'getNotes' });
    }
    setLoading(false);
  };

  const submitNewNotes = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    const res = await axios.post(CREATE_NOTE_URL, notes);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'noteCreate' });
      fetchNotes();
      setPage(1);
      setNotes(NOTES_VALUE);
      setNoteModalOpen(false);
    } else {
      notification(res.data.msg || 'Failed to cretae note.', { type: 'error', id: 'noteCreate' });
    }
    setCreateLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, [page]);

  return (
    <div className="min-h-[85vh] md:min-h-[83vh]">
      <Button iconLeft={'+'} onClick={() => setNoteModalOpen(true)}>
        Add New Note
      </Button>
      <h2 className="mb-4 mt-8 text-center text-2xl font-semibold underline underline-offset-4 md:mt-4">
        Notes
      </h2>
      {loading && (
        <div className="flex w-full flex-col gap-y-4 lg:gap-y-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
            <Shimmer
              key={i}
              className={`h-[75px] rounded border-l-4 ${borderColors[i % borderColors.length]}`}
            />
          ))}
        </div>
      )}
      {!loading && !allNotes?.notes.length && (
        <div className="mt-16 flex w-full flex-col items-center justify-center">
          <Image src={noDataFound} alt="" className="w-72 lg:w-80" />
          <p className="text-center font-medium text-gray-500">No data found...</p>
        </div>
      )}
      {!loading && allNotes?.notes && (
        <div className="flex flex-col gap-y-4 lg:gap-y-6">
          {allNotes.notes?.map((note, i) => {
            return (
              <Link
                href={`/notes/${note.note_id}`}
                key={i}
                className={`border-l- h-[75px] w-full rounded border-2 border-l-[5px] border-bGray ${borderColors[i % borderColors.length]}`}
              >
                <div className="flex flex-col gap-y-2 px-3 py-1">
                  <h4 className={`text-medium truncate text-lg ${textColors[i % textColors.length]}`}>
                    {note.title}
                  </h4>
                  <p className="h-[20px] truncate text-sm text-gray-500">{note.description}</p>
                </div>
              </Link>
            );
          })}
          {paginationButtons.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {paginationButtons.map((pgNo, i) => (
                <button
                  key={i}
                  className={`hover:border-3 rounded-full border border-bGray px-2 hover:bg-pest hover:text-white ${pgNo === page ? 'bg-pest-200 text-orange-100' : 'bg-white'}`}
                  onClick={() => setPage(pgNo)}
                >
                  {pgNo}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {noteModalOpen ? (
        <NotesModal
          modalOpen={noteModalOpen}
          setModalOpen={setNoteModalOpen}
          heading={'Add new note'}
          loading={createLoading}
          info={notes}
          setInfo={setNotes}
          handleSubmit={submitNewNotes}
        />
      ) : null}
    </div>
  );
};

export default Page;
